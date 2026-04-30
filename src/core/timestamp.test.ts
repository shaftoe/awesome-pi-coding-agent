/**
 * Tests for shared timestamp formatting.
 *
 * Validates that formatZdt, formatIsoTimestamp, and formatBuildTimestamp
 * all produce consistent human-readable UTC strings.
 */

import "../core/temporal.ts";

import { describe, expect, test } from "bun:test";
import { formatBuildTimestamp, formatIsoTimestamp, formatZdt } from "./timestamp.ts";

// ─── formatZdt ─────────────────────────────────────────────────────────────────

describe("formatZdt", () => {
	test("formats a known UTC datetime", () => {
		const instant = Temporal.Instant.from("2026-04-29T20:55:17.776Z");
		const zdt = instant.toZonedDateTimeISO("UTC");
		expect(formatZdt(zdt)).toBe("2026-04-29 20:55 UTC");
	});

	test("zero-pads month, day, hour, minute", () => {
		const instant = Temporal.Instant.from("2025-01-05T03:02:00.000Z");
		const zdt = instant.toZonedDateTimeISO("UTC");
		expect(formatZdt(zdt)).toBe("2025-01-05 03:02 UTC");
	});

	test("handles midnight", () => {
		const instant = Temporal.Instant.from("2026-12-31T00:00:00.000Z");
		const zdt = instant.toZonedDateTimeISO("UTC");
		expect(formatZdt(zdt)).toBe("2026-12-31 00:00 UTC");
	});

	test("handles end of day", () => {
		const instant = Temporal.Instant.from("2026-06-15T23:59:59.999Z");
		const zdt = instant.toZonedDateTimeISO("UTC");
		expect(formatZdt(zdt)).toBe("2026-06-15 23:59 UTC");
	});
});

// ─── formatIsoTimestamp ────────────────────────────────────────────────────────

describe("formatIsoTimestamp", () => {
	test("formats an ISO-8601 instant with milliseconds", () => {
		expect(formatIsoTimestamp("2026-04-29T20:55:17.776Z")).toBe("2026-04-29 20:55 UTC");
	});

	test("formats an ISO-8601 instant without milliseconds", () => {
		expect(formatIsoTimestamp("2026-04-29T20:55:17Z")).toBe("2026-04-29 20:55 UTC");
	});

	test("zero-pads all components", () => {
		expect(formatIsoTimestamp("2025-01-05T03:02:00Z")).toBe("2025-01-05 03:02 UTC");
	});

	test("returns raw string on invalid input", () => {
		expect(formatIsoTimestamp("not-a-date")).toBe("not-a-date");
	});

	test("returns raw string on empty input", () => {
		expect(formatIsoTimestamp("")).toBe("");
	});
});

// ─── formatBuildTimestamp ──────────────────────────────────────────────────────

describe("formatBuildTimestamp", () => {
	test("returns a string in YYYY-MM-DD HH:MM UTC format", () => {
		const result = formatBuildTimestamp();
		// Regex matches "2026-04-29 20:55 UTC"
		expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2} UTC$/);
	});

	test("returns the current time (within the same minute)", () => {
		const before = Temporal.Now.zonedDateTimeISO("UTC");
		const result = formatBuildTimestamp();
		const pad = (n: number) => String(n).padStart(2, "0");
		const expected = `${before.year}-${pad(before.month)}-${pad(before.day)} ${pad(before.hour)}:${pad(before.minute)} UTC`;
		// Should match the minute we captured (barring a minute boundary crossing)
		expect(result).toBe(expected);
	});
});

// ─── Consistency: formatIsoTimestamp matches meta.json round-trip ──────────────

describe("timestamp consistency (meta.json → display)", () => {
	test("meta.json ISO instant formats to the same display as formatZdt", () => {
		// Simulate what writeMeta() produces
		const iso = Temporal.Now.instant().toString();
		// Simulate what the site and README do
		const display = formatIsoTimestamp(iso);

		const instant = Temporal.Instant.from(iso);
		const zdt = instant.toZonedDateTimeISO("UTC");
		const pad = (n: number) => String(n).padStart(2, "0");
		const expected = `${zdt.year}-${pad(zdt.month)}-${pad(zdt.day)} ${pad(zdt.hour)}:${pad(zdt.minute)} UTC`;

		expect(display).toBe(expected);
	});
});
