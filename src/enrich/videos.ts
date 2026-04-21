/**
 * Enrich video entries with metadata from noembed.com (no API key required).
 * Populates: title, channel, thumbnail.
 */

import { loadEntries, saveEntry } from "../lib/store.ts";
import type { CategorizedEntry } from "../lib/types.ts";

// biome-ignore lint/suspicious/noConsole: CLI output
const log = console.log;

const NOEMBED_URL = "https://noembed.com/embed?url=";

interface NoembedResponse {
	title?: string;
	author_name?: string;
	author_url?: string;
	thumbnail_url?: string;
	error?: string;
}

async function enrichVideo(entry: CategorizedEntry): Promise<boolean> {
	const meta = entry.metadata as Record<string, unknown>;

	// Skip if already enriched with a title
	if (meta["title"]) return false;

	const url = `${NOEMBED_URL}${encodeURIComponent(entry.url)}`;
	try {
		const res = await fetch(url);
		if (!res.ok) return false;
		const data = (await res.json()) as NoembedResponse;
		if (data.error || !data.title) return false;

		entry.name = data.title;
		entry.description = data.title;
		entry.metadata = {
			...meta,
			title: data.title,
			channel: data.author_name ?? "",
			channel_url: data.author_url ?? "",
			thumbnail: data.thumbnail_url ?? "",
		};

		saveEntry(entry.category, entry);
		return true;
	} catch {
		return false;
	}
}

export async function enrichVideos(): Promise<void> {
	const videos = loadEntries("video");
	log(`🎬 Enriching ${videos.length} video entries via noembed...`);

	let enriched = 0;
	let skipped = 0;
	let failed = 0;

	for (const entry of videos) {
		const meta = entry.metadata as Record<string, unknown>;
		if (meta["title"]) {
			skipped++;
			continue;
		}

		// Rate-limit: 1 request per 200ms
		await new Promise((r) => setTimeout(r, 200));

		const ok = await enrichVideo(entry);
		if (ok) {
			enriched++;
			log(`  ✅ ${entry.id} → ${(entry.metadata as Record<string, unknown>)["title"]}`);
		} else {
			failed++;
			log(`  ❌ ${entry.id}`);
		}
	}

	log(`\nDone: ${enriched} enriched, ${skipped} already had metadata, ${failed} failed`);
}
