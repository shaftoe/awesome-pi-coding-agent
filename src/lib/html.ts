/**
 * HTML entity decoding — shared utility used across the pipeline and site.
 */

/** Decode common HTML entities (&#39; &amp; &quot; etc.) to their plain-text equivalents. */
export function decodeHtmlEntities(s: string): string {
	return s
		.replace(/&#39;/g, "'")
		.replace(/&#x27;/g, "'")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"');
}
