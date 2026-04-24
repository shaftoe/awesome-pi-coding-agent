import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AstroIntegration } from "astro";

/**
 * Astro integration that generates the search index JSON at build time.
 * Reads the pipeline's data/ directory and writes public/search-index.json.
 *
 * Note: Integration hooks run after Vite's module runner is closed at build time,
 * so we can't use the @pipeline alias or dynamic imports here. The displayName
 * helper is inlined — the canonical version lives in src/lib/site-data.ts.
 */

// ─── Category list (canonical: src/lib/site-data.ts CATEGORY_ORDER) ────────────

const CATEGORIES = [
	"extension",
	"tool",
	"theme",
	"provider",
	"template",
	"video",
	"example",
	"documentation",
] as const;

// ─── Inline helpers (canonical: src/lib/site-data.ts & src/lib/html.ts) ────────

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

// ─── Integration ───────────────────────────────────────────────────────────────

export function searchIndex(): AstroIntegration {
	return {
		name: "awesome-pi-search-index",
		hooks: {
			"astro:build:start": () => {
				const dataDir = join(process.cwd(), "..", "data");
				const outFile = join(process.cwd(), "public", "search-index.json");

				interface Entry {
					id: string;
					name: string;
					url: string;
					description: string;
					category: string;
					health: { score: number; level: string };
					metadata: Record<string, unknown>;
				}

				const entries: Entry[] = [];
				for (const cat of CATEGORIES) {
					const dir = join(dataDir, `${cat}s`);
					if (!existsSync(dir)) continue;
					for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
						const raw = readFileSync(join(dir, file), "utf-8");
						entries.push({ ...JSON.parse(raw), category: cat });
					}
				}

				const index = entries.map((e) => ({
					n: displayName(e),
					d: e.description || "",
					c: e.category,
					u: e.url,
					h: e.health.level,
					s: (e.metadata.stars as number) ?? 0,
				}));

				mkdirSync(join(process.cwd(), "public"), { recursive: true });
				writeFileSync(outFile, JSON.stringify(index), "utf-8");
				// biome-ignore lint/suspicious/noConsole: build logging
				console.log(`[search-index] Wrote ${index.length} entries to public/search-index.json`);
			},
		},
	};
}
