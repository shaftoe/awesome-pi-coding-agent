/**
 * Tests for the health scoring algorithm.
 * Covers GitHub health, YouTube health, thresholds, and edge cases.
 */
import { describe, expect, it } from "bun:test";
import type { CategorizedEntry } from "../lib/types.ts";
import { calculateHealth } from "./health.ts";

// ─── Helper ────────────────────────────────────────────────────────────────────

function makeGitHubEntry(overrides: {
	stars?: number;
	lastCommit?: string; // ISO date string
	isArchived?: boolean;
	isFork?: boolean;
	description?: string;
}): CategorizedEntry {
	return {
		id: "test-entry",
		name: "Test Entry",
		url: "https://github.com/foo/bar",
		source: "github-search",
		description: overrides.description ?? "",
		category: "extension",
		metadata: {
			stars: overrides.stars ?? 0,
			last_commit: overrides.lastCommit ?? new Date().toISOString(),
			is_archived: overrides.isArchived ?? false,
			is_fork: overrides.isFork ?? false,
		},
		health: { score: 0, level: "stale" },
	};
}

function makeYouTubeEntry(overrides: {
	viewCount?: number;
	likeCount?: number;
	publishedAt?: string;
}): CategorizedEntry {
	return {
		id: "YT_test123",
		name: "Test Video",
		url: "https://www.youtube.com/watch?v=test123",
		source: "youtube-search",
		description: "",
		category: "video",
		metadata: {
			view_count: overrides.viewCount ?? 0,
			like_count: overrides.likeCount ?? 0,
			published_at: overrides.publishedAt ?? new Date().toISOString(),
		},
		health: { score: 0, level: "stale" },
	};
}

// ─── Health level thresholds ───────────────────────────────────────────────────

describe("calculateHealth — health level thresholds", () => {
	it("returns 'active' for score >= 70", () => {
		// Fresh repo with 200 stars: 50 + min(200/10,20)=20 + 20(fresh) = 90
		const entry = makeGitHubEntry({
			stars: 200,
			lastCommit: new Date().toISOString(),
		});
		const health = calculateHealth(entry);
		expect(health.score).toBeGreaterThanOrEqual(70);
		expect(health.level).toBe("active");
	});

	it("returns 'maintained' for score 40-69", () => {
		// Repo with 0 stars, 60 days old: 50 + 0 + 10 = 60
		const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();
		const entry = makeGitHubEntry({
			stars: 0,
			lastCommit: sixtyDaysAgo,
		});
		const health = calculateHealth(entry);
		expect(health.score).toBeGreaterThanOrEqual(40);
		expect(health.score).toBeLessThan(70);
		expect(health.level).toBe("maintained");
	});

	it("returns 'stale' for score 15-39", () => {
		// Fork with no stars, no recent: 50 - 30 = 20
		const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString();
		const entry = makeGitHubEntry({
			stars: 0,
			lastCommit: sixMonthsAgo,
			isFork: true,
		});
		const health = calculateHealth(entry);
		expect(health.score).toBeGreaterThanOrEqual(15);
		expect(health.score).toBeLessThan(40);
		expect(health.level).toBe("stale");
	});

	it("returns 'dead' for score < 15", () => {
		// Archived fork with old commit: 50 - 50(archived) - 30(fork) - 20(old) = -50 → clamped to 0
		const fourHundredDaysAgo = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString();
		const entry = makeGitHubEntry({
			stars: 0,
			lastCommit: fourHundredDaysAgo,
			isArchived: true,
			isFork: true,
		});
		const health = calculateHealth(entry);
		expect(health.score).toBeLessThan(15);
		expect(health.level).toBe("dead");
	});
});

// ─── GitHub health — star bonuses ──────────────────────────────────────────────

describe("calculateHealth — GitHub star scoring", () => {
	it("adds up to 20 points for stars (capped at 200)", () => {
		const freshDate = new Date().toISOString();
		const noStars = makeGitHubEntry({ stars: 0, lastCommit: freshDate });
		const hundredStars = makeGitHubEntry({ stars: 100, lastCommit: freshDate });
		const twoHundredStars = makeGitHubEntry({ stars: 200, lastCommit: freshDate });
		const thousandStars = makeGitHubEntry({ stars: 1000, lastCommit: freshDate });

		const h0 = calculateHealth(noStars);
		const h100 = calculateHealth(hundredStars);
		const h200 = calculateHealth(twoHundredStars);
		const h1000 = calculateHealth(thousandStars);

		// 100 stars = +10 points
		expect(h100.score - h0.score).toBe(10);
		// 200 stars = +20 points (cap)
		expect(h200.score - h0.score).toBe(20);
		// 1000 stars also = +20 points (capped)
		expect(h1000.score).toBe(h200.score);
	});
});

// ─── GitHub health — recency scoring ───────────────────────────────────────────

describe("calculateHealth — GitHub recency scoring", () => {
	it("adds 20 for commits within 30 days", () => {
		const fresh = new Date().toISOString();
		const entry = makeGitHubEntry({ lastCommit: fresh });
		const health = calculateHealth(entry);
		// 50 (base) + 0 (stars) + 20 (fresh) = 70
		expect(health.score).toBe(70);
	});

	it("adds 10 for commits within 90 days", () => {
		const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();
		const entry = makeGitHubEntry({ lastCommit: sixtyDaysAgo });
		const health = calculateHealth(entry);
		// 50 (base) + 0 (stars) + 10 (60d) = 60
		expect(health.score).toBe(60);
	});

	it("subtracts 20 for commits older than 365 days", () => {
		const fourHundredDaysAgo = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString();
		const entry = makeGitHubEntry({ lastCommit: fourHundredDaysAgo });
		const health = calculateHealth(entry);
		// 50 (base) + 0 (stars) - 20 (old) = 30
		expect(health.score).toBe(30);
	});
});

// ─── GitHub health — penalties ─────────────────────────────────────────────────

describe("calculateHealth — GitHub penalties", () => {
	it("subtracts 50 for archived repos", () => {
		const fresh = new Date().toISOString();
		const normal = makeGitHubEntry({ lastCommit: fresh, isArchived: false });
		const archived = makeGitHubEntry({ lastCommit: fresh, isArchived: true });
		expect(calculateHealth(normal).score - calculateHealth(archived).score).toBe(50);
	});

	it("subtracts 30 for forks", () => {
		const fresh = new Date().toISOString();
		const normal = makeGitHubEntry({ lastCommit: fresh, isFork: false });
		const fork = makeGitHubEntry({ lastCommit: fresh, isFork: true });
		expect(calculateHealth(normal).score - calculateHealth(fork).score).toBe(30);
	});
});

// ─── Score clamping ────────────────────────────────────────────────────────────

describe("calculateHealth — score clamping", () => {
	it("clamps score to 0 minimum", () => {
		const fourHundredDaysAgo = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString();
		const entry = makeGitHubEntry({
			stars: 0,
			lastCommit: fourHundredDaysAgo,
			isArchived: true,
			isFork: true,
		});
		const health = calculateHealth(entry);
		expect(health.score).toBeGreaterThanOrEqual(0);
	});

	it("clamps score to 100 maximum", () => {
		const fresh = new Date().toISOString();
		const entry = makeGitHubEntry({
			stars: 5000,
			lastCommit: fresh,
		});
		const health = calculateHealth(entry);
		expect(health.score).toBeLessThanOrEqual(100);
	});
});

// ─── YouTube health ────────────────────────────────────────────────────────────

describe("calculateHealth — YouTube entries", () => {
	it("uses YouTube health for video category", () => {
		const entry = makeYouTubeEntry({
			viewCount: 10000,
			likeCount: 500,
			publishedAt: new Date().toISOString(),
		});
		const health = calculateHealth(entry);
		expect(health.score).toBeGreaterThan(0);
		// 50 + min(10000/500, 20)=20 + min(500/50, 15)=10 + 15(fresh) = 95
		expect(health.score).toBe(95);
		expect(health.level).toBe("active");
	});

	it("gives higher scores to videos with more views", () => {
		const lowViews = makeYouTubeEntry({ viewCount: 100 });
		const highViews = makeYouTubeEntry({ viewCount: 5000 });
		expect(calculateHealth(highViews).score).toBeGreaterThan(calculateHealth(lowViews).score);
	});

	it("gives higher scores to videos with more likes", () => {
		const lowLikes = makeYouTubeEntry({ likeCount: 5 });
		const highLikes = makeYouTubeEntry({ likeCount: 200 });
		expect(calculateHealth(highLikes).score).toBeGreaterThan(calculateHealth(lowLikes).score);
	});

	it("penalizes old videos (older than 365 days)", () => {
		const fresh = new Date().toISOString();
		const twoYearsAgo = new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toISOString();
		const freshEntry = makeYouTubeEntry({ publishedAt: fresh });
		const oldEntry = makeYouTubeEntry({ publishedAt: twoYearsAgo });
		expect(calculateHealth(freshEntry).score).toBeGreaterThan(calculateHealth(oldEntry).score);
	});

	it("clamps YouTube score to 0-100", () => {
		const entry = makeYouTubeEntry({ viewCount: 0, likeCount: 0 });
		const health = calculateHealth(entry);
		expect(health.score).toBeGreaterThanOrEqual(0);
		expect(health.score).toBeLessThanOrEqual(100);
	});
});

// ─── Missing metadata ──────────────────────────────────────────────────────────

describe("calculateHealth — missing/undefined metadata", () => {
	it("handles missing last_commit gracefully (treated as neutral)", () => {
		const entry = makeGitHubEntry({ stars: 0 });
		// Remove last_commit from metadata
		const meta = entry.metadata as Record<string, unknown>;
		delete meta["last_commit"];
		const health = calculateHealth(entry);
		// 50 (base) + 0 (stars) + 0 (no date) = 50
		expect(health.score).toBe(50);
		expect(health.level).toBe("maintained");
	});

	it("handles missing published_at for YouTube gracefully", () => {
		const entry = makeYouTubeEntry({ viewCount: 0, likeCount: 0 });
		const meta = entry.metadata as Record<string, unknown>;
		delete meta["published_at"];
		const health = calculateHealth(entry);
		expect(health.score).toBe(50); // base only
	});
});
