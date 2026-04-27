/**
 * Thin re-export facade for the site.
 *
 * Data access → @pipeline/core (Repository-backed, SQLite-ready)
 * Presentation → local ./categories.ts and ./format.ts
 */

// HTML entity decode from pipeline core
export { decodeHtmlEntities } from "@pipeline/core/html";
// Data access from pipeline core
export { loadAllEntries } from "@pipeline/core/store";

// Types from pipeline core
export type { CategorizedEntry, Category, Health, HealthLevel } from "@pipeline/core/types";

// Presentation: category metadata + aggregation
export {
	CATEGORY_META,
	CATEGORY_ORDER,
	type CategoryInfo,
	type CategoryMeta,
	getCategories,
	getStats,
} from "./categories";

// Presentation: formatting helpers
export {
	displayName,
	formatNumber,
	formatStars,
	lastUpdated,
	popularity,
	popularityValue,
	timeAgo,
} from "./format";
