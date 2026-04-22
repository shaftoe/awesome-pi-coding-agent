/**
 * GitHub REST API client — native fetch, no `gh` CLI dependency.
 *
 * Authentication: reads GITHUB_TOKEN or GH_TOKEN from env.
 * Rate limit: 30 req/min for unauthenticated, 5,000/hr with a token.
 */

import type { DiscoveryCandidate } from "./types.ts";

// ─── Config ────────────────────────────────────────────────────────────────────

const API_BASE = "https://api.github.com";

function getToken(): string | undefined {
	return process.env["GITHUB_TOKEN"] || process.env["GH_TOKEN"];
}

function authHeaders(): Record<string, string> {
	const token = getToken();
	const headers: Record<string, string> = {
		Accept: "application/vnd.github+json",
		"X-GitHub-Api-Version": "2022-11-28",
		"User-Agent": "awesome-pi-coding-agent",
	};
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	return headers;
}

// ─── Generic request ───────────────────────────────────────────────────────────

async function apiGet<T>(path: string, params?: Record<string, string>): Promise<T> {
	const url = new URL(`${API_BASE}${path}`);
	if (params) {
		for (const [k, v] of Object.entries(params)) {
			url.searchParams.set(k, v);
		}
	}

	const response = await fetch(url.toString(), { headers: authHeaders() });

	if (!response.ok) {
		const body = await response.text().catch(() => "");
		throw new Error(`GitHub API ${response.status} ${path}: ${body.slice(0, 200)}`);
	}

	return (await response.json()) as T;
}

// ─── Search repos ──────────────────────────────────────────────────────────────

interface SearchRepoItem {
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
}

interface SearchReposResponse {
	total_count: number;
	items: SearchRepoItem[];
}

/** Max results per GitHub search query (API caps at 1000 total across all pages). */
const GH_SEARCH_MAX = 1000;
const GH_SEARCH_PER_PAGE = 100;

/** Sleep for `ms` milliseconds. */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Search GitHub repos by query string, paginating through all available results. */
export async function searchRepos(query: string): Promise<DiscoveryCandidate[]> {
	const allItems: SearchRepoItem[] = [];
	let page = 1;

	while (allItems.length < GH_SEARCH_MAX) {
		const data = await apiGet<SearchReposResponse>("/search/repositories", {
			q: query,
			per_page: String(GH_SEARCH_PER_PAGE),
			page: String(page),
			sort: "updated",
		});

		const items = data.items ?? [];
		allItems.push(...items);

		// No more results or exhausted the API's 1000-result cap
		if (items.length === 0 || allItems.length >= data.total_count) {
			break;
		}

		page++;

		// Polite delay between pages to avoid secondary rate limits
		await sleep(500);
	}

	return allItems.map((repo) => ({
		url: repo.html_url,
		source: "github-search" as const,
		hint: `github:${query}`,
		metadata: {
			description: repo.description ?? "",
			stars: repo.stargazers_count,
			forks: repo.forks_count,
			language: repo.language,
			topics: repo.topics ?? [],
			is_archived: repo.archived,
			is_fork: repo.fork,
			homepage: repo.homepage,
		},
	}));
}

// ─── Repo metadata ─────────────────────────────────────────────────────────────

interface RepoMetadata {
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
	language: string | null;
	license: { spdx_id: string } | null;
	pushed_at: string;
	topics: string[];
	archived: boolean;
	fork: boolean;
	description: string | null;
	homepage: string | null;
	default_branch: string;
}

/** Fetch full metadata for a GitHub repo (e.g. "owner/repo"). */
export async function getRepoMetadata(ownerRepo: string): Promise<RepoMetadata> {
	return await apiGet<RepoMetadata>(`/repos/${ownerRepo}`);
}
