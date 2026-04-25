/**
 * URL → human-readable ID derivation.
 *
 * The canonical entry key is the URL itself (stored directly as repository key).
 * This module derives a human-readable display name from the URL for use in
 * Entry.id, logging, and UI.
 *
 * Priority: npm name (canonical) > GitHub owner-repo > YouTube video ID > slug
 */

/** Derive a human-readable entry ID from a source URL. */
export function extractId(url: string): string {
	if (url.includes("npmjs.com/package/")) {
		const packagePath = url.split("npmjs.com/package/")[1];
		return decodeURIComponent(packagePath?.replace(/\/+$/, "") ?? "");
	}

	if (url.includes("youtube.com") || url.includes("youtu.be")) {
		const videoId = url.match(/[?&]v=([^&]+)/)?.[1] ?? url.split("/").pop() ?? "";
		return `YT_${videoId}`;
	}

	const ghMatch = url.match(/github\.com\/([^/]+\/[^/]+)/);
	if (ghMatch?.[1]) return ghMatch[1].replace("/", "-");

	return url.split("/").filter(Boolean).pop() ?? url;
}
