/**
 * Path helpers — Node.js equivalents of Bun's `import.meta.dir`.
 */

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Absolute path of the directory containing the calling module, or an
 * empty string in bundled contexts where the module URL is not a file path.
 *
 * Usage: `moduleDir(import.meta.url)`
 */
export function moduleDir(importMetaUrl: string): string {
	try {
		const p = fileURLToPath(importMetaUrl);
		return p.endsWith(".ts") || p.endsWith(".js") || p.endsWith(".mjs") || p.endsWith(".cjs")
			? dirname(p)
			: "";
	} catch {
		return "";
	}
}
