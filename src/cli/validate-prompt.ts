/**
 * CLI entry point that prints the validation prompt to stdout.
 *
 * Usage: `bun run validate-prompt`
 *
 * Also used by the CI pipeline to inject the prompt into the
 * Pi coding-agent action without hardcoding it in the YAML.
 *
 * Appends the entry files that need semantic validation. Bulk metric updates are
 * intentionally omitted so the GitHub Action input stays below process limits.
 */
import { execFileSync } from "node:child_process";
import { VALIDATE_PROMPT } from "../core/validate-prompt";

function git(args: string[]): string {
	try {
		return execFileSync("git", args, {
			encoding: "utf-8",
			stdio: ["pipe", "pipe", "pipe"],
		}).trim();
	} catch {
		return "";
	}
}

function entryPathsFrom(output: string): string[] {
	if (!output) return [];
	return output
		.split("\n")
		.map((path) => path.trim())
		.filter((path) => path.startsWith("data/entries/") && path.endsWith(".json"));
}

const modifiedEntries = entryPathsFrom(
	git([
		"diff",
		"--name-only",
		"--diff-filter=AM",
		"-G",
		'"(name|description|url|category)"',
		"--",
		"data/entries",
	]),
);

const newEntries = entryPathsFrom(
	git(["ls-files", "--others", "--exclude-standard", "--", "data/entries"]),
);

const entriesToValidate = Array.from(new Set([...modifiedEntries, ...newEntries])).sort();

let prompt = VALIDATE_PROMPT;
if (entriesToValidate.length > 0) {
	prompt += `\n\nEntry files requiring validation:\n${entriesToValidate.join("\n")}`;
} else {
	prompt +=
		"\n\nNo entry files require semantic validation; only generated metadata or popularity metrics changed.";
}

process.stdout.write(prompt);
