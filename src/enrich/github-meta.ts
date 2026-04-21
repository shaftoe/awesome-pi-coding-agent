/**
 * GitHub metadata enrichment — fetch stars, forks, activity, etc.
 *
 * For npm-sourced entries, uses `metadata.github_url` instead of the
 * primary URL (which points to npmjs.com, not github.com).
 */

import { getRepoMetadata } from "../lib/github.ts";
import type { Entry, GitHubMetadata } from "../lib/types.ts";

/** Extract owner/repo from a GitHub URL. */
function parseOwnerRepo(url: string): string | null {
	const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
	if (!match?.[1]) return null;
	return match[1].replace(/\/$/, "");
}

/**
 * Get the GitHub URL to query for metadata.
 * For npm-sourced entries, use `metadata.github_url` instead of the primary URL.
 */
function getGitHubUrlForEnrichment(entry: Entry): string | null {
	// npm-sourced entries store the GitHub URL in metadata
	if (entry.source === "npm-search") {
		const meta = entry.metadata as Record<string, unknown>;
		return (meta["github_url"] as string) ?? null;
	}
	// GitHub-sourced entries use their primary URL
	if (entry.url.includes("github.com")) {
		return entry.url;
	}
	return null;
}

/** Check if an entry already has GitHub metadata. */
export function hasGitHubMeta(entry: Entry): boolean {
	const meta = entry.metadata as Record<string, unknown>;
	return typeof meta["stars"] === "number";
}

/** Check if an entry has *complete* GitHub metadata (all enriched fields). */
export function hasFullGitHubMeta(entry: Entry): boolean {
	const meta = entry.metadata as Record<string, unknown>;
	return (
		typeof meta["stars"] === "number" &&
		typeof meta["last_commit"] === "string" &&
		meta["last_commit"] !== ""
	);
}

/** Enrich an entry with GitHub metadata. Returns a modified entry or null on failure. */
export async function enrichGitHubMeta(entry: Entry): Promise<Entry | null> {
	const githubUrl = getGitHubUrlForEnrichment(entry);
	if (!githubUrl) return null;

	const ownerRepo = parseOwnerRepo(githubUrl);
	if (!ownerRepo) return null;

	try {
		const meta = await getRepoMetadata(ownerRepo);
		const gitHubMeta: GitHubMetadata = {
			stars: meta.stargazers_count,
			forks: meta.forks_count,
			open_issues: meta.open_issues_count,
			language: meta.language,
			license: meta.license?.spdx_id ?? null,
			last_commit: meta.pushed_at,
			topics: meta.topics ?? [],
			is_archived: meta.archived,
			is_fork: meta.fork,
			homepage: meta.homepage,
		};

		// Merge GitHub metadata into existing metadata (preserves npm fields)
		const existingMeta = entry.metadata as Record<string, unknown>;
		const description =
			entry.description || (existingMeta["description"] as string) || meta.description || "";

		return {
			...entry,
			description,
			metadata: {
				...existingMeta,
				...gitHubMeta,
			},
		};
	} catch (_err) {
		return null;
	}
}
