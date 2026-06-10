import { describe, expect, test } from "bun:test";

import type { CategorizedEntry, DiscoveryCandidate } from "../core/types.ts";
import { Category, EntrySource } from "../core/types.ts";
import { resolveDuplicateAction, sourcePriority } from "./duplicate-action.ts";

function entryForSource(source: EntrySource): CategorizedEntry {
	return {
		id: "owner-pi-ext",
		name: "owner/pi-ext",
		url:
			source === EntrySource.NpmSearch
				? "https://www.npmjs.com/package/pi-ext"
				: "https://github.com/owner/pi-ext",
		source,
		description: "A Pi extension",
		metadata: {},
		category: Category.Extension,
	};
}

function discoveryForSource(source: EntrySource): DiscoveryCandidate {
	return {
		url:
			source === EntrySource.NpmSearch
				? "https://www.npmjs.com/package/pi-ext"
				: "https://github.com/owner/pi-ext",
		source,
		metadata: {},
	};
}

describe("resolveDuplicateAction", () => {
	test("replaces lower-priority existing entries with higher-priority candidates", () => {
		const discovery = discoveryForSource(EntrySource.NpmSearch);
		const existingEntry = entryForSource(EntrySource.GitHubSearch);

		expect(sourcePriority(discovery.source)).toBeLessThan(sourcePriority(existingEntry.source));
		expect(resolveDuplicateAction(discovery, { existingEntry })).toBe("replace");
	});

	test("refreshes duplicates from the same source", () => {
		const discovery = discoveryForSource(EntrySource.NpmSearch);
		const existingEntry = entryForSource(EntrySource.NpmSearch);

		expect(sourcePriority(discovery.source)).toBe(sourcePriority(existingEntry.source));
		expect(resolveDuplicateAction(discovery, { existingEntry })).toBe("refresh");
	});

	test("skips lower-priority candidates instead of refreshing higher-priority entries", () => {
		const discovery = discoveryForSource(EntrySource.GitHubSearch);
		const existingEntry = entryForSource(EntrySource.NpmSearch);

		expect(sourcePriority(discovery.source)).toBeGreaterThan(sourcePriority(existingEntry.source));
		expect(resolveDuplicateAction(discovery, { existingEntry })).toBe("skip");
	});
});
