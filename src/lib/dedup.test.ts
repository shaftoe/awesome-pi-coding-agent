/**
 * Tests for the dedup utility — duplicate detection and removal.
 * Covers index building, candidate checking, duplicate group detection,
 * and removal logic.
 */
import { describe, expect, it } from "bun:test";
import { buildIndices, checkDuplicate, type DedupIndices, findDuplicates } from "./dedup.ts";
import type { CategorizedEntry } from "./types.ts";

// ─── Fixtures ──────────────────────────────────────────────────────────────────

function makeEntry(
	overrides: Partial<CategorizedEntry> & { id: string; url: string },
): CategorizedEntry {
	return {
		name: overrides.id,
		source: "npm-search",
		description: "test entry",
		metadata: {},
		health: { score: 50, level: "maintained" },
		category: "tool",
		...overrides,
	};
}

// ─── buildIndices ──────────────────────────────────────────────────────────────

describe("buildIndices", () => {
	it("indexes entries by URL", () => {
		// buildIndices reads from the real data store; we test the contract
		// by checking the returned maps have the right shape
		const indices = buildIndices();
		expect(indices.byUrl).toBeInstanceOf(Map);
		expect(indices.byId).toBeInstanceOf(Map);
		expect(indices.byGitHubUrl).toBeInstanceOf(Map);
	});
});

// ─── checkDuplicate ────────────────────────────────────────────────────────────

describe("checkDuplicate", () => {
	const existing = makeEntry({
		id: "my-package",
		url: "https://www.npmjs.com/package/my-package",
		metadata: { github_url: "https://github.com/user/my-package" },
	});

	const indices: DedupIndices = {
		byUrl: new Map([[existing.url, existing]]),
		byId: new Map([[existing.id, existing]]),
		byGitHubUrl: new Map([["https://github.com/user/my-package", existing]]),
	};

	it("detects duplicate by URL", () => {
		const result = checkDuplicate(
			{ url: "https://www.npmjs.com/package/my-package", id: "other-id" },
			indices,
		);
		expect(result.isDuplicate).toBe(true);
		expect(result.axis).toBe("url");
		expect(result.existing?.id).toBe("my-package");
	});

	it("detects duplicate by ID", () => {
		const result = checkDuplicate(
			{ url: "https://other-url.example.com/pkg", id: "my-package" },
			indices,
		);
		expect(result.isDuplicate).toBe(true);
		expect(result.axis).toBe("id");
	});

	it("detects duplicate by GitHub URL for github-search source", () => {
		const result = checkDuplicate(
			{
				url: "https://github.com/user/my-package",
				source: "github-search",
			},
			indices,
		);
		expect(result.isDuplicate).toBe(true);
		expect(result.axis).toBe("github_url");
	});

	it("does not match GitHub URL for non-github-search sources", () => {
		const result = checkDuplicate(
			{
				url: "https://github.com/user/my-package",
				source: "npm-search",
			},
			indices,
		);
		expect(result.isDuplicate).toBe(false);
	});

	it("returns no match for a new candidate", () => {
		const result = checkDuplicate(
			{ url: "https://www.npmjs.com/package/new-pkg", id: "new-pkg" },
			indices,
		);
		expect(result.isDuplicate).toBe(false);
		expect(result.axis).toBeNull();
		expect(result.existing).toBeNull();
	});
});

// ─── findDuplicates ────────────────────────────────────────────────────────────

describe("findDuplicates", () => {
	it("returns empty array when no duplicates exist", () => {
		const entries = [
			makeEntry({ id: "pkg-a", url: "https://example.com/a" }),
			makeEntry({ id: "pkg-b", url: "https://example.com/b" }),
		];
		const groups = findDuplicates(entries);
		expect(groups).toHaveLength(0);
	});

	it("detects URL duplicates and keeps higher health entry", () => {
		const entries = [
			makeEntry({
				id: "pkg-a",
				url: "https://example.com/pkg",
				health: { score: 80, level: "active" },
			}),
			makeEntry({
				id: "pkg-b",
				url: "https://example.com/pkg",
				health: { score: 30, level: "stale" },
			}),
		];
		const groups = findDuplicates(entries);
		expect(groups).toHaveLength(1);
		const group = groups[0];
		expect(group).toBeDefined();
		expect(group?.keeper.id).toBe("pkg-a");
		expect(group?.duplicates).toHaveLength(1);
		expect(group?.duplicates[0]?.id).toBe("pkg-b");
		expect(group?.axis).toBe("url");
	});

	it("detects ID duplicates", () => {
		const entries = [
			makeEntry({
				id: "same-id",
				url: "https://example.com/one",
				health: { score: 10, level: "dead" },
			}),
			makeEntry({
				id: "same-id",
				url: "https://example.com/two",
				health: { score: 90, level: "active" },
			}),
		];
		const groups = findDuplicates(entries);
		expect(groups).toHaveLength(1);
		const group = groups[0];
		expect(group).toBeDefined();
		expect(group?.keeper.id).toBe("same-id");
		expect(group?.keeper.health.score).toBe(90);
		expect(group?.duplicates[0]?.health.score).toBe(10);
		expect(group?.axis).toBe("id");
	});

	it("detects GitHub URL duplicates", () => {
		const entries = [
			makeEntry({
				id: "npm-pkg",
				url: "https://www.npmjs.com/package/pkg",
				metadata: { github_url: "https://github.com/user/repo" },
			}),
			makeEntry({
				id: "gh-repo",
				url: "https://github.com/user/repo",
				metadata: { github_url: "https://github.com/user/repo" },
			}),
		];
		const groups = findDuplicates(entries);
		expect(groups.length).toBeGreaterThanOrEqual(1);
		// Should have found at least one duplicate group (URL or github_url collision)
		const allDups = groups.flatMap((g) => g.duplicates);
		expect(allDups.length).toBeGreaterThanOrEqual(1);
	});

	it("prefers npm source over github source regardless of health score", () => {
		const entries = [
			makeEntry({
				id: "gh-pkg",
				url: "https://example.com/pkg",
				source: "github-search",
				health: { score: 90, level: "active" },
			}),
			makeEntry({
				id: "npm-pkg",
				url: "https://example.com/pkg",
				source: "npm-search",
				health: { score: 30, level: "stale" },
			}),
		];
		const groups = findDuplicates(entries);
		expect(groups).toHaveLength(1);
		expect(groups[0]?.keeper.id).toBe("npm-pkg");
		expect(groups[0]?.keeper.source).toBe("npm-search");
		expect(groups[0]?.duplicates[0]?.id).toBe("gh-pkg");
	});

	it("prefers manual source over npm source", () => {
		const entries = [
			makeEntry({
				id: "npm-pkg",
				url: "https://example.com/pkg",
				source: "npm-search",
				health: { score: 100, level: "active" },
			}),
			makeEntry({
				id: "manual-pkg",
				url: "https://example.com/pkg",
				source: "manual",
				health: { score: 0, level: "dead" },
			}),
		];
		const groups = findDuplicates(entries);
		expect(groups[0]?.keeper.id).toBe("manual-pkg");
		expect(groups[0]?.keeper.source).toBe("manual");
	});

	it("falls back to health score when sources are equal", () => {
		const entries = [
			makeEntry({
				id: "pkg-a",
				url: "https://example.com/pkg",
				source: "npm-search",
				health: { score: 20, level: "stale" },
			}),
			makeEntry({
				id: "pkg-b",
				url: "https://example.com/pkg",
				source: "npm-search",
				health: { score: 70, level: "active" },
			}),
		];
		const groups = findDuplicates(entries);
		expect(groups[0]?.keeper.id).toBe("pkg-b");
		expect(groups[0]?.keeper.health.score).toBe(70);
	});

	it("breaks ties by description length", () => {
		const entries = [
			makeEntry({
				id: "pkg-a",
				url: "https://example.com/pkg",
				description: "short",
				health: { score: 50, level: "maintained" },
			}),
			makeEntry({
				id: "pkg-b",
				url: "https://example.com/pkg",
				description: "a much longer description with more metadata",
				health: { score: 50, level: "maintained" },
			}),
		];
		const groups = findDuplicates(entries);
		expect(groups[0]?.keeper.id).toBe("pkg-b");
	});

	it("handles entries without github_url gracefully", () => {
		const entries = [
			makeEntry({ id: "pkg-a", url: "https://example.com/a", metadata: {} }),
			makeEntry({ id: "pkg-b", url: "https://example.com/b", metadata: {} }),
		];
		const groups = findDuplicates(entries);
		expect(groups).toHaveLength(0);
	});

	// ── Source authority regression tests ─────────────────────────────────────

	it("npm wins over youtube regardless of health", () => {
		const entries = [
			makeEntry({
				id: "yt-pkg",
				url: "https://example.com/pkg",
				source: "youtube-search",
				health: { score: 100, level: "active" },
			}),
			makeEntry({
				id: "npm-pkg",
				url: "https://example.com/pkg",
				source: "npm-search",
				health: { score: 10, level: "dead" },
			}),
		];
		const groups = findDuplicates(entries);
		expect(groups[0]?.keeper.id).toBe("npm-pkg");
		expect(groups[0]?.duplicates[0]?.id).toBe("yt-pkg");
	});

	it("npm wins over github even with massive health disparity", () => {
		const entries = [
			makeEntry({
				id: "gh-star",
				url: "https://example.com/pkg",
				source: "github-search",
				health: { score: 100, level: "active" },
			}),
			makeEntry({
				id: "npm-dead",
				url: "https://example.com/pkg",
				source: "npm-search",
				health: { score: 0, level: "dead" },
			}),
		];
		const groups = findDuplicates(entries);
		expect(groups[0]?.keeper.id).toBe("npm-dead");
		expect(groups[0]?.keeper.source).toBe("npm-search");
	});

	it("youtube wins over github when health is equal", () => {
		const entries = [
			makeEntry({
				id: "gh-pkg",
				url: "https://example.com/pkg",
				source: "github-search",
				health: { score: 50, level: "maintained" },
			}),
			makeEntry({
				id: "yt-pkg",
				url: "https://example.com/pkg",
				source: "youtube-search",
				health: { score: 50, level: "maintained" },
			}),
		];
		const groups = findDuplicates(entries);
		expect(groups[0]?.keeper.id).toBe("yt-pkg");
		expect(groups[0]?.keeper.source).toBe("youtube-search");
	});

	it("manual wins over everything", () => {
		const entries = [
			makeEntry({
				id: "manual",
				url: "https://example.com/pkg",
				source: "manual",
				health: { score: 0, level: "dead" },
			}),
			makeEntry({
				id: "npm",
				url: "https://example.com/pkg",
				source: "npm-search",
				health: { score: 100, level: "active" },
			}),
			makeEntry({
				id: "gh",
				url: "https://example.com/pkg",
				source: "github-search",
				health: { score: 100, level: "active" },
			}),
		];
		const groups = findDuplicates(entries);
		expect(groups).toHaveLength(1);
		expect(groups[0]?.keeper.id).toBe("manual");
		expect(groups[0]?.duplicates).toHaveLength(2);
	});

	it("cross-source github_url collision keeps npm over github", () => {
		// Real-world scenario: npm entry has metadata.github_url pointing to
		// the same repo that a github-search entry was discovered from
		const entries = [
			makeEntry({
				id: "gh-repo",
				url: "https://github.com/user/repo",
				source: "github-search",
				metadata: { github_url: "https://github.com/user/repo" },
				health: { score: 80, level: "active" },
			}),
			makeEntry({
				id: "npm-pkg",
				url: "https://www.npmjs.com/package/@user/pkg",
				source: "npm-search",
				metadata: { github_url: "https://github.com/user/repo" },
				health: { score: 40, level: "maintained" },
			}),
		];
		const groups = findDuplicates(entries);
		const keeper = groups[0]?.keeper;
		expect(keeper?.id).toBe("npm-pkg");
		expect(keeper?.source).toBe("npm-search");
	});

	it("github_url collision among same-source entries uses health score", () => {
		// Multiple npm packages published from the same monorepo
		const entries = [
			makeEntry({
				id: "@scope/pkg-a",
				url: "https://www.npmjs.com/package/@scope/pkg-a",
				source: "npm-search",
				metadata: { github_url: "https://github.com/scope/monorepo" },
				health: { score: 30, level: "stale" },
			}),
			makeEntry({
				id: "@scope/pkg-b",
				url: "https://www.npmjs.com/package/@scope/pkg-b",
				source: "npm-search",
				metadata: { github_url: "https://github.com/scope/monorepo" },
				health: { score: 70, level: "active" },
			}),
		];
		const groups = findDuplicates(entries);
		expect(groups[0]?.keeper.id).toBe("@scope/pkg-b");
		expect(groups[0]?.duplicates[0]?.id).toBe("@scope/pkg-a");
	});

	it("unknown source treated as lowest priority", () => {
		const entries = [
			makeEntry({
				id: "unknown-src",
				url: "https://example.com/pkg",
				health: { score: 100, level: "active" },
			}),
			makeEntry({
				id: "github-src",
				url: "https://example.com/pkg",
				source: "github-search",
				health: { score: 0, level: "dead" },
			}),
		];
		// Simulate unknown source (e.g. data from older pipeline)
		const first = entries[0];
		if (first) Object.assign(first, { source: "unknown" });
		const groups = findDuplicates(entries);
		expect(groups[0]?.keeper.source).toBe("github-search");
	});
});
