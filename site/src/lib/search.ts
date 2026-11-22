import MiniSearch, { type SearchResult } from "minisearch";

// Compact JSON keys: n=name, d=description, c=category, u=URL,
// p=popularity label, t=topics/keywords.
export type SearchEntry = { n: string; d: string; c: string; u: string; p: string; t?: string };
type SearchIndex = {
	search: MiniSearch<SearchEntry>;
	names: Array<{ entry: SearchEntry; name: string }>;
};
let indexPromise: Promise<SearchIndex> | undefined;

const tokenize: (text: string) => string[] = MiniSearch.getDefault("tokenize");

// Keep name matching and highlighting on MiniSearch's word boundaries so "agent-batch" highlights "Agent Batch".
function queryTerms(query: string) {
	return tokenize(query.toLowerCase()).filter(Boolean);
}

function escapeHtml(s: string): string {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeRegex(s: string): string {
	return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function createHighlighter(query: string) {
	const terms = queryTerms(query).sort((a, b) => b.length - a.length);
	if (!terms.length) return escapeHtml;
	const pattern = new RegExp(`(${terms.map(escapeRegex).join("|")})`, "gi");
	return (text: string) =>
		text
			.split(pattern)
			.map((part, i) => (i % 2 === 1 ? `<mark>${escapeHtml(part)}</mark>` : escapeHtml(part)))
			.join("");
}

export function preloadSearch() {
	indexPromise ??= (async () => {
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
		// Let the next search retry if loading the index failed.
		indexPromise = undefined;
		throw error;
	});
	return indexPromise;
}

export function searchEntries(
	{ search, names }: SearchIndex,
	query: string,
	limit = Number.POSITIVE_INFINITY,
) {
	if (!query.trim()) return { entries: [], total: 0 };
	// MiniSearch's types do not encode the configured storeFields.
	const results: SearchEntry[] = search.search(query) as (SearchResult & SearchEntry)[];
	const terms = queryTerms(query);
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

export function createSearchHandler(
	input: Pick<HTMLInputElement, "value">,
	view: {
		onQuery?: (query: string) => void;
		showResults: (query: string, results: ReturnType<typeof searchEntries>) => void;
		showLoadError: () => void;
		limit?: number;
	},
) {
	let timer: ReturnType<typeof setTimeout> | undefined;
	let waitingForIndex = false;

	async function searchNow() {
		clearTimeout(timer);
		timer = undefined;
		const text = input.value.trim();
		if (!text) {
			view.showResults("", { entries: [], total: 0 });
			return;
		}
		view.onQuery?.(text);
		if (waitingForIndex) return;
		waitingForIndex = true;
		let index: SearchIndex;
		try {
			index = await preloadSearch();
		} catch {
			if (timer === undefined && input.value.trim()) view.showLoadError();
			return;
		} finally {
			waitingForIndex = false;
		}

		// If typing resumed, the next pause will run the search.
		if (timer !== undefined) return;
		const query = input.value.trim();
		if (query) view.showResults(query, searchEntries(index, query, view.limit));
	}

	function onInput() {
		if (input.value.trim()) {
			clearTimeout(timer);
			timer = setTimeout(searchNow, 150);
		} else {
			void searchNow();
		}
	}

	return { searchNow, onInput };
}
