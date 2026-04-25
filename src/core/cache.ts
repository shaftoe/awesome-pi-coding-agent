/**
 * Generic TTL file cache — stores arbitrary JSON values with expiry timestamps.
 *
 * Design:
 *   - One file per key, stored as `{dir}/{sanitized-key}.json`
 *   - Each file contains `{ data: T, expires_at: string }` (ISO 8601)
 *   - Lazy eviction: expired entries cleaned on `get()` / `has()`
 *   - Per-key TTL with a configurable default
 *   - Injectable `now()` for deterministic testing
 *
 * Key sanitization: all non-alphanumeric chars (except `._-`) become `_`.
 * This is safe for npm package names, GitHub search URLs, etc.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export interface CacheOptions {
	/** Directory to store cache files. */
	dir: string;
	/** Default TTL in milliseconds (default: 1 hour). */
	defaultTtl?: number;
	/** Injectable clock for testing. Defaults to Temporal.Now.instant(). */
	now?: () => Temporal.Instant;
}

interface CacheFile<T> {
	data: T;
	/** ISO 8601 expiry timestamp. */
	expires_at: string;
}

const DEFAULT_TTL_MS = 3_600_000; // 1 hour

export class Cache {
	private readonly dir: string;
	private readonly defaultTtl: number;
	private readonly now: () => Temporal.Instant;

	constructor(opts: CacheOptions) {
		this.dir = opts.dir;
		this.defaultTtl = opts.defaultTtl ?? DEFAULT_TTL_MS;
		this.now = opts.now ?? (() => Temporal.Now.instant());
	}

	// ─── Key → path ─────────────────────────────────────────────────────────

	private path(key: string): string {
		const safe = key.replace(/[^a-zA-Z0-9._-]/g, "_");
		return join(this.dir, `${safe}.json`);
	}

	// ─── Core operations ────────────────────────────────────────────────────

	/**
	 * Get a cached value.
	 * Returns `null` if the key doesn't exist or has expired.
	 * Expired files are deleted lazily.
	 */
	get<T>(key: string): T | null {
		const filePath = this.path(key);
		if (!existsSync(filePath)) return null;

		try {
			const raw = readFileSync(filePath, "utf-8");
			const entry = JSON.parse(raw) as CacheFile<T>;

			const expiresAt = Temporal.Instant.from(entry.expires_at);
			if (Temporal.Instant.compare(this.now(), expiresAt) >= 0) {
				rmSync(filePath, { force: true });
				return null;
			}
			return entry.data;
		} catch {
			rmSync(filePath, { force: true });
			return null;
		}
	}

	/**
	 * Store a value with an optional per-key TTL (falls back to the default).
	 * Creates the cache directory if it doesn't exist.
	 */
	set<T>(key: string, data: T, ttlMs?: number): void {
		if (!existsSync(this.dir)) {
			mkdirSync(this.dir, { recursive: true });
		}
		const expiresAt = this.now().add({ milliseconds: ttlMs ?? this.defaultTtl });
		const entry: CacheFile<T> = {
			data,
			expires_at: expiresAt.toString(),
		};
		writeFileSync(this.path(key), JSON.stringify(entry), "utf-8");
	}

	/** Check existence without returning the value. Also lazy-evicts if expired. */
	has(key: string): boolean {
		return this.get(key) !== null;
	}

	/** Delete a single key. */
	delete(key: string): void {
		const filePath = this.path(key);
		if (existsSync(filePath)) {
			rmSync(filePath, { force: true });
		}
	}

	// ─── Bulk operations ────────────────────────────────────────────────────

	/** Remove all `.json` files from the cache directory. */
	clear(): void {
		if (!existsSync(this.dir)) return;
		for (const file of readdirSync(this.dir)) {
			if (file.endsWith(".json")) {
				rmSync(join(this.dir, file), { force: true });
			}
		}
	}

	/**
	 * Scan the cache directory and remove all expired entries.
	 * Returns the number of entries removed (including malformed files).
	 */
	prune(): number {
		if (!existsSync(this.dir)) return 0;
		let removed = 0;
		for (const file of readdirSync(this.dir)) {
			if (!file.endsWith(".json")) continue;
			const filePath = join(this.dir, file);
			try {
				const entry = JSON.parse(readFileSync(filePath, "utf-8")) as CacheFile<unknown>;
				const expiresAt = Temporal.Instant.from(entry.expires_at);
				if (Temporal.Instant.compare(this.now(), expiresAt) >= 0) {
					rmSync(filePath, { force: true });
					removed++;
				}
			} catch {
				rmSync(filePath, { force: true });
				removed++;
			}
		}
		return removed;
	}
}
