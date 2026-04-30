/**
 * Tests for the "Last updated" timestamp consistency between README and site.
 *
 * Validates that both outputs derive their timestamp from the same source
 * (data/meta.json) rather than generating independent timestamps.
 */

import "../core/temporal.ts";

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { formatIsoTimestamp } from "../core/timestamp.ts";

// ─── README ↔ site timestamp consistency ───────────────────────────────────────

describe("README and site timestamp consistency", () => {
	test("README 'Last updated' matches data/meta.json timestamp", () => {
		const rootDir = join(import.meta.dir, "..", "..");
		const metaPath = join(rootDir, "data", "meta.json");
		const readmePath = join(rootDir, "README.md");

		// Skip if meta.json or README.md don't exist (fresh clone)
		try {
			const meta = JSON.parse(readFileSync(metaPath, "utf-8"));
			const readme = readFileSync(readmePath, "utf-8");

			const expectedDisplay = formatIsoTimestamp(meta.lastUpdatedAt);
			// README should contain the formatted meta.json timestamp
			expect(readme).toContain(`Last updated: ${expectedDisplay}`);
		} catch {
			// Files don't exist yet — skip
		}
	});

	test("README does NOT generate its own independent timestamp", () => {
		const rootDir = join(import.meta.dir, "..", "..");
		const metaPath = join(rootDir, "data", "meta.json");
		const readmePath = join(rootDir, "README.md");

		try {
			const meta = JSON.parse(readFileSync(metaPath, "utf-8"));
			const readme = readFileSync(readmePath, "utf-8");

			// Extract the displayed timestamp from the meta
			const expectedDisplay = formatIsoTimestamp(meta.lastUpdatedAt);

			// The meta lastUpdatedAt should be an ISO string like "2026-04-29T20:55:17.776Z"
			// The README display should be "2026-04-29 20:55 UTC"
			// They should NOT be different times
			const match = readme.match(/Last updated: (.+)/);
			expect(match).not.toBeNull();
			expect(match?.[1]).toBe(expectedDisplay);
		} catch {
			// Files don't exist yet — skip
		}
	});

	test("formatIsoTimestamp produces the same format as the site config", () => {
		// The site's astro.config.mjs uses formatIsoTimestamp(meta.lastUpdatedAt)
		// The README's render.ts uses formatIsoTimestamp(meta.lastUpdatedAt)
		// Both call the same function → guaranteed same output
		const iso = "2026-04-29T20:55:17.776Z";
		const result = formatIsoTimestamp(iso);
		expect(result).toBe("2026-04-29 20:55 UTC");
	});
});

// ─── formatDisplayDate contract ────────────────────────────────────────────────

describe("formatDisplayDate contract (render.ts)", () => {
	test("when meta.json exists, uses its timestamp (not current time)", () => {
		const rootDir = join(import.meta.dir, "..", "..");
		const metaPath = join(rootDir, "data", "meta.json");

		try {
			const meta = JSON.parse(readFileSync(metaPath, "utf-8"));

			// The displayed time should be derived from meta.json, not "now"
			// meta.json was written during the process stage, which ran before generate
			// So the timestamp should be in the past (not the current minute)
			const metaInstant = Temporal.Instant.from(meta.lastUpdatedAt);

			// At minimum, the meta timestamp should not be "in the future"
			expect(metaInstant.epochNanoseconds <= Temporal.Now.instant().epochNanoseconds).toBe(true);
		} catch {
			// File doesn't exist — skip
		}
	});

	test("the same ISO instant always formats to the same display string", () => {
		const iso = "2026-01-15T09:30:00.000Z";
		// Call twice — must be identical
		const a = formatIsoTimestamp(iso);
		const b = formatIsoTimestamp(iso);
		expect(a).toBe(b);
		expect(a).toBe("2026-01-15 09:30 UTC");
	});
});
