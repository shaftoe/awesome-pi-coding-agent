# Awesome Pi coding agent

This is a Typescript (Bun) project that automatically discovers, enriches, and renders a curated list of resources for the [Pi Coding Agent](https://pi.dev/) ecosystem into an awesome-list README.

Currently under full rewrite, refer to docs/ARCHITECTURE.md and docs/REWRITE-PLAN.md for up to date state.

# Guidelines for coding agents

- **ALWAYS** run `bun run check` before considering a change complete and ready
- **ALWAYS** run `bun run format` to auto-fix lint/format issues (import ordering, etc.) before falling back to manual edits
- **ALWAYS** ensure we're using up to date latest and greates 3rd-party components
- **ALWAYS** update `docs/ARCHITECTURE.md` when changing the structure, modules, or design decisions of `src/`. Keep the status markers (✅ done, 🟡 in progress, 🔲 not started) accurate.
