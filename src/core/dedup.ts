/**
 * Duplicate detection — check if a candidate URL is already stored.
 *
 * With the flattened repository (keyed by URL), the Repository itself handles
 * URL uniqueness. This module provides priority-aware merging: when an npm
 * package and a GitHub repo point to the same project, the npm entry wins.
 */

import type { Repository } from "./repository.ts";
import type { CategorizedEntry } from "./types.ts";

// ─── Indices ───────────────────────────────────────────────────────────────────

export interface DuplicationIndices {
	byUrl: Map<string, CategorizedEntry>;
	byGitHubUrl: Map<string, CategorizedEntry>;
}

/** Build indices from an entry repository. */
export function buildIndices(repo: Repository<CategorizedEntry>): DuplicationIndices {
	const byUrl = new Map<string, CategorizedEntry>();
	const byGitHubUrl = new Map<string, CategorizedEntry>();

	for (const entry of repo.list()) {
		byUrl.set(entry.url, entry);

		const meta = (entry.metadata ?? {}) as Record<string, unknown>;
		if (typeof meta["github_url"] === "string") {
			byGitHubUrl.set(meta["github_url"], entry);
		}
	}

	return { byUrl, byGitHubUrl };
}

// ─── Duplicate check ───────────────────────────────────────────────────────────

export interface DuplicateCheck {
	isDuplicate: boolean;
	matchedBy?: "url" | "github_url";
	existingEntry?: CategorizedEntry;
}

export function checkDuplicate(
	candidate: { url: string; metadata?: Record<string, unknown> },
	indices: DuplicationIndices,
): DuplicateCheck {
	// Check by URL (primary key)
	const byUrl = indices.byUrl.get(candidate.url);
	if (byUrl) {
		return { isDuplicate: true, matchedBy: "url", existingEntry: byUrl };
	}

	// Check by GitHub URL — npm packages may reference a GitHub repo
	if (candidate.metadata?.["github_url"] && typeof candidate.metadata["github_url"] === "string") {
		const byGhUrl = indices.byGitHubUrl.get(candidate.metadata["github_url"] as string);
		if (byGhUrl) {
			return { isDuplicate: true, matchedBy: "github_url", existingEntry: byGhUrl };
		}
	}

	return { isDuplicate: false };
}
