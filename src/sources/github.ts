/**
 * GitHub discovery — find Pi Coding Agent repositories via GitHub Search API.
 *
 * Searches by name, description, and topics using the canonical SEARCH_TERMS
 * from core, formatted as GitHub query syntax.
 *
 * Uses GitHub Search API with numbered-page pagination (max 100/page, 1000 results max).
 *
 * Requires `GITHUB_TOKEN` env var for reasonable rate limits:
 *   - Unauthenticated: 10 req/min (search), 60 req/hr (general)
 *   - Authenticated:   30 req/min (search), 5000 req/hr (general)
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
import { clamp, scoreActivityDays, scoreFreshness } from "./scoring.ts";
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

const GITHUB_API = "https://api.github.com";
const PAGE_SIZE = 100;
/** GitHub Search API: 30 req/min authenticated, 10 req/min unauthenticated. */
const REQUESTS_PER_SECOND = 0.5;
/** GitHub Search returns at most 1000 results per query. */
const MAX_RESULTS = 1000;

/** Default queries: canonical search terms formatted for GitHub search. */
const DEFAULT_REPO_QUERIES = SEARCH_TERMS.map((term) => `${term} language:TypeScript`);

// ─── Types ─────────────────────────────────────────────────────────────────────

interface GitHubRepo {
	full_name: string;
	html_url: string;
	description: string | null;
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
	topics: string[];
	language: string | null;
	archived: boolean;
	created_at: string;
	pushed_at: string | null;
	updated_at: string;
	size: number;
	license: { key: string; name: string; spdx_id: string } | null;
}

interface GitHubSearchResponse {
	total_count: number;
	incomplete_results: boolean;
	items: GitHubRepo[];
}

export interface GitHubSourceOptions {
	/** Override default repo search queries. */
	repoQueries?: string[] | undefined;
	/** Run in offline mode — only use cached responses, never hit the network. */
	offline?: boolean | undefined;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Build a candidate from a GitHub repo. */
function repoToCandidate(
	repo: GitHubRepo,
	queryType: string,
	term: string,
	extra?: Record<string, unknown>,
) {
	return {
		url: repo.html_url,
		hint: `github-${queryType}:${term}`,
		id: repo.full_name.replace("/", "-"),
		metadata: {
			github_url: repo.html_url,
			repo_full_name: repo.full_name,
			description: repo.description ?? "",
			stars: repo.stargazers_count,
			forks: repo.forks_count,
			open_issues: repo.open_issues_count,
			topics: repo.topics ?? [],
			language: repo.language ?? null,
			archived: repo.archived,
			created_at: repo.created_at,
			pushed_at: repo.pushed_at,
			updated_at: repo.updated_at,
			size: repo.size,
			license: repo.license?.spdx_id ?? null,
			...(extra ?? {}),
		},
	};
}

/** Parse a GitHub repo search response. */
function parseRepoResponse(body: unknown): { items: GitHubRepo[]; total: number } {
	const data = body as GitHubSearchResponse;
	return { items: data.items ?? [], total: Math.min(data.total_count ?? 0, MAX_RESULTS) };
}

/**
 * Build common headers for GitHub API requests.
 * Uses GITHUB_TOKEN env var if available for higher rate limits.
 */
function buildFetchInit(): RequestInit {
	const headers: Record<string, string> = {
		Accept: "application/vnd.github+json",
		"X-GitHub-Api-Version": "2022-11-28",
	};

	const token = process.env["GITHUB_TOKEN"];
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}

	return { headers };
}

// ─── Source factory ────────────────────────────────────────────────────────────

export function createGitHubSource(cache: Cache, opts: GitHubSourceOptions = {}): Source {
	const repoQueries = opts.repoQueries ?? DEFAULT_REPO_QUERIES;

	const fetcher = new ThrottledFetcher({ requestsPerSecond: REQUESTS_PER_SECOND });
	const fetchInit = buildFetchInit();

	async function fetchQuery(
		term: string,
	): Promise<{ url: string; hint: string; id: string; metadata: Record<string, unknown> }[]> {
		const maxPages = Math.ceil(MAX_RESULTS / PAGE_SIZE);

		const { items } = await paginate<GitHubRepo>({
			fetcher,
			cache,
			offline: opts.offline,
			fetchInit,
			maxPages,
			buildUrl: (page) =>
				`${GITHUB_API}/search/repositories?q=${encodeURIComponent(term)}&per_page=${PAGE_SIZE}&page=${page}&sort=stars&order=desc`,
			parse: parseRepoResponse,
		});

		return items.map((repo) => repoToCandidate(repo, "repo", term));
	}

	return {
		name: "github",
		source: EntrySource.GitHubSearch,
		displayName: "GitHub",
		priority: 1,
		healthCap: 100,
		suggestedCategory: null,

		normalizeUrl(url: string): string {
			return url;
		},

		extractId(url: string): string {
			const ghMatch = url.match(/github\.com\/([^/]+\/[^/]+)/);
			if (ghMatch?.[1]) return ghMatch[1].replace("/", "-");
			return url.split("/").filter(Boolean).pop() ?? url;
		},

		formatPopularity(entry: CategorizedEntry): string {
			const meta = entry.metadata as Record<string, unknown>;
			const stars = meta["stars"];
			if (typeof stars === "number" && stars > 0) {
				return `\u2B50${formatKNumber(stars)}`;
			}
			return "";
		},

		async discover(writer: DiscoveryWriter): Promise<void> {
			for (const term of repoQueries) {
				process.stderr.write(`[github] 🔍 "${term}"...\n`);
				try {
					const results = await fetchQuery(term);
					const { written } = writeRaw("github", EntrySource.GitHubSearch, results, writer);
					process.stderr.write(`[github] → ${results.length} fetched, ${written} written\n`);
				} catch (err) {
					process.stderr.write(`[github] ⚠️  Failed: ${err}\n`);
				}
			}
		},

		scoreHealthDimensions(entry: Entry): HealthDimensions {
			const meta = entry.metadata ?? {};

			const freshness = scoreFreshness(meta["pushed_at"] as string | null | undefined);

			// Popularity: stars
			const stars = meta["stars"] as number | null | undefined;
			let popularity: number;
			if (stars == null) {
				popularity = 5;
			} else if (stars >= 1_000) {
				popularity = 100;
			} else if (stars >= 100) {
				popularity = 70;
			} else if (stars >= 10) {
				popularity = 40;
			} else if (stars >= 1) {
				popularity = 20;
			} else {
				popularity = 5;
			}

			// Activity: updated_at recency + open issues bonus
			const activity = scoreActivityDays(
				meta["updated_at"] as string | null | undefined,
				meta["open_issues"] as number | null | undefined,
			);

			// Depth: repo size in KB
			const size = meta["size"] as number | null | undefined;
			let depth: number;
			if (size == null) {
				depth = 10;
			} else if (size >= 10_000) {
				depth = 100;
			} else if (size >= 1_000) {
				depth = 60;
			} else if (size >= 100) {
				depth = 30;
			} else {
				depth = 10;
			}

			return {
				freshness: clamp(freshness),
				popularity: clamp(popularity),
				activity: clamp(activity),
				depth: clamp(depth),
			};
		},
	};
}
