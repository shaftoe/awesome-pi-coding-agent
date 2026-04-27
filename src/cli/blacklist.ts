/**
 * CLI for managing the URL blacklist.
 *
 * Usage:
 *   bun run blacklist add <url> <reason>    — add a URL manually
 *   bun run blacklist list                   — list all blacklisted URLs
 *   bun run blacklist check <url>           — check if a URL is blacklisted
 *   bun run blacklist remove <url>          — remove a URL from the blacklist
 */

import "../core/temporal.ts";

import {
	addToBlacklist,
	invalidateBlacklistCache,
	isBlacklisted,
	loadBlacklist,
	saveBlacklist,
} from "../core/blacklist.ts";
import { deleteEntry } from "../core/store.ts";
import { normalizeUrl } from "../sources/source.ts";

const [, , command, ...args] = process.argv;

function usage(): never {
	console.log(`Usage:
  bun run blacklist add <url> <reason>    Add a URL to the blacklist
  bun run blacklist list                  List all blacklisted URLs
  bun run blacklist check <url>           Check if a URL is blacklisted
  bun run blacklist remove <url>          Remove a URL from the blacklist`);
	process.exit(1);
}

if (!command) usage();

switch (command) {
	case "add": {
		const rawUrl = args[0];
		const reason = args.slice(1).join(" ");
		if (!rawUrl || !reason) {
			console.error("Error: both <url> and <reason> are required.");
			console.error("Usage: bun run blacklist add <url> <reason>");
			process.exit(1);
		}
		const url = normalizeUrl(rawUrl);
		invalidateBlacklistCache();
		const added = addToBlacklist(url, reason, { reason, source: "manual" });
		if (added) {
			const deleted = deleteEntry(url);
			console.log(`✅ Added to blacklist: ${url}${deleted ? " (entry deleted)" : ""}`);
		} else {
			console.log(`⚠️  Already blacklisted: ${url}`);
		}
		break;
	}
	case "list": {
		invalidateBlacklistCache();
		const { entries } = loadBlacklist();
		if (entries.length === 0) {
			console.log("Blacklist is empty.");
		} else {
			console.log(`${entries.length} blacklisted URL(s):\n`);
			for (const entry of entries) {
				console.log(`  ${entry.url}`);
				console.log(`    reason: ${entry.reason}`);
				console.log(`    source: ${entry.source}`);
				console.log(`    at:     ${entry.blacklisted_at}`);
				console.log();
			}
		}
		break;
	}
	case "check": {
		const rawUrl = args[0];
		if (!rawUrl) {
			console.error("Error: <url> is required.");
			console.error("Usage: bun run blacklist check <url>");
			process.exit(1);
		}
		const url = normalizeUrl(rawUrl);
		invalidateBlacklistCache();
		if (isBlacklisted(url)) {
			const { entries } = loadBlacklist();
			const entry = entries.find((e) => e.url === url);
			console.log(`🚫 Blacklisted: ${url}`);
			if (entry) {
				console.log(`   reason: ${entry.reason}`);
				console.log(`   source: ${entry.source}`);
			}
		} else {
			console.log(`✅ Not blacklisted: ${url}`);
		}
		break;
	}
	case "remove": {
		const rawUrl = args[0];
		if (!rawUrl) {
			console.error("Error: <url> is required.");
			console.error("Usage: bun run blacklist remove <url>");
			process.exit(1);
		}
		const url = normalizeUrl(rawUrl);
		invalidateBlacklistCache();
		const { entries, urlSet } = loadBlacklist();
		if (!urlSet.has(url)) {
			console.log(`⚠️  Not blacklisted: ${url}`);
			break;
		}
		const filtered = entries.filter((e) => e.url !== url);
		saveBlacklist(filtered);
		invalidateBlacklistCache();
		console.log(`✅ Removed from blacklist: ${url}`);
		break;
	}
	default:
		console.error(`Unknown command: ${command}`);
		usage();
}
