/**
 * Discovery runner — orchestrates source discovery and enrichment.
 *
 * Splits from the Source interface so that `sources/` only defines the contract
 * and individual source implementations, while the runner logic lives with the
 * discover stage that uses it.
 */

import type { DiscoveryCandidate, EntrySource } from "../core/types.ts";
import type { DiscoveryResult, Source, WriteResult } from "../sources/source.ts";
import type { DiscoveryWriter } from "./writer.ts";

// ─── Runner ────────────────────────────────────────────────────────────────────

/**
 * Run multiple sources in parallel, then run enrichment sequentially.
 *
 * Phase 1 (discover): all sources fetch in parallel, writing raw candidates.
 * Phase 2 (enrich): sources with an `enrich` method make follow-up API calls
 *   to augment already-written candidates (e.g. YouTube video statistics).
 *
 * @param reset Clear candidate repository before starting (fresh gather).
 */
export async function runDiscovery(
	sources: Source[],
	writer: DiscoveryWriter,
	{ reset }: { reset?: boolean } = {},
): Promise<DiscoveryResult> {
	writer.init(reset);

	// Phase 1: discover (parallel)
	await Promise.all(
		sources.map(async (source) => {
			try {
				await source.discover(writer);
			} catch (err) {
				process.stderr.write(`⚠️  ${source.name} discovery failed: ${err}\n`);
			}
		}),
	);

	await writer.flush();

	// Phase 2: enrich (sequential — sources read back their own candidates)
	for (const source of sources) {
		if (source.enrich) {
			try {
				process.stderr.write(`[${source.name}] 🔧 Enriching...\n`);
				await source.enrich(writer);
			} catch (err) {
				process.stderr.write(`⚠️  ${source.name} enrichment failed: ${err}\n`);
			}
		}
	}

	await writer.flush();

	const summary = writer.getSummary();
	process.stderr.write(`ℹ️ Discovery total: ${writer.totalWritten} unique discoveries\n`);
	return { summary, total: writer.totalWritten };
}

// ─── Helper: write raw results to the writer ──────────────────────────────────

/**
 * Write a batch of raw results as candidates. No filtering, no rejection.
 * URLs should already be normalized by the source before calling this.
 * Returns counts for logging.
 */
export function writeRaw(
	sourceName: string,
	sourceTag: EntrySource,
	results: { url: string; hint?: string; id?: string; metadata?: Record<string, unknown> }[],
	writer: DiscoveryWriter,
): WriteResult {
	let written = 0;

	for (const r of results) {
		const candidate: DiscoveryCandidate = {
			url: r.url,
			source: sourceTag,
		};
		if (r.hint !== undefined) candidate.hint = r.hint;
		if (r.metadata !== undefined) candidate.metadata = r.metadata;
		if (r.id !== undefined) candidate.id = r.id;

		if (writer.write(sourceName, candidate)) {
			written++;
		}
	}

	return { fetched: results.length, written };
}
