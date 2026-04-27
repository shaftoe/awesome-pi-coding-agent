/**
 * Shared build-time timestamp formatting.
 *
 * Used by both the README generator (Stage 4) and the site build config.
 * Uses Temporal exclusively — no Date API.
 */

import "./temporal.ts";

const pad = (n: number): string => String(n).padStart(2, "0");

/**
 * Returns a human-readable UTC timestamp string.
 * Format: `YYYY-MM-DD HH:MM UTC` (e.g. `"2026-04-27 08:52 UTC"`)
 */
export function formatBuildTimestamp(): string {
	const now = Temporal.Now.zonedDateTimeISO("UTC");
	return `${now.year}-${pad(now.month)}-${pad(now.day)} ${pad(now.hour)}:${pad(now.minute)} UTC`;
}
