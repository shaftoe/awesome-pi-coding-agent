/**
 * CLI entry point that prints the validation prompt to stdout.
 *
 * Usage: `bun run validate-prompt`
 *
 * Also used by the CI pipeline to inject the prompt into the
 * Pi coding-agent action without hardcoding it in the YAML.
 *
 * Appends a git diff section (modified tracked files + untracked new files)
 * so the LLM knows exactly which files changed without having to figure it out itself.
 */
import { execSync } from "node:child_process";
import { VALIDATE_PROMPT } from "../core/validate-prompt";

// Collect modified tracked files
let diffStat = "";
try {
	diffStat = execSync("git diff --stat", {
		encoding: "utf-8",
		stdio: ["pipe", "pipe", "pipe"],
	}).trim();
} catch {
	// Not in a git repo or no diff — that's fine
}

// Collect new untracked files (e.g. newly discovered entries)
let untracked = "";
try {
	untracked = execSync("git ls-files --others --exclude-standard", {
		encoding: "utf-8",
		stdio: ["pipe", "pipe", "pipe"],
	}).trim();
} catch {
	// Not in a git repo — that's fine
}

let prompt = VALIDATE_PROMPT;
if (diffStat || untracked) {
	let section = "\n\nChanged files:";
	if (diffStat) section += `\n\nModified:\n${diffStat}\n`;
	if (untracked) section += `\n\nNew (untracked):\n${untracked}\n`;
	prompt += section;
}

process.stdout.write(prompt);
