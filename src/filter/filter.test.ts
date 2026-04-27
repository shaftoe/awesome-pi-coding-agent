import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import { buildFilterContext, isRelevant } from "./filter.ts";

// ─── Mock blacklist so tests don't touch the real file ─────────────────────────

const mockBlacklist = new Set<string>();

mock.module("../core/blacklist.ts", () => ({
	isBlacklisted: (url: string) => mockBlacklist.has(url),
	addToBlacklist: (url: string, _reason: string, _opts?: Record<string, unknown>) => {
		if (mockBlacklist.has(url)) return false;
		mockBlacklist.add(url);
		return true;
	},
	loadBlacklist: () => ({ entries: [], urlSet: new Set() }),
	saveBlacklist: () => {},
	invalidateBlacklistCache: () => {},
}));

beforeEach(() => mockBlacklist.clear());
afterEach(() => mockBlacklist.clear());

// ─── Helpers ───────────────────────────────────────────────────────────────────

function rejectionReason(verdict: { accept: boolean; reason?: string }): string {
	if (verdict.accept) throw new Error("Expected rejection, got acceptance");
	return verdict.reason ?? "";
}

function candidate(overrides: {
	url: string;
	id?: string;
	description?: string;
	topics?: string[];
	keywords?: string[];
}): { url: string; id?: string; metadata: Record<string, unknown> } {
	const result: { url: string; id?: string; metadata: Record<string, unknown> } = {
		url: overrides.url,
		metadata: {
			description: overrides.description ?? "",
			topics: overrides.topics ?? [],
			keywords: overrides.keywords ?? [],
		},
	};
	if (overrides.id !== undefined) result.id = overrides.id;
	return result;
}

// ─── buildFilterContext ────────────────────────────────────────────────────────

describe("buildFilterContext", () => {
	it("extracts npm package name as id", () => {
		const ctx = buildFilterContext(
			candidate({ url: "https://www.npmjs.com/package/@scope/my-pkg", id: "@scope/my-pkg" }),
		);
		expect(ctx.name).toBe("@scope/my-pkg");
	});

	it("extracts repo name from GitHub URL when no id", () => {
		const ctx = buildFilterContext(candidate({ url: "https://github.com/owner/my-repo" }));
		expect(ctx.name).toBe("my-repo");
	});

	it("combines name and description", () => {
		const ctx = buildFilterContext(
			candidate({ url: "https://example.com/x", id: "pi-tool", description: "A great tool" }),
		);
		expect(ctx.combined).toBe("pi-tool a great tool");
	});
});

// ─── Blocked scopes ────────────────────────────────────────────────────────────

describe("isRelevant — blocked scopes", () => {
	for (const scope of ["@stdlib", "@aws-sdk", "@elastic", "@octokit", "@spotify"]) {
		it(`rejects ${scope}/* packages`, () => {
			const result = isRelevant(
				candidate({
					url: `https://www.npmjs.com/package/${scope}/some-package`,
					id: `${scope}/some-package`,
					description: "A generic package",
				}),
			);
			expect(result.accept).toBe(false);
			expect(rejectionReason(result)).toContain("blocked scope");
		});
	}
});

// ─── Blocked names ─────────────────────────────────────────────────────────────

describe("isRelevant — blocked exact names", () => {
	it("rejects micromark", () => {
		const result = isRelevant(
			candidate({ url: "https://www.npmjs.com/package/micromark", id: "micromark" }),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("blocked name");
	});

	it("rejects tempy", () => {
		const result = isRelevant(
			candidate({ url: "https://www.npmjs.com/package/tempy", id: "tempy" }),
		);
		expect(result.accept).toBe(false);
	});
});

// ─── Raspberry Pi ──────────────────────────────────────────────────────────────

describe("isRelevant — Raspberry Pi signals", () => {
	it("rejects 'raspberry' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/x/rpi-gpio",
				description: "A Raspberry Pi GPIO library",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("raspberry pi signal");
	});

	it("rejects 'rp2040' in URL", () => {
		const result = isRelevant(
			candidate({ url: "https://github.com/x/rp2040-project", description: "RP2040 firmware" }),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects raspberry-pi topic", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/x/proj",
				description: "Hardware",
				topics: ["raspberry-pi", "iot"],
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("raspberry pi topic");
	});

	it("rejects rp2040 topic", () => {
		const result = isRelevant(
			candidate({ url: "https://github.com/x/proj", description: "Hardware", topics: ["rp2040"] }),
		);
		expect(result.accept).toBe(false);
	});
});

// ─── Mathematical π ────────────────────────────────────────────────────────────

describe("isRelevant — mathematical π rejection", () => {
	it("rejects 'const-pi' package", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/const-pi",
				id: "const-pi",
				description: "Pi.",
			}),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects 'generate-pi' package", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/generate-pi",
				id: "generate-pi",
				description: "Find PI to the Nth Digit",
			}),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects bare 'pi' package", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pi",
				id: "pi",
				description: "Going deeper inside PI.",
			}),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects description with 'digits of pi'", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/math-lib",
				id: "math-lib",
				description: "Calculate digits of pi",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("mathematical pi");
	});
});

// ─── PixiJS ────────────────────────────────────────────────────────────────────

describe("isRelevant — PixiJS rejection", () => {
	it("rejects @pixi/animate", () => {
		const result = isRelevant(
			candidate({ url: "https://www.npmjs.com/package/@pixi/animate", id: "@pixi/animate" }),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects pixi-tiledmap", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pixi-tiledmap",
				id: "pixi-tiledmap",
				description: "Tiled Map for PixiJS v8",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("pixijs");
	});

	it("rejects pixijs topic", () => {
		const result = isRelevant(
			candidate({ url: "https://github.com/x/game", description: "A game", topics: ["pixijs"] }),
		);
		expect(result.accept).toBe(false);
	});
});

// ─── Pi Network ────────────────────────────────────────────────────────────────

describe("isRelevant — Pi Network crypto", () => {
	it("rejects 'pi network' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/tec-sdk",
				id: "tec-sdk",
				description: "Bridge for Pi Network Microservices",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("pi network");
	});
});

// ─── AVEVA PI / industrial ─────────────────────────────────────────────────────

describe("isRelevant — AVEVA PI / industrial", () => {
	it("rejects 'aveva' in description", () => {
		const result = isRelevant(
			candidate({ url: "https://www.youtube.com/watch?v=123", description: "AVEVA PI System" }),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("industrial");
	});

	it("rejects 'osisoft' in description", () => {
		const result = isRelevant(
			candidate({ url: "https://github.com/x/tool", description: "OSIsoft PI Server connector" }),
		);
		expect(result.accept).toBe(false);
	});
});

// ─── Unrelated ecosystems ─────────────────────────────────────────────────────

describe("isRelevant — unrelated ecosystems", () => {
	it("rejects Tiptap extension", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/tiptap-extension-resize-image",
				id: "tiptap-extension-resize-image",
				description: "A tiptap extension",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("unrelated ecosystem");
	});

	it("rejects Node-RED contribution", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/node-red-contrib-alexa",
				id: "node-red-contrib-alexa",
			}),
		);
		expect(result.accept).toBe(false);
	});
});

// ─── Positive name patterns ────────────────────────────────────────────────────

describe("isRelevant — positive name patterns", () => {
	it("accepts names starting with 'pi-'", () => {
		expect(
			isRelevant(
				candidate({ url: "https://www.npmjs.com/package/pi-extension", id: "pi-extension" }),
			).accept,
		).toBe(true);
	});

	it("accepts names starting with 'pi_'", () => {
		expect(
			isRelevant(candidate({ url: "https://www.npmjs.com/package/pi_skill", id: "pi_skill" }))
				.accept,
		).toBe(true);
	});

	it("accepts scoped @scope/pi-* packages", () => {
		expect(
			isRelevant(
				candidate({
					url: "https://www.npmjs.com/package/@my-org/pi-tools",
					id: "@my-org/pi-tools",
				}),
			).accept,
		).toBe(true);
	});

	it("accepts 'pi-coding-agent' in name", () => {
		expect(
			isRelevant(
				candidate({
					url: "https://www.npmjs.com/package/my-pi-coding-agent-tool",
					id: "my-pi-coding-agent-tool",
				}),
			).accept,
		).toBe(true);
	});

	it("accepts 'pi-mono' exactly", () => {
		expect(
			isRelevant(candidate({ url: "https://www.npmjs.com/package/pi-mono", id: "pi-mono" })).accept,
		).toBe(true);
	});
});

// ─── Positive text signals ─────────────────────────────────────────────────────

describe("isRelevant — positive text signals", () => {
	it("accepts 'pi coding agent' in description", () => {
		expect(
			isRelevant(
				candidate({
					url: "https://www.npmjs.com/package/my-tool",
					id: "my-tool",
					description: "A tool for the pi coding agent",
				}),
			).accept,
		).toBe(true);
	});

	it("accepts 'pi.dev' in description", () => {
		expect(
			isRelevant(
				candidate({
					url: "https://www.npmjs.com/package/my-tool",
					id: "my-tool",
					description: "Built for pi.dev",
				}),
			).accept,
		).toBe(true);
	});

	it("accepts pi-agent topic", () => {
		expect(
			isRelevant(
				candidate({
					url: "https://github.com/x/proj",
					description: "A project",
					topics: ["pi-agent"],
				}),
			).accept,
		).toBe(true);
	});

	it("accepts pi-coding-agent topic", () => {
		expect(
			isRelevant(
				candidate({
					url: "https://github.com/x/proj",
					description: "A project",
					topics: ["pi-coding-agent"],
				}),
			).accept,
		).toBe(true);
	});
});

// ─── Positive keywords ─────────────────────────────────────────────────────────

describe("isRelevant — pi-package keyword", () => {
	it("accepts package with 'pi-package' keyword", () => {
		expect(
			isRelevant(
				candidate({ url: "https://www.npmjs.com/package/x", id: "x", keywords: ["pi-package"] }),
			).accept,
		).toBe(true);
	});

	it("accepts package with 'pi-extension' keyword", () => {
		expect(
			isRelevant(
				candidate({ url: "https://www.npmjs.com/package/x", id: "x", keywords: ["pi-extension"] }),
			).accept,
		).toBe(true);
	});

	it("accepts package with 'pi-theme' keyword", () => {
		expect(
			isRelevant(
				candidate({ url: "https://www.npmjs.com/package/x", id: "x", keywords: ["pi-theme"] }),
			).accept,
		).toBe(true);
	});
});

// ─── Default accept ────────────────────────────────────────────────────────────

describe("isRelevant — default reject for ambiguous", () => {
	it("rejects GitHub repo with no Pi signals", () => {
		const result = isRelevant(
			candidate({ url: "https://github.com/x/proj", description: "A generic project" }),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("no positive Pi coding agent signal");
	});

	it("rejects npm package with no Pi signals", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/generic-thing",
				id: "generic-thing",
				description: "A generic thing",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("no positive Pi coding agent signal");
	});
});

// ─── Non-English language ──────────────────────────────────────────────────────

describe("isRelevant — non-English rejection", () => {
	it("rejects Cyrillic (Russian) in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.youtube.com/watch?v=x",
				description: "Собрал кпк на lichee pi zero",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("non-english");
	});

	it("rejects CJK (Chinese) in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/math-skill",
				id: "math-skill",
				description: "数学思想武器",
			}),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects Japanese (Hiragana) even with 'pi coding agent'", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/x",
				description: "これはテストです pi coding agent",
			}),
		);
		expect(result.accept).toBe(false);
	});

	it("allows English-only text", () => {
		expect(
			isRelevant(
				candidate({
					url: "https://www.npmjs.com/package/pi-extension",
					id: "pi-extension",
					description: "A great pi extension",
				}),
			).accept,
		).toBe(true);
	});

	it("allows English text with emoji", () => {
		expect(
			isRelevant(
				candidate({
					url: "https://www.npmjs.com/package/pi-awesome",
					id: "pi-awesome",
					description: "🧛🏻‍♂️ Dark theme for PI",
				}),
			).accept,
		).toBe(true);
	});

	it("rejects German YouTube video (Latin but non-English)", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.youtube.com/watch?v=x",
				description: "Jaives ist ein vollständig selbst gehosteter KI-Assistent",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toBe("non-english language (german)");
	});

	it("rejects Indonesian YouTube video even with Pi mention", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.youtube.com/watch?v=x",
				description: "Update terbaru Zentty — Cursor dan Pi coding agents sudah terintegrasi penuh",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toBe("non-english language (indonesian)");
	});
});

// ─── Default reject ────────────────────────────────────────────────────────────

describe("isRelevant — default reject (no positive signal)", () => {
	it("rejects YouTube URL with no positive signal", () => {
		const result = isRelevant(
			candidate({ url: "https://www.youtube.com/watch?v=abc123", description: "A random video" }),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("no positive Pi coding agent signal");
	});

	it("accepts YouTube URL with positive signal", () => {
		expect(
			isRelevant(
				candidate({
					url: "https://www.youtube.com/watch?v=abc123",
					description: "Pi coding agent tutorial",
				}),
			).accept,
		).toBe(true);
	});
});

// ─── Discovery metadata ─────────────────────────────────────────────────────────

describe("isRelevant — discovery metadata", () => {
	it("accepts candidate with discovery metadata and positive signals", () => {
		const result = isRelevant({
			url: "https://www.npmjs.com/package/pi-tool",
			id: "pi-tool",
			metadata: { description: "A pi tool" },
			discovery: { sourceName: "npm", query: "keywords:pi-package" },
		});
		expect(result.accept).toBe(true);
	});

	it("rejects candidate with discovery metadata and no positive signals", () => {
		const result = isRelevant({
			url: "https://www.npmjs.com/package/random-pkg",
			id: "random-pkg",
			metadata: { description: "A random package" },
			discovery: { sourceName: "npm", query: "keywords:pi-package" },
		});
		expect(result.accept).toBe(false);
		expect(mockBlacklist.has("https://www.npmjs.com/package/random-pkg")).toBe(true);
	});
});

// ─── Priority: hard blocks override positive signals ───────────────────────────

describe("isRelevant — hard blocks take priority", () => {
	it("blocks even with 'pi-coding-agent' when scope is blocked", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/@aws-sdk/pi-coding-agent",
				id: "@aws-sdk/pi-coding-agent",
				description: "A pi coding agent tool",
			}),
		);
		expect(result.accept).toBe(false);
	});
});
