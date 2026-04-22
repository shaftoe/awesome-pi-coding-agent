/**
 * Core type definitions for the awesome-pi-coding-agent data pipeline.
 */

// ─── Categories ────────────────────────────────────────────────────────────────

export const CATEGORIES = [
	"extension",
	"tool",
	"theme",
	"provider",
	"template",
	"video",
	"example",
	"documentation",
] as const;

export type Category = (typeof CATEGORIES)[number];

// ─── Health ────────────────────────────────────────────────────────────────────

export type HealthLevel = "active" | "maintained" | "stale" | "dead";

export interface Health {
	score: number; // 0–100
	level: HealthLevel;
}

// ─── Metadata (union type — varies by source) ──────────────────────────────────

export interface GitHubMetadata {
	stars: number;
	forks: number;
	open_issues: number;
	language: string | null;
	license: string | null;
	last_commit: string; // ISO date
	topics: string[];
	is_archived: boolean;
	is_fork: boolean;
	homepage: string | null;
}

export interface YouTubeMetadata {
	channel: string;
	channel_url: string;
	view_count: number;
	like_count: number;
	comment_count: number;
	duration: string; // ISO 8601 duration e.g. "PT15M30S"
	published_at: string; // ISO date
	thumbnail: string;
	tags: string[];
}

export interface NpmMetadata {
	package_name: string;
	version: string;
	weekly_downloads: number;
	github_url: string | null;
}

/** Metadata is a loose record — shape depends on the source */
export type EntryMetadata =
	| GitHubMetadata
	| YouTubeMetadata
	| NpmMetadata
	| Record<string, unknown>;

// ─── Sub-items (for monorepos) ────────────────────────────────────────────────

export interface SubItem {
	name: string;
	description: string;
}

// ─── Entry ─────────────────────────────────────────────────────────────────────

export type EntrySource = "github-search" | "npm-search" | "youtube-search" | "discord" | "manual";

export interface Entry {
	id: string;
	name: string;
	url: string;
	source: EntrySource;
	description: string;
	subitems?: SubItem[];
	metadata: EntryMetadata;
	health: Health;
	// NOTE: No timestamps stored in data files.
	// Use `git log -- <file>` for change history.
	// Use filesystem birthtime (`stat <file>`) for discovery date.
}

/** An entry with its category (injected from folder name at load time) */
export interface CategorizedEntry extends Entry {
	category: Category;
}

// ─── Data files ────────────────────────────────────────────────────────────────

export interface BlacklistEntry {
	url: string;
	reason: string;
}

export interface ManualOverride {
	url: string;
	overrides: Partial<
		Pick<Entry, "description" | "source"> & { category: Category; featured: boolean }
	>;
}

// ─── Discovery result (raw, before enrichment) ────────────────────────────────

export interface DiscoveryCandidate {
	url: string;
	source: EntrySource;
	hint?: string; // optional context about why this was discovered
	/**
	 * Explicit ID override. When set, used as the entry `id` instead of
	 * deriving it from the URL. npm discoverer sets this to the full package
	 * name (including scope) for every candidate.
	 */
	id?: string;
	/**
	 * Pre-populated metadata from the discovery source.
	 * Merged into the entry at creation time.
	 */
	metadata?: Record<string, unknown>;
}
