/**
 * Tests for README content analysis.
 * Covers category keyword detection and score calculation.
 */
import { describe, expect, it } from "bun:test";
import type { Entry } from "../lib/types.ts";
import { analyzeReadme, hasReadmeScores } from "./readme.ts";

// ─── analyzeReadme ─────────────────────────────────────────────────────────────

describe("analyzeReadme", () => {
	it("returns 0 scores for empty README", () => {
		const scores = analyzeReadme("");
		for (const score of Object.values(scores)) {
			expect(score).toBe(0);
		}
	});

	it("detects extension keywords", () => {
		const scores = analyzeReadme("This is an extension for hooks and custom tool registration.");
		expect(scores["extension"]).toBeGreaterThan(0);
	});

	it("detects SKILL.md for skill category", () => {
		const scores = analyzeReadme("See SKILL.md for documentation.");
		expect(scores["skill"]).toBeGreaterThan(0);
	});

	it("detects CLI for tool category", () => {
		const scores = analyzeReadme("A CLI utility for managing your dashboard.");
		expect(scores["tool"]).toBeGreaterThan(0);
	});

	it("detects theme keywords", () => {
		const scores = analyzeReadme("A beautiful theme with a custom color scheme.");
		expect(scores["theme"]).toBeGreaterThan(0);
	});

	it("detects provider keywords", () => {
		const scores = analyzeReadme("An LLM provider and model registry adapter.");
		expect(scores["provider"]).toBeGreaterThan(0);
	});

	it("is case-insensitive", () => {
		const lower = analyzeReadme("extension");
		const upper = analyzeReadme("Extension");
		const mixed = analyzeReadme("EXTENSION");
		expect(lower["extension"]).toBe(upper["extension"]);
		expect(lower["extension"]).toBe(mixed["extension"]);
	});

	it("counts multiple occurrences", () => {
		const scores = analyzeReadme("extension extension extension");
		expect(scores["extension"]).toBe(3);
	});

	it("returns scores for all known categories", () => {
		const scores = analyzeReadme("some random text");
		const expectedCategories = ["extension", "skill", "tool", "theme", "provider"];
		for (const cat of expectedCategories) {
			expect(scores).toHaveProperty(cat);
			expect(typeof scores[cat]).toBe("number");
		}
	});
});

// ─── hasReadmeScores ───────────────────────────────────────────────────────────

describe("hasReadmeScores", () => {
	it("returns false for entry without _readme_category_scores", () => {
		const entry: Entry = {
			id: "test",
			name: "test",
			url: "https://github.com/foo/bar",
			source: "github-search",
			description: "",
			metadata: {},
			health: { score: 50, level: "maintained" },
		};
		expect(hasReadmeScores(entry)).toBe(false);
	});

	it("returns false for entry with null _readme_category_scores", () => {
		const entry: Entry = {
			id: "test",
			name: "test",
			url: "https://github.com/foo/bar",
			source: "github-search",
			description: "",
			metadata: { _readme_category_scores: null },
			health: { score: 50, level: "maintained" },
		};
		expect(hasReadmeScores(entry)).toBe(false);
	});

	it("returns true for entry with populated _readme_category_scores", () => {
		const entry: Entry = {
			id: "test",
			name: "test",
			url: "https://github.com/foo/bar",
			source: "github-search",
			description: "",
			metadata: { _readme_category_scores: { extension: 3 } },
			health: { score: 50, level: "maintained" },
		};
		expect(hasReadmeScores(entry)).toBe(true);
	});

	it("returns true even for empty _readme_category_scores object", () => {
		const entry: Entry = {
			id: "test",
			name: "test",
			url: "https://github.com/foo/bar",
			source: "github-search",
			description: "",
			metadata: { _readme_category_scores: {} },
			health: { score: 50, level: "maintained" },
		};
		// Empty object is still a valid enrichment marker
		expect(hasReadmeScores(entry)).toBe(true);
	});
});
