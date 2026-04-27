/**
 * CLI entry point that prints the validation prompt to stdout.
 *
 * Usage: `bun run validate-prompt`
 *
 * Also used by the CI pipeline to inject the prompt into the
 * Pi coding-agent action without hardcoding it in the YAML.
 *
 * Appends a `git diff --stat` section so the LLM knows exactly
 * which files changed without having to figure it out itself.
 */
import { execSync } from "node:child_process";
import { VALIDATE_PROMPT } from "../core/validate-prompt";

let diffStat = "";
try {
	diffStat = execSync("git diff --stat", {
		encoding: "utf-8",
		stdio: ["pipe", "pipe", "pipe"],
	}).trim();
} catch {
	// Not in a git repo or no diff — that's fine
}

let prompt = VALIDATE_PROMPT;
if (diffStat) {
	prompt += `\n\nChanged files:\n\n${diffStat}\n`;
}

process.stdout.write(prompt);
