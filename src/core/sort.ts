/**
 * Entry sorting — shared between README render and site.
 *
 * Sort key: popularity score (desc) → name (asc, case-insensitive).
 *
 * Popularity is extracted from source-specific metadata via the Source interface:
 *   - npm: monthly downloads
 *   - GitHub: stars
 *   - YouTube: views
 *   - Hacker News: points
 *   - Brave: (no numeric metric, defaults to 0)
 */

import { getPopularityValue } from "../sources/index.ts";
import type { CategorizedEntry } from "./types";

/** Sort entries using the canonical ordering: popularity (desc) → name (asc). */
export function sortEntries(entries: CategorizedEntry[]): CategorizedEntry[] {
	return [...entries].sort((a, b) => {
		const pa = getPopularityValue(a);
		const pb = getPopularityValue(b);
		if (pb !== pa) return pb - pa;
		return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
	});
}
