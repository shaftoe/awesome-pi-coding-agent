import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AstroIntegration } from "astro";

/**
 * Astro integration that generates the search index JSON at build time.
 * Reads the pipeline's flat data/entries/ directory and writes public/search-index.json.
 *
 * Note: Integration hooks run after Vite's module runner is closed at build time,
 * so we can't use the @pipeline alias or dynamic imports here. The displayName
 * helper is inlined — the canonical version lives in site/src/lib/format.ts.
 */

// ─── Inline helpers (canonical: site/src/lib/format.ts) ──────────────────────

function decodeHtmlEntities(s: string): string {
	return s
		.replace(/&#39;/g, "'")
		.replace(/&#x27;/g, "'")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"');
}

function displayName(e: {
	id: string;
	url: string;
	name: string;
	metadata: Record<string, unknown>;
}): string {
	if (e.id.startsWith("YT_")) {
		const raw = (e.metadata["title"] as string) || e.id.replace("YT_", "");
		return decodeHtmlEntities(raw);
	}
	if (e.url.includes("github.com/")) {
		const match = e.url.match(/github\.com\/[^/]+\/([^/]+)/);
		if (match?.[1]) return match[1];
	}
	return e.name || e.id;
}

function formatNumber(n: number): string {
	if (n >= 1000) {
		const v = n / 1000;
		return v % 1 === 0 ? `${v}k` : `${v.toFixed(1)}k`;
	}
	return String(n);
}

// ─── Integration ───────────────────────────────────────────────────────────────

export function searchIndex(): AstroIntegration {
	return {
		name: "awesome-pi-search-index",
		hooks: {
			"astro:build:start": () => {
				const dataDir = join(process.cwd(), "..", "data", "entries");
				const outFile = join(process.cwd(), "public", "search-index.json");

				if (!existsSync(dataDir)) {
					mkdirSync(join(process.cwd(), "public"), { recursive: true });
					writeFileSync(outFile, "[]", "utf-8");
					// biome-ignore lint/suspicious/noConsole: build logging
					console.warn(
						`[search-index] No entries directory found at ${dataDir}, wrote empty index`,
					);
					return;
				}

				const entries: Array<{
					id: string;
					name: string;
					url: string;
					description: string;
					category: string;
					health: { score: number; level: string };
					metadata: Record<string, unknown>;
				}> = [];

				for (const file of readdirSync(dataDir).filter((f) => f.endsWith(".json"))) {
					const raw = readFileSync(join(dataDir, file), "utf-8");
					entries.push(JSON.parse(raw));
				}

				const index = entries.map((e) => {
					// Source-aware popularity
					const meta = e.metadata;
					let pop = 0;
					let popLabel = "";
					if (typeof meta["views"] === "number" && (meta["views"] as number) > 0) {
						pop = meta["views"] as number;
						popLabel = `📺${formatNumber(pop)}`;
					} else if (typeof meta["stars"] === "number" && (meta["stars"] as number) > 0) {
						pop = meta["stars"] as number;
						popLabel = `⭐${formatNumber(pop)}`;
					} else if (
						typeof meta["npm_downloads_monthly"] === "number" &&
						(meta["npm_downloads_monthly"] as number) > 0
					) {
						pop = meta["npm_downloads_monthly"] as number;
						popLabel = `⬇ ${formatNumber(pop)}/mo`;
					}

					return {
						n: displayName(e),
						d: e.description || "",
						c: e.category,
						u: e.url,
						h: e.health.level,
						s: pop,
						p: popLabel,
					};
				});

				mkdirSync(join(process.cwd(), "public"), { recursive: true });
				writeFileSync(outFile, JSON.stringify(index), "utf-8");
				// biome-ignore lint/suspicious/noConsole: build logging
				console.log(`[search-index] Wrote ${index.length} entries to public/search-index.json`);
			},
		},
	};
}
