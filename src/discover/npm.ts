/**
 * npm registry discovery — find pi-agent packages.
 *
 * **Primary source** for the identity model. The npm package name (including
 * scope) is the canonical entry ID. GitHub URLs from `package.json` are stored
 * in metadata for later enrichment, not used as the primary URL or ID.
 *
 * Uses the npm v1 search endpoint with pagination (`from` + `size`, max 250/page).
 * Includes retry with exponential backoff on 429 (rate-limit) responses
 * and a polite inter-page delay to stay under the registry's throttle.
 */

import { QueryDiscoverer } from "./index.ts";

const NPM_SEARCH_URL = "https://registry.npmjs.org/-/v1/search";
const PAGE_SIZE = 250;
/** Max results to collect per query term before stopping. */
const MAX_RESULTS = 500;
/** Base delay between pagination requests (ms). */
const INTER_PAGE_DELAY = 300;
/** Max retry attempts on 429 responses. */
const MAX_RETRIES = 3;
/** Base backoff delay for 429 retries (ms), doubled each attempt. */
const RETRY_BASE_DELAY = 2000;

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
 * Uses exponential backoff: 2s → 4s → 8s.
 */
async function fetchPageWithRetry(url: string): Promise<Response> {
	for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
		const response = await fetch(url);

		if (response.status !== 429) {
			return response;
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
	return fetch(url);
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
 * Fetch paginated results for a single search term.
 * Pages through `from` offset, respecting rate-limits and a result cap.
 *
 * Each candidate carries:
 * - `id` = full npm package name (including scope)
 * - `url` = npm package page
 * - `metadata.github_url` = GitHub repo from package.json (for enrichment)
 * - `metadata.description`, `metadata.keywords`, `metadata.version` from search
 */
async function fetchAllPages(
	term: string,
): Promise<{ url: string; hint: string; id: string; metadata: Record<string, unknown> }[]> {
	const results: { url: string; hint: string; id: string; metadata: Record<string, unknown> }[] =
		[];
	let from = 0;

	while (results.length < MAX_RESULTS) {
		const remaining = MAX_RESULTS - results.length;
		const size = Math.min(PAGE_SIZE, remaining);

		const url = `${NPM_SEARCH_URL}?text=${encodeURIComponent(term)}&size=${size}&from=${from}`;
		const response = await fetchPageWithRetry(url);

		if (!response.ok) {
			throw new Error(`npm search returned ${response.status} for "${term}" (from=${from})`);
		}

		const data = (await response.json()) as NpmSearchResponse;
		const objects = data.objects ?? [];

		for (const obj of objects) {
			if (results.length >= MAX_RESULTS) break;

			const pkg = obj.package;
			const githubUrl = cleanGitHubUrl(pkg.links.repository);

			results.push({
				url: pkg.links.npm,
				hint: `npm:${term}`,
				id: pkg.name, // full package name, scope preserved
				metadata: {
					github_url: githubUrl ?? null,
					npm_name: pkg.name,
					description: pkg.description ?? "",
					keywords: pkg.keywords ?? [],
					version: pkg.version ?? null,
				},
			});
		}

		from += objects.length;

		// No more results available or hit the cap
		if (objects.length === 0 || from >= data.total) {
			break;
		}

		// Polite delay to avoid hitting rate limits
		await sleep(INTER_PAGE_DELAY);
	}

	return results;
}

export const npmDiscoverer = new QueryDiscoverer({
	name: "npm",
	source: "npm-search",
	queries: ["pi-agent", "pi-extension", "pi-skill", "pi-coding-agent"],
	fetchQuery: fetchAllPages,
});
