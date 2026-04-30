/**
 * One-time script to clean HTML tags and entities from existing entries.
 *
 * Applies cleanText() from src/core/html.ts to the name, description,
 * and metadata title/name/description fields of all entries in data/entries/.
 *
 * Usage: bun run scripts/clean-html.ts
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cleanText } from "../src/core/html.ts";
import type { CategorizedEntry } from "../src/core/types.ts";

const ROOT_DIR = join(import.meta.dir, "..");
const DATA_DIR = join(ROOT_DIR, "data", "entries");

// biome-ignore lint/suspicious/noConsole: CLI output
const log = console.log;

/** Check if a string contains any HTML tags or entities. */
function needsCleaning(s: string): boolean {
	return /<[a-zA-Z/][^>]*>/.test(s) || /&#x?[0-9a-fA-F]+;/.test(s) || /&(?:amp|lt|gt|quot|apos|nbsp);/.test(s);
}

/** Only clean entries in news-like categories (article, misc). */
const TARGET_CATEGORIES = new Set(["article", "misc"]);

function main(): void {
	log("=== Clean HTML from existing entries (article & misc) ===\n");

	const files = readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
	log(`📂 Found ${files.length} entry files\n`);

	let cleaned = 0;
	const changes: Array<{ file: string; field: string; before: string; after: string }> = [];

	for (const file of files) {
		const filePath = join(DATA_DIR, file);
		const raw = readFileSync(filePath, "utf-8");
		const entry = JSON.parse(raw) as CategorizedEntry;
		let modified = false;

		// Only process target categories
		if (!TARGET_CATEGORIES.has(entry.category)) continue;

		// Clean entry-level name
		if (needsCleaning(entry.name)) {
			const before = entry.name;
			entry.name = cleanText(entry.name);
			if (before !== entry.name) {
				changes.push({ file, field: "name", before, after: entry.name });
				modified = true;
			}
		}

		// Clean entry-level description
		if (needsCleaning(entry.description)) {
			const before = entry.description;
			entry.description = cleanText(entry.description);
			if (before !== entry.description) {
				changes.push({ file, field: "description", before, after: entry.description });
				modified = true;
			}
		}

		// Clean metadata fields that commonly contain HTML
		const meta = entry.metadata as Record<string, unknown>;
		for (const key of ["title", "name", "description"] as const) {
			if (typeof meta[key] === "string" && needsCleaning(meta[key] as string)) {
				meta[key] = cleanText(meta[key] as string);
				modified = true;
			}
		}

		if (modified) {
			writeFileSync(filePath, `${JSON.stringify(entry, null, "\t")}\n`, "utf-8");
			cleaned++;
		}
	}

	log(`✅ Cleaned ${cleaned} entries (out of ${files.length})\n`);

	if (changes.length > 0) {
		log("📝 Changes:");
		for (const c of changes) {
			const beforePreview = c.before.length > 80 ? `${c.before.slice(0, 80)}…` : c.before;
			const afterPreview = c.after.length > 80 ? `${c.after.slice(0, 80)}…` : c.after;
			log(`  ${c.file} [${c.field}]:`);
			log(`    before: ${beforePreview}`);
			log(`    after:  ${afterPreview}`);
		}
	}
}

main();
