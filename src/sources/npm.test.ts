/**
 * Tests for npm source — enrichment, formatPopularity, and scoreHealthDimensions.
 *
 * The enrichment tests mock the GitHub API responses via cache, so no real
 * network calls are made. The scoring tests verify that GitHub-enriched
 * metadata produces better health dimensions than npm-only metadata.
 */

import "../core/temporal.ts";

import { describe, expect, test } from "bun:test";
import {
	type CategorizedEntry,
	Category,
	type Entry,
	EntrySource,
	HealthLevel,
} from "../core/types.ts";
import { computeHealth } from "../enrich/health.ts";
import { createNpmSource } from "./npm.ts";

// ─── Helpers ───────────────────────────────────────────────────────────────────

const DAY_MS = 86_400_000;

function makeEntry(metadata: Record<string, unknown>): Entry {
	return {
		id: "test-pkg",
		name: "Test Pkg",
		url: "https://www.npmjs.com/package/test-pkg",
		source: EntrySource.NpmSearch,
		description: "A test package",
		metadata,
		health: { score: 0, level: HealthLevel.Stale },
	};
}

function makeCategorizedEntry(metadata: Record<string, unknown>): CategorizedEntry {
	return {
		...makeEntry(metadata),
		category: Category.Extension,
	};
}

/** Source instance (stateless scorer, no cache needed). */
const npmSource = createNpmSource(null as never, { offline: true });

// ─── formatPopularity ──────────────────────────────────────────────────────────

describe("npm formatPopularity", () => {
	test("shows downloads only when no stars", () => {
		const entry = makeCategorizedEntry({ npm_downloads_monthly: 5000 });
		expect(npmSource.formatPopularity(entry)).toBe("⬇ 5k/mo");
	});

	test("shows stars only when no downloads", () => {
		const entry = makeCategorizedEntry({ stars: 314 });
		expect(npmSource.formatPopularity(entry)).toBe("⭐314");
	});

	test("shows both downloads and stars when both present", () => {
		const entry = makeCategorizedEntry({ npm_downloads_monthly: 20_500, stars: 314 });
		expect(npmSource.formatPopularity(entry)).toBe("⬇ 20.5k/mo ⭐314");
	});

	test("returns empty string when neither present", () => {
		const entry = makeCategorizedEntry({});
		expect(npmSource.formatPopularity(entry)).toBe("");
	});

	test("returns empty string when downloads is 0", () => {
		const entry = makeCategorizedEntry({ npm_downloads_monthly: 0 });
		expect(npmSource.formatPopularity(entry)).toBe("");
	});

	test("returns empty string when stars is 0", () => {
		const entry = makeCategorizedEntry({ stars: 0 });
		expect(npmSource.formatPopularity(entry)).toBe("");
	});
});

// ─── scoreHealthDimensions — downloads only (no GitHub enrichment) ─────────────

describe("npm scoreHealthDimensions — npm-only (backwards compatible)", () => {
	test("minimal metadata produces low defaults", () => {
		const entry = makeEntry({});
		const dims = npmSource.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(5);
		expect(dims.popularity).toBe(5);
		expect(dims.activity).toBe(5);
		expect(dims.depth).toBe(5);
	});

	test("high downloads produce high popularity", () => {
		const entry = makeEntry({ npm_downloads_monthly: 50_000 });
		const dims = npmSource.scoreHealthDimensions(entry);
		expect(dims.popularity).toBe(100);
	});

	test("uses npm published_at for freshness when no github_pushed_at", () => {
		const now = Temporal.Now.instant();
		const entry = makeEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(100);
	});

	test("uses npm_score_maintenance for activity when no github_updated_at", () => {
		const entry = makeEntry({ npm_score_maintenance: 0.8 });
		const dims = npmSource.scoreHealthDimensions(entry);
		expect(dims.activity).toBe(80);
	});
});

// ─── scoreHealthDimensions — with GitHub enrichment ────────────────────────────

describe("npm scoreHealthDimensions — GitHub-enriched", () => {
	test("prefers github_pushed_at over published_at for freshness", () => {
		const now = Temporal.Now.instant();
		const entry = makeEntry({
			published_at: now.subtract({ milliseconds: 400 * DAY_MS }).toString(), // old npm publish
			github_pushed_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(), // recent commit
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(100); // Uses github_pushed_at
	});

	test("falls back to published_at when github_pushed_at is null", () => {
		const now = Temporal.Now.instant();
		const entry = makeEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			github_pushed_at: null,
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(100); // Falls back to published_at
	});

	test("blends downloads (60%) + stars (40%) for popularity", () => {
		// 50k downloads → dlScore=100, 500 stars → starScore=70
		// popularity = round(100*0.6 + 70*0.4) = round(88) = 88
		const entry = makeEntry({
			npm_downloads_monthly: 50_000,
			stars: 500,
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		expect(dims.popularity).toBe(88);
	});

	test("blends low downloads + high stars correctly", () => {
		// 5 downloads → dlScore=5, 2000 stars → starScore=100
		// popularity = round(5*0.6 + 100*0.4) = round(43) = 43
		const entry = makeEntry({
			npm_downloads_monthly: 5,
			stars: 2000,
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		expect(dims.popularity).toBe(43);
	});

	test("stars=0 still triggers blend (not null)", () => {
		// stars=0 → starScore=5, downloads=50k → dlScore=100
		// popularity = round(100*0.6 + 5*0.4) = round(62) = 62
		const entry = makeEntry({
			npm_downloads_monthly: 50_000,
			stars: 0,
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		expect(dims.popularity).toBe(62);
	});

	test("uses GitHub activity scoring when github_updated_at present", () => {
		const now = Temporal.Now.instant();
		const entry = makeEntry({
			github_updated_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			open_issues: 5,
			npm_score_maintenance: 0.1, // would give activity=10, but should be overridden
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		// scoreActivityDays with < 30 days + open issues → 100
		expect(dims.activity).toBe(100);
	});

	test("falls back to npm_score_maintenance when no github_updated_at", () => {
		const entry = makeEntry({
			npm_score_maintenance: 0.9,
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		expect(dims.activity).toBe(90);
	});
});

// ─── scoreHealthDimensions — end-to-end with computeHealth ─────────────────────

describe("npm health scoring — end-to-end with GitHub enrichment", () => {
	test("enriched npm entry scores Active", () => {
		const now = Temporal.Now.instant();
		const entry = makeEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			github_pushed_at: now.subtract({ milliseconds: 5 * DAY_MS }).toString(),
			npm_downloads_monthly: 20_000,
			stars: 500,
			github_updated_at: now.subtract({ milliseconds: 5 * DAY_MS }).toString(),
			open_issues: 10,
			npm_score_maintenance: 0.95,
			npm_score_quality: 0.9,
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		const health = computeHealth(entry, dims);
		expect(health.level).toBe(HealthLevel.Active);
		expect(health.score).toBeGreaterThanOrEqual(70);
	});

	test("enriched npm entry with archived GitHub repo → Dead", () => {
		const now = Temporal.Now.instant();
		const entry = makeEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			github_pushed_at: now.subtract({ milliseconds: 5 * DAY_MS }).toString(),
			npm_downloads_monthly: 20_000,
			stars: 500,
			archived: true,
			npm_score_maintenance: 0.95,
			npm_score_quality: 0.9,
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		const health = computeHealth(entry, dims);
		expect(health.level).toBe(HealthLevel.Dead);
		expect(health.score).toBe(0);
	});

	test("enriched entry has github_pushed_at as date signal (no stale cap)", () => {
		const now = Temporal.Now.instant();
		// No published_at, but has github_pushed_at → should not be capped at Stale
		const entry = makeEntry({
			github_pushed_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			npm_downloads_monthly: 20_000,
			stars: 500,
			github_updated_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			open_issues: 5,
			npm_score_quality: 0.9,
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		const health = computeHealth(entry, dims);
		// Should NOT be capped at 39 (stale cap) because github_pushed_at counts as a date
		expect(health.score).toBeGreaterThan(39);
	});
});
