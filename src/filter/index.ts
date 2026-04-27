/**
 * Filter stage — Stage 2 of the pipeline.
 *
 * Reads raw candidates from `.cache/candidates/`, runs the relevance filter,
 * writes survivors to `.cache/filtered/`, and grows the blacklist with
 * rejected URLs (including discovery metadata).
 */

import "../core/temporal.ts";

import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { FileRepository, type Repository } from "../core/repository.ts";
import { type DiscoveryLine, loadDiscoveryLines } from "../discover/writer.ts";
import { isRelevant } from "./filter.ts";

const ROOT_DIR = join(import.meta.dir, "..", "..");
const CACHE_DIR = join(ROOT_DIR, ".cache");
const CANDIDATES_DIR = join(CACHE_DIR, "candidates");
const FILTERED_DIR = join(CACHE_DIR, "filtered");

// biome-ignore lint/suspicious/noConsole: CLI output
const log = console.log;

// ─── Command ───────────────────────────────────────────────────────────────────

export async function cmdFilter(): Promise<void> {
	if (!existsSync(CANDIDATES_DIR)) {
		process.stderr.write(`❌ No candidates found at ${CANDIDATES_DIR}\n`);
		process.stderr.write("Run `bun run discover` first.\n");
		process.exit(1);
	}

	// Ensure output directory exists
	if (!existsSync(FILTERED_DIR)) mkdirSync(FILTERED_DIR, { recursive: true });

	// Load all candidate lines from Stage 1 (preserves per-candidate discoverer)
	log("📋 Loading candidates...");
	const lines = loadDiscoveryLines(CANDIDATES_DIR);

	// Build summary for logging
	const summary: Record<string, number> = {};
	for (const line of lines) {
		summary[line.discoverer] = (summary[line.discoverer] ?? 0) + 1;
	}
	const summaryStr = Object.entries(summary)
		.map(([name, count]) => `${name}: ${count}`)
		.join(", ");
	log(`Loaded ${lines.length} candidates (${summaryStr})`);

	// Set up filtered writer
	const filteredRepo: Repository<DiscoveryLine> = new FileRepository<DiscoveryLine>(FILTERED_DIR);
	filteredRepo.init();
	filteredRepo.clear(); // Fresh filter run

	let accepted = 0;
	let rejected = 0;

	for (const line of lines) {
		const { discovery } = line;
		const discoveryMeta: { sourceName: string; query?: string } = {
			sourceName: line.discoverer,
		};
		if (discovery.hint) discoveryMeta.query = discovery.hint;

		const candidate: {
			url: string;
			id?: string;
			metadata?: Record<string, unknown>;
			discovery?: { sourceName: string; query?: string };
		} = {
			url: discovery.url,
		};
		if (discovery.id) candidate.id = discovery.id;
		if (discovery.metadata) candidate.metadata = discovery.metadata;
		candidate.discovery = discoveryMeta;

		const verdict = isRelevant(candidate);

		if (verdict.accept) {
			filteredRepo.set(discovery.url, line);
			accepted++;
			log(`  ✅ ${discovery.url}`);
		} else {
			rejected++;
			log(`  ❌ ${discovery.url} — ${verdict.reason}`);
		}
	}

	await filteredRepo.flush();

	log(`\n✅ ${accepted} accepted, ${rejected} rejected`);
	log(`Filtered candidates saved to ${FILTERED_DIR}`);
	log("Run `bun run process` to dedup, classify, and save entries.");
}

// ─── CLI entry point ───────────────────────────────────────────────────────────

cmdFilter();
