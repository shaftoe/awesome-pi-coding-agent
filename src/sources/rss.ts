/**
 * RSS/Atom feed discovery — find Pi Coding Agent content from RSS feeds.
 *
 * Fetches and parses RSS 2.0 and Atom feeds for relevant articles, blog posts,
 * and tutorials. Uses `fast-xml-parser` for robust XML parsing.
 *
 * Feed entries become candidates with the article URL as the canonical key.
 * The filter stage (Stage 2) handles relevance filtering, so this source
 * simply gathers all entries from configured feeds.
 *
 * No API key required — RSS feeds are public.
 */

import { XMLParser } from "fast-xml-parser";
import type { Cache } from "../core/cache.ts";
import { ThrottledFetcher } from "../core/throttle.ts";
import { type Entry, EntrySource, type HealthDimensions } from "../core/types.ts";
import { writeRaw } from "../discover/runner.ts";
import type { DiscoveryWriter } from "../discover/writer.ts";
import { clamp, scoreFreshness } from "./scoring.ts";
import type { Source } from "./source.ts";

// ─── Config ────────────────────────────────────────────────────────────────────

/** Rate limit for fetching RSS feeds. */
const REQUESTS_PER_SECOND = 1;

/**
 * Default RSS feed URLs relevant to the Pi Coding Agent ecosystem.
 * These are tag-specific feeds that may contain relevant content.
 */
const DEFAULT_FEEDS: RssFeedConfig[] = [
	{
		url: "https://dev.to/feed/tag/pi-coding-agent",
		label: "dev.to:pi-coding-agent",
	},
	{
		url: "https://dev.to/feed/tag/pi-agent",
		label: "dev.to:pi-agent",
	},
	{
		url: "https://www.reddit.com/search.rss?q=pi+coding+agent&sort=new&t=year",
		label: "reddit:pi-coding-agent",
	},
];

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface RssFeedConfig {
	/** Feed URL to fetch. */
	url: string;
	/** Human-readable label for logging. */
	label: string;
}

interface ParsedFeedItem {
	title: string;
	url: string;
	description: string;
	publishedAt: string | null;
	author: string | null;
}

export interface RSSSourceOptions {
	/** Override default feed configs. */
	feeds?: RssFeedConfig[] | undefined;
	/** Run in offline mode — only use cached responses. */
	offline?: boolean | undefined;
}

// ─── XML Parsing ───────────────────────────────────────────────────────────────

const xmlParser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: "@_",
	textNodeName: "#text",
	htmlEntities: true,
});

/**
 * Parse an RSS 2.0 or Atom feed into a normalized list of items.
 *
 * Handles both formats:
 *   - RSS 2.0: <rss><channel><item>...</item></channel></rss>
 *   - Atom:    <feed><entry>...</entry></feed>
 */
function parseFeed(xml: string, feedUrl: string): ParsedFeedItem[] {
	const parsed = xmlParser.parse(xml);
	const items: ParsedFeedItem[] = [];

	// Try RSS 2.0 format
	const channel = parsed?.rss?.channel ?? parsed?.channel;
	if (channel) {
		const rawItems = channel.item ?? [];
		const itemArray = Array.isArray(rawItems) ? rawItems : [rawItems];
		for (const item of itemArray) {
			if (!item || typeof item !== "object") continue;
			const url = extractLink(item.link) ?? item.guid?.["#text"] ?? item.guid ?? "";
			if (!url || typeof url !== "string") continue;
			items.push({
				title: extractText(item.title) ?? "",
				url,
				description: extractText(item.description ?? item["content:encoded"]) ?? "",
				publishedAt: extractText(item.pubDate) ?? extractText(item["dc:date"]) ?? null,
				author: extractText(item["dc:creator"]) ?? extractText(item.author) ?? null,
			});
		}
		return items;
	}

	// Try Atom format
	const feed = parsed?.feed;
	if (feed) {
		const rawEntries = feed.entry ?? [];
		const entryArray = Array.isArray(rawEntries) ? rawEntries : [rawEntries];
		for (const entry of entryArray) {
			if (!entry || typeof entry !== "object") continue;
			const url = extractAtomLink(entry.link) ?? entry.id ?? "";
			if (!url || typeof url !== "string") continue;
			items.push({
				title: extractText(entry.title) ?? "",
				url,
				description: extractText(entry.summary ?? entry.content?.["#text"] ?? entry.content) ?? "",
				publishedAt: extractText(entry.published ?? entry.updated) ?? null,
				author: extractText(entry.author?.name) ?? null,
			});
		}
		return items;
	}

	process.stderr.write(`[rss] ⚠️  Could not parse feed as RSS 2.0 or Atom: ${feedUrl}\n`);
	return items;
}

/** Extract text from a possibly-complex XML node. */
function extractText(value: unknown): string | null {
	if (value == null) return null;
	if (typeof value === "string") return value;
	if (typeof value === "object" && value !== null) {
		const obj = value as Record<string, unknown>;
		if (typeof obj["#text"] === "string") return obj["#text"];
	}
	return String(value);
}

/** Extract URL from an RSS <link> element (may be string or complex object). */
function extractLink(link: unknown): string | null {
	if (typeof link === "string") return link;
	if (typeof link === "object" && link !== null) {
		const obj = link as Record<string, unknown>;
		if (typeof obj["#text"] === "string") return obj["#text"];
		if (typeof obj["@_href"] === "string") return obj["@_href"];
	}
	return null;
}

/** Extract URL from an Atom <link> element (has href attribute). */
function extractAtomLink(link: unknown): string | null {
	if (link == null) return null;
	// Atom <link href="..." /> — parsed as array or single object
	const links = Array.isArray(link) ? link : [link];
	for (const l of links) {
		if (typeof l === "object" && l !== null) {
			const obj = l as Record<string, unknown>;
			const rel = obj["@_rel"];
			// Prefer alternate or empty rel (the actual article link)
			if (!rel || rel === "alternate") {
				const href = obj["@_href"];
				if (typeof href === "string") return href;
			}
		}
	}
	// Fallback: first link with any href
	for (const l of links) {
		if (typeof l === "object" && l !== null) {
			const href = (l as Record<string, unknown>)["@_href"];
			if (typeof href === "string") return href;
		}
	}
	return null;
}

// ─── Source factory ────────────────────────────────────────────────────────────

export function createRSSSource(cache: Cache, opts: RSSSourceOptions = {}): Source {
	const feeds = opts.feeds ?? DEFAULT_FEEDS;
	const fetcher = new ThrottledFetcher({ requestsPerSecond: REQUESTS_PER_SECOND });

	async function fetchFeed(
		feedConfig: RssFeedConfig,
	): Promise<{ url: string; hint?: string; id?: string; metadata: Record<string, unknown> }[]> {
		const url = feedConfig.url;

		let body: string;

		if (cache) {
			const cacheKey = `page:${url}`;
			const cached = cache.get<unknown>(cacheKey);
			if (cached !== null) {
				body = typeof cached === "string" ? cached : JSON.stringify(cached);
			} else if (opts.offline) {
				return [];
			} else {
				const response = await fetcher.fetch(url);
				if (!response.ok) {
					process.stderr.write(`[rss] ⚠️  Feed fetch failed (${response.status}): ${url}\n`);
					return [];
				}
				body = await response.text();
				cache.set(cacheKey, body);
			}
		} else if (opts.offline) {
			return [];
		} else {
			const response = await fetcher.fetch(url);
			if (!response.ok) {
				process.stderr.write(`[rss] ⚠️  Feed fetch failed (${response.status}): ${url}\n`);
				return [];
			}
			body = await response.text();
		}

		const items = parseFeed(body, url);
		return items.map((item) => ({
			url: item.url,
			hint: `rss:${feedConfig.label}`,
			metadata: {
				title: item.title,
				name: item.title,
				description: item.description,
				published_at: item.publishedAt,
				author: item.author,
				rss_feed: feedConfig.label,
				rss_feed_url: feedConfig.url,
			},
		}));
	}

	return {
		name: "rss",
		source: EntrySource.RSSFeed,

		async discover(writer: DiscoveryWriter): Promise<void> {
			for (const feed of feeds) {
				process.stderr.write(`[rss] 🔍 Fetching "${feed.label}"...\n`);
				try {
					const results = await fetchFeed(feed);
					const { written } = writeRaw("rss", EntrySource.RSSFeed, results, writer);
					process.stderr.write(`[rss] → ${results.length} fetched, ${written} written\n`);
				} catch (err) {
					process.stderr.write(`[rss] ⚠️  Failed: ${err}\n`);
				}
			}
		},

		scoreHealthDimensions(entry: Entry): HealthDimensions {
			const meta = entry.metadata ?? {};

			// Freshness: article publication date
			const freshness = scoreFreshness(meta["published_at"] as string | null | undefined);

			// Popularity: RSS feeds don't provide popularity signals
			const popularity = 5;

			// Activity: no engagement signals in RSS
			const activity = 5;

			// Depth: articles have no code depth
			const depth = 5;

			return {
				freshness: clamp(freshness),
				popularity: clamp(popularity),
				activity: clamp(activity),
				depth: clamp(depth),
			};
		},
	};
}
