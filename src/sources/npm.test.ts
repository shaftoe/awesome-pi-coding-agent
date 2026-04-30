/**
 * Tests for the npm source — enrichment, formatPopularity, and scoreHealthDimensions.
 */

import "../core/temporal.ts";

import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Cache } from "../core/cache.ts";
import { type CategorizedEntry, type Entry, EntrySource, HealthLevel } from "../core/types.ts";
import { DiscoveryWriter } from "../discover/writer.ts";
import { computeHealth } from "../enrich/health.ts";
import { createNpmSource } from "./npm.ts";

// ─── Helpers ───────────────────────────────────────────────────────────────────

const DAY_MS = 86_400_000;

function makeTempDir(): string {
	return mkdtempSync(join(tmpdir(), "npm-test-"));
}

function makeEntry(overrides: Partial<Entry> & { source: EntrySource }): Entry {
	return {
		id: "test-entry",
		name: "Test Entry",
		url: "https://example.com/test",
		description: "A test entry",
		metadata: {},
		health: { score: 0, level: HealthLevel.Stale },
		...overrides,
	};
}

function makeNpmEntry(metadata: Record<string, unknown>): Entry {
	return makeEntry({
		source: EntrySource.NpmSearch,
		url: "https://www.npmjs.com/package/pi-test-pkg",
		metadata,
	});
}

/** Create a minimal CategorizedEntry for formatPopularity tests. */
function makeCategorizedEntry(metadata: Record<string, unknown>): CategorizedEntry {
	return {
		id: "pi-test-pkg",
		name: "pi-test-pkg",
		url: "https://www.npmjs.com/package/pi-test-pkg",
		source: EntrySource.NpmSearch,
		description: "Test package",
		category: "extension" as CategorizedEntry["category"],
		metadata,
		health: { score: 80, level: HealthLevel.Active },
	};
}

// Mock the blacklist so tests don't touch the real file
mock.module("../core/blacklist.ts", () => ({
	isBlacklisted: (_url: string) => false,
	addToBlacklist: (_url: string, _reason: string, _opts?: Record<string, unknown>) => true,
	loadBlacklist: () => ({ entries: [], urlSet: new Set() }),
	saveBlacklist: () => {},
	invalidateBlacklistCache: () => {},
}));

// ─── formatPopularity ──────────────────────────────────────────────────────────

describe("npm formatPopularity", () => {
	const source = createNpmSource(null as never, { offline: true });

	it("shows downloads only when no stars", () => {
		const entry = makeCategorizedEntry({ npm_downloads_monthly: 5000 });
		expect(source.formatPopularity(entry)).toBe("⬇ 5k/mo");
	});

	it("shows downloads and stars when both available", () => {
		const entry = makeCategorizedEntry({ npm_downloads_monthly: 20_000, stars: 314 });
		const result = source.formatPopularity(entry);
		expect(result).toContain("⬇ 20k/mo");
		expect(result).toContain("⭐314");
	});

	it("shows stars only when no downloads", () => {
		const entry = makeCategorizedEntry({ stars: 42 });
		const result = source.formatPopularity(entry);
		expect(result).toBe("⭐42");
	});

	it("returns empty string when no metrics", () => {
		const entry = makeCategorizedEntry({});
		expect(source.formatPopularity(entry)).toBe("");
	});

	it("ignores zero values", () => {
		const entry = makeCategorizedEntry({ npm_downloads_monthly: 0, stars: 0 });
		expect(source.formatPopularity(entry)).toBe("");
	});
});

// ─── scoreHealthDimensions with enriched GitHub data ───────────────────────────

describe("npm scoreHealthDimensions with GitHub enrichment", () => {
	const source = createNpmSource(null as never, { offline: true });

	it("prefers github_pushed_at over npm published_at for freshness", () => {
		const now = Temporal.Now.instant();
		const entry = makeNpmEntry({
			published_at: now.subtract({ milliseconds: 400 * DAY_MS }).toString(), // old npm publish
			github_pushed_at: now.subtract({ milliseconds: 5 * DAY_MS }).toString(), // recent commit
		});

		const dims = source.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(100); // Uses the recent github_pushed_at
	});

	it("falls back to npm published_at when no github_pushed_at", () => {
		const now = Temporal.Now.instant();
		const entry = makeNpmEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
		});

		const dims = source.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(100);
	});

	it("blends downloads and stars for popularity when stars available", () => {
		const entry = makeNpmEntry({
			npm_downloads_monthly: 10_000, // score 100
			stars: 100, // score 70
		});

		const dims = source.scoreHealthDimensions(entry);
		// 100 * 0.6 + 70 * 0.4 = 60 + 28 = 88
		expect(dims.popularity).toBe(88);
	});

	it("uses downloads-only popularity when no star data", () => {
		const entry = makeNpmEntry({
			npm_downloads_monthly: 10_000,
		});

		const dims = source.scoreHealthDimensions(entry);
		expect(dims.popularity).toBe(100);
	});

	it("uses GitHub activity signals when available", () => {
		const now = Temporal.Now.instant();
		const entry = makeNpmEntry({
			github_updated_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			open_issues: 5,
			npm_score_maintenance: 0.1, // Low npm score, should be overridden
		});

		const dims = source.scoreHealthDimensions(entry);
		expect(dims.activity).toBe(100); // GitHub activity with recent update + open issues
	});

	it("falls back to npm maintenance score without GitHub data", () => {
		const entry = makeNpmEntry({
			npm_score_maintenance: 0.9,
		});

		const dims = source.scoreHealthDimensions(entry);
		expect(dims.activity).toBe(90);
	});
});

// ─── enrich() method ───────────────────────────────────────────────────────────

describe("npm enrich with GitHub data", () => {
	let tempDir: string;
	let cacheDir: string;
	let cleanup: () => void;

	beforeEach(() => {
		tempDir = makeTempDir();
		cacheDir = makeTempDir();
		cleanup = () => {
			rmSync(tempDir, { recursive: true, force: true });
			rmSync(cacheDir, { recursive: true, force: true });
		};
	});

	afterEach(() => {
		cleanup();
	});

	it("enriches NPM candidates with cached GitHub repo data", async () => {
		const writer = new DiscoveryWriter(tempDir);
		writer.init(true);

		// Write an NPM candidate with a GitHub URL
		const candidateMetadata = {
			npm_name: "pi-test-pkg",
			description: "A test package",
			keywords: ["pi-package"],
			version: "1.0.0",
			published_at: Temporal.Now.instant()
				.subtract({ milliseconds: 10 * DAY_MS })
				.toString(),
			npm_downloads_monthly: 5000,
			npm_score_maintenance: 0.8,
			npm_score_quality: 0.7,
			github_url: "https://github.com/owner/repo",
		};
		writer.write("npm", {
			url: "https://www.npmjs.com/package/pi-test-pkg",
			source: EntrySource.NpmSearch,
			hint: "npm:pi-package",
			id: "pi-test-pkg",
			metadata: candidateMetadata,
		});
		await writer.flush();

		// Pre-seed the cache with a GitHub API response
		const cache = new Cache({ dir: cacheDir });
		const githubResponse = {
			full_name: "owner/repo",
			description: "Test repo",
			stargazers_count: 314,
			forks_count: 42,
			open_issues_count: 10,
			topics: ["pi-agent", "mcp"],
			language: "TypeScript",
			archived: false,
			created_at: "2024-01-01T00:00:00Z",
			pushed_at: Temporal.Now.instant()
				.subtract({ milliseconds: 5 * DAY_MS })
				.toString(),
			updated_at: Temporal.Now.instant()
				.subtract({ milliseconds: 3 * DAY_MS })
				.toString(),
			size: 5000,
			license: { key: "mit", name: "MIT License", spdx_id: "MIT" },
		};
		cache.set("enrich:github:owner/repo", githubResponse);

		// Create source and run enrichment
		const source = createNpmSource(cache, { offline: true });
		await source.enrich?.(writer);
		await writer.flush();

		// Read back and verify enriched metadata
		const lines = writer.listByDiscoverer("npm");
		expect(lines.length).toBe(1);

		const meta = lines[0]?.discovery.metadata ?? {};
		expect(meta["stars"]).toBe(314);
		expect(meta["forks"]).toBe(42);
		expect(meta["open_issues"]).toBe(10);
		expect(meta["topics"]).toEqual(["pi-agent", "mcp"]);
		expect(meta["language"]).toBe("TypeScript");
		expect(meta["archived"]).toBe(false);
		expect(meta["github_pushed_at"]).toBe(githubResponse.pushed_at);
		expect(meta["github_updated_at"]).toBe(githubResponse.updated_at);
		expect(meta["license"]).toBe("MIT");

		// Original NPM metadata should be preserved
		expect(meta["npm_name"]).toBe("pi-test-pkg");
		expect(meta["npm_downloads_monthly"]).toBe(5000);
	});

	it("handles candidates without github_url gracefully", async () => {
		const writer = new DiscoveryWriter(tempDir);
		writer.init(true);

		// Write an NPM candidate WITHOUT a GitHub URL
		writer.write("npm", {
			url: "https://www.npmjs.com/package/pi-no-github",
			source: EntrySource.NpmSearch,
			hint: "npm:pi-package",
			id: "pi-no-github",
			metadata: {
				npm_name: "pi-no-github",
				github_url: null,
			},
		});
		await writer.flush();

		const cache = new Cache({ dir: cacheDir });
		const source = createNpmSource(cache, { offline: true });
		await source.enrich?.(writer);

		// Candidate should be unchanged
		const lines = writer.listByDiscoverer("npm");
		expect(lines.length).toBe(1);
		expect(lines[0]?.discovery.metadata?.["stars"]).toBeUndefined();
	});

	it("skips enrichment when no NPM candidates exist", async () => {
		const writer = new DiscoveryWriter(tempDir);
		writer.init(true);

		const cache = new Cache({ dir: cacheDir });
		const source = createNpmSource(cache, { offline: true });
		// Should not throw
		await source.enrich?.(writer);
	});

	it("deduplicates GitHub repos (multiple packages pointing to same repo)", async () => {
		const writer = new DiscoveryWriter(tempDir);
		writer.init(true);

		const sharedRepo = "https://github.com/owner/shared-lib";

		// Two NPM packages pointing to the same GitHub repo
		for (const name of ["pi-pkg-a", "pi-pkg-b"]) {
			writer.write("npm", {
				url: `https://www.npmjs.com/package/${name}`,
				source: EntrySource.NpmSearch,
				hint: "npm:pi-package",
				id: name,
				metadata: {
					npm_name: name,
					github_url: sharedRepo,
				},
			});
		}
		await writer.flush();

		// Pre-seed cache
		const cache = new Cache({ dir: cacheDir });
		cache.set("enrich:github:owner/shared-lib", {
			full_name: "owner/shared-lib",
			stargazers_count: 100,
			forks_count: 20,
			open_issues_count: 5,
			topics: [],
			language: "TypeScript",
			archived: false,
			created_at: "2024-01-01T00:00:00Z",
			pushed_at: null,
			updated_at: "2024-06-01T00:00:00Z",
			size: 1000,
			license: null,
		});

		const source = createNpmSource(cache, { offline: true });
		await source.enrich?.(writer);
		await writer.flush();

		const lines = writer.listByDiscoverer("npm");
		expect(lines.length).toBe(2);

		// Both should have the same GitHub stars
		for (const line of lines) {
			expect(line.discovery.metadata?.["stars"]).toBe(100);
			expect(line.discovery.metadata?.["forks"]).toBe(20);
		}
	});

	it("continues when a GitHub API call fails (offline, no cache)", async () => {
		const writer = new DiscoveryWriter(tempDir);
		writer.init(true);

		writer.write("npm", {
			url: "https://www.npmjs.com/package/pi-test",
			source: EntrySource.NpmSearch,
			hint: "npm:pi-package",
			id: "pi-test",
			metadata: {
				npm_name: "pi-test",
				github_url: "https://github.com/owner/not-cached",
			},
		});
		await writer.flush();

		// Cache exists but has no entry for this repo, and offline=true
		const cache = new Cache({ dir: cacheDir });
		const source = createNpmSource(cache, { offline: true });
		await source.enrich?.(writer);

		// Candidate should still exist, just not enriched
		const lines = writer.listByDiscoverer("npm");
		expect(lines.length).toBe(1);
		expect(lines[0]?.discovery.metadata?.["stars"]).toBeUndefined();
	});
});

// ─── End-to-end: enriched NPM entry → health scoring ──────────────────────────

describe("end-to-end: enriched NPM entry health", () => {
	const source = createNpmSource(null as never, { offline: true });

	it("enriched NPM entry scores higher than non-enriched", () => {
		const now = Temporal.Now.instant();

		// Non-enriched: stale npm publish, moderate downloads, low maintenance
		const nonEnriched = makeNpmEntry({
			published_at: now.subtract({ milliseconds: 200 * DAY_MS }).toString(),
			npm_downloads_monthly: 500,
			npm_score_maintenance: 0.3,
			npm_score_quality: 0.5,
		});

		// Enriched: same npm data but with GitHub stars and recent commits
		const enriched = makeNpmEntry({
			published_at: now.subtract({ milliseconds: 200 * DAY_MS }).toString(),
			npm_downloads_monthly: 500,
			npm_score_maintenance: 0.3,
			npm_score_quality: 0.5,
			// GitHub enrichment data
			stars: 200,
			forks: 30,
			open_issues: 8,
			github_pushed_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			github_updated_at: now.subtract({ milliseconds: 5 * DAY_MS }).toString(),
		});

		const nonEnrichedDims = source.scoreHealthDimensions(nonEnriched);
		const enrichedDims = source.scoreHealthDimensions(enriched);

		const nonEnrichedHealth = computeHealth(nonEnriched, nonEnrichedDims);
		const enrichedHealth = computeHealth(enriched, enrichedDims);

		expect(enrichedHealth.score).toBeGreaterThan(nonEnrichedHealth.score);
	});
});
