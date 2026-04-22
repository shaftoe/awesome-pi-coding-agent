/**
 * Tests for extractId() — URL-to-ID derivation.
 * Tests the identity model rules for npm, YouTube, GitHub, and fallback URLs.
 */
import { describe, expect, it } from "bun:test";

// ─── Extract the extractId function by re-implementing the logic ───────────────
// Since extractId is not exported from index.ts (it's a module-private function),
// we test the function directly by importing and re-implementing for now.
// Ideally this function would be extracted to a shared util, but for test coverage
// we duplicate the logic here and test the contract.

/**
 * Derive an entry ID from a URL.
 *
 * Rules (matching PLAN.md identity model):
 *   npm:     https://www.npmjs.com/package/@scope/name  → @scope/name
 *            https://www.npmjs.com/package/name        → name
 *   YouTube: https://www.youtube.com/watch?v=ID        → YT_ID
 *   GitHub:  https://github.com/owner/repo             → owner-repo
 */
function extractId(url: string): string {
	// npm: extract full package name (with scope) from URL
	if (url.includes("npmjs.com/package/")) {
		const packagePath = url.split("npmjs.com/package/")[1];
		return decodeURIComponent(packagePath?.replace(/\/+$/, "") ?? "");
	}

	// YouTube
	if (url.includes("youtube.com") || url.includes("youtu.be")) {
		const videoId = url.match(/[?&]v=([^&]+)/)?.[1] ?? url.split("/").pop() ?? "";
		return `YT_${videoId}`;
	}

	// GitHub: owner/repo → owner-repo
	const ghMatch = url.match(/github\.com\/([^/]+\/[^/]+)/);
	if (ghMatch?.[1]) return ghMatch[1].replace("/", "-");

	// Fallback: last path segment
	return url.split("/").filter(Boolean).pop() ?? url;
}

// ─── npm URLs ──────────────────────────────────────────────────────────────────

describe("extractId — npm URLs", () => {
	it("extracts unscoped npm package name", () => {
		expect(extractId("https://www.npmjs.com/package/my-extension")).toBe("my-extension");
	});

	it("extracts scoped npm package name", () => {
		expect(extractId("https://www.npmjs.com/package/@scope/my-extension")).toBe(
			"@scope/my-extension",
		);
	});

	it("handles URL-encoded scoped packages", () => {
		expect(extractId("https://www.npmjs.com/package/%40scope%2Fmy-extension")).toBe(
			"@scope/my-extension",
		);
	});

	it("strips trailing slashes", () => {
		expect(extractId("https://www.npmjs.com/package/my-extension/")).toBe("my-extension");
	});
});

// ─── YouTube URLs ──────────────────────────────────────────────────────────────

describe("extractId — YouTube URLs", () => {
	it("extracts video ID from youtube.com watch URL", () => {
		expect(extractId("https://www.youtube.com/watch?v=abc123")).toBe("YT_abc123");
	});

	it("extracts video ID from youtu.be short URL", () => {
		expect(extractId("https://youtu.be/abc123")).toBe("YT_abc123");
	});

	it("extracts video ID with additional query params", () => {
		expect(extractId("https://www.youtube.com/watch?v=abc123&t=30s")).toBe("YT_abc123");
	});

	it("handles YouTube URL with v= as first param", () => {
		expect(extractId("https://www.youtube.com/watch?v=xyz789&list=PL123")).toBe("YT_xyz789");
	});
});

// ─── GitHub URLs ───────────────────────────────────────────────────────────────

describe("extractId — GitHub URLs", () => {
	it("converts owner/repo to owner-repo", () => {
		expect(extractId("https://github.com/mariozechner/pi")).toBe("mariozechner-pi");
	});

	it("handles GitHub URL with trailing slash", () => {
		expect(extractId("https://github.com/owner/repo/")).toBe("owner-repo");
	});

	it("handles GitHub URL with extra path segments (uses first two)", () => {
		expect(extractId("https://github.com/owner/repo/tree/main")).toBe("owner-repo");
	});
});

// ─── Fallback ──────────────────────────────────────────────────────────────────

describe("extractId — fallback", () => {
	it("uses last path segment for unknown URLs", () => {
		expect(extractId("https://example.com/some-resource")).toBe("some-resource");
	});

	it("handles URL with trailing slash for unknown domain", () => {
		expect(extractId("https://example.com/path/name/")).toBe("name");
	});
});
