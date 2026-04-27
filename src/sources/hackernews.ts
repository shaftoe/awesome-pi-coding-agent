/**
 * Hacker News discovery — find Pi Coding Agent stories via Algolia HN API.
 *
 * Searches Hacker News stories using the Algolia search API.
 * Community upvotes serve as a pre-filter for quality content.
 *
 * Uses numbered-page pagination (0-indexed in Algolia, adapted for our
 * 1-indexed `paginate()` helper). Each query fetches up to MAX_PAGES
 * pages of results.
 *
 * No API key required — Algolia's HN API is public.
 */

import type { Cache } from "../core/cache.ts";
import { paginate } from "../core/paginate.ts";
import { SEARCH_TERMS } from "../core/terms.ts";
import { ThrottledFetcher } from "../core/throttle.ts";
import { type Entry, EntrySource, type HealthDimensions } from "../core/types.ts";
import { writeRaw } from "../discover/runner.ts";
import type { DiscoveryWriter } from "../discover/writer.ts";
import { clamp, scoreFreshness } from "./scoring.ts";
import type { Source } from "./source.ts";

// ─── Config ────────────────────────────────────────────────────────────────────

const HN_API = "https://hn.algolia.com/api/v1";
const HN_SEARCH_URL = `${HN_API}/search`;
const PAGE_SIZE = 50;
/** Algolia is generous — 1 req/s is respectful. */
const REQUESTS_PER_SECOND = 1;
/** Safety cap — don't fetch too many pages per query. */
const MAX_PAGES = 5;

/**
 * Default queries: canonical search terms with hyphens as spaces,
 * plus "pi.dev" for direct mentions.
 */
const DEFAULT_QUERIES = [...SEARCH_TERMS.map((term) => term.replace(/-/g, " ")), "pi.dev"];

// ─── Types ─────────────────────────────────────────────────────────────────────

interface HNHit {
	objectID: string;
	title: string;
	url: string | null;
	author: string;
	created_at: string;
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
	/** Run in offline mode — only use cached responses. */
	offline?: boolean | undefined;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Build the HN comments URL for a story. */
function hnCommentsUrl(objectId: string): string {
	return `https://news.ycombinator.com/item?id=${objectId}`;
}

/** Build a candidate from an HN hit. */
function toCandidate(hit: HNHit, term: string) {
	// Use the external URL when available, otherwise link to HN comments
	const url = hit.url ?? hnCommentsUrl(hit.objectID);
	return {
		url,
		hint: `hackernews:${term}`,
		id: `HN_${hit.objectID}`,
		metadata: {
			title: hit.title,
			name: hit.title,
			description: hit.story_text ?? hit.title,
			author: hit.author,
			published_at: hit.created_at,
			points: hit.points,
			num_comments: hit.num_comments,
			hn_id: hit.objectID,
			hn_url: hnCommentsUrl(hit.objectID),
		},
	};
}

/** Parse an HN search response. */
function parseResponse(body: unknown): { items: HNHit[]; total: number } {
	const data = body as HNSearchResponse;
	return {
		items: data.hits ?? [],
		total: Math.min(data.nbHits ?? 0, (data.nbPages ?? 1) * (data.hitsPerPage ?? PAGE_SIZE)),
	};
}

// ─── Source factory ────────────────────────────────────────────────────────────

export function createHackerNewsSource(cache: Cache, opts: HackerNewsSourceOptions = {}): Source {
	const queries = opts.queries ?? DEFAULT_QUERIES;

	const fetcher = new ThrottledFetcher({ requestsPerSecond: REQUESTS_PER_SECOND });

	async function fetchQuery(
		term: string,
	): Promise<{ url: string; hint?: string; id?: string; metadata: Record<string, unknown> }[]> {
		const { items } = await paginate<HNHit>({
			fetcher,
			cache,
			offline: opts.offline,
			maxPages: MAX_PAGES,
			buildUrl: (page) => {
				// Algolia uses 0-indexed pages
				const p = page - 1;
				return `${HN_SEARCH_URL}?query=${encodeURIComponent(term)}&tags=story&page=${p}&hitsPerPage=${PAGE_SIZE}`;
			},
			parse: parseResponse,
		});

		return items.map((hit) => toCandidate(hit, term));
	}

	return {
		name: "hackernews",
		source: EntrySource.HackerNewsSearch,

		async discover(writer: DiscoveryWriter): Promise<void> {
			for (const term of queries) {
				process.stderr.write(`[hackernews] 🔍 "${term}"...\n`);
				try {
					const results = await fetchQuery(term);
					const { written } = writeRaw("hackernews", EntrySource.HackerNewsSearch, results, writer);
					process.stderr.write(`[hackernews] → ${results.length} fetched, ${written} written\n`);
				} catch (err) {
					process.stderr.write(`[hackernews] ⚠️  Failed: ${err}\n`);
				}
			}
		},

		scoreHealthDimensions(entry: Entry): HealthDimensions {
			const meta = entry.metadata ?? {};

			// Freshness: story creation date
			const freshness = scoreFreshness(meta["published_at"] as string | null | undefined);

			// Popularity: HN points (upvotes)
			const points = meta["points"] as number | null | undefined;
			let popularity: number;
			if (points == null) {
				popularity = 5;
			} else if (points >= 500) {
				popularity = 100;
			} else if (points >= 100) {
				popularity = 80;
			} else if (points >= 50) {
				popularity = 60;
			} else if (points >= 10) {
				popularity = 40;
			} else if (points >= 1) {
				popularity = 20;
			} else {
				popularity = 5;
			}

			// Activity: comment count
			const numComments = meta["num_comments"] as number | null | undefined;
			let activity: number;
			if (numComments == null) {
				activity = 5;
			} else if (numComments >= 100) {
				activity = 100;
			} else if (numComments >= 50) {
				activity = 70;
			} else if (numComments >= 10) {
				activity = 40;
			} else if (numComments >= 1) {
				activity = 20;
			} else {
				activity = 5;
			}

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
