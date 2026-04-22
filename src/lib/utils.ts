/**
 * Shared utilities used across the pipeline (discover, enrich, generate).
 */

import type { CategorizedEntry, Category } from "./types.ts";

// ─── HTML entity decoding ──────────────────────────────────────────────────────

/** Decode common HTML entities (&#39; &amp; &quot; etc.) to their plain-text equivalents. */
export function decodeHtmlEntities(s: string): string {
	return s
		.replace(/&#39;/g, "'")
		.replace(/&#x27;/g, "'")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"');
}

// ─── Display name ──────────────────────────────────────────────────────────────

/**
 * Extract a clean display name from an entry.
 */
export function displayName(entry: CategorizedEntry): string {
	// YouTube entries: use metadata title if available
	if (entry.id.startsWith("YT_")) {
		const meta = entry.metadata as Record<string, unknown>;
		const title = meta["title"] as string | undefined;
		if (title) return decodeHtmlEntities(title);
		return `Video: ${entry.id.replace("YT_", "")}`;
	}

	// GitHub entries: extract repo name from URL (id is "owner-repo")
	if (entry.url.includes("github.com/")) {
		const match = entry.url.match(/github\.com\/[^/]+\/([^/]+)/);
		if (match?.[1]) return match[1];
	}

	// npm packages: use name as-is
	return entry.name || entry.id;
}

// ─── Category metadata ─────────────────────────────────────────────────────────

export interface CategoryMeta {
	title: string;
	icon: string;
	description: string;
}

/**
 * Per-category display metadata (title, icon, description).
 * Shared between the README generator, site generator, and any future consumers.
 */
export const CATEGORY_META: Record<Category, CategoryMeta> = {
	extension: {
		title: "Extensions",
		icon: "🔌",
		description:
			"Extend pi's capabilities — custom tools, hooks, integrations, and UI modifications.",
	},
	skill: {
		title: "Skills",
		icon: "🧠",
		description: "Reusable instruction sets (SKILL.md) that teach pi new workflows and behaviors.",
	},
	tool: {
		title: "Tools & Utilities",
		icon: "🛠️",
		description:
			"Standalone tools, CLIs, and utilities built for or compatible with the pi ecosystem.",
	},
	theme: {
		title: "Themes",
		icon: "🎨",
		description: "Custom themes and color schemes for the pi TUI.",
	},
	provider: {
		title: "Providers & Integrations",
		icon: "🔗",
		description: "LLM providers, API integrations, and service connectors for pi.",
	},
	template: {
		title: "Templates",
		icon: "📋",
		description: "Project templates and starters for building pi packages.",
	},
	video: {
		title: "Videos & Tutorials",
		icon: "🎬",
		description: "Talks, tutorials, walkthroughs, and demos from the community.",
	},
	example: {
		title: "Examples & Recipes",
		icon: "📝",
		description: "Sample code, patterns, and recipes for pi development.",
	},
	documentation: {
		title: "Documentation",
		icon: "📚",
		description: "Guides, references, and documentation projects for pi.",
	},
};
