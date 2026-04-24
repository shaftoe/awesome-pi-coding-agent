/**
 * Enrich video entries with metadata.
 *
 * Two sources:
 * 1. YouTube Data API `videos.list` — fetches statistics (views, likes, comments)
 *    and snippet data (title, channel, thumbnail). Requires YOUTUBE_API_KEY.
 * 2. noembed.com — fallback for title/channel/thumbnail when no API key is available.
 *
 * After enrichment, health scores are recalculated for all video entries.
 */

import { decodeHtmlEntities } from "../lib/html.ts";
import { loadEntries, saveEntry } from "../lib/store.ts";
import type { CategorizedEntry } from "../lib/types.ts";
import { calculateHealth } from "./health.ts";

// biome-ignore lint/suspicious/noConsole: CLI output
const log = console.log;

const NOEMBED_URL = "https://noembed.com/embed?url=";
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

interface NoembedResponse {
	title?: string;
	author_name?: string;
	author_url?: string;
	thumbnail_url?: string;
	error?: string;
}

interface YouTubeVideoStatisticsResponse {
	items?: {
		id: string;
		statistics?: {
			viewCount?: string;
			likeCount?: string;
			commentCount?: string;
		};
		snippet?: {
			title?: string;
			channelTitle?: string;
			thumbnails?: { high?: { url: string }; default?: { url: string } };
		};
	}[];
	error?: {
		message?: string;
	};
}

/** Extract YouTube video ID from URL. */
function extractVideoId(url: string): string | null {
	const match = url.match(/[?&]v=([^&]+)/);
	if (match?.[1]) return match[1];
	// youtu.be short URLs
	const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
	if (shortMatch?.[1]) return shortMatch[1];
	return null;
}

/** Fetch video statistics from YouTube Data API for a batch of video IDs. */
async function fetchYouTubeStatistics(
	videoIds: string[],
	apiKey: string,
): Promise<Map<string, { view_count: number; like_count: number; comment_count: number }>> {
	const result = new Map<
		string,
		{ view_count: number; like_count: number; comment_count: number }
	>();

	// YouTube API allows up to 50 IDs per request
	for (let i = 0; i < videoIds.length; i += 50) {
		const batch = videoIds.slice(i, i + 50);
		const url = `${YOUTUBE_API_BASE}/videos?part=statistics&id=${batch.join(",")}&key=${apiKey}`;

		try {
			const res = await fetch(url);
			if (!res.ok) {
				log(`  ⚠️ YouTube statistics API returned ${res.status}`);
				continue;
			}
			const data = (await res.json()) as YouTubeVideoStatisticsResponse;
			if (data.error) {
				log(`  ⚠️ YouTube statistics API error: ${data.error.message}`);
				continue;
			}

			for (const item of data.items ?? []) {
				const stats = item.statistics;
				result.set(item.id, {
					view_count: Number.parseInt(stats?.viewCount ?? "0", 10),
					like_count: Number.parseInt(stats?.likeCount ?? "0", 10),
					comment_count: Number.parseInt(stats?.commentCount ?? "0", 10),
				});
			}
		} catch (err) {
			log(`  ⚠️ Failed to fetch YouTube statistics: ${err}`);
		}

		// Rate-limit between batches
		if (i + 50 < videoIds.length) {
			await new Promise((r) => setTimeout(r, 200));
		}
	}

	return result;
}

/** Enrich a single video via noembed (fallback when YouTube API is unavailable). */
async function enrichViaNoembed(entry: CategorizedEntry): Promise<boolean> {
	const meta = entry.metadata as Record<string, unknown>;

	// Skip if already enriched with a title
	if (meta["title"]) return false;

	const url = `${NOEMBED_URL}${encodeURIComponent(entry.url)}`;
	try {
		const res = await fetch(url);
		if (!res.ok) return false;
		const data = (await res.json()) as NoembedResponse;
		if (data.error || !data.title) return false;

		const decodedTitle = decodeHtmlEntities(data.title);
		entry.name = decodedTitle;
		entry.description = decodedTitle;
		entry.metadata = {
			...meta,
			title: decodedTitle,
			channel: data.author_name ?? "",
			channel_url: data.author_url ?? "",
			thumbnail: data.thumbnail_url ?? "",
		};

		return true;
	} catch {
		return false;
	}
}

/** Recalculate and update health for a video entry. */
function recalculateHealth(entry: CategorizedEntry): boolean {
	const oldHealth = entry.health;
	const newHealth = calculateHealth(entry);
	if (newHealth.score !== oldHealth.score || newHealth.level !== oldHealth.level) {
		entry.health = newHealth;
		return true;
	}
	return false;
}

export async function enrichVideos(): Promise<void> {
	const videos = loadEntries("video");
	const apiKey = process.env["YOUTUBE_API_KEY"];

	log(`🎬 Enriching ${videos.length} video entries...`);

	let enriched = 0;
	let healthUpdated = 0;
	let skipped = 0;
	let failed = 0;

	// Phase 1: Fetch YouTube statistics if API key is available
	let statisticsMap = new Map<
		string,
		{ view_count: number; like_count: number; comment_count: number }
	>();
	if (apiKey) {
		const videoIds = videos
			.map((v) => extractVideoId(v.url))
			.filter((id): id is string => id !== null);

		if (videoIds.length > 0) {
			log(`   📊 Fetching statistics for ${videoIds.length} videos from YouTube API...`);
			statisticsMap = await fetchYouTubeStatistics(videoIds, apiKey);
			log(`   📊 Got statistics for ${statisticsMap.size} videos`);
		}
	} else {
		log("   ⚠️ No YOUTUBE_API_KEY — skipping statistics fetch");
	}

	// Phase 2: Enrich each video entry
	for (const entry of videos) {
		const meta = entry.metadata as Record<string, unknown>;
		const videoId = extractVideoId(entry.url);
		let changed = false;

		// Apply YouTube statistics if available
		if (videoId) {
			const stats = statisticsMap.get(videoId);
			if (
				stats &&
				((meta["view_count"] as number) !== stats.view_count ||
					(meta["like_count"] as number) !== stats.like_count ||
					(meta["comment_count"] as number) !== stats.comment_count)
			) {
				entry.metadata = {
					...meta,
					view_count: stats.view_count,
					like_count: stats.like_count,
					comment_count: stats.comment_count,
				};
				changed = true;
			}
		}

		// Enrich title/channel/thumbnail via noembed if not already set
		if (!meta["title"]) {
			await new Promise((r) => setTimeout(r, 200)); // Rate-limit
			const ok = await enrichViaNoembed(entry);
			if (ok) {
				changed = true;
				enriched++;
				log(`  ✅ ${entry.id} → ${(entry.metadata as Record<string, unknown>)["title"]}`);
			} else {
				failed++;
				log(`  ❌ ${entry.id} — noembed failed`);
			}
		} else {
			skipped++;
		}

		// Always recalculate health
		if (recalculateHealth(entry)) {
			changed = true;
			healthUpdated++;
		}

		// Save if anything changed
		if (changed) {
			saveEntry(entry.category, entry);
		}
	}

	log(
		`\n✅ Videos: ${enriched} enriched, ${skipped} already had metadata, ${failed} failed, ${healthUpdated} health updated`,
	);
}
