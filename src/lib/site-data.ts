/**
 * Site data layer — single source of truth for loading, filtering,
 * and presenting pipeline data. Used by both the README generator
 * and the Astro site.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { CategorizedEntry, Category } from "./types.ts";

// ─── Types (re-exported for consumers) ─────────────────────────────────────────

export type { CategorizedEntry, Category, Health, HealthLevel } from "./types.ts";

// ─── Category metadata ─────────────────────────────────────────────────────────

export interface CategoryInfo {
	slug: Category;
	title: string;
	icon: string;
	description: string;
	href: string;
	entries: CategorizedEntry[];
}

export const CATEGORY_META: Record<
	Category,
	{ title: string; icon: string; description: string; href: string }
> = {
	extension: {
		title: "Extensions",
		icon: "🔌",
		description:
			"Extend pi's capabilities — custom tools, hooks, integrations, and UI modifications.",
		href: "/extensions",
	},
	tool: {
		title: "Tools & Utilities",
		icon: "🛠️",
		description:
			"Standalone tools, CLIs, and utilities built for or compatible with the pi ecosystem.",
		href: "/tools",
	},
	theme: {
		title: "Themes",
		icon: "🎨",
		description: "Custom themes and color schemes for the pi TUI.",
		href: "/themes",
	},
	provider: {
		title: "Providers & Integrations",
		icon: "🔗",
		description: "LLM providers, API integrations, and service connectors for pi.",
		href: "/providers",
	},
	template: {
		title: "Templates",
		icon: "📋",
		description: "Project templates and starters for building pi packages.",
		href: "/templates",
	},
	video: {
		title: "Videos & Tutorials",
		icon: "🎬",
		description: "Talks, tutorials, walkthroughs, and demos from the community.",
		href: "/videos",
	},
	example: {
		title: "Examples & Recipes",
		icon: "📝",
		description: "Sample code, patterns, and recipes for pi development.",
		href: "/examples",
	},
	documentation: {
		title: "Documentation",
		icon: "📚",
		description: "Guides, references, and documentation projects for pi.",
		href: "/documentation",
	},
};

export const CATEGORY_ORDER: Category[] = [
	"extension",
	"tool",
	"theme",
	"provider",
	"template",
	"video",
	"example",
	"documentation",
];

// ─── Data loading ──────────────────────────────────────────────────────────────

/**
 * Resolve the pipeline data directory.
 * Same approach as the search-index integration: use process.cwd().
 * - Bun pipeline runs from project root → cwd()/data
 * - Astro dev/build runs from site/ → cwd()/../data
 */
function resolveDataDir(): string {
	const cwd = process.cwd();
	return cwd.endsWith("site") ? join(cwd, "..", "data") : join(cwd, "data");
}

const DATA_DIR = resolveDataDir();

function loadCategoryEntries(category: Category, dataDir: string): CategorizedEntry[] {
	const dir = join(dataDir, `${category}s`);
	if (!existsSync(dir)) return [];

	return readdirSync(dir)
		.filter((f) => f.endsWith(".json"))
		.map((file) => {
			const raw = readFileSync(join(dir, file), "utf-8");
			const entry = JSON.parse(raw) as Omit<CategorizedEntry, "category">;
			return { ...entry, category };
		});
}

/** Load all entries from disk. */
export function loadAllEntries(dataDir = DATA_DIR): CategorizedEntry[] {
	const entries: CategorizedEntry[] = [];
	for (const cat of CATEGORY_ORDER) {
		entries.push(...loadCategoryEntries(cat, dataDir));
	}
	return entries;
}

/** Get category info objects (only categories with entries). */
export function getCategories(dataDir = DATA_DIR): CategoryInfo[] {
	const all = loadAllEntries(dataDir);
	const grouped = new Map<Category, CategorizedEntry[]>();

	for (const entry of all) {
		const group = grouped.get(entry.category) ?? [];
		group.push(entry);
		grouped.set(entry.category, group);
	}

	return CATEGORY_ORDER.map((cat) => {
		const entries = grouped.get(cat) ?? [];
		const meta = CATEGORY_META[cat];
		return {
			slug: cat,
			title: meta.title,
			icon: meta.icon,
			description: meta.description,
			href: meta.href,
			entries: entries.sort((a, b) => b.health.score - a.health.score),
		};
	}).filter((c) => c.entries.length > 0);
}

/** Compute aggregate stats. */
export function getStats(entries: CategorizedEntry[]) {
	return {
		total: entries.length,
		active: entries.filter((e) => e.health.level === "active").length,
		maintained: entries.filter((e) => e.health.level === "maintained").length,
		stale: entries.filter((e) => e.health.level === "stale").length,
		dead: entries.filter((e) => e.health.level === "dead").length,
	};
}

// ─── Display helpers ───────────────────────────────────────────────────────────

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

export function displayName(e: CategorizedEntry): string {
	if (e.id.startsWith("YT_")) {
		const m = e.metadata as Record<string, unknown>;
		const raw = (m["title"] as string) || e.id.replace("YT_", "");
		return decodeHtmlEntities(raw);
	}
	if (e.url.includes("github.com/")) {
		const match = e.url.match(/github\.com\/[^/]+\/([^/]+)/);
		if (match?.[1]) return match[1];
	}
	return e.name || e.id;
}

export function formatStars(n: number): string {
	return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function timeAgo(iso: string): string {
	const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
	if (days < 1) return "today";
	if (days === 1) return "yesterday";
	if (days < 30) return `${days}d ago`;
	if (days < 365) return `${Math.floor(days / 30)}mo ago`;
	return `${Math.floor(days / 365)}y ago`;
}
