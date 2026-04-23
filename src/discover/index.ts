/**
 * Discovery pipeline — find new pi-agent resources from various sources.
 *
 * Each source implements the Discoverer interface. The pipeline runner
 * executes them all, deduplicates, and returns unified candidates.
 */

import type { DiscoveryCandidate, EntrySource } from "../lib/types.ts";

// ─── Logging (stderr, no Biome complaints) ─────────────────────────────────────

function warn(message: string): void {
	process.stderr.write(`⚠️  ${message}\n`);
}

function info(message: string): void {
	process.stderr.write(`ℹ️  ${message}\n`);
}

// ─── Discoverer interface ──────────────────────────────────────────────────────

export interface Discoverer {
	/** Human-readable name for logging (e.g. "GitHub", "npm", "YouTube"). */
	readonly name: string;

	/**
	 * The source tag applied to candidates produced by this discoverer.
	 * Used for provenance tracking in entry data.
	 */
	readonly source: EntrySource;

	/**
	 * Run discovery and return raw candidates.
	 * Implementations should NOT deduplicate — the runner handles that.
	 * Should NOT throw — return empty array on failure.
	 */
	discover(): Promise<DiscoveryCandidate[]>;
}

// ─── Runner ────────────────────────────────────────────────────────────────────

export interface DiscoveryResult {
	/** All candidates, deduplicated across all discoverers. */
	candidates: DiscoveryCandidate[];
	/** Breakdown by discoverer name. */
	summary: Record<string, number>;
}

/**
 * Run multiple discoverers in parallel, deduplicate results by URL,
 * and return a unified list with a per-source summary.
 */
export async function runDiscovery(discoverers: Discoverer[]): Promise<DiscoveryResult> {
	const results = await Promise.all(
		discoverers.map(async (d) => {
			const label = d.name;
			try {
				const candidates = await d.discover();
				info(`${label}: found ${candidates.length} candidates`);
				return candidates;
			} catch (err) {
				warn(`${label} discovery failed: ${err}`);
				return [] as DiscoveryCandidate[];
			}
		}),
	);

	// Flatten and deduplicate by URL
	const seen = new Set<string>();
	const candidates: DiscoveryCandidate[] = [];
	const summary: Record<string, number> = {};

	for (let i = 0; i < results.length; i++) {
		const discoverer = discoverers[i];
		if (!discoverer) continue;
		const label = discoverer.name;
		let count = 0;

		for (const candidate of results[i] ?? []) {
			if (!seen.has(candidate.url)) {
				seen.add(candidate.url);
				candidates.push(candidate);
				count++;
			}
		}

		summary[label] = count;
	}

	info(`Discovery total: ${candidates.length} unique candidates`);
	return { candidates, summary };
}

// ─── Query-based discoverer helper ─────────────────────────────────────────────

/**
 * Factory for the most common pattern: iterate over search terms,
 * fetch results from an API, extract URLs.
 *
 * Stops on first auth/config error (403, 401) to avoid hammering.
 * Continues on transient errors for individual queries.
 */
export interface QueryDiscovererConfig {
	/** Human-readable name. */
	name: string;
	/** Source tag for candidates. */
	source: EntrySource;
	/** Search terms to iterate. */
	queries: string[];
	/**
	 * Fetch candidates for a single query term.
	 * Return an array of { url, hint?, metadata? } objects.
	 * Throw to signal a query-level error (will continue).
	 * Throw with isFatal=true to stop all remaining queries.
	 */
	fetchQuery: (
		query: string,
	) => Promise<{ url: string; hint?: string; metadata?: Record<string, unknown> }[]>;
	/**
	 * Optional: called before any queries. Throw or return false to skip.
	 * Use for API key checks, feature flags, etc.
	 */
	init?: () => Promise<void>;
	/**
	 * Optional: inspect a non-OK HTTP response. Return an error message
	 * string to log and abort, or undefined to skip.
	 */
	handleError?: (status: number, body: unknown) => string | undefined;
}

// ─── Per-query statistics ──────────────────────────────────────────────────────

/** Statistics for a single query within a discoverer run. */
export interface QueryStats {
	/** The query string. */
	query: string;
	/** Number of candidates returned by the API. */
	fetched: number;
	/** Number of candidates that passed the relevance filter. */
	relevant: number;
	/** Number of candidates that were new (not already in data). */
	newEntries: number;
	/** Whether this query hit an error. */
	error?: string;
}

/** Statistics for a full discovery run across all discoverers. */
export interface DiscoveryStats {
	/** Per-discoverer, per-query statistics. */
	byDiscoverer: Record<string, QueryStats[]>;
}

/** Global stats collector — populated during discover(), read by --stats mode. */
export const discoveryStats: DiscoveryStats = { byDiscoverer: {} };

export class QueryDiscoverer implements Discoverer {
	readonly name: string;
	readonly source: EntrySource;
	private readonly config: QueryDiscovererConfig;

	constructor(config: QueryDiscovererConfig) {
		this.name = config.name;
		this.source = config.source;
		this.config = config;
	}

	async discover(): Promise<DiscoveryCandidate[]> {
		try {
			if (this.config.init) {
				await this.config.init();
			}
		} catch (err) {
			warn(`${this.name}: ${err}`);
			return [];
		}

		const candidates: DiscoveryCandidate[] = [];
		const queryStats: QueryStats[] = [];

		for (const query of this.config.queries) {
			const stats: QueryStats = { query, fetched: 0, relevant: 0, newEntries: 0 };

			try {
				const results = await this.config.fetchQuery(query);
				stats.fetched = results.length;

				for (const r of results) {
					const candidate: DiscoveryCandidate = {
						url: r.url,
						source: this.source,
					};
					if (r.hint !== undefined) {
						candidate.hint = r.hint;
					}
					if (r.metadata !== undefined) {
						candidate.metadata = r.metadata;
					}
					candidates.push(candidate);
				}
			} catch (err) {
				const msg = err instanceof Error ? err.message : String(err);
				warn(`${this.name}: query "${query}" failed: ${msg}`);
				stats.error = msg;

				// Fatal errors (403, 401, config issues) — stop remaining queries
				if (msg.includes("[FATAL]")) {
					queryStats.push(stats);
					break;
				}
			}

			queryStats.push(stats);
		}

		discoveryStats.byDiscoverer[this.name] = queryStats;
		return candidates;
	}
}

/**
 * Create a fatal error — signals the QueryDiscoverer to stop processing remaining queries.
 * Use for auth errors, config issues, etc.
 */
export class FatalDiscoveryError extends Error {
	constructor(message: string) {
		super(`[FATAL] ${message}`);
		this.name = "FatalDiscoveryError";
	}
}
