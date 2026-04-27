/**
 * Entry sorting — shared between README render and site.
 *
 * Sort key: health level (Active first) → health score (desc) → name (asc, case-insensitive).
 */

import type { CategorizedEntry, HealthLevel } from "./types";

const HEALTH_PRIORITY: Record<HealthLevel, number> = {
	active: 0,
	maintained: 1,
	stale: 2,
	dead: 3,
};

/** Sort entries using the canonical ordering: health level → score → name. */
export function sortEntries(entries: CategorizedEntry[]): CategorizedEntry[] {
	return [...entries].sort((a, b) => {
		const ha = HEALTH_PRIORITY[a.health.level] ?? 9;
		const hb = HEALTH_PRIORITY[b.health.level] ?? 9;
		if (ha !== hb) return ha - hb;
		if (b.health.score !== a.health.score) return b.health.score - a.health.score;
		return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
	});
}
