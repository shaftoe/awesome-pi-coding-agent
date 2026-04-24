/**
 * URL-to-ID derivation — derives a canonical entry ID from a source URL.
 *
 * Rules (matching PLAN.md identity model):
 *   npm:     https://www.npmjs.com/package/@scope/name  → @scope/name
 *            https://www.npmjs.com/package/name        → name
 *   YouTube: https://www.youtube.com/watch?v=ID        → YT_ID
 *   GitHub:  https://github.com/owner/repo             → owner-repo
 */

/** Derive an entry ID from a source URL. */
export function extractId(url: string): string {
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
