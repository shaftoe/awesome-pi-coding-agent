/**
 * Simple file-based cache for API responses.
 * Stores cached data in .cache/ with TTL-based expiry.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CACHE_DIR = join(import.meta.dir, "..", "..", ".cache");
const DEFAULT_TTL_MS = 1000 * 60 * 60; // 1 hour

interface CacheEntry<T> {
	data: T;
	expires_at: number; // unix ms
}

function cachePath(key: string): string {
	// Sanitize key to be filesystem-safe
	const safe = key.replace(/[^a-zA-Z0-9._-]/g, "_");
	return join(CACHE_DIR, `${safe}.json`);
}

/** Get a cached value. Returns null if not found or expired. */
export function get<T>(key: string): T | null {
	const path = cachePath(key);
	if (!existsSync(path)) return null;

	const raw = readFileSync(path, "utf-8");
	const entry = JSON.parse(raw) as CacheEntry<T>;

	if (Date.now() > entry.expires_at) {
		return null;
	}
	return entry.data;
}

/** Set a cached value with optional TTL (default 1 hour). */
export function set<T>(key: string, data: T, ttlMs: number = DEFAULT_TTL_MS): void {
	if (!existsSync(CACHE_DIR)) {
		mkdirSync(CACHE_DIR, { recursive: true });
	}
	const entry: CacheEntry<T> = {
		data,
		expires_at: Date.now() + ttlMs,
	};
	writeFileSync(cachePath(key), JSON.stringify(entry, null, "\t"), "utf-8");
}

/** Check if a key exists and is not expired. */
export function has(key: string): boolean {
	return get(key) !== null;
}

/** Clear the entire cache. */
export function clear(): void {
	if (!existsSync(CACHE_DIR)) return;
	for (const file of readdirSync(CACHE_DIR)) {
		if (file.endsWith(".json")) {
			rmSync(join(CACHE_DIR, file));
		}
	}
}
