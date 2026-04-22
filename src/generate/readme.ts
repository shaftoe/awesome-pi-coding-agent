/**
 * README.md generator — produce the awesome-list README from entry data.
 *
 * Features:
 *  - Clean display names (extract repo name from GitHub URLs)
 *  - Human-readable descriptions from source APIs
 *  - Relevance filtering (skip obviously unrelated packages)
 *  - Markdown tables for scannability
 *  - Rich video section
 *  - Per-category descriptions with icons
 */
import type { CategorizedEntry, Category, HealthLevel } from "../lib/types.ts";
import { CATEGORY_META, decodeHtmlEntities, displayName } from "../lib/utils.ts";

// ─── Constants ─────────────────────────────────────────────────────────────────

const HEALTH_EMOJI: Record<HealthLevel, string> = {
	active: "🟢",
	maintained: "🟡",
	stale: "🟠",
	dead: "🔴",
};

const CATEGORY_ORDER: Category[] = [
	"extension",
	"skill",
	"tool",
	"theme",
	"provider",
	"template",
	"video",
	"example",
	"documentation",
];

// ─── Relevance filtering ──────────────────────────────────────────────────────

/**
 * Known npm packages/organizations that are NOT pi-related but match
 * search terms due to generic naming (e.g. "extension").
 */
const KNOWN_FALSE_POSITIVE_PATTERNS = [
	// Tiptap (rich text editor)
	/^@tiptap\//,
	// Redux devtools
	/^@redux-devtools\//,
	// Statoscope (webpack stats)
	/^@statoscope\//,
	// Substrate (blockchain)
	/^@substrate\//,
	// Mux (video analytics)
	/^@mux\//,
	// VS Code
	/^@vscode\//,
	// Lexical (Meta's editor)
	/^@lexical\//,
	// Generic npm packages with "extension" in name
	/^extension-port-stream$/,
	/^default-require-extensions$/,
	/^cmd-extension$/,
	/^video-paste$/,
	/^websocket-extensions$/,
	// Micromark (markdown parser)
	/^micromark(-|$)/,
	// Generic tools
	/^interpret$/,
	/^jest-haste-map$/,
	/^langium$/,
	/^layout-base$/,
	/^tempfile$/,
	/^tempy$/,
	/^cose-base$/,
	/^change-file-extension$/,
	/^git-metadata$/,
	/^prettier-plugin-(astro|svelte)$/,
	/^publish-browser-extension$/,
	// Generic graphing
	/^graphify-pi$/,
	// oira666 — clearly a false positive
	/^oira666_pi-claude-chrome-extension$/,
];

/**
 * Check if an entry is likely relevant to the pi ecosystem.
 */
function isLikelyRelevant(entry: CategorizedEntry): boolean {
	const name = entry.name || entry.id;

	// Check against known false positive patterns
	for (const pattern of KNOWN_FALSE_POSITIVE_PATTERNS) {
		if (pattern.test(name)) return false;
	}

	return true;
}

// ─── Description ───────────────────────────────────────────────────────────────

/** Get the entry description. */
function displayDescription(entry: CategorizedEntry): string {
	const raw = entry.description || entry.name || entry.id;
	return decodeHtmlEntities(raw);
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

function formatStarCount(stars: number): string {
	if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
	return stars > 0 ? `⭐${stars}` : "";
}

function formatTimeAgo(isoDate: string): string {
	const now = Date.now();
	const then = new Date(isoDate).getTime();
	const days = Math.floor((now - then) / (1000 * 60 * 60 * 24));
	if (days < 1) return "today";
	if (days === 1) return "yesterday";
	if (days < 30) return `${days}d ago`;
	if (days < 365) return `${Math.floor(days / 30)}mo ago`;
	return `${Math.floor(days / 365)}y ago`;
}

/** Sort entries: by health score descending, then alphabetically by display name. */
function sortEntries(entries: CategorizedEntry[]): CategorizedEntry[] {
	return [...entries].sort((a, b) => {
		if (b.health.score !== a.health.score) return b.health.score - a.health.score;
		return displayName(a).localeCompare(displayName(b));
	});
}

/**
 * Generate a GitHub-compatible anchor id from a section title.
 *
 * GitHub's algorithm:
 * 1. Lowercase
 * 2. Remove anything that is not a letter, number, space, or hyphen
 *    (emojis, &, punctuation all removed)
 * 3. Replace each space with a hyphen (do NOT collapse)
 *
 * e.g. "Tools & Utilities" → "tools--utilities"
 */
function anchorId(title: string): string {
	return (
		title
			.toLowerCase()
			// Remove anything that isn't a letter, number, space, or hyphen
			.replace(/[^a-z0-9 -]/g, "")
			// Replace each individual space with a hyphen (preserving consecutive hyphens)
			.replace(/ /g, "-")
			// Strip leading hyphens (from emoji removal leaving "-Extensions")
			.replace(/^-+/, "")
	);
}

// ─── Section generators ───────────────────────────────────────────────────────

function generateHeader(
	entries: CategorizedEntry[],
	grouped: Map<Category, CategorizedEntry[]>,
): string {
	const total = entries.length;
	const active = entries.filter((e) => e.health.level === "active").length;
	const maintained = entries.filter(
		(e) => e.health.level === "active" || e.health.level === "maintained",
	).length;

	const lines: string[] = [
		`# Awesome Pi Coding Agent`,
		``,
		`[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)`,
		``,
		`A curated, auto-discovered directory of resources for the [Pi Coding Agent](https://pi.dev/) ecosystem.`,
		``,
		`Content available as Markdown here and as website (with search feature) live at <https://awesome-pi.site>.`,
		``,
		`## Stats`,
		``,
		`**${total} resources** indexed · **${active}** active · **${maintained}** maintained · [Updated daily.](./.github/workflows/pipeline.yml)`,
		``,
		`Status: 🟢 Active · 🟡 Maintained · 🟠 Stale · 🔴 Dead`,
		``,
		`## Contents`,
		``,
	];

	// TOC
	for (const cat of CATEGORY_ORDER) {
		const catEntries = grouped.get(cat);
		if (!catEntries?.length) continue;
		const meta = CATEGORY_META[cat];
		if (!meta) continue;
		lines.push(`- [${meta.title}](#${anchorId(meta.title)}) — ${catEntries.length}`);
	}

	return lines.join("\n");
}

function generateCategorySection(category: Category, entries: CategorizedEntry[]): string {
	const meta = CATEGORY_META[category];
	if (!meta) return "";
	const sorted = sortEntries(entries);

	const lines: string[] = [``, `---`, ``, `## ${meta.title}`, ``, `*${meta.description}*`, ``];

	if (category === "video") {
		generateVideoSection(sorted, lines);
	} else {
		generateTableSection(sorted, lines);
	}

	return lines.join("\n");
}

function generateTableSection(entries: CategorizedEntry[], lines: string[]): void {
	lines.push(`| Health | Name | Description | Stars | Updated |`);
	lines.push(`|:------:|------|-------------|------:|--------:|`);

	for (const entry of entries) {
		const emoji = HEALTH_EMOJI[entry.health.level];
		const name = displayName(entry);
		const desc = displayDescription(entry);
		const meta = entry.metadata as Record<string, unknown>;

		const stars = (meta["stars"] as number) ?? 0;
		const starStr = formatStarCount(stars);

		const lastCommit = meta["last_commit"] as string | null;
		const updated = lastCommit ? formatTimeAgo(lastCommit) : "";

		// Escape pipe characters in description
		const safeDesc = desc.replace(/\|/g, "\\|");

		lines.push(`| ${emoji} | [${name}](${entry.url}) | ${safeDesc} | ${starStr} | ${updated} |`);
	}
}

function generateVideoSection(entries: CategorizedEntry[], lines: string[]): void {
	for (const entry of entries) {
		const meta = entry.metadata as Record<string, unknown>;
		const channel = (meta["channel"] as string) ?? "";
		const views = ((meta["view_count"] as number) ?? 0).toLocaleString();
		const title = displayName(entry);

		const channelStr = channel ? ` — ${channel}` : "";
		const viewsStr = views !== "0" ? ` (${views} views)` : "";

		lines.push(`- [${title}](${entry.url})${channelStr}${viewsStr}`);
	}
}

function generateFooter(entries: CategorizedEntry[]): string {
	const date = new Date().toISOString().split("T")[0];
	const sources = new Map<string, number>();
	for (const e of entries) {
		sources.set(e.source, (sources.get(e.source) ?? 0) + 1);
	}
	const sourceSummary = [...sources.entries()]
		.sort((a, b) => b[1] - a[1])
		.map(([s, c]) => `${s}: ${c}`)
		.join(", ");

	return [
		``,
		`---`,
		``,
		`- Generated on ${date} from ${entries.length} entries (${sourceSummary})`,
		`- Auto-updated by [awesome-pi-coding-agent](https://github.com/shaftoe/awesome-pi-coding-agent)`,
		``,
		``,
	].join("\n");
}

// ─── Main generator ───────────────────────────────────────────────────────────

/** Generate the full README.md content. */
export function generateReadme(entries: CategorizedEntry[]): string {
	// Filter out known false positives
	const relevant = entries.filter(isLikelyRelevant);

	// Group by category
	const grouped = new Map<Category, CategorizedEntry[]>();
	for (const entry of relevant) {
		const group = grouped.get(entry.category) ?? [];
		group.push(entry);
		grouped.set(entry.category, group);
	}

	const sections: string[] = [];

	// Header + TOC
	sections.push(generateHeader(relevant, grouped));

	// Category sections (in order)
	for (const cat of CATEGORY_ORDER) {
		const catEntries = grouped.get(cat);
		if (!catEntries?.length) continue;
		sections.push(generateCategorySection(cat, catEntries));
	}

	// Footer
	sections.push(generateFooter(relevant));

	return sections.join("\n");
}
