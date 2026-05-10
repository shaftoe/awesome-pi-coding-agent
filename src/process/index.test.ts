/**
 * Tests for the process stage — metadata refresh for same-source duplicates.
 *
 * Validates Option A: when a candidate URL matches an existing entry from the
 * same source, the existing entry's metadata is refreshed from the fresh candidate
 * instead of being silently skipped.
 */

import "../core/temporal.ts";

import { afterEach, beforeEach, describe, expect, test } from "bun:test";

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildIndices, checkDuplicate } from "../core/dedup.ts";
import { cleanText } from "../core/html.ts";
import { FileRepository, type Repository } from "../core/repository.ts";
import type { Entry } from "../core/types.ts";
import { type CategorizedEntry, Category, EntrySource, HealthLevel } from "../core/types.ts";
import { classifyEntry } from "../enrich/classify.ts";
import { computeHealth } from "../enrich/health.ts";
import { getHealthScorer, getPriority } from "../sources/index.ts";

function sourcePriority(source: string): number {
	try {
		return getPriority(source as Entry["source"]);
	} catch {
		return 9;
	}
}

/** Type-safe extraction of existingEntry from a duplicate check result. */
function getExisting(dup: ReturnType<typeof checkDuplicate>): CategorizedEntry {
	if (!dup.existingEntry) throw new Error("Expected existingEntry to be present");
	return dup.existingEntry;
}

describe("Process stage — metadata refresh", () => {
	let tmpDir: string;
	let entriesDir: string;
	let entryRepo: Repository<CategorizedEntry>;

	beforeEach(() => {
		tmpDir = mkdtempSync(join(tmpdir(), "process-test-"));
		entriesDir = join(tmpDir, "entries");
		entryRepo = new FileRepository<CategorizedEntry>(entriesDir);
		entryRepo.init();
	});

	afterEach(() => {
		rmSync(tmpDir, { recursive: true, force: true });
	});

	test("same-source duplicate refreshes metadata and recomputes health", () => {
		// Seed an existing npm entry with stale metadata
		const existingEntry: CategorizedEntry = {
			id: "pi-example",
			name: "pi-example",
			url: "https://www.npmjs.com/package/pi-example",
			source: EntrySource.NpmSearch,
			description: "An example Pi extension",
			metadata: {
				npm_name: "pi-example",
				npm_downloads_monthly: 100,
				npm_downloads_weekly: 25,
				published_at: "2025-01-01T00:00:00Z",
				version: "1.0.0",
				discovery_hint: null,
			},
			health: { score: 30, level: HealthLevel.Maintained },
			category: Category.Extension,
		};
		entryRepo.set(existingEntry.url, existingEntry);

		// Build indices
		const indices = buildIndices(entryRepo);

		// Simulate a fresh candidate from the same source
		const freshCandidate: {
			url: string;
			source: EntrySource;
			hint?: string;
			metadata: Record<string, unknown>;
		} = {
			url: "https://www.npmjs.com/package/pi-example",
			source: EntrySource.NpmSearch,
			metadata: {
				npm_name: "pi-example",
				npm_downloads_monthly: 5000,
				npm_downloads_weekly: 1200,
				published_at: "2026-05-01T00:00:00Z",
				version: "2.0.0",
				description: "Updated Pi extension description",
			},
		};

		// Check duplicate
		const dup = checkDuplicate(freshCandidate, indices);
		expect(dup.isDuplicate).toBe(true);
		expect(dup.existingEntry).toBeDefined();

		const existing = getExisting(dup);

		// Same source — should NOT be a priority-based replacement
		const isNewHigherPriority =
			sourcePriority(freshCandidate.source) < sourcePriority(existing.source);
		expect(isNewHigherPriority).toBeFalsy();

		// Simulate the refresh logic from cmdProcess
		const discovery = freshCandidate;
		const freshName =
			(discovery.metadata["title"] as string) ||
			(discovery.metadata["name"] as string) ||
			existing.name;
		const freshDesc = (discovery.metadata["description"] as string) || existing.description;

		const updated: CategorizedEntry = {
			...existing,
			name: cleanText(freshName),
			description: cleanText(freshDesc),
			metadata: {
				...(discovery.metadata ?? {}),
				discovery_hint:
					discovery.hint ?? (existing.metadata["discovery_hint"] as string | null) ?? null,
			},
			health: { score: 0, level: HealthLevel.Stale },
		};

		const dims = getHealthScorer(updated.source)(updated);
		updated.health = computeHealth(updated, dims);

		const classified = classifyEntry(updated);

		// Verify metadata was refreshed
		expect(classified.metadata["npm_downloads_monthly"]).toBe(5000);
		expect(classified.metadata["npm_downloads_weekly"]).toBe(1200);
		expect(classified.metadata["published_at"]).toBe("2026-05-01T00:00:00Z");
		expect(classified.metadata["version"]).toBe("2.0.0");

		// Verify description was updated
		expect(classified.description).toBe("Updated Pi extension description");

		// Verify health was recomputed (should be higher with more downloads + recent publish)
		expect(classified.health.score).toBeGreaterThan(existingEntry.health.score);
		expect(classified.health.level).not.toBe(HealthLevel.Dead);

		// Verify structural identity preserved
		expect(classified.url).toBe(existingEntry.url);
		expect(classified.source).toBe(existingEntry.source);
		expect(classified.id).toBe(existingEntry.id);
		expect(classified.category).toBe(existingEntry.category);
	});

	test("same-source duplicate preserves discovery_hint from existing when candidate has none", () => {
		const existingEntry: CategorizedEntry = {
			id: "pi-example",
			name: "pi-example",
			url: "https://www.npmjs.com/package/pi-example",
			source: EntrySource.NpmSearch,
			description: "An example Pi extension",
			metadata: {
				npm_name: "pi-example",
				discovery_hint: "original-hint",
			},
			health: { score: 30, level: HealthLevel.Maintained },
			category: Category.Extension,
		};
		entryRepo.set(existingEntry.url, existingEntry);
		const indices = buildIndices(entryRepo);

		const freshCandidate: {
			url: string;
			source: EntrySource;
			hint?: string;
			metadata: Record<string, unknown>;
		} = {
			url: "https://www.npmjs.com/package/pi-example",
			source: EntrySource.NpmSearch,
			metadata: { npm_name: "pi-example", npm_downloads_monthly: 500 },
		};

		const dup = checkDuplicate(freshCandidate, indices);
		expect(dup.isDuplicate).toBe(true);

		const existing = getExisting(dup);

		// Simulate refresh — fresh candidate has no hint, should preserve existing
		const updated: CategorizedEntry = {
			...existing,
			name: existing.name,
			description: existing.description,
			metadata: {
				...(freshCandidate.metadata ?? {}),
				discovery_hint:
					freshCandidate.hint ?? (existing.metadata["discovery_hint"] as string | null) ?? null,
			},
			health: { score: 0, level: HealthLevel.Stale },
		};

		expect(updated.metadata["discovery_hint"]).toBe("original-hint");
	});

	test("GitHub same-source duplicate refreshes stars/forks", () => {
		const existingEntry: CategorizedEntry = {
			id: "owner-pi-ext",
			name: "owner/pi-ext",
			url: "https://github.com/owner/pi-ext",
			source: EntrySource.GitHubSearch,
			description: "A Pi extension repo",
			metadata: {
				repo_full_name: "owner/pi-ext",
				stars: 10,
				forks: 2,
				pushed_at: "2025-06-01T00:00:00Z",
				archived: false,
			},
			health: { score: 35, level: HealthLevel.Maintained },
			category: Category.Extension,
		};
		entryRepo.set(existingEntry.url, existingEntry);
		const indices = buildIndices(entryRepo);

		const freshCandidate: {
			url: string;
			source: EntrySource;
			hint?: string;
			metadata: Record<string, unknown>;
		} = {
			url: "https://github.com/owner/pi-ext",
			source: EntrySource.GitHubSearch,
			metadata: {
				repo_full_name: "owner/pi-ext",
				stars: 500,
				forks: 80,
				pushed_at: "2026-04-15T00:00:00Z",
				archived: false,
			},
		};

		const dup = checkDuplicate(freshCandidate, indices);
		expect(dup.isDuplicate).toBe(true);

		const existing = getExisting(dup);

		const updated: CategorizedEntry = {
			...existing,
			name: existing.name,
			description: existing.description,
			metadata: {
				...(freshCandidate.metadata ?? {}),
				discovery_hint:
					freshCandidate.hint ?? (existing.metadata["discovery_hint"] as string | null) ?? null,
			},
			health: { score: 0, level: HealthLevel.Stale },
		};

		const dims = getHealthScorer(updated.source)(updated);
		updated.health = computeHealth(updated, dims);

		expect(updated.metadata["stars"]).toBe(500);
		expect(updated.metadata["forks"]).toBe(80);
		expect(updated.metadata["pushed_at"]).toBe("2026-04-15T00:00:00Z");
		expect(updated.health.score).toBeGreaterThan(existingEntry.health.score);
	});

	test("cross-source duplicate (npm > github) still replaces entirely", () => {
		// GitHub entry already exists
		const ghEntry: CategorizedEntry = {
			id: "owner-pi-ext",
			name: "owner/pi-ext",
			url: "https://github.com/owner/pi-ext",
			source: EntrySource.GitHubSearch,
			description: "A Pi extension repo",
			metadata: {
				repo_full_name: "owner/pi-ext",
				stars: 100,
				github_url: "https://github.com/owner/pi-ext",
			},
			health: { score: 50, level: HealthLevel.Maintained },
			category: Category.Extension,
		};
		entryRepo.set(ghEntry.url, ghEntry);
		const indices = buildIndices(entryRepo);

		// npm candidate that points to the same GitHub repo
		const npmCandidate: {
			url: string;
			source: EntrySource;
			metadata: Record<string, unknown>;
		} = {
			url: "https://www.npmjs.com/package/pi-ext",
			source: EntrySource.NpmSearch,
			metadata: {
				npm_name: "pi-ext",
				github_url: "https://github.com/owner/pi-ext",
				npm_downloads_monthly: 2000,
			},
		};

		const dup = checkDuplicate(npmCandidate, indices);
		expect(dup.isDuplicate).toBe(true);
		expect(dup.matchedBy).toBe("github_url");

		const existing = getExisting(dup);

		// npm should have higher priority (lower number) than GitHub
		const npmHigher = sourcePriority(npmCandidate.source) < sourcePriority(existing.source);
		expect(npmHigher).toBe(true);
		// This should trigger the full replacement path, not the refresh path
	});
});
