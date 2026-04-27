import { describe, expect, test } from "bun:test";
import { parseQueryPrefix, routeQueries } from "./index.ts";

describe("parseQueryPrefix", () => {
	test("parses npm: prefix", () => {
		expect(parseQueryPrefix("npm:pi-coding-agent")).toEqual({
			target: "npm",
			term: "pi-coding-agent",
		});
	});

	test("parses gh: prefix", () => {
		expect(parseQueryPrefix("gh:pi-extension")).toEqual({
			target: "gh",
			term: "pi-extension",
		});
	});

	test("parses yt: prefix", () => {
		expect(parseQueryPrefix("yt:pi coding agent")).toEqual({
			target: "yt",
			term: "pi coding agent",
		});
	});

	test("parses hn: prefix", () => {
		expect(parseQueryPrefix("hn:pi coding agent")).toEqual({
			target: "hn",
			term: "pi coding agent",
		});
	});

	test("parses rss: prefix with URL", () => {
		expect(parseQueryPrefix("rss:https://dev.to/feed/tag/pi")).toEqual({
			target: "rss",
			term: "https://dev.to/feed/tag/pi",
		});
	});

	test("throws on unprefixed query", () => {
		expect(() => parseQueryPrefix("pi-coding-agent")).toThrow("source prefix required");
	});

	test("throws when prefix has no value after colon", () => {
		expect(() => parseQueryPrefix("npm:")).toThrow("source prefix required");
	});
});

describe("routeQueries", () => {
	test("routes npm: queries to npmQueries", () => {
		const result = routeQueries(["npm:pi-coding-agent", "npm:pi-package"]);
		expect(result).toEqual({
			npmQueries: ["pi-coding-agent", "pi-package"],
			githubRepoQueries: [],
			youtubeQueries: [],
			hackerNewsQueries: [],
			rssFeeds: [],
		});
	});

	test("routes gh: queries to githubRepoQueries", () => {
		const result = routeQueries(["gh:pi-theme", "gh:topic:pi-agent"]);
		expect(result).toEqual({
			npmQueries: [],
			githubRepoQueries: ["pi-theme", "topic:pi-agent"],
			youtubeQueries: [],
			hackerNewsQueries: [],
			rssFeeds: [],
		});
	});

	test("routes yt: queries to youtubeQueries", () => {
		const result = routeQueries(["yt:pi coding agent"]);
		expect(result).toEqual({
			npmQueries: [],
			githubRepoQueries: [],
			youtubeQueries: ["pi coding agent"],
			hackerNewsQueries: [],
			rssFeeds: [],
		});
	});

	test("routes hn: queries to hackerNewsQueries", () => {
		const result = routeQueries(["hn:pi coding agent", "hn:pi.dev"]);
		expect(result).toEqual({
			npmQueries: [],
			githubRepoQueries: [],
			youtubeQueries: [],
			hackerNewsQueries: ["pi coding agent", "pi.dev"],
			rssFeeds: [],
		});
	});

	test("routes rss: queries to rssFeeds with auto-generated labels", () => {
		const result = routeQueries(["rss:https://dev.to/feed/tag/pi-coding-agent"]);
		expect(result.rssFeeds).toEqual([
			{ url: "https://dev.to/feed/tag/pi-coding-agent", label: "dev.to:feed/tag/pi-coding-agent" },
		]);
		expect(result.npmQueries).toEqual([]);
		expect(result.githubRepoQueries).toEqual([]);
		expect(result.youtubeQueries).toEqual([]);
		expect(result.hackerNewsQueries).toEqual([]);
	});

	test("routes mixed queries to correct buckets", () => {
		const result = routeQueries([
			"npm:pi-coding-agent",
			"gh:pi-theme",
			"yt:pi coding agent",
			"hn:pi.dev",
			"rss:https://example.com/feed",
		]);
		expect(result.npmQueries).toEqual(["pi-coding-agent"]);
		expect(result.githubRepoQueries).toEqual(["pi-theme"]);
		expect(result.youtubeQueries).toEqual(["pi coding agent"]);
		expect(result.hackerNewsQueries).toEqual(["pi.dev"]);
		expect(result.rssFeeds).toHaveLength(1);
		expect(result.rssFeeds?.[0]?.url).toBe("https://example.com/feed");
	});

	test("returns empty object for empty input (sources use defaults)", () => {
		const result = routeQueries([]);
		expect(result).toEqual({});
	});

	test("sets unmentioned sources to empty arrays (skip them)", () => {
		const result = routeQueries(["gh:pi-theme"]);
		expect(result.npmQueries).toEqual([]);
		expect(result.githubRepoQueries).toEqual(["pi-theme"]);
		expect(result.youtubeQueries).toEqual([]);
		expect(result.hackerNewsQueries).toEqual([]);
		expect(result.rssFeeds).toEqual([]);
	});

	test("throws on unprefixed query", () => {
		expect(() => routeQueries(["pi-coding-agent"])).toThrow("source prefix required");
	});
});
