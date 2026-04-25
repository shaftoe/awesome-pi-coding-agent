/**
 * npm registry discovery — find pi-agent packages.
 *
 * **Primary source** for the identity model. The npm package name (including
 * scope) is the canonical entry ID. GitHub URLs from `package.json` are stored
 * in metadata for later enrichment, not used as the primary URL or ID.
 *
 * Uses the npm v1 search endpoint with pagination (`from` + `size`, max 250/page).
 * Includes retry with exponential backoff on 429 (rate-limit) responses.
 *
 * Query strategy (Phase 1 improvement):
 *   Tier 1 — High-precision `keywords:` queries that target the Pi community
 *            convention (~95%+ relevance, paginate fully).
 *   Tier 2 — Broad text queries as catch-all (low relevance, limited to 1 page).
 *
 * Smart pagination (Phase 6 improvement):
 *   For broad queries, track the relevance rate per page and stop early when
 *   results dry up. This saves ~80% of API calls on noisy queries.
 *
 * NOTE: The npm search endpoint rate-limits by IP and does NOT honor Bearer
 * tokens for rate-limit purposes (as of 2026). Auth tokens only help with
 * publishing and private package access. We use generous inter-page delays
 * and aggressive backoff on 429s to stay under the throttle.
 */

import { isRelevant } from "./filter.ts";
import { QueryDiscoverer } from "./index.ts";

const NPM_SEARCH_URL = "https://registry.npmjs.org/-/v1/search";
const PAGE_SIZE = 250;
/**
 * Base delay between pagination requests (ms).
 * Kept high (2s) because npm rate-limits by IP with no auth bypass.
 */
const INTER_PAGE_DELAY = 2000;
/**
 * Extra delay to add after any 429 retry (ms).
 * Stacks on top of the exponential backoff to avoid immediate re-throttling.
 */
const POST_429_COOLDOWN = 3000;
/** Max retry attempts on 429 responses. */
const MAX_RETRIES = 5;
/** Base backoff delay for 429 retries (ms), doubled each attempt. */
const RETRY_BASE_DELAY = 2000;

// ─── Smart pagination config ──────────────────────────────────────────────────

/**
 * Minimum relevance rate (fraction of page passing the filter) to continue
 * paginating. Below this threshold we assume the rest is noise.
 */
const MIN_RELEVANCE_RATE = 0.1;
/**
 * Number of consecutive low-relevance pages before we stop.
 * Avoids stopping on a single bad page in a good query.
 */
const LOW_RELEVANCE_STREAK = 2;
/**
 * Minimum results fetched before we allow early stopping.
 * Ensures we always get at least the first few pages of good results.
 */
const MIN_RESULTS_BEFORE_STOP = 500;

interface NpmSearchResult {
	package: {
		name: string;
		description?: string;
		version?: string;
		keywords?: string[];
		links: {
			npm: string;
			repository?: string;
			homepage?: string;
		};
	};
}

interface NpmSearchResponse {
	total: number;
	objects: NpmSearchResult[];
}

/** Sleep for `ms` milliseconds. */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch a single page with retry on 429 (rate-limit).
 * Uses exponential backoff: 2s → 4s → 8s → 16s → 32s.
 * After a successful retry, the caller should apply a cooldown delay.
 */
async function fetchPageWithRetry(url: string): Promise<{ response: Response; hit429: boolean }> {
	for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
		const response = await fetch(url);

		if (response.status !== 429) {
			return { response, hit429: attempt > 0 };
		}

		if (attempt < MAX_RETRIES) {
			const delay = RETRY_BASE_DELAY * 2 ** attempt;
			process.stderr.write(
				`⏳ npm search rate-limited, retrying in ${delay / 1000}s (attempt ${attempt + 1}/${MAX_RETRIES})\n`,
			);
			await sleep(delay);
		}
	}

	// Final attempt — return whatever we get (will be checked by caller)
	const response = await fetch(url);
	return { response, hit429: true };
}

/**
 * Convert a git+https URL to a clean https URL.
 * e.g. "git+https://github.com/owner/repo.git" → "https://github.com/owner/repo"
 */
function cleanGitHubUrl(raw: string | undefined): string | undefined {
	if (!raw) return undefined;
	const match = raw.match(/(?:git\+)?(https:\/\/github\.com\/[^/]+\/[^/]+)/);
	return match?.[1]?.replace(/\.git$/, "") ?? undefined;
}

/**
 * Build a candidate object from an npm search result.
 */
function buildCandidate(pkg: NpmSearchResult["package"], term: string) {
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
		},
	};
}

/**
 * Fetch paginated results for a high-precision keyword query.
 * Paginates through ALL available results since keyword queries have ~95%+ relevance.
 */
async function fetchKeywordQuery(
	term: string,
): Promise<{ url: string; hint: string; id: string; metadata: Record<string, unknown> }[]> {
	const results: { url: string; hint: string; id: string; metadata: Record<string, unknown> }[] =
		[];
	let from = 0;

	while (true) {
		const url = `${NPM_SEARCH_URL}?text=${encodeURIComponent(term)}&size=${PAGE_SIZE}&from=${from}`;
		const { response, hit429 } = await fetchPageWithRetry(url);

		if (!response.ok) {
			throw new Error(`npm search returned ${response.status} for "${term}" (from=${from})`);
		}

		const data = (await response.json()) as NpmSearchResponse;
		const objects = data.objects ?? [];

		for (const obj of objects) {
			results.push(buildCandidate(obj.package, term));
		}

		from += objects.length;

		if (objects.length === 0 || from >= data.total) {
			break;
		}

		const delay = hit429 ? INTER_PAGE_DELAY + POST_429_COOLDOWN : INTER_PAGE_DELAY;
		await sleep(delay);
	}

	return results;
}

/**
 * Fetch results for a broad text query with smart pagination.
 * Stops early when the relevance rate drops below the threshold,
 * saving API calls on queries that return 50K+ mostly-irrelevant results.
 */
async function fetchBroadQueryWithSmartPagination(
	term: string,
): Promise<{ url: string; hint: string; id: string; metadata: Record<string, unknown> }[]> {
	const results: { url: string; hint: string; id: string; metadata: Record<string, unknown> }[] =
		[];
	let from = 0;
	let lowRelevanceStreak = 0;

	while (true) {
		const url = `${NPM_SEARCH_URL}?text=${encodeURIComponent(term)}&size=${PAGE_SIZE}&from=${from}`;
		const { response, hit429 } = await fetchPageWithRetry(url);

		if (!response.ok) {
			throw new Error(`npm search returned ${response.status} for "${term}" (from=${from})`);
		}

		const data = (await response.json()) as NpmSearchResponse;
		const objects = data.objects ?? [];

		// Count how many on this page pass the relevance filter
		let relevantOnPage = 0;
		for (const obj of objects) {
			const candidate = buildCandidate(obj.package, term);
			results.push(candidate);

			const check = isRelevant({
				url: candidate.url,
				id: candidate.id,
				metadata: candidate.metadata as Record<string, unknown>,
			});
			if (check.accept) {
				relevantOnPage++;
			}
		}

		from += objects.length;

		if (objects.length === 0 || from >= data.total) {
			break;
		}

		// Smart pagination: check relevance rate after we've fetched enough
		if (from >= MIN_RESULTS_BEFORE_STOP) {
			const relevanceRate = relevantOnPage / objects.length;
			if (relevanceRate < MIN_RELEVANCE_RATE) {
				lowRelevanceStreak++;
				if (lowRelevanceStreak >= LOW_RELEVANCE_STREAK) {
					process.stderr.write(
						`📊 npm "${term}": stopping at ${from} results (relevance rate ${(relevanceRate * 100).toFixed(1)}% < ${MIN_RELEVANCE_RATE * 100}%)\n`,
					);
					break;
				}
			} else {
				lowRelevanceStreak = 0;
			}
		}

		const delay = hit429 ? INTER_PAGE_DELAY + POST_429_COOLDOWN : INTER_PAGE_DELAY;
		await sleep(delay);
	}

	return results;
}

export const npmDiscoverer = new QueryDiscoverer({
	name: "npm",
	source: "npm-search",
	queries: [
		// Tier 1: High-precision keyword queries — paginate fully (~95%+ relevance)
		"keywords:pi-package",
		"keywords:pi-extension",
		"keywords:pi-theme",
		"keywords:pi-coding-agent",
		// Tier 2: Broad text queries — smart pagination with early stopping
		"pi-agent",
		"pi-extension",
		"pi-skill",
		"pi-coding-agent",
	],
	fetchQuery: async (term) => {
		// Use the appropriate fetch strategy based on query type
		const isKeywordQuery = term.startsWith("keywords:");
		if (isKeywordQuery) {
			return fetchKeywordQuery(term);
		}
		return fetchBroadQueryWithSmartPagination(term);
	},
});
