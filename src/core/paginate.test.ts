import "./temporal.ts";

import { afterEach, describe, expect, it } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Cache } from "./cache.ts";
import { paginate } from "./paginate.ts";
import { ThrottledFetcher } from "./throttle.ts";

// ─── Test helpers ──────────────────────────────────────────────────────────────

function makeFetcher(): ThrottledFetcher {
	let epochMs = 0;
	return new ThrottledFetcher(
		{ requestsPerSecond: 1000, maxRetries: 0 },
		{
			clock: () => Temporal.Instant.fromEpochMilliseconds(epochMs),
			sleepFn: async (ms) => {
				epochMs += ms;
			},
		},
	);
}

function makeCacheDir(): { dir: string; cleanup: () => void } {
	const dir = mkdtempSync(join(tmpdir(), "paginate-test-"));
	return { dir, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
}

function mockResponse(status: number, body: unknown): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

/** Type-safe parse helper for the mock API response shape. */
function parsePage(body: unknown): { items: { id: number }[]; total: number } {
	const data = body as { items: { id: number }[]; total: number };
	return { items: data.items, total: data.total };
}

/** Install a mock fetch function and return a restore handle. */
function installMock(fn: (url: string | URL | Request, init?: RequestInit) => Promise<Response>) {
	const original = globalThis.fetch;
	globalThis.fetch = fn as typeof fetch;
	return () => {
		globalThis.fetch = original;
	};
}

// ─── Tests ─────────────────────────────────────────────────────────────────────

describe("paginate", () => {
	let restore: () => void;

	afterEach(() => {
		restore?.();
	});

	it("fetches a single page and returns items", async () => {
		const fetcher = makeFetcher();
		const data = [{ id: 1 }, { id: 2 }];

		restore = installMock(async () => {
			return mockResponse(200, { items: data, total: 2 });
		});

		const result = await paginate<{ id: number }>({
			fetcher,
			buildUrl: (page) => `https://api.example.com/items?page=${page}`,
			parse: parsePage,
		});

		expect(result.items).toEqual(data);
		expect(result.pagesFetched).toBe(1);
	});

	it("paginates through multiple pages until total is reached", async () => {
		const fetcher = makeFetcher();
		const pages = [[{ id: 1 }, { id: 2 }], [{ id: 3 }, { id: 4 }], [{ id: 5 }]];

		let callCount = 0;
		restore = installMock(async () => {
			const page = pages[callCount++] ?? [];
			return mockResponse(200, { items: page, total: 5 });
		});

		const result = await paginate<{ id: number }>({
			fetcher,
			buildUrl: (page) => `https://api.example.com/items?page=${page}`,
			parse: parsePage,
		});

		expect(result.items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
		expect(result.pagesFetched).toBe(3);
	});

	it("stops when a page returns zero items", async () => {
		const fetcher = makeFetcher();

		let callCount = 0;
		restore = installMock(async () => {
			callCount++;
			if (callCount === 1) return mockResponse(200, { items: [{ id: 1 }], total: 100 });
			return mockResponse(200, { items: [], total: 100 });
		});

		const result = await paginate<{ id: number }>({
			fetcher,
			buildUrl: (page) => `https://api.example.com/items?page=${page}`,
			parse: parsePage,
		});

		expect(result.items).toEqual([{ id: 1 }]);
		expect(result.pagesFetched).toBe(2);
	});

	it("respects maxPages", async () => {
		const fetcher = makeFetcher();

		let callCount = 0;
		restore = installMock(async () => {
			callCount++;
			return mockResponse(200, { items: [{ id: callCount }], total: 100 });
		});

		const result = await paginate<{ id: number }>({
			fetcher,
			buildUrl: (page) => `https://api.example.com/items?page=${page}`,
			parse: parsePage,
			maxPages: 3,
		});

		expect(result.items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
		expect(result.pagesFetched).toBe(3);
	});

	it("calls earlyStop and stops when it returns true", async () => {
		const fetcher = makeFetcher();

		let callCount = 0;
		restore = installMock(async () => {
			callCount++;
			return mockResponse(200, { items: [{ id: callCount }], total: 100 });
		});

		const stopCalls: number[] = [];
		const result = await paginate<{ id: number }>({
			fetcher,
			buildUrl: (page) => `https://api.example.com/items?page=${page}`,
			parse: parsePage,
			earlyStop: ({ page }) => {
				stopCalls.push(page);
				return page >= 2;
			},
		});

		expect(result.items).toEqual([{ id: 1 }, { id: 2 }]);
		expect(result.pagesFetched).toBe(2);
		expect(stopCalls).toEqual([1, 2]);
	});

	it("caches responses and reads from cache on second call", async () => {
		const { dir, cleanup } = makeCacheDir();
		const cache = new Cache({ dir, defaultTtl: 60000 });
		const fetcher = makeFetcher();

		try {
			let fetchCount = 0;
			restore = installMock(async () => {
				fetchCount++;
				return mockResponse(200, { items: [{ id: 1 }], total: 1 });
			});

			// First call: fetches from API
			const r1 = await paginate<{ id: number }>({
				fetcher,
				cache,
				buildUrl: (page) => `https://api.example.com/items?page=${page}`,
				parse: parsePage,
			});
			expect(r1.items).toEqual([{ id: 1 }]);
			expect(fetchCount).toBe(1);

			// Second call: reads from cache (no new fetch)
			const r2 = await paginate<{ id: number }>({
				fetcher,
				cache,
				buildUrl: (page) => `https://api.example.com/items?page=${page}`,
				parse: parsePage,
			});
			expect(r2.items).toEqual([{ id: 1 }]);
			expect(fetchCount).toBe(1); // still 1 — served from cache
		} finally {
			restore();
			cleanup();
		}
	});

	it("throws on non-OK response", async () => {
		const fetcher = makeFetcher();
		restore = installMock(async () => mockResponse(500, "Internal Server Error"));

		expect(
			paginate({
				fetcher,
				buildUrl: (page) => `https://api.example.com/items?page=${page}`,
				parse: parsePage,
			}),
		).rejects.toThrow("API 500");
	});

	it("passes fetchInit to the underlying fetcher", async () => {
		const fetcher = makeFetcher();
		const receivedInits: RequestInit[] = [];
		restore = installMock(async (_url, init) => {
			receivedInits.push(init ?? {});
			return mockResponse(200, { items: [{ id: 1 }], total: 1 });
		});

		await paginate<{ id: number }>({
			fetcher,
			buildUrl: (page) => `https://api.example.com/items?page=${page}`,
			parse: parsePage,
			fetchInit: { headers: { Authorization: "Bearer token" } },
		});

		expect(receivedInits.length).toBe(1);
		expect(receivedInits[0]).toEqual({ headers: { Authorization: "Bearer token" } });
	});
});
