/**
 * CLI script — syncs version in site/package.json with the root package.json
 * version being released by semantic-release.
 *
 * Called by the @semantic-release/exec plugin during the release process.
 * The next version is passed as the first CLI argument.
 *
 * Note: root package.json version bumping is handled by @semantic-release/npm
 * with npmPublish:false, so this script only needs to handle site/package.json.
 *
 * Usage:
 *   bun run scripts/bump-versions.ts [version]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

const __dirname = dirname(resolve(process.argv[1]!));
const cwd = resolve(__dirname, "..");

const SITE_PKG_FILE = resolve(cwd, "site/package.json");

function main() {
	const version = process.argv[2] ?? process.env["npm_package_version"];

	if (!version) {
		console.error("No version provided. Pass it as an argument or set npm_package_version env var.");
		process.exit(1);
	}

	const sitePkg = JSON.parse(readFileSync(SITE_PKG_FILE, "utf-8"));
	sitePkg.version = version;
	writeFileSync(SITE_PKG_FILE, `${JSON.stringify(sitePkg, null, "\t")}\n`, "utf-8");
	console.log(`Updated site/package.json version to ${version}`);
}

main();
