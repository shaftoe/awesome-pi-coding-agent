/**
 * Source registry — creates all discovery sources with shared infrastructure.
 */

import type { Cache } from "../core/cache.ts";
import type { CategorizedEntry } from "../core/types.ts";
import { type Category, EntrySource } from "../core/types.ts";
import { createBraveWebSearchSource } from "./brave.ts";
import { createGitHubSource } from "./github.ts";
import { createHackerNewsSource } from "./hackernews.ts";
import { createNpmSource } from "./npm.ts";
import type { Source } from "./source.ts";
import { createYouTubeSource } from "./youtube.ts";

export interface SourceOverrides {
	/** Override npm source queries. Pass empty array to skip npm entirely. */
	npmQueries?: string[];
	/** Override GitHub repo search queries. Pass empty array to skip GitHub entirely. */
	githubRepoQueries?: string[];
	/** Override YouTube search queries. Pass empty array to skip YouTube entirely. */
	youtubeQueries?: string[];
	/** Override Hacker News search queries. Pass empty array to skip HN entirely. */
	hackerNewsQueries?: string[];
	/** Override Brave Web Search queries. Pass empty array to skip Brave entirely. */
	braveQueries?: string[];
	/** Run all sources in offline mode — only cached responses. */
	offline?: boolean;
}

/** Prefixes recognized by parseQueryPrefix(). */
export type QueryTarget = "npm" | "gh" | "yt" | "hn" | "brave";

/** Parse a query string with a required source prefix.
 *
 * Syntax: `source:term`
 *   - `"npm:pi-coding-agent"`    → { target: "npm", term: "pi-coding-agent" }
 *   - `"gh:pi-extension"`        → { target: "gh", term: "pi-extension" }
 *   - `"yt:pi coding agent"`     → { target: "yt", term: "pi coding agent" }
 *   - `"hn:pi coding agent"`     → { target: "hn", term: "pi coding agent" }
 *   - `"brave:pi coding agent"`  → { target: "brave", term: "pi coding agent" }
 *   - `"pi-coding-agent"`        → throws (prefix required)
 */
export function parseQueryPrefix(raw: string): { target: QueryTarget; term: string } {
	const match = raw.match(/^(npm|gh|yt|hn|brave):(.+)$/s);
	if (match?.[1] && match[2]) {
		return { target: match[1] as QueryTarget, term: match[2] };
	}
	throw new Error(
		`Invalid query "${raw}": source prefix required (npm:, gh:, yt:, hn:, brave:). Example: --query "npm:pi-coding-agent"`,
	);
}

/** Route parsed --query arguments into SourceOverrides.
 *
 * - `npm:` queries      → npmQueries
 * - `gh:` queries       → githubRepoQueries
 * - `yt:` queries       → youtubeQueries
 * - `hn:` queries       → hackerNewsQueries
 * - `brave:` queries    → braveQueries
 * - Sources that receive queries run only those queries (no defaults).
 * - Sources NOT mentioned get `[]` to skip them entirely.
 * - When no queries are provided at all, returns {} so sources use defaults.
 * - Unprefixed queries cause an immediate error.
 */
export function routeQueries(rawQueries: string[]): {
	npmQueries?: string[];
	githubRepoQueries?: string[];
	youtubeQueries?: string[];
	hackerNewsQueries?: string[];
	braveQueries?: string[];
} {
	if (rawQueries.length === 0) return {};

	const npm: string[] = [];
	const ghRepo: string[] = [];
	const yt: string[] = [];
	const hn: string[] = [];
	const brave: string[] = [];

	for (const raw of rawQueries) {
		const { target, term } = parseQueryPrefix(raw);
		switch (target) {
			case "npm":
				npm.push(term);
				break;
			case "gh":
				ghRepo.push(term);
				break;
			case "yt":
				yt.push(term);
				break;
			case "hn":
				hn.push(term);
				break;
			case "brave":
				brave.push(term);
				break;
		}
	}

	// When any --query is provided, unmentioned sources get [] (skip them).
	// Only return {} (use defaults) when no queries were provided at all (handled above).
	return {
		npmQueries: npm,
		githubRepoQueries: ghRepo,
		youtubeQueries: yt,
		hackerNewsQueries: hn,
		braveQueries: brave,
	};
}

/**
 * Create all discovery sources.
 * Returns only sources that have the required config (e.g. API keys).
 */
export function createAllSources(cache: Cache, overrides: SourceOverrides = {}): Source[] {
	const sources: Source[] = [];

	// npm — always available (no API key required)
	const npmOpts: { queries?: string[]; offline?: boolean } = {};
	if (overrides.npmQueries) npmOpts.queries = overrides.npmQueries;
	if (overrides.offline) npmOpts.offline = overrides.offline;
	sources.push(createNpmSource(cache, npmOpts));

	// GitHub — works without token but rate-limited (10 req/min vs 30 req/min)
	const githubOpts: { repoQueries?: string[]; offline?: boolean } = {};
	if (overrides.githubRepoQueries) githubOpts.repoQueries = overrides.githubRepoQueries;
	if (overrides.offline) githubOpts.offline = overrides.offline;
	sources.push(createGitHubSource(cache, githubOpts));

	// YouTube — requires YOUTUBE_API_KEY (gracefully skipped if missing)
	const ytOpts: { queries?: string[]; offline?: boolean } = {};
	if (overrides.youtubeQueries) ytOpts.queries = overrides.youtubeQueries;
	if (overrides.offline) ytOpts.offline = overrides.offline;
	const ytSource = createYouTubeSource(cache, ytOpts);
	if (ytSource) sources.push(ytSource);

	// Hacker News — always available (no API key required)
	const hnOpts: { queries?: string[]; offline?: boolean } = {};
	if (overrides.hackerNewsQueries) hnOpts.queries = overrides.hackerNewsQueries;
	if (overrides.offline) hnOpts.offline = overrides.offline;
	sources.push(createHackerNewsSource(cache, hnOpts));

	// Brave Web Search — requires BRAVE_API_KEY (gracefully skipped if missing)
	const braveOpts: { queries?: string[]; offline?: boolean } = {};
	if (overrides.braveQueries) braveOpts.queries = overrides.braveQueries;
	if (overrides.offline) braveOpts.offline = overrides.offline;
	const braveSource = createBraveWebSearchSource(cache, braveOpts);
	if (braveSource) sources.push(braveSource);

	return sources;
}

// ─── Convenience dispatchers (for CLI tools and pipeline stages) ─────────────

/** All known source instances for dispatching. */
function allKnownSources(): Source[] {
	return [
		createNpmSource(null as never, { offline: true }),
		createGitHubSource(null as never, { offline: true }),
		createYouTubeSource(null as never, { offline: true }) ?? UNKNOWN_SOURCE,
		createHackerNewsSource(null as never, { offline: true }),
		createBraveWebSearchSource(null as never, { offline: true }) ?? UNKNOWN_SOURCE,
	];
}

/**
 * Normalize a URL by applying the matching source's normalizer.
 * Tries each source's normalizeUrl; falls back to identity.
 */
export function normalizeUrl(url: string): string {
	for (const source of allKnownSources()) {
		const normalized = source.normalizeUrl(url);
		if (normalized !== url) return normalized;
	}
	return url;
}

/**
 * Extract a human-readable ID from a URL using the matching source.
 * Tries each source's extractId; falls back to last URL segment.
 */
export function extractId(url: string): string {
	for (const source of allKnownSources()) {
		const id = source.extractId(url);
		const fallback = url.split("/").filter(Boolean).pop() ?? url;
		if (id !== fallback) return id;
	}
	return url.split("/").filter(Boolean).pop() ?? url;
}

/** Extract a numeric popularity value from entry metadata (for sorting). */
export function getPopularityValue(entry: CategorizedEntry): number {
	return getSource(entry.source).getPopularityValue(entry);
}

/** Format an entry's popularity for the README table using its source. */
export function formatPopularity(entry: CategorizedEntry): string {
	return getSource(entry.source).formatPopularity(entry);
}

/** Get a source's display name. */
export function getDisplayName(source: EntrySource): string {
	return getSource(source).displayName;
}

/** Get a source's suggested category (or null). */
export function getSuggestedCategory(source: EntrySource): Category | null {
	return getSource(source).suggestedCategory;
}

/** Get a source's priority. */
export function getPriority(source: EntrySource): number {
	return getSource(source).priority;
}

// ─── Source registry ───────────────────────────────────────────────────────────

/** Default source for unknown EntrySource values. */
const UNKNOWN_SOURCE: Source = {
	name: "unknown",
	source: "manual" as EntrySource,
	displayName: "Manual",
	priority: 99,
	suggestedCategory: null,
	discover: async () => {},
	normalizeUrl: (url: string) => url,
	extractId: (url: string) => url.split("/").filter(Boolean).pop() ?? url,
	getPopularityValue: () => 0,
	formatPopularity: () => "",
};

/** Lazy-populated registry of source instances by EntrySource. */
const sourceCache = new Map<EntrySource, Source>();

/** Get a source instance by EntrySource. Returns UNKNOWN_SOURCE for unrecognized values. */
export function getSource(source: EntrySource): Source {
	if (sourceCache.has(source)) return sourceCache.get(source) as Source;

	let src: Source | null = null;
	switch (source) {
		case EntrySource.NpmSearch:
			src = createNpmSource(null as never, { offline: true });
			break;
		case EntrySource.GitHubSearch:
			src = createGitHubSource(null as never, { offline: true });
			break;
		case EntrySource.YouTubeSearch:
			src = createYouTubeSource(null as never, { offline: true });
			break;
		case EntrySource.HackerNewsSearch:
			src = createHackerNewsSource(null as never, { offline: true });
			break;
		case EntrySource.BraveWebSearch:
			src = createBraveWebSearchSource(null as never, { offline: true });
			break;
	}

	const result = src ?? UNKNOWN_SOURCE;
	sourceCache.set(source, result);
	return result;
}
