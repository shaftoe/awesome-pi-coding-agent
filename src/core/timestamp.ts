/**
 * Shared build-time timestamp formatting.
 *
 * Used by both the README generator (Stage 4) and the site build config.
 * Uses Temporal exclusively — no Date API.
 *
 * Callers must ensure the Temporal polyfill is imported before using these
 * functions. Pipeline entry points and the Astro config both import the
 * polyfill before calling.
 */

const pad = (n: number): string => String(n).padStart(2, "0");

/**
 * Format a Temporal.ZonedDateTime as a human-readable UTC string.
 * Format: `YYYY-MM-DD HH:MM UTC` (e.g. `"2026-04-27 08:52 UTC"`)
 */
export function formatZdt(zdt: Temporal.ZonedDateTime): string {
	return `${zdt.year}-${pad(zdt.month)}-${pad(zdt.day)} ${pad(zdt.hour)}:${pad(zdt.minute)} UTC`;
}

/**
 * Format an ISO-8601 instant string as a human-readable UTC timestamp.
 * Falls back to the raw string if parsing fails.
 */
export function formatIsoTimestamp(iso: string): string {
	try {
		return formatZdt(Temporal.Instant.from(iso).toZonedDateTimeISO("UTC"));
	} catch {
		return iso;
	}
}

/**
 * Returns the current time as a human-readable UTC timestamp string.
 * Format: `YYYY-MM-DD HH:MM UTC` (e.g. `"2026-04-27 08:52 UTC"`)
 */
export function formatBuildTimestamp(): string {
	return formatZdt(Temporal.Now.zonedDateTimeISO("UTC"));
}
