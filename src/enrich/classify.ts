import { classifyContent } from "../core/category.ts";
import type { CategorizedEntry, Entry } from "../core/types.ts";
import { getSuggestedCategory } from "../sources/index.ts";

export function classifyEntry(entry: Entry): CategorizedEntry {
	const category = getSuggestedCategory(entry.source) ?? classifyContent(entry);
	return { ...entry, category };
}
