/**
 * Pi coding-agent validation prompt, used by the CI pipeline to validate
 * new/changed entries. Extracted here so the workflow YAML stays clean and
 * the prompt is version-controlled alongside the code it references.
 */

export const VALIDATE_PROMPT = `You are validating entries for the "Awesome Pi Coding Agent" curated list. This list tracks resources for the Pi coding agent at https://pi.dev/ — NOT Raspberry Pi hardware projects.

Review the changed/added JSON files in the data/entries/ directory (compare working tree against the git index to find them). Each entry is a single JSON file named by its ID hash.

For each changed data entry, verify and **fix in-place**:

1. **Relevance**: The entry MUST be about the Pi coding agent (pi.dev). If it's about Raspberry Pi, GPIO, embedded hardware, or clearly unrelated — run \`bun run blacklist add <url> <reason>\` to blacklist it, then delete the JSON file.
2. **English-only**: The entry's name and description MUST be in English. If the description or title is written in a non-English language (Chinese, Russian, Arabic, Hindi, Portuguese, German, etc.), run \`bun run blacklist add <url> <reason>\` to blacklist it, then delete the JSON file.
3. **Duplicates**: Check for duplicate entries (same URL, same npm/GitHub identifier). If found, keep the entry with the higher health.score and run \`bun run blacklist add <url> <reason>\` on the other, then delete its JSON file.
4. **Health score accuracy**: health.score (0–100) maps to health.level as: active ≥70, maintained ≥40, stale ≥15, dead <15. If inconsistent with metadata (last_commit date, stars, forks, is_archived), edit the JSON file directly to fix health.score and health.level.
5. **Category correctness**: The category field in the JSON should match the entry's content (extension, theme, video, or misc). If wrong, edit the category field directly in the JSON file.

Make all fixes directly. Do not just report issues — edit files, run commands, and resolve them.`;
