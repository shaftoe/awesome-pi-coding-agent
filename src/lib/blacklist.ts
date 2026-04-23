/**
 * Shared blacklist utility — used by the filter pipeline and CLI.
 *
 * Provides a single source of truth for blacklist operations:
 *   - Loading / persisting blacklist entries
 *   - Checking if a URL is blacklisted
 *   - Adding new entries (auto-blacklist from filter, manual via CLI)
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { BlacklistEntry } from "./types.ts";

const DATA_DIR = join(import.meta.dir, "..", "..", "data");
const BLACKLIST_PATH = join(DATA_DIR, "blacklist.json");

// ─── Read operations ───────────────────────────────────────────────────────────

/** Load the blacklist from disk. */
export function loadBlacklist(): BlacklistEntry[] {
	if (!existsSync(BLACKLIST_PATH)) return [];
	return JSON.parse(readFileSync(BLACKLIST_PATH, "utf-8")) as BlacklistEntry[];
}

/** Check whether a URL is present in the blacklist. */
export function isBlacklisted(url: string): boolean {
	const blacklist = loadBlacklist();
	return blacklist.some((b) => b.url === url);
}

// ─── Write operations ──────────────────────────────────────────────────────────

/** Persist the full blacklist array to disk. */
export function saveBlacklist(entries: BlacklistEntry[]): void {
	writeFileSync(BLACKLIST_PATH, `${JSON.stringify(entries, null, "\t")}\n`, "utf-8");
}

/**
 * Add a single entry to the blacklist and persist.
 * Returns `true` if the entry was newly added, `false` if already present.
 */
export function addToBlacklist(url: string, reason: string): boolean {
	const blacklist = loadBlacklist();

	if (blacklist.some((b) => b.url === url)) {
		return false;
	}

	blacklist.push({ url, reason });
	saveBlacklist(blacklist);
	return true;
}
