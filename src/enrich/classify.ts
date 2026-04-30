/**
 * Category classification — assign entries to one of four categories.
 *
 * Priority: extension > theme > video > article > misc
 *
 * Signals (in order):
 *   1. YouTube URLs → video (deterministic)
 *   2. README category scores (from enrichment)
 *   3. Name + description keyword matching
 *   4. Default fallback → misc
 *
 * Multi-category entries: extension always wins.
 * See docs/classification.md for the full design rationale.
 */

import { type CategorizedEntry, Category, type Entry, EntrySource } from "../core/types.ts";
import { getSuggestedCategory } from "../sources/index.ts";

// ─── Keywords ──────────────────────────────────────────────────────────────────

/** Keywords that signal an extension. Highest priority category. */
const EXTENSION_KEYWORDS = [
	"extension",
	"hook",
	"plugin",
	"mcp-server",
	"mcp server",
	"skill",
	"tool",
	"provider",
	"adapter",
	"bridge",
] as const;

/** Keywords that signal a theme. */
const THEME_KEYWORDS = [
	"theme",
	"colorscheme",
	"color-theme",
	"catppuccin",
	"dracula",
	"monokai",
	"gruvbox",
	"nord",
	"solarized",
	"rose-pine",
] as const;

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Check if any keyword appears in the text (case-insensitive). */
function matchesAny(text: string, keywords: readonly string[]): boolean {
	const lower = text.toLowerCase();
	return keywords.some((kw) => lower.includes(kw));
}

/**
 * Map a legacy/readme category string to our enum.
 * Returns null if the string can't be mapped.
 */
function mapCategory(raw: string): Category | null {
	const mapping: Record<string, Category> = {
		extension: Category.Extension,
		tool: Category.Misc,
		theme: Category.Theme,
		provider: Category.Extension,
		template: Category.Misc,
		video: Category.Video,
		example: Category.Misc,
		documentation: Category.Article,
		article: Category.Article,
		skill: Category.Extension,
	};
	return mapping[raw] ?? null;
}

/** Classify based on README category scores set during enrichment. */
function classifyByReadmeScores(entry: Entry): Category | null {
	const scores = entry.metadata?.["_readme_category_scores"] as Record<string, number> | undefined;
	if (!scores) return null;

	let bestRaw: string | null = null;
	let bestScore = 0;

	for (const [cat, score] of Object.entries(scores)) {
		if (score > bestScore) {
			bestScore = score;
			bestRaw = cat;
		}
	}

	if (!bestRaw || bestScore <= 0) return null;
	return mapCategory(bestRaw);
}

/** Check if the entry looks like a Pi package based on naming conventions. */
function isPiPackage(entry: Entry): boolean {
	const name = entry.name;

	// npm packages named pi-* or @scope/pi-* are Pi packages → Extension
	if (entry.source === EntrySource.NpmSearch) {
		if (/^pi-/.test(name) || /^@[^/]+\/pi-/.test(name)) return true;
	}

	return false;
}

/** Check for Pi-specific description patterns that indicate an extension. */
function hasPiExtensionSignal(entry: Entry): boolean {
	const desc = entry.description.toLowerCase();
	const name = entry.name.toLowerCase();

	// Explicit Pi package declarations
	if (desc.includes("pi package")) return true;
	if (desc.includes("package for pi")) return true;

	// Functional description ending with "for pi coding agent" or "for the pi coding agent"
	if (desc.includes("for pi coding agent")) return true;
	if (desc.includes("for the pi coding agent")) return true;
	if (desc.includes("for pi agent")) return true;
	if (desc.includes("for the pi agent")) return true;

	// Named with pi-related scope or pattern suggesting it's a pi extension
	if (entry.source === EntrySource.NpmSearch) {
		// Scoped packages with pi-related names (but not pi-prefixed, those are caught above)
		const piRelatedScopes = ["@pi-", "@rad-pi/", "@pi-orca/", "@pi-agents/", "@pi-lab/"];
		if (piRelatedScopes.some((s) => name.startsWith(s))) return true;
	}

	// Description explicitly says it provides functionality "for pi" (not just "built on pi")
	if (
		/(?:search|memory|notify|notification|browser|web|voice|image|telegram|discord|slack|dashboard|integration|monitoring|benchmark|testing|compaction|context|session|workflow|orchestration|sub.?agent|multi.?agent|provider|model|llm|git|review|memory|knowledge|search|rag|embedding|vector|database|sqlite|turso)\s+(?:for|to)\s+pi/i.test(
			desc,
		)
	)
		return true;

	return false;
}

/** Classify based on name and description keywords. */
function classifyByKeywords(name: string, description: string): Category {
	const combined = `${name} ${description}`;

	// Extension has highest priority — check first
	if (matchesAny(combined, EXTENSION_KEYWORDS)) return Category.Extension;

	// Theme second
	if (matchesAny(combined, THEME_KEYWORDS)) return Category.Theme;

	// Default: misc
	return Category.Misc;
}

/** Classify based on entry metadata and naming patterns. */
function classifyBySignals(entry: Entry): Category | null {
	// Pi package naming conventions → Extension
	if (isPiPackage(entry)) return Category.Extension;

	// Pi-specific description patterns → Extension
	if (hasPiExtensionSignal(entry)) return Category.Extension;

	return null;
}

// ─── Public API ────────────────────────────────────────────────────────────────

/** Classify an entry into a category. */
export function classifyEntry(entry: Entry): CategorizedEntry {
	let category: Category;

	// 1. Source suggested category (e.g. YouTube → Video)
	const suggested = getSuggestedCategory(entry.source as EntrySource);
	if (suggested) {
		category = suggested;
	}
	// 2. Pi-specific naming/description signals → extension
	else {
		const signalCategory = classifyBySignals(entry);
		if (signalCategory) {
			category = signalCategory;
		}
		// 3. README scores (from enrichment)
		else {
			const readmeCategory = classifyByReadmeScores(entry);
			if (readmeCategory) {
				category = readmeCategory;
			}
			// 4. Keywords → extension > theme > misc
			else {
				category = classifyByKeywords(entry.name, entry.description);
			}
		}
	}

	return { ...entry, category };
}
