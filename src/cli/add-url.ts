/**
 * Add a single URL to the discovery pipeline.
 *
 * Detects the source from the URL pattern, fetches metadata from the
 * appropriate API, and writes a candidate to `.cache/candidates/`.
 * Then run `bun run filter && bun run process && bun run generate` as normal.
 *
 * Usage:
 *   bun run add-url <url>
 *
 * Supported URL patterns:
 *   - YouTube:  https://youtube.com/watch?v=ID  or  https://youtu.be/ID
 *   - npm:      https://www.npmjs.com/package/name  or  @scope/name
 *   - GitHub:   https://github.com/owner/repo
 */

import "../core/temporal.ts";

import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { Cache } from "../core/cache.ts";
import { EntrySource } from "../core/types.ts";
import { writeRaw } from "../discover/runner.ts";
import { DiscoveryWriter } from "../discover/writer.ts";
import { normalizeUrl } from "../sources/source.ts";

const ROOT_DIR = join(import.meta.dir, "..", "..");
const CACHE_DIR = join(ROOT_DIR, ".cache");
const CANDIDATES_DIR = join(CACHE_DIR, "candidates");

const log = console.log;

// ─── URL detection ─────────────────────────────────────────────────────────────

type SourceKind = "youtube" | "npm" | "github";

interface ParsedUrl {
	kind: SourceKind;
	candidateUrl: string;
}

function parseInput(raw: string): ParsedUrl | null {
	// YouTube: youtu.be short URL
	let match = raw.match(/^https?:\/\/youtu\.be\/([\w-]+)/);
	if (match?.[1]) {
		return { kind: "youtube", candidateUrl: `https://youtube.com/watch?v=${match[1]}` };
	}

	// YouTube: youtube.com/watch?v=ID
	match = raw.match(/^https?:\/\/(www\.)?youtube\.com\/watch\?v=([\w-]+)/);
	if (match?.[2]) {
		return { kind: "youtube", candidateUrl: `https://youtube.com/watch?v=${match[2]}` };
	}

	// npm: npmjs.com/package/name
	match = raw.match(/^https?:\/\/(www\.)?npmjs\.com\/package\/(@?[^/]+\/[^/]+|[^/]+)/);
	if (match?.[2]) {
		return { kind: "npm", candidateUrl: `https://www.npmjs.com/package/${match[2]}` };
	}

	// npm: bare package name (@scope/name or name)
	match = raw.match(/^(@[^/]+\/[^/]+|[^/@\s]+)$/);
	if (match?.[1] && !raw.includes("/")) {
		return { kind: "npm", candidateUrl: `https://www.npmjs.com/package/${match[1]}` };
	}

	// GitHub: github.com/owner/repo
	match = raw.match(/^https?:\/\/github\.com\/([^/]+\/[^/]+)/);
	if (match?.[1]) {
		return { kind: "github", candidateUrl: `https://github.com/${match[1]}` };
	}

	return null;
}

// ─── Per-source fetchers ───────────────────────────────────────────────────────

async function fetchYouTube(
	videoId: string,
	cache: Cache,
): Promise<{ url: string; hint: string; id: string; metadata: Record<string, unknown> } | null> {
	const apiKey = process.env["YOUTUBE_API_KEY"];
	if (!apiKey) {
		process.stderr.write("❌ YOUTUBE_API_KEY is required for YouTube URLs\n");
		return null;
	}

	// Fetch snippet + statistics in one call (2 quota units)
	const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics`;
	const cacheKey = `add-url:yt:${videoId}`;
	let body: unknown;

	const cached = cache.get<unknown>(cacheKey);
	if (cached !== null) {
		body = cached;
	} else {
		const res = await fetch(`${url}&key=${apiKey}`);
		if (!res.ok) {
			process.stderr.write(`❌ YouTube API ${res.status}: ${await res.text().catch(() => "")}\n`);
			return null;
		}
		body = await res.json();
		cache.set(cacheKey, body);
	}

	const data = body as {
		items: Array<{
			snippet: {
				title: string;
				description: string;
				channelTitle: string;
				publishedAt: string;
				thumbnails: Record<string, { url: string; width: number; height: number }>;
			};
			statistics: { viewCount?: string; likeCount?: string; commentCount?: string };
		}>;
	};

	const item = data.items?.[0];
	if (!item) {
		process.stderr.write(`❌ No video found for ID ${videoId}\n`);
		return null;
	}

	return {
		url: `https://youtube.com/watch?v=${videoId}`,
		hint: "youtube:add-url",
		id: `YT_${videoId}`,
		metadata: {
			title: item.snippet.title,
			name: item.snippet.title,
			description: item.snippet.description,
			channel: item.snippet.channelTitle,
			published_at: item.snippet.publishedAt,
			thumbnail:
				item.snippet.thumbnails["high"]?.url ?? item.snippet.thumbnails["medium"]?.url ?? null,
			views: Number(item.statistics.viewCount) || 0,
			likes: Number(item.statistics.likeCount) || 0,
			comments: Number(item.statistics.commentCount) || 0,
		},
	};
}

async function fetchNpm(
	pkgName: string,
	cache: Cache,
): Promise<{ url: string; hint: string; id: string; metadata: Record<string, unknown> } | null> {
	const url = `https://registry.npmjs.org/${encodeURIComponent(pkgName)}`;
	const cacheKey = `add-url:npm:${pkgName}`;
	let body: unknown;

	const cached = cache.get<unknown>(cacheKey);
	if (cached !== null) {
		body = cached;
	} else {
		const res = await fetch(url);
		if (!res.ok) {
			process.stderr.write(`❌ npm registry ${res.status}: ${pkgName}\n`);
			return null;
		}
		body = await res.json();
		cache.set(cacheKey, body);
	}

	const data = body as {
		name: string;
		description?: string;
		"dist-tags": { latest?: string };
		time: Record<string, string>;
		keywords?: string[];
		repository?: { url?: string };
		versions: Record<string, unknown>;
	};

	const latestVersion = data["dist-tags"]?.latest;
	const publishedAt = latestVersion ? data.time?.[latestVersion] : undefined;

	// Extract GitHub URL from repository field
	let githubUrl: string | undefined;
	const repoUrl = data.repository?.url;
	if (repoUrl) {
		const m = repoUrl.match(/(?:git\+)?(https:\/\/github\.com\/[^/]+\/[^/]+)/);
		githubUrl = m?.[1]?.replace(/\.git$/, "");
	}

	return {
		url: `https://www.npmjs.com/package/${data.name}`,
		hint: "npm:add-url",
		id: data.name,
		metadata: {
			github_url: githubUrl ?? null,
			npm_name: data.name,
			description: data.description ?? "",
			keywords: data.keywords ?? [],
			version: latestVersion ?? null,
			published_at: publishedAt ?? null,
			npm_downloads_monthly: null,
			npm_downloads_weekly: null,
			npm_score_final: null,
			npm_score_popularity: null,
			npm_score_quality: null,
			npm_score_maintenance: null,
		},
	};
}

async function fetchGitHub(
	fullName: string,
	cache: Cache,
): Promise<{ url: string; hint: string; id: string; metadata: Record<string, unknown> } | null> {
	const url = `https://api.github.com/repos/${fullName}`;
	const cacheKey = `add-url:gh:${fullName}`;
	let body: unknown;

	const headers: Record<string, string> = {
		Accept: "application/vnd.github+json",
		"X-GitHub-Api-Version": "2022-11-28",
	};
	const token = process.env["GITHUB_TOKEN"];
	if (token) headers["Authorization"] = `Bearer ${token}`;

	const cached = cache.get<unknown>(cacheKey);
	if (cached !== null) {
		body = cached;
	} else {
		const res = await fetch(url, { headers });
		if (!res.ok) {
			process.stderr.write(`❌ GitHub API ${res.status}: ${await res.text().catch(() => "")}\n`);
			return null;
		}
		body = await res.json();
		cache.set(cacheKey, body);
	}

	const repo = body as {
		full_name: string;
		html_url: string;
		description?: string;
		stargazers_count: number;
		forks_count: number;
		open_issues_count: number;
		topics?: string[];
		language?: string;
		archived: boolean;
		created_at: string;
		pushed_at?: string;
		updated_at: string;
		size: number;
		license?: { spdx_id?: string };
	};

	return {
		url: repo.html_url,
		hint: "github:add-url",
		id: repo.full_name.replace("/", "-"),
		metadata: {
			github_url: repo.html_url,
			repo_full_name: repo.full_name,
			description: repo.description ?? "",
			stars: repo.stargazers_count,
			forks: repo.forks_count,
			open_issues: repo.open_issues_count,
			topics: repo.topics ?? [],
			language: repo.language ?? null,
			archived: repo.archived,
			created_at: repo.created_at,
			pushed_at: repo.pushed_at ?? null,
			updated_at: repo.updated_at,
			size: repo.size,
			license: repo.license?.spdx_id ?? null,
		},
	};
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
	const rawUrl = process.argv[2];
	if (!rawUrl) {
		process.stderr.write("Usage: bun run add-url <url>\n");
		process.stderr.write(
			"\nSupported:\n  YouTube:  https://youtube.com/watch?v=ID or https://youtu.be/ID\n  npm:      https://www.npmjs.com/package/name\n  GitHub:   https://github.com/owner/repo\n",
		);
		process.exit(1);
	}

	const parsed = parseInput(rawUrl);
	if (!parsed) {
		process.stderr.write(`❌ Unrecognised URL pattern: ${rawUrl}\n`);
		process.exit(1);
	}

	// Ensure candidates directory exists
	if (!existsSync(CANDIDATES_DIR)) mkdirSync(CANDIDATES_DIR, { recursive: true });

	const cache = new Cache({ dir: CACHE_DIR });
	const writer = new DiscoveryWriter(CANDIDATES_DIR);
	writer.init(); // Don't reset — we're appending to existing candidates

	let result: { url: string; hint: string; id: string; metadata: Record<string, unknown> } | null =
		null;

	switch (parsed.kind) {
		case "youtube": {
			const videoId = parsed.candidateUrl.match(/[?&]v=([\w-]+)/)?.[1] ?? "";
			log(`🔍 Fetching YouTube video ${videoId}...`);
			result = await fetchYouTube(videoId, cache);
			break;
		}
		case "npm": {
			const pkgName = parsed.candidateUrl.replace("https://www.npmjs.com/package/", "");
			log(`🔍 Fetching npm package ${pkgName}...`);
			result = await fetchNpm(pkgName, cache);
			break;
		}
		case "github": {
			const fullName = parsed.candidateUrl.replace("https://github.com/", "");
			log(`🔍 Fetching GitHub repo ${fullName}...`);
			result = await fetchGitHub(fullName, cache);
			break;
		}
	}

	if (!result) {
		process.exit(1);
	}

	// Normalize the URL and write as candidate
	const normalizedUrl = normalizeUrl(result.url);
	const sourceTag =
		parsed.kind === "youtube"
			? EntrySource.YouTubeSearch
			: parsed.kind === "npm"
				? EntrySource.NpmSearch
				: EntrySource.GitHubSearch;

	const { written } = writeRaw(parsed.kind, sourceTag, [{ ...result, url: normalizedUrl }], writer);

	if (written > 0) {
		log(`✅ Added candidate: ${normalizedUrl}`);
		log(`   Run: bun run filter && bun run process && bun run generate`);
	} else {
		log(`⚠️  Already exists in candidates: ${normalizedUrl}`);
	}
}

main().catch((err) => {
	process.stderr.write(`❌ ${err instanceof Error ? err.message : err}\n`);
	process.exit(1);
});
