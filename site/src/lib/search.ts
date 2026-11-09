import MiniSearch, { type SearchResult } from "minisearch";

// Compact JSON keys: n=name, d=description, c=category, u=URL,
// p=popularity label, t=topics/keywords.
export type SearchEntry = { n: string; d: string; c: string; u: string; p: string; t?: string };
let index:
	| Promise<{
			search: MiniSearch<SearchEntry>;
			names: Array<{ entry: SearchEntry; name: string }>;
	  }>
	| undefined;

export function preloadSearch() {
	index ??= (async () => {
		const response = await fetch("/search-index.json");
		if (!response.ok) throw new Error(`Search index: ${response.status}`);
		const entries: SearchEntry[] = await response.json();
		const search = new MiniSearch<SearchEntry>({
			// URLs uniquely identify entries across categories.
			idField: "u",
			// Search names, descriptions, categories and tags; exclude popularity.
			fields: ["n", "d", "c", "t"],
			// Return only the fields cards need; tags affect matching but are not displayed.
			storeFields: ["n", "d", "c", "u", "p"],
			// Retain all-word matching and support searching while typing.
			searchOptions: { combineWith: "AND", prefix: true },
		});
		// Larger native chunks avoid thousands of timer yields on this directory.
		await search.addAllAsync(entries, { chunkSize: 500 });
		return { search, names: entries.map((entry) => ({ entry, name: entry.n.toLowerCase() })) };
	})().catch((error) => {
		index = undefined;
		throw error;
	});
	return index;
}

/** Download once; subsequent matching, ranking and card data stay in memory. */
export async function searchEntries(query: string, limit = Number.POSITIVE_INFINITY) {
	if (!query.trim()) return { entries: [], total: 0 };
	const { search, names } = await preloadSearch();
	// MiniSearch's types do not encode the configured storeFields.
	const results: SearchEntry[] = search.search(query) as (SearchResult & SearchEntry)[];
	const tokenize: (text: string) => string[] = MiniSearch.getDefault("tokenize");
	const terms = tokenize(query.toLowerCase()).filter(Boolean);
	if (terms.length) {
		// Keep ranked word/prefix matches first; append name-only substrings such as lodge → elflodge.
		const seen = new Set(results.map((entry) => entry.u));
		for (const { entry, name } of names) {
			if (!seen.has(entry.u) && terms.every((term) => name.includes(term))) {
				results.push(entry);
				seen.add(entry.u);
			}
		}
	}
	const entries = results.slice(0, limit);
	return { entries, total: results.length };
}
