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
		});
	});

	test("routes gh: queries to githubRepoQueries", () => {
		const result = routeQueries(["gh:pi-theme", "gh:topic:pi-agent"]);
		expect(result).toEqual({
			npmQueries: [],
			githubRepoQueries: ["pi-theme", "topic:pi-agent"],
			youtubeQueries: [],
		});
	});

	test("routes yt: queries to youtubeQueries", () => {
		const result = routeQueries(["yt:pi coding agent"]);
		expect(result).toEqual({
			npmQueries: [],
			githubRepoQueries: [],
			youtubeQueries: ["pi coding agent"],
		});
	});

	test("routes mixed queries to correct buckets", () => {
		const result = routeQueries(["npm:pi-coding-agent", "gh:pi-theme", "yt:pi coding agent"]);
		expect(result).toEqual({
			npmQueries: ["pi-coding-agent"],
			githubRepoQueries: ["pi-theme"],
			youtubeQueries: ["pi coding agent"],
		});
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
	});

	test("throws on unprefixed query", () => {
		expect(() => routeQueries(["pi-coding-agent"])).toThrow("source prefix required");
	});
});
