/**
 * Shared scoring helpers used by source implementations.
 */

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Format a number with k suffix (e.g. 1500 → "1.5k", 2000 → "2k"). */
export function formatKNumber(n: number): string {
	if (n >= 1000) {
		const v = n / 1000;
		return v % 1 === 0 ? `${v}k` : `${v.toFixed(1)}k`;
	}
	return String(n);
}
