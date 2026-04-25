/**
 * Relevance filter — reject candidates that are clearly not about the Pi coding agent.
 *
 * Architecture:
 *   Each filter check is a composable {@link FilterRule}. Rules are chained
 *   in priority order — first match wins, remaining rules are skipped.
 *
 *   Two pipelines are pre-assembled:
 *     • {@link EARLY_RULES} — cheap O(1) rejection checks (blacklist, blocked
 *       scopes/names). Used inside discoverers to drop bad results before they
 *       become candidates.
 *     • {@link FULL_RULES} — complete 3-layer pipeline (hard blocks → positive
 *       signals → default). Used by saveNewCandidates() and prune.
 *
 * Extending:
 *   1. Define a new FilterRule: `{ name, check(ctx) → verdict | null }`
 *   2. Insert it into FULL_RULES at the desired priority position.
 *   3. If it's a cheap O(1) check, also add it to EARLY_RULES.
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

// ─── Types ─────────────────────────────────────────────────────────────────────

/** Pre-computed context passed to every filter rule. */
export interface FilterContext {
	/** Original URL (for blacklisting). */
	readonly url: string;
	/** Lowercased URL (for matching). */
	readonly urlLower: string;
	/** Lowercased name (candidate.id or extracted from URL). */
	readonly name: string;
	/** Lowercased description from metadata. */
	readonly description: string;
	/** `name description` combined text (for matching). */
	readonly combined: string;
	/** Lowercased GitHub/npm topics. */
	readonly topics: string[];
	/** Lowercased npm keywords. */
	readonly keywords: string[];
}

/** Verdict returned by a filter rule. `null` means "pass — let the next rule decide." */
export type FilterVerdict = { accept: true } | { accept: false; reason: string };

/** Type guard to narrow a FilterVerdict to its rejection branch. */
export function isRejection(verdict: FilterVerdict): verdict is { accept: false; reason: string } {
	return !verdict.accept;
}

/**
 * A single, composable filter rule.
 *
 * Rules are evaluated in array order. The first non-null verdict wins:
 *   - `{ accept: false }` → reject (auto-blacklisted by the pipeline)
 *   - `{ accept: true }`  → accept immediately
 *   - `null`              → pass to the next rule
 */
export interface FilterRule {
	/** Human-readable name for logging and debugging. */
	readonly name: string;
	/**
	 * Evaluate this rule against the filter context.
	 * Return `null` to delegate to the next rule.
	 */
	check(ctx: FilterContext): FilterVerdict | null;
}

// ─── Signal data — negative ────────────────────────────────────────────────────

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

/** Text signals indicating Pi Network cryptocurrency, not Pi coding agent. */
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

/** Text signals indicating AVEVA PI / industrial systems, not Pi coding agent. */
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

// ─── Signal data — positive ────────────────────────────────────────────────────

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

// ─── Text analysis helpers ─────────────────────────────────────────────────────

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

/**
 * Common function/stop words from non-English languages that use Latin script.
 * Used to detect YouTube videos whose content is not in English despite
 * containing a Pi coding agent mention (e.g. Indonesian tech reviews).
 *
 * Each entry is a [language_hint, words[]] pair. A match requires at least
 * `threshold` distinct words from any single language to appear in the text.
 */
const NON_ENGLISH_LATIN_WORDS: Array<{ lang: string; words: string[]; threshold: number }> = [
	{
		lang: "indonesian",
		words: [
			"yang",
			"dan",
			"dengan",
			"untuk",
			"pada",
			"ini",
			"itu",
			"ke",
			"dari",
			"tidak",
			"akan",
			"bisa",
			"sudah",
			"seperti",
			"juga",
			"ada",
			"kita",
			"mereka",
			"apa",
			"kalo",
			"gak",
			"nggak",
			"aja",
			"banget",
			"makin",
			"terbaru",
			"ribet",
			"penuh",
			"gila",
		],
		threshold: 3,
	},
	{
		lang: "german",
		words: [
			"und",
			"der",
			"die",
			"das",
			"ist",
			"ein",
			"eine",
			"mit",
			"auf",
			"aus",
			"nicht",
			"sich",
			"auch",
			"wird",
			"den",
			"dem",
			"des",
			"für",
			"hat",
			"kann",
			"noch",
			"als",
			"nach",
			"bei",
			"über",
			"selbst",
			"gehosteter",
		],
		threshold: 4,
	},
	{
		lang: "french",
		words: [
			"les",
			"des",
			"une",
			"est",
			"que",
			"qui",
			"dans",
			"pour",
			"pas",
			"sur",
			"avec",
			"sont",
			"cette",
			"mais",
			"comme",
			"nous",
			"vous",
			"leur",
			"peut",
			"aussi",
			"tout",
			"fait",
			"etre",
			"tres",
			"bien",
		],
		threshold: 4,
	},
	{
		lang: "spanish",
		words: [
			"los",
			"las",
			"una",
			"que",
			"del",
			"para",
			"con",
			"por",
			"pero",
			"como",
			"mas",
			"esto",
			"todo",
			"puede",
			"tambien",
			"asi",
			"nos",
			"tiene",
			"bien",
			"muy",
			"hay",
			"donde",
			"solo",
		],
		threshold: 4,
	},
	{
		lang: "portuguese",
		words: [
			"que",
			"não",
			"uma",
			"com",
			"para",
			"dos",
			"das",
			"por",
			"mais",
			"como",
			"tem",
			"seu",
			"sua",
			"ser",
			"está",
			"pode",
			"tudo",
			"também",
			"muito",
			"ainda",
			"são",
			"isso",
			"este",
			"ela",
		],
		threshold: 4,
	},
	{
		lang: "italian",
		words: [
			"che",
			"non",
			"una",
			"con",
			"per",
			"sono",
			"del",
			"della",
			"dei",
			"anche",
			"questo",
			"questa",
			"come",
			"puo",
			"ancora",
			"molto",
			"piu",
			"suo",
			"sua",
			"suoi",
			"ogni",
			"tutti",
			"stato",
		],
		threshold: 4,
	},
];

/**
 * Detect whether text is written in a non-English Latin-script language.
 * Uses characteristic function/stop words to identify the language.
 *
 * Returns a language hint string if detected, or null if the text appears English.
 */
function detectNonEnglishLatin(text: string): string | null {
	const words = text.toLowerCase().split(/\s+/);
	const wordSet = new Set(words);

	for (const { lang, words: langWords, threshold } of NON_ENGLISH_LATIN_WORDS) {
		let count = 0;
		for (const w of langWords) {
			if (wordSet.has(w)) count++;
		}
		if (count >= threshold) return lang;
	}
	return null;
}

// ─── Context builder ───────────────────────────────────────────────────────────

/**
 * Extract a package/repo name from a URL for filter matching.
 * npm URLs → full package name, GitHub URLs → repo name, fallback → last segment.
 */
function extractNameFromUrl(url: string): string {
	if (url.includes("npmjs.com/package/")) {
		const pkg = url.split("npmjs.com/package/")[1]?.replace(/\/+$/, "") ?? "";
		return decodeURIComponent(pkg);
	}
	const ghMatch = url.match(/github\.com\/[^/]+\/([^/]+)/);
	if (ghMatch?.[1]) return ghMatch[1];
	return url.split("/").filter(Boolean).pop() ?? url;
}

/** Build a filter context from a raw candidate. */
function buildContext(candidate: {
	url: string;
	id?: string;
	metadata?: Record<string, unknown>;
}): FilterContext {
	const url = candidate.url;
	const urlLower = url.toLowerCase();
	const name = (candidate.id ?? extractNameFromUrl(url)).toLowerCase();
	const description = String(candidate.metadata?.["description"] ?? "").toLowerCase();
	const topics = ((candidate.metadata?.["topics"] as string[] | undefined) ?? []).map((t) =>
		t.toLowerCase(),
	);
	const keywords = ((candidate.metadata?.["keywords"] as string[] | undefined) ?? []).map((k) =>
		k.toLowerCase(),
	);
	const combined = `${name} ${description}`;
	return { url, urlLower, name, description, combined, topics, keywords };
}

// ─── Filter rules ──────────────────────────────────────────────────────────────

// ── Layer 1: Hard blocks (reject + auto-blacklist) ────────────────────────────

/** Blacklist lookup — reject already-known-bad URLs. O(1) via cached Set. */
const blacklistRule: FilterRule = {
	name: "blacklist",
	check(ctx) {
		if (isBlacklisted(ctx.url)) {
			return { accept: false, reason: "already blacklisted" };
		}
		return null;
	},
};

/** Blocked npm scopes that are never about the Pi coding agent. */
const blockedScopeRule: FilterRule = {
	name: "blocked-scope",
	check(ctx) {
		const scope = ctx.name.startsWith("@") ? ctx.name.split("/")[0] : null;
		if (scope && BLOCKED_SCOPES.has(scope)) {
			return { accept: false, reason: `blocked scope: ${scope}` };
		}
		return null;
	},
};

/** Blocked exact names that are definitely unrelated. */
const blockedNameRule: FilterRule = {
	name: "blocked-name",
	check(ctx) {
		if (BLOCKED_NAMES.has(ctx.name)) {
			return { accept: false, reason: `blocked name: ${ctx.name}` };
		}
		return null;
	},
};

/** Raspberry Pi hardware projects — GPIO, RP2040, I2C, etc. */
const raspberryPiRule: FilterRule = {
	name: "raspberry-pi",
	check(ctx) {
		// Text signals in name/description/URL
		for (const signal of RASPBERRY_PI_SIGNALS) {
			if (ctx.combined.includes(signal) || ctx.urlLower.includes(signal)) {
				return { accept: false, reason: `raspberry pi signal: "${signal}"` };
			}
		}
		// Topics (repos tag themselves explicitly)
		const rpiTopics = ["raspberry-pi", "raspberry-pi-gpio", "rp2040", "i2c", "gpio", "beaglebone"];
		for (const topic of ctx.topics) {
			if (rpiTopics.includes(topic)) {
				return { accept: false, reason: `raspberry pi topic: "${topic}"` };
			}
		}
		return null;
	},
};

/** Mathematical π libraries — const-pi, digits-of-pi, etc. */
const mathPiRule: FilterRule = {
	name: "math-pi",
	check(ctx) {
		if (MATH_PI_NAMES.has(ctx.name)) {
			return { accept: false, reason: `mathematical pi: "${ctx.name}"` };
		}
		for (const signal of MATH_PI_SIGNALS) {
			if (ctx.combined.includes(signal)) {
				return { accept: false, reason: `mathematical pi signal: "${signal}"` };
			}
		}
		return null;
	},
};

/** PixiJS game library ecosystem. */
const pixijsRule: FilterRule = {
	name: "pixijs",
	check(ctx) {
		for (const signal of PIXIJS_SIGNALS) {
			if (ctx.name.includes(signal.toLowerCase()) || ctx.urlLower.includes(signal.toLowerCase())) {
				return { accept: false, reason: `pixijs game library signal: "${signal}"` };
			}
		}
		if (ctx.topics.some((t) => t === "pixi" || t === "pixijs" || t === "pixi.js")) {
			return { accept: false, reason: "pixijs topic" };
		}
		return null;
	},
};

/** Pi Network cryptocurrency. */
const piNetworkRule: FilterRule = {
	name: "pi-network",
	check(ctx) {
		for (const signal of PI_NETWORK_SIGNALS) {
			if (ctx.combined.includes(signal)) {
				return { accept: false, reason: `pi network crypto signal: "${signal}"` };
			}
		}
		return null;
	},
};

/** AVEVA PI / industrial SCADA systems. */
const industrialRule: FilterRule = {
	name: "industrial",
	check(ctx) {
		for (const signal of INDUSTRIAL_PI_SIGNALS) {
			if (ctx.combined.includes(signal)) {
				return { accept: false, reason: `industrial pi signal: "${signal}"` };
			}
		}
		return null;
	},
};

/** Unrelated ecosystems (Tiptap, SAP, Pimcore, Node-RED, etc.). */
const ecosystemRule: FilterRule = {
	name: "ecosystem",
	check(ctx) {
		for (const signal of UNRELATED_ECOSYSTEMS) {
			if (
				ctx.combined.includes(signal.toLowerCase()) ||
				ctx.urlLower.includes(signal.toLowerCase())
			) {
				return { accept: false, reason: `unrelated ecosystem: "${signal}"` };
			}
		}
		return null;
	},
};

/** Non-compatible forks (oh-my-pi ecosystem). */
const forkRule: FilterRule = {
	name: "fork",
	check(ctx) {
		for (const signal of FORK_SIGNALS) {
			if (ctx.combined.includes(signal) || ctx.urlLower.includes(signal)) {
				return { accept: false, reason: `non-compatible fork signal: "${signal}"` };
			}
		}
		return null;
	},
};

/** OpenAPI specification tooling. */
const openapiRule: FilterRule = {
	name: "openapi",
	check(ctx) {
		for (const signal of OPENAPI_SIGNALS) {
			if (
				ctx.combined.includes(signal.toLowerCase()) ||
				ctx.urlLower.includes(signal.toLowerCase())
			) {
				return { accept: false, reason: `openapi specification tooling: "${signal}"` };
			}
		}
		return null;
	},
};

/** Non-Latin script (CJK, Cyrillic, Arabic, etc.) in name/description. */
const nonLatinScriptRule: FilterRule = {
	name: "non-latin",
	check(ctx) {
		if (hasNonLatinScript(ctx.combined)) {
			return { accept: false, reason: "non-english language" };
		}
		return null;
	},
};

/** Non-English Latin-script languages (YouTube only: Indonesian, German, etc.). */
const nonEnglishLatinRule: FilterRule = {
	name: "non-english-latin",
	check(ctx) {
		if (ctx.urlLower.includes("youtube.com/watch")) {
			const detectedLang = detectNonEnglishLatin(ctx.combined);
			if (detectedLang) {
				return { accept: false, reason: `non-english language (${detectedLang})` };
			}
		}
		return null;
	},
};

// ── Layer 2: Positive signals (accept immediately) ─────────────────────────────

/** Pi coding agent name patterns (pi-*, @scope/pi-*, pi-mcp, etc.). */
const positiveNameRule: FilterRule = {
	name: "positive-name",
	check(ctx) {
		for (const pattern of POSITIVE_NAME_PATTERNS) {
			if (pattern.test(ctx.name)) {
				return { accept: true };
			}
		}
		return null;
	},
};

/** Pi coding agent text signals in description (pi coding agent, pi.dev, etc.). */
const positiveTextRule: FilterRule = {
	name: "positive-text",
	check(ctx) {
		for (const signal of POSITIVE_TEXT_SIGNALS) {
			if (ctx.combined.includes(signal)) {
				return { accept: true };
			}
		}
		return null;
	},
};

/** Pi-related GitHub topics (pi-agent, pi-coding-agent, pi, pi-coding). */
const positiveTopicsRule: FilterRule = {
	name: "positive-topics",
	check(ctx) {
		if (
			ctx.topics.some(
				(t) => t === "pi-agent" || t === "pi-coding-agent" || t === "pi-coding" || t === "pi", // bare "pi" topic is used by the Pi coding agent community
			)
		) {
			return { accept: true };
		}
		return null;
	},
};

/** npm keywords: pi-package, pi-extension, pi-theme. */
const positiveKeywordsRule: FilterRule = {
	name: "positive-keywords",
	check(ctx) {
		if (ctx.keywords.some((k) => k === "pi-package" || k === "pi-extension" || k === "pi-theme")) {
			return { accept: true };
		}
		return null;
	},
};

// ── Layer 3: Default ───────────────────────────────────────────────────────────

/** YouTube: require a positive signal to pass (YouTube search is inherently noisy). */
const youtubeStrictRule: FilterRule = {
	name: "youtube-strict",
	check(ctx) {
		if (ctx.urlLower.includes("youtube.com/watch")) {
			return {
				accept: false,
				reason: "YouTube entry with no positive Pi coding agent signal",
			};
		}
		return null;
	},
};

// ─── Pipeline runner ───────────────────────────────────────────────────────────

/**
 * Run a sequence of filter rules against a candidate.
 * Auto-blacklists rejected candidates.
 */
function runRules(rules: readonly FilterRule[], ctx: FilterContext): FilterVerdict {
	for (const rule of rules) {
		const verdict = rule.check(ctx);
		if (verdict !== null) {
			if (!verdict.accept) {
				addToBlacklist(ctx.url, verdict.reason);
			}
			return verdict;
		}
	}
	return { accept: true };
}

// ─── Pre-assembled pipelines ───────────────────────────────────────────────────

/**
 * Early rejection rules — cheap O(1) checks safe to run inside discoverers.
 * These catch the most common false positives before full candidate creation.
 *
 * To add a new early rule: ensure it's O(1) (Set lookup, string prefix check)
 * and doesn't require text analysis or topic/keyword inspection.
 */
export const EARLY_RULES: readonly FilterRule[] = [
	blacklistRule,
	blockedScopeRule,
	blockedNameRule,
];

/**
 * Full filter pipeline — 3-layer filtering (hard blocks → positives → default).
 * This is the complete relevance check used by saveNewCandidates() and prune.
 *
 * Rule priority:
 *   Layer 1 (reject):  blacklist → blocked scope/name → negative signals
 *   Layer 2 (accept):  name patterns → text signals → topics → keywords
 *   Layer 3 (default): YouTube strict, others accept
 */
export const FULL_RULES: readonly FilterRule[] = [
	// Layer 1: Hard blocks
	...EARLY_RULES,
	raspberryPiRule,
	mathPiRule,
	pixijsRule,
	piNetworkRule,
	industrialRule,
	ecosystemRule,
	forkRule,
	openapiRule,
	nonLatinScriptRule,
	nonEnglishLatinRule,
	// Layer 2: Positive signals
	positiveNameRule,
	positiveTextRule,
	positiveTopicsRule,
	positiveKeywordsRule,
	// Layer 3: Default
	youtubeStrictRule,
];

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Check whether a discovery candidate is relevant to the Pi coding agent.
 * Runs the full filter pipeline (all rules). Auto-blacklists rejections.
 */
export function isRelevant(candidate: {
	url: string;
	id?: string;
	metadata?: Record<string, unknown>;
}): FilterVerdict {
	return runRules(FULL_RULES, buildContext(candidate));
}

/**
 * Run cheap early-rejection checks against a candidate.
 * Used inside discoverers to drop obviously-irrelevant results
 * before they become full candidates.
 *
 * Returns a rejection verdict (with auto-blacklist) if any early rule matched,
 * or `null` if no early rule matched (pass through to full filter).
 */
export function earlyReject(candidate: {
	url: string;
	id?: string;
	metadata?: Record<string, unknown>;
}): FilterVerdict | null {
	const ctx = buildContext(candidate);
	for (const rule of EARLY_RULES) {
		const verdict = rule.check(ctx);
		if (verdict !== null && !verdict.accept) {
			addToBlacklist(ctx.url, verdict.reason);
			return verdict;
		}
	}
	return null;
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
}): FilterVerdict {
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
