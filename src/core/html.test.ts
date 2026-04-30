import { describe, expect, test } from "bun:test";
import { cleanText, decodeHtmlEntities, stripHtmlTags } from "./html.ts";

describe("decodeHtmlEntities", () => {
	test("decodes common named entities", () => {
		expect(decodeHtmlEntities("&amp;&lt;&gt;&quot;&apos;")).toBe("&<>\"'");
	});

	test("decodes &nbsp; to space", () => {
		expect(decodeHtmlEntities("hello&nbsp;world")).toBe("hello world");
	});

	test("decodes decimal numeric entities", () => {
		// &#39; = single quote
		expect(decodeHtmlEntities("it&#39;s")).toBe("it's");
	});

	test("decodes hex numeric entities", () => {
		// &#x27; = single quote
		expect(decodeHtmlEntities("it&#x27;s")).toBe("it's");
		// &#x2F; = forward slash
		expect(decodeHtmlEntities("https:&#x2F;&#x2F;example.com")).toBe("https://example.com");
	});

	test("returns plain text unchanged", () => {
		expect(decodeHtmlEntities("hello world")).toBe("hello world");
	});

	test("handles empty string", () => {
		expect(decodeHtmlEntities("")).toBe("");
	});
});

describe("stripHtmlTags", () => {
	test("strips simple tags", () => {
		expect(stripHtmlTags("<strong>Pi</strong>")).toBe("Pi");
	});

	test("strips tags with attributes", () => {
		expect(stripHtmlTags('<a href="https://example.com">link</a>')).toBe("link");
	});

	test("strips self-closing tags", () => {
		expect(stripHtmlTags("line1<br>line2")).toBe("line1 line2");
	});

	test("strips <p> tags and collapses whitespace", () => {
		expect(stripHtmlTags("para1<p>para2<p>para3")).toBe("para1 para2 para3");
	});

	test("strips <i> and <em> tags", () => {
		expect(stripHtmlTags("the <i>process</i> of building")).toBe("the process of building");
	});

	test("handles complex nested HTML from HN stories", () => {
		const input =
			'created a color grading harness<p>Tried it on some footage<p>sample: <a href="https:&#x2F;&#x2F;imgur.com" rel="nofollow">link</a>';
		expect(stripHtmlTags(input)).toBe(
			"created a color grading harness Tried it on some footage sample: link",
		);
	});

	test("returns plain text unchanged", () => {
		expect(stripHtmlTags("hello world")).toBe("hello world");
	});

	test("handles empty string", () => {
		expect(stripHtmlTags("")).toBe("");
	});
});

describe("cleanText", () => {
	test("strips tags and decodes entities", () => {
		// Real example from Brave search
		expect(cleanText("Exploring <strong>Pi</strong>&#x27;s ability")).toBe(
			"Exploring Pi's ability",
		);
	});

	test("handles complex HN story HTML", () => {
		const input =
			"We&#x27;ve been building out CLI extensions. <p>It uses llmfit under the hood.<p>Happy to answer questions.";
		expect(cleanText(input)).toBe(
			"We've been building out CLI extensions. It uses llmfit under the hood. Happy to answer questions.",
		);
	});

	test("handles Brave search description with multiple <strong> tags", () => {
		expect(
			cleanText(
				"What is <strong>Pi</strong> <strong>Agent</strong>? Explore this lightweight, open-source terminal AI <strong>coding</strong> <strong>agent</strong>.",
			),
		).toBe("What is Pi Agent? Explore this lightweight, open-source terminal AI coding agent.");
	});

	test("decodes &quot; inside stripped tags", () => {
		expect(cleanText("experts define &quot;Guided Workflows&quot; in Markdown")).toBe(
			'experts define "Guided Workflows" in Markdown',
		);
	});

	test("returns plain text unchanged", () => {
		expect(cleanText("A simple clean description.")).toBe("A simple clean description.");
	});

	test("handles empty string", () => {
		expect(cleanText("")).toBe("");
	});
});
