import { afterEach, expect, test, vi } from "vitest";

// Each test starts with an unloaded index, as a fresh browser visit would.
afterEach(() => {
	vi.unstubAllGlobals();
	vi.resetModules();
});

test("limits displayed results without truncating the total match count", async () => {
	const entries = Array.from({ length: 60 }, (_, i) => ({
		n: `Tool ${i}`,
		d: "Batch processing",
		c: "extension",
		u: `https://example.com/tool-${i}`,
		p: "",
	}));
	vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(entries)));
	const { searchEntries } = await import("./search.ts");

	const popup = await searchEntries("batch", 50);
	expect(popup.entries).toHaveLength(50);
	expect(popup.total).toBe(60);

	const fullPage = await searchEntries("batch");
	expect(fullPage.entries).toHaveLength(60);
	expect(fullPage.total).toBe(60);
});

test("retries initialization after a failed download", async () => {
	const entry = {
		n: "Batch tool",
		d: "",
		c: "extension",
		u: "https://example.com/batch-tool",
		p: "",
	};
	const fetchIndex = vi
		.fn()
		.mockResolvedValueOnce(new Response(null, { status: 503 }))
		.mockResolvedValueOnce(Response.json([entry]));
	vi.stubGlobal("fetch", fetchIndex);
	const { searchEntries } = await import("./search.ts");

	await expect(searchEntries("batch")).rejects.toThrow("Search index: 503");
	const result = await searchEntries("batch");
	expect(result.total).toBe(1);
	expect(result.entries[0]).toMatchObject(entry);
	expect(fetchIndex).toHaveBeenCalledTimes(2);
});
