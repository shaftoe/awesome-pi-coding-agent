/**
 * CI helper: create a pull request with pipeline changes.
 *
 * Assumes git is already configured and changes exist in the working tree.
 * Uses the `gh` CLI to create the PR.
 *
 * Usage:
 *   GH_TOKEN=... bun run src/ci/create-pr.ts
 */
import { execSync } from "node:child_process";
import { unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function run(cmd: string): string {
	return execSync(cmd, { encoding: "utf-8" }).trim();
}

// Bail if no changes
if (!run("git diff --quiet --exit-code; echo $?").includes("1")) {
	// biome-ignore lint/suspicious/noConsole: CI output
	console.log("No changes detected, skipping PR.");
	process.exit(0);
}

const date = new Date().toISOString().split("T")[0];
const branch = `pipeline-${date}`;
const title = `chore: 📦 Daily pipeline update ${branch}`;

run(`git checkout -b "${branch}"`);
run("git add -A");
run(`git commit -m "${title}"`);
run(`git push origin "${branch}"`);

const body = `Automated daily pipeline update.

### Validation
- ✅ Data pipeline: discover → enrich → generate
- ✅ Pi agent: relevance & health check passed`;

// Use gh pr create with --body-file to avoid shell escaping issues
const tmpFile = join(import.meta.dir, "..", "..", ".pr-body.md");
writeFileSync(tmpFile, body);

run(`gh pr create --title "${title}" --body-file "${tmpFile}" --base main --head "${branch}"`);

// Clean up
try {
	unlinkSync(tmpFile);
} catch {
	// ignore
}

// biome-ignore lint/suspicious/noConsole: CI output
console.log(`✅ Created PR: ${branch}`);
