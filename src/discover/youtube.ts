/**
 * YouTube Data API discovery — find pi-agent videos.
 */

import { FatalDiscoveryError, QueryDiscoverer } from "./index.ts";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

interface YouTubeSearchResponse {
	items?: {
		id: { videoId?: string };
		snippet: {
			title: string;
			description: string;
			channelTitle: string;
			publishedAt: string;
			thumbnails: { high?: { url: string }; default?: { url: string } };
		};
	}[];
	error?: {
		code: number;
		message: string;
		status: string;
		errors: { message: string; domain: string; reason: string }[];
	};
}

export const youtubeDiscoverer = new QueryDiscoverer({
	name: "YouTube",
	source: "youtube-search",
	queries: [
		"pi coding agent",
		"pi agent tutorial",
		"pi.dev",
		"pi-mono",
		"pi agent extension",
		"pi agent setup",
	],
	init: async () => {
		const apiKey = process.env["YOUTUBE_API_KEY"];
		if (!apiKey) {
			throw new Error("YOUTUBE_API_KEY not set — skipping. See .env.example for setup.");
		}
	},
	fetchQuery: async (term) => {
		const apiKey = process.env["YOUTUBE_API_KEY"];
		const url = new URL(`${YOUTUBE_API_BASE}/search`);
		url.searchParams.set("part", "snippet");
		url.searchParams.set("q", term);
		url.searchParams.set("type", "video");
		url.searchParams.set("maxResults", "25");
		url.searchParams.set("order", "relevance");
		url.searchParams.set("key", apiKey ?? "");

		const response = await fetch(url.toString());
		const data = (await response.json()) as YouTubeSearchResponse;

		if (!response.ok || data.error) {
			const msg = data.error?.message ?? response.statusText;
			const hint =
				response.status === 403
					? `YouTube API access denied: ${msg}\n  → Enable YouTube Data API v3: https://console.cloud.google.com/apis/library/youtube.googleapis.com`
					: `YouTube API error ${response.status}: ${msg}`;
			throw new FatalDiscoveryError(hint);
		}

		return (data.items ?? [])
			.filter((item) => item.id.videoId)
			.map((item) => ({
				url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
				hint: `youtube:${term}`,
				metadata: {
					title: item.snippet.title,
					description: item.snippet.description,
					channel: item.snippet.channelTitle,
					published_at: item.snippet.publishedAt,
					thumbnail:
						item.snippet.thumbnails.high?.url ?? item.snippet.thumbnails.default?.url ?? "",
				},
			}));
	},
});
