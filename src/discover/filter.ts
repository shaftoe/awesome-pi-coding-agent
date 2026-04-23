/**
 * Relevance filter — reject candidates that are clearly not about the Pi coding agent.
 *
 * Three-layer filtering:
 *   Layer 1 — Hard blocks:  blocked scopes, names, and strong negative signals
 *   Layer 2 — Positive signals:  explicit Pi coding agent markers override all
 *   Layer 3 — Default:  accept ambiguous candidates (blacklist catches stragglers)
 *
 * The heuristics below are derived from manual review of 2600+ discovered entries.
 * See data/blacklist.json for edge cases not worth encoding as rules.
 *
 * Key false-positive patterns this filter catches:
 *   - Raspberry Pi / RP2040 / I2C hardware projects
 *   - Mathematical π libraries (const-pi, generate-pi, etc.)
 *   - PixiJS game library ecosystem (@pixi/*, pixi-tiledmap, etc.)
 *   - Pi Network cryptocurrency (pi-network, pinet)
 *   - AVEVA PI / industrial SCADA systems
 *   - Generic agent tools with no Pi support (Claude-only, Cursor-only, etc.)
 *   - Tiptap rich text editor extensions
 *   - SAP/OpenUI5, Pimcore CMS, Node-RED, and other unrelated ecosystems
 */

// ─── Negative signals ──────────────────────────────────────────────────────────

/** Strings in name/description that mean "Raspberry Pi, not Pi coding agent". */
const RASPBERRY_PI_SIGNALS = [
	"raspberry",
	"rp2040",
	"raspberrypi",
	"wiringpi",
	"pigpio",
	"beaglebone", // ARM board often paired with RPi
	"smbus", // I2C/SMBus hardware
];

/**
 * Package/repo names that are mathematical π, not Pi coding agent.
 * Exact matches only (lowercased).
 */
const MATH_PI_NAMES = new Set([
	"pi",
	"const-pi",
	"generate-pi",
	"stringify-pi",
	"pi-digit",
	"pi-digits",
	"compute-pi",
	"calc-pi",
	"pi-approximation",
	"pi-calculator",
]);

/**
 * Text signals in description/keywords that indicate mathematical π, not Pi coding agent.
 * These are case-insensitive substring checks.
 */
const MATH_PI_SIGNALS = [
	"nth digit",
	"digits of pi",
	"irrational number",
	"mathematical constant",
	"value of π",
	"value of pi",
	"calculate pi",
	"compute pi",
	"decimal places of pi",
];

/**
 * Package scopes/names that are the PixiJS game library, not Pi coding agent.
 * PixiJS uses "pixi" in many packages and is a frequent false positive.
 */
const PIXIJS_SIGNALS = [
	"@pixi/",
	"pixi.js",
	"pixijs",
	"pixi-tiledmap",
	"pixi-animate",
	"pixi-spine",
	"pixi-sound",
	"pixi-viewport",
];

/**
 * Text signals indicating Pi Network cryptocurrency, not Pi coding agent.
 */
const PI_NETWORK_SIGNALS = [
	"pi network",
	"pi-network",
	"pi cryptocurrency",
	"pi blockchain",
	"pi coin",
	"pi wallet",
	"pi app",
	"pinet",
];

/**
 * Text signals indicating AVEVA PI / industrial systems, not Pi coding agent.
 */
const INDUSTRIAL_PI_SIGNALS = ["aveva", "pi system", "osisoft", "pi server", "historian"];

/**
 * Ecosystems that use "extension", "skill", or "agent" in their packages
 * but are completely unrelated to Pi coding agent.
 */
const UNRELATED_ECOSYSTEMS = [
	"@tiptap/", // Rich text editor
	"tiptap-extension",
	"pimcore", // CMS
	"node-red-contrib", // Node-RED flows
	"@ui5-language-assistant", // SAP UI5
	"@opentiny/", // Vue UI lib
	"storybook", // Component stories
	"@capawesome/", // Capacitor plugins
	"@adobe/reactor-", // Adobe Launch
	"@netlify/", // Netlify platform
	"@tomtom-org/", // TomTom maps
	"@diplodoc/", // Diplodoc documentation platform
	"@agentcash/", // AgentCash ecosystem (x402 payment protocol)
];

/** Package scopes/orgs that are never about Pi coding agent. */
const BLOCKED_SCOPES = new Set([
	"@stdlib",
	"@aws-sdk",
	"@elastic",
	"@octokit",
	"@spotify",
	"@statoscope",
	"@sprucelabs",
	"@digipair",
	"@bankofbots",
	"@oh-my-pi", // Non-compatible fork — see https://github.com/can1357/oh-my-pi
	"@pixi", // PixiJS game library
	"@tiptap", // Rich text editor
	"@opentiny", // Enterprise Vue UI
	"@capawesome", // Capacitor mobile plugins
	"@adobe/reactor", // Adobe Launch extension system
	"@ui5-language-assistant", // SAP UI5
	"@redux-devtools", // Redux devtools
	"@substrate", // Blockchain framework
	"@mux", // Video analytics
	"@vscode", // VS Code built-in
	"@lexical", // Meta's editor
	"@types", // DefinitelyTyped type definitions — never Pi coding agent packages
	"@diplodoc", // Diplodoc documentation platform
	"@agentcash", // AgentCash x402 payment protocol ecosystem
]);

/** Exact package/repo names that are definitely unrelated. */
const BLOCKED_NAMES = new Set([
	"openapi-format", // OpenAPI spec formatter
	"docsalot-cli", // OpenAPI docs scaffold
	"notionapi-agent", // Notion API client
	"google-research-pisac", // TensorFlow RL research (PI-SAC agent)
	"micromark",
	"tempy",
	"appdynamics",
	"useragent",
	"docker-modem",
	"node-fetch-native",
	"freeturtle",
	"http-cookie-agent",
	"storybook-builder-rsbuild",
	"glsl-token-defines",
	"pi", // Mathematical constant
	"const-pi",
	"generate-pi",
	"stringify-pi",
	"d3-path", // D3.js SVG
	"dogapi", // Datadog
	"socks-proxy-agent", // SOCKS proxy
	"i2c-bus", // Raspberry Pi I2C hardware
]);

/** Text signals indicating OpenAPI specification tooling, not Pi coding agent. */
const OPENAPI_SIGNALS = [
	"openapi-format",
	"openapi document",
	"openapi-first",
	"openapi specification",
	"openapi3",
	"swagger-ui",
	"swagger spec",
];

/** Text signals that indicate a non-compatible fork (oh-my-pi ecosystem). */
const FORK_SIGNALS = ["oh-my-pi"];

// ─── Positive signals ──────────────────────────────────────────────────────────

/**
 * Name patterns that strongly indicate the candidate IS about the Pi coding agent.
 * If ANY of these match, the candidate is accepted regardless of other heuristics.
 */
const POSITIVE_NAME_PATTERNS = [
	/^pi[-_]/, // pi-something (pi-extension, pi-skill, etc.)
	/^@[^/]+\/pi[-_]/, // @scope/pi-something
	/pi-coding-agent/,
	/pi-agent-core/,
	/pi-mono$/,
	/pi-session/,
	/pi-mcp/,
];

/**
 * Text fragments in name+description that indicate relevance.
 * Checked via simple case-insensitive includes.
 */
const POSITIVE_TEXT_SIGNALS = [
	"pi coding agent",
	"pi coding",
	"pi agent",
	"pi.dev",
	"pi extension",
	"pi skill",
	"pi theme",
	"pi provider",
	"pi session",
	"pi-mono",
	"pi-mcp",
	"for pi",
	"for the pi",
	"mariozechner/pi",
	"pi-coding-agent",
	"pi-agent",
];

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface RelevanceResult {
	/** Whether the candidate passes the relevance filter. */
	relevant: boolean;
	/** Human-readable reason for rejection (empty if relevant). */
	reason: string;
}

// ─── Main filter ───────────────────────────────────────────────────────────────

/**
 * Check whether a discovery candidate is relevant to the Pi coding agent.
 *
 * Logic (evaluated in order — first match wins):
 *
 *   Layer 1 — Hard blocks (reject immediately):
 *     1a. Blocked scopes/names
 *     1b. Raspberry Pi hardware signals
 *     1c. Mathematical π signals
 *     1d. PixiJS game library signals
 *     1e. Pi Network cryptocurrency signals
 *     1f. AVEVA PI / industrial SCADA signals
 *     1g. Unrelated ecosystem signals (Tiptap, SAP, Pimcore, etc.)
 *     1h. Non-compatible fork signals (oh-my-pi)
 *
 *   Layer 2 — Positive signals (accept immediately):
 *     2a. Pi coding agent name patterns
 *     2b. Pi coding agent text signals in description
 *     2c. Pi-related GitHub topics
 *     2d. pi-package keyword (npm convention)
 *
 *   Layer 3 — Default accept:
 *     Ambiguous candidates pass through — blacklist catches the stragglers.
 */
export function isRelevant(candidate: {
	url: string;
	id?: string;
	metadata?: Record<string, unknown>;
}): RelevanceResult {
	const url = candidate.url.toLowerCase();
	const name = (candidate.id ?? extractNameFromUrl(candidate.url)).toLowerCase();
	const description = String(candidate.metadata?.["description"] ?? "").toLowerCase();
	const topics = ((candidate.metadata?.["topics"] as string[] | undefined) ?? []).map((t) =>
		t.toLowerCase(),
	);
	const keywords = ((candidate.metadata?.["keywords"] as string[] | undefined) ?? []).map((k) =>
		k.toLowerCase(),
	);

	const combined = `${name} ${description}`;

	// ── Layer 1: Hard blocks ──────────────────────────────────────────────────

	// 1a. Blocked scopes (@stdlib/*, @pixi/*, @tiptap/*, etc.)
	const scope = name.startsWith("@") ? name.split("/")[0] : null;
	if (scope && BLOCKED_SCOPES.has(scope)) {
		return { relevant: false, reason: `blocked scope: ${scope}` };
	}

	// 1a. Blocked exact names
	if (BLOCKED_NAMES.has(name)) {
		return { relevant: false, reason: `blocked name: ${name}` };
	}

	// 1b. Raspberry Pi detection — in name/description/URL/topics
	for (const signal of RASPBERRY_PI_SIGNALS) {
		if (combined.includes(signal) || url.includes(signal)) {
			return { relevant: false, reason: `raspberry pi signal: "${signal}"` };
		}
	}

	// Topics are a strong RPi signal (repos tag themselves explicitly)
	const rpiTopics = ["raspberry-pi", "raspberry-pi-gpio", "rp2040", "i2c", "gpio", "beaglebone"];
	for (const topic of topics) {
		if (rpiTopics.includes(topic)) {
			return { relevant: false, reason: `raspberry pi topic: "${topic}"` };
		}
	}

	// 1c. Mathematical π detection — name matches and description signals
	if (MATH_PI_NAMES.has(name)) {
		return { relevant: false, reason: `mathematical pi: "${name}"` };
	}
	for (const signal of MATH_PI_SIGNALS) {
		if (combined.includes(signal)) {
			return { relevant: false, reason: `mathematical pi signal: "${signal}"` };
		}
	}

	// 1d. PixiJS game library detection — in name/URL
	for (const signal of PIXIJS_SIGNALS) {
		if (name.includes(signal.toLowerCase()) || url.includes(signal.toLowerCase())) {
			return { relevant: false, reason: `pixijs game library signal: "${signal}"` };
		}
	}
	// Also check topics for pixijs
	if (topics.some((t) => t === "pixi" || t === "pixijs" || t === "pixi.js")) {
		return { relevant: false, reason: "pixijs topic" };
	}

	// 1e. Pi Network cryptocurrency detection
	for (const signal of PI_NETWORK_SIGNALS) {
		if (combined.includes(signal)) {
			return { relevant: false, reason: `pi network crypto signal: "${signal}"` };
		}
	}

	// 1f. AVEVA PI / industrial systems detection
	for (const signal of INDUSTRIAL_PI_SIGNALS) {
		if (combined.includes(signal)) {
			return { relevant: false, reason: `industrial pi signal: "${signal}"` };
		}
	}

	// 1g. Unrelated ecosystem detection
	for (const signal of UNRELATED_ECOSYSTEMS) {
		if (combined.includes(signal.toLowerCase()) || url.includes(signal.toLowerCase())) {
			return { relevant: false, reason: `unrelated ecosystem: "${signal}"` };
		}
	}

	// 1h. Non-compatible fork detection (oh-my-pi ecosystem)
	for (const signal of FORK_SIGNALS) {
		if (combined.includes(signal) || url.includes(signal)) {
			return { relevant: false, reason: `non-compatible fork signal: "${signal}"` };
		}
	}

	// 1i. OpenAPI specification tooling detection
	for (const signal of OPENAPI_SIGNALS) {
		if (combined.includes(signal.toLowerCase()) || url.includes(signal.toLowerCase())) {
			return { relevant: false, reason: `openapi specification tooling: "${signal}"` };
		}
	}

	// ── Layer 2: Positive signals ─────────────────────────────────────────────

	// 2a. Check name patterns
	for (const pattern of POSITIVE_NAME_PATTERNS) {
		if (pattern.test(name)) {
			return { relevant: true, reason: "" };
		}
	}

	// 2b. Check combined text for positive signals
	for (const signal of POSITIVE_TEXT_SIGNALS) {
		if (combined.includes(signal)) {
			return { relevant: true, reason: "" };
		}
	}

	// 2c. Check GitHub topics for pi-agent / pi-coding-agent
	if (
		topics.some(
			(t) => t === "pi-agent" || t === "pi-coding-agent" || t === "pi-coding" || t === "pi", // bare "pi" topic is used by the Pi coding agent community
		)
	) {
		return { relevant: true, reason: "" };
	}

	// 2d. Check for pi-package keyword (npm convention for Pi coding agent packages)
	if (keywords.some((k) => k === "pi-package" || k === "pi-extension" || k === "pi-theme")) {
		return { relevant: true, reason: "" };
	}

	// ── Layer 3: Default accept ───────────────────────────────────────────────
	// Ambiguous candidates pass through — blacklist catches the stragglers.
	return { relevant: true, reason: "" };
}

/**
 * Check whether an already-saved entry is relevant (for pruning existing data).
 * Uses the same logic as isRelevant but works with the Entry shape.
 */
export function isEntryRelevant(entry: {
	id: string;
	name: string;
	url: string;
	description: string;
	metadata: Record<string, unknown> | import("../lib/types.ts").EntryMetadata;
}): RelevanceResult {
	const meta = entry.metadata as Record<string, unknown>;
	// For YouTube entries, title and description live in metadata;
	// fold them into the combined text the filter checks.
	const extraDesc = [meta["title"], meta["description"]].filter(Boolean).join(" ");
	return isRelevant({
		url: entry.url,
		id: entry.id,
		metadata: {
			...meta,
			description: `${entry.description} ${extraDesc}`,
		},
	});
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function extractNameFromUrl(url: string): string {
	if (url.includes("npmjs.com/package/")) {
		const pkg = url.split("npmjs.com/package/")[1]?.replace(/\/+$/, "") ?? "";
		return decodeURIComponent(pkg);
	}
	const ghMatch = url.match(/github\.com\/[^/]+\/([^/]+)/);
	if (ghMatch?.[1]) return ghMatch[1];
	return url.split("/").filter(Boolean).pop() ?? url;
}
