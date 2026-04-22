/**
 * Tests for the rule-based category classifier.
 * Covers keyword matching, YouTube detection, README scores, and defaults.
 */
import { describe, expect, it } from "bun:test";
import type { Entry } from "../lib/types.ts";
import { classify, classifyEntry } from "./classify.ts";

// ─── Helper ────────────────────────────────────────────────────────────────────

function makeEntry(overrides: Partial<Entry> & { url: string; id?: string }): Entry {
	return {
		id: overrides.id ?? "test-entry",
		name: overrides.name ?? "test-entry",
		url: overrides.url,
		source: overrides.source ?? "npm-search",
		description: overrides.description ?? "",
		metadata: overrides.metadata ?? {},
		health: overrides.health ?? { score: 50, level: "maintained" },
	};
}

// ─── YouTube detection ─────────────────────────────────────────────────────────

describe("classify — YouTube URLs", () => {
	it("classifies youtube.com URLs as video", () => {
		const entry = makeEntry({ url: "https://www.youtube.com/watch?v=abc123" });
		expect(classify(entry)).toBe("video");
	});

	it("classifies youtu.be URLs as video", () => {
		const entry = makeEntry({ url: "https://youtu.be/abc123" });
		expect(classify(entry)).toBe("video");
	});

	it("classifies YouTube URL even if description contains 'extension'", () => {
		const entry = makeEntry({
			url: "https://www.youtube.com/watch?v=abc123",
			description: "How to build a pi extension",
		});
		expect(classify(entry)).toBe("video");
	});
});

// ─── README category scores ──────────────────────────────────────────────────

describe("classify — README category scores", () => {
	it("uses highest README score when multiple categories score > 0", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			metadata: { _readme_category_scores: { tool: 5, theme: 2, extension: 1 } },
		});
		expect(classify(entry)).toBe("tool");
	});

	it("ignores skill scores (skill category removed)", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			description: "A theme for pi",
			metadata: { _readme_category_scores: { skill: 10, theme: 2 } },
		});
		// skill is excluded, so theme (next highest) wins
		expect(classify(entry)).toBe("theme");
	});

	it("falls through to keyword matching when only skill score > 0", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			description: "An extension for pi",
			metadata: { _readme_category_scores: { skill: 5 } },
		});
		// skill is excluded, no other scores, falls to keyword matching
		expect(classify(entry)).toBe("extension");
	});
});

// ─── Keyword matching ──────────────────────────────────────────────────────────

describe("classify — name/description keyword matching", () => {
	it("classifies as theme when 'theme' in description", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			description: "A beautiful theme for pi",
		});
		expect(classify(entry)).toBe("theme");
	});

	it("classifies as theme when 'rose-pine' in name", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			name: "rose-pine-pi",
		});
		expect(classify(entry)).toBe("theme");
	});

	it("classifies as provider when 'provider' in name", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			name: "pi-openai-provider",
		});
		expect(classify(entry)).toBe("provider");
	});

	it("classifies as provider when 'model registry' in description", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			description: "A model registry for pi",
		});
		expect(classify(entry)).toBe("provider");
	});

	it("classifies as template when 'template' in description", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			description: "A project template for pi skills",
		});
		expect(classify(entry)).toBe("template");
	});
});

// ─── Keyword matching — extension / tool (lower priority) ──────────────────────

describe("classify — extension and tool fallback keywords", () => {
	it("classifies as extension when 'extension' in description (after theme/provider/template)", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			description: "An extension for pi",
		});
		expect(classify(entry)).toBe("extension");
	});

	it("classifies as extension when 'hook' in description", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			description: "A hook for pi",
		});
		expect(classify(entry)).toBe("extension");
	});

	it("classifies as tool when 'tool' in description", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			description: "A tool for pi",
		});
		expect(classify(entry)).toBe("tool");
	});

	it("classifies as tool when 'cli' in description", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			description: "A CLI for pi",
		});
		expect(classify(entry)).toBe("tool");
	});

	it("classifies as tool when 'dashboard' in description", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			description: "A dashboard for pi",
		});
		expect(classify(entry)).toBe("tool");
	});
});

// ─── Default fallback ──────────────────────────────────────────────────────────

describe("classify — default fallback", () => {
	it("defaults to 'tool' for ambiguous GitHub repos", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/bar",
			description: "Something cool",
		});
		expect(classify(entry)).toBe("tool");
	});

	it("defaults to 'tool' when no keywords match and no README scores", () => {
		const entry = makeEntry({
			url: "https://github.com/foo/my-project",
			name: "my-project",
			description: "A project",
		});
		expect(classify(entry)).toBe("tool");
	});
});

// ─── classifyEntry wrapper ─────────────────────────────────────────────────────

describe("classifyEntry", () => {
	it("returns CategorizedEntry with category attached", () => {
		const entry = makeEntry({
			url: "https://www.youtube.com/watch?v=xyz",
		});
		const result = classifyEntry(entry);
		expect(result.category).toBe("video");
		expect(result.id).toBe(entry.id);
		expect(result.url).toBe(entry.url);
	});
});
