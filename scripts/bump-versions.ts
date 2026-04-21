/**
 * CLI script — bumps version in site/package.json to match the version
 * being released by semantic-release.
 *
 * Called by the @semantic-release/exec plugin during the release process.
 * The root package.json version is already bumped by @semantic-release/npm
 * (npmPublish:false), so this script only needs to sync site/package.json.
 *
 * Usage:
 *   bun run scripts/bump-versions.ts <version>
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

const __dirname = dirname(resolve(process.argv[1]!));
const cwd = resolve(__dirname, "..");

const SITE_PKG = resolve(cwd, "site", "package.json");

function main() {
	const version = process.argv[2] ?? process.env['npm_package_version'];

	if (!version) {
		console.error("No version provided. Pass it as an argument or set npm_package_version env var.");
		process.exit(1);
	}

	// Update site/package.json
	const sitePkg = JSON.parse(readFileSync(SITE_PKG, "utf-8"));
	const oldVersion = sitePkg.version;
	sitePkg.version = version;
	writeFileSync(SITE_PKG, `${JSON.stringify(sitePkg, null, "\t")}\n`, "utf-8");
	console.log(`Updated site/package.json: ${oldVersion} → ${version}`);
}

main();
