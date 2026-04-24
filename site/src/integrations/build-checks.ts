import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { AstroIntegration } from "astro";

/**
 * Post-build smoke tests — asserts the generated site contains
 * real content and catches regressions like empty data loads.
 */
export function buildChecks(): AstroIntegration {
	return {
		name: "awesome-pi-build-checks",
		hooks: {
			"astro:build:done": async ({ dir }) => {
				const distDir = dir.href.replace("file://", "");
				const errors: string[] = [];

				// 1. Index page must exist and contain a non-zero resource count
				const indexPath = join(distDir, "index.html");
				if (!existsSync(indexPath)) {
					errors.push("index.html not found in build output");
				} else {
					const indexHtml = readFileSync(indexPath, "utf-8");

					const countMatch = indexHtml.match(/(\d[\d,]*)\s+resources/);
					if (!countMatch) {
						errors.push("index.html: resource count pattern not found");
					} else {
						const count = Number.parseInt(countMatch[1].replace(/,/g, ""), 10);
						if (count === 0) {
							errors.push("index.html: resource count is 0 — data likely failed to load");
						} else if (count < 100) {
							errors.push(`index.html: resource count (${count}) suspiciously low — expected >100`);
						}
					}

					// Must contain category cards
					if (!indexHtml.includes("category-card")) {
						errors.push("index.html: no category cards found");
					}
				}

				// 2. At least extensions page must exist and contain entries
				const extPath = join(distDir, "extensions", "index.html");
				if (!existsSync(extPath)) {
					errors.push("extensions/index.html not found in build output");
				} else {
					const extHtml = readFileSync(extPath, "utf-8");
					if (!extHtml.includes("entry-card")) {
						errors.push("extensions/index.html: no entry cards found");
					}
				}

				// 3. Search index must exist and have entries
				const searchPath = join(distDir, "search-index.json");
				if (!existsSync(searchPath)) {
					errors.push("search-index.json not found in build output");
				} else {
					const searchData = JSON.parse(readFileSync(searchPath, "utf-8")) as unknown[];
					if (searchData.length < 100) {
						errors.push(`search-index.json: only ${searchData.length} entries — expected >100`);
					}
				}

				if (errors.length > 0) {
					const msg = errors.map((e) => `  ✗ ${e}`).join("\n");
					throw new Error(`Build checks failed:\n${msg}`);
				}

				// biome-ignore lint/suspicious/noConsole: build logging
				console.log("[build-checks] ✓ All post-build checks passed");
			},
		},
	};
}
