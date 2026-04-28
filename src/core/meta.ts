/**
 * Read/write pipeline metadata (data/meta.json).
 *
 * `meta.json` records when the datastore was last updated by the process stage.
 * The site build reads this to show an accurate "last updated" date
 * (independent of deploy time).
 */

import "./temporal.ts";

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export interface PipelineMeta {
	/** ISO-8601 instant when the process stage last wrote to the datastore. */
	lastUpdatedAt: string;
}

/**
 * Resolve data/meta.json path.
 *
 * Uses import.meta.dir when running directly (bun test, bun run),
 * but falls back to cwd-relative resolution for bundled contexts
 * (e.g. Astro/Vite where import.meta.dir may be undefined).
 */
function resolveMetaPath(): string {
	if (import.meta.dir) {
		const p = join(import.meta.dir, "..", "..", "data", "meta.json");
		if (existsSync(p)) return p;
	}
	// Bundled context: resolve from cwd (site/ -> ../data/meta.json)
	const cwdDir = join(process.cwd(), "..", "data", "meta.json");
	if (existsSync(cwdDir)) return cwdDir;
	// Pipeline root: data/meta.json relative to cwd
	const rootDir = join(process.cwd(), "data", "meta.json");
	if (existsSync(rootDir)) return rootDir;
	// Default — will return null from readMeta()
	return rootDir;
}

const META_PATH = resolveMetaPath();

/**
 * Read pipeline metadata.
 *
 * Returns null if the file doesn't exist or is malformed.
 */
export function readMeta(): PipelineMeta | null {
	if (!existsSync(META_PATH)) return null;
	try {
		return JSON.parse(readFileSync(META_PATH, "utf-8")) as PipelineMeta;
	} catch {
		return null;
	}
}

/**
 * Write pipeline metadata with the current timestamp.
 *
 * Called at the end of the process stage to record when the datastore
 * was last updated.
 */
export function writeMeta(): void {
	const meta: PipelineMeta = { lastUpdatedAt: Temporal.Now.instant().toString() };
	writeFileSync(META_PATH, JSON.stringify(meta, null, "\t"), "utf-8");
}
