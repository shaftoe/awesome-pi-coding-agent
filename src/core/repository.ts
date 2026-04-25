/**
 * Generic repository interface — abstracts persistent storage for any entity type.
 *
 * Design goals:
 *   - Swappable backends (current: flat JSON files, future: SQLite, etc.)
 *   - Keyed by URL (canonical: npm > github > youtube)
 *   - Flat storage: no category subdirectories, just `dataDir/<hash>.json`
 *
 * Filename encoding: truncated SHA-256 of the key (URL) → 16 hex chars.
 * With <10K entries the collision probability is negligible (~10⁻¹²).
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ─── URL → Filename encoding ───────────────────────────────────────────────────

/**
 * Encode a key (URL) to a filesystem-safe filename using truncated SHA-256.
 * Produces 16 hex characters (8 bytes / 64 bits of entropy).
 */
export function keyToFilename(key: string): string {
	return createHash("sha256").update(key, "utf-8").digest("hex").slice(0, 16);
}

// ─── Interface ─────────────────────────────────────────────────────────────────

/**
 * Generic key-value repository with CRUD operations.
 * Keys are strings (typically URLs); values are JSON-serialisable objects.
 */
export interface Repository<T> {
	/** Prepare storage (create dirs, open DB, etc.). Idempotent. */
	init(): void;
	/** Check if an entry with the given key exists. */
	has(key: string): boolean;
	/** Get an entry by key. Returns null if not found. */
	get(key: string): T | null;
	/**
	 * Store an entry by key.
	 * Returns true if newly created, false if overwriting an existing entry.
	 */
	set(key: string, item: T): boolean;
	/** Delete an entry by key. Returns true if it existed. */
	delete(key: string): boolean;
	/** Get all stored entries. */
	list(): T[];
	/** Number of stored entries. */
	readonly size: number;
	/** Flush any buffered writes to persistent storage. */
	flush(): Promise<void>;
	/** Remove all entries. */
	clear(): void;
}

// ─── File-based Implementation ─────────────────────────────────────────────────

/**
 * Flat file-per-entry repository.
 * Each entry is stored as `dataDir/<sha256-trunc>.json`.
 */
export class FileRepository<T> implements Repository<T> {
	private readonly dataDir: string;
	private _size: number | null = null;

	constructor(dataDir: string) {
		this.dataDir = dataDir;
	}

	init(): void {
		if (!existsSync(this.dataDir)) {
			mkdirSync(this.dataDir, { recursive: true });
		}
	}

	has(key: string): boolean {
		return existsSync(this.filePath(key));
	}

	get(key: string): T | null {
		const fp = this.filePath(key);
		if (!existsSync(fp)) return null;
		try {
			return JSON.parse(readFileSync(fp, "utf-8")) as T;
		} catch {
			return null;
		}
	}

	set(key: string, item: T): boolean {
		const fp = this.filePath(key);
		const isNew = !existsSync(fp);
		writeFileSync(fp, JSON.stringify(item, null, 2), "utf-8");
		if (this._size !== null && isNew) this._size++;
		return isNew;
	}

	delete(key: string): boolean {
		const fp = this.filePath(key);
		if (!existsSync(fp)) return false;
		rmSync(fp, { force: true });
		if (this._size !== null) this._size--;
		return true;
	}

	list(): T[] {
		if (!existsSync(this.dataDir)) return [];
		const items: T[] = [];
		for (const file of readdirSync(this.dataDir)) {
			if (!file.endsWith(".json")) continue;
			try {
				items.push(JSON.parse(readFileSync(join(this.dataDir, file), "utf-8")) as T);
			} catch {
				// skip malformed
			}
		}
		return items;
	}

	get size(): number {
		if (this._size === null) {
			this._size = this.countFiles();
		}
		return this._size;
	}

	async flush(): Promise<void> {
		// File-based writes are synchronous — nothing to flush.
	}

	/** Get the data directory path. */
	get dir(): string {
		return this.dataDir;
	}

	/** Remove all entries from the data directory. */
	clear(): void {
		if (!existsSync(this.dataDir)) return;
		for (const file of readdirSync(this.dataDir)) {
			if (file.endsWith(".json")) {
				rmSync(join(this.dataDir, file), { force: true });
			}
		}
		this._size = 0;
	}

	/** Get the physical file path for a key. */
	private filePath(key: string): string {
		return join(this.dataDir, `${keyToFilename(key)}.json`);
	}

	/** Count .json files in the data directory. */
	private countFiles(): number {
		if (!existsSync(this.dataDir)) return 0;
		return readdirSync(this.dataDir).filter((f) => f.endsWith(".json")).length;
	}
}
