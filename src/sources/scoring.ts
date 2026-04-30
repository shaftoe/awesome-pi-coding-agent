/**
 * Shared scoring helpers used by source-specific health dimension scorers.
 *
 * These are pure utility functions — no source-specific logic.
 */

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Parse a date string that may lack a timezone offset (e.g. Brave's `page_age`). */
function parseInstant(dateStr: string): Temporal.Instant {
	try {
		return Temporal.Instant.from(dateStr);
	} catch {
		// Datetime without offset (e.g. "2026-04-29T12:10:03") — assume UTC
		return Temporal.Instant.from(`${dateStr}Z`);
	}
}

/** Score a date-based freshness value. Returns 0–100. */
export function scoreFreshness(dateStr: string | null | undefined): number {
	if (!dateStr) return 5;
	const instant = parseInstant(dateStr);
	const now = Temporal.Now.instant();
	const daysAgo = now.since(instant).total("millisecond") / 86_400_000;

	if (daysAgo < 30) return 100;
	if (daysAgo < 90) return 80;
	if (daysAgo < 180) return 60;
	if (daysAgo < 365) return 40;
	if (daysAgo < 730) return 20;
	return 5;
}

/** Score a 0–1 metric linearly to 0–100 with a floor of 5. */
export function scoreMetric01(value: number | null | undefined): number {
	if (value == null) return 5;
	return Math.max(5, Math.round(value * 100));
}

/** Score a date-based activity value using updated_at recency. */
export function scoreActivityDays(
	updatedAt: string | null | undefined,
	openIssues: number | null | undefined,
): number {
	if (!updatedAt) return 5;
	const instant = parseInstant(updatedAt);
	const now = Temporal.Now.instant();
	const daysAgo = now.since(instant).total("millisecond") / 86_400_000;
	if (daysAgo < 30 && (openIssues ?? 0) > 0) return 100;
	if (daysAgo < 90) return 60;
	if (daysAgo < 365) return 30;
	return 5;
}

/** Format a number with k suffix (e.g. 1500 → "1.5k", 2000 → "2k"). */
export function formatKNumber(n: number): string {
	if (n >= 1000) {
		const v = n / 1000;
		return v % 1 === 0 ? `${v}k` : `${v.toFixed(1)}k`;
	}
	return String(n);
}

/** Clamp a value to 0–100. */
export function clamp(value: number): number {
	return Math.max(0, Math.min(100, value));
}
