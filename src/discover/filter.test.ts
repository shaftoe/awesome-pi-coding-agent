/**
 * Tests for the relevance filter — the first line of defense against
 * unrelated candidates (Raspberry Pi, mathematical π, PixiJS, Pi Network,
 * AVEVA PI, Tiptap, SAP, Pimcore, and other false positives).
 */
import { describe, expect, it } from "bun:test";
import { isRelevant } from "./filter.ts";

// ─── Helper ────────────────────────────────────────────────────────────────────

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
			expect(result.relevant).toBe(false);
			expect(result.reason).toContain("blocked scope");
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
		expect(result.relevant).toBe(false);
		expect(result.reason).toContain("blocked name");
	});

	it("rejects tempy", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/tempy",
				id: "tempy",
			}),
		);
		expect(result.relevant).toBe(false);
		expect(result.reason).toContain("blocked name");
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
		expect(result.relevant).toBe(false);
		expect(result.reason).toContain("raspberry pi signal");
	});

	it("rejects 'rp2040' in URL", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/rp2040-project",
				description: "RP2040 firmware",
			}),
		);
		expect(result.relevant).toBe(false);
		expect(result.reason).toContain("raspberry pi signal");
	});

	it("rejects 'wiringpi' in name", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/wiringpi",
				id: "wiringpi",
				description: "GPIO access for Raspberry Pi",
			}),
		);
		expect(result.relevant).toBe(false);
	});

	it("rejects 'raspberrypi' in name", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/raspberrypi-tools",
				id: "raspberrypi-tools",
			}),
		);
		expect(result.relevant).toBe(false);
	});

	it("rejects raspberry-pi topic", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/some-project",
				description: "A hardware project",
				topics: ["raspberry-pi", "iot"],
			}),
		);
		expect(result.relevant).toBe(false);
		expect(result.reason).toContain("raspberry pi topic");
	});

	it("rejects rp2040 topic", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/some-project",
				description: "A hardware project",
				topics: ["rp2040"],
			}),
		);
		expect(result.relevant).toBe(false);
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
		expect(result.relevant).toBe(true);
	});

	it("accepts names starting with 'pi_'", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pi_skill",
				id: "pi_skill",
			}),
		);
		expect(result.relevant).toBe(true);
	});

	it("accepts scoped @scope/pi-* packages", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/@my-org/pi-tools",
				id: "@my-org/pi-tools",
			}),
		);
		expect(result.relevant).toBe(true);
	});

	it("accepts 'pi-coding-agent' in name", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/my-pi-coding-agent-tool",
				id: "my-pi-coding-agent-tool",
			}),
		);
		expect(result.relevant).toBe(true);
	});

	it("accepts 'pi-mcp' in name", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pi-mcp",
				id: "pi-mcp",
			}),
		);
		expect(result.relevant).toBe(true);
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
		expect(result.relevant).toBe(true);
	});

	it("accepts 'pi.dev' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/my-tool",
				id: "my-tool",
				description: "Built for pi.dev ecosystem",
			}),
		);
		expect(result.relevant).toBe(true);
	});

	it("accepts 'pi extension' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/some-tool",
				id: "some-tool",
				description: "A pi extension for workflow automation",
			}),
		);
		expect(result.relevant).toBe(true);
	});

	it("accepts 'mariozechner/pi' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/some-wrapper",
				description: "Wrapper around mariozechner/pi",
			}),
		);
		expect(result.relevant).toBe(true);
	});

	it("accepts pi-agent topic", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/some-project",
				description: "A project",
				topics: ["pi-agent"],
			}),
		);
		expect(result.relevant).toBe(true);
	});

	it("accepts pi-coding-agent topic", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/某人/some-project",
				description: "A project",
				topics: ["pi-coding-agent"],
			}),
		);
		expect(result.relevant).toBe(true);
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
		expect(result.relevant).toBe(true);
	});

	it("accepts an ambiguous npm package", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/generic-thing",
				id: "generic-thing",
				description: "A generic thing",
			}),
		);
		expect(result.relevant).toBe(true);
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
		expect(result.relevant).toBe(false);
		// Caught by either blocked name or mathematical pi signal
		expect(result.reason).toMatch(/blocked name|mathematical pi/);
	});

	it("rejects 'generate-pi' package", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/generate-pi",
				id: "generate-pi",
				description: "Find PI(π) to the Nth Digit",
			}),
		);
		expect(result.relevant).toBe(false);
	});

	it("rejects bare 'pi' package", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pi",
				id: "pi",
				description: "Going deeper inside of the PI number.",
			}),
		);
		expect(result.relevant).toBe(false);
	});

	it("rejects description with 'digits of pi'", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/some-math-lib",
				id: "some-math-lib",
				description: "Calculate digits of pi to any precision",
			}),
		);
		expect(result.relevant).toBe(false);
		expect(result.reason).toContain("mathematical pi");
	});

	it("rejects description with 'irrational number'", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/math-tool",
				id: "math-tool",
				description: "An irrational number library for computing constants",
			}),
		);
		expect(result.relevant).toBe(false);
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
		expect(result.relevant).toBe(false);
	});

	it("rejects pixi-tiledmap", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/pixi-tiledmap",
				id: "pixi-tiledmap",
				description: "Tiled Map Editor loader and renderer for PixiJS v8",
			}),
		);
		expect(result.relevant).toBe(false);
		expect(result.reason).toContain("pixijs");
	});

	it("rejects pixijs topic", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/example/pixi-game",
				description: "A game",
				topics: ["pixijs", "game"],
			}),
		);
		expect(result.relevant).toBe(false);
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
		expect(result.relevant).toBe(false);
		expect(result.reason).toContain("pi network");
	});

	it("rejects 'pi-network' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/example/pi-wallet",
				description: "A pi-network wallet",
			}),
		);
		expect(result.relevant).toBe(false);
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
		expect(result.relevant).toBe(false);
		expect(result.reason).toContain("industrial");
	});

	it("rejects 'osisoft' in description", () => {
		const result = isRelevant(
			candidate({
				url: "https://github.com/example/osisoft-tool",
				description: "OSIsoft PI Server connector",
			}),
		);
		expect(result.relevant).toBe(false);
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
		expect(result.relevant).toBe(false);
		expect(result.reason).toContain("unrelated ecosystem");
	});

	it("rejects Pimcore CMS extension", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/jquery-pimcore-formbuilder",
				id: "jquery-pimcore-formbuilder",
				description: "jQuery Extensions for the PIMCORE Form Builder",
			}),
		);
		expect(result.relevant).toBe(false);
	});

	it("rejects Node-RED contribution", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/node-red-contrib-alexa-home-skill",
				id: "node-red-contrib-alexa-home-skill",
				description: "Hook up Node-RED to react to your Amazon Echo",
			}),
		);
		expect(result.relevant).toBe(false);
	});

	it("rejects SAP UI5 extension", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/@ui5-language-assistant/vscode-ui5-language-assistant-bas-ext",
				id: "@ui5-language-assistant/vscode-ui5-language-assistant-bas-ext",
				description: "A wrapper module for BAS simple extension around Language Support For SAPUI5",
			}),
		);
		expect(result.relevant).toBe(false);
	});

	it("rejects Storybook package", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/storybook-vue3-rsbuild",
				id: "storybook-vue3-rsbuild",
				description: "Storybook for Vue3 and Rsbuild",
			}),
		);
		expect(result.relevant).toBe(false);
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
		expect(result.relevant).toBe(true);
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
		expect(result.relevant).toBe(true);
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
		expect(result.relevant).toBe(true);
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
		expect(result.relevant).toBe(false);
	});

	it("blocks mathematical pi even if name contains 'pi'", () => {
		const result = isRelevant(
			candidate({
				url: "https://www.npmjs.com/package/generate-pi",
				id: "generate-pi",
				description: "Find PI(π) to the Nth Digit — mathematical constant",
			}),
		);
		expect(result.relevant).toBe(false);
	});
});
