/**
 * Category metadata and aggregation for the site.
 *
 * Data access comes from @pipeline/core/store (Repository-backed).
 * This module handles presentation: display names, icons, grouping, stats.
 */

import { sortEntries } from "@pipeline/core/sort";
import type { CategorizedEntry, Category, HealthLevel } from "@pipeline/core/types";
import { CATEGORIES } from "@pipeline/core/types";

// ─── Category metadata ────────────────────────────────────────────────────────

export interface CategoryMeta {
	slug: string;
	href: string;
	icon: string;
	title: string;
	description: string;
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
	extension: {
		slug: "extension",
		href: "/extensions",
		icon: "🔌",
		title: "Extensions",
		description:
			"Extend Pi's capabilities — custom tools, hooks, integrations, skills, and MCP servers.",
	},
	theme: {
		slug: "theme",
		href: "/themes",
		icon: "🎨",
		title: "Themes",
		description: "Custom themes and color schemes for the Pi TUI.",
	},
	video: {
		slug: "video",
		href: "/videos",
		icon: "🎬",
		title: "Videos & Tutorials",
		description: "Talks, tutorials, walkthroughs, and demos from the community.",
	},
	misc: {
		slug: "misc",
		href: "/misc",
		icon: "📦",
		title: "Miscellaneous",
		description:
			"CLIs, dashboards, providers, templates, configurations, and other Pi-related projects.",
	},
};

/** Categories in display order. */
export const CATEGORY_ORDER: readonly Category[] = CATEGORIES;

// ─── Aggregation types ────────────────────────────────────────────────────────

export interface CategoryInfo {
	slug: Category;
	href: string;
	icon: string;
	title: string;
	description: string;
	entries: CategorizedEntry[];
}

export interface Stats {
	total: number;
	active: number;
	maintained: number;
	stale: number;
	dead: number;
}

// ─── Aggregation helpers ──────────────────────────────────────────────────────

/** Group entries by category and return presentation-ready category objects. */
export function getCategories(entries: CategorizedEntry[]): CategoryInfo[] {
	const grouped = new Map<Category, CategorizedEntry[]>();
	for (const entry of entries) {
		const list = grouped.get(entry.category) ?? [];
		list.push(entry);
		grouped.set(entry.category, list);
	}

	return CATEGORY_ORDER.filter((cat) => {
		const list = grouped.get(cat);
		return list && list.length > 0;
	}).map((cat) => {
		const meta = CATEGORY_META[cat];
		return {
			slug: cat,
			href: meta.href,
			icon: meta.icon,
			title: meta.title,
			description: meta.description,
			entries: sortEntries(grouped.get(cat) ?? []),
		};
	});
}

/** Compute health-level counts across all entries. */
export function getStats(entries: CategorizedEntry[]): Stats {
	const counts: Record<HealthLevel, number> = {
		active: 0,
		maintained: 0,
		stale: 0,
		dead: 0,
	};
	for (const entry of entries) {
		counts[entry.health.level]++;
	}
	return {
		total: entries.length,
		...counts,
	};
}
