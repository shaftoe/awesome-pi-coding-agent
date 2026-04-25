/**
 * Relevance filter — reject candidates not about the Pi Coding Agent.
 *
 * Architecture:
 *   Composable `FilterRule` objects chained in priority order.
 *   First match wins, remaining rules are skipped.
 *
 * Single assembled pipeline:
 *   FULL_RULES — 3-layer pipeline (blocks → positives → default reject)
 *
 * Key false-positive patterns caught:
 *   Raspberry Pi, mathematical π, PixiJS, Pi Network crypto,
 *   AVEVA PI, Tiptap, SAP, Pimcore, Node-RED, non-English languages
 */

import { type AddToBlacklistOptions, addToBlacklist, isBlacklisted } from "../core/blacklist.ts";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface FilterContext {
	readonly url: string;
	readonly urlLower: string;
	readonly name: string;
	readonly description: string;
	readonly combined: string;
	readonly topics: string[];
	readonly keywords: string[];
	/** Discovery metadata — source name and query that produced this candidate. */
	readonly discovery?: { sourceName: string; query?: string } | undefined;
}

export type FilterVerdict = { accept: true } | { accept: false; reason: string };

export interface FilterRule {
	readonly name: string;
	check(ctx: FilterContext): FilterVerdict | null;
}

// ─── Negative signals ─────────────────────────────────────────────────────────

const RASPBERRY_PI_SIGNALS = [
	"raspberry",
	"rp2040",
	"raspberrypi",
	"wiringpi",
	"pigpio",
	"beaglebone",
	"smbus",
];

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

const INDUSTRIAL_PI_SIGNALS = ["aveva", "pi system", "osisoft", "pi server", "historian"];

const UNRELATED_ECOSYSTEMS = [
	"@tiptap/",
	"tiptap-extension",
	"pimcore",
	"node-red-contrib",
	"@ui5-language-assistant",
	"@opentiny/",
	"storybook",
	"@capawesome/",
	"@adobe/reactor-",
	"@netlify/",
	"@tomtom-org/",
	"@diplodoc/",
	"@agentcash/",
];

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
	"@oh-my-pi",
	"@pixi",
	"@tiptap",
	"@opentiny",
	"@capawesome",
	"@adobe/reactor",
	"@ui5-language-assistant",
	"@redux-devtools",
	"@substrate",
	"@mux",
	"@vscode",
	"@lexical",
	"@types",
	"@diplodoc",
	"@agentcash",
]);

const BLOCKED_NAMES = new Set([
	"openapi-format",
	"docsalot-cli",
	"notionapi-agent",
	"google-research-pisac",
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
	"pi",
	"const-pi",
	"generate-pi",
	"stringify-pi",
	"d3-path",
	"dogapi",
	"socks-proxy-agent",
	"i2c-bus",
]);

const OPENAPI_SIGNALS = [
	"openapi-format",
	"openapi document",
	"openapi-first",
	"openapi specification",
	"openapi3",
	"swagger-ui",
	"swagger spec",
];

const FORK_SIGNALS = ["oh-my-pi"];

// ─── Positive signals ──────────────────────────────────────────────────────────

const POSITIVE_NAME_PATTERNS = [
	/^pi[-_]/,
	/^@[^/]+\/pi[-_]/,
	/pi-coding-agent/,
	/pi-agent-core/,
	/pi-mono$/,
	/pi-session/,
	/pi-mcp/,
];

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

// ─── Non-Latin script detection ────────────────────────────────────────────────

const NON_LATIN_SCRIPT_RANGES: Array<[number, number]> = [
	[0x0400, 0x04ff],
	[0x0500, 0x052f],
	[0x2de0, 0x2dff],
	[0xa640, 0xa69f],
	[0x0600, 0x06ff],
	[0x0750, 0x077f],
	[0x08a0, 0x08ff],
	[0xfb50, 0xfdff],
	[0xfe70, 0xfeff],
	[0x0900, 0x097f],
	[0x0980, 0x09ff],
	[0x0a00, 0x0a7f],
	[0x0a80, 0x0aff],
	[0x0b00, 0x0b7f],
	[0x0b80, 0x0bff],
	[0x0c00, 0x0c7f],
	[0x0c80, 0x0cff],
	[0x0d00, 0x0d7f],
	[0x0e00, 0x0e7f],
	[0x0e80, 0x0eff],
	[0x1000, 0x109f],
	[0x10a0, 0x10ff],
	[0x0530, 0x058f],
	[0x10d0, 0x10ff],
	[0x1100, 0x11ff],
	[0x3040, 0x309f],
	[0x30a0, 0x30ff],
	[0x4e00, 0x9fff],
	[0x3400, 0x4dbf],
	[0x20000, 0x2a6df],
	[0xac00, 0xd7af],
];

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

// ─── Non-English Latin-script detection ────────────────────────────────────────

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

function extractNameFromUrl(url: string): string {
	if (url.includes("npmjs.com/package/")) {
		const pkg = url.split("npmjs.com/package/")[1]?.replace(/\/+$/, "") ?? "";
		return decodeURIComponent(pkg);
	}
	const ghMatch = url.match(/github\.com\/[^/]+\/([^/]+)/);
	if (ghMatch?.[1]) return ghMatch[1];
	return url.split("/").filter(Boolean).pop() ?? url;
}

export function buildFilterContext(candidate: {
	url: string;
	id?: string;
	metadata?: Record<string, unknown>;
	discovery?: { sourceName: string; query?: string };
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
	return {
		url,
		urlLower,
		name,
		description,
		combined,
		topics,
		keywords,
		discovery: candidate.discovery,
	};
}

// ─── Filter rules ──────────────────────────────────────────────────────────────

// Layer 1: Hard blocks

const blacklistRule: FilterRule = {
	name: "blacklist",
	check(ctx) {
		return isBlacklisted(ctx.url) ? { accept: false, reason: "already blacklisted" } : null;
	},
};

const blockedScopeRule: FilterRule = {
	name: "blocked-scope",
	check(ctx) {
		const scope = ctx.name.startsWith("@") ? ctx.name.split("/")[0] : null;
		return scope && BLOCKED_SCOPES.has(scope)
			? { accept: false, reason: `blocked scope: ${scope}` }
			: null;
	},
};

const blockedNameRule: FilterRule = {
	name: "blocked-name",
	check(ctx) {
		return BLOCKED_NAMES.has(ctx.name)
			? { accept: false, reason: `blocked name: ${ctx.name}` }
			: null;
	},
};

const raspberryPiRule: FilterRule = {
	name: "raspberry-pi",
	check(ctx) {
		for (const s of RASPBERRY_PI_SIGNALS) {
			if (ctx.combined.includes(s) || ctx.urlLower.includes(s))
				return { accept: false, reason: `raspberry pi signal: "${s}"` };
		}
		for (const t of ctx.topics) {
			if (["raspberry-pi", "raspberry-pi-gpio", "rp2040", "i2c", "gpio", "beaglebone"].includes(t))
				return { accept: false, reason: `raspberry pi topic: "${t}"` };
		}
		return null;
	},
};

const mathPiRule: FilterRule = {
	name: "math-pi",
	check(ctx) {
		if (MATH_PI_NAMES.has(ctx.name))
			return { accept: false, reason: `mathematical pi: "${ctx.name}"` };
		for (const s of MATH_PI_SIGNALS) {
			if (ctx.combined.includes(s))
				return { accept: false, reason: `mathematical pi signal: "${s}"` };
		}
		return null;
	},
};

const pixijsRule: FilterRule = {
	name: "pixijs",
	check(ctx) {
		for (const s of PIXIJS_SIGNALS) {
			if (ctx.name.includes(s.toLowerCase()) || ctx.urlLower.includes(s.toLowerCase()))
				return { accept: false, reason: `pixijs game library signal: "${s}"` };
		}
		if (ctx.topics.some((t) => t === "pixi" || t === "pixijs" || t === "pixi.js"))
			return { accept: false, reason: "pixijs topic" };
		return null;
	},
};

const piNetworkRule: FilterRule = {
	name: "pi-network",
	check(ctx) {
		for (const s of PI_NETWORK_SIGNALS) {
			if (ctx.combined.includes(s))
				return { accept: false, reason: `pi network crypto signal: "${s}"` };
		}
		return null;
	},
};

const industrialRule: FilterRule = {
	name: "industrial",
	check(ctx) {
		for (const s of INDUSTRIAL_PI_SIGNALS) {
			if (ctx.combined.includes(s))
				return { accept: false, reason: `industrial pi signal: "${s}"` };
		}
		return null;
	},
};

const ecosystemRule: FilterRule = {
	name: "ecosystem",
	check(ctx) {
		for (const s of UNRELATED_ECOSYSTEMS) {
			if (ctx.combined.includes(s.toLowerCase()) || ctx.urlLower.includes(s.toLowerCase()))
				return { accept: false, reason: `unrelated ecosystem: "${s}"` };
		}
		return null;
	},
};

const forkRule: FilterRule = {
	name: "fork",
	check(ctx) {
		for (const s of FORK_SIGNALS) {
			if (ctx.combined.includes(s) || ctx.urlLower.includes(s))
				return { accept: false, reason: `non-compatible fork signal: "${s}"` };
		}
		return null;
	},
};

const openapiRule: FilterRule = {
	name: "openapi",
	check(ctx) {
		for (const s of OPENAPI_SIGNALS) {
			if (ctx.combined.includes(s.toLowerCase()) || ctx.urlLower.includes(s.toLowerCase()))
				return { accept: false, reason: `openapi specification tooling: "${s}"` };
		}
		return null;
	},
};

const nonLatinScriptRule: FilterRule = {
	name: "non-latin",
	check(ctx) {
		return hasNonLatinScript(ctx.combined)
			? { accept: false, reason: "non-english language" }
			: null;
	},
};

const nonEnglishLatinRule: FilterRule = {
	name: "non-english-latin",
	check(ctx) {
		if (ctx.urlLower.includes("youtube.com/watch")) {
			const lang = detectNonEnglishLatin(ctx.combined);
			if (lang) return { accept: false, reason: `non-english language (${lang})` };
		}
		return null;
	},
};

// Layer 2: Positive signals

const positiveNameRule: FilterRule = {
	name: "positive-name",
	check(ctx) {
		for (const p of POSITIVE_NAME_PATTERNS) {
			if (p.test(ctx.name)) return { accept: true };
		}
		return null;
	},
};

const positiveTextRule: FilterRule = {
	name: "positive-text",
	check(ctx) {
		for (const s of POSITIVE_TEXT_SIGNALS) {
			if (ctx.combined.includes(s)) return { accept: true };
		}
		return null;
	},
};

const positiveTopicsRule: FilterRule = {
	name: "positive-topics",
	check(ctx) {
		return ctx.topics.some(
			(t) => t === "pi-agent" || t === "pi-coding-agent" || t === "pi-coding" || t === "pi",
		)
			? { accept: true }
			: null;
	},
};

const positiveKeywordsRule: FilterRule = {
	name: "positive-keywords",
	check(ctx) {
		return ctx.keywords.some((k) => k === "pi-package" || k === "pi-extension" || k === "pi-theme")
			? { accept: true }
			: null;
	},
};

// Layer 3: Default — reject anything without a positive Pi signal

const defaultRejectRule: FilterRule = {
	name: "default-reject",
	check(_ctx) {
		return { accept: false, reason: "no positive Pi coding agent signal" };
	},
};

// ─── Pipeline runner ───────────────────────────────────────────────────────────

function runRules(rules: readonly FilterRule[], ctx: FilterContext): FilterVerdict {
	for (const rule of rules) {
		const verdict = rule.check(ctx);
		if (verdict !== null) {
			if (!verdict.accept) {
				const opts: AddToBlacklistOptions = {
					reason: verdict.reason,
					source: "filter",
				};
				if (ctx.discovery) opts.discovery = ctx.discovery;
				addToBlacklist(ctx.url, verdict.reason, opts);
			}
			return verdict;
		}
	}
	return { accept: true };
}

// ─── Pre-assembled pipeline ──────────────────────────────────────────────────

export const FULL_RULES: readonly FilterRule[] = [
	blacklistRule,
	blockedScopeRule,
	blockedNameRule,
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
	positiveNameRule,
	positiveTextRule,
	positiveTopicsRule,
	positiveKeywordsRule,
	defaultRejectRule,
];

// ─── Public API ────────────────────────────────────────────────────────────────

export function isRelevant(candidate: {
	url: string;
	id?: string;
	metadata?: Record<string, unknown>;
	discovery?: { sourceName: string; query?: string };
}): FilterVerdict {
	return runRules(FULL_RULES, buildFilterContext(candidate));
}
