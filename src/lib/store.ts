/**
 * File-per-entry data access layer.
 * Each category is a folder under data/, each entry is a single JSON file.
 *
 * Scoped npm packages (`@scope/name`) are stored as `@scope--name.json`
 * to avoid filesystem issues with `/` while keeping the scope visible.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type {
	BlacklistEntry,
	CATEGORIES,
	CategorizedEntry,
	Category,
	Entry,
	ManualOverride,
} from "./types.ts";

const DATA_DIR = join(import.meta.dir, "..", "..", "data");

// ─── ID ↔ Filename encoding ────────────────────────────────────────────────────

/**
 * Convert an entry ID to a safe filename.
 * Scoped npm packages: `@scope/name` → `@scope--name.json`
 * Regular IDs pass through unchanged.
 */
export function idToFilename(id: string): string {
	// Scoped npm package: @scope/name → @scope--name
	const scopedMatch = id.match(/^(@[^/]+)\/(.+)$/);
	if (scopedMatch) {
		return `${scopedMatch[1]}--${scopedMatch[2]}.json`;
	}
	return `${id}.json`;
}

/**
 * Convert a filename back to an entry ID.
 * `@scope--name.json` → `@scope/name`
 * `regular-id.json` → `regular-id`
 */
export function filenameToId(filename: string): string {
	const name = filename.replace(/\.json$/, "");
	// Scoped: @scope--name → @scope/name
	const scopedMatch = name.match(/^(@.+)--(.+)$/);
	if (scopedMatch) {
		return `${scopedMatch[1]}/${scopedMatch[2]}`;
	}
	return name;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function categoryDir(category: Category): string {
	return join(DATA_DIR, `${category}s`);
}

function entryPath(category: Category, id: string): string {
	return join(categoryDir(category), idToFilename(id));
}

function parseEntry(raw: string): Entry {
	return JSON.parse(raw) as Entry;
}

/** Format JSON with tabs, collapsing short arrays onto a single line (biome-compatible). */
function stringifyEntry(entry: Entry): string {
	const raw = JSON.stringify(entry, null, "\t");
	// Collapse multi-line arrays like [\n\t\t"a",\n\t\t"b"\n\t] onto one line
	return raw.replace(/\[\n((?:\t+"[^"]*",?\n)+)\t*\]/g, (match) => {
		const items = match
			.split("\n")
			.map((l) => l.trim().replace(/,$/, ""))
			.filter((l) => l && l !== "[" && l !== "]");
		return `[${items.join(", ")}]`;
	});
}

// ─── Read operations ───────────────────────────────────────────────────────────

/** Load all entries from a single category folder. */
export function loadEntries(category: Category): CategorizedEntry[] {
	const dir = categoryDir(category);
	if (!existsSync(dir)) return [];

	const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
	return files.map((file) => {
		const raw = readFileSync(join(dir, file), "utf-8");
		return { ...parseEntry(raw), category };
	});
}

/** Load every entry from every category. */
export function loadAllEntries(): CategorizedEntry[] {
	const entries: CategorizedEntry[] = [];
	for (const category of getExistingCategories()) {
		entries.push(...loadEntries(category));
	}
	return entries;
}

/** Load a single entry by category and id. Returns null if not found. */
export function loadEntry(category: Category, id: string): CategorizedEntry | null {
	const path = entryPath(category, id);
	if (!existsSync(path)) return null;
	const raw = readFileSync(path, "utf-8");
	return { ...parseEntry(raw), category };
}

/** Find an entry by its primary URL across all categories. */
export function findEntryByUrl(url: string): CategorizedEntry | null {
	for (const entry of loadAllEntries()) {
		if (entry.url === url) return entry;
	}
	return null;
}

/** Find an entry by ID across all categories. */
export function findEntryById(id: string): CategorizedEntry | null {
	for (const entry of loadAllEntries()) {
		if (entry.id === id) return entry;
	}
	return null;
}

/**
 * Find an entry whose `metadata.github_url` matches the given URL.
 * Used to deduplicate GitHub discoveries against npm-sourced entries
 * that already carry the GitHub URL in their metadata.
 */
export function findEntryByGitHubUrl(githubUrl: string): CategorizedEntry | null {
	for (const entry of loadAllEntries()) {
		const meta = entry.metadata as Record<string, unknown>;
		if (meta["github_url"] === githubUrl) return entry;
	}
	return null;
}

// ─── Write operations ──────────────────────────────────────────────────────────

/** Save an entry to disk. Creates the category folder if needed. */
export function saveEntry(category: Category, entry: Entry): void {
	const dir = categoryDir(category);
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}
	const path = entryPath(category, entry.id);
	writeFileSync(path, `${stringifyEntry(entry)}\n`, "utf-8");
}

/** Delete an entry file. */
export function deleteEntry(category: Category, id: string): void {
	const path = entryPath(category, id);
	if (existsSync(path)) {
		rmSync(path);
	}
}

// ─── Metadata files ────────────────────────────────────────────────────────────

/** Load the blacklist. */
export function loadBlacklist(): BlacklistEntry[] {
	const path = join(DATA_DIR, "blacklist.json");
	if (!existsSync(path)) return [];
	return JSON.parse(readFileSync(path, "utf-8")) as BlacklistEntry[];
}

/** Load manual overrides. */
export function loadManualOverrides(): ManualOverride[] {
	const path = join(DATA_DIR, "manual-overrides.json");
	if (!existsSync(path)) return [];
	return JSON.parse(readFileSync(path, "utf-8")) as ManualOverride[];
}

// ─── Utilities ─────────────────────────────────────────────────────────────────

/** List categories that have an existing folder. */
function getExistingCategories(): Category[] {
	if (!existsSync(DATA_DIR)) return [];
	const validCategories: ReadonlySet<string> = new Set<string>([
		"extension",
		"skill",
		"tool",
		"theme",
		"provider",
		"template",
		"video",
		"example",
		"documentation",
	] satisfies typeof CATEGORIES extends readonly (infer U)[] ? U[] : never);

	return readdirSync(DATA_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory() && validCategories.has(d.name.replace(/s$/, "")))
		.map((d) => d.name.replace(/s$/, "") as Category);
}
