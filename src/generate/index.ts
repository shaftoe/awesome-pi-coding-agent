/**
 * Generate stage — Stage 4 of the pipeline.
 *
 * Reads canonical entries from `data/entries/`, groups by category,
 * sorts, and renders `README.md`.
 */

import "../core/temporal.ts";

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { CategorizedEntry } from "../core/types.ts";
import { renderREADME } from "./render.ts";

const ROOT_DIR = join(import.meta.dir, "..", "..");
const DATA_DIR = join(ROOT_DIR, "data", "entries");
const OUTPUT_PATH = join(ROOT_DIR, "README.md");

// biome-ignore lint/suspicious/noConsole: CLI output
const log = console.log;

// ─── Main ──────────────────────────────────────────────────────────────────────

export function cmdGenerate(): void {
	log("Reading entries from data/entries/...");

	const entries = loadEntries();
	if (entries.length === 0) {
		process.stderr.write("No entries found in data/entries/. Run `bun run process` first.\n");
		process.exit(1);
	}
	log(`Loaded ${entries.length} entries`);

	// Group by category
	const grouped: Record<string, CategorizedEntry[]> = {};
	const byCategory: Record<string, number> = {};
	const byHealth: Record<string, number> = {};
	const bySource: Record<string, number> = {};

	for (const entry of entries) {
		const cat = entry.category;
		grouped[cat] = grouped[cat] ?? [];
		grouped[cat].push(entry);
		byCategory[cat] = (byCategory[cat] ?? 0) + 1;
		byHealth[entry.health.level] = (byHealth[entry.health.level] ?? 0) + 1;
		bySource[entry.source] = (bySource[entry.source] ?? 0) + 1;
	}

	log("Categories:");
	for (const [cat, count] of Object.entries(byCategory).sort(([, a], [, b]) => b - a)) {
		log(`  ${cat}: ${count}`);
	}
	log("Health:");
	for (const [level, count] of Object.entries(byHealth)) {
		log(`  ${level}: ${count}`);
	}

	const readme = renderREADME({
		total: entries.length,
		byCategory,
		byHealth,
		bySource,
		grouped,
	});

	writeFileSync(OUTPUT_PATH, readme, "utf-8");
	log(`\nWrote README.md (${(readme.length / 1024).toFixed(1)} KB)`);
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function loadEntries(): CategorizedEntry[] {
	if (!readdirSync(DATA_DIR).length) return [];

	const entries: CategorizedEntry[] = [];
	for (const file of readdirSync(DATA_DIR)) {
		if (!file.endsWith(".json")) continue;
		try {
			const raw = readFileSync(join(DATA_DIR, file), "utf-8");
			const entry = JSON.parse(raw) as CategorizedEntry;
			if (entry.id && entry.url && entry.category) {
				entries.push(entry);
			}
		} catch {
			// Skip malformed entries
		}
	}
	return entries;
}

// ─── CLI entry point ───────────────────────────────────────────────────────────

cmdGenerate();
