/**
 * Auto-classification — determine the category of an entry.
 */
import type { CategorizedEntry, Category, Entry } from "../lib/types.ts";

/** Simple rule-based classifier using URL, name, description, and README hints. */
export function classify(entry: Entry): Category {
	const text = `${entry.name} ${entry.description} ${entry.url}`.toLowerCase();
	const meta = entry.metadata as Record<string, unknown>;
	const readmeScores = (meta["_readme_category_scores"] ?? {}) as Record<string, number>;

	// Rule 1: YouTube URLs are always videos
	if (entry.url.includes("youtube.com") || entry.url.includes("youtu.be")) {
		return "video";
	}

	// Rule 2: Check for SKILL.md in repo hints
	if (readmeScores["skill"] && readmeScores["skill"] > 0) {
		return "skill";
	}

	// Rule 3: Name/description keyword matching
	if (text.includes("theme") || text.includes("rose-pine")) return "theme";
	if (text.includes("provider") || text.includes("model registry")) return "provider";
	if (text.includes("template") || text.includes("prompt template")) return "template";

	// Rule 4: Use README category scores if available
	const topCategory = Object.entries(readmeScores)
		.filter(([, score]) => score > 0)
		.sort(([, a], [, b]) => b - a)[0];
	if (topCategory) {
		return topCategory[0] as Category;
	}

	// Rule 5: Default heuristic — if it has "extension" anywhere, it's an extension
	if (text.includes("extension") || text.includes("hook")) return "extension";
	if (text.includes("tool") || text.includes("cli") || text.includes("dashboard")) return "tool";

	// Default: tool (catch-all for repos)
	return "tool";
}

/** Classify an entry and return it with the category attached. */
export function classifyEntry(entry: Entry): CategorizedEntry {
	return { ...entry, category: classify(entry) };
}
