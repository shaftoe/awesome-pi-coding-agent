import { afterEach, expect, test, vi } from "vitest";

// Each test starts with an unloaded index, as a fresh browser visit would.
afterEach(() => {
	vi.useRealTimers();
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
	const { preloadSearch, searchEntries } = await import("./search.ts");

	const index = await preloadSearch();
	const popup = searchEntries(index, "batch", 50);
	expect(popup.entries).toHaveLength(50);
	expect(popup.total).toBe(60);

	const fullPage = searchEntries(index, "batch");
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
	const { preloadSearch, searchEntries } = await import("./search.ts");

	await expect(preloadSearch()).rejects.toThrow("Search index: 503");
	const result = searchEntries(await preloadSearch(), "batch");
	expect(result.total).toBe(1);
	expect(result.entries[0]).toMatchObject(entry);
	expect(fetchIndex).toHaveBeenCalledTimes(2);
});

test("searches once for the latest text when the catalog finishes loading", async () => {
	vi.useFakeTimers();
	const download = Promise.withResolvers<Response>();
	vi.stubGlobal("fetch", () => download.promise);
	const { createSearchHandler } = await import("./search.ts");
	const input = { value: "cat" };
	const showResults = vi.fn();
	const onInput = createSearchHandler(input, showResults, () => {
		throw new Error("Unexpected download failure");
	});

	onInput();
	await vi.advanceTimersByTimeAsync(200);
	input.value = "dog";
	onInput();
	await vi.advanceTimersByTimeAsync(200);
	input.value = "owl";
	onInput();
	expect(showResults).not.toHaveBeenCalled();

	const owl = { n: "Owl", d: "", c: "extension", u: "https://example.com/owl", p: "" };
	download.resolve(Response.json([owl]));
	await vi.runAllTimersAsync();
	expect(showResults).toHaveBeenCalledTimes(1);
	expect(showResults).toHaveBeenCalledWith("owl", {
		entries: [expect.objectContaining(owl)],
		total: 1,
	});
});

test("appends name substrings after ranked matches without duplicates or description-only matches", async () => {
	const entries = [
		{ n: "elflodge", d: "" },
		{ n: "lodger", d: "" },
		{ n: "other", d: "elflodge" },
	].map((entry) => ({ ...entry, c: "extension", u: `https://example.com/${entry.n}`, p: "" }));
	vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(entries)));
	const { preloadSearch, searchEntries } = await import("./search.ts");

	const index = await preloadSearch();
	const result = searchEntries(index, "LODGE");
	expect(result.entries.map((entry) => entry.n)).toEqual(["lodger", "elflodge"]);
	expect(result.total).toBe(2);
	const limited = searchEntries(index, "lodge", 1);
	expect(limited.entries.map((entry) => entry.n)).toEqual(["lodger"]);
	expect(limited.total).toBe(2);
	const multiword = searchEntries(index, "elf lodge");
	expect(multiword.entries.map((entry) => entry.n)).toEqual(["elflodge"]);
	expect(searchEntries(index, "lodge missing").entries).toEqual([]);
	expect(searchEntries(index, "---").entries).toEqual([]);
});

test("highlights search tokens across displayed fields and preserves the original text", async () => {
	const { createHighlighter } = await import("./search.ts");
	const highlight = createHighlighter("agent/batch.tools");
	expect(highlight("Agent Tools")).toBe("<mark>Agent</mark> <mark>Tools</mark>");
	expect(highlight("Batch <jobs>")).toBe("<mark>Batch</mark> &lt;jobs&gt;");
	expect(createHighlighter("a-agent")("Agent")).toBe("<mark>Agent</mark>");
	expect(createHighlighter("---")("A & B")).toBe("A &amp; B");
});
