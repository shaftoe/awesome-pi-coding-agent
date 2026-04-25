/**
 * Discovery orchestration — Stage 1 of the pipeline.
 *
 * Gathers raw candidates from APIs and writes them to `.cache/candidates/`.
 * No filtering, no dedup, no saving to `data/`.
 *
 * Modes:
 *   - default:  gather discoveries from APIs → write to staging area
 *   - offline:  same but only use cached API responses
 */

import "../core/temporal.ts";

import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { Cache } from "../core/cache.ts";
import { createAllSources, routeQueries, type SourceOverrides } from "../sources/index.ts";
import { runDiscovery } from "./runner.ts";
import { DiscoveryWriter } from "./writer.ts";

const ROOT_DIR = join(import.meta.dir, "..", "..");
const CACHE_DIR = join(ROOT_DIR, ".cache");
const CANDIDATES_DIR = join(CACHE_DIR, "candidates");

/** Ensure required directories exist before any parallel work starts. */
function ensureScaffolding(): void {
	for (const dir of [CACHE_DIR, CANDIDATES_DIR]) {
		if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
	}
}

// biome-ignore lint/suspicious/noConsole: CLI output
const log = console.log;

// ─── Options ───────────────────────────────────────────────────────────────────

export interface DiscoverOptions extends SourceOverrides {
	/** Only use cached API responses (no network calls). */
	offline?: boolean;
}

// ─── Command ───────────────────────────────────────────────────────────────────

/** Run the discover command. */
export async function cmdDiscover(opts: DiscoverOptions = {}): Promise<void> {
	ensureScaffolding();

	const cache = new Cache({ dir: CACHE_DIR });
	const writer = new DiscoveryWriter(CANDIDATES_DIR);
	const sources = createAllSources(cache, opts);

	if (opts.offline) {
		log("🔌 Offline mode — only using cached API responses");
	}

	// Gather discoveries (reset repository for a fresh gather)
	log(`🔍 Running ${sources.length} discovery source(s)...`);
	const { summary, total } = await runDiscovery(sources, writer, { reset: true });

	const summaryStr = Object.entries(summary)
		.map(([name, count]) => `${name}: ${count}`)
		.join(", ");
	log(`✅ Wrote ${total} discoveries (${summaryStr})`);
	log(`\nCandidates saved to ${CANDIDATES_DIR}`);
	log("Run `bun run filter` to filter, then `bun run process` to save entries.");
}

// ─── CLI entry point ───────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const offline = args.includes("--offline");

// Collect all --query values (supports multiple: --query "foo" --query "gh:bar")
const rawQueries: string[] = [];
for (let i = 0; i < args.length; i++) {
	if (args[i] === "--query" && i + 1 < args.length && args[i + 1]) {
		rawQueries.push(args[i + 1] as string);
	}
}

const opts: DiscoverOptions = {};
if (offline) opts.offline = true;
try {
	if (rawQueries.length > 0) Object.assign(opts, routeQueries(rawQueries));
	cmdDiscover(opts);
} catch (err) {
	process.stderr.write(`❌ ${err instanceof Error ? err.message : err}\n`);
	process.exit(1);
}
