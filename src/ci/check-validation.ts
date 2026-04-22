/**
 * CI helper: validate Pi agent response and check for rejected entries.
 *
 * Reads the Pi agent response from the PI_RESPONSE env var,
 * parses it for rejection issues, and exits with code 1 if any entry
 * was flagged as unrelated to the Pi coding agent.
 *
 * Usage:
 *   PI_RESPONSE='...' bun run src/ci/check-validation.ts
 */

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Extract JSON from a string that may contain markdown fences. */
function extractJson(text: string): string {
	// Try to find a JSON block inside ```json ... ``` fences
	const fenceMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
	if (fenceMatch?.[1]) return fenceMatch[1].trim();

	// Try to find a raw JSON object or array
	const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
	if (jsonMatch?.[1]) return jsonMatch[1].trim();

	return text.trim();
}

interface ValidationIssue {
	file?: string;
	id?: string;
	severity: "reject" | "warning";
	reason: string;
}

interface ValidationResult {
	issues: ValidationIssue[];
}

// ── Main ─────────────────────────────────────────────────────────────────────

const response = process.env["PI_RESPONSE"];

if (!response) {
	// biome-ignore lint/suspicious/noConsole: CI output
	console.error("❌ PI_RESPONSE env var not set");
	process.exit(1);
}

// biome-ignore lint/suspicious/noConsole: CI output
console.log("Pi validation response:");
// biome-ignore lint/suspicious/noConsole: CI output
console.log(response);
// biome-ignore lint/suspicious/noConsole: CI output
console.log();

let result: ValidationResult;

try {
	const json = extractJson(response);
	result = JSON.parse(json);
} catch {
	// biome-ignore lint/suspicious/noConsole: CI output
	console.error("❌ Could not parse Pi response as JSON");
	// biome-ignore lint/suspicious/noConsole: CI output
	console.error("Treating this as a validation failure — please investigate.");
	process.exit(1);
}

if (!result.issues || !Array.isArray(result.issues)) {
	// biome-ignore lint/suspicious/noConsole: CI output
	console.error("❌ Pi response did not contain a valid 'issues' array");
	process.exit(1);
}

if (result.issues.length === 0) {
	// biome-ignore lint/suspicious/noConsole: CI output
	console.log("✅ All entries passed Pi validation");
	process.exit(0);
}

// Separate rejections from warnings
const rejections = result.issues.filter((i) => i.severity === "reject");
const warnings = result.issues.filter((i) => i.severity === "warning");

if (warnings.length > 0) {
	// biome-ignore lint/suspicious/noConsole: CI output
	console.log(`⚠️  ${warnings.length} warning(s):`);
	for (const w of warnings) {
		// biome-ignore lint/suspicious/noConsole: CI output
		console.log(`   ${w.file ?? w.id ?? "unknown"}: ${w.reason}`);
	}
}

if (rejections.length > 0) {
	// biome-ignore lint/suspicious/noConsole: CI output
	console.log(`❌ ${rejections.length} rejected entry/entries (unrelated to Pi coding agent):`);
	for (const r of rejections) {
		// biome-ignore lint/suspicious/noConsole: CI output
		console.log(`   ${r.file ?? r.id ?? "unknown"}: ${r.reason}`);
	}
	// biome-ignore lint/suspicious/noConsole: CI output
	console.log();
	// biome-ignore lint/suspicious/noConsole: CI output
	console.log("Failing the workflow — remove irrelevant entries and retry.");
	process.exit(1);
}

// biome-ignore lint/suspicious/noConsole: CI output
console.log("✅ No rejections — warnings only, proceeding");
