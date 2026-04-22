/**
 * Health scoring — rate how active/maintained an entry is.
 */
import type { CategorizedEntry, Health, HealthLevel } from "../lib/types.ts";

/** Calculate health for a GitHub-based entry. */
function githubHealth(entry: CategorizedEntry): Health {
	const meta = entry.metadata as Record<string, number | boolean | string>;
	let score = 50; // start neutral

	// Stars
	const stars = (meta["stars"] as number) ?? 0;
	score += Math.min(stars / 10, 20);

	// Recent activity
	const lastCommit = meta["last_commit"] as string | undefined;
	if (lastCommit) {
		const daysSince = (Date.now() - new Date(lastCommit).getTime()) / (1000 * 60 * 60 * 24);
		if (daysSince < 30) score += 20;
		else if (daysSince < 90) score += 10;
		else if (daysSince > 365) score -= 20;
	}

	// Penalties
	if (meta["is_archived"]) score -= 50;
	if (meta["is_fork"]) score -= 30;

	return clamp(score);
}

/** Calculate health for a YouTube video entry. */
function youtubeHealth(entry: CategorizedEntry): Health {
	const meta = entry.metadata as Record<string, number | string>;
	let score = 50;

	// Freshness (primary signal — always available from YouTube Search API)
	const published = meta["published_at"] as string | undefined;
	if (published) {
		const daysSince = (Date.now() - new Date(published).getTime()) / (1000 * 60 * 60 * 24);
		if (daysSince < 30) score += 25;
		else if (daysSince < 90) score += 15;
		else if (daysSince < 180) score += 5;
		else if (daysSince > 365) score -= 20;
	}

	// Engagement (secondary signal — only available when YouTube Data API is configured)
	const views = (meta["view_count"] as number) ?? 0;
	const likes = (meta["like_count"] as number) ?? 0;
	score += Math.min(views / 500, 15);
	score += Math.min(likes / 50, 10);

	return clamp(score);
}

function clamp(score: number): Health {
	const s = Math.max(0, Math.min(100, Math.round(score)));
	return { score: s, level: healthLevel(s) };
}

function healthLevel(score: number): HealthLevel {
	if (score >= 70) return "active";
	if (score >= 40) return "maintained";
	if (score >= 15) return "stale";
	return "dead";
}

/** Calculate health score for any entry based on its category. */
export function calculateHealth(entry: CategorizedEntry): Health {
	if (entry.category === "video") return youtubeHealth(entry);
	return githubHealth(entry);
}
