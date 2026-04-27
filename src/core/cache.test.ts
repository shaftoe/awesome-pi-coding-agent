import "../core/temporal.ts";

import { describe, expect, it } from "bun:test";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Cache } from "./cache.ts";

function makeCache(now: () => Temporal.Instant = () => Temporal.Now.instant()): {
	cache: Cache;
	dir: string;
	cleanup: () => void;
} {
	const dir = mkdtempSync(join(tmpdir(), "cache-test-"));
	const cache = new Cache({ dir, defaultTtl: 1000, now });
	const cleanup = () => rmSync(dir, { recursive: true, force: true });
	return { cache, dir, cleanup };
}

/** Create a fake clock that advances manually via `timeMs`. */
function fakeClock(): { now: () => Temporal.Instant; advance: (ms: number) => void } {
	let epochMs = 0;
	return {
		now: () => Temporal.Instant.fromEpochMilliseconds(epochMs),
		advance: (ms: number) => {
			epochMs += ms;
		},
	};
}

describe("Cache", () => {
	it("stores and retrieves a value", () => {
		const { cache, cleanup } = makeCache();
		try {
			cache.set("key1", { hello: "world" });
			const result = cache.get<{ hello: string }>("key1");
			expect(result).toEqual({ hello: "world" });
		} finally {
			cleanup();
		}
	});

	it("returns null for missing keys", () => {
		const { cache, cleanup } = makeCache();
		try {
			expect(cache.get("nonexistent")).toBeNull();
		} finally {
			cleanup();
		}
	});

	it("returns null for expired entries (lazy eviction)", () => {
		const clock = fakeClock();
		const { cache, cleanup } = makeCache(clock.now);
		try {
			cache.set("key1", "fresh", 5000);
			clock.advance(4999);
			expect(cache.get<string>("key1")).toBe("fresh");

			clock.advance(2);
			expect(cache.get("key1")).toBeNull();
		} finally {
			cleanup();
		}
	});

	it("deletes expired files on get", () => {
		const clock = fakeClock();
		const { cache, dir, cleanup } = makeCache(clock.now);
		try {
			cache.set("key1", "data", 100);
			expect(existsSync(join(dir, "key1.json"))).toBe(true);

			clock.advance(200);
			cache.get("key1"); // triggers lazy eviction
			expect(existsSync(join(dir, "key1.json"))).toBe(false);
		} finally {
			cleanup();
		}
	});

	it("supports per-key TTL overrides", () => {
		const clock = fakeClock();
		const { cache, cleanup } = makeCache(clock.now);
		try {
			cache.set("short", "data", 100);
			cache.set("long", "data", 5000);

			clock.advance(200);
			expect(cache.get("short")).toBeNull();
			expect(cache.get<string>("long")).toBe("data");
		} finally {
			cleanup();
		}
	});

	it("uses default TTL when per-key TTL is omitted", () => {
		const clock = fakeClock();
		const { cache, cleanup } = makeCache(clock.now);
		try {
			cache.set("key1", "data"); // uses defaultTtl=1000
			clock.advance(999);
			expect(cache.get<string>("key1")).toBe("data");
			clock.advance(2);
			expect(cache.get("key1")).toBeNull();
		} finally {
			cleanup();
		}
	});

	it("has() returns true for non-expired, false for missing/expired", () => {
		const clock = fakeClock();
		const { cache, cleanup } = makeCache(clock.now);
		try {
			cache.set("key1", "data", 1000);
			expect(cache.has("key1")).toBe(true);
			expect(cache.has("missing")).toBe(false);

			clock.advance(1001);
			expect(cache.has("key1")).toBe(false);
		} finally {
			cleanup();
		}
	});

	it("delete() removes a key", () => {
		const { cache, cleanup } = makeCache();
		try {
			cache.set("key1", "data");
			cache.delete("key1");
			expect(cache.get("key1")).toBeNull();
		} finally {
			cleanup();
		}
	});

	it("clear() removes all entries", () => {
		const { cache, cleanup } = makeCache();
		try {
			cache.set("a", 1);
			cache.set("b", 2);
			cache.clear();
			expect(cache.get("a")).toBeNull();
			expect(cache.get("b")).toBeNull();
		} finally {
			cleanup();
		}
	});

	it("prune() removes expired but keeps fresh entries", () => {
		const clock = fakeClock();
		const { cache, cleanup } = makeCache(clock.now);
		try {
			cache.set("old", "data", 100);
			cache.set("fresh", "data", 10000);

			clock.advance(200);
			const removed = cache.prune();
			expect(removed).toBe(1);

			expect(cache.get<string>("fresh")).toBe("data");
		} finally {
			cleanup();
		}
	});

	it("sanitizes keys with special characters", () => {
		const { cache, cleanup } = makeCache();
		try {
			cache.set("https://npmjs.com/search?q=pi-agent", "data");
			const result = cache.get<string>("https://npmjs.com/search?q=pi-agent");
			expect(result).toBe("data");
		} finally {
			cleanup();
		}
	});

	it("handles malformed cache files gracefully", () => {
		const { cache, dir, cleanup } = makeCache();
		try {
			// Write garbage directly to the cache dir
			writeFileSync(join(dir, "bad.json"), "not valid json {{{");

			expect(cache.get("bad")).toBeNull();
			expect(existsSync(join(dir, "bad.json"))).toBe(false); // cleaned up
		} finally {
			cleanup();
		}
	});
});
