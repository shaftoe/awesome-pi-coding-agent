/**
 * GitHub search discovery — find pi-agent repos via GitHub Search API.
 */

import { searchRepos } from "../lib/github.ts";
import { QueryDiscoverer } from "./index.ts";

export const githubDiscoverer = new QueryDiscoverer({
	name: "GitHub",
	source: "github-search",
	queries: [
		"pi-coding-agent",
		"pi-agent extension",
		"pi-agent skill",
		"pi-mono",
		"topic:pi-agent",
		"topic:pi-coding-agent",
	],
	fetchQuery: async (query) => {
		const repos = await searchRepos(query);
		// searchRepos already returns metadata (stars, forks, description, etc.)
		// from the GitHub Search API — pass it through to avoid re-fetching.
		return repos.map((r) => {
			const item: { url: string; hint?: string; metadata?: Record<string, unknown> } = {
				url: r.url,
			};
			if (r.hint) item.hint = r.hint;
			if (r.metadata) item.metadata = r.metadata;
			return item;
		});
	},
});
