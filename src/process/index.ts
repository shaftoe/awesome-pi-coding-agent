/**
 * Process stage — Stage 3 of the pipeline.
 *
 * Reads filtered candidates from `.cache/filtered/`, deduplicates (npm > GitHub),
 * classifies into categories, and writes canonical entries to `data/entries/`.
 */

import "../core/temporal.ts";

import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { buildIndices, checkDuplicate, type DuplicationIndices } from "../core/dedup.ts";
import { cleanText } from "../core/html.ts";
import { writeMeta } from "../core/meta.ts";
import { getEntryRepo, saveEntry } from "../core/store.ts";
import type { CategorizedEntry, DiscoveryCandidate, Entry } from "../core/types.ts";
import { loadDiscoveryLines } from "../discover/writer.ts";
import { classifyEntry } from "../enrich/classify.ts";
import { extractId } from "../sources/index.ts";
import { resolveDuplicateAction, sourcePriority } from "./duplicate-action.ts";

const ROOT_DIR = join(import.meta.dir, "..", "..");
const DATA_DIR = join(ROOT_DIR, "data");
const CACHE_DIR = join(ROOT_DIR, ".cache");
const FILTERED_DIR = join(CACHE_DIR, "filtered");

// biome-ignore lint/suspicious/noConsole: CLI output
const log = console.log;

// ─── Duplicate resolution ──────────────────────────────────────────────────────

/** Merge fresh metadata from a same-source candidate into an existing entry. */
function refreshExistingEntry(
	discovery: DiscoveryCandidate,
	existing: CategorizedEntry,
	indices: DuplicationIndices,
): CategorizedEntry {
	const freshName =
		(discovery.metadata?.["title"] as string) ||
		(discovery.metadata?.["name"] as string) ||
		existing.name;
	const freshDesc = (discovery.metadata?.["description"] as string) || existing.description;

	const updated: CategorizedEntry = {
		...existing,
		name: cleanText(freshName),
		description: cleanText(freshDesc),
		metadata: {
			...(discovery.metadata ?? {}),
			discovery_hint:
				discovery.hint ?? (existing.metadata?.["discovery_hint"] as string | null) ?? null,
		},
	};

	const classified = classifyEntry(updated);
	saveEntry(classified);

	// Update indices with refreshed entry
	indices.byUrl.set(updated.url, classified);
	const meta = classified.metadata as Record<string, unknown>;
	if (typeof meta["github_url"] === "string") {
		indices.byGitHubUrl.set(meta["github_url"], classified);
	}

	log(`  🔄 ${classified.category}/${classified.id} (${discovery.source}) — metadata refreshed`);
	return classified;
}

/** Build a brand-new entry from a discovery candidate and add it to indices. */
function addNewEntry(discovery: DiscoveryCandidate, indices: DuplicationIndices): CategorizedEntry {
	const id = discovery.id ?? extractId(discovery.url);
	const rawName =
		(discovery.metadata?.["title"] as string) || (discovery.metadata?.["name"] as string) || id;
	const rawDesc = (discovery.metadata?.["description"] as string) || "";

	const entry: Entry = {
		id,
		name: cleanText(rawName),
		url: discovery.url,
		source: discovery.source,
		description: cleanText(rawDesc),
		metadata: {
			...(discovery.metadata ?? {}),
			discovery_hint: discovery.hint ?? null,
		},
	};

	const classified = classifyEntry(entry);
	saveEntry(classified);

	// Update indices for subsequent dedup
	indices.byUrl.set(entry.url, { ...classified, category: classified.category });
	const meta = classified.metadata as Record<string, unknown>;
	if (typeof meta["github_url"] === "string") {
		indices.byGitHubUrl.set(meta["github_url"], {
			...classified,
			category: classified.category,
		});
	}

	log(`  ✅ ${classified.category}/${classified.id} (${discovery.source})`);
	return classified;
}

// ─── Command ───────────────────────────────────────────────────────────────────

export async function cmdProcess(): Promise<void> {
	if (!existsSync(FILTERED_DIR)) {
		process.stderr.write(`❌ No filtered candidates found at ${FILTERED_DIR}\n`);
		process.stderr.write("Run `bun run filter` first.\n");
		process.exit(1);
	}

	// Ensure data directory exists
	if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

	// Load filtered candidates
	log("📋 Loading filtered candidates...");
	const lines = loadDiscoveryLines(FILTERED_DIR);

	// Sort by source priority (delegated to source.priority)
	const sorted = [...lines].sort(
		(a, b) => sourcePriority(a.discovery.source) - sourcePriority(b.discovery.source),
	);

	const sourceCounts = new Map<string, number>();
	for (const line of sorted) {
		const src = line.discovery.source;
		sourceCounts.set(src, (sourceCounts.get(src) ?? 0) + 1);
	}
	const countStr = [...sourceCounts.entries()].map(([s, c]) => `${c} ${s}`).join(", ");
	log(`Sorted: ${countStr}\n`);

	// Build dedup indices from existing entries
	const entryRepo = getEntryRepo();
	entryRepo.init();
	const indices = buildIndices(entryRepo);

	let added = 0;
	let replaced = 0;
	let refreshed = 0;
	let duplicates = 0;

	for (const line of sorted) {
		const discovery = line.discovery;
		const dup = checkDuplicate(discovery, indices);

		if (dup.isDuplicate) {
			const action = resolveDuplicateAction(discovery, dup);

			if (action === "replace") {
				const existing = dup.existingEntry;
				if (existing) {
					entryRepo.delete(existing.url);
					indices.byUrl.delete(existing.url);
				}
				// Fall through to addNewEntry below
				replaced++;
			} else if (action === "refresh") {
				if (dup.existingEntry) {
					refreshExistingEntry(discovery, dup.existingEntry, indices);
				}
				refreshed++;
				continue;
			} else {
				// "skip"
				duplicates++;
				continue;
			}
		}

		addNewEntry(discovery, indices);
		added++;
	}

	log(
		`\nAdded ${added} new entries, ${replaced} replaced (npm > github), ${refreshed} refreshed, ${duplicates} duplicates skipped`,
	);

	// Record when the datastore was last updated
	writeMeta();
	log("📝 Updated data/meta.json");
}

// ─── CLI entry point ───────────────────────────────────────────────────────────

cmdProcess();
