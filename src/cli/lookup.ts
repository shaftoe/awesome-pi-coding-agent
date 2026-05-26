/**
 * Look up a data store entry by URL.
 *
 * Searches the canonical entry store (`data/entries/`), and if not found,
 * falls back to the candidate pool (`.cache/candidates/`), the filtered
 * pool (`.cache/filtered/`), and the blacklist (`data/blacklist.json`).
 *
 * All storage lookups go through facade functions that hide the repository
 * implementation (file, SQLite, etc.). This CLI has zero knowledge of how
 * data is physically stored.
 *
 * Usage:
 *   bun run lookup <url>
 */

import "../core/temporal.ts";

import { join } from "node:path";
import { loadBlacklist } from "../core/blacklist.ts";
import { loadEntry } from "../core/store.ts";
import type { CategorizedEntry } from "../core/types.ts";
import type { DiscoveryLine } from "../discover/writer.ts";
import { lookupDiscoveryLine } from "../discover/writer.ts";
import { normalizeUrl } from "../sources/index.ts";

const ROOT_DIR = join(import.meta.dir, "..", "..");
const CANDIDATES_DIR = join(ROOT_DIR, ".cache", "candidates");
const FILTERED_DIR = join(ROOT_DIR, ".cache", "filtered");

// ─── Pretty-printing ───────────────────────────────────────────────────────────

function printEntry(entry: CategorizedEntry): void {
	console.log(`\n  📦 Entry found in data store (data/entries/)\n`);
	console.log(`  id:          ${entry.id}`);
	console.log(`  name:        ${entry.name}`);
	console.log(`  url:         ${entry.url}`);
	console.log(`  source:      ${entry.source}`);
	console.log(`  category:    ${entry.category}`);
	console.log(`  description: ${entry.description}`);

	if (entry.subitems?.length) {
		console.log(`  subitems:`);
		for (const sub of entry.subitems) {
			console.log(`    - ${sub.name}: ${sub.description}`);
		}
	}

	if (Object.keys(entry.metadata).length > 0) {
		console.log(`  metadata:`);
		for (const [key, value] of Object.entries(entry.metadata)) {
			console.log(`    ${key}: ${formatMetadataValue(value)}`);
		}
	}

	console.log();
}

function printCandidate(line: DiscoveryLine, label: string): void {
	const d = line.discovery;
	console.log(`\n  📋 Found in ${label}\n`);
	console.log(`  discoverer:  ${line.discoverer}`);
	console.log(`  url:         ${d.url}`);
	console.log(`  source:      ${d.source}`);
	console.log(`  id:          ${d.id ?? "(none)"}`);
	console.log(`  hint:        ${d.hint ?? "(none)"}`);
	if (d.metadata && Object.keys(d.metadata).length > 0) {
		console.log(`  metadata:`);
		for (const [key, value] of Object.entries(d.metadata)) {
			console.log(`    ${key}: ${formatMetadataValue(value)}`);
		}
	}
	console.log();
}

function printBlacklist(url: string): void {
	const { entries } = loadBlacklist();
	const entry = entries.find((e) => e.url === url);
	console.log(`\n  🚫 URL is blacklisted\n`);
	console.log(`  url:           ${entry?.url ?? url}`);
	console.log(`  reason:        ${entry?.reason ?? "(unknown)"}`);
	console.log(`  blacklisted:   ${entry?.blacklisted_at ?? "(unknown)"}`);
	console.log(`  source:        ${entry?.source ?? "(unknown)"}`);
	if (entry?.discovery) {
		console.log(`  discovery:`);
		console.log(`    sourceName: ${entry.discovery.sourceName}`);
		if (entry.discovery.query) console.log(`    query:      ${entry.discovery.query}`);
	}
	console.log();
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatMetadataValue(value: unknown): string {
	if (value === null || value === undefined) return "(null)";
	if (typeof value === "string") {
		// Truncate long strings
		return value.length > 120 ? `${value.slice(0, 120)}…` : value;
	}
	if (Array.isArray(value)) {
		if (value.length === 0) return "[]";
		return `[${value.join(", ")}]`;
	}
	return String(value);
}

// ─── Main ──────────────────────────────────────────────────────────────────────

const rawUrl = process.argv[2];
if (!rawUrl) {
	console.error("Usage: bun run lookup <url>");
	console.error("\nLook up a data store entry by URL.");
	console.error("Searches: data store → candidates → filtered → blacklist.\n");
	process.exit(1);
}

const url = normalizeUrl(rawUrl);

// 1. Check canonical data store
const entry = loadEntry(url);
if (entry) {
	printEntry(entry);
	process.exit(0);
}

// 2. Check candidates
const candidate = lookupDiscoveryLine(CANDIDATES_DIR, url);
if (candidate) {
	printCandidate(candidate, "candidates (.cache/candidates/)");
	process.exit(0);
}

// 3. Check filtered
const filtered = lookupDiscoveryLine(FILTERED_DIR, url);
if (filtered) {
	printCandidate(filtered, "filtered pool (.cache/filtered/)");
	process.exit(0);
}

// 4. Check blacklist
const { entries } = loadBlacklist();
if (entries.some((e) => e.url === url)) {
	printBlacklist(url);
	process.exit(0);
}

// Not found anywhere
console.error(`\n  ❌ URL not found in any data store:\n`);
console.error(`    ${url}\n`);
console.error("  Checked: data store, candidates, filtered, blacklist.\n");
process.exit(1);
