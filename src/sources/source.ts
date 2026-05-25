/**
 * Source interface — the contract every data source implements.
 *
 * Each source (npm, GitHub, YouTube) is a self-contained plugin that knows
 * how to gather, enrich, and score entries from its own API. Pipeline stages
 * (discover, process) are generic orchestrators that call Source methods.
 */

import type { CategorizedEntry, Category, EntrySource } from "../core/types.ts";
import type { DiscoveryWriter } from "../discover/writer.ts";

// ─── Source interface ──────────────────────────────────────────────────────────

export interface Source {
	/** Human-readable name for logging. */
	readonly name: string;
	/** Source tag applied to candidates. */
	readonly source: EntrySource;
	/** Display name for README footer (e.g. "YouTube", "npm"). */
	readonly displayName: string;
	/** Priority for dedup — lower wins (npm=0, GitHub=1, etc.). */
	readonly priority: number;
	/** Category override — e.g. YouTube always classifies as Video. Default: null. */
	readonly suggestedCategory: Category | null;
	/** Run discovery, streaming candidates to the writer. Should not throw. */
	discover(writer: DiscoveryWriter): Promise<void>;
	/**
	 * Optional second pass — enrich already-discovered candidates with additional API calls.
	 *
	 * Called after ALL sources have completed their `discover` phase.
	 * The writer's repository is populated, so implementers can read existing
	 * candidates, make follow-up API calls, and overwrite with richer metadata.
	 *
	 * Default: no-op (sources that don't need enrichment simply omit this method).
	 */
	enrich?(writer: DiscoveryWriter): Promise<void>;
	/** Normalize a URL to canonical form (e.g. strip www., expand short URLs). */
	normalizeUrl(url: string): string;
	/** Derive a human-readable entry ID from a URL. */
	extractId(url: string): string;
	/** Format an entry's popularity metadata for the README table. Return "" for none. */
	formatPopularity(entry: CategorizedEntry): string;
}

// ─── Supporting types ──────────────────────────────────────────────────────────

export interface DiscoveryResult {
	/** Per-source counts. */
	summary: Record<string, number>;
	/** Total unique discoveries written. */
	total: number;
}

export interface WriteResult {
	fetched: number;
	written: number;
}
