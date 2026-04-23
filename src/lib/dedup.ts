/**
 * Shared dedup utility — prevents duplicate entries across the data store.
 *
 * Dedup axes:
 *   1. URL  — primary identity (entry.url)
 *   2. ID   — canonical identifier (entry.id / candidate.id)
 *   3. GitHub URL — cross-source dedup (metadata.github_url)
 *
 * Used by:
 *   - Discovery pipeline (check incoming candidates against existing entries)
 *   - `bun run dedup` CLI command (find & remove duplicates in existing data)
 *   - CI pipeline (detect duplicates before creating PRs)
 *
 * Design: loads entries once, builds lookup indices, provides fast O(1) checks.
 */
import { deleteEntry, loadAllEntries } from "./store.ts";
import type { CategorizedEntry } from "./types.ts";

// ─── Indices ───────────────────────────────────────────────────────────────────

export interface DedupIndices {
	byUrl: Map<string, CategorizedEntry>;
	byId: Map<string, CategorizedEntry>;
	byGitHubUrl: Map<string, CategorizedEntry>;
}

/**
 * Build dedup indices from the current data store.
 * Loads all entries once and indexes by URL, ID, and GitHub URL.
 */
export function buildIndices(): DedupIndices {
	const entries = loadAllEntries();

	const byUrl = new Map<string, CategorizedEntry>();
	const byId = new Map<string, CategorizedEntry>();
	const byGitHubUrl = new Map<string, CategorizedEntry>();

	for (const entry of entries) {
		byUrl.set(entry.url, entry);
		byId.set(entry.id, entry);

		const meta = entry.metadata as Record<string, unknown>;
		const ghUrl = meta["github_url"];
		if (typeof ghUrl === "string") {
			byGitHubUrl.set(ghUrl, entry);
		}
	}

	return { byUrl, byId, byGitHubUrl };
}

// ─── Candidate check (discovery pipeline) ──────────────────────────────────────

export interface DedupResult {
	/** Whether the candidate is a duplicate of an existing entry. */
	isDuplicate: boolean;
	/** The existing entry that this candidate duplicates, if any. */
	existing: CategorizedEntry | null;
	/** Which dedup axis matched. */
	axis: "url" | "id" | "github_url" | null;
}

/**
 * Check whether a discovery candidate duplicates an existing entry.
 * Uses pre-built indices for O(1) lookups.
 */
export function checkDuplicate(
	candidate: { url: string; id?: string; source?: string },
	indices: DedupIndices,
): DedupResult {
	// Check by primary URL
	const byUrl = indices.byUrl.get(candidate.url);
	if (byUrl) {
		return { isDuplicate: true, existing: byUrl, axis: "url" };
	}

	// Check by explicit ID (npm package names)
	if (candidate.id) {
		const byId = indices.byId.get(candidate.id);
		if (byId) {
			return { isDuplicate: true, existing: byId, axis: "id" };
		}
	}

	// Check by GitHub URL (GitHub discoveries may match npm-sourced entries)
	if (candidate.source === "github-search") {
		const byGh = indices.byGitHubUrl.get(candidate.url);
		if (byGh) {
			return { isDuplicate: true, existing: byGh, axis: "github_url" };
		}
	}

	return { isDuplicate: false, existing: null, axis: null };
}

// ─── Existing-data dedup (CLI / CI) ───────────────────────────────────────────

export interface DuplicateGroup {
	/** The entry to keep (highest health score wins). */
	keeper: CategorizedEntry;
	/** Entries to remove (duplicates of keeper). */
	duplicates: CategorizedEntry[];
	/** Which axis triggered the match. */
	axis: "url" | "id" | "github_url";
}

/**
 * Find all duplicate groups among existing entries.
 *
 * Strategy: iterate entries, index as we go. When a collision is found,
 * keep the entry with the higher health score and mark the other as a duplicate.
 */
export function findDuplicates(entries?: CategorizedEntry[]): DuplicateGroup[] {
	const all = entries ?? loadAllEntries();

	// Maps: key → the entry currently occupying that key
	const urlMap = new Map<string, CategorizedEntry>();
	const idMap = new Map<string, CategorizedEntry>();
	const ghUrlMap = new Map<string, CategorizedEntry>();

	// Track which entries are duplicates and what they collide with
	const dupOf = new Map<
		CategorizedEntry,
		{ keeper: CategorizedEntry; axis: "url" | "id" | "github_url" }
	>();

	for (const entry of all) {
		// Check URL collision
		const existingByUrl = urlMap.get(entry.url);
		if (existingByUrl) {
			const [keeper, loser] = pickKeeper(existingByUrl, entry);
			dupOf.set(loser, { keeper, axis: "url" });
			urlMap.set(entry.url, keeper);
			continue;
		}
		urlMap.set(entry.url, entry);

		// Check ID collision
		const existingById = idMap.get(entry.id);
		if (existingById) {
			const [keeper, loser] = pickKeeper(existingById, entry);
			dupOf.set(loser, { keeper, axis: "id" });
			continue;
		}
		idMap.set(entry.id, entry);

		// Check GitHub URL collision
		const meta = entry.metadata as Record<string, unknown>;
		const ghUrl = meta["github_url"];
		if (typeof ghUrl === "string") {
			const existingByGh = ghUrlMap.get(ghUrl);
			if (existingByGh) {
				const [keeper, loser] = pickKeeper(existingByGh, entry);
				dupOf.set(loser, { keeper, axis: "github_url" });
				continue;
			}
			ghUrlMap.set(ghUrl, entry);
		}
	}

	// Group duplicates by keeper
	const groups = new Map<
		CategorizedEntry,
		{ dups: CategorizedEntry[]; axis: "url" | "id" | "github_url" }
	>();
	for (const [loser, { keeper, axis }] of dupOf) {
		let group = groups.get(keeper);
		if (!group) {
			group = { dups: [], axis };
			groups.set(keeper, group);
		}
		group.dups.push(loser);
	}

	return Array.from(groups.entries()).map(([keeper, { dups, axis }]) => ({
		keeper,
		duplicates: dups,
		axis,
	}));
}

/**
 * Remove duplicate entries from the data store, keeping the highest-health entry.
 * Returns the number of entries removed.
 */
export function removeDuplicates(entries?: CategorizedEntry[]): number {
	const groups = findDuplicates(entries);
	let removed = 0;

	for (const group of groups) {
		for (const dup of group.duplicates) {
			deleteEntry(dup.category, dup.id);
			removed++;
		}
	}

	return removed;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Source authority ranking — higher = more authoritative. */
const SOURCE_PRIORITY: Record<string, number> = {
	manual: 100,
	"npm-search": 80,
	"youtube-search": 50,
	"github-search": 30,
	discord: 20,
};

function sourceRank(entry: CategorizedEntry): number {
	return SOURCE_PRIORITY[entry.source] ?? 0;
}

/**
 * Pick which of two duplicate entries to keep.
 *
 * Priority (first match wins):
 *   1. Source authority (npm > github, manual > all)
 *   2. Health score (higher wins)
 *   3. Description length (longer = more enriched)
 */
function pickKeeper(
	a: CategorizedEntry,
	b: CategorizedEntry,
): [keeper: CategorizedEntry, loser: CategorizedEntry] {
	// 1. Source authority — npm is canonical over github
	const rankA = sourceRank(a);
	const rankB = sourceRank(b);
	if (rankA !== rankB) {
		return rankA >= rankB ? [a, b] : [b, a];
	}

	// 2. Health score
	if (a.health.score !== b.health.score) {
		return a.health.score >= b.health.score ? [a, b] : [b, a];
	}

	// 3. Longer description (more enriched)
	return a.description.length >= b.description.length ? [a, b] : [b, a];
}
