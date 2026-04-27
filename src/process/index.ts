/**
 * Process stage — Stage 3 of the pipeline.
 *
 * Reads filtered candidates from `.cache/filtered/`, deduplicates (npm > GitHub),
 * classifies into categories, and writes canonical entries to `data/entries/`.
 */

import "../core/temporal.ts";

import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { buildIndices, checkDuplicate } from "../core/dedup.ts";
import { extractId } from "../core/ids.ts";
import { getEntryRepo, saveEntry } from "../core/store.ts";
import { type Entry, EntrySource, HealthLevel } from "../core/types.ts";
import { loadDiscoveryLines } from "../discover/writer.ts";
import { classifyEntry } from "../enrich/classify.ts";
import { computeHealth } from "../enrich/health.ts";
import { getHealthScorer } from "../sources/index.ts";

const ROOT_DIR = join(import.meta.dir, "..", "..");
const DATA_DIR = join(ROOT_DIR, "data");
const CACHE_DIR = join(ROOT_DIR, ".cache");
const FILTERED_DIR = join(CACHE_DIR, "filtered");

// biome-ignore lint/suspicious/noConsole: CLI output
const log = console.log;

/** Source priority: npm wins over GitHub. */
const SOURCE_PRIORITY: Record<string, number> = {
	[EntrySource.NpmSearch]: 0,
	[EntrySource.GitHubSearch]: 1,
	[EntrySource.YouTubeSearch]: 2,
	[EntrySource.HackerNewsSearch]: 3,
	[EntrySource.RSSFeed]: 4,
	[EntrySource.Discord]: 5,
	[EntrySource.Manual]: 6,
};

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

	// Sort by source priority (npm first so npm entries are saved before GitHub counterparts)
	const sorted = [...lines].sort(
		(a, b) =>
			(SOURCE_PRIORITY[a.discovery.source] ?? 9) - (SOURCE_PRIORITY[b.discovery.source] ?? 9),
	);

	const npmCount = sorted.filter((l) => l.discovery.source === EntrySource.NpmSearch).length;
	const ghCount = sorted.filter((l) => l.discovery.source === EntrySource.GitHubSearch).length;
	const ytCount = sorted.filter((l) => l.discovery.source === EntrySource.YouTubeSearch).length;
	const hnCount = sorted.filter((l) => l.discovery.source === EntrySource.HackerNewsSearch).length;
	const rssCount = sorted.filter((l) => l.discovery.source === EntrySource.RSSFeed).length;
	log(
		`Sorted: ${npmCount} npm, ${ghCount} github, ${ytCount} youtube, ${hnCount} hackernews, ${rssCount} rss\n`,
	);

	// Build dedup indices from existing entries
	const entryRepo = getEntryRepo();
	entryRepo.init();
	const indices = buildIndices(entryRepo);

	let added = 0;
	let replaced = 0;
	let duplicates = 0;

	for (const line of sorted) {
		const discovery = line.discovery;
		const dup = checkDuplicate(discovery, indices);

		if (dup.isDuplicate) {
			// npm-over-GitHub replacement: if the candidate is from npm and the
			// existing entry is a GitHub URL, replace it with the npm canonical URL.
			if (
				discovery.source === EntrySource.NpmSearch &&
				dup.existingEntry &&
				dup.existingEntry.url.includes("github.com")
			) {
				entryRepo.delete(dup.existingEntry.url);
				indices.byUrl.delete(dup.existingEntry.url);
				// Fall through to save the npm entry below
				replaced++;
			} else {
				duplicates++;
				continue;
			}
		}

		const id = discovery.id ?? extractId(discovery.url);
		const entry: Entry = {
			id,
			name:
				(discovery.metadata?.["title"] as string) || (discovery.metadata?.["name"] as string) || id,
			url: discovery.url,
			source: discovery.source,
			description: (discovery.metadata?.["description"] as string) || "",
			metadata: {
				...(discovery.metadata ?? {}),
				discovery_hint: discovery.hint ?? null,
			},
			health: { score: 0, level: HealthLevel.Stale }, // overwritten below
		};

		const dims = getHealthScorer(entry.source)(entry);
		entry.health = computeHealth(entry, dims);

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

		added++;
		log(`  ✅ ${classified.category}/${classified.id} (${discovery.source})`);
	}

	log(
		`\nAdded ${added} new entries, ${replaced} replaced (npm > github), ${duplicates} duplicates skipped`,
	);
}

// ─── CLI entry point ───────────────────────────────────────────────────────────

cmdProcess();
