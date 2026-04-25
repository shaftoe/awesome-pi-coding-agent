/**
 * Tests for the relevance filter — the first line of defense against
 * unrelated candidates (Raspberry Pi, mathematical π, PixiJS, Pi Network,
 * AVEVA PI, Tiptap, SAP, Pimcore, and other false positives).
 */
import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import { isRelevant } from "./filter.ts";

// ─── Mock blacklist module ─────────────────────────────────────────────────────
// Tests must not write to the real blacklist.json, so we mock out the blacklist
// operations that the filter calls.

const mockBlacklist = new Set<string>();

mock.module("../lib/blacklist.ts", () => ({
	isBlacklisted: (url: string) => mockBlacklist.has(url),
	addToBlacklist: (url: string, _reason: string) => {
		if (mockBlacklist.has(url)) return false;
		mockBlacklist.add(url);
		return true;
	},
}));

beforeEach(() => mockBlacklist.clear());
afterEach(() => mockBlacklist.clear());

// ─── Helper ────────────────────────────────────────────────────────────────────

/** Extract rejection reason (type-safe). Throws if verdict is an acceptance. */
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
	if (overrides.id !== undefined) {
		result.id = overrides.id;
	}
	return result;
}

// ─── Blocked scopes ────────────────────────────────────────────────────────────

describe("isRelevant — blocked scopes", () => {
	const blockedScopes = ["@stdlib", "@aws-sdk", "@elastic", "@octokit", "@spotify"];

	for (const scope of blockedScopes) {
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
			candidate({
				url: "https://www.npmjs.com/package/micromark",
				id: "micromark",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("blocked name");
	});

	it("rejects tempy", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/tempy",
				id: "tempy",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("blocked name");
	});
});

// ─── Raspberry Pi rejection ────────────────────────────────────────────────────

describe("isRelevant — Raspberry Pi signals", () => {
	it("rejects 'raspberry' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/rpi-gpio",
				description: "A Raspberry Pi GPIO library",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("raspberry pi signal");
	});

	it("rejects 'rp2040' in URL", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/rp2040-project",
				description: "RP2040 firmware",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("raspberry pi signal");
	});

	it("rejects 'wiringpi' in name", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/wiringpi",
				id: "wiringpi",
				description: "GPIO access for Raspberry Pi",
			}),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects 'raspberrypi' in name", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/raspberrypi-tools",
				id: "raspberrypi-tools",
			}),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects raspberry-pi topic", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/some-project",
				description: "A hardware project",
				topics: ["raspberry-pi", "iot"],
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("raspberry pi topic");
	});

	it("rejects rp2040 topic", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/some-project",
				description: "A hardware project",
				topics: ["rp2040"],
			}),
		);
		expect(result.accept).toBe(false);
	});
});

// ─── Positive name patterns ────────────────────────────────────────────────────

describe("isRelevant — positive name patterns", () => {
	it("accepts names starting with 'pi-'", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pi-extension",
				id: "pi-extension",
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("accepts names starting with 'pi_'", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pi_skill",
				id: "pi_skill",
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("accepts scoped @scope/pi-* packages", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/@my-org/pi-tools",
				id: "@my-org/pi-tools",
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("accepts 'pi-coding-agent' in name", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/my-pi-coding-agent-tool",
				id: "my-pi-coding-agent-tool",
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("accepts 'pi-mcp' in name", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pi-mcp",
				id: "pi-mcp",
			}),
		);
		expect(result.accept).toBe(true);
	});
});

// ─── Positive text signals ─────────────────────────────────────────────────────

describe("isRelevant — positive text signals", () => {
	it("accepts 'pi coding agent' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/my-tool",
				id: "my-tool",
				description: "A tool for the pi coding agent",
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("accepts 'pi.dev' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/my-tool",
				id: "my-tool",
				description: "Built for pi.dev ecosystem",
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("accepts 'pi extension' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/some-tool",
				id: "some-tool",
				description: "A pi extension for workflow automation",
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("accepts 'mariozechner/pi' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/some-wrapper",
				description: "Wrapper around mariozechner/pi",
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("accepts pi-agent topic", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/some-project",
				description: "A project",
				topics: ["pi-agent"],
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("accepts pi-coding-agent topic", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/some-project",
				description: "A project",
				topics: ["pi-coding-agent"],
			}),
		);
		expect(result.accept).toBe(true);
	});
});

// ─── Default accept (ambiguous) ────────────────────────────────────────────────

describe("isRelevant — default accept for ambiguous candidates", () => {
	it("accepts an ambiguous GitHub repo with no signals", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/some-project",
				description: "A generic project",
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("accepts an ambiguous npm package", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/generic-thing",
				id: "generic-thing",
				description: "A generic thing",
			}),
		);
		expect(result.accept).toBe(true);
	});
});

// ─── Mathematical π rejection ──────────────────────────────────────────────────

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
		// Caught by either blocked name or mathematical pi signal
		expect(rejectionReason(result)).toMatch(/blocked name|mathematical pi/);
	});

	it("rejects 'generate-pi' package", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/generate-pi",
				id: "generate-pi",
				description: "Find PI(π) to the Nth Digit",
			}),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects bare 'pi' package", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pi",
				id: "pi",
				description: "Going deeper inside of the PI number.",
			}),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects description with 'digits of pi'", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/some-math-lib",
				id: "some-math-lib",
				description: "Calculate digits of pi to any precision",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("mathematical pi");
	});

	it("rejects description with 'irrational number'", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/math-tool",
				id: "math-tool",
				description: "An irrational number library for computing constants",
			}),
		);
		expect(result.accept).toBe(false);
	});
});

// ─── PixiJS rejection ───────────────────────────────────────────────────────────

describe("isRelevant — PixiJS game library rejection", () => {
	it("rejects @pixi/animate", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/@pixi/animate",
				id: "@pixi/animate",
				description: "PIXI plugin for the PixiAnimate Extension",
			}),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects pixi-tiledmap", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pixi-tiledmap",
				id: "pixi-tiledmap",
				description: "Tiled Map Editor loader and renderer for PixiJS v8",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("pixijs");
	});

	it("rejects pixijs topic", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/example/pixi-game",
				description: "A game",
				topics: ["pixijs", "game"],
			}),
		);
		expect(result.accept).toBe(false);
	});
});

// ─── Pi Network crypto rejection ────────────────────────────────────────────────

describe("isRelevant — Pi Network cryptocurrency rejection", () => {
	it("rejects 'pi network' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/tec-sdk",
				id: "tec-sdk",
				description: "High-performance bridge for Pi Network Microservices",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("pi network");
	});

	it("rejects 'pi-network' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/example/pi-wallet",
				description: "A pi-network wallet",
			}),
		);
		expect(result.accept).toBe(false);
	});
});

// ─── AVEVA PI / industrial rejection ────────────────────────────────────────────

describe("isRelevant — AVEVA PI / industrial rejection", () => {
	it("rejects 'aveva' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.youtube.com/watch?v=123",
				description: "CONNECT to PI Agent Release — AVEVA PI System",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("industrial");
	});

	it("rejects 'osisoft' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/example/osisoft-tool",
				description: "OSIsoft PI Server connector",
			}),
		);
		expect(result.accept).toBe(false);
	});
});

// ─── Unrelated ecosystem rejection ─────────────────────────────────────────────

describe("isRelevant — unrelated ecosystem rejection", () => {
	it("rejects Tiptap extension", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/tiptap-extension-resize-image",
				id: "tiptap-extension-resize-image",
				description: "A tiptap image resizing extension for React",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("unrelated ecosystem");
	});

	it("rejects Pimcore CMS extension", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/jquery-pimcore-formbuilder",
				id: "jquery-pimcore-formbuilder",
				description: "jQuery Extensions for the PIMCORE Form Builder",
			}),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects Node-RED contribution", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/node-red-contrib-alexa-home-skill",
				id: "node-red-contrib-alexa-home-skill",
				description: "Hook up Node-RED to react to your Amazon Echo",
			}),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects SAP UI5 extension", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/@ui5-language-assistant/vscode-ui5-language-assistant-bas-ext",
				id: "@ui5-language-assistant/vscode-ui5-language-assistant-bas-ext",
				description: "A wrapper module for BAS simple extension around Language Support For SAPUI5",
			}),
		);
		expect(result.accept).toBe(false);
	});

	it("rejects Storybook package", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/storybook-vue3-rsbuild",
				id: "storybook-vue3-rsbuild",
				description: "Storybook for Vue3 and Rsbuild",
			}),
		);
		expect(result.accept).toBe(false);
	});
});

// ─── Keywords positive signal ──────────────────────────────────────────────────

describe("isRelevant — pi-package keyword acceptance", () => {
	it("accepts package with 'pi-package' keyword", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/@artale/pi-agent",
				id: "@artale/pi-agent",
				description: "Agentic engineering toolkit",
				keywords: ["pi-package", "pi-extension", "agent"],
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("accepts package with 'pi-extension' keyword", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/some-tool",
				id: "some-tool",
				description: "A tool",
				keywords: ["pi-extension"],
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("accepts package with 'pi-theme' keyword", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/@aliou/pi-theme-jellybeans",
				id: "@aliou/pi-theme-jellybeans",
				description: "Jellybeans Mono themes for Pi",
				keywords: ["pi-package", "pi-theme", "jellybeans"],
			}),
		);
		expect(result.accept).toBe(true);
	});
});

// ─── Non-English language rejection ──────────────────────────────────────────

describe("isRelevant — non-English language rejection", () => {
	it("rejects Cyrillic (Russian) in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.youtube.com/watch?v=2-1Fh0W0sgQ",
				description: "Собрал кпк на lichee pi zero для экспериментов",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("non-english");
	});

	it("rejects Cyrillic (Bulgarian) in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.youtube.com/watch?v=vNZ0faAEBR0",
				description: "Абонирайте се за мен: https://www.youtube.com/c/MarksferdieBG",
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
				description: "数学思想武器：将数学思维应用到科研和生活中。",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("non-english");
	});

	it("rejects Devanagari (Hindi) in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.youtube.com/watch?v=L4dKFIkh8Vs",
				description: "new धमाका/pearl रैंक का 3,4,5or 6th राउंड ऑटोपुल अपडेट!",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("non-english");
	});

	it("rejects Japanese (Hiragana) in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/some-pkg",
				description: "これはテストです pi coding agent",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("non-english");
	});

	it("rejects Korean (Hangul) in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/some-pkg",
				description: "파이 코딩 에이전트 확장",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toContain("non-english");
	});

	it("allows English-only text", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pi-extension",
				id: "pi-extension",
				description: "A great pi coding agent extension",
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("allows English text with emoji", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pi-awesome",
				id: "pi-awesome",
				description: "🧛🏻‍♂️ Dark theme for PI Coding Agent",
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("allows mixed English/Latin-accented text", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pi-café",
				id: "pi-café",
				description: "Un outil pour l'agent pi coding — dépendance légère",
			}),
		);
		expect(result.accept).toBe(true);
	});

	it("rejects German-only YouTube video (Latin but non-English)", () => {
		// German uses Latin script, so it won't be caught by the non-Latin script filter (1j).
		// However, it's caught by the non-English Latin-script detection (1k) which
		// identifies German via characteristic stop words.
		const result = isRelevant(
			candidate({
				url: "https://www.youtube.com/watch?v=MTaLEOYUgus",
				description: "Jaives ist ein vollständig selbst gehosteter KI-Assistent",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toBe("non-english language (german)");
	});

	it("rejects Indonesian YouTube video even with Pi coding agent mention", () => {
		// Indonesian uses Latin script and mentions "Pi coding agents" but is not English.
		// Caught by non-English Latin-script detection (1k) before positive signals (Layer 2).
		const result = isRelevant(
			candidate({
				url: "https://www.youtube.com/watch?v=F5iIztPOTso",
				description:
					"Update terbaru Zentty (v0.1.12) makin gila! Sekarang Cursor dan Pi coding agents sudah terintegrasi penuh",
			}),
		);
		expect(result.accept).toBe(false);
		expect(rejectionReason(result)).toBe("non-english language (indonesian)");
	});
});

// ─── Priority: hard blocks override positive signals ───────────────────────────

describe("isRelevant — hard blocks take priority over positive signals", () => {
	it("blocks even if 'pi-coding-agent' appears, when scope is blocked", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/@aws-sdk/pi-coding-agent",
				id: "@aws-sdk/pi-coding-agent",
				description: "A pi coding agent tool",
			}),
		);
		// Blocked scope is checked first (Layer 1), so it's rejected
		expect(result.accept).toBe(false);
	});

	it("blocks mathematical pi even if name contains 'pi'", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/generate-pi",
				id: "generate-pi",
				description: "Find PI(π) to the Nth Digit — mathematical constant",
			}),
		);
		expect(result.accept).toBe(false);
	});
});
