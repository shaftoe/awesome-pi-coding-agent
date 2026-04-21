# Awesome Pi coding agent

This is a Typescript (Bun) project that automatically discovers, enriches, and renders a curated list of resources for the [Pi Coding Agent](https://pi.dev/) ecosystem into an awesome-list README.

## Pipeline Architecture

The project is a **three-stage data pipeline** (`discover → enrich → generate`) driven by CLI commands in `src/index.ts`. A fourth `prune` command cleans stale data.

```
Data Sources          Pipeline Stages                  Output
─────────────         ─────────────────               ──────────
npm registry  ──┐
GitHub Search ──┤    ┌──────────────┐
YouTube API   ──┘───▶│  DISCOVER    │  Find candidates via search APIs
                     │  src/discover/│  Dedup by URL/ID, filter irrelevant
                     └──────┬───────┘
                     │
                     ┌──────▼───────┐
                     │  ENRICH      │  GitHub metadata (stars, commits, license)
                     │  src/enrich/  │  README analysis → category classification
                     └──────┬───────┘  Health scoring (active/maintained/stale/dead)
                     │
                     ┌──────▼───────┐
                     │  GENERATE    │  Renders README.md with sorted tables
                     │  src/generate/│  per category (extension/skill/tool/theme/...)
                     └──────────────┘
```

### Key Concepts

- **Identity Model**: npm package name is the canonical ID. GitHub-sourced entries use `owner-repo`. YouTube entries use `YT_<videoId>`.
- **Storage**: File-per-entry JSON under `data/<category>s/` (e.g. `data/skills/pi-mcp.json`). Scoped npm packages stored as `@scope--name.json`.
- **Categories**: extension, skill, tool, theme, provider, template, video, example, documentation
- **Health**: Score 0–100 mapped to active (≥70), maintained (≥40), stale (≥15), dead (<15)
- **Filtering**: Relevance filter rejects Raspberry Pi / unrelated matches. Blacklist (`data/blacklist.json`) handles edge cases.
- **Caching**: `.cache/` directory with 1h TTL for API responses (`src/lib/cache.ts`)
- **Dedup**: npm wins over GitHub (npm ID kept, GitHub URL stored in metadata). Cross-referenced by `metadata.github_url`.

### Source Layout

```
src/
  index.ts           CLI entry point (discover/enrich/generate/pipeline/prune/blacklist)
  discover/          Stage 1: Find candidates
    index.ts           Discoverer interface + QueryDiscoverer base class
    npm.ts             npm registry search (primary source)
    github.ts          GitHub Search API (secondary)
    youtube.ts         YouTube Data API
    filter.ts          Relevance filtering (Raspberry Pi rejection, etc.)
  enrich/            Stage 2: Add metadata
    index.ts           Orchestrator (dedup, batch process, concurrency=5)
    classify.ts        Rule-based category classifier
    github-meta.ts     Fetch stars/forks/license/activity from GitHub API
    readme.ts          Fetch + analyze READMEs for category hints
    health.ts          Health scoring (GitHub-based & YouTube-based)
    videos.ts          Enrich video titles/thumbnails via noembed.com
  generate/          Stage 3: Render output
    readme.ts          Awesome-list README.md generator
    site.ts            (future: static site)
  lib/
    store.ts           File-per-entry data access layer
    types.ts           Core types (Entry, CategorizedEntry, DiscoveryCandidate, ...)
    cache.ts           File-based TTL cache for API responses
    github.ts          GitHub REST API client (native fetch)
```

### Commands

| Command | Description |
|---------|-------------|
| `bun run discover` | Run all discovery pipelines (GitHub, npm, YouTube) |
| `bun run enrich` | Enrich entries with metadata, classify, score health |
| `bun run generate` | Regenerate README.md from entry data |
| `bun run pipeline` | Full pipeline: discover → enrich → generate |
| `bun run prune` | Remove entries that don't relate to Pi coding agent |

Environment variables (see `.env.example`): `GITHUB_TOKEN` for GitHub API, `YOUTUBE_API_KEY` for YouTube discovery.

# Guidelines for coding agents

- **ALWAYS** run `bun run check` before considering a change complete and ready
