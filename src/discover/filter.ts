/**
 * Relevance filter — reject candidates that are clearly not about the Pi coding agent.
 *
 * Keeps it simple. Edge cases go in data/blacklist.json instead of adding more
 heuristics. The goal is to catch the obvious junk:
 *   - Raspberry Pi / RP2040 hardware projects
 *   - Unrelated npm packages that matched by accident
 *   - Generic "agent" / "skill" / "extension" packages from other ecosystems
 *
 * Anything ambiguous is let through — we prune later or blacklist manually.
 */

// ─── Negative signals ──────────────────────────────────────────────────────────

/** Strings in name/description that mean "Raspberry Pi, not Pi coding agent". */
const RASPBERRY_PI_SIGNALS = ["raspberry", "rp2040", "raspberrypi", "wiringpi", "pigpio"];

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
]);

/** Exact package/repo names that are definitely unrelated. */
const BLOCKED_NAMES = new Set([
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
]);

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
 * Logic:
 * 1. Hard block on blocked scopes, names, and Raspberry Pi signals
 * 2. Accept if positive signals are present
 * 3. Default: accept (let ambiguous stuff through — blacklist handles the rest)
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

	const combined = `${name} ${description}`;

	// ── Layer 1: Hard blocks ──────────────────────────────────────────────────

	// Blocked scopes (@stdlib/*, @aws-sdk/*, etc.)
	const scope = name.startsWith("@") ? name.split("/")[0] : null;
	if (scope && BLOCKED_SCOPES.has(scope)) {
		return { relevant: false, reason: `blocked scope: ${scope}` };
	}

	// Blocked exact names
	if (BLOCKED_NAMES.has(name)) {
		return { relevant: false, reason: `blocked name: ${name}` };
	}

	// Raspberry Pi detection — in name/description/URL/topics
	for (const signal of RASPBERRY_PI_SIGNALS) {
		if (combined.includes(signal) || url.includes(signal)) {
			return { relevant: false, reason: `raspberry pi signal: "${signal}"` };
		}
	}

	// Topics are a strong RPi signal (repos tag themselves explicitly)
	const rpiTopics = ["raspberry-pi", "raspberry-pi-gpio", "rp2040"];
	for (const topic of topics) {
		for (const signal of rpiTopics) {
			if (topic === signal || topic.includes(signal)) {
				return { relevant: false, reason: `raspberry pi topic: "${topic}"` };
			}
		}
	}

	// ── Layer 2: Positive signals ─────────────────────────────────────────────

	// Check name patterns
	for (const pattern of POSITIVE_NAME_PATTERNS) {
		if (pattern.test(name)) {
			return { relevant: true, reason: "" };
		}
	}

	// Check combined text for positive signals
	for (const signal of POSITIVE_TEXT_SIGNALS) {
		if (combined.includes(signal)) {
			return { relevant: true, reason: "" };
		}
	}

	// Check GitHub topics for pi-agent / pi-coding-agent
	if (topics.some((t) => t === "pi-agent" || t === "pi-coding-agent" || t === "pi-coding")) {
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
