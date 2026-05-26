/**
 * Brave Web Search discovery — find Pi Coding Agent articles, blog posts,
 * and other web content via the Brave Search API.
 *
 * Uses the Brave Web Search API:
 *   https://api.search.brave.com/res/v1/web/search?q=...
 *
 * Paginated via numbered offset (count + offset params).
 * Requires BRAVE_API_KEY env var. Gracefully skipped if missing.
 *
 * Strategy: search for canonical terms but exclude npm/github/youtube domains
 * since those are already covered by dedicated sources. We're interested in
 * blog posts, articles, tutorials, and other web content.
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

const BRAVE_SEARCH_URL = "https://api.search.brave.com/res/v1/web/search";
const PAGE_SIZE = 20;
/** Brave free tier: 1 req/s to be safe. */
const REQUESTS_PER_SECOND = 1;
/** Cap pages per query. */
const MAX_PAGES = 3;

/** Domains to exclude — already covered by dedicated sources. */
const EXCLUDED_DOMAINS = [
	"npmjs.com",
	"npmjs.org",
	"github.com",
	"youtube.com",
	"youtu.be",
	"news.ycombinator.com",
];

/** Per-domain hostname variants to also exclude at the URL level. */
const EXTRA_HOST_VARIANTS: Record<string, string[]> = {
	"npmjs.com": ["www.npmjs.com"],
	"youtube.com": ["www.youtube.com", "m.youtube.com"],
};

/** Hostnames to exclude at the URL level — base domains plus their variants. */
const EXCLUDED_HOSTS = EXCLUDED_DOMAINS.flatMap((d) => [d, ...(EXTRA_HOST_VARIANTS[d] ?? [])]);

/** Default queries: canonical search terms as plain text. */
const DEFAULT_QUERIES = [...SEARCH_TERMS];

// ─── Types ─────────────────────────────────────────────────────────────────────

interface BraveResult {
	title: string;
	url: string;
	description: string;
	age?: string;
	page_age?: string;
	profile?: {
		name: string;
		url: string;
	};
	family_friendly?: boolean;
}

interface BraveSearchResponse {
	web?: {
		results?: BraveResult[];
	};
	query?: {
		offset?: number;
		more_results_available?: boolean;
	};
	type?: string;
}

export interface BraveWebSearchOptions {
	/** Override default search queries. */
	queries?: string[] | undefined;
	/** Run in offline mode — only use cached responses, never hit the network. */
	offline?: boolean | undefined;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Check if a URL should be excluded (npm/github/youtube domains). */
function isExcludedUrl(url: string): boolean {
	try {
		const parsed = new URL(url);
		const hostname = parsed.hostname.toLowerCase();
		return EXCLUDED_HOSTS.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
	} catch {
		return true; // Invalid URLs are excluded
	}
}

/** Build a candidate from a Brave search result. */
function toCandidate(result: BraveResult, term: string) {
	return {
		url: result.url,
		hint: `brave:${term}`,
		metadata: {
			title: cleanText(result.title),
			name: cleanText(result.title),
			description: cleanText(result.description ?? ""),
			published_at: result.page_age ?? result.age ?? null,
			source_site: result.profile?.name ?? null,
			source_url: result.profile?.url ?? null,
		},
	};
}

/** Fetch a single query page, returns items and whether there are more pages. */
async function fetchPage(
	term: string,
	offset: number,
	fetcher: ThrottledFetcher,
	cache: Cache | null,
	apiKey: string,
	offline?: boolean,
): Promise<{ items: BraveResult[]; nextOffset: number | null }> {
	// Build query with site exclusions
	const excludeQuery = EXCLUDED_DOMAINS.map((d) => `-site:${d}`).join(" ");
	const fullQuery = `${term} ${excludeQuery}`;

	const url = `${BRAVE_SEARCH_URL}?q=${encodeURIComponent(fullQuery)}&count=${PAGE_SIZE}&offset=${offset}`;

	let body: unknown;

	if (cache) {
		const cacheKey = `page:${url}`;
		const cached = cache.get<unknown>(cacheKey);
		if (cached !== null) {
			body = cached;
		} else if (offline) {
			return { items: [], nextOffset: null };
		} else {
			const response = await fetcher.fetch(url, {
				headers: {
					Accept: "application/json",
					"Accept-Encoding": "gzip",
					"X-Subscription-Token": apiKey,
				},
			});
			if (!response.ok) {
				const text = await response.text().catch(() => "");
				throw new Error(`Brave API ${response.status} offset=${offset}: ${text.slice(0, 200)}`);
			}
			body = await response.json();
			cache.set(cacheKey, body);
		}
	} else if (offline) {
		return { items: [], nextOffset: null };
	} else {
		const response = await fetcher.fetch(url, {
			headers: {
				Accept: "application/json",
				"Accept-Encoding": "gzip",
				"X-Subscription-Token": apiKey,
			},
		});
		if (!response.ok) {
			const text = await response.text().catch(() => "");
			throw new Error(`Brave API ${response.status} offset=${offset}: ${text.slice(0, 200)}`);
		}
		body = await response.json();
	}

	const data = body as BraveSearchResponse;
	const items = data.web?.results ?? [];
	const currentOffset = data.query?.offset ?? offset;

	// Brave offset is a page number (max 9), NOT a record offset.
	// Use the API's more_results_available flag when present.
	const hasMore = data.query?.more_results_available ?? items.length >= PAGE_SIZE;
	const nextOffset = hasMore && currentOffset < 9 ? currentOffset + 1 : null;

	return { items, nextOffset };
}

/**
 * Fetch all results for a query (paginated).
 */
async function fetchQuery(
	term: string,
	fetcher: ThrottledFetcher,
	cache: Cache | null,
	apiKey: string,
	offline?: boolean,
): Promise<{ url: string; hint: string; id?: string; metadata: Record<string, unknown> }[]> {
	const allItems: BraveResult[] = [];
	let offset = 0;
	let pages = 0;

	while (pages < MAX_PAGES) {
		const { items, nextOffset } = await fetchPage(term, offset, fetcher, cache, apiKey, offline);
		allItems.push(...items);

		if (items.length === 0 || nextOffset === null) break;
		offset = nextOffset;
		pages++;
	}

	// Filter: exclude npm/github/youtube URLs (belt-and-suspenders)
	return allItems.filter((r) => r.url && !isExcludedUrl(r.url)).map((r) => toCandidate(r, term));
}

// ─── Source factory ────────────────────────────────────────────────────────────

export function createBraveWebSearchSource(
	cache: Cache | null,
	opts: BraveWebSearchOptions = {},
): Source | null {
	const apiKey = process.env["BRAVE_API_KEY"];
	if (!apiKey && !opts.offline) {
		process.stderr.write("[brave] ⚠️  BRAVE_API_KEY not set — skipping Brave Web Search\n");
		return null;
	}

	const queries = opts.queries ?? DEFAULT_QUERIES;
	const fetcher = new ThrottledFetcher({ requestsPerSecond: REQUESTS_PER_SECOND });

	return {
		name: "brave",
		source: EntrySource.BraveWebSearch,
		displayName: "Brave Search",
		priority: 4,
		suggestedCategory: Category.Article,

		normalizeUrl(url: string): string {
			// No special normalization needed for generic web URLs
			return url;
		},

		extractId(url: string): string {
			// For web URLs, create a readable ID from the domain + path
			try {
				const parsed = new URL(url);
				const domain = parsed.hostname.replace(/^www\./, "");
				const path = parsed.pathname.replace(/\/+$/, "").split("/").filter(Boolean).pop() ?? "";
				const slug = path.replace(/[^a-zA-Z0-9-]/g, "").substring(0, 40);
				if (slug) {
					return `BRAVE_${domain}_${slug}`;
				}
				return `BRAVE_${domain}`;
			} catch {
				return url.split("/").filter(Boolean).pop() ?? url;
			}
		},

		getPopularityValue(_entry: CategorizedEntry): number {
			return 0;
		},

		formatPopularity(entry: CategorizedEntry): string {
			// Brave search doesn't provide a numeric popularity metric
			// Show source site if available
			const meta = entry.metadata as Record<string, unknown>;
			const sourceSite = meta["source_site"];
			if (typeof sourceSite === "string" && sourceSite.length > 0) {
				return `🌐${sourceSite}`;
			}
			return "";
		},

		async discover(writer: DiscoveryWriter): Promise<void> {
			if (!apiKey) {
				if (opts.offline) {
					process.stderr.write("[brave] 🔌 Offline mode — using cached responses\n");
				} else {
					return; // Already warned at creation time
				}
			}

			for (const term of queries) {
				process.stderr.write(`[brave] 🔍 "${term}"...\n`);
				try {
					const results = await fetchQuery(term, fetcher, cache, apiKey ?? "", opts.offline);
					const { written } = writeRaw("brave", EntrySource.BraveWebSearch, results, writer);
					process.stderr.write(`[brave] → ${results.length} fetched, ${written} written\n`);
				} catch (err) {
					process.stderr.write(`[brave] ⚠️  Failed: ${err}\n`);
				}
			}
		},
	};
}
