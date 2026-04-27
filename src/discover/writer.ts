/**
 * Discovery writer — streams validated discoveries to a Repository.
 *
 * Receives items that have already passed the relevance filter (isRelevant).
 *
 * Guarantees:
 *   - Dedup by URL: tracks seen URLs, skips duplicates silently
 *   - Per-source count tracking
 *   - Crash recovery: seeds seen URLs from existing repository entries
 *
 * Storage is delegated to the Repository interface (currently FileRepository),
 * making it easy to swap to SQLite or another backend.
 */

import { FileRepository, type Repository } from "../core/repository.ts";
import type { DiscoveryCandidate } from "../core/types.ts";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface DiscoveryLine {
	discoverer: string;
	discovery: DiscoveryCandidate;
}

export interface LoadedDiscoveries {
	discoveries: DiscoveryCandidate[];
	summary: Record<string, number>;
}

// ─── Writer ────────────────────────────────────────────────────────────────────

export class DiscoveryWriter {
	private readonly repo: Repository<DiscoveryLine>;
	private counts: Record<string, number> = {};
	private initialized = false;

	/**
	 * Create a discovery writer.
	 * @param repoOrDir Either a Repository instance or a directory path
	 *                  (creates a FileRepository automatically).
	 */
	constructor(repoOrDir: string | Repository<DiscoveryLine>) {
		this.repo =
			typeof repoOrDir === "string" ? new FileRepository<DiscoveryLine>(repoOrDir) : repoOrDir;
	}

	/** Get the underlying repository. */
	get repository(): Repository<DiscoveryLine> {
		return this.repo;
	}

	/** Initialize storage — create dirs, optionally seed state from existing entries. */
	init(reset: boolean = false): void {
		if (this.initialized) return;
		this.initialized = true;
		this.repo.init();

		if (reset) {
			this.repo.clear();
		} else {
			// Seed counts from existing entries (crash recovery)
			for (const line of this.repo.list()) {
				this.counts[line.discoverer] = (this.counts[line.discoverer] ?? 0) + 1;
			}
		}
	}

	/**
	 * Write a candidate.
	 * Returns true if a new file was created, false if overwriting an existing entry.
	 *
	 * Deduplication is intentionally NOT done here — sources run in parallel so
	 * race conditions on `has()` are inevitable. All dedup is pushed downstream
	 * to `saveFromDiscoveries()` which runs sequentially after gathering.
	 */
	write(discoverer: string, candidate: DiscoveryCandidate): boolean {
		const isNew = this.repo.set(candidate.url, { discoverer, discovery: candidate });
		if (isNew) {
			this.counts[discoverer] = (this.counts[discoverer] ?? 0) + 1;
		}
		return isNew;
	}

	/** Wait for all pending writes to flush. */
	async flush(): Promise<void> {
		await this.repo.flush();
	}

	/** Per-source counts. */
	getSummary(): Record<string, number> {
		return { ...this.counts };
	}

	/** Total discoveries written (this session + pre-existing). */
	get totalWritten(): number {
		return Object.values(this.counts).reduce((a, b) => a + b, 0);
	}

	/** Total unique discoveries tracked. */
	get totalSeen(): number {
		return this.repo.size;
	}

	/** List all discovery lines written by a specific discoverer. */
	listByDiscoverer(discoverer: string): DiscoveryLine[] {
		return this.repo.list().filter((line) => line.discoverer === discoverer);
	}
}

// ─── Reader ────────────────────────────────────────────────────────────────────

/** Load raw discovery lines (preserves per-candidate discoverer) from a directory. */
export function loadDiscoveryLines(dir: string): DiscoveryLine[] {
	const repo = new FileRepository<DiscoveryLine>(dir);
	repo.init();
	return repo.list();
}

/** Load discoveries from a DiscoveryWriter's repository. */
export function loadDiscoveries(writer: DiscoveryWriter): LoadedDiscoveries {
	const lines = writer.repository.list();
	const discoveries: DiscoveryCandidate[] = [];
	const summary: Record<string, number> = {};

	for (const line of lines) {
		discoveries.push(line.discovery);
		summary[line.discoverer] = (summary[line.discoverer] ?? 0) + 1;
	}

	return { discoveries, summary };
}

/** Load discoveries from a directory path (convenience). */
export function loadDiscoveriesFromDir(dir: string): LoadedDiscoveries {
	const repo = new FileRepository<DiscoveryLine>(dir);
	const writer = new DiscoveryWriter(repo);
	return loadDiscoveries(writer);
}
