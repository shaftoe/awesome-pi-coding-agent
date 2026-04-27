/**
 * Presentation formatting helpers for the site.
 *
 * These are purely UI concerns — how to display names, numbers,
 * dates, and popularity signals from pipeline entries.
 */

import "@pipeline/core/temporal.ts";

import { decodeHtmlEntities } from "@pipeline/core/html";
import type { CategorizedEntry } from "@pipeline/core/types";

// ─── Display name ─────────────────────────────────────────────────────────────

/** Derive a human-readable display name from an entry. */
export function displayName(entry: CategorizedEntry): string {
	const meta = entry.metadata as Record<string, unknown>;

	// YouTube entries: use video title
	if (entry.id.startsWith("YT_")) {
		const raw = (meta["title"] as string) || entry.id.replace("YT_", "");
		return decodeHtmlEntities(raw);
	}

	// GitHub entries: use repo name from URL
	if (entry.url.includes("github.com/")) {
		const match = entry.url.match(/github\.com\/[^/]+\/([^/]+)/);
		if (match?.[1]) return match[1];
	}

	// npm entries (and fallback): use the name field
	return entry.name || entry.id;
}

// ─── Number formatting ────────────────────────────────────────────────────────

/** Format a number for compact display (1.2k, 314). */
export function formatNumber(n: number): string {
	if (n >= 1000) {
		const v = n / 1000;
		return v % 1 === 0 ? `${v}k` : `${v.toFixed(1)}k`;
	}
	return String(n);
}

/** Format star count for display. */
export function formatStars(n: number): string {
	return formatNumber(n);
}

// ─── Popularity ───────────────────────────────────────────────────────────────

/**
 * Source-aware popularity string.
 * Returns the strongest available signal: YouTube views, GitHub stars, npm downloads.
 */
export function popularity(entry: CategorizedEntry): string {
	const meta = entry.metadata as Record<string, unknown>;

	// YouTube entries: views
	const views = meta["views"];
	if (typeof views === "number" && views > 0) {
		return `📺${formatNumber(views)}`;
	}

	// GitHub entries: stars
	const stars = meta["stars"];
	if (typeof stars === "number" && stars > 0) {
		return `⭐${formatNumber(stars)}`;
	}

	// npm entries: monthly downloads
	const downloads = meta["npm_downloads_monthly"];
	if (typeof downloads === "number" && downloads > 0) {
		return `⬇ ${formatNumber(downloads)}/mo`;
	}

	return "";
}

/**
 * Extract the raw numeric popularity value for sorting / display.
 * Returns 0 if no signal available.
 */
export function popularityValue(entry: CategorizedEntry): number {
	const meta = entry.metadata as Record<string, unknown>;

	const views = meta["views"];
	if (typeof views === "number") return views;

	const stars = meta["stars"];
	if (typeof stars === "number") return stars;

	const downloads = meta["npm_downloads_monthly"];
	if (typeof downloads === "number") return downloads;

	return 0;
}

// ─── Relative time ────────────────────────────────────────────────────────────

/** Format an ISO date string as a relative time label. */
export function timeAgo(isoDate: string | null): string {
	if (!isoDate) return "";
	try {
		const then = Temporal.Instant.from(isoDate);
		const now = Temporal.Now.instant();
		const dur = now.until(then, { smallestUnit: "second" });
		const absMs = Math.abs(dur.total("millisecond"));
		const days = Math.floor(absMs / 86_400_000);

		if (days === 0) return "today";
		if (days === 1) return "yesterday";
		if (days < 30) return `${days}d ago`;
		if (days < 60) return "~1mo ago";
		if (days < 365) return `${Math.round(days / 30)}mo ago`;
		const years = Math.round(days / 365);
		return `${years}y ago`;
	} catch {
		return "";
	}
}

// ─── Updated date ─────────────────────────────────────────────────────────────

/** Pick the most relevant "last updated" timestamp from entry metadata. */
export function lastUpdated(entry: CategorizedEntry): string | null {
	const meta = entry.metadata as Record<string, unknown>;
	for (const field of ["pushed_at", "published_at", "updated_at"] as const) {
		if (typeof meta[field] === "string") return meta[field] as string;
	}
	return null;
}

// ─── Language ─────────────────────────────────────────────────────────────────

/** Extract the primary language from entry metadata (GitHub entries only). */
export function language(entry: CategorizedEntry): string | null {
	const meta = entry.metadata as Record<string, unknown>;
	return typeof meta["language"] === "string" ? meta["language"] : null;
}
