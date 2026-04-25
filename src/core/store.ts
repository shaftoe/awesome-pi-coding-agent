/**
 * Entry data store — flat file-per-entry in `entries/<hash>.json`.
 *
 * Category is stored inside each JSON file (no category subdirectories).
 * Keys are URLs, filenames are truncated SHA-256 hashes of the URL.
 *
 * Delegates storage to the generic Repository interface.
 */

import { existsSync } from "node:fs";
import { join } from "node:path";
import { FileRepository, type Repository } from "./repository.ts";
import type { CategorizedEntry, Category } from "./types.ts";

const DATA_DIR = resolveDataDir();

/**
 * Resolve the data directory path.
 *
 * Uses import.meta.dir when running directly (bun test, bun run),
 * but falls back to cwd-relative resolution for bundled contexts
 * (e.g. Astro prerender where import.meta.dir points to the build output).
 */
function resolveDataDir(): string {
	// import.meta.dir is undefined in some bundled contexts (e.g. Astro prerender via Node)
	if (import.meta.dir) {
		const srcDir = join(import.meta.dir, "..", "..", "data", "entries");
		if (existsSync(srcDir)) return srcDir;
	}
	// Bundled context: resolve from cwd (site/ -> ../data/entries)
	const cwdDir = join(process.cwd(), "..", "data", "entries");
	if (existsSync(cwdDir)) return cwdDir;
	// Pipeline root: data/entries relative to cwd
	const rootDir = join(process.cwd(), "data", "entries");
	if (existsSync(rootDir)) return rootDir;
	// Default — will be empty, callers handle gracefully
	return join(process.cwd(), "data", "entries");
}

/** The singleton entry repository. */
const entryRepo = new FileRepository<CategorizedEntry>(DATA_DIR);

/** Get the entry repository instance. */
export function getEntryRepo(): Repository<CategorizedEntry> {
	return entryRepo;
}

// ─── Convenience wrappers ──────────────────────────────────────────────────────

/** Save an entry. Returns true if newly created, false if overwriting. */
export function saveEntry(entry: CategorizedEntry): boolean {
	return entryRepo.set(entry.url, entry);
}

/** Load a single entry by URL. Returns null if not found. */
export function loadEntry(url: string): CategorizedEntry | null {
	return entryRepo.get(url);
}

/** Load all entries. */
export function loadAllEntries(): CategorizedEntry[] {
	return entryRepo.list();
}

/** Load all entries for a specific category. */
export function loadEntriesByCategory(category: Category): CategorizedEntry[] {
	return entryRepo.list().filter((e) => e.category === category);
}

/** Delete an entry by URL. Returns true if it existed. */
export function deleteEntry(url: string): boolean {
	return entryRepo.delete(url);
}

/** Get all categories that have entries. */
export function getExistingCategories(): Category[] {
	const seen = new Set<Category>();
	for (const entry of entryRepo.list()) {
		seen.add(entry.category);
	}
	return [...seen];
}
