import "../core/temporal.ts";

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test, vi } from "vitest";
import { Cache } from "../core/cache.ts";
import { Category, EntrySource } from "../core/types.ts";
import { DiscoveryWriter } from "../discover/writer.ts";
import { classifyEntry } from "../enrich/classify.ts";
import { createNpmSource } from "./npm.ts";
import { declaresPiExtension } from "./npm-manifest.ts";

test.each([
	[{ pi: { skills: ["./skills"] } }, true],
	[{ pi: { extensions: ["./index.ts"] } }, true],
	[{ pi: { skills: [], extensions: ["  "] } }, false],
	[{ pi: { themes: ["./theme.json"] } }, false],
	[{ pi: { skills: "skills" } }, false],
	[null, false],
])("reads the Pi declaration in %j", (manifest, expected) => {
	expect(declaresPiExtension(manifest)).toBe(expected);
});

test("looks up only fallback candidates and reuses the exact version offline", async () => {
	const dir = mkdtempSync(join(tmpdir(), "pi-manifest-"));
	const registry = vi.fn(async () => Response.json({ pi: { skills: ["./skills"] } }));
	vi.stubGlobal("fetch", registry);
	try {
		const cache = new Cache({ dir: join(dir, "cache") });
		const writer = new DiscoveryWriter(join(dir, "candidates"));
		writer.init();
		function add(name: string, version: string) {
			writer.write("npm", {
				id: name,
				url: `https://www.npmjs.com/package/${name}`,
				source: EntrySource.NpmSearch,
				metadata: { version, description: "" },
			});
		}
		function category() {
			const candidate = writer
				.listByDiscoverer("npm")
				.find((line) => line.discovery.id === "@example/archive")?.discovery;
			if (!candidate?.metadata || !candidate.id) throw new Error("missing package");
			return classifyEntry({
				...candidate,
				id: candidate.id,
				name: candidate.id,
				metadata: candidate.metadata,
				description: "",
			}).category;
		}
		add("@example/archive", "1.2.0");
		add("pi-already-classified", "1.2.0");
		expect(category()).toBe(Category.Misc);
		await createNpmSource(cache).enrich?.(writer);
		expect(registry).toHaveBeenCalledExactlyOnceWith(
			"https://registry.npmjs.org/%40example%2Farchive/1.2.0",
			undefined,
		);
		expect(category()).toBe(Category.Extension);
		add("@example/archive", "1.2.0");
		const offline = createNpmSource(cache, { offline: true });
		await offline.enrich?.(writer);
		expect(category()).toBe(Category.Extension);
		add("@example/archive", "1.3.0");
		await offline.enrich?.(writer);
		expect(category()).toBe(Category.Misc);
		expect(registry).toHaveBeenCalledTimes(1);
		await writer.flush();
	} finally {
		vi.unstubAllGlobals();
		rmSync(dir, { recursive: true, force: true });
	}
});
