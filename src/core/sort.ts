/**
 * Entry sorting — shared between README render and site.
 *
 * Sort key: popularity score (desc) → name (asc, case-insensitive).
 *
 * Popularity is extracted from source-specific metadata:
 *   - npm: monthly downloads
 *   - GitHub: stars
 *   - YouTube: views
 *   - Hacker News: points
 *   - Brave: (no numeric metric, defaults to 0)
 */

import type { CategorizedEntry } from "./types";
import { EntrySource } from "./types";

/** Extract a numeric popularity score from entry metadata for sorting. */
function getPopularityScore(entry: CategorizedEntry): number {
	const meta = entry.metadata as Record<string, unknown>;
	switch (entry.source) {
		case EntrySource.NpmSearch:
			return (meta["npm_downloads_monthly"] as number) ?? 0;
		case EntrySource.GitHubSearch:
			return (meta["stars"] as number) ?? 0;
		case EntrySource.YouTubeSearch:
			return (meta["views"] as number) ?? 0;
		case EntrySource.HackerNewsSearch:
			return (meta["points"] as number) ?? 0;
		default:
			return 0;
	}
}

/** Sort entries using the canonical ordering: popularity (desc) → name (asc). */
export function sortEntries(entries: CategorizedEntry[]): CategorizedEntry[] {
	return [...entries].sort((a, b) => {
		const pa = getPopularityScore(a);
		const pb = getPopularityScore(b);
		if (pb !== pa) return pb - pa;
		return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
	});
}
