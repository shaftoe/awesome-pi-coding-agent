/**
 * Tests for the process stage — metadata refresh for same-source duplicates.
 *
 * Validates: when a candidate URL matches an existing entry from the
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
import type { DiscoveryCandidate, Entry } from "../core/types.ts";
import { type CategorizedEntry, Category, EntrySource } from "../core/types.ts";
import { classifyEntry } from "../enrich/classify.ts";
import { getPriority } from "../sources/index.ts";
import { resolveDuplicateAction } from "./duplicate-action.ts";

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

	test("same-source duplicate refreshes metadata", () => {
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
		};

		const classified = classifyEntry(updated);

		// Verify metadata was refreshed
		expect(classified.metadata["npm_downloads_monthly"]).toBe(5000);
		expect(classified.metadata["npm_downloads_weekly"]).toBe(1200);
		expect(classified.metadata["published_at"]).toBe("2026-05-01T00:00:00Z");
		expect(classified.metadata["version"]).toBe("2.0.0");

		// Verify description was updated
		expect(classified.description).toBe("Updated Pi extension description");

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
		};

		expect(updated.metadata["stars"]).toBe(500);
		expect(updated.metadata["forks"]).toBe(80);
		expect(updated.metadata["pushed_at"]).toBe("2026-04-15T00:00:00Z");
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

describe("Process stage — monorepo packages sharing a repository (#303)", () => {
	const REPO_URL = "https://github.com/example/monorepo";

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

	function npmEntry(id: string, metadata: Record<string, unknown> = {}): CategorizedEntry {
		return {
			id,
			name: id,
			url: `https://www.npmjs.com/package/${id}`,
			source: EntrySource.NpmSearch,
			description: `The ${id} package`,
			metadata: { npm_name: id, github_url: REPO_URL, ...metadata },
			category: Category.Extension,
		};
	}

	function npmCandidate(id: string, metadata: Record<string, unknown> = {}): DiscoveryCandidate {
		return {
			url: `https://www.npmjs.com/package/${id}`,
			source: EntrySource.NpmSearch,
			metadata: { npm_name: id, github_url: REPO_URL, ...metadata },
		};
	}

	test("distinct npm packages of one monorepo are not duplicates", () => {
		const packageA = npmEntry("@example/package-a");
		entryRepo.set(packageA.url, packageA);
		const indices = buildIndices(entryRepo);

		const dup = checkDuplicate(npmCandidate("@example/package-b"), indices);
		expect(dup.isDuplicate).toBe(false);
	});

	test("the same npm package still dedupes by URL", () => {
		const packageA = npmEntry("@example/package-a");
		entryRepo.set(packageA.url, packageA);
		const indices = buildIndices(entryRepo);

		const dup = checkDuplicate(npmCandidate("@example/package-a"), indices);
		expect(dup.isDuplicate).toBe(true);
		expect(dup.matchedBy).toBe("url");
		expect(getExisting(dup).id).toBe("@example/package-a");
	});

	test("sibling packages remain addable after earlier siblings join the indices", () => {
		const packageA = npmEntry("@example/package-a");
		entryRepo.set(packageA.url, packageA);
		const indices = buildIndices(entryRepo);

		// First sibling: not a duplicate, so the process loop adds it as a new entry
		expect(checkDuplicate(npmCandidate("@example/package-b"), indices).isDuplicate).toBe(false);

		// Simulate the index updates made by addNewEntry for package-b
		const packageB = npmEntry("@example/package-b");
		indices.byUrl.set(packageB.url, packageB);
		indices.byGitHubUrl.set(REPO_URL, packageB);

		// Second sibling must still be addable despite byGitHubUrl now pointing at package-b
		expect(checkDuplicate(npmCandidate("@example/package-c"), indices).isDuplicate).toBe(false);
	});

	test("cross-source dedup via repository is preserved: a repo already represented by an npm package skips the GitHub candidate", () => {
		const packageA = npmEntry("@example/package-a");
		entryRepo.set(packageA.url, packageA);
		const indices = buildIndices(entryRepo);

		const githubCandidate: DiscoveryCandidate = {
			url: REPO_URL,
			source: EntrySource.GitHubSearch,
			metadata: { github_url: REPO_URL, repo_full_name: "example/monorepo" },
		};

		const dup = checkDuplicate(githubCandidate, indices);
		expect(dup.isDuplicate).toBe(true);
		expect(dup.matchedBy).toBe("github_url");
		expect(resolveDuplicateAction(githubCandidate, { existingEntry: getExisting(dup) })).toBe(
			"skip",
		);
	});

	test("#303 mislabeled entry: sibling added as new, stale identity corrected when its own package is rediscovered", () => {
		// Seed the mismatched entry from the issue: identity of one package,
		// metadata of its sibling.
		const stale = npmEntry("@example/context-include", { npm_name: "@example/pi-access-denied" });
		entryRepo.set(stale.url, stale);
		const indices = buildIndices(entryRepo);

		// The mislabeled sibling is no longer swallowed — it gets its own entry
		const accessDenied = checkDuplicate(npmCandidate("@example/pi-access-denied"), indices);
		expect(accessDenied.isDuplicate).toBe(false);

		// The stale identity matches by URL and refreshes from the real candidate,
		// correcting the overwritten metadata (works only while the entry's own
		// package still exists on npm — see the phantom-entry test below)
		const contextInclude = checkDuplicate(npmCandidate("@example/context-include"), indices);
		expect(contextInclude.isDuplicate).toBe(true);
		expect(contextInclude.matchedBy).toBe("url");
		const existing = getExisting(contextInclude);
		expect(existing.id).toBe("@example/context-include");
		expect(
			resolveDuplicateAction(npmCandidate("@example/context-include"), { existingEntry: existing }),
		).toBe("refresh");
	});

	test("#303 phantom entry: an entry whose package no longer exists is left untouched instead of absorbing siblings", () => {
		// The stored #303 entry references a package that no longer exists on
		// npm, so no candidate ever matches it by URL. It must not absorb
		// sibling metadata either — the stale file needs one-off data cleanup.
		const phantom = npmEntry("@example/renamed-away", { npm_name: "@example/pi-access-denied" });
		entryRepo.set(phantom.url, phantom);
		const indices = buildIndices(entryRepo);

		// Siblings sharing the repository are added as their own entries…
		expect(checkDuplicate(npmCandidate("@example/pi-access-denied"), indices).isDuplicate).toBe(
			false,
		);
		expect(checkDuplicate(npmCandidate("@example/context-include"), indices).isDuplicate).toBe(
			false,
		);

		// …while the phantom itself is neither refreshed nor replaced by them;
		// only a candidate for its own URL would still refresh it.
		const ownPackage = checkDuplicate(npmCandidate("@example/renamed-away"), indices);
		expect(ownPackage.isDuplicate).toBe(true);
		expect(ownPackage.matchedBy).toBe("url");
	});
});
