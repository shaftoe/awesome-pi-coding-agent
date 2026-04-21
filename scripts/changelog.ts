/**
 * CLI script — previews the exact final CHANGELOG.md that semantic-release
 * would produce. Uses the same generateNotes + changelogTitle prepending
 * logic as @semantic-release/changelog's prepare step.
 *
 * Usage:
 *   bun run changelog
 */

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
// @ts-expect-error -- no types for this module
import { generateNotes } from "@semantic-release/release-notes-generator";

const __dirname = dirname(resolve(process.argv[1]!));
const cwd = resolve(__dirname, "..");

const GIT_ENV = {
	...process.env,
	GIT_CONFIG_GLOBAL: process.env['GIT_CONFIG_GLOBAL'] ?? "/dev/null",
};

const CHANGELOG_FILE = resolve(cwd, "CHANGELOG.md");

const CHANGELOG_TITLE = [
	"# Changelog",
	"",
	"All notable changes to this project will be documented in this file.",
	"",
	"The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),",
	"and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).",
].join("\n");

function getLastTag() {
	try {
		return execSync("git describe --tags --abbrev=0", {
			encoding: "utf8",
			env: GIT_ENV,
		}).trim();
	} catch {
		return "";
	}
}

function getVersion(tag: string) {
	if (!tag) return "1.0.0";
	const m = tag.match(/^v?(\d+)\.(\d+)\.(\d+)$/);
	if (!m) return tag;
	return `${m[1]}.${m[2]}.${Number(m[3]) + 1}`;
}

function getCommitsSince(tag: string) {
	const range = tag ? `${tag}..HEAD` : "HEAD";
	const gitFormat = "%H %s";
	// biome-ignore lint/style/useTemplate: %s gets consumed by Bun in template literals
	const lines = execSync("git log " + range + ' --format="' + gitFormat + '"', {
		encoding: "utf8",
		env: GIT_ENV,
	})
		.trim()
		.split("\n")
		.filter(Boolean);
	return lines.map((line) => {
		const [hash, ...rest] = line.split(" ");
		return { hash, message: rest.join(" ") };
	});
}

/**
 * Replicates the exact logic from @semantic-release/changelog's prepare step:
 *  1. Read current CHANGELOG.md
 *  2. Strip the changelogTitle from the top
 *  3. Prepend the new notes
 *  4. Re-add the changelogTitle
 */
function buildFinalChangelog(notes: string): string {
	let currentContent = "";
	try {
		const raw = readFileSync(CHANGELOG_FILE, "utf-8").trim();
		currentContent = raw.startsWith(CHANGELOG_TITLE)
			? raw.slice(CHANGELOG_TITLE.length).trim()
			: raw;
	} catch {
		// no existing changelog yet
	}

	const content = `${notes.trim()}\n${currentContent ? `\n${currentContent}\n` : ""}`;
	return `${CHANGELOG_TITLE}\n\n${content}`;
}

async function main() {
	const lastTag = getLastTag();
	const version = getVersion(lastTag);
	const commits = getCommitsSince(lastTag);

	if (commits.length === 0) {
		console.log("No commits since last release.");
		process.exit(0);
	}

	const notes = await generateNotes(
		{ config: "./src/lib/keep-a-changelog.js" },
		{
			cwd,
			commits,
			lastRelease: {
				gitTag: lastTag,
				gitHead: lastTag,
				version: lastTag.replace(/^v/, ""),
			},
			nextRelease: { gitTag: `v${version}`, gitHead: commits[0]!.hash, version },
			options: { repositoryUrl: "https://github.com/shaftoe/awesome-pi-coding-agent" },
		},
	);

	if (!notes) {
		console.log("No relevant commits for changelog.");
		process.exit(0);
	}

	console.log(buildFinalChangelog(notes));
}

main();
