import "../core/temporal.ts";

import { describe, expect, it, mock } from "bun:test";
import { ThrottledFetcher } from "./throttle.ts";

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Create a fake clock with controllable time for deterministic tests. */
function fakeClock(): {
	now: () => Temporal.Instant;
	advance: (ms: number) => void;
} {
	let epochMs = 0;
	return {
		now: () => Temporal.Instant.fromEpochMilliseconds(epochMs),
		advance: (ms: number) => {
			epochMs += ms;
		},
	};
}

function makeFetcher(
	opts: { requestsPerSecond?: number; maxRetries?: number; retryStatuses?: number[] } = {},
) {
	const clock = fakeClock();
	const sleepLog: number[] = [];

	const sleepFn = mock(async (ms: number) => {
		sleepLog.push(ms);
		clock.advance(ms);
	});

	const fetcher = new ThrottledFetcher(
		{
			requestsPerSecond: opts.requestsPerSecond ?? 1000,
			maxRetries: opts.maxRetries ?? 2,
			...(opts.retryStatuses ? { retryStatuses: opts.retryStatuses } : {}),
		},
		{ clock: clock.now, sleepFn },
	);

	return {
		fetcher,
		getSleepLog: () => sleepLog,
		advanceTime: (ms: number) => {
			clock.advance(ms);
		},
	};
}

function mockResponse(status: number, body: unknown = {}): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

/** Install a mock fetch function and return a handle to restore the original. */
function installMock(fn: (url: string | URL | Request, init?: RequestInit) => Promise<Response>) {
	const original = globalThis.fetch;
	globalThis.fetch = fn as typeof fetch;
	return () => {
		globalThis.fetch = original;
	};
}

// ─── Tests ─────────────────────────────────────────────────────────────────────

describe("ThrottledFetcher", () => {
	it("returns successful responses immediately", async () => {
		const { fetcher } = makeFetcher();
		const restore = installMock(async () => mockResponse(200, { ok: true }));

		try {
			const res = await fetcher.fetch("https://example.com/api");
			expect(res.status).toBe(200);
			expect(await res.json()).toEqual({ ok: true });
		} finally {
			restore();
		}
	});

	it("returns non-retryable errors immediately (no retry)", async () => {
		const { fetcher } = makeFetcher({ maxRetries: 3 });
		let callCount = 0;
		const restore = installMock(async () => {
			callCount++;
			return mockResponse(404, { error: "not found" });
		});

		try {
			const res = await fetcher.fetch("https://example.com/api");
			expect(res.status).toBe(404);
			expect(callCount).toBe(1); // no retries
		} finally {
			restore();
		}
	});

	it("retries on transient errors with exponential backoff", async () => {
		const clock = fakeClock();
		const sleepLog: number[] = [];
		const sleepFn = mock(async (ms: number) => {
			sleepLog.push(ms);
			clock.advance(ms);
		});

		const fetcher = new ThrottledFetcher(
			{ maxRetries: 3, retryBaseDelay: 1000, requestsPerSecond: 1000 },
			{ clock: clock.now, sleepFn },
		);

		let attempt = 0;
		const restore = installMock(async () => {
			attempt++;
			if (attempt <= 2) return mockResponse(429);
			return mockResponse(200, { success: true });
		});

		try {
			const res = await fetcher.fetch("https://example.com/api");
			expect(res.status).toBe(200);
			expect(attempt).toBe(3);

			// Filter out tiny rate-limit spacing sleeps, keep backoff sleeps (>=1000ms)
			const backoffSleeps = sleepLog.filter((ms) => ms >= 1000);
			expect(backoffSleeps).toEqual([1000, 2000]);
		} finally {
			restore();
		}
	});

	it("returns last error response after exhausting retries", async () => {
		const { fetcher } = makeFetcher({ maxRetries: 2 });
		const restore = installMock(async () => mockResponse(503, { error: "unavailable" }));

		try {
			const res = await fetcher.fetch("https://example.com/api");
			expect(res.status).toBe(503);
		} finally {
			restore();
		}
	});

	it("spaces requests according to requestsPerSecond", async () => {
		const { fetcher, getSleepLog } = makeFetcher({ requestsPerSecond: 2 }); // 1 req per 500ms
		const restore = installMock(async () => mockResponse(200));

		try {
			await fetcher.fetch("https://example.com/api/1");
			await fetcher.fetch("https://example.com/api/2");
			await fetcher.fetch("https://example.com/api/3");

			// Should have sleeps for spacing between requests
			expect(getSleepLog().length).toBeGreaterThanOrEqual(2);
		} finally {
			restore();
		}
	});

	it("does not sleep when requests are naturally spaced out", async () => {
		const { fetcher, getSleepLog, advanceTime } = makeFetcher({ requestsPerSecond: 2 });
		const restore = installMock(async () => mockResponse(200));

		try {
			await fetcher.fetch("https://example.com/api/1");
			advanceTime(600); // more than the 500ms interval
			await fetcher.fetch("https://example.com/api/2");

			expect(getSleepLog().length).toBe(0);
		} finally {
			restore();
		}
	});

	it("only retries on configured retry statuses", async () => {
		const { fetcher } = makeFetcher({
			maxRetries: 3,
			retryStatuses: [503],
		});

		let attempts = 0;
		const restore = installMock(async () => {
			attempts++;
			return mockResponse(429);
		});

		try {
			const res = await fetcher.fetch("https://example.com/api");
			expect(res.status).toBe(429);
			expect(attempts).toBe(1); // no retry for 429
		} finally {
			restore();
		}
	});
});
