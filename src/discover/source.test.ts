import "../core/temporal.ts";

import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { EntrySource } from "../core/types.ts";
import type { Source } from "../sources/source.ts";
import { runDiscovery, writeRaw } from "./runner.ts";
import { DiscoveryWriter } from "./writer.ts";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function makeWriter(): { writer: DiscoveryWriter; cleanup: () => void } {
	const dir = mkdtempSync(join(tmpdir(), "source-test-"));
	const writer = new DiscoveryWriter(dir);
	return { writer, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
}

function makeSource(name: string, urls: string[]): Source {
	return {
		name,
		source: EntrySource.NpmSearch,
		displayName: name,
		priority: 0,
		healthCap: 100,
		suggestedCategory: null,
		async discover(writer: DiscoveryWriter) {
			for (const url of urls) {
				writer.write(name, { url, source: EntrySource.NpmSearch });
			}
		},
		scoreHealthDimensions() {
			return { freshness: 5, popularity: 5, activity: 5, depth: 5 };
		},
		normalizeUrl: (url: string) => url,
		extractId: (url: string) => url.split("/").filter(Boolean).pop() ?? url,
		formatPopularity: () => "",
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

// ─── runDiscovery ──────────────────────────────────────────────────────────────

describe("runDiscovery", () => {
	let cleanup: () => void;

	afterEach(() => {
		cleanup?.();
	});

	it("runs multiple sources in parallel", async () => {
		const { writer, cleanup: c } = makeWriter();
		cleanup = c;

		const sources = [
			makeSource("npm", ["https://a.com/1", "https://a.com/2"]),
			makeSource("github", ["https://b.com/3"]),
		];

		const result = await runDiscovery(sources, writer);
		expect(result.total).toBe(3);
		expect(result.summary).toEqual({ npm: 2, github: 1 });
	});

	it("deduplicates across sources (same URL)", async () => {
		const { writer, cleanup: c } = makeWriter();
		cleanup = c;

		const sources = [
			makeSource("npm", ["https://shared.com/pkg"]),
			makeSource("github", ["https://shared.com/pkg"]),
		];

		const result = await runDiscovery(sources, writer);
		expect(result.total).toBe(1);
	});

	it("handles a source that throws gracefully", async () => {
		const { writer, cleanup: c } = makeWriter();
		cleanup = c;

		const badSource: Source = {
			name: "broken",
			source: EntrySource.NpmSearch,
			displayName: "broken",
			priority: 0,
			healthCap: 100,
			suggestedCategory: null,
			async discover() {
				throw new Error("API is down");
			},
			scoreHealthDimensions() {
				return { freshness: 5, popularity: 5, activity: 5, depth: 5 };
			},
			normalizeUrl: (url: string) => url,
			extractId: (url: string) => url.split("/").filter(Boolean).pop() ?? url,
			formatPopularity: () => "",
		};
		const goodSource = makeSource("npm", ["https://a.com/1"]);

		const result = await runDiscovery([badSource, goodSource], writer);
		expect(result.total).toBe(1); // good source still wrote
		expect(result.summary).toEqual({ npm: 1 });
	});

	it("handles empty source list", async () => {
		const { writer, cleanup: c } = makeWriter();
		cleanup = c;

		const result = await runDiscovery([], writer);
		expect(result.total).toBe(0);
		expect(result.summary).toEqual({});
	});

	it("handles source that produces no candidates", async () => {
		const { writer, cleanup: c } = makeWriter();
		cleanup = c;

		const emptySource = makeSource("npm", []);
		const result = await runDiscovery([emptySource], writer);
		expect(result.total).toBe(0);
	});
});

// ─── writeRaw ─────────────────────────────────────────────────────────────────

describe("writeRaw", () => {
	let writer: DiscoveryWriter;
	let cleanup: () => void;

	beforeEach(() => {
		const w = makeWriter();
		writer = w.writer;
		cleanup = w.cleanup;
		writer.init();
	});

	afterEach(() => {
		cleanup();
	});

	it("writes all results without filtering", () => {
		const results = [
			{
				url: "https://www.npmjs.com/package/pi-tool",
				id: "pi-tool",
				metadata: { description: "A pi tool" },
			},
			{
				url: "https://www.npmjs.com/package/pi-mcp",
				id: "pi-mcp",
				metadata: { description: "MCP for pi" },
			},
		];

		const { fetched, written } = writeRaw("npm", EntrySource.NpmSearch, results, writer);
		expect(fetched).toBe(2);
		expect(written).toBe(2);
	});

	it("writes all results including ones that would have been filtered", () => {
		const results = [
			{
				url: "https://www.npmjs.com/package/@stdlib/math",
				id: "@stdlib/math",
				metadata: { description: "Math" },
			},
			{
				url: "https://www.npmjs.com/package/pi-tool",
				id: "pi-tool",
				metadata: { description: "A pi tool" },
			},
		];

		const { fetched, written } = writeRaw("npm", EntrySource.NpmSearch, results, writer);
		expect(fetched).toBe(2);
		expect(written).toBe(2); // both written — no filtering at discover stage
	});

	it("preserves hint, id, and metadata from results", async () => {
		const results = [
			{
				url: "https://www.npmjs.com/package/pi-tool",
				id: "pi-tool",
				hint: "npm:pi-agent",
				metadata: { description: "A tool", stars: 10 },
			},
		];

		writeRaw("npm", EntrySource.NpmSearch, results, writer);
		await writer.flush();

		// Read back and verify
		const { loadDiscoveries } = await import("./writer.ts");
		const loaded = loadDiscoveries(writer);
		expect(loaded.discoveries[0]?.id).toBe("pi-tool");
		expect(loaded.discoveries[0]?.hint).toBe("npm:pi-agent");
		expect(loaded.discoveries[0]?.metadata).toEqual({ description: "A tool", stars: 10 });
	});

	it("returns zero counts for empty input", () => {
		const { fetched, written } = writeRaw("npm", EntrySource.NpmSearch, [], writer);
		expect(fetched).toBe(0);
		expect(written).toBe(0);
	});
});
