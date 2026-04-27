/**
 * Category classification — assign entries to one of four categories.
 *
 * Priority: extension > theme > video > misc
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

import { type CategorizedEntry, Category, type Entry } from "../core/types.ts";

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

const YOUTUBE_HOSTS = ["youtube.com", "youtu.be"];

function isYouTubeUrl(url: string): boolean {
	return YOUTUBE_HOSTS.some((h) => url.includes(h));
}

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
		provider: Category.Misc,
		template: Category.Misc,
		video: Category.Video,
		example: Category.Misc,
		documentation: Category.Misc,
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

// ─── Public API ────────────────────────────────────────────────────────────────

/** Classify an entry into a category. */
export function classifyEntry(entry: Entry): CategorizedEntry {
	let category: Category;

	// 1. YouTube URLs → video
	if (isYouTubeUrl(entry.url)) {
		category = Category.Video;
	}
	// 2. README scores (from enrichment)
	else {
		const readmeCategory = classifyByReadmeScores(entry);
		if (readmeCategory) {
			category = readmeCategory;
		}
		// 3. Keywords → extension > theme > misc
		else {
			category = classifyByKeywords(entry.name, entry.description);
		}
	}

	return { ...entry, category };
}
