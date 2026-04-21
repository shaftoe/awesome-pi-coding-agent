/**
 * README analysis — fetch and extract info from a repo's README.
 *
 * For npm-sourced entries, uses `metadata.github_url` instead of the
 * primary URL (which points to npmjs.com, not github.com).
 */
import type { Entry } from "../lib/types.ts";

/**
 * Get the GitHub URL for README fetching.
 * For npm-sourced entries, looks in metadata.github_url.
 */
function getGitHubUrlForReadme(entry: Entry): string | null {
	if (entry.source === "npm-search") {
		const meta = entry.metadata as Record<string, unknown>;
		return (meta["github_url"] as string) ?? null;
	}
	if (entry.url.includes("github.com")) {
		return entry.url;
	}
	return null;
}

/** Fetch raw README content from a GitHub repo URL. */
async function fetchReadme(url: string): Promise<string | null> {
	const ownerRepo = url.match(/github\.com\/([^/]+\/[^/]+)/)?.[1];
	if (!ownerRepo) return null;

	const branches = ["main", "master"];
	for (const branch of branches) {
		try {
			const rawUrl = `https://raw.githubusercontent.com/${ownerRepo}/${branch}/README.md`;
			const response = await fetch(rawUrl);
			if (response.ok) return await response.text();
		} catch {
			// try next branch
		}
	}
	return null;
}

/** Keywords that hint at the type of resource. */
const CATEGORY_KEYWORDS: Record<string, string[]> = {
	extension: ["extension", "hooks", "custom tool", "tool registration"],
	skill: ["SKILL.md", "skill"],
	tool: ["cli", "utility", "dashboard", "sandbox", "manager"],
	theme: ["theme", "color scheme", "rose pine"],
	provider: ["provider", "model registry", "api adapter"],
};

/** Check if an entry already has README category scores. */
export function hasReadmeScores(entry: Entry): boolean {
	const meta = entry.metadata as Record<string, unknown>;
	return (
		typeof meta["_readme_category_scores"] === "object" && meta["_readme_category_scores"] !== null
	);
}

/** Analyze a README to detect resource type hints. */
export function analyzeReadme(readme: string): Record<string, number> {
	const lower = readme.toLowerCase();
	const scores: Record<string, number> = {};

	for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
		scores[category] = 0;
		for (const keyword of keywords) {
			const count = (lower.match(new RegExp(keyword, "gi")) ?? []).length;
			scores[category] += count;
		}
	}

	return scores;
}

/** Enrich an entry by analyzing its README. */
export async function enrichFromReadme(entry: Entry): Promise<Entry> {
	const githubUrl = getGitHubUrlForReadme(entry);
	if (!githubUrl) {
		// No GitHub URL — mark enrichment as done with empty scores
		return {
			...entry,
			metadata: {
				...(entry.metadata as Record<string, unknown>),
				_readme_category_scores: {},
			},
		};
	}

	const readme = await fetchReadme(githubUrl);
	const scores = readme ? analyzeReadme(readme) : {};

	// Attach scores as a hint for the classifier (stored in metadata)
	// Always set _readme_category_scores (even if empty) to mark enrichment as done
	return {
		...entry,
		metadata: {
			...(entry.metadata as Record<string, unknown>),
			_readme_category_scores: scores,
		},
	};
}
