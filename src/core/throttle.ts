/**
 * Rate-limited HTTP client with automatic retry and exponential backoff.
 *
 * This is the single shared mechanism all sources use to make HTTP requests.
 * It replaces the ad-hoc sleep/retry logic that was duplicated across
 * npm (custom fetchPageWithRetry), GitHub (bare fetch), and YouTube (manual delays).
 *
 * Capabilities:
 *   1. **Request spacing** — enforces a minimum interval between requests
 *      (configured as `requestsPerSecond`). Uses a "next allowed time" model.
 *
 *   2. **Automatic retry** — on transient HTTP errors (default: 429, 502, 503, 504),
 *      retries with exponential backoff up to `maxRetries` attempts.
 *
 *   3. **Fatal errors** — non-retryable statuses (e.g. 401, 403, 404) are returned
 *      immediately without retry. Callers can check `response.ok` themselves.
 *
 * All timing is injectable for testing.
 */

export interface ThrottleOptions {
	/**
	 * Max requests per second.
	 *   - 1   = one request per second
	 *   - 0.5 = one request every 2 seconds (good for npm)
	 *   - 10  = ten requests per second
	 * Default: 2
	 */
	requestsPerSecond?: number;

	/** Max retry attempts on transient errors. Default: 5. */
	maxRetries?: number;

	/** Base delay for exponential backoff in ms. Default: 2000. */
	retryBaseDelay?: number;

	/**
	 * HTTP status codes that trigger automatic retry.
	 * Default: [429, 502, 503, 504]
	 */
	retryStatuses?: number[];
}

export interface ThrottledFetcherInternals {
	/** Injectable clock — defaults to Temporal.Now.instant(). */
	clock?: () => Temporal.Instant;
	/** Injectable sleep — defaults to real setTimeout. */
	sleepFn?: (ms: number) => Promise<void>;
	/** Injectable fetch — defaults to global fetch. */
	fetchFn?: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
}

export class ThrottledFetcher {
	private readonly minIntervalMs: number;
	private readonly maxRetries: number;
	private readonly retryBaseDelay: number;
	private readonly retryStatuses: Set<number>;
	private readonly clock: () => Temporal.Instant;
	private readonly sleepFn: (ms: number) => Promise<void>;
	private readonly fetchFn: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
	private nextAllowedTime: Temporal.Instant;

	/**
	 * @param opts      Configuration (see ThrottleOptions).
	 * @param internals Injectable internals for testing (clock, sleep, fetch).
	 */
	constructor(opts: ThrottleOptions = {}, internals: ThrottledFetcherInternals = {}) {
		const rps = opts.requestsPerSecond ?? 2;
		this.minIntervalMs = 1000 / rps;
		this.maxRetries = opts.maxRetries ?? 5;
		this.retryBaseDelay = opts.retryBaseDelay ?? 2000;
		this.retryStatuses = new Set(opts.retryStatuses ?? [429, 502, 503, 504]);
		this.clock = internals.clock ?? (() => Temporal.Now.instant());
		this.sleepFn = internals.sleepFn ?? realSleep;
		this.fetchFn = internals.fetchFn ?? ((url, init) => fetch(url, init));
		// Initialize to the instant the fetcher was created — no delay on first request
		this.nextAllowedTime = this.clock();
	}

	// ─── Internal helpers ───────────────────────────────────────────────────

	/** Wait until the minimum interval since the last request has elapsed. */
	private async waitForSlot(): Promise<void> {
		const now = this.clock();
		const waitMs = this.nextAllowedTime.since(now).total("millisecond");
		if (waitMs > 0) {
			await this.sleepFn(waitMs);
		}
		this.nextAllowedTime = this.clock().add({ milliseconds: this.minIntervalMs });
	}

	/**
	 * Perform a single HTTP request (no retry).
	 * Respects the rate-limit slot.
	 */
	private async singleFetch(url: string, init?: RequestInit): Promise<Response> {
		await this.waitForSlot();
		return this.fetchFn(url, init);
	}

	// ─── Public API ─────────────────────────────────────────────────────────

	/**
	 * Fetch a URL with rate limiting and automatic retry.
	 *
	 * - Spacing: enforces `1 / requestsPerSecond` seconds between requests
	 * - Retry: on transient errors (429, 502, 503, 504), retries with
	 *   exponential backoff (2s → 4s → 8s → 16s → 32s)
	 * - Non-retryable statuses (e.g. 401, 403, 404, 200) are returned immediately
	 *
	 * The response is returned as-is — callers should check `response.ok`.
	 */
	async fetch(url: string, init?: RequestInit): Promise<Response> {
		let lastResponse: Response | undefined;

		for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
			const response = await this.singleFetch(url, init);
			lastResponse = response;

			// Happy path or non-retryable status → return immediately
			if (response.ok || !this.retryStatuses.has(response.status)) {
				return response;
			}

			// Retryable status — back off and try again (unless this was the last attempt)
			if (attempt < this.maxRetries) {
				const delay = this.retryBaseDelay * 2 ** attempt;
				process.stderr.write(
					`⏳ ${response.status} — retrying in ${delay / 1000}s (attempt ${attempt + 1}/${this.maxRetries})\n`,
				);
				await this.sleepFn(delay);
			}
		}

		// All retries exhausted — return the last response we got
		// biome-ignore lint/style/noNonNullAssertion: guaranteed by the loop (at least one iteration)
		return lastResponse!;
	}
}

// ─── Real sleep ────────────────────────────────────────────────────────────────

function realSleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
