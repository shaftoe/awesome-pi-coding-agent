/**
 * Enrichment pipeline — add metadata to discovered entries.
 *
 * Runs GitHub metadata fetch, README analysis, classification, and health scoring.
 * Skips entries that are already fully enriched.
 * Processes entries concurrently with rate-limit-aware delays.
 */

import { deleteEntry, loadAllEntries, saveEntry } from "../lib/store.ts";
import type { CategorizedEntry } from "../lib/types.ts";
import { classifyEntry } from "./classify.ts";
import { enrichGitHubMeta, hasFullGitHubMeta } from "./github-meta.ts";
import { calculateHealth } from "./health.ts";
import { enrichFromReadme, hasReadmeScores } from "./readme.ts";

// biome-ignore lint/suspicious/noConsole: CLI output
const log = console.log;

/** Remove duplicate entries (same ID in different categories), keeping the one with more metadata. */
function deduplicate(entries: CategorizedEntry[]): {
	entries: CategorizedEntry[];
	removed: number;
} {
	const seen = new Map<string, CategorizedEntry>();
	const toRemove: Array<{ category: string; id: string }> = [];

	for (const entry of entries) {
		const existing = seen.get(entry.id);
		if (existing) {
			// Keep the one with more metadata keys
			const existingKeys = Object.keys(existing.metadata as object).length;
			const currentKeys = Object.keys(entry.metadata as object).length;
			if (currentKeys > existingKeys) {
				toRemove.push({ category: existing.category, id: existing.id });
				seen.set(entry.id, entry);
			} else {
				toRemove.push({ category: entry.category, id: entry.id });
			}
		} else {
			seen.set(entry.id, entry);
		}
	}

	for (const d of toRemove) {
		deleteEntry(d.category as import("../lib/types.ts").Category, d.id);
	}

	return { entries: [...seen.values()], removed: toRemove.length };
}

/** Check if an entry has a GitHub URL that can be enriched. */
function hasGitHubUrl(entry: CategorizedEntry): boolean {
	if (entry.source === "npm-search") {
		const meta = entry.metadata as Record<string, unknown>;
		return typeof meta["github_url"] === "string" && meta["github_url"] !== "";
	}
	return entry.url.includes("github.com");
}

/** Check if an entry already has all enrichment data. */
function isFullyEnriched(entry: CategorizedEntry): boolean {
	// Videos don't need GitHub enrichment
	if (entry.category === "video") return true;

	const hasGitHub = hasGitHubUrl(entry);

	// If it has a GitHub URL, it needs both GitHub metadata and README scores
	if (hasGitHub) {
		return hasFullGitHubMeta(entry) && hasReadmeScores(entry);
	}

	// No GitHub URL — only needs README scores (or already attempted)
	return hasReadmeScores(entry);
}

/**
 * Run the enrichment pipeline over all entries.
 * Skips already-enriched entries, processes the rest concurrently.
 */
export async function runEnrichment(): Promise<void> {
	const { entries, removed: dupes } = deduplicate(loadAllEntries());
	if (dupes > 0) {
		log(`   Removed ${dupes} duplicate entries`);
	}

	const toEnrich = entries.filter((e) => !isFullyEnriched(e));
	const skipped = entries.length - toEnrich.length;
	log(`📋 Enriching entries with metadata... (${entries.length} total)`);

	if (skipped > 0) {
		log(`   Skipping ${skipped} already-enriched entries`);
	}

	if (toEnrich.length === 0) {
		log("✅ All entries already enriched!");
		return;
	}

	log(`   Enriching ${toEnrich.length} entries (concurrency: 5, delay: 200ms)...`);

	let enriched = 0;
	let failed = 0;
	let githubHits = 0;
	let readmeHits = 0;

	// Process in batches of 5 to avoid rate limits
	const CONCURRENCY = 5;
	const DELAY_MS = 200;

	for (let i = 0; i < toEnrich.length; i += CONCURRENCY) {
		const batch = toEnrich.slice(i, i + CONCURRENCY);

		const results = await Promise.allSettled(
			batch.map(async (entry) => {
				let updated: CategorizedEntry = { ...entry };

				// Step 1: GitHub metadata enrichment (fills gaps like last_commit, license)
				if (!hasFullGitHubMeta(updated)) {
					const withMeta = await enrichGitHubMeta(updated);
					if (withMeta) {
						updated = { ...withMeta, category: entry.category };
						githubHits++;
					}
				}

				// Step 2: README analysis
				if (!hasReadmeScores(updated)) {
					const withReadme = await enrichFromReadme(updated);
					updated = { ...withReadme, category: entry.category };
					readmeHits++;
				}

				// Step 3: Reclassify and recalculate health
				const reclassified = classifyEntry(updated);
				const health = calculateHealth(reclassified);

				const final = {
					...reclassified,
					health,
				};

				// If category changed, remove the old file
				if (entry.category !== final.category) {
					deleteEntry(entry.category, entry.id);
				}

				saveEntry(final.category, final);
				enriched++;

				return final;
			}),
		);

		// Log progress
		for (const result of results) {
			if (result.status === "fulfilled") {
				const e = result.value;
				log(
					`  ✅ [${enriched}/${toEnrich.length}] ${e.category}/${e.id} (health: ${e.health.score} ${e.health.level})`,
				);
			} else {
				failed++;
				log(`  ❌ [${enriched + failed}/${toEnrich.length}] Failed: ${result.reason}`);
			}
		}

		// Rate-limit delay between batches
		if (i + CONCURRENCY < toEnrich.length) {
			await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
		}
	}

	log(
		`\n✅ Enriched ${enriched} entries (${githubHits} GitHub, ${readmeHits} README)${failed > 0 ? `, ${failed} failed` : ""}`,
	);
}
