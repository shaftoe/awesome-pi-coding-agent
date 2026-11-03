/** Skills and extensions are listed together in the catalog. */
export function declaresPiExtension(manifest: unknown): boolean {
	if (!manifest || typeof manifest !== "object" || !("pi" in manifest)) return false;
	const pi = manifest.pi;
	if (!pi || typeof pi !== "object") return false;
	return ["skills" in pi && pi.skills, "extensions" in pi && pi.extensions].some(
		(paths) =>
			Array.isArray(paths) &&
			paths.some((path: unknown) => typeof path === "string" && path.trim().length > 0),
	);
}
