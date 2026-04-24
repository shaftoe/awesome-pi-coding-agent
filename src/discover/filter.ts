/**
 * Relevance filter — reject candidates that are clearly not about the Pi coding agent.
 *
 * Three-layer filtering:
 *   Layer 1 — Hard blocks:  blocked scopes, names, and strong negative signals
 *              → auto-blacklisted when rejected
 *   Layer 2 — Positive signals:  explicit Pi coding agent markers override all
 *   Layer 3 — Default:  accept ambiguous candidates
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
 *   - Non-English language packages and videos (CJK, Cyrillic, Arabic, etc.)
 *   - SAP/OpenUI5, Pimcore CMS, Node-RED, and other unrelated ecosystems
 */

import { addToBlacklist, isBlacklisted } from "../lib/blacklist.ts";

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

/**
 * Unicode script ranges for non-Latin writing systems.
 * Used to reject packages/videos whose name or description is primarily
 * written in a non-English language (CJK, Cyrillic, Arabic, Devanagari,
 * Thai, Georgian, Armenian, etc.).
 *
 * We intentionally keep the threshold low — a handful of non-Latin letters
 * is enough to flag the entry, because legitimate Pi coding agent packages
 * overwhelmingly use English. Emoji-only entries are allowed.
 */
const NON_LATIN_SCRIPT_RANGES: Array<[number, number]> = [
	[0x0400, 0x04ff], // Cyrillic (Russian, Ukrainian, Bulgarian, Serbian…)
	[0x0500, 0x052f], // Cyrillic Supplement
	[0x2de0, 0x2dff], // Cyrillic Extended-A
	[0xa640, 0xa69f], // Cyrillic Extended-B
	[0x0600, 0x06ff], // Arabic
	[0x0750, 0x077f], // Arabic Supplement
	[0x08a0, 0x08ff], // Arabic Extended-A
	[0xfb50, 0xfdff], // Arabic Presentation Forms-A
	[0xfe70, 0xfeff], // Arabic Presentation Forms-B
	[0x0900, 0x097f], // Devanagari (Hindi, Marathi, Nepali…)
	[0x0980, 0x09ff], // Bengali
	[0x0a00, 0x0a7f], // Gurmukhi
	[0x0a80, 0x0aff], // Gujarati
	[0x0b00, 0x0b7f], // Oriya
	[0x0b80, 0x0bff], // Tamil
	[0x0c00, 0x0c7f], // Telugu
	[0x0c80, 0x0cff], // Kannada
	[0x0d00, 0x0d7f], // Malayalam
	[0x0e00, 0x0e7f], // Thai
	[0x0e80, 0x0eff], // Lao
	[0x1000, 0x109f], // Myanmar
	[0x10a0, 0x10ff], // Georgian
	[0x0530, 0x058f], // Armenian
	[0x10d0, 0x10ff], // Georgian (Mkhedruli)
	[0x1100, 0x11ff], // Hangul Jamo (Korean)
	[0x3040, 0x309f], // Hiragana (Japanese)
	[0x30a0, 0x30ff], // Katakana (Japanese)
	[0x4e00, 0x9fff], // CJK Unified Ideographs (Chinese, Japanese)
	[0x3400, 0x4dbf], // CJK Unified Ideographs Extension A
	[0x20000, 0x2a6df], // CJK Unified Ideographs Extension B
	[0xac00, 0xd7af], // Hangul Syllables (Korean)
];

/**
 * Check whether text contains non-Latin script characters that indicate
 * the content is not written in English (or another Latin-script language).
 *
 * Returns true if at least `threshold` non-Latin characters are found.
 * Emojis, punctuation, and Latin characters are ignored.
 */
function hasNonLatinScript(text: string, threshold = 2): boolean {
	let count = 0;
	for (const ch of text) {
		const cp = ch.codePointAt(0) ?? 0;
		for (const [lo, hi] of NON_LATIN_SCRIPT_RANGES) {
			if (cp >= lo && cp <= hi) {
				count++;
				if (count >= threshold) return true;
				break;
			}
		}
	}
	return false;
}

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
	/** Whether the candidate was auto-blacklisted during this check. */
	blacklisted: boolean;
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
 *     1i. OpenAPI specification tooling signals
 *     1j. Non-English language (non-Latin script) detection
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
	const rawUrl = candidate.url;
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

	// Fast path: skip candidates already in the blacklist
	if (isBlacklisted(rawUrl)) {
		return { relevant: false, reason: "already blacklisted", blacklisted: false };
	}

	// ── Layer 1: Hard blocks ──────────────────────────────────────────────────

	// 1a. Blocked scopes (@stdlib/*, @pixi/*, @tiptap/*, etc.)
	const scope = name.startsWith("@") ? name.split("/")[0] : null;
	if (scope && BLOCKED_SCOPES.has(scope)) {
		return reject(rawUrl, `blocked scope: ${scope}`);
	}

	// 1a. Blocked exact names
	if (BLOCKED_NAMES.has(name)) {
		return reject(rawUrl, `blocked name: ${name}`);
	}

	// 1b. Raspberry Pi detection — in name/description/URL/topics
	for (const signal of RASPBERRY_PI_SIGNALS) {
		if (combined.includes(signal) || url.includes(signal)) {
			return reject(rawUrl, `raspberry pi signal: "${signal}"`);
		}
	}

	// Topics are a strong RPi signal (repos tag themselves explicitly)
	const rpiTopics = ["raspberry-pi", "raspberry-pi-gpio", "rp2040", "i2c", "gpio", "beaglebone"];
	for (const topic of topics) {
		if (rpiTopics.includes(topic)) {
			return reject(rawUrl, `raspberry pi topic: "${topic}"`);
		}
	}

	// 1c. Mathematical π detection — name matches and description signals
	if (MATH_PI_NAMES.has(name)) {
		return reject(rawUrl, `mathematical pi: "${name}"`);
	}
	for (const signal of MATH_PI_SIGNALS) {
		if (combined.includes(signal)) {
			return reject(rawUrl, `mathematical pi signal: "${signal}"`);
		}
	}

	// 1d. PixiJS game library detection — in name/URL
	for (const signal of PIXIJS_SIGNALS) {
		if (name.includes(signal.toLowerCase()) || url.includes(signal.toLowerCase())) {
			return reject(rawUrl, `pixijs game library signal: "${signal}"`);
		}
	}
	// Also check topics for pixijs
	if (topics.some((t) => t === "pixi" || t === "pixijs" || t === "pixi.js")) {
		return reject(rawUrl, "pixijs topic");
	}

	// 1e. Pi Network cryptocurrency detection
	for (const signal of PI_NETWORK_SIGNALS) {
		if (combined.includes(signal)) {
			return reject(rawUrl, `pi network crypto signal: "${signal}"`);
		}
	}

	// 1f. AVEVA PI / industrial systems detection
	for (const signal of INDUSTRIAL_PI_SIGNALS) {
		if (combined.includes(signal)) {
			return reject(rawUrl, `industrial pi signal: "${signal}"`);
		}
	}

	// 1g. Unrelated ecosystem detection
	for (const signal of UNRELATED_ECOSYSTEMS) {
		if (combined.includes(signal.toLowerCase()) || url.includes(signal.toLowerCase())) {
			return reject(rawUrl, `unrelated ecosystem: "${signal}"`);
		}
	}

	// 1h. Non-compatible fork detection (oh-my-pi ecosystem)
	for (const signal of FORK_SIGNALS) {
		if (combined.includes(signal) || url.includes(signal)) {
			return reject(rawUrl, `non-compatible fork signal: "${signal}"`);
		}
	}

	// 1i. OpenAPI specification tooling detection
	for (const signal of OPENAPI_SIGNALS) {
		if (combined.includes(signal.toLowerCase()) || url.includes(signal.toLowerCase())) {
			return reject(rawUrl, `openapi specification tooling: "${signal}"`);
		}
	}

	// 1j. Non-English language detection — reject packages/videos whose
	//     name or description is written in a non-Latin script.
	//     (CJK, Cyrillic, Arabic, Devanagari, Thai, Korean, etc.)
	if (hasNonLatinScript(combined)) {
		return reject(rawUrl, "non-english language");
	}

	// ── Layer 2: Positive signals ─────────────────────────────────────────────

	// 2a. Check name patterns
	for (const pattern of POSITIVE_NAME_PATTERNS) {
		if (pattern.test(name)) {
			return { relevant: true, reason: "", blacklisted: false };
		}
	}

	// 2b. Check combined text for positive signals
	for (const signal of POSITIVE_TEXT_SIGNALS) {
		if (combined.includes(signal)) {
			return { relevant: true, reason: "", blacklisted: false };
		}
	}

	// 2c. Check GitHub topics for pi-agent / pi-coding-agent
	if (
		topics.some(
			(t) => t === "pi-agent" || t === "pi-coding-agent" || t === "pi-coding" || t === "pi", // bare "pi" topic is used by the Pi coding agent community
		)
	) {
		return { relevant: true, reason: "", blacklisted: false };
	}

	// 2d. Check for pi-package keyword (npm convention for Pi coding agent packages)
	if (keywords.some((k) => k === "pi-package" || k === "pi-extension" || k === "pi-theme")) {
		return { relevant: true, reason: "", blacklisted: false };
	}

	// ── Layer 3: Default ───────────────────────────────────────────────────────
	// For YouTube entries, require a positive Pi-specific signal (Layer 2) to pass.
	// YouTube search is inherently noisy — the broad queries like "pi coding" tutorial
	// return many generic coding-agent videos that lack any Pi coding agent content.
	// Non-YouTube sources (npm, GitHub) default to accept as before.
	if (url.includes("youtube.com/watch")) {
		return reject(rawUrl, "YouTube entry with no positive Pi coding agent signal");
	}

	return { relevant: true, reason: "", blacklisted: false };
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

/**
 * Reject a candidate and auto-blacklist it.
 * Returns a RelevanceResult with `blacklisted: true` if newly added.
 */
function reject(url: string, reason: string): RelevanceResult {
	const added = addToBlacklist(url, reason);
	return { relevant: false, reason, blacklisted: added };
}

function extractNameFromUrl(url: string): string {
	if (url.includes("npmjs.com/package/")) {
		const pkg = url.split("npmjs.com/package/")[1]?.replace(/\/+$/, "") ?? "";
		return decodeURIComponent(pkg);
	}
	const ghMatch = url.match(/github\.com\/[^/]+\/([^/]+)/);
	if (ghMatch?.[1]) return ghMatch[1];
	return url.split("/").filter(Boolean).pop() ?? url;
}
