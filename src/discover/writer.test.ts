import "../core/temporal.ts";

import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { type DiscoveryCandidate, EntrySource } from "../core/types.ts";
import { DiscoveryWriter, loadDiscoveries } from "./writer.ts";

function makeDir(): { dir: string; cleanup: () => void } {
	const dir = mkdtempSync(join(tmpdir(), "writer-test-"));
	return { dir, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
}

function candidate(url: string, overrides: Partial<DiscoveryCandidate> = {}): DiscoveryCandidate {
	return { url, source: EntrySource.NpmSearch, ...overrides };
}

describe("DiscoveryWriter", () => {
	let dir: string;
	let cleanup: () => void;

	beforeEach(() => {
		({ dir, cleanup } = makeDir());
	});

	afterEach(() => {
		cleanup();
	});

	it("creates storage on init", () => {
		const writer = new DiscoveryWriter(dir);
		writer.init();
		expect(existsSync(dir)).toBe(true);
	});

	it("writes a candidate and returns true", async () => {
		const writer = new DiscoveryWriter(dir);
		writer.init();

		const written = writer.write("npm", candidate("https://example.com/a"));
		expect(written).toBe(true);

		await writer.flush();
		expect(writer.totalSeen).toBe(1);

		// Verify it's in the repository
		const entry = writer.repository.get("https://example.com/a");
		expect(entry).not.toBeNull();
		expect(entry?.discoverer).toBe("npm");
		expect(entry?.discovery.url).toBe("https://example.com/a");
	});

	it("deduplicates by URL and returns false", async () => {
		const writer = new DiscoveryWriter(dir);
		writer.init();

		expect(writer.write("npm", candidate("https://example.com/a"))).toBe(true);
		expect(writer.write("npm", candidate("https://example.com/a"))).toBe(false);
		expect(writer.write("github", candidate("https://example.com/a"))).toBe(false);

		await writer.flush();
		expect(writer.totalWritten).toBe(1);
	});

	it("tracks per-source counts in getSummary()", async () => {
		const writer = new DiscoveryWriter(dir);
		writer.init();

		writer.write("npm", candidate("https://example.com/a"));
		writer.write("npm", candidate("https://example.com/b"));
		writer.write("github", candidate("https://example.com/c"));

		await writer.flush();
		const summary = writer.getSummary();
		expect(summary).toEqual({ npm: 2, github: 1 });
	});

	it("reports totalWritten correctly", async () => {
		const writer = new DiscoveryWriter(dir);
		writer.init();

		writer.write("npm", candidate("https://example.com/a"));
		writer.write("npm", candidate("https://example.com/b"));
		writer.write("npm", candidate("https://example.com/a")); // dup

		await writer.flush();
		expect(writer.totalWritten).toBe(2);
	});

	it("handles concurrent writes", async () => {
		const writer = new DiscoveryWriter(dir);
		writer.init();

		// Write many discoveries
		for (let i = 0; i < 50; i++) {
			writer.write("npm", candidate(`https://example.com/item-${i}`));
		}
		await writer.flush();

		expect(writer.totalWritten).toBe(50);
		expect(writer.totalSeen).toBe(50);
	});

	it("seeds state from existing entries (crash recovery)", async () => {
		// First writer creates entries
		const writer1 = new DiscoveryWriter(dir);
		writer1.init();
		writer1.write("npm", candidate("https://example.com/existing"));
		await writer1.flush();

		// Second writer should see the existing URL
		const writer2 = new DiscoveryWriter(dir);
		writer2.init();
		const written = writer2.write("npm", candidate("https://example.com/existing"));
		expect(written).toBe(false);
	});

	it("preserves all candidate fields", async () => {
		const writer = new DiscoveryWriter(dir);
		writer.init();

		const c: DiscoveryCandidate = {
			url: "https://www.npmjs.com/package/pi-mcp",
			source: EntrySource.NpmSearch,
			hint: "npm:pi-mcp",
			id: "pi-mcp",
			metadata: { description: "MCP tools for Pi", stars: 42 },
		};
		writer.write("npm", c);
		await writer.flush();

		const entry = writer.repository.get("https://www.npmjs.com/package/pi-mcp");
		expect(entry?.discovery).toEqual(c);
	});

	it("init is idempotent", () => {
		const writer = new DiscoveryWriter(dir);
		writer.init();
		writer.write("npm", candidate("https://example.com/a"));

		// Second init should not wipe data
		writer.init();
		expect(writer.totalWritten).toBe(1);
	});
});

describe("loadDiscoveries", () => {
	let dir: string;
	let cleanup: () => void;

	beforeEach(() => {
		({ dir, cleanup } = makeDir());
	});

	afterEach(() => {
		cleanup();
	});

	it("loads candidates from a writer", async () => {
		const writer = new DiscoveryWriter(dir);
		writer.init();
		writer.write("npm", candidate("https://example.com/a", { id: "pkg-a", hint: "test" }));
		writer.write("github", candidate("https://example.com/b"));
		await writer.flush();

		const loaded = loadDiscoveries(writer);
		expect(loaded.discoveries.length).toBe(2);

		// Order not guaranteed (filesystem-dependent) — check by URL
		const urls = loaded.discoveries.map((c) => c.url);
		expect(urls).toContain("https://example.com/a");
		expect(urls).toContain("https://example.com/b");

		// Check the specific npm discovery has its fields
		const npmDiscovery = loaded.discoveries.find((c) => c.url === "https://example.com/a");
		expect(npmDiscovery).toBeDefined();
		expect(npmDiscovery?.id).toBe("pkg-a");
		expect(npmDiscovery?.hint).toBe("test");

		expect(loaded.summary).toEqual({ npm: 1, github: 1 });
	});

	it("returns empty when no candidates", () => {
		const writer = new DiscoveryWriter(dir);
		writer.init();

		const loaded = loadDiscoveries(writer);
		expect(loaded.discoveries.length).toBe(0);
		expect(loaded.summary).toEqual({});
	});
});
