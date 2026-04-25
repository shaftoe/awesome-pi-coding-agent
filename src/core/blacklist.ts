/**
 * URL blacklist — single source of truth for blacklisting.
 *
 * O(1) lookups via an in-memory Set, auto-blacklist from the filter
 * pipeline, and manual additions from the CLI.
 *
 * File-backed: reads/writes `data/blacklist.json`.
 * The in-memory cache is lazy-loaded on first access.
 */

import "../core/temporal.ts";

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { BlacklistEntry } from "./types.ts";

export interface BlacklistOptions {
	/** Path to the blacklist JSON file. */
	filePath: string;
}

export interface AddToBlacklistOptions {
	reason: string;
	/** How this entry was added. Defaults to "filter". */
	source?: string;
	/** Discovery metadata (source name and query that produced the candidate). */
	discovery?: {
		sourceName: string;
		query?: string;
	};
}

const DEFAULT_PATH = join(process.cwd(), "data", "blacklist.json");

// ─── In-memory cache ───────────────────────────────────────────────────────────

let cache: { entries: BlacklistEntry[]; urlSet: Set<string> } | null = null;

function getCache(filePath: string = DEFAULT_PATH): {
	entries: BlacklistEntry[];
	urlSet: Set<string>;
} {
	if (!cache) {
		cache = loadBlacklist(filePath);
	}
	return cache;
}

// ─── Read ──────────────────────────────────────────────────────────────────────

export function loadBlacklist(filePath: string = DEFAULT_PATH): {
	entries: BlacklistEntry[];
	urlSet: Set<string>;
} {
	if (!existsSync(filePath)) return { entries: [], urlSet: new Set() };
	const entries = JSON.parse(readFileSync(filePath, "utf-8")) as BlacklistEntry[];
	return { entries, urlSet: new Set(entries.map((b) => b.url)) };
}

export function isBlacklisted(url: string, filePath?: string): boolean {
	return getCache(filePath).urlSet.has(url);
}

// ─── Write ─────────────────────────────────────────────────────────────────────

export function saveBlacklist(entries: BlacklistEntry[], filePath: string = DEFAULT_PATH): void {
	const dir = filePath.slice(0, filePath.lastIndexOf("/"));
	if (dir && !existsSync(dir)) mkdirSync(dir, { recursive: true });
	writeFileSync(filePath, `${JSON.stringify(entries, null, "\t")}\n`, "utf-8");
}

export function addToBlacklist(
	url: string,
	reason: string,
	optsOrFilePath?: string | AddToBlacklistOptions,
	filePath?: string,
): boolean {
	let opts: AddToBlacklistOptions = { reason, source: "filter" };
	let resolvedFilePath = filePath ?? DEFAULT_PATH;

	if (typeof optsOrFilePath === "string") {
		// Backward-compatible: third arg is filePath
		resolvedFilePath = optsOrFilePath;
	} else if (optsOrFilePath && typeof optsOrFilePath === "object") {
		opts = optsOrFilePath;
	}

	const c = getCache(resolvedFilePath);
	if (c.urlSet.has(url)) return false;

	const entry: BlacklistEntry = {
		url,
		reason: opts.reason,
		blacklisted_at: Temporal.Now.instant().toString(),
		source: opts.source ?? "filter",
		...(opts.discovery ? { discovery: opts.discovery } : {}),
	};

	c.entries.push(entry);
	c.urlSet.add(url);
	saveBlacklist(c.entries, resolvedFilePath);
	return true;
}

export function invalidateBlacklistCache(): void {
	cache = null;
}
