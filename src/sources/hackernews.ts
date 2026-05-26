/**
 * Hacker News discovery — find Pi Coding Agent stories via Algolia's HN API.
 *
 * Uses the Algolia Hacker News search API:
 *   https://hn.algolia.com/api/v1/search?query=...&tags=story
 *
 * Paginated via numbered pages (hitsPerPage + page param).
 * No API key required — Algolia provides a generous free tier.
 *
 * HN stories typically link to external URLs (GitHub repos, blog posts, etc.)
 * which are ideal candidates for the awesome-list pipeline. Stories without
 * a URL field (e.g. "Ask HN" text posts) are skipped since they don't point
 * to a discoverable resource.
 */

import type { Cache } from "../core/cache.ts";
import { cleanText } from "../core/html.ts";
import { SEARCH_TERMS } from "../core/terms.ts";
import { ThrottledFetcher } from "../core/throttle.ts";
import { type CategorizedEntry, Category, EntrySource } from "../core/types.ts";
import { writeRaw } from "../discover/runner.ts";
import type { DiscoveryWriter } from "../discover/writer.ts";
import type { Source } from "./source.ts";

// ─── Config ────────────────────────────────────────────────────────────────────

const HN_SEARCH_URL = "https://hn.algolia.com/api/v1/search";
const PAGE_SIZE = 50;
/** Algolia HN API is generous — 0.5 req/s to be polite. */
const REQUESTS_PER_SECOND = 0.5;
/** Cap pages per query to avoid excessive fetching. */
const MAX_PAGES = 5;

/** Default queries: canonical search terms as plain text. */
const DEFAULT_QUERIES = [...SEARCH_TERMS];

// ─── Types ─────────────────────────────────────────────────────────────────────

interface HNHit {
	objectID: string;
	title: string;
	author: string;
	created_at: string;
	url: string | null | undefined;
	points: number;
	num_comments: number;
	story_text: string | null;
}

interface HNSearchResponse {
	hits: HNHit[];
	nbHits: number;
	page: number;
	nbPages: number;
	hitsPerPage: number;
}

export interface HackerNewsSourceOptions {
	/** Override default search queries. */
	queries?: string[] | undefined;
	/** Run in offline mode — only use cached responses, never hit the network. */
	offline?: boolean | undefined;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Build a candidate from an HN search hit. */
function toCandidate(hit: HNHit, term: string) {
	return {
		url: hit.url ?? `https://news.ycombinator.com/item?id=${hit.objectID}`,
		hint: `hackernews:${term}`,
		id: `HN_${hit.objectID}`,
		metadata: {
			title: cleanText(hit.title),
			name: cleanText(hit.title),
			description: cleanText(hit.story_text ?? ""),
			author: hit.author,
			published_at: hit.created_at,
			points: hit.points ?? 0,
			num_comments: hit.num_comments ?? 0,
			hn_id: hit.objectID,
			external_url: hit.url ?? null,
		},
	};
}

/** Fetch a single query page, returns items and whether there are more pages. */
async function fetchPage(
	term: string,
	page: number,
	fetcher: ThrottledFetcher,
	cache: Cache | null,
	offline?: boolean,
): Promise<{ items: HNHit[]; hasMore: boolean }> {
	const url = `${HN_SEARCH_URL}?query=${encodeURIComponent(term)}&tags=story&hitsPerPage=${PAGE_SIZE}&page=${page}`;

	let body: unknown;

	if (cache) {
		const cacheKey = `page:${url}`;
		const cached = cache.get<unknown>(cacheKey);
		if (cached !== null) {
			body = cached;
		} else if (offline) {
			return { items: [], hasMore: false };
		} else {
			const response = await fetcher.fetch(url);
			if (!response.ok) {
				const text = await response.text().catch(() => "");
				throw new Error(`HN API ${response.status} page=${page + 1}: ${text.slice(0, 200)}`);
			}
			body = await response.json();
			cache.set(cacheKey, body);
		}
	} else if (offline) {
		return { items: [], hasMore: false };
	} else {
		const response = await fetcher.fetch(url);
		if (!response.ok) {
			const text = await response.text().catch(() => "");
			throw new Error(`HN API ${response.status} page=${page + 1}: ${text.slice(0, 200)}`);
		}
		body = await response.json();
	}

	const data = body as HNSearchResponse;
	const items = data.hits ?? [];
	const hasMore = data.page < (data.nbPages ?? 0) - 1;

	return { items, hasMore };
}

/**
 * Fetch all results for a query (paginated).
 */
async function fetchQuery(
	term: string,
	fetcher: ThrottledFetcher,
	cache: Cache | null,
	offline?: boolean,
): Promise<{ url: string; hint: string; id: string; metadata: Record<string, unknown> }[]> {
	const allItems: HNHit[] = [];
	let page = 0;

	while (page < MAX_PAGES) {
		const { items, hasMore } = await fetchPage(term, page, fetcher, cache, offline);
		allItems.push(...items);

		if (items.length === 0 || !hasMore) break;
		page++;
	}

	// Filter: only include stories that point to an external URL
	// (text-only "Ask HN" posts have no discoverable resource)
	return allItems
		.filter((hit) => hit.url != null && hit.url.length > 0)
		.map((r) => toCandidate(r, term));
}

// ─── Source factory ────────────────────────────────────────────────────────────

export function createHackerNewsSource(cache: Cache, opts: HackerNewsSourceOptions = {}): Source {
	const queries = opts.queries ?? DEFAULT_QUERIES;

	const fetcher = new ThrottledFetcher({ requestsPerSecond: REQUESTS_PER_SECOND });

	return {
		name: "hackernews",
		source: EntrySource.HackerNewsSearch,
		displayName: "Hacker News",
		priority: 3,
		suggestedCategory: Category.Article,

		normalizeUrl(url: string): string {
			// Expand HN short links to canonical form
			const hnMatch = url.match(/^https?:\/\/news\.ycombinator\.com\/item\?id=(\d+)$/);
			if (hnMatch) {
				return `https://news.ycombinator.com/item?id=${hnMatch[1]}`;
			}
			return url;
		},

		extractId(url: string): string {
			if (url.includes("news.ycombinator.com/item")) {
				const id = url.match(/[?&]id=(\d+)/)?.[1] ?? "";
				return `HN_${id}`;
			}
			return url.split("/").filter(Boolean).pop() ?? url;
		},

		getPopularityValue(entry: CategorizedEntry): number {
			const meta = entry.metadata as Record<string, unknown>;
			return (meta["points"] as number) ?? 0;
		},

		formatPopularity(entry: CategorizedEntry): string {
			const points = this.getPopularityValue(entry);
			if (points > 0) {
				return `\u{1F4CC}${points}`;
			}
			return "";
		},

		async discover(writer: DiscoveryWriter): Promise<void> {
			for (const term of queries) {
				process.stderr.write(`[hackernews] 🔍 "${term}"...\n`);
				try {
					const results = await fetchQuery(term, fetcher, cache, opts.offline);
					const { written } = writeRaw("hackernews", EntrySource.HackerNewsSearch, results, writer);
					process.stderr.write(`[hackernews] → ${results.length} fetched, ${written} written\n`);
				} catch (err) {
					process.stderr.write(`[hackernews] ⚠️  Failed: ${err}\n`);
				}
			}
		},
	};
}
