/**
 * npm registry discovery — find Pi Coding Agent packages.
 *
 * **Primary source** for the identity model. The npm package name (including
 * scope) is the canonical entry ID. GitHub URLs from `package.json` are stored
 * in metadata for later enrichment, not used as the primary URL or ID.
 *
 * Uses the npm v1 search endpoint with `from`/`size` pagination (max 250/page).
 * High-precision `keywords:` queries that return ~95%+ relevant results.
 */

import type { Cache } from "../core/cache.ts";
import { paginate } from "../core/paginate.ts";
import { SEARCH_TERMS } from "../core/terms.ts";
import { ThrottledFetcher } from "../core/throttle.ts";
import {
	type CategorizedEntry,
	type Entry,
	EntrySource,
	type HealthDimensions,
} from "../core/types.ts";
import { writeRaw } from "../discover/runner.ts";
import type { DiscoveryWriter } from "../discover/writer.ts";
import { clamp, scoreFreshness, scoreMetric01 } from "./scoring.ts";
import type { Source } from "./source.ts";

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Format a number with k suffix. */
function formatKNumber(n: number): string {
	if (n >= 1000) {
		const v = n / 1000;
		return v % 1 === 0 ? `${v}k` : `${v.toFixed(1)}k`;
	}
	return String(n);
}

// ─── Config ────────────────────────────────────────────────────────────────────

const NPM_SEARCH_URL = "https://registry.npmjs.org/-/v1/search";
const PAGE_SIZE = 250;

/** npm rate-limits by IP with no auth bypass — keep to 0.5 req/s. */
const REQUESTS_PER_SECOND = 0.5;

/** Default queries: canonical search terms formatted for npm keyword search. */
const DEFAULT_QUERIES = SEARCH_TERMS.map((term) => `keywords:${term}`);

// ─── Types ─────────────────────────────────────────────────────────────────────

interface NpmSearchResult {
	package: {
		name: string;
		description?: string;
		version?: string;
		date?: string;
		keywords?: string[];
		links: {
			npm: string;
			repository?: string;
			homepage?: string;
		};
	};
	score?: {
		detail?: {
			popularity: number;
			quality: number;
			maintenance: number;
		};
		final: number;
	};
	downloads?: {
		monthly?: number;
		weekly?: number;
	};
}

interface NpmSearchResponse {
	total: number;
	objects: NpmSearchResult[];
}

export interface NpmSourceOptions {
	/** Override the default keyword queries. */
	queries?: string[] | undefined;
	/** Run in offline mode — only use cached responses, never hit the network. */
	offline?: boolean | undefined;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Convert a git+https URL to a clean https URL.
 * e.g. "git+https://github.com/owner/repo.git" → "https://github.com/owner/repo"
 */
function cleanGitHubUrl(raw: string | undefined): string | undefined {
	if (!raw) return undefined;
	const match = raw.match(/(?:git\+)?(https:\/\/github\.com\/[^/]+\/[^/]+)/);
	return match?.[1]?.replace(/\.git$/, "") ?? undefined;
}

/** Build a candidate from an npm search result. */
function toCandidate(result: NpmSearchResult, term: string) {
	const pkg = result.package;
	const githubUrl = cleanGitHubUrl(pkg.links.repository);
	return {
		url: pkg.links.npm,
		hint: `npm:${term}`,
		id: pkg.name,
		metadata: {
			github_url: githubUrl ?? null,
			npm_name: pkg.name,
			description: pkg.description ?? "",
			keywords: pkg.keywords ?? [],
			version: pkg.version ?? null,
			published_at: pkg.date ?? null,
			npm_downloads_monthly: result.downloads?.monthly ?? null,
			npm_downloads_weekly: result.downloads?.weekly ?? null,
			npm_score_final: result.score?.final ?? null,
			npm_score_popularity: result.score?.detail?.popularity ?? null,
			npm_score_quality: result.score?.detail?.quality ?? null,
			npm_score_maintenance: result.score?.detail?.maintenance ?? null,
		},
	};
}

/** Parse an npm search response body. */
function parseNpmResponse(body: unknown): { items: NpmSearchResult[]; total: number } {
	const data = body as NpmSearchResponse;
	return { items: data.objects ?? [], total: data.total ?? 0 };
}

// ─── Source factory ────────────────────────────────────────────────────────────

export function createNpmSource(cache: Cache, opts: NpmSourceOptions = {}): Source {
	const queries = opts.queries ?? DEFAULT_QUERIES;

	const fetcher = new ThrottledFetcher({ requestsPerSecond: REQUESTS_PER_SECOND });

	async function fetchQuery(
		term: string,
	): Promise<{ url: string; hint: string; id: string; metadata: Record<string, unknown> }[]> {
		const { items } = await paginate<NpmSearchResult>({
			fetcher,
			cache,
			offline: opts.offline,
			buildUrl: (page) => {
				const from = (page - 1) * PAGE_SIZE;
				return `${NPM_SEARCH_URL}?text=${encodeURIComponent(term)}&size=${PAGE_SIZE}&from=${from}`;
			},
			parse: parseNpmResponse,
		});
		return items.map((r) => toCandidate(r, term));
	}

	return {
		name: "npm",
		source: EntrySource.NpmSearch,
		displayName: "npm",
		priority: 0,
		healthCap: 100,
		suggestedCategory: null,

		normalizeUrl(url: string): string {
			return url;
		},

		extractId(url: string): string {
			if (url.includes("npmjs.com/package/")) {
				const packagePath = url.split("npmjs.com/package/")[1];
				return decodeURIComponent(packagePath?.replace(/\/+$/, "") ?? "");
			}
			return url.split("/").filter(Boolean).pop() ?? url;
		},

		formatPopularity(entry: CategorizedEntry): string {
			const meta = entry.metadata as Record<string, unknown>;
			const downloads = meta["npm_downloads_monthly"];
			if (typeof downloads === "number" && downloads > 0) {
				return `\u2B07 ${formatKNumber(downloads)}/mo`;
			}
			return "";
		},

		async discover(writer: DiscoveryWriter): Promise<void> {
			for (const term of queries) {
				process.stderr.write(`[npm] 🔍 "${term}"...\n`);
				try {
					const results = await fetchQuery(term);
					const { written } = writeRaw("npm", EntrySource.NpmSearch, results, writer);
					process.stderr.write(`[npm] → ${results.length} fetched, ${written} written\n`);
				} catch (err) {
					process.stderr.write(`[npm] ⚠️  Failed: ${err}\n`);
				}
			}
		},

		scoreHealthDimensions(entry: Entry): HealthDimensions {
			const meta = entry.metadata ?? {};

			const freshness = scoreFreshness(meta["published_at"] as string | null | undefined);

			// Popularity: monthly downloads
			const downloads = meta["npm_downloads_monthly"] as number | null | undefined;
			let popularity: number;
			if (downloads == null) {
				popularity = 5;
			} else if (downloads >= 10_000) {
				popularity = 100;
			} else if (downloads >= 1_000) {
				popularity = 70;
			} else if (downloads >= 100) {
				popularity = 40;
			} else if (downloads >= 10) {
				popularity = 20;
			} else {
				popularity = 5;
			}

			// Activity: npm maintenance score (0–1)
			const activity = scoreMetric01(meta["npm_score_maintenance"] as number | null | undefined);

			// Depth: npm quality score (0–1)
			const depth = scoreMetric01(meta["npm_score_quality"] as number | null | undefined);

			return {
				freshness: clamp(freshness),
				popularity: clamp(popularity),
				activity: clamp(activity),
				depth: clamp(depth),
			};
		},
	};
}
