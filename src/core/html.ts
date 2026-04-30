/**
 * HTML entity decoding and tag stripping — shared utility.
 *
 * Handles named entities and the most common numeric/hex forms.
 */

const NAMED_ENTITIES: Record<string, string> = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": '"',
	"&apos;": "'",
	"&nbsp;": " ",
};

export function decodeHtmlEntities(s: string): string {
	// Named entities (case-sensitive)
	let out = s;
	for (const [entity, char] of Object.entries(NAMED_ENTITIES)) {
		out = out.replaceAll(entity, char);
	}

	// Decimal numeric entities  &#123;
	out = out.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number.parseInt(n, 10)));

	// Hex numeric entities  &#x1F4A9;
	out = out.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(Number.parseInt(h, 16)));

	return out;
}

/**
 * Strip all HTML tags from a string, keeping only the text content.
 *
 * Block-level / break tags (p, br, div, li, etc.) are replaced with a space
 * so that word boundaries are preserved. Inline tags are removed without
 * adding whitespace.
 */
const BLOCK_TAGS = new Set([
	"p",
	"br",
	"div",
	"li",
	"tr",
	"td",
	"th",
	"hr",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
]);

export function stripHtmlTags(s: string): string {
	// Replace tags — block-level tags insert a space, inline tags don't
	let out = s.replace(/<\/?(\w+)[^>]*>/g, (_match, tagName) => {
		return BLOCK_TAGS.has(tagName.toLowerCase()) ? " " : "";
	});
	// Collapse runs of whitespace into a single space
	out = out.replace(/\s+/g, " ").trim();
	return out;
}

/**
 * Clean text that may contain HTML markup or entities.
 *
 * Strips tags first, then decodes remaining entities — the order matters
 * so that entities inside attribute values are not lost before the tags
 * are removed.
 */
export function cleanText(s: string): string {
	return decodeHtmlEntities(stripHtmlTags(s));
}
