/**
 * Generic health combiner — Layer 2 of the two-layer health scoring architecture.
 *
 * Takes normalised HealthDimensions (from source-specific scorers) and applies:
 *   1. The weighted formula: freshness×0.35 + popularity×0.30 + activity×0.20 + depth×0.15
 *   2. Hard rules: archived → Dead, missing dates → cap Stale, YouTube → cap Maintained
 *   3. Health level mapping: Active ≥70, Maintained ≥40, Stale ≥15, Dead <15
 */

import type { Entry, Health, HealthDimensions } from "../core/types.ts";
import { EntrySource, HealthLevel } from "../core/types.ts";

// ─── Weights ───────────────────────────────────────────────────────────────────

const W_FRESHNESS = 0.35;
const W_POPULARITY = 0.3;
const W_ACTIVITY = 0.2;
const W_DEPTH = 0.15;

// ─── Caps ──────────────────────────────────────────────────────────────────────

/** Maximum score for entries with no date metadata at all. */
const CAP_NO_DATES = 39;
/** Maximum score for YouTube entries (no ongoing maintenance). */
const CAP_YOUTUBE = 60;
/** Maximum score for Hacker News entries (community link aggregation). */
const CAP_HACKERNEWS = 60;
/** Maximum score for RSS entries (articles with no maintenance). */
const CAP_RSS = 39;

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Compute the final Health from an entry and its source-specific dimension scores.
 *
 * Applies hard rules, then the weighted formula, then caps.
 */
export function computeHealth(entry: Entry, dims: HealthDimensions): Health {
	// Hard rule: archived → Dead immediately
	if (entry.metadata?.["archived"] === true) {
		return { score: 0, level: HealthLevel.Dead };
	}

	// Weighted formula
	const raw =
		dims.freshness * W_FRESHNESS +
		dims.popularity * W_POPULARITY +
		dims.activity * W_ACTIVITY +
		dims.depth * W_DEPTH;

	let score = Math.round(raw);

	// Hard rule: missing dates → cap at Stale
	const hasDate =
		entry.metadata?.["published_at"] != null ||
		entry.metadata?.["pushed_at"] != null ||
		entry.metadata?.["updated_at"] != null;

	if (!hasDate) {
		score = Math.min(score, CAP_NO_DATES);
	}

	// Hard rule: YouTube → cap at Maintained
	if (entry.source === EntrySource.YouTubeSearch) {
		score = Math.min(score, CAP_YOUTUBE);
	}

	// Hard rule: Hacker News → cap at Maintained
	if (entry.source === EntrySource.HackerNewsSearch) {
		score = Math.min(score, CAP_HACKERNEWS);
	}

	// Hard rule: RSS → cap below Maintained
	if (entry.source === EntrySource.RSSFeed) {
		score = Math.min(score, CAP_RSS);
	}

	// Clamp to 0–100
	score = Math.max(0, Math.min(100, score));

	// Map to health level
	const level = scoreToLevel(score);

	return { score, level };
}

/** Map a 0–100 score to a HealthLevel. */
export function scoreToLevel(score: number): HealthLevel {
	if (score >= 70) return HealthLevel.Active;
	if (score >= 40) return HealthLevel.Maintained;
	if (score >= 15) return HealthLevel.Stale;
	return HealthLevel.Dead;
}
