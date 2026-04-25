/**
 * YouTube discovery — find Pi Coding Agent videos via YouTube Data API v3.
 *
 * Uses token-based pagination (nextPageToken), so we can't reuse the
 * numbered-page `paginate()`. Instead we build a small pagination loop
 * that reuses `ThrottledFetcher` for rate limiting and `Cache` for
 * response caching, following the same patterns.
 *
 * Requires `YOUTUBE_API_KEY` env var.
 */

import type { Cache } from "../core/cache.ts";
import { decodeHtmlEntities } from "../core/html.ts";
import { SEARCH_TERMS } from "../core/terms.ts";
import { ThrottledFetcher } from "../core/throttle.ts";
import { type Entry, EntrySource, type HealthDimensions } from "../core/types.ts";
import { writeRaw } from "../discover/runner.ts";
import type { DiscoveryWriter } from "../discover/writer.ts";
import { clamp, scoreFreshness } from "./scoring.ts";
import type { Source } from "./source.ts";

// ─── Config ────────────────────────────────────────────────────────────────────

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_SEARCH_URL = `${YOUTUBE_API}/search`;
const YOUTUBE_VIDEOS_URL = `${YOUTUBE_API}/videos`;
const PAGE_SIZE = 50;
/** YouTube Data API: ~100 units per search request. Daily quota: 10 000 units. */
const REQUESTS_PER_SECOND = 0.5;
/** Safety cap — don't burn the daily quota on a single query. */
const MAX_PAGES = 5;
/** Max video IDs per videos.list request. */
const VIDEO_BATCH_SIZE = 50;

/** Default queries: canonical search terms as plain text. */
const DEFAULT_QUERIES = [...SEARCH_TERMS];

// ─── Types ─────────────────────────────────────────────────────────────────────

interface YouTubeThumbnail {
	url: string;
	width: number;
	height: number;
}

interface YouTubeSearchResult {
	id: { videoId: string; kind: string };
	snippet: {
		title: string;
		description: string;
		channelTitle: string;
		publishedAt: string;
		thumbnails: Record<string, YouTubeThumbnail>;
	};
}

interface YouTubeSearchResponse {
	kind: string;
	nextPageToken?: string;
	pageInfo: { totalResults: number; resultsPerPage: number };
	items: YouTubeSearchResult[];
}

export interface YouTubeSourceOptions {
	/** Override default search queries. */
	queries?: string[] | undefined;
	/** Run in offline mode — only use cached responses. */
	offline?: boolean | undefined;
}

// ─── Video statistics types (for enrichment) ────────────────────────────────────

interface YouTubeVideoStatistics {
	viewCount: string;
	likeCount: string;
	commentCount: string;
	favoriteCount: string;
}

interface YouTubeVideoItem {
	id: string;
	statistics: YouTubeVideoStatistics;
}

interface YouTubeVideoListResponse {
	kind: string;
	items: YouTubeVideoItem[];
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Build a video URL from a video ID. */
function videoUrl(videoId: string): string {
	return `https://youtube.com/watch?v=${videoId}`;
}

/** Build a candidate from a YouTube search result. */
function toCandidate(result: YouTubeSearchResult, term: string) {
	const videoId = result.id.videoId;
	return {
		url: videoUrl(videoId),
		hint: `youtube:${term}`,
		id: `YT_${videoId}`,
		metadata: {
			title: decodeHtmlEntities(result.snippet.title),
			name: decodeHtmlEntities(result.snippet.title),
			description: decodeHtmlEntities(result.snippet.description),
			channel: result.snippet.channelTitle,
			published_at: result.snippet.publishedAt,
			thumbnail:
				result.snippet.thumbnails["high"]?.url ?? result.snippet.thumbnails["medium"]?.url ?? null,
		},
	};
}

/** Parse a YouTube search response body. */
function parseResponse(body: unknown): {
	items: YouTubeSearchResult[];
	total: number;
	nextPageToken: string | undefined;
} {
	const data = body as YouTubeSearchResponse;
	return {
		items: data.items?.filter((item) => item.id.videoId) ?? [],
		total: data.pageInfo?.totalResults ?? 0,
		nextPageToken: data.nextPageToken ?? undefined,
	};
}

/**
 * Token-based pagination for YouTube search.
 *
 * Follows the same cache/fetch/offline pattern as `paginate()` but uses
 * `nextPageToken` instead of numbered pages.
 */
async function fetchQuery(
	term: string,
	fetcher: ThrottledFetcher,
	cache: Cache | null,
	offline?: boolean,
): Promise<{ url: string; hint: string; id: string; metadata: Record<string, unknown> }[]> {
	const allItems: YouTubeSearchResult[] = [];
	let pageToken: string | undefined;
	let pagesFetched = 0;

	while (pagesFetched < MAX_PAGES) {
		const params = new URLSearchParams({
			part: "snippet",
			q: term,
			type: "video",
			maxResults: String(PAGE_SIZE),
		});
		if (pageToken) params.set("pageToken", pageToken);
		const url = `${YOUTUBE_SEARCH_URL}?${params}`;

		let body: unknown;

		if (cache) {
			const cacheKey = `page:${url}`;
			const cached = cache.get<unknown>(cacheKey);
			if (cached !== null) {
				body = cached;
			} else if (offline) {
				break;
			} else {
				const response = await fetcher.fetch(url);
				if (!response.ok) {
					const text = await response.text().catch(() => "");
					throw new Error(
						`YouTube API ${response.status} page=${pagesFetched + 1}: ${text.slice(0, 200)}`,
					);
				}
				body = await response.json();
				cache.set(cacheKey, body);
			}
		} else if (offline) {
			break;
		} else {
			const response = await fetcher.fetch(url);
			if (!response.ok) {
				const text = await response.text().catch(() => "");
				throw new Error(
					`YouTube API ${response.status} page=${pagesFetched + 1}: ${text.slice(0, 200)}`,
				);
			}
			body = await response.json();
		}

		const { items, nextPageToken } = parseResponse(body);
		allItems.push(...items);
		pagesFetched++;

		if (items.length === 0 || !nextPageToken) break;
		pageToken = nextPageToken;
	}

	return allItems.map((r) => toCandidate(r, term));
}

// ─── Source factory ────────────────────────────────────────────────────────────

export function createYouTubeSource(cache: Cache, opts: YouTubeSourceOptions = {}): Source | null {
	const apiKey = process.env["YOUTUBE_API_KEY"];
	if (!apiKey && !opts.offline) {
		process.stderr.write("[youtube] ⚠️  Skipping YouTube source: YOUTUBE_API_KEY not set\n");
		return null;
	}

	const queries = opts.queries ?? DEFAULT_QUERIES;
	const fetcher = new ThrottledFetcher(
		{ requestsPerSecond: REQUESTS_PER_SECOND },
		{
			fetchFn: (input, init) => {
				// Inject API key into every request
				const url = new URL(input.toString());
				url.searchParams.set("key", apiKey ?? "");
				return fetch(url.toString(), init);
			},
		},
	);

	return {
		name: "youtube",
		source: EntrySource.YouTubeSearch,

		async discover(writer: DiscoveryWriter): Promise<void> {
			for (const term of queries) {
				process.stderr.write(`[youtube] 🔍 "${term}"...\n`);
				try {
					const results = await fetchQuery(term, fetcher, cache, opts.offline);
					const { written } = writeRaw("youtube", EntrySource.YouTubeSearch, results, writer);
					process.stderr.write(`[youtube] → ${results.length} fetched, ${written} written\n`);
				} catch (err) {
					process.stderr.write(`[youtube] ⚠️  Failed: ${err}\n`);
				}
			}
		},

		/** Enrich discovered videos with view/like/comment statistics. */
		async enrich(writer: DiscoveryWriter): Promise<void> {
			const lines = writer.listByDiscoverer("youtube");
			if (lines.length === 0) return;

			// Extract video IDs from URLs
			const videoIds: string[] = [];
			for (const line of lines) {
				const match = line.discovery.url.match(/[?&]v=([\w-]+)/);
				if (match?.[1]) videoIds.push(match[1]);
			}

			// Batch fetch statistics (50 videos per request, 1 quota unit each)
			let enriched = 0;
			for (let i = 0; i < videoIds.length; i += VIDEO_BATCH_SIZE) {
				const batch = videoIds.slice(i, i + VIDEO_BATCH_SIZE);
				const idsParam = batch.join(",");

				const url = `${YOUTUBE_VIDEOS_URL}?part=statistics&id=${idsParam}`;

				let body: unknown;

				if (cache) {
					const cacheKey = `enrich:videos:${idsParam}`;
					const cached = cache.get<unknown>(cacheKey);
					if (cached !== null) {
						body = cached;
					} else if (opts.offline) {
						continue;
					} else {
						const response = await fetcher.fetch(url);
						if (!response.ok) continue;
						body = await response.json();
						cache.set(cacheKey, body);
					}
				} else if (opts.offline) {
					continue;
				} else {
					const response = await fetcher.fetch(url);
					if (!response.ok) continue;
					body = await response.json();
				}

				const videoData = body as YouTubeVideoListResponse;
				const statsById = new Map<string, YouTubeVideoStatistics>();
				for (const item of videoData.items ?? []) {
					statsById.set(item.id, item.statistics);
				}

				// Update candidates with statistics
				for (const line of lines) {
					const match = line.discovery.url.match(/[?&]v=([\w-]+)/);
					const vid = match?.[1];
					if (!vid || !statsById.has(vid)) continue;

					const stats = statsById.get(vid);
					if (!stats) continue;
					const meta = { ...(line.discovery.metadata ?? {}) };
					meta["views"] = Number(stats.viewCount) || 0;
					meta["likes"] = Number(stats.likeCount) || 0;
					meta["comments"] = Number(stats.commentCount) || 0;

					// Re-write with enriched metadata
					writer.write("youtube", {
						...line.discovery,
						metadata: meta,
					});
					enriched++;
				}
			}

			process.stderr.write(
				`[youtube] 🔧 Enriched ${enriched}/${lines.length} videos with statistics\n`,
			);
		},

		scoreHealthDimensions(entry: Entry): HealthDimensions {
			const meta = entry.metadata ?? {};

			const freshness = scoreFreshness(meta["published_at"] as string | null | undefined);

			// Popularity: views
			const views = meta["views"] as number | null | undefined;
			let popularity: number;
			if (views == null) {
				popularity = 5;
			} else if (views >= 10_000) {
				popularity = 100;
			} else if (views >= 1_000) {
				popularity = 60;
			} else if (views >= 100) {
				popularity = 30;
			} else {
				popularity = 10;
			}

			// Activity: likes + comments combined engagement
			const likes = (meta["likes"] as number | null | undefined) ?? 0;
			const comments = (meta["comments"] as number | null | undefined) ?? 0;
			const engagement = likes + comments;
			let activity: number;
			if (engagement >= 1_000) {
				activity = 100;
			} else if (engagement >= 100) {
				activity = 60;
			} else if (engagement >= 10) {
				activity = 30;
			} else {
				activity = 5;
			}

			// Depth: videos have no code depth
			const depth = 0;

			return {
				freshness: clamp(freshness),
				popularity: clamp(popularity),
				activity: clamp(activity),
				depth: clamp(depth),
			};
		},
	};
}
