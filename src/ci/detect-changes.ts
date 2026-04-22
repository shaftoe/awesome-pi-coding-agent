/**
 * CI helper: detect changed data files in the working tree.
 *
 * Outputs a list of changed JSON files under data/ (relative to repo root).
 * Used by the pipeline workflow to decide whether to run validation & PR creation.
 *
 * Usage:
 *   bun run src/ci/detect-changes.ts
 *   # prints filenames, one per line; exits 0 if changes found, 1 if not
 */
import { execSync } from "node:child_process";

const raw = execSync("git diff --name-only --diff-filter=ACM -- 'data/**/*.json'", {
	encoding: "utf-8",
}).trim();

if (!raw) {
	// biome-ignore lint/suspicious/noConsole: CI output
	console.log("no-changes");
	process.exit(1);
}

const files = raw.split("\n").filter(Boolean);
for (const f of files) {
	// biome-ignore lint/suspicious/noConsole: CI output
	console.log(f);
}
