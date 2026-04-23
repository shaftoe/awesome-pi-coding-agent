/**
 * Thin re-export layer — all data logic lives in src/lib/site-data.ts.
 * The site only handles presentation.
 */
export {
	CATEGORY_META,
	CATEGORY_ORDER,
	type CategorizedEntry,
	type Category,
	type CategoryInfo,
	decodeHtmlEntities,
	displayName,
	formatStars,
	getCategories,
	getStats,
	type Health,
	type HealthLevel,
	loadAllEntries,
	timeAgo,
} from "@pipeline/lib/site-data.ts";
