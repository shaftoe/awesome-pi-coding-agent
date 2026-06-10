import "../core/temporal.ts";

import type { DuplicateCheck } from "../core/dedup.ts";
import type { DiscoveryCandidate, Entry } from "../core/types.ts";
import { getPriority } from "../sources/index.ts";

export type DuplicateAction = "replace" | "refresh" | "skip";

const UNKNOWN_SOURCE_PRIORITY = 9;

/** Source priority for dedup, delegated to source.priority. */
export function sourcePriority(source: string): number {
	try {
		return getPriority(source as Entry["source"]);
	} catch {
		return UNKNOWN_SOURCE_PRIORITY;
	}
}

/** Decide what to do with a duplicate candidate based on source priorities. */
export function resolveDuplicateAction(
	discovery: Pick<DiscoveryCandidate, "source">,
	dup: Pick<DuplicateCheck, "existingEntry">,
): DuplicateAction {
	if (!dup.existingEntry) return "skip";

	const candidatePriority = sourcePriority(discovery.source);
	const existingPriority = sourcePriority(dup.existingEntry.source);

	if (candidatePriority < existingPriority) return "replace";
	if (candidatePriority === existingPriority) return "refresh";
	return "skip";
}
