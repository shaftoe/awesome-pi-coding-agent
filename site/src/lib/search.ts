import MiniSearch, { type SearchResult } from "minisearch";

export type SearchEntry = { n: string; d: string; c: string; u: string; p: string; t?: string };
let index: Promise<MiniSearch<SearchEntry>> | undefined;

export function preloadSearch() {
	index ??= (async () => {
		const response = await fetch("/search-index.json");
		if (!response.ok) throw new Error(`Search index: ${response.status}`);
		const entries: SearchEntry[] = await response.json();
		const search = new MiniSearch<SearchEntry>({
			idField: "u",
			fields: ["n", "d", "c", "t"],
			storeFields: ["n", "d", "c", "u", "p"],
			// Retain all-word matching and support searching while typing.
			searchOptions: { combineWith: "AND", prefix: true },
		});
		// Larger native chunks avoid thousands of timer yields on this directory.
		await search.addAllAsync(entries, { chunkSize: 500 });
		return search;
	})().catch((error) => {
		index = undefined;
		throw error;
	});
	return index;
}

/** Download once; subsequent matching, ranking and card data stay in memory. */
export async function searchEntries(query: string, limit = Number.POSITIVE_INFINITY) {
	if (!query.trim()) return { entries: [], total: 0 };
	const search = await preloadSearch();
	const results = search.search(query);
	// MiniSearch's types do not encode the configured storeFields.
	const entries = results.slice(0, limit) as (SearchResult & SearchEntry)[];
	return { entries, total: results.length };
}
