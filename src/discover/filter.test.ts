/**
 * Tests for the relevance filter — the first line of defense against
 * unrelated candidates (Raspberry Pi, blocked scopes, false positives).
 */
import { describe, expect, it } from "bun:test";
import { isRelevant } from "./filter.ts";

// ─── Helper ────────────────────────────────────────────────────────────────────

function candidate(overrides: {
	url: string;
	id?: string;
	description?: string;
	topics?: string[];
}): { url: string; id?: string; metadata: Record<string, unknown> } {
	const result: { url: string; id?: string; metadata: Record<string, unknown> } = {
		url: overrides.url,
		metadata: {
			description: overrides.description ?? "",
			topics: overrides.topics ?? [],
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
});
