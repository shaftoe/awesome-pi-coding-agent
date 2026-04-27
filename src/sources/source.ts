/**
 * Source interface — the contract every data source implements.
 *
 * Each source (npm, GitHub, YouTube) is a self-contained plugin that knows
 * how to gather, enrich, and score entries from its own API. Pipeline stages
 * (discover, process) are generic orchestrators that call Source methods.
 */

import type { Entry, EntrySource, HealthDimensions } from "../core/types.ts";
import type { DiscoveryWriter } from "../discover/writer.ts";

// ─── Source interface ──────────────────────────────────────────────────────────

export interface Source {
	/** Human-readable name for logging. */
	readonly name: string;
	/** Source tag applied to candidates. */
	readonly source: EntrySource;
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
	/**
	 * Score an entry's health dimensions (freshness, popularity, activity, depth).
	 *
	 * Each source knows how to interpret its own metadata fields into normalised
	 * 0–100 dimension scores. The generic combiner (`enrich/health.ts`) then
	 * applies the weighted formula and hard rules.
	 *
	 * This is a stateless pure function — no instance state is needed.
	 */
	scoreHealthDimensions(entry: Entry): HealthDimensions;
}

// ─── URL normalization ─────────────────────────────────────────────────────────

/**
 * Canonical URL form — strips source-specific inconsistencies.
 *
 * Default: identity (no-op). Sources with known URL variants (e.g. YouTube
 * with/without `www.`) override this to ensure stored URLs always match.
 */

/** Generic URL normalizer — applies all known source normalizations. */
export function normalizeUrl(url: string): string {
	// YouTube: strip www. — our canonical form is https://youtube.com/...
	url = url.replace(/^(https?:\/\/)(www\.)youtube\./, "$1youtube.");
	return url;
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
