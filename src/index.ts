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
import {
	deleteEntry,
	findEntryByGitHubUrl,
	findEntryById,
	findEntryByUrl,
	loadAllEntries,
	loadBlacklist,
	saveEntry,
} from "./lib/store.ts";
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
	const blacklist = loadBlacklist();
	const blacklisted = new Set(blacklist.map((b) => b.url));
	let added = 0;
	let filtered = 0;
	let existing = 0;

	for (const candidate of candidates) {
		if (blacklisted.has(candidate.url)) continue;

		// Relevance filter — skip candidates unrelated to the Pi coding agent
		const relevance = isRelevant(candidate);
		if (!relevance.relevant) {
			filtered++;
			// Update stats for this candidate's query
			updateQueryStats(candidate, "filtered");
			if (!statsMode) {
				log(`  🚫 Filtered: ${candidate.url} (${relevance.reason})`);
			}
			continue;
		}

		// Update stats — passed relevance
		updateQueryStats(candidate, "relevant");

		// Dedup: check by primary URL
		if (findEntryByUrl(candidate.url)) {
			existing++;
			continue;
		}

		// Dedup: check by explicit ID (npm package names)
		const id = candidate.id ?? extractId(candidate.url);
		if (candidate.id && findEntryById(candidate.id)) {
			existing++;
			continue;
		}

		// Dedup: GitHub URLs found by GitHub discoverer may already exist
		// as metadata.github_url in an npm-sourced entry
		if (candidate.source === "github-search") {
			if (findEntryByGitHubUrl(candidate.url)) {
				existing++;
				continue;
			}
		}

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
	log("🚀 Running full pipeline...\n");
	await cmdDiscover();
	log();
	await cmdEnrich();
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
		if (!result.relevant) {
			deleteEntry(entry.category, entry.id);
			removed++;
			log(`  🗑️  ${entry.category}/${entry.id} — ${result.reason}`);
		}
	}

	log(`\n🧹 Pruned ${removed} irrelevant entries (${entries.length - removed} remaining)`);
}

function cmdBlacklist(): void {
	const sub = process.argv[3];
	const blacklistPath = join(import.meta.dir, "..", "data", "blacklist.json");
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
		if (blacklist.some((b) => b.url === url)) {
			log(`Already blacklisted: ${url}`);
			return;
		}
		blacklist.push({ url, reason });
		writeFileSync(blacklistPath, `${JSON.stringify(blacklist, null, "\t")}\n`, "utf-8");

		// Also delete the entry if it exists in data
		const entry = findEntryByUrl(url);
		if (entry) {
			deleteEntry(entry.category, entry.id);
			log(`Removed entry: ${entry.category}/${entry.id}`);
		}

		log(`Blacklisted: ${url} — ${reason}`);
		return;
	}

	log(`Usage:
  bun run src/index.ts blacklist              List blacklisted URLs
  bun run src/index.ts blacklist add <url> [reason]  Add to blacklist
`);
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
  pipeline    Run full pipeline (discover → enrich → generate)
  help        Show this help
`);
}

// ─── Utilities ─────────────────────────────────────────────────────────────────

/**
 * Derive an entry ID from a URL. Used as fallback when the discoverer
 * doesn't provide an explicit `candidate.id`.
 *
 * Rules (matching PLAN.md identity model):
 *   npm:     https://www.npmjs.com/package/@scope/name  → @scope/name
 *            https://www.npmjs.com/package/name        → name
 *   YouTube: https://www.youtube.com/watch?v=ID        → YT_ID
 *   GitHub:  https://github.com/owner/repo             → owner-repo
 */
function extractId(url: string): string {
	// npm: extract full package name (with scope) from URL
	if (url.includes("npmjs.com/package/")) {
		const packagePath = url.split("npmjs.com/package/")[1];
		return decodeURIComponent(packagePath?.replace(/\/+$/, "") ?? "");
	}

	// YouTube
	if (url.includes("youtube.com") || url.includes("youtu.be")) {
		const videoId = url.match(/[?&]v=([^&]+)/)?.[1] ?? url.split("/").pop() ?? "";
		return `YT_${videoId}`;
	}

	// GitHub: owner/repo → owner-repo
	const ghMatch = url.match(/github\.com\/([^/]+\/[^/]+)/);
	if (ghMatch?.[1]) return ghMatch[1].replace("/", "-");

	// Fallback: last path segment
	return url.split("/").filter(Boolean).pop() ?? url;
}

// ─── Run ───────────────────────────────────────────────────────────────────────

const commands: Record<string, () => void | Promise<void>> = {
	discover: cmdDiscover,
	enrich: cmdEnrich,
	generate: cmdGenerate,
	prune: cmdPrune,
	blacklist: cmdBlacklist,
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
