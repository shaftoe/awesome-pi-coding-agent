/**
 * awesome-pi-coding-agent — Main CLI entry point.
 *
 * Usage:
 *   bun run src/index.ts discover          Run all discovery pipelines
 *   bun run src/index.ts discover --stats  Run discovery with per-query statistics
 *   bun run src/index.ts enrich            Enrich all entries with metadata
 *   bun run src/index.ts generate          Regenerate README + site
 *   bun run src/index.ts pipeline          Run full pipeline (discover → enrich → generate)
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { isEntryRelevant, isRelevant } from "./discover/filter.ts";
import { githubDiscoverer } from "./discover/github.ts";
import { type Discoverer, discoveryStats, runDiscovery } from "./discover/index.ts";
import { npmDiscoverer } from "./discover/npm.ts";
import { piMonoDepsDiscoverer } from "./discover/pi-mono-deps.ts";
import { youtubeDiscoverer } from "./discover/youtube.ts";
import { classifyEntry } from "./enrich/classify.ts";
import { runEnrichment } from "./enrich/index.ts";
import { enrichVideos } from "./enrich/videos.ts";
import { generateReadme } from "./generate/readme.ts";
import { addToBlacklist, loadBlacklist } from "./lib/blacklist.ts";
import { prune } from "./lib/cache.ts";
import { buildIndices, checkDuplicate, findDuplicates, removeDuplicates } from "./lib/dedup.ts";
import { extractId } from "./lib/ids.ts";
import { deleteEntry, loadAllEntries, saveEntry } from "./lib/store.ts";
import type { DiscoveryCandidate, Entry } from "./lib/types.ts";

// biome-ignore lint/suspicious/noConsole: CLI output
const log = console.log;

const command = process.argv[2] ?? "help";

// ─── Discoverers ───────────────────────────────────────────────────────────────

/** All active discovery sources. npm is primary, GitHub is secondary (deduplicated against npm). */
const allDiscoverers: Discoverer[] = [
	npmDiscoverer,
	githubDiscoverer,
	youtubeDiscoverer,
	piMonoDepsDiscoverer,
];

// ─── Shared: save new candidates ───────────────────────────────────────────────

function saveNewCandidates(candidates: DiscoveryCandidate[], statsMode: boolean = false): number {
	const indices = buildIndices();
	let added = 0;
	let filtered = 0;
	let existing = 0;

	for (const candidate of candidates) {
		// Relevance filter — skip + auto-blacklist candidates unrelated to the Pi coding agent
		const verdict = isRelevant(candidate);
		if (!verdict.accept) {
			filtered++;
			updateQueryStats(candidate, "filtered");
			if (!statsMode) {
				log(`  🚫 Filtered: ${candidate.url} (${verdict.reason})`);
			}
			continue;
		}

		// Update stats — passed relevance
		updateQueryStats(candidate, "relevant");

		// Dedup: check against all axes (URL, ID, GitHub URL)
		const dup = checkDuplicate(candidate, indices);
		if (dup.isDuplicate) {
			existing++;
			continue;
		}

		const id = candidate.id ?? extractId(candidate.url);
		// Update stats — new entry
		updateQueryStats(candidate, "new");

		const entry: Entry = {
			id,
			name:
				(candidate.metadata?.["title"] as string) || (candidate.metadata?.["name"] as string) || id,
			url: candidate.url,
			source: candidate.source,
			description: (candidate.metadata?.["description"] as string) || "",
			metadata: {
				...(candidate.metadata ?? {}),
				discovery_hint: candidate.hint ?? null,
			},
			health: { score: 0, level: "stale" },
		};

		const classified = classifyEntry(entry);
		saveEntry(classified.category, classified);

		// Update indices so subsequent candidates dedup against this new entry
		indices.byUrl.set(entry.url, { ...classified, category: classified.category });
		indices.byId.set(classified.id, { ...classified, category: classified.category });
		const meta = classified.metadata as Record<string, unknown>;
		if (typeof meta["github_url"] === "string") {
			indices.byGitHubUrl.set(meta["github_url"] as string, {
				...classified,
				category: classified.category,
			});
		}

		added++;
		log(`  ✅ ${classified.category}/${classified.id} (${candidate.source})`);
	}

	if (statsMode) {
		log(`  Filtered: ${filtered}, Already existing: ${existing}, New: ${added}`);
	}
	return added;
}

/**
 * Update per-query statistics based on candidate processing outcome.
 * Matches the candidate's hint back to the query stats collected by QueryDiscoverer.
 */
function updateQueryStats(
	candidate: DiscoveryCandidate,
	outcome: "filtered" | "relevant" | "new",
): void {
	const hint = candidate.hint;
	if (!hint) return;

	// Find the matching query stats entry
	for (const queryStats of Object.values(discoveryStats.byDiscoverer)) {
		for (const qs of queryStats) {
			// Match hint pattern: "npm:query", "github:query", "youtube:query", "pi-mono-deps:query"
			if (hint === `${qs.query}` || hint.endsWith(`:${qs.query}`)) {
				if (outcome === "relevant") qs.relevant++;
				if (outcome === "new") qs.newEntries++;
				return;
			}
		}
	}
}

// ─── Commands ──────────────────────────────────────────────────────────────────

async function cmdDiscover(): Promise<void> {
	const statsMode = process.argv.includes("--stats");

	log("🔍 Running discovery pipelines...");
	const { candidates, summary } = await runDiscovery(allDiscoverers);

	const summaryStr = Object.entries(summary)
		.map(([name, count]) => `${name}: ${count}`)
		.join(", ");
	log(`Found ${candidates.length} candidates (${summaryStr})`);

	const added = saveNewCandidates(candidates, statsMode);
	log(`\nAdded ${added} new entries, filtered ${candidates.length - added} irrelevant`);

	if (statsMode) {
		log("\n📊 Per-query statistics:");
		log("─".repeat(80));
		for (const [discoverer, queryStats] of Object.entries(discoveryStats.byDiscoverer)) {
			log(`\n  ${discoverer}:`);
			log(
				"  " +
					"Query".padEnd(45) +
					"Fetched".padStart(8) +
					"Relevant".padStart(9) +
					"New".padStart(6) +
					"Prec%".padStart(7),
			);
			log(`  ${"─".repeat(74)}`);
			for (const qs of queryStats) {
				const precision = qs.fetched > 0 ? ((qs.relevant / qs.fetched) * 100).toFixed(1) : "N/A";
				const errMarker = qs.error ? " ⚠️" : "";
				log(
					"  " +
						qs.query.slice(0, 43).padEnd(45) +
						String(qs.fetched).padStart(8) +
						String(qs.relevant).padStart(9) +
						String(qs.newEntries).padStart(6) +
						String(precision).padStart(7) +
						errMarker,
				);
			}
		}
	}
}

async function cmdEnrich(): Promise<void> {
	await runEnrichment();
	await enrichVideos();
}

function cmdGenerate(): void {
	log("📝 Generating README.md...");
	const entries = loadAllEntries();
	const readme = generateReadme(entries);

	const readmePath = join(import.meta.dir, "..", "README.md");
	writeFileSync(readmePath, readme, "utf-8");
	log(`Generated README with ${entries.length} entries → ${readmePath}`);
}

async function cmdPipeline(): Promise<void> {
	log("🚀 Running full pipeline...");
	const pruned = prune();
	if (pruned > 0) log(`🗑️  Pruned ${pruned} expired cache entries`);
	log();
	await cmdDiscover();
	log();
	await cmdEnrich();
	log();
	cmdDedup();
	log();
	cmdGenerate();
	log("\n✅ Pipeline complete!");
}

function cmdPrune(): void {
	log("🧹 Pruning irrelevant entries...");
	const entries = loadAllEntries();
	let removed = 0;

	for (const entry of entries) {
		const result = isEntryRelevant(entry);
		if (!result.accept) {
			deleteEntry(entry.category, entry.id);
			removed++;
			log(`  🗑️  ${entry.category}/${entry.id} — ${result.reason}`);
		}
	}

	log(`\n🧹 Pruned ${removed} irrelevant entries (${entries.length - removed} remaining)`);
}

function cmdBlacklist(): void {
	const sub = process.argv[3];
	const blacklist = loadBlacklist();

	if (!sub || sub === "list") {
		log(`Blacklist (${blacklist.length} entries):`);
		for (const entry of blacklist) {
			log(`  ${entry.url} — ${entry.reason}`);
		}
		return;
	}

	if (sub === "add") {
		const url = process.argv[4];
		const reason = process.argv.slice(5).join(" ") || "manually blacklisted";
		if (!url) {
			log("Usage: bun run src/index.ts blacklist add <url> [reason]");
			return;
		}

		const added = addToBlacklist(url, reason);
		if (!added) {
			log(`Already blacklisted: ${url}`);
			return;
		}

		// Also delete the entry if it exists in data
		const indices = buildIndices();
		const existing = indices.byUrl.get(url);
		if (existing) {
			deleteEntry(existing.category, existing.id);
			log(`Removed entry: ${existing.category}/${existing.id}`);
		}

		log(`Blacklisted: ${url} — ${reason}`);
		return;
	}

	log(`Usage:
  bun run src/index.ts blacklist              List blacklisted URLs
  bun run src/index.ts blacklist add <url> [reason]  Add to blacklist
`);
}

function cmdDedup(): void {
	const dryRun = process.argv.includes("--dry-run");

	const groups = findDuplicates();
	if (groups.length === 0) {
		log("✅ No duplicates found.");
		return;
	}

	let totalDups = 0;
	for (const group of groups) {
		for (const dup of group.duplicates) {
			log(
				`  ${dryRun ? "🔍" : "🗑️"} ${dup.category}/${dup.id} (duplicate of ${group.keeper.category}/${group.keeper.id} via ${group.axis})`,
			);
			totalDups++;
		}
	}

	if (dryRun) {
		log(
			`\n🔍 Found ${totalDups} duplicate${totalDups === 1 ? "" : "s"} (dry run, no changes made).`,
		);
	} else {
		const removed = removeDuplicates();
		log(`\n🗑️  Removed ${removed} duplicate${removed === 1 ? "" : "s"}.`);
	}
}

function cmdHelp(): void {
	log(`
awesome-pi-coding-agent CLI

Usage:
  bun run src/index.ts <command>

Commands:
  discover    Run all discovery pipelines (GitHub, npm, YouTube, pi-mono-deps)
              Options: --stats  Show per-query effectiveness statistics
  enrich      Enrich all entries with metadata, video titles & health scores
  generate    Regenerate README.md from entry data
  prune       Remove entries that don't relate to the Pi coding agent
  blacklist   Manage the URL blacklist (list / add)
  dedup       Find and remove duplicate entries
              Options: --dry-run  Show duplicates without removing them
  pipeline    Run full pipeline (discover → enrich → generate)
  help        Show this help
`);
}

// ─── Run ───────────────────────────────────────────────────────────────────────

const commands: Record<string, () => void | Promise<void>> = {
	discover: cmdDiscover,
	enrich: cmdEnrich,
	generate: cmdGenerate,
	prune: cmdPrune,
	blacklist: cmdBlacklist,
	dedup: cmdDedup,
	pipeline: cmdPipeline,
	help: cmdHelp,
};

const fn = commands[command];
if (fn) {
	await fn();
} else {
	cmdHelp();
	process.exit(1);
}
