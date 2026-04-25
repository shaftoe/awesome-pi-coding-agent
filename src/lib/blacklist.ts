/**
 * Shared blacklist utility — used by the filter pipeline and CLI.
 *
 * Provides a single source of truth for blacklist operations:
 *   - Loading / persisting blacklist entries
 *   - Checking if a URL is blacklisted (O(1) via cached Set)
 *   - Adding new entries (auto-blacklist from filter, manual via CLI)
 *
 * Performance: isBlacklisted() uses a cached Set for O(1) lookups.
 * The cache is populated on first access and kept in sync by addToBlacklist().
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { BlacklistEntry } from "./types.ts";

const DATA_DIR = join(import.meta.dir, "..", "..", "data");
const BLACKLIST_PATH = join(DATA_DIR, "blacklist.json");

// ─── In-memory cache ───────────────────────────────────────────────────────────

/** Cached blacklist entries + URL set for O(1) lookups. */
let cache: { entries: BlacklistEntry[]; urlSet: Set<string> } | null = null;

/** Load blacklist and build the URL set cache. */
function getCache(): { entries: BlacklistEntry[]; urlSet: Set<string> } {
	if (!cache) {
		const entries = loadBlacklist();
		cache = { entries, urlSet: new Set(entries.map((b) => b.url)) };
	}
	return cache;
}

// ─── Read operations ───────────────────────────────────────────────────────────

/** Load the blacklist from disk. */
export function loadBlacklist(): BlacklistEntry[] {
	if (!existsSync(BLACKLIST_PATH)) return [];
	return JSON.parse(readFileSync(BLACKLIST_PATH, "utf-8")) as BlacklistEntry[];
}

/** Check whether a URL is present in the blacklist. O(1) via cached Set. */
export function isBlacklisted(url: string): boolean {
	return getCache().urlSet.has(url);
}

// ─── Write operations ──────────────────────────────────────────────────────────

/** Persist the full blacklist array to disk. */
export function saveBlacklist(entries: BlacklistEntry[]): void {
	writeFileSync(BLACKLIST_PATH, `${JSON.stringify(entries, null, "\t")}\n`, "utf-8");
}

/**
 * Add a single entry to the blacklist and persist.
 * Returns `true` if the entry was newly added, `false` if already present.
 * Keeps the in-memory cache in sync.
 */
export function addToBlacklist(url: string, reason: string): boolean {
	const c = getCache();
	if (c.urlSet.has(url)) return false;

	const entry: BlacklistEntry = { url, reason };
	c.entries.push(entry);
	c.urlSet.add(url);
	saveBlacklist(c.entries);
	return true;
}

/** Invalidate the in-memory cache. Call after external modifications (e.g. CLI blacklist add). */
export function invalidateBlacklistCache(): void {
	cache = null;
}
