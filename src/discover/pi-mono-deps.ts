/**
 * pi-mono dependency graph discovery — find repos that depend on Pi packages.
 *
 * Uses GitHub code search to find repos whose `package.json` lists
 * `@mariozechner/pi-coding-agent` (or other pi-mono packages) as a dependency.
 * These are Pi ecosystem projects by definition, even if they don't mention
 * "pi" in their name, description, or topics.
 *
 * This discoverer catches the "long tail" of extension/tool authors who don't
 * tag their repos or use the pi-package keyword convention.
 */

import { FatalDiscoveryError, QueryDiscoverer } from "./index.ts";

// ─── GitHub code search ───────────────────────────────────────────────────────

const GITHUB_API_BASE = "https://api.github.com";

/** pi-mono packages to search for in package.json dependency lists. */
const PI_MONO_PACKAGES = [
	"@mariozechner/pi-coding-agent",
	"@mariozechner/pi-agent-core",
	"@mariozechner/pi-mcp",
	"@mariozechner/pi-ai",
	"@mariozechner/pi-tui",
];

interface CodeSearchResultItem {
	repository: {
		html_url: string;
		full_name: string;
		description: string | null;
		stargazers_count: number;
		forks_count: number;
		language: string | null;
		topics: string[];
		archived: boolean;
		fork: boolean;
		homepage: string | null;
	};
}

interface CodeSearchResponse {
	total_count: number;
	items: CodeSearchResultItem[];
	incomplete_results: boolean;
}

/**
 * Search GitHub code for a query string, returning deduplicated repos.
 * GitHub code search is limited to 1000 results per query.
 */
async function searchCode(
	query: string,
): Promise<{ url: string; hint?: string; metadata?: Record<string, unknown> }[]> {
	const token = process.env["GITHUB_TOKEN"] || process.env["GH_TOKEN"];
	if (!token) {
		throw new FatalDiscoveryError("GITHUB_TOKEN not set — skipping pi-mono dependency discovery.");
	}

	const results: { url: string; hint?: string; metadata?: Record<string, unknown> }[] = [];
	const seen = new Set<string>();
	let page = 1;
	const PER_PAGE = 100;

	while (results.length < 1000) {
		const url = new URL(`${GITHUB_API_BASE}/search/code`);
		url.searchParams.set("q", query);
		url.searchParams.set("per_page", String(PER_PAGE));
		url.searchParams.set("page", String(page));

		const response = await fetch(url.toString(), {
			headers: {
				Accept: "application/vnd.github+json",
				"X-GitHub-Api-Version": "2022-11-28",
				Authorization: `Bearer ${token}`,
				"User-Agent": "awesome-pi-coding-agent",
			},
		});

		if (!response.ok) {
			const body = await response.text().catch(() => "");
			if (response.status === 403 || response.status === 401) {
				throw new FatalDiscoveryError(
					`GitHub API ${response.status} for code search: ${body.slice(0, 200)}`,
				);
			}
			throw new Error(`GitHub code search ${response.status}: ${body.slice(0, 200)}`);
		}

		const data = (await response.json()) as CodeSearchResponse;
		const items = data.items ?? [];

		for (const item of items) {
			const repoUrl = item.repository.html_url;
			if (seen.has(repoUrl)) continue;
			seen.add(repoUrl);

			results.push({
				url: repoUrl,
				hint: `pi-mono-deps:${query}`,
				metadata: {
					description: item.repository.description ?? "",
					stars: item.repository.stargazers_count,
					forks: item.repository.forks_count,
					language: item.repository.language,
					topics: item.repository.topics ?? [],
					is_archived: item.repository.archived,
					is_fork: item.repository.fork,
					homepage: item.repository.homepage,
				},
			});
		}

		if (items.length === 0 || results.length >= data.total_count) {
			break;
		}

		page++;
		// Respect secondary rate limits (code search is expensive)
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}

	return results;
}

export const piMonoDepsDiscoverer = new QueryDiscoverer({
	name: "pi-mono-deps",
	source: "github-search",
	queries: PI_MONO_PACKAGES.map((pkg) => `"${pkg}" filename:package.json`),
	fetchQuery: searchCode,
});
