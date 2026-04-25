/**
 * Core type definitions for the awesome-pi-coding-agent data pipeline.
 *
 * Uses string enums for categories, sources, and health levels so that
 * both the type system and runtime values are strongly typed.
 */

// ─── Categories ────────────────────────────────────────────────────────────────

/**
 * Four categories: extension wins over theme, video is URL-only, misc is the catch-all.
 * @see docs/classification.md
 */
export enum Category {
	Extension = "extension",
	Theme = "theme",
	Video = "video",
	Misc = "misc",
}

/** All category values, in priority order. */
export const CATEGORIES: readonly Category[] = [
	Category.Extension,
	Category.Theme,
	Category.Video,
	Category.Misc,
];

// ─── Health ────────────────────────────────────────────────────────────────────

export enum HealthLevel {
	Active = "active",
	Maintained = "maintained",
	Stale = "stale",
	Dead = "dead",
}

export interface Health {
	score: number; // 0–100
	level: HealthLevel;
}

/** Normalised dimension scores (each 0–100), produced by source-specific scorers. */
export interface HealthDimensions {
	freshness: number;
	popularity: number;
	activity: number;
	depth: number;
}

// ─── Entry ─────────────────────────────────────────────────────────────────────

export enum EntrySource {
	GitHubSearch = "github-search",
	NpmSearch = "npm-search",
	YouTubeSearch = "youtube-search",
	Discord = "discord",
	Manual = "manual",
}

export interface Entry {
	id: string;
	name: string;
	url: string;
	source: EntrySource;
	description: string;
	subitems?: SubItem[];
	metadata: EntryMetadata;
	health: Health;
}

export interface CategorizedEntry extends Entry {
	category: Category;
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export type EntryMetadata = Record<string, unknown>;

// ─── Supporting types ──────────────────────────────────────────────────────────

export interface SubItem {
	name: string;
	description: string;
}

export interface BlacklistEntry {
	url: string;
	reason: string;
	/** ISO-8601 timestamp when this entry was blacklisted. */
	blacklisted_at: string;
	/** How this entry was added — e.g. "filter", "manual", or "import". */
	source: string;
	/** Optional discovery metadata (available when source is "filter"). */
	discovery?: {
		/** The discovery source name (e.g. "npm", "github", "youtube"). */
		sourceName: string;
		/** The query that produced this candidate. */
		query?: string;
	};
}

// ─── Discovery ─────────────────────────────────────────────────────────────────

export interface DiscoveryCandidate {
	url: string;
	source: EntrySource;
	hint?: string;
	id?: string;
	metadata?: Record<string, unknown>;
}
