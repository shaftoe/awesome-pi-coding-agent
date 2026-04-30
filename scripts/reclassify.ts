/**
 * One-time reclassification script for issue #51.
 *
 * Applies the updated classifier to all existing misc entries,
 * blacklists irrelevant entries, and removes blacklisted entries from data/.
 *
 * Usage: bun run scripts/reclassify.ts
 */

import "../src/core/temporal.ts";

import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { addToBlacklist, loadBlacklist } from "../src/core/blacklist.ts";
import { classifyEntry } from "../src/enrich/classify.ts";
import type { CategorizedEntry } from "../src/core/types.ts";

const ROOT_DIR = join(import.meta.dir, "..");
const DATA_DIR = join(ROOT_DIR, "data", "entries");
const BLACKLIST_PATH = join(ROOT_DIR, "data", "blacklist.json");

// ─── URLs to blacklist (empty repos, non-Pi-specific, spam) ────────────────────

const BLACKLIST_URLS: Array<{ url: string; reason: string }> = [
	// Empty GitHub repos (no description, no value to list)
	{ url: "https://github.com/river/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/gustialfian/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/SaschaMet/pi-coding-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/saga/PI-Coding-Agent-OpenClaw-study", reason: "Empty repo, no description" },
	{ url: "https://github.com/gerkoh/pi-agents", reason: "Empty repo, no description" },
	{ url: "https://github.com/sayyss/Pi-coding-agent-visualizer-", reason: "Empty repo, no description" },
	{ url: "https://github.com/giladashubham/PI-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/sndrgrdn/pi-coding-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/cyril265/my-pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/AlexMold/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/mikeyobrien/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/potentialdiffer/pi-agent-stuff", reason: "Empty repo, no description" },
	{ url: "https://github.com/hushhenry/pi-agent-vercel", reason: "Empty repo, no description" },
	{ url: "https://github.com/shyamchandranmec/pi-agent-demo", reason: "Empty repo, no description" },
	{ url: "https://github.com/T1t4m1un/pi-agent-team", reason: "Empty repo, no description" },
	{ url: "https://github.com/acennan/pi-agents", reason: "Empty repo, no description" },
	{ url: "https://github.com/jobmatchme/bee-pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/heweijie0306/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/Caho1/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/Whamp/pi-agents-md-router", reason: "Empty repo, no description" },
	{ url: "https://github.com/ditfetzt/pi-cline-free-models", reason: "Empty repo, no description" },
	{ url: "https://github.com/ADIX7/pi-agent-temperature", reason: "Empty repo, no description" },
	{ url: "https://github.com/dkmaker/pi-agent-framework", reason: "Empty repo, no description" },
	{ url: "https://github.com/skidvis/pi-coding-agent-config", reason: "Empty repo, no description" },
	{ url: "https://github.com/make-it-simple-rayshar/pi-coding-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/louiss0/pi-agent-resource", reason: "Empty repo, no description" },
	{ url: "https://github.com/RobotStartup/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/thienlh/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/0xundef/pi-agent-browser", reason: "Empty repo, no description" },
	{ url: "https://github.com/jamesacarr/pi-agent-stuff", reason: "Empty repo, no description" },
	{ url: "https://github.com/timjonaswechler/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/aehyok/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/chriseidhof/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/hushhenry/pi-agent-refactored", reason: "Empty repo, no description" },
	{ url: "https://github.com/pasky/pi-agent-config", reason: "Empty repo, no description" },
	{ url: "https://github.com/NiranjanJ2/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/Whamp/pi-agentic-compaction", reason: "Empty repo, no description" },
	{ url: "https://github.com/saurabhp75/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/mrndstvndv/pi-coding-agent-flake", reason: "Empty repo, no description" },
	{ url: "https://github.com/thebluewhale/pi-agent-study", reason: "Empty repo, no description" },
	{ url: "https://github.com/pascal-de-ladurantaye/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/jinxi97/pi-agent-workspace", reason: "Empty repo, no description" },
	{ url: "https://github.com/jinxi97/pi-agent-client", reason: "Empty repo, no description" },
	{ url: "https://github.com/abishalom/pi-agent-stuff", reason: "Empty repo, no description" },
	{ url: "https://github.com/LinYS77/pi-agentteam", reason: "Empty repo, no description" },
	{ url: "https://github.com/AaronShark/pi-agent-demo", reason: "Empty repo, no description" },
	{ url: "https://github.com/raindragon14/pi-agent-config", reason: "Empty repo, no description" },
	{ url: "https://github.com/eaglecloud-inc/pi-agent-sdk", reason: "Empty repo, no description" },
	{ url: "https://github.com/johndlong73/pi-agent-engrams", reason: "Empty repo, no description" },
	{ url: "https://github.com/jbro/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/TheFurnace/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/IMackerI/pi-agent-config", reason: "Empty repo, no description" },
	{ url: "https://github.com/harunjeylan/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/funtuan/pi-agent-cf", reason: "Empty repo, no description" },
	{ url: "https://github.com/Cicici-Shi/pi-agent-starter", reason: "Empty repo, no description" },
	{ url: "https://github.com/cardosoccc/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/pmTouchedTheCode/pi-agents", reason: "Empty repo, no description" },
	{ url: "https://github.com/dcai/discord-pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/joshleblanc/pi-agent", reason: "Empty repo, no description" },
	{ url: "https://github.com/luzyfurz-tech/Pi-agent", reason: "Empty repo, no description" },

	// Empty npm packages
	{ url: "https://www.npmjs.com/package/@robhowley/pi-session-hygiene", reason: "Empty npm package, no description" },
	{ url: "https://www.npmjs.com/package/pi-agent-pack", reason: "Empty npm package, no description" },
	{ url: "https://www.npmjs.com/package/pi-glimpse-changes", reason: "Empty npm package, no description" },

	// Non-Pi-specific entries
	{ url: "https://github.com/Lum1104/Understand-Anything", reason: "Generic knowledge graph tool, not Pi-specific" },
	{ url: "https://github.com/moshehbenavraham/crocbot", reason: "OpenClaw fork, not Pi-specific" },
	{ url: "https://github.com/ai-ecoverse/slicc", reason: "Generic browser AI agent, not Pi-specific" },
	{ url: "https://github.com/shanevcantwell/frontier-advisor", reason: "Generic frontier AI advisor, not Pi-specific" },
	{ url: "https://github.com/aranair/dotfiles", reason: "Generic dotfiles, not Pi-specific" },
	{ url: "https://github.com/stussysenik/pi-agent-global", reason: "OpenScreen-Zig DSL, not Pi-specific" },
	{ url: "https://github.com/averycrespi/agent-config", reason: "Generic agent config, not Pi-specific" },
	{ url: "https://github.com/Rahlir/clunker-stuff", reason: "Personal stuff, not useful for listing" },
	{ url: "https://github.com/perminder-klair/ruuh", reason: "Android AI assistant, not Pi-specific" },
	{ url: "https://github.com/rcarmo/piclaw", reason: "OpenClaw clone, not Pi-specific" },
	{ url: "https://github.com/machulav/accountant24", reason: "Personal accounting app, not Pi-specific" },
	{ url: "https://github.com/johnochinero/pillarz-agent", reason: "PILLARZ site agent, not Pi-specific" },
	{ url: "https://github.com/nwtgck/piping-url-agent", reason: "Piping Server agent, not Pi-specific" },
	{ url: "https://github.com/lgersman/wasm-playground", reason: "WASM playground, not Pi-specific" },
	{ url: "https://github.com/dyyz1993/pi-agent-template", reason: "Electrobun template, not Pi-specific" },
	{ url: "https://github.com/kaikozlov/pi-buddy", reason: "Terminal pet, entertainment only" },

	// Actions marketplace spam
	{
		url: "https://github.com/actions-marketplace-validations/shaftoe_pi-coding-agent-action",
		reason: "Auto-generated actions marketplace validation entry",
	},

	// Non-Pi-specific npm packages
	{ url: "https://www.npmjs.com/package/@aedge-io/typed-clone", reason: "Generic clone utility, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/@andamio/coach", reason: "Learning platform, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/@beatly/core", reason: "SuperCollider runtime, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/@ruminaider/notion-cli", reason: "Notion CLI, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/@0xtiby/looper", reason: "Generic AI loop engine, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/demo-dev", reason: "Product demo generator, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/shopq", reason: "Shopify CLI, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/dripline", reason: "Generic query tool, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/expert-ai", reason: "AEC domain intelligence, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/holdpty", reason: "Cross-platform PTY, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/@jay-zod/speak", reason: "TTS utility, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/@jay-zod/speakturbo", reason: "TTS utility, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/sterlai", reason: "Stellar AI agent, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/claudemon", reason: "Claude usage monitor, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/thincontext", reason: "Generic context compression, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/drata-cli", reason: "Drata API client, not Pi-specific" },

	// More non-Pi-specific entries identified during review
	{ url: "https://www.npmjs.com/package/@marcfargas/go-holded", reason: "Holded API wrapper, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/@marcfargas/go-easy", reason: "Google APIs wrapper, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/glimpseui", reason: "Generic micro-UI framework, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/runline", reason: "Generic code mode for agents, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/agent-comms", reason: "Generic agent communication mesh, not Pi-specific" },
	{ url: "https://www.npmjs.com/package/@clankie/json-ui-render", reason: "Clankie-specific UI renderer, not Pi-specific" },
];

// biome-ignore lint/suspicious/noConsole: CLI output
const log = console.log;

// ─── Main ──────────────────────────────────────────────────────────────────────

function main(): void {
	log("=== Reclassification script for issue #51 ===\n");

	// Step 1: Add URLs to blacklist
	log(`📋 Adding ${BLACKLIST_URLS.length} URLs to blacklist...`);
	let blacklisted = 0;
	for (const { url, reason } of BLACKLIST_URLS) {
		const added = addToBlacklist(url, reason, { reason, source: "manual" }, BLACKLIST_PATH);
		if (added) blacklisted++;
	}
	log(`   Added ${blacklisted} new blacklist entries\n`);

	// Step 2: Load all entries and remove blacklisted ones
	log("📂 Loading entries...");
	const blacklistData = loadBlacklist(BLACKLIST_PATH);
	const blacklistSet = blacklistData.urlSet;

	const files = readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
	log(`   Found ${files.length} entry files\n`);

	let removed = 0;
	let reclassified = 0;
	const stats: Array<{ from: string; to: string; name: string }> = [];

	for (const file of files) {
		const filePath = join(DATA_DIR, file);
		const raw = readFileSync(filePath, "utf-8");
		const entry = JSON.parse(raw) as CategorizedEntry;

		// Remove blacklisted entries
		if (blacklistSet.has(entry.url)) {
			rmSync(filePath);
			removed++;
			continue;
		}

		// Reclassify misc entries
		if (entry.category === "misc") {
			const reclassified_entry = classifyEntry(entry);
			if (reclassified_entry.category !== entry.category) {
				stats.push({
					from: entry.category,
					to: reclassified_entry.category,
					name: entry.name,
				});
				writeFileSync(filePath, `${JSON.stringify(reclassified_entry, null, "\t")}\n`, "utf-8");
				reclassified++;
			}
		}
	}

	log(`🗑️  Removed ${removed} blacklisted entries`);
	log(`🔄 Reclassified ${reclassified} entries:\n`);

	const byCategory: Record<string, number> = {};
	for (const s of stats) {
		byCategory[s.to] = (byCategory[s.to] ?? 0) + 1;
	}
	for (const [cat, count] of Object.entries(byCategory).sort(([, a], [, b]) => b - a)) {
		log(`   → ${cat}: ${count}`);
	}

	// Final count
	const remainingFiles = readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
	const categoryCounts: Record<string, number> = {};
	for (const file of remainingFiles) {
		const raw = readFileSync(join(DATA_DIR, file), "utf-8");
		const entry = JSON.parse(raw) as CategorizedEntry;
		categoryCounts[entry.category] = (categoryCounts[entry.category] ?? 0) + 1;
	}

	log(`\n📊 Final category distribution:`);
	for (const [cat, count] of Object.entries(categoryCounts).sort(([, a], [, b]) => b - a)) {
		log(`   ${cat}: ${count}`);
	}
	log(`   Total: ${remainingFiles.length}`);
}

main();
