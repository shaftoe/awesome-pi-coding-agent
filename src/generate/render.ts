/**
 * Rendering logic for Stage 4 — generates README.md from canonical entries.
 *
 * Reads all CategorizedEntry files from data/entries/, groups by category,
 * sorts within each group, and renders the full awesome-list markdown.
 */

import "../../src/core/temporal.ts";

import { sortEntries } from "../core/sort.ts";
import { formatBuildTimestamp } from "../core/timestamp.ts";
import type { CategorizedEntry, EntrySource, HealthLevel } from "../core/types.ts";

// ─── Health badge ──────────────────────────────────────────────────────────────

const HEALTH_BADGE: Record<HealthLevel, string> = {
	active: "\u{1F7E2}", // green circle
	maintained: "\u{1F7E1}", // yellow circle
	stale: "\u{1F7E0}", // orange circle
	dead: "\u{1F534}", // red circle
};

// ─── Category metadata ────────────────────────────────────────────────────────

interface CategoryMeta {
	heading: string;
	description: string;
	/** Reserved for future layout variations. */
	table: boolean;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
	extension: {
		heading: "Extensions",
		description:
			"Extend pi's capabilities -- custom tools, hooks, integrations, and UI modifications.",
		table: true,
	},
	theme: {
		heading: "Themes",
		description: "Custom themes and color schemes for the pi TUI.",
		table: true,
	},
	video: {
		heading: "Videos & Tutorials",
		description: "Talks, tutorials, walkthroughs, and demos from the community.",
		table: true,
	},
	misc: {
		heading: "Miscellaneous",
		description:
			"CLIs, dashboards, providers, templates, configurations, and other pi-related projects.",
		table: true,
	},
};

/** Priority order for categories in the TOC and body. */
const CATEGORY_ORDER = ["extension", "theme", "video", "misc"] as const;

// ─── Relative time formatting ─────────────────────────────────────────────────

function relativeTime(isoDate: string): string {
	try {
		const then = Temporal.Instant.from(isoDate);
		const now = Temporal.Now.instant();
		const dur = now.until(then, { smallestUnit: "second" });
		// dur is negative (past)
		const absMs = Math.abs(dur.total("millisecond"));
		const days = Math.floor(absMs / 86_400_000);

		if (days === 0) return "today";
		if (days === 1) return "yesterday";
		if (days < 30) return `${days}d ago`;
		if (days < 60) return "~1mo ago";
		if (days < 365) return `${Math.round(days / 30)}mo ago`;
		const years = Math.round(days / 365);
		return `${years}y ago`;
	} catch {
		return "";
	}
}

// ─── Popularity formatting ────────────────────────────────────────────────────

function formatPopularity(entry: CategorizedEntry): string {
	const meta = entry.metadata as Record<string, unknown>;

	// YouTube entries: views
	const views = meta["views"];
	if (typeof views === "number" && views > 0) {
		return `\u{1F4FA}${formatNumber(views)}`;
	}

	// GitHub entries: stars
	const stars = meta["stars"];
	if (typeof stars === "number" && stars > 0) {
		return `\u2B50${formatNumber(stars)}`;
	}

	// npm entries: monthly downloads
	const downloads = meta["npm_downloads_monthly"];
	if (typeof downloads === "number" && downloads > 0) {
		return `\u2B07 ${formatNumber(downloads)}/mo`;
	}

	return "";
}

function formatNumber(n: number): string {
	if (n >= 1000) {
		const v = n / 1000;
		return v % 1 === 0 ? `${v}k` : `${v.toFixed(1)}k`;
	}
	return String(n);
}

// ─── Updated date ─────────────────────────────────────────────────────────────

function formatUpdated(entry: CategorizedEntry): string {
	const meta = entry.metadata as Record<string, unknown>;
	// Try various date fields
	const dateFields = ["pushed_at", "published_at", "updated_at"];
	for (const field of dateFields) {
		if (typeof meta[field] === "string") {
			return relativeTime(meta[field] as string);
		}
	}
	return "";
}

// ─── Escape markdown ──────────────────────────────────────────────────────────

function escapeMarkdown(text: string): string {
	return text.replace(/\|/g, "\\|").replace(/\n/g, " ").substring(0, 200); // Truncate long descriptions
}

// sortEntries lives in core/sort.ts — shared with site

// ─── Source counts ─────────────────────────────────────────────────────────────

function sourceLabel(source: EntrySource): string {
	switch (source) {
		case "npm-search":
			return "npm";
		case "github-search":
			return "GitHub";
		case "youtube-search":
			return "YouTube";
		case "discord":
			return "Discord";
		case "manual":
			return "Manual";
		default:
			return source;
	}
}

// ─── Render table section ─────────────────────────────────────────────────────

function renderTableSection(
	heading: string,
	description: string,
	entries: CategorizedEntry[],
): string {
	const sorted = sortEntries(entries);
	const lines: string[] = [];

	lines.push(`## ${heading}`);
	lines.push("");
	lines.push(`*${description}*`);
	lines.push("");
	lines.push("| Health | Name | Description | Popularity | Updated |");
	lines.push("|:------:|------|-------------|----------:|--------:|");

	for (const entry of sorted) {
		const health = HEALTH_BADGE[entry.health.level] ?? entry.health.level;
		const name = `[${escapeMarkdown(entry.name)}](${entry.url})`;
		const desc = escapeMarkdown(entry.description);
		const popularity = formatPopularity(entry);
		const updated = formatUpdated(entry);
		lines.push(`| ${health} | ${name} | ${desc} | ${popularity} | ${updated} |`);
	}

	lines.push("");
	return lines.join("\n");
}

// ─── Render full README ───────────────────────────────────────────────────────

export interface GenerateOptions {
	total: number;
	byCategory: Record<string, number>;
	byHealth: Record<string, number>;
	bySource: Record<string, number>;
	grouped: Record<string, CategorizedEntry[]>;
}

export function renderREADME(opts: GenerateOptions): string {
	const sections: string[] = [];

	// ── Header ──
	sections.push(`# Awesome Pi Coding Agent

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

A curated, auto-discovered directory of resources for the [Pi Coding Agent](https://pi.dev/) ecosystem. Updated daily.

Content available as Markdown here and as website (with search feature) live at <https://awesome-pi.site>.

> Last updated: ${formatBuildTimestamp()}`);

	// ── Stats ──
	const active = opts.byHealth["active"] ?? 0;
	const maintained = opts.byHealth["maintained"] ?? 0;
	sections.push(`
## Stats

**${opts.total} resources** indexed \u00b7 **${active}** active \u00b7 **${maintained}** maintained \u00b7 [Updated daily.](./.github/workflows/pipeline.yml)

Status: \u{1F7E2} Active \u00b7 \u{1F7E1} Maintained \u00b7 \u{1F7E0} Stale \u00b7 \u{1F534} Dead`);

	// ── TOC ──
	const tocLines: string[] = [];
	tocLines.push("## Contents");
	tocLines.push("");
	for (const cat of CATEGORY_ORDER) {
		const meta = CATEGORY_META[cat];
		if (!meta) continue;
		const count = opts.byCategory[cat] ?? 0;
		if (count === 0) continue;
		const anchor = meta.heading
			.toLowerCase()
			.replace(/[^a-z0-9 -]/g, "") // strip non-alphanumeric (keep spaces & hyphens)
			.replace(/ /g, "-"); // spaces to hyphens (preserves double-dash from stripped '&')
		tocLines.push(`- [${meta.heading}](#${anchor}) \u2014 ${count}`);
	}
	sections.push(tocLines.join("\n"));

	// ── Category sections ──
	for (const cat of CATEGORY_ORDER) {
		const meta = CATEGORY_META[cat];
		const entries = opts.grouped[cat];
		if (!meta || !entries || entries.length === 0) continue;

		sections.push(renderTableSection(meta.heading, meta.description, entries));
	}

	// ── Footer ──
	const sourceParts = Object.entries(opts.bySource)
		.sort(([, a], [, b]) => b - a)
		.map(([src, count]) => `${sourceLabel(src as EntrySource)}: ${count}`)
		.join(", ");
	const now = Temporal.Now.instant().toString().substring(0, 10);

	sections.push(`---

- Generated on ${now} from ${opts.total} entries (${sourceParts})
- Auto-updated by [awesome-pi-coding-agent](https://github.com/shaftoe/awesome-pi-coding-agent)
`);

	return sections.join("\n\n");
}
