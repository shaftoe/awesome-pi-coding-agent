/**
 * Generic pagination — iterate through numbered-page API responses.
 *
 * Composes `ThrottledFetcher` (rate limiting + retry) and `Cache`
 * (optional response caching) into a single, source-agnostic paginator.
 *
 * The caller provides:
 *   - `buildUrl(page)` — how to build the URL for page N (1-indexed)
 *   - `parse(body)` — how to extract items and the total count from a response
 *   - `earlyStop?` — callback to stop early (for smart pagination on noisy queries)
 *
 * Returns `{ items, pagesFetched }`.
 */

import type { Cache } from "./cache.ts";
import type { ThrottledFetcher } from "./throttle.ts";

export interface PaginateOptions<T> {
	/** Rate-limited fetcher instance. */
	fetcher: ThrottledFetcher;
	/** Build the URL for a given 1-indexed page number. */
	buildUrl: (page: number) => string;
	/** Parse a response body into typed items and the total result count. */
	parse: (body: unknown) => { items: T[]; total: number };
	/** Optional cache for raw responses. Pass null or omit to skip. */
	cache?: Cache | null;
	/** Optional TTL override for cached responses (defaults to cache's default). */
	cacheTtl?: number;
	/** Optional cap on the number of pages to fetch. Default: unlimited. */
	maxPages?: number;
	/**
	 * Optional early-stop callback.
	 * Return `true` to stop paginating.
	 * Called after each page is parsed, with the cumulative fetch stats.
	 */
	earlyStop?: (info: {
		page: number;
		pageItems: T[];
		totalFetched: number;
		totalAvailable: number;
	}) => boolean;
	/** Optional RequestInit forwarded to the fetcher. */
	fetchInit?: RequestInit;
	/**
	 * Offline mode: only use cached responses, never hit the network.
	 * On cache miss, pagination stops and returns what was found so far.
	 * Requires `cache` to be set.
	 */
	offline?: boolean | undefined;
}

export interface PaginateResult<T> {
	items: T[];
	pagesFetched: number;
}

/**
 * Paginate through an API, collecting all items across numbered pages.
 *
 * Stops when any of these is true:
 *   - A page returns zero items
 *   - All items have been fetched (totalFetched >= totalAvailable)
 *   - `maxPages` is reached
 *   - `earlyStop` returns true
 */
export async function paginate<T>(opts: PaginateOptions<T>): Promise<PaginateResult<T>> {
	const { fetcher, buildUrl, parse, cache, cacheTtl, maxPages, earlyStop, fetchInit, offline } =
		opts;

	const allItems: T[] = [];
	let page = 1;
	let pagesFetched = 0;

	while (true) {
		if (maxPages !== undefined && page > maxPages) break;

		const url = buildUrl(page);
		let body: unknown;

		// Try cache first, then fetch
		if (cache) {
			const cacheKey = `page:${url}`;
			const cached = cache.get<unknown>(cacheKey);
			if (cached !== null) {
				body = cached;
			} else if (offline) {
				// Offline mode: cache miss means stop
				break;
			} else {
				const response = await fetcher.fetch(url, fetchInit);
				if (!response.ok) {
					const text = await response.text().catch(() => "");
					throw new Error(`API ${response.status} page=${page}: ${text.slice(0, 200)}`);
				}
				body = await response.json();
				cache.set(cacheKey, body, cacheTtl);
			}
		} else if (offline) {
			// Offline mode without cache — nothing to do
			break;
		} else {
			const response = await fetcher.fetch(url, fetchInit);
			if (!response.ok) {
				const text = await response.text().catch(() => "");
				throw new Error(`API ${response.status} page=${page}: ${text.slice(0, 200)}`);
			}
			body = await response.json();
		}

		const { items, total } = parse(body);
		allItems.push(...items);
		pagesFetched++;

		// No results on this page — we've reached the end
		if (items.length === 0) break;

		// We've fetched everything available
		if (allItems.length >= total) break;

		// Early stop callback
		if (
			earlyStop?.({
				page,
				pageItems: items,
				totalFetched: allItems.length,
				totalAvailable: total,
			})
		)
			break;

		page++;
	}

	return { items: allItems, pagesFetched };
}
