/**
 * Tests for health dimension scorers and the generic combiner.
 *
 * Each source (npm, GitHub, YouTube) implements `scoreHealthDimensions` on the
 * Source interface. The generic combiner in `enrich/health.ts` applies the
 * weighted formula and hard rules.
 */

import "../core/temporal.ts";

import { describe, expect, test } from "bun:test";
import { type Entry, EntrySource, type HealthDimensions, HealthLevel } from "../core/types.ts";
import { createGitHubSource } from "../sources/github.ts";
import { createHackerNewsSource } from "../sources/hackernews.ts";
import { getHealthScorer } from "../sources/index.ts";
import { createNpmSource } from "../sources/npm.ts";
import { scoreFreshness, scoreMetric01 } from "../sources/scoring.ts";
import { computeHealth, scoreToLevel } from "./health.ts";

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Milliseconds per day — avoids temporal-polyfill "large units" limitation. */
const DAY_MS = 86_400_000;

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
		url: "https://www.npmjs.com/package/test-pkg",
		metadata,
	});
}

function makeGitHubEntry(metadata: Record<string, unknown>): Entry {
	return makeEntry({
		source: EntrySource.GitHubSearch,
		url: "https://github.com/owner/repo",
		metadata,
	});
}

function makeYouTubeEntry(metadata: Record<string, unknown>): Entry {
	return makeEntry({
		source: EntrySource.YouTubeSearch,
		url: "https://youtube.com/watch?v=test123",
		metadata,
	});
}

function makeHackerNewsEntry(metadata: Record<string, unknown>): Entry {
	return makeEntry({
		source: EntrySource.HackerNewsSearch,
		url: "https://news.ycombinator.com/item?id=12345",
		metadata,
	});
}

// Source instances (stateless scorers, no cache needed)
const npmSource = createNpmSource(null as never, { offline: true });
const githubSource = createGitHubSource(null as never, { offline: true });
// YouTube source may be null without API key; use registry scorer instead
const youtubeScorer = getHealthScorer(EntrySource.YouTubeSearch);
const hackerNewsSource = createHackerNewsSource(null as never, { offline: true });

// ─── scoreMetric01 ─────────────────────────────────────────────────────────────

describe("scoreMetric01", () => {
	test("returns 5 for null", () => {
		expect(scoreMetric01(null)).toBe(5);
	});

	test("returns 5 for undefined", () => {
		expect(scoreMetric01(undefined)).toBe(5);
	});

	test("maps 0–1 linearly to 0–100", () => {
		expect(scoreMetric01(1.0)).toBe(100);
		expect(scoreMetric01(0.5)).toBe(50);
		expect(scoreMetric01(0.0)).toBe(5); // floor of 5
	});

	test("floors at 5", () => {
		expect(scoreMetric01(0.001)).toBe(5);
	});
});

// ─── scoreFreshness ────────────────────────────────────────────────────────────

describe("scoreFreshness", () => {
	test("returns 5 for null date", () => {
		expect(scoreFreshness(null)).toBe(5);
	});

	test("returns 5 for undefined date", () => {
		expect(scoreFreshness(undefined)).toBe(5);
	});

	test("returns 100 for recent date", () => {
		const now = Temporal.Now.instant();
		const recent = now.subtract({ milliseconds: 60_000 }).toString();
		expect(scoreFreshness(recent)).toBe(100);
	});

	test("returns 5 for very old date (≥ 730 days)", () => {
		const now = Temporal.Now.instant();
		const old = now.subtract({ milliseconds: 800 * DAY_MS }).toString();
		expect(scoreFreshness(old)).toBe(5);
	});
});

// ─── npm scorer ────────────────────────────────────────────────────────────────

describe("npm scoreHealthDimensions", () => {
	test("scores minimal metadata with low defaults", () => {
		const entry = makeNpmEntry({});
		const dims = npmSource.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(5);
		expect(dims.popularity).toBe(5);
		expect(dims.activity).toBe(5);
		expect(dims.depth).toBe(5);
	});

	test("scores fresh popular package with high metrics", () => {
		const now = Temporal.Now.instant();
		const entry = makeNpmEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			npm_downloads_monthly: 50_000,
			npm_score_maintenance: 0.9,
			npm_score_quality: 0.8,
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(100);
		expect(dims.popularity).toBe(100);
		expect(dims.activity).toBe(90);
		expect(dims.depth).toBe(80);
	});

	test("scores stale unpopular package", () => {
		const now = Temporal.Now.instant();
		const entry = makeNpmEntry({
			published_at: now.subtract({ milliseconds: 400 * DAY_MS }).toString(),
			npm_downloads_monthly: 5,
			npm_score_maintenance: 0.1,
			npm_score_quality: 0.1,
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(20);
		expect(dims.popularity).toBe(5);
		expect(dims.activity).toBe(10);
		expect(dims.depth).toBe(10);
	});
});

// ─── GitHub scorer ─────────────────────────────────────────────────────────────

describe("GitHub scoreHealthDimensions", () => {
	test("scores minimal metadata with low defaults", () => {
		const entry = makeGitHubEntry({});
		const dims = githubSource.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(5);
		expect(dims.popularity).toBe(5);
		expect(dims.depth).toBe(10); // default for missing size
	});

	test("scores active popular repo with many stars", () => {
		const now = Temporal.Now.instant();
		const entry = makeGitHubEntry({
			pushed_at: now.subtract({ milliseconds: 5 * DAY_MS }).toString(),
			updated_at: now.subtract({ milliseconds: 5 * DAY_MS }).toString(),
			stars: 500,
			open_issues: 10,
			size: 5000,
		});
		const dims = githubSource.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(100);
		expect(dims.popularity).toBe(70);
		expect(dims.activity).toBe(100); // < 30 days + open issues
		expect(dims.depth).toBe(60);
	});

	test("scores stale repo with no activity", () => {
		const now = Temporal.Now.instant();
		const entry = makeGitHubEntry({
			pushed_at: now.subtract({ milliseconds: 400 * DAY_MS }).toString(),
			updated_at: now.subtract({ milliseconds: 400 * DAY_MS }).toString(),
			stars: 2,
			open_issues: 0,
			size: 50,
		});
		const dims = githubSource.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(20);
		expect(dims.popularity).toBe(20);
		expect(dims.activity).toBe(5);
		expect(dims.depth).toBe(10);
	});

	test("activity score 100 requires both recent update AND open issues", () => {
		const now = Temporal.Now.instant();
		// Recent but no issues → 60
		const noIssues = makeGitHubEntry({
			updated_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			open_issues: 0,
		});
		expect(githubSource.scoreHealthDimensions(noIssues).activity).toBe(60);

		// Recent with issues → 100
		const withIssues = makeGitHubEntry({
			updated_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			open_issues: 5,
		});
		expect(githubSource.scoreHealthDimensions(withIssues).activity).toBe(100);
	});
});

// ─── YouTube scorer ────────────────────────────────────────────────────────────

describe("YouTube scoreHealthDimensions", () => {
	test("scores minimal metadata with low defaults", () => {
		// YouTube source may be null without API key, but scorer should still work via registry
		const entry = makeYouTubeEntry({});
		const dims = youtubeScorer(entry);
		expect(dims.freshness).toBe(5);
		expect(dims.popularity).toBe(5);
		expect(dims.activity).toBe(5);
		expect(dims.depth).toBe(0); // videos have no depth
	});

	test("scores popular recent video with engagement", () => {
		const now = Temporal.Now.instant();
		const entry = makeYouTubeEntry({
			published_at: now.subtract({ milliseconds: 20 * DAY_MS }).toString(),
			views: 15_000,
			likes: 800,
			comments: 200,
		});
		const dims = youtubeScorer(entry);
		expect(dims.freshness).toBe(100);
		expect(dims.popularity).toBe(100);
		expect(dims.activity).toBe(100); // likes + comments = 1000
		expect(dims.depth).toBe(0);
	});

	test("scores old video with few views", () => {
		const now = Temporal.Now.instant();
		const entry = makeYouTubeEntry({
			published_at: now.subtract({ milliseconds: 400 * DAY_MS }).toString(),
			views: 50,
			likes: 2,
			comments: 3,
		});
		const dims = youtubeScorer(entry);
		expect(dims.freshness).toBe(20);
		expect(dims.popularity).toBe(10);
		expect(dims.activity).toBe(5); // likes + comments = 5
		expect(dims.depth).toBe(0);
	});
});

// ─── Hacker News scorer ──────────────────────────────────────────────────────

describe("Hacker News scoreHealthDimensions", () => {
	test("scores minimal metadata with low defaults", () => {
		const entry = makeHackerNewsEntry({});
		const dims = hackerNewsSource.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(5);
		expect(dims.popularity).toBe(5);
		expect(dims.activity).toBe(5);
		expect(dims.depth).toBe(5); // articles have no code depth
	});

	test("scores popular recent HN story with high engagement", () => {
		const now = Temporal.Now.instant();
		const entry = makeHackerNewsEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			points: 300,
			num_comments: 80,
		});
		const dims = hackerNewsSource.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(100);
		expect(dims.popularity).toBe(80); // 300 points → 80
		expect(dims.activity).toBe(70); // 80 comments → 70
		expect(dims.depth).toBe(5);
	});

	test("scores old HN story with few points", () => {
		const now = Temporal.Now.instant();
		const entry = makeHackerNewsEntry({
			published_at: now.subtract({ milliseconds: 400 * DAY_MS }).toString(),
			points: 3,
			num_comments: 1,
		});
		const dims = hackerNewsSource.scoreHealthDimensions(entry);
		expect(dims.freshness).toBe(20);
		expect(dims.popularity).toBe(20); // 3 points → 20
		expect(dims.activity).toBe(20); // 1 comment → 20
		expect(dims.depth).toBe(5);
	});
});

// ─── getHealthScorer registry ──────────────────────────────────────────────────

describe("getHealthScorer", () => {
	test("returns a scorer for NpmSearch", () => {
		const scorer = getHealthScorer(EntrySource.NpmSearch);
		const entry = makeNpmEntry({ npm_downloads_monthly: 50_000 });
		const dims = scorer(entry);
		expect(dims.popularity).toBe(100);
	});

	test("returns a scorer for GitHubSearch", () => {
		const scorer = getHealthScorer(EntrySource.GitHubSearch);
		const entry = makeGitHubEntry({ stars: 500 });
		const dims = scorer(entry);
		expect(dims.popularity).toBe(70);
	});

	test("returns a scorer for YouTubeSearch", () => {
		const scorer = getHealthScorer(EntrySource.YouTubeSearch);
		const entry = makeYouTubeEntry({ views: 15_000 });
		const dims = scorer(entry);
		expect(dims.popularity).toBe(100);
	});

	test("returns default scorer for unknown sources", () => {
		const scorer = getHealthScorer(EntrySource.Manual);
		const entry = makeEntry({ source: EntrySource.Manual });
		const dims = scorer(entry);
		expect(dims).toEqual({ freshness: 5, popularity: 5, activity: 5, depth: 5 });
	});

	test("returns a scorer for HackerNewsSearch", () => {
		const scorer = getHealthScorer(EntrySource.HackerNewsSearch);
		const now = Temporal.Now.instant();
		const entry = makeHackerNewsEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			points: 100,
		});
		const dims = scorer(entry);
		expect(dims.freshness).toBe(100);
		expect(dims.popularity).toBe(80);
	});
});

// ─── computeHealth (generic combiner) ──────────────────────────────────────────

describe("computeHealth", () => {
	test("archived entry → Dead (score 0) regardless of dimensions", () => {
		const entry = makeGitHubEntry({ archived: true });
		const dims: HealthDimensions = { freshness: 100, popularity: 100, activity: 100, depth: 100 };
		const health = computeHealth(entry, dims);
		expect(health.score).toBe(0);
		expect(health.level).toBe(HealthLevel.Dead);
	});

	test("YouTube entries are capped at Maintained (max 60)", () => {
		const now = Temporal.Now.instant();
		const entry = makeYouTubeEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
		});
		const dims: HealthDimensions = { freshness: 100, popularity: 100, activity: 100, depth: 0 };
		const health = computeHealth(entry, dims);
		expect(health.score).toBe(60);
		expect(health.level).toBe(HealthLevel.Maintained);
	});

	test("entries with no date metadata are capped at Stale (max 39)", () => {
		const entry = makeNpmEntry({}); // no published_at, pushed_at, or updated_at
		const dims: HealthDimensions = { freshness: 100, popularity: 100, activity: 100, depth: 100 };
		const health = computeHealth(entry, dims);
		expect(health.score).toBeLessThanOrEqual(39);
		expect(health.level).toBe(HealthLevel.Stale);
	});

	test("applies weighted formula correctly", () => {
		const now = Temporal.Now.instant();
		const entry = makeNpmEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
		});
		const dims: HealthDimensions = { freshness: 100, popularity: 70, activity: 50, depth: 30 };
		const health = computeHealth(entry, dims);
		const expected = Math.round(100 * 0.35 + 70 * 0.3 + 50 * 0.2 + 30 * 0.15); // = 69.5 → 70
		expect(health.score).toBe(expected);
	});

	test("clamps score to 0–100", () => {
		const now = Temporal.Now.instant();
		const entry = makeNpmEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
		});
		// All 0s → should give 0, not negative
		const dims: HealthDimensions = { freshness: 0, popularity: 0, activity: 0, depth: 0 };
		const health = computeHealth(entry, dims);
		expect(health.score).toBeGreaterThanOrEqual(0);
		expect(health.score).toBeLessThanOrEqual(100);
	});

	test("archived overrides YouTube cap", () => {
		const entry = makeYouTubeEntry({ archived: true });
		const dims: HealthDimensions = { freshness: 100, popularity: 100, activity: 100, depth: 0 };
		const health = computeHealth(entry, dims);
		expect(health.score).toBe(0);
		expect(health.level).toBe(HealthLevel.Dead);
	});

	test("Hacker News entries are capped at Maintained (max 60)", () => {
		const now = Temporal.Now.instant();
		const entry = makeHackerNewsEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
		});
		const dims: HealthDimensions = { freshness: 100, popularity: 100, activity: 100, depth: 100 };
		const health = computeHealth(entry, dims);
		expect(health.score).toBe(60);
		expect(health.level).toBe(HealthLevel.Maintained);
	});
});

// ─── scoreToLevel ──────────────────────────────────────────────────────────────

describe("scoreToLevel", () => {
	test("maps score ranges to correct levels", () => {
		expect(scoreToLevel(100)).toBe(HealthLevel.Active);
		expect(scoreToLevel(70)).toBe(HealthLevel.Active);
		expect(scoreToLevel(69)).toBe(HealthLevel.Maintained);
		expect(scoreToLevel(40)).toBe(HealthLevel.Maintained);
		expect(scoreToLevel(39)).toBe(HealthLevel.Stale);
		expect(scoreToLevel(15)).toBe(HealthLevel.Stale);
		expect(scoreToLevel(14)).toBe(HealthLevel.Dead);
		expect(scoreToLevel(0)).toBe(HealthLevel.Dead);
	});
});

// ─── End-to-end: source scorer → computeHealth ────────────────────────────────

describe("end-to-end health scoring", () => {
	test("healthy npm package → Active", () => {
		const now = Temporal.Now.instant();
		const entry = makeNpmEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			npm_downloads_monthly: 20_000,
			npm_score_maintenance: 0.95,
			npm_score_quality: 0.9,
		});
		const dims = npmSource.scoreHealthDimensions(entry);
		const health = computeHealth(entry, dims);
		expect(health.level).toBe(HealthLevel.Active);
		expect(health.score).toBeGreaterThanOrEqual(70);
	});

	test("stale GitHub repo → Stale", () => {
		const now = Temporal.Now.instant();
		const entry = makeGitHubEntry({
			pushed_at: now.subtract({ milliseconds: 400 * DAY_MS }).toString(),
			updated_at: now.subtract({ milliseconds: 400 * DAY_MS }).toString(),
			stars: 2,
			open_issues: 0,
			size: 50,
		});
		const dims = githubSource.scoreHealthDimensions(entry);
		const health = computeHealth(entry, dims);
		expect(health.level).toBe(HealthLevel.Stale);
	});

	test("popular YouTube video → Maintained (capped)", () => {
		const now = Temporal.Now.instant();
		const entry = makeYouTubeEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			views: 50_000,
			likes: 2000,
			comments: 500,
		});
		const dims = youtubeScorer(entry);
		const health = computeHealth(entry, dims);
		expect(health.level).toBe(HealthLevel.Maintained);
		expect(health.score).toBeLessThanOrEqual(60);
	});

	test("archived GitHub repo → Dead", () => {
		const now = Temporal.Now.instant();
		const entry = makeGitHubEntry({
			archived: true,
			pushed_at: now.subtract({ milliseconds: 5 * DAY_MS }).toString(),
			stars: 500,
			size: 5000,
		});
		const dims = githubSource.scoreHealthDimensions(entry);
		const health = computeHealth(entry, dims);
		expect(health.level).toBe(HealthLevel.Dead);
		expect(health.score).toBe(0);
	});

	test("popular Hacker News story → Maintained (capped)", () => {
		const now = Temporal.Now.instant();
		const entry = makeHackerNewsEntry({
			published_at: now.subtract({ milliseconds: 10 * DAY_MS }).toString(),
			points: 500,
			num_comments: 100,
		});
		const dims = hackerNewsSource.scoreHealthDimensions(entry);
		const health = computeHealth(entry, dims);
		expect(health.level).toBe(HealthLevel.Maintained);
		expect(health.score).toBeLessThanOrEqual(60);
	});
});
