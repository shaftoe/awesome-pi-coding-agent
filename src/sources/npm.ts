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
import {
	clamp,
	formatKNumber,
	scoreActivityDays,
	scoreFreshness,
	scoreMetric01,
} from "./scoring.ts";
import type { Source } from "./source.ts";

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

/** GitHub API response for GET /repos/{owner}/{repo}. */
interface GitHubRepoResponse {
	full_name: string;
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

/**
 * Extract the `owner/repo` path from a GitHub URL.
 * Returns null if the URL is not a valid GitHub repo URL.
 */
function parseGitHubOwnerRepo(url: string): string | null {
	const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
	if (!match?.[1]) return null;
	// Strip trailing .git or slashes
	return match[1].replace(/\.git$/, "").replace(/\/+$/, "");
}

/**
 * Build common headers for GitHub API requests.
 * Uses GITHUB_TOKEN env var if available for higher rate limits.
 */
function buildGitHubFetchInit(): RequestInit {
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

const GITHUB_API = "https://api.github.com";
/** GitHub API: 30 req/min authenticated, 10 req/min unauthenticated. */
const GITHUB_REQUESTS_PER_SECOND = 0.5;

export function createNpmSource(cache: Cache, opts: NpmSourceOptions = {}): Source {
	const queries = opts.queries ?? DEFAULT_QUERIES;

	const fetcher = new ThrottledFetcher({ requestsPerSecond: REQUESTS_PER_SECOND });

	// Separate throttled fetcher for GitHub API enrichment calls.
	// Uses GITHUB_TOKEN if available for higher rate limits.
	const githubFetcher = new ThrottledFetcher({ requestsPerSecond: GITHUB_REQUESTS_PER_SECOND });
	const githubFetchInit = buildGitHubFetchInit();

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
			const parts: string[] = [];

			// Downloads (always first)
			const downloads = meta["npm_downloads_monthly"];
			if (typeof downloads === "number" && downloads > 0) {
				parts.push(`\u2B07 ${formatKNumber(downloads)}/mo`);
			}

			// GitHub stars (enriched data)
			const stars = meta["stars"];
			if (typeof stars === "number" && stars > 0) {
				parts.push(`\u2B50${formatKNumber(stars)}`);
			}

			return parts.join(" ");
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

		/** Enrich NPM candidates that have a github_url with GitHub repo data (stars, forks, etc.). */
		async enrich(writer: DiscoveryWriter): Promise<void> {
			const lines = writer.listByDiscoverer("npm");
			if (lines.length === 0) return;

			// Collect unique GitHub owner/repo pairs → candidate URLs mapping
			const repoToLines = new Map<string, typeof lines>();
			for (const line of lines) {
				const meta = line.discovery.metadata ?? {};
				const githubUrl = meta["github_url"];
				if (typeof githubUrl !== "string") continue;
				const ownerRepo = parseGitHubOwnerRepo(githubUrl);
				if (!ownerRepo) continue;
				const existing = repoToLines.get(ownerRepo);
				if (existing) {
					existing.push(line);
				} else {
					repoToLines.set(ownerRepo, [line]);
				}
			}

			if (repoToLines.size === 0) {
				process.stderr.write("[npm] 🔧 No GitHub URLs to enrich\n");
				return;
			}

			process.stderr.write(`[npm] 🔧 Enriching ${repoToLines.size} packages with GitHub data...\n`);

			let enriched = 0;
			let failed = 0;

			for (const [ownerRepo, matchedLines] of repoToLines) {
				const url = `${GITHUB_API}/repos/${ownerRepo}`;

				let body: unknown;

				if (cache) {
					const cacheKey = `enrich:github:${ownerRepo}`;
					const cached = cache.get<unknown>(cacheKey);
					if (cached !== null) {
						body = cached;
					} else if (opts.offline) {
						continue;
					} else {
						const response = await githubFetcher.fetch(url, githubFetchInit);
						if (!response.ok) {
							failed++;
							continue;
						}
						body = await response.json();
						cache.set(cacheKey, body);
					}
				} else if (opts.offline) {
					continue;
				} else {
					const response = await githubFetcher.fetch(url, githubFetchInit);
					if (!response.ok) {
						failed++;
						continue;
					}
					body = await response.json();
				}

				const repo = body as GitHubRepoResponse;

				// Merge GitHub fields into the metadata of each matching candidate
				for (const line of matchedLines) {
					const meta = { ...(line.discovery.metadata ?? {}) };
					meta["stars"] = repo.stargazers_count ?? 0;
					meta["forks"] = repo.forks_count ?? 0;
					meta["open_issues"] = repo.open_issues_count ?? 0;
					meta["topics"] = repo.topics ?? [];
					meta["language"] = repo.language ?? null;
					meta["archived"] = repo.archived ?? false;
					meta["github_pushed_at"] = repo.pushed_at ?? null;
					meta["github_updated_at"] = repo.updated_at ?? null;
					meta["github_created_at"] = repo.created_at ?? null;
					meta["size"] = repo.size ?? 0;
					meta["license"] = repo.license?.spdx_id ?? null;

					// Re-write with enriched metadata
					writer.write("npm", {
						...line.discovery,
						metadata: meta,
					});
					enriched++;
				}
			}

			process.stderr.write(
				`[npm] 🔧 Enriched ${enriched} packages with GitHub data (${failed} failed)\n`,
			);
		},

		scoreHealthDimensions(entry: Entry): HealthDimensions {
			const meta = entry.metadata ?? {};

			// Freshness: prefer GitHub pushed_at (last commit) over npm published_at
			const ghPushedAt = meta["github_pushed_at"] as string | null | undefined;
			const npmPublishedAt = meta["published_at"] as string | null | undefined;
			const freshness = scoreFreshness(ghPushedAt ?? npmPublishedAt);

			// Popularity: blend npm downloads and GitHub stars
			const downloads = meta["npm_downloads_monthly"] as number | null | undefined;
			let downloadScore: number;
			if (downloads == null) {
				downloadScore = 5;
			} else if (downloads >= 10_000) {
				downloadScore = 100;
			} else if (downloads >= 1_000) {
				downloadScore = 70;
			} else if (downloads >= 100) {
				downloadScore = 40;
			} else if (downloads >= 10) {
				downloadScore = 20;
			} else {
				downloadScore = 5;
			}

			const stars = meta["stars"] as number | null | undefined;
			let starScore: number;
			if (stars == null) {
				starScore = 0; // No penalty if we don't have star data
			} else if (stars >= 1_000) {
				starScore = 100;
			} else if (stars >= 100) {
				starScore = 70;
			} else if (stars >= 10) {
				starScore = 40;
			} else if (stars >= 1) {
				starScore = 20;
			} else {
				starScore = 5;
			}

			// Weighted blend: downloads 60%, stars 40% (when stars are available)
			const popularity = stars != null ? downloadScore * 0.6 + starScore * 0.4 : downloadScore;

			// Activity: prefer GitHub activity signals when available
			let activity: number;
			const ghUpdatedAt = meta["github_updated_at"] as string | null | undefined;
			const ghOpenIssues = meta["open_issues"] as number | null | undefined;
			if (ghUpdatedAt != null) {
				// Use GitHub activity scoring (same as GitHub source)
				activity = scoreActivityDays(ghUpdatedAt, ghOpenIssues);
			} else {
				// Fall back to npm maintenance score
				activity = scoreMetric01(meta["npm_score_maintenance"] as number | null | undefined);
			}

			// Depth: npm quality score (0–1)
			const depth = scoreMetric01(meta["npm_score_quality"] as number | null | undefined);

			return {
				freshness: clamp(freshness),
				popularity: clamp(Math.round(popularity)),
				activity: clamp(activity),
				depth: clamp(depth),
			};
		},
	};
}
