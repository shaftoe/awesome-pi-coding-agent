/**
 * Tests for the file-per-entry data access layer.
 * Covers ID↔filename encoding, round-trips, and edge cases.
 */
import { describe, expect, it } from "bun:test";
import { filenameToId, idToFilename } from "./store.ts";

describe("idToFilename", () => {
	it("converts a regular ID to filename", () => {
		expect(idToFilename("my-extension")).toBe("my-extension.json");
	});

	it("converts a scoped npm package to filename", () => {
		expect(idToFilename("@scope/name")).toBe("@scope--name.json");
	});

	it("converts a scoped package with multi-part name", () => {
		expect(idToFilename("@my-org/my-cool-extension")).toBe("@my-org--my-cool-extension.json");
	});

	it("handles IDs that look like paths", () => {
		expect(idToFilename("simple-tool")).toBe("simple-tool.json");
	});

	it("handles YouTube-style IDs", () => {
		expect(idToFilename("YT_abc123")).toBe("YT_abc123.json");
	});

	it("handles GitHub-style IDs (owner-repo)", () => {
		expect(idToFilename("owner-repo")).toBe("owner-repo.json");
	});

	it("handles @scope only with no package part (edge case)", () => {
		// Regex requires .+ after /, so @scope/ doesn't match and falls through
		expect(idToFilename("@scope/")).toBe("@scope/.json");
	});
});

describe("filenameToId", () => {
	it("converts a regular filename to ID", () => {
		expect(filenameToId("my-extension.json")).toBe("my-extension");
	});

	it("converts a scoped filename back to ID", () => {
		expect(filenameToId("@scope--name.json")).toBe("@scope/name");
	});

	it("converts a scoped multi-part filename back to ID", () => {
		expect(filenameToId("@my-org--my-cool-extension.json")).toBe("@my-org/my-cool-extension");
	});

	it("handles YouTube-style filenames", () => {
		expect(filenameToId("YT_abc123.json")).toBe("YT_abc123");
	});

	it("handles filenames without .json extension (strips nothing)", () => {
		expect(filenameToId("my-extension.txt")).toBe("my-extension.txt");
	});
});

describe("idToFilename ↔ filenameToId round-trip", () => {
	const ids = [
		"my-extension",
		"@scope/name",
		"@my-org/my-cool-extension",
		"YT_abc123",
		"owner-repo",
		"simple-id",
		"@pi-dev/skill-pack",
	];

	for (const id of ids) {
		it(`round-trips "${id}"`, () => {
			expect(filenameToId(idToFilename(id))).toBe(id);
		});
	}
});
