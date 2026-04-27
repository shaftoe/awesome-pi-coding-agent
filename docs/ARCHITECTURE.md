# Architecture

**Last updated:** 2026-04-27

The project is a **four-stage data pipeline** that discovers, filters, processes, and renders a curated list of resources for the [Pi Coding Agent](https://pi.dev/) ecosystem into an awesome-list database and renders it as

- README Markdown document for the GitHub home page
- and an Astro static site with search features, live at <https://awesome-list.site>

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  1. DISCOVER │────▶│  2. FILTER   │────▶│  3. PROCESS  │────▶│ 4. GENERATE  │
│  Raw gather  │     │  Blacklist   │     │  Dedup+meta  │     │  Render MD   │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

---

## Table of Contents

- [Pipeline Overview](#pipeline-overview)
- [Directory Layout](#directory-layout)
- [Dependency Rule](#dependency-rule)
- [Date/Time API (Temporal)](#datetime-api-temporal)
- [Core Modules](#core-modules)
- [Stage 1: Discover](#stage-1-discover)
- [Stage 2: Filter](#stage-2-filter)
- [Stage 3: Process](#stage-3-process)
- [Stage 4: Generate](#stage-4-generate)
- [Classification](#classification)
- [Identity Model & Storage](#identity-model--storage)
- [CLI Modes & Offline Workflow](#cli-modes--offline-workflow)
- [Key Design Decisions](#key-design-decisions)
- [What's Left](#whats-left)
- [Testing](#testing)
- [Commands](#commands)

---

## Pipeline Overview

Each stage is a self-contained step that reads from one location and writes to the next. Stages can be run independently and repeated without side effects on previous stages.

| Stage | Input | Output | Responsibilities |
|-------|-------|--------|------------------|
| **1. Discover** | APIs (npm, GitHub, YouTube) | `.cache/candidates/` | Gather raw candidates, cache API responses. **No filtering.** |
| **2. Filter** | `.cache/candidates/` | `.cache/filtered/` | Relevance filtering, blacklist management. Irrelevant entries are added to blacklist. |
| **3. Process** | `.cache/filtered/` | `data/` | npm-over-GitHub dedup, classification, health scoring, enrichment. Writes canonical entries. |
| **4. Generate** | `data/` | `README.md` | Render awesome-list from canonical entries. |

### Why separate filter from discover?

Discovery sources run **in parallel** (via `Promise.all`). Filtering at gather time creates two problems:

1. **Race conditions** — multiple sources can write simultaneously, making dedup unreliable.
2. **Premature rejection** — blacklisting at discover time means a false positive poisons the candidate store before dedup can resolve cross-source duplicates.

By decoupling, discovery becomes a pure "fetch and cache" operation, while filter runs sequentially on stable data.

### Why separate process from filter?

Filtering is about relevance (is this about Pi Coding Agent?). Processing is about canonicalisation (which URL wins? what category? how healthy?). Mixing them creates coupling between the rejection rules and the dedup logic — two very different concerns.

---

## Directory Layout

```
src/
  cli/                              ✅ CLI utilities
    blacklist.ts                      Blacklist management CLI (add/list/check/remove)
  core/                             ✅ Shared infrastructure
    types.ts                          Canonical type definitions (string enums)
    repository.ts                     Repository<T> interface + FileRepository<T>
    cache.ts                          Generic TTL file cache
    cache.test.ts
    throttle.ts                       Rate-limited HTTP client with retry + backoff
    throttle.test.ts
    paginate.ts                       Generic numbered-page pagination
    paginate.test.ts
    temporal.ts                       Temporal polyfill (remove when Bun ships native)
    blacklist.ts                      URL blacklist with timestamps + discovery metadata
    store.ts                          Entry store facade (FileRepository<CategorizedEntry>)
    ids.ts                            URL → human-readable ID derivation
    html.ts                           HTML entity decoding
    dedup.ts                          Duplicate detection (URL + GitHub URL cross-ref)
    sort.ts                           Canonical entry ordering (health level → score → name)
    terms.ts                          Canonical search terms (shared by all sources)
  sources/                          ✅ Source implementations (cross-cutting plugins)
    source.ts                         Source interface + DiscoveryResult/WriteResult types
    npm.ts                            npm registry (keyword queries, full pagination)
    github.ts                         GitHub search (repos)
    youtube.ts                        YouTube Data API (token-based pagination)
    index.ts                          Source registry: createAllSources, getHealthScorer, routeQueries
    index.test.ts
    scoring.ts                        Shared scoring helpers (scoreFreshness, scoreMetric01, etc.)
  discover/                         ✅ Stage 1: raw gather from APIs
    index.ts                          CLI entry point (pure gather, no filtering)
    runner.ts                         runDiscovery + writeRaw (orchestrates sources)
    source.test.ts
    writer.ts                         DiscoveryWriter (Repository-backed write-through)
    writer.test.ts
  filter/                           ✅ Stage 2: relevance filtering + blacklist
    index.ts                          CLI entry point (candidates → filter → filtered)
    filter.ts                         Composable FilterRule pipeline
    filter.test.ts
  process/                          ✅ Stage 3: dedup + classify + save entries
    index.ts                          CLI entry point (filtered → dedup + classify → data/)
  enrich/
    classify.ts                       ✅ Rule-based category classifier
    health.ts                         ✅ Generic health combiner (weights + hard rules)
    health.test.ts                    ✅ Health scoring tests (source scorers + combiner)
  generate/                         ✅ Stage 4: README rendering
    index.ts                          CLI entry point (reads data/ → writes README.md)
    render.ts                         Core rendering: group by category, sort, emit markdown
```

---

## Dependency Rule

**Arrows point inward only.** No upward or lateral dependencies.

```
 ┌─────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
 │  discover/  │  │   filter/  │  │  process/  │  │  generate/ │
 │  Stage 1    │  │  Stage 2   │  │  Stage 3   │  │  Stage 4   │
 └─────┬───────┘  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘
       │                │               │               │
       └────────────────┴───────┬───────┴───────────────┘
                                ▼
                      ┌─────────────────┐
                      │     core/*      │   ZERO knowledge of pipeline stages
                      └─────────────────┘
```

- `core/` has **zero** knowledge of `discover/`, `filter/`, `process/`, `generate/`, or `sources/`.
- `sources/*.ts` depend on `core/` but **not** on each other.
- `filter/` depends on `core/` and reads from `discover/writer.ts` (to load candidates from Stage 1 output).
- `process/` depends on `core/` and reads from `discover/writer.ts` (to load filtered candidates from Stage 2 output).
- No upstream dependencies: `discover/` never imports from `filter/` or `process/`.

---

## Date/Time API (Temporal)

The codebase uses **`Temporal`** (TC39 successor to `Date`) exclusively. Bun 1.3 does not ship native Temporal yet, so `temporal-polyfill` provides the runtime implementation.

| Aspect | Detail |
|--------|--------|
| **Runtime polyfill** | [`temporal-polyfill`](https://www.npmjs.com/package/temporal-polyfill) v0.3.2 |
| **Type definitions** | TypeScript 6.0 built-in (`ESNext` lib includes `esnext.temporal`) |
| **Polyfill import** | `src/core/temporal.ts` — side-effect import of `temporal-polyfill/global` |
| **Remove when** | Bun ships native Temporal (delete `temporal.ts`, remove dep) |

### Patterns

| Old (`Date`) | New (`Temporal`) |
|-------------|-----------------|
| `Date.now` (epoch ms) | `Temporal.Now.instant()` |
| `new Date().toISOString()` | `Temporal.Now.instant().toString()` |
| `now - timestamp > ttl` | `Temporal.Instant.compare(now, expiresAt) >= 0` |
| `now + ttl` | `now.add({ milliseconds: ttl })` |
| `duration = a - b` (ms) | `a.since(b).total("millisecond")` |
| Fake clock: `() => number` | `() => Temporal.Instant.fromEpochMilliseconds(n)` |

Every test file that uses Temporal imports `"../core/temporal.ts"` to activate the polyfill.

---

## Core Modules

### `types.ts` — Canonical Types

All domain vocabularies use TypeScript string enums for compile-time safety and runtime iterability.

| Enum | Values |
|------|-------|
| `Category` | `Extension`, `Theme`, `Video`, `Misc` |
| `EntrySource` | `GitHubSearch`, `NpmSearch`, `YouTubeSearch`, `Discord`, `Manual` |
| `HealthLevel` | `Active`, `Maintained`, `Stale`, `Dead` |

`CATEGORIES` is a `Category[]` in priority order (`Extension > Theme > Video > Misc`), iterable at runtime.

Other types:

| Type | Purpose |
|------|---------|
| `Entry` | Final enriched record: id, name, url, source, description, metadata, health |
| `CategorizedEntry` | Entry + category |
| `Health` | Score 0–100 + `HealthLevel` |
| `DiscoveryCandidate` | Raw discovery output: url, source, optional hint/id/metadata |
| `BlacklistEntry` | url + reason + blacklisted_at + source + optional discovery metadata |

### `repository.ts` — Generic Repository Interface

- **`Repository<T>` interface** — swappable storage with `init/has/get/set/delete/list/size/flush/clear`.
- **`FileRepository<T>`** — flat file-per-entry: `dataDir/<sha256-trunc>.json`. Key → 16 hex chars via truncated SHA-256.
- Designed for future SQLite migration: just implement `Repository<T>` with a different backend.

### `cache.ts` — Generic TTL File Cache

- File-based cache in a configurable directory. Per-key TTL (default 1h). Lazy eviction on access.
- Injectable clock — tests use fake clocks and run in microseconds.
- Used by sources to avoid redundant API calls.

### `throttle.ts` — Rate-Limited HTTP Client

- **Request spacing** — enforces minimum interval between requests via "next allowed time" model.
- **Automatic retry** — on 429/502/503/504, exponential backoff (2s → 4s → 8s → 16s → 32s) up to `maxRetries`.
- **Never throws** — always returns a `Response`. Callers check `response.ok`.
- Injectable `clock` + `sleepFn` for deterministic tests.

### `paginate.ts` — Generic Numbered-Page Pagination

Composes `ThrottledFetcher` + `Cache` into a paginator.

- Caller provides `buildUrl(page)` and `parse(body)` callbacks.
- Supports `maxPages`, `earlyStop` callback, and offline mode.
- Caches raw response bodies — second call with same URL reads from cache.
- Stops on: empty page, all items fetched, maxPages reached, or `earlyStop` returns true.

### Supporting Modules

| File | Purpose |
|------|--------|
| `blacklist.ts` | Load/save URL blacklist (`data/blacklist.json`). Grown by the filter stage. Each entry has url, reason, blacklisted_at (ISO-8601), source (e.g. "filter", "manual", "import"), and optional discovery metadata (source name + query). |
| `store.ts` | Entry store facade for `data/`. Delegates to `FileRepository<CategorizedEntry>`. |
| `sort.ts` | Canonical entry ordering (health level → score → name). Shared by README render and site. |
| `ids.ts` | URL → human-readable ID: npm name, GitHub `owner-repo`, YouTube `YT_<videoId>`. |
| `html.ts` | HTML entity decoding. Used by YouTube title/description parsing. |
| `dedup.ts` | Duplicate detection by URL + GitHub URL cross-reference. Used by the process stage. |
| `terms.ts` | Canonical `SEARCH_TERMS` array shared by all sources. |
| `timestamp.ts` | Shared UTC timestamp formatting (`formatBuildTimestamp()`). Used by README generator and site build. |
| `temporal.ts` | Side-effect import of `temporal-polyfill/global`. |

---

## Stage 1: Discover

**Goal:** Gather every candidate from APIs. No filtering, no rejection, no dedup. Just fetch + cache.

### Current state: ✅ Done

Sources run in **two phases** within `runDiscovery()`:

1. **Discover** (parallel) — all sources fetch candidates simultaneously, writing to `.cache/candidates/`. No filtering, no dedup.
2. **Enrich** (sequential) — sources with an `enrich()` method make follow-up API calls to augment already-written candidates. Currently only YouTube implements this (fetches video statistics). npm/GitHub have no second phase.

```typescript
interface Source {
  readonly name: string;        // e.g. "npm"
  readonly source: EntrySource; // e.g. EntrySource.NpmSearch
  discover(writer: DiscoveryWriter): Promise<void>;
  enrich?(writer: DiscoveryWriter): Promise<void>; // optional second pass
  scoreHealthDimensions(entry: Entry): HealthDimensions; // source-specific health scoring
}
```

### Sources

#### npm (`sources/npm.ts`) ✅

High-precision `keywords:` queries only. Composes `ThrottledFetcher(0.5 rps)` + `paginate()` + `Cache`.

**Default queries:** `keywords:pi-package`, `keywords:pi-extension`, `keywords:pi-theme`, `keywords:pi-coding-agent`

ID: full npm package name (e.g. `@scope/pi-extension`).

**Metadata fields captured:**

| Field | Type | Source | Health relevance |
|-------|------|--------|-----------------|
| `npm_name` | `string` | `package.name` | Identifier |
| `description` | `string` | `package.description` | Classification |
| `keywords` | `string[]` | `package.keywords` | Classification, filter |
| `version` | `string \| null` | `package.version` | Freshness |
| `published_at` | `string \| null` | `package.date` | Freshness (last publish) |
| `github_url` | `string \| null` | `package.links.repository` | Dedup, cross-ref |
| `npm_downloads_monthly` | `number \| null` | `downloads.monthly` | Popularity |
| `npm_downloads_weekly` | `number \| null` | `downloads.weekly` | Popularity velocity |
| `npm_score_final` | `number \| null` | `score.final` | Overall npm quality |
| `npm_score_popularity` | `number \| null` | `score.detail.popularity` | Popularity (0–1) |
| `npm_score_quality` | `number \| null` | `score.detail.quality` | Code quality (0–1) |
| `npm_score_maintenance` | `number \| null` | `score.detail.maintenance` | Maintenance (0–1) |

#### GitHub (`sources/github.ts`) ✅

Repo search. Composes `ThrottledFetcher(0.5 rps)` + `paginate()`. Uses `GITHUB_TOKEN` env var for higher rate limits (30 req/min vs 10).

**Default queries:** `pi-coding-agent language:TypeScript`, `pi-extension language:TypeScript`, `pi-theme language:TypeScript`, `topic:pi-agent`, `topic:pi-coding-agent`

ID: `owner-repo`.

**Metadata fields captured:**

| Field | Type | Source | Health relevance |
|-------|------|--------|-----------------|
| `repo_full_name` | `string` | `full_name` | Identifier |
| `description` | `string` | `description` | Classification |
| `stars` | `number` | `stargazers_count` | Popularity |
| `forks` | `number` | `forks_count` | Community engagement |
| `open_issues` | `number` | `open_issues_count` | Activity / backlog |
| `topics` | `string[]` | `topics` | Classification, filter |
| `language` | `string \| null` | `language` | Filter |
| `archived` | `boolean` | `archived` | Dead (hard kill) |
| `created_at` | `string` | `created_at` | Age |
| `pushed_at` | `string \| null` | `pushed_at` | Freshness (last commit) |
| `updated_at` | `string` | `updated_at` | Last activity |
| `size` | `number` | `size` | Depth (KB) |
| `license` | `string \| null` | `license.spdx_id` | Open-source signal |

#### YouTube (`sources/youtube.ts`) ✅

YouTube Data API v3 search. Token-based pagination (`nextPageToken`). Requires `YOUTUBE_API_KEY` env var. Gracefully skipped if missing.

ID: `YT_<videoId>`.

**Two-phase discovery:**

1. **Discover** — search API fetches candidates with snippet metadata
2. **Enrich** — `videos.list?part=statistics` batches 50 video IDs per request (1 quota unit each) to fetch view/like/comment counts

**Metadata fields (phase 1 — search):**

| Field | Type | Source | Health relevance |
|-------|------|--------|-----------------|
| `title` / `name` | `string` | `snippet.title` | Identifier, classification |
| `description` | `string` | `snippet.description` | Classification, filter |
| `channel` | `string` | `snippet.channelTitle` | Authority signal |
| `published_at` | `string` | `snippet.publishedAt` | Freshness |
| `thumbnail` | `string \| null` | `snippet.thumbnails` | Display |

**Metadata fields (phase 2 — enrichment via `videos.list`):**

| Field | Type | Source | Health relevance |
|-------|------|--------|-----------------|
| `views` | `number` | `statistics.viewCount` | Popularity |
| `likes` | `number` | `statistics.likeCount` | Engagement |
| `comments` | `number` | `statistics.commentCount` | Engagement |

**Enrichment cost:** ~16 requests for 800 videos = 16 quota units (negligible vs 10 000 daily limit).

### DiscoveryWriter (`discover/writer.ts`)

Pure write-through to `.cache/candidates/`. No dedup, no filtering. Tracks per-source counts for reporting.

## Stage 2: Filter

**Goal:** Take raw candidates from `.cache/candidates/`, run the relevance filter, grow the blacklist, and write survivors to `.cache/filtered/`.

### Current state: ✅ Done

### Relevance Filter (`filter/filter.ts`) ✅

Composable `FilterRule[]` pipeline. First match wins.

**Three layers, evaluated in order:**

| Layer | Purpose | Examples |
|-------|---------|---------|
| **1. Hard blocks** (O(1)) | Cheap rejection | Blacklisted URLs, blocked scopes (`@stdlib`, `@pixi`, `@tiptap`), blocked names (`pi`, `const-pi`) |
| **2. Negative signals** | Pattern matching | Raspberry Pi, math π, PixiJS, Pi Network crypto, industrial (AVEVA), unrelated ecosystems, OpenAPI, non-Latin scripts, non-English Latin text |
| **3. Positive signals** | Pi Coding Agent markers | Name patterns (`pi-*`, `@scope/pi-*`), text (`pi coding agent`, `pi.dev`), topics (`pi-agent`), keywords (`pi-package`) |
| **4. Default** | Catch-all | No positive signal → **REJECT** |

Rejected URLs are added to the blacklist for future discover runs (the blacklist is read at filter time, not discover time).

---

## Stage 3: Process

**Goal:** Take filtered candidates from `.cache/filtered/`, resolve duplicates (npm > GitHub), classify, enrich with metadata, and write canonical entries to `data/`.

### Current state: ✅ Done

### Dedup (`core/dedup.ts`) ✅

Builds two indices from the canonical `data/` store:

| Index | Key | Purpose |
|-------|-----|---------|
| `byUrl` | Entry URL | Direct URL match |
| `byGitHubUrl` | `metadata.github_url` | Cross-reference: npm packages link to their GitHub repo |

When an npm candidate's `github_url` matches an existing GitHub entry's URL, the GitHub entry is replaced by the npm one (npm URL is canonical).

Candidates are **sorted by source priority** (npm → GitHub → YouTube → Manual) so npm entries are always processed first.

### Classification (`enrich/classify.ts`) ✅

Four categories: `Extension > Theme > Video > Misc`. See [Classification](#classification).

### ✅ Health scoring

Two-layer architecture: each source implements `scoreHealthDimensions()` on the `Source` interface (source-specific metadata interpretation); generic combiner (`enrich/health.ts`) applies weighted formula + hard rules. See [Health Scoring Architecture](#health-scoring-architecture) for full design.

---

## Stage 4: Generate

**Goal:** Read canonical entries from `data/`, render `README.md`.

### Current state: ✅ Done

### Rendering

Two files: `index.ts` (CLI entry point) and `render.ts` (pure rendering logic, exported `renderREADME()`).

**Sorting:** Entries are sorted by health level (Active → Maintained → Stale → Dead), then by health score descending, then by name alphabetically. This ensures the healthiest, most popular entries appear first.

**Category sections:**

| Category | Layout | Columns / Format |
|----------|--------|-------------------|
| Extension | Table | Health, Name, Description, Popularity, Updated |
| Theme | Table | Health, Name, Description, Popularity, Updated |
| Video | Table | Health, Name, Description, Popularity, Updated |
| Misc | Table | Health, Name, Description, Popularity, Updated |

**Popularity column:** Shows the strongest available signal per source:

| Source | Signal | Format | Example |
|--------|--------|--------|--------|
| YouTube | Views | `📺<n>` | `📺10.5k` |
| GitHub | Stars | `⭐<n>` | `⭐314` |
| npm | Monthly downloads | `⬇ <n>/mo` | `⬇ 20.5k/mo` |

All sources store the relevant metric in metadata at discovery (YouTube via enrichment phase). No additional API calls needed at render time.

**Health badges:** Colour-coded circles per health level:

| Level | Badge |
|-------|-------|
| Active | 🟢 |
| Maintained | 🟡 |
| Stale | 🟠 |
| Dead | 🔴 |

**Timestamps:** Relative time strings ("today", "yesterday", "3d ago", "2mo ago") computed from `pushed_at` / `published_at` / `updated_at` metadata via Temporal.

**Structure:**

1. Header — title, awesome badge, description, site link
2. Stats — total entries, active/maintained counts, health legend
3. Contents — dynamic TOC with per-category counts and working anchors
4. Category sections (Extensions → Themes → Videos & Tutorials → Miscellaneous)
5. Footer — generation date, entry count, source breakdown

### Rendering pipeline

```
data/entries/*.json
       │
       ▼
  loadEntries()          Read all CategorizedEntry JSON files
       │
       ▼
  Group by category      extension / theme / video / misc
  Count by health        active / maintained / stale / dead
  Count by source        npm-search / github-search / youtube-search
       │
       ▼
  renderREADME()         Pure function, returns markdown string
    ├─ header + stats
    ├─ TOC (anchors match GitHub slugification)
    ├─ sortEntries() per category
    │   └─ table layout (Extension, Theme, Video, Misc)
    └─ footer
       │
       ▼
  README.md              Written to project root
```

**GitHub anchor compatibility:** The TOC generates anchors matching GitHub's slug algorithm — non-alphanumeric characters (like `&`) are stripped (not replaced), and spaces become hyphens. This produces `#videos--tutorials` for `Videos & Tutorials`.

---

## Classification

### Categories

The awesome-list uses **four categories** (TypeScript string enum `Category`):

| Category | Description | Signals |
|----------|-------------|---------|
| `Extension` | Extends Pi's behaviour — plugins, skills, MCP servers | `extension`, `hook`, `plugin`, `mcp-server`, `skill`, `tool` |
| `Theme` | Visual themes / colour schemes | `theme`, `colorscheme`, known names (`catppuccin`, `dracula`, `monokai`, `gruvbox`, `nord`, `solarized`, `rose-pine`) |
| `Video` | YouTube videos, tutorials | YouTube URL (hard rule, no keyword matching) |
| `Misc` | Everything else — CLIs, dashboards, providers, templates | Catch-all fallback |

**Priority:** `Extension > Theme > Video > Misc`. A single entry can match multiple categories; the classifier applies hard priority.

### Classification signals (in order)

1. **URL heuristics** — YouTube URLs → `Video`. Deterministic, always wins.
2. **Keyword matching** — name + description scanned for category-specific terms.
3. **Default fallback** → `Misc`.

### Why four, not eight

The previous taxonomy had 8 categories (`extension`, `tool`, `theme`, `provider`, `template`, `video`, `example`, `documentation`). Problems:

- `tool` vs `extension` was ambiguous — many Pi packages are both
- `provider`, `template`, `example` had too few entries
- Automated classification was ~60% accurate across 8 categories, ~90%+ across 4

### Health Scoring Architecture

### Two-layer design

Health scoring follows the same pattern as YouTube enrichment: **metadata interpretation is source-specific; the formula is generic.**

```
┌───────────────────────────────┐     ┌──────────────────────────────┐
│  Source.scoreHealthDimensions │     │  Generic combiner            │
│  (per source: npm.ts, etc.)   │────▶│  (enrich/health.ts)          │
│                               │     │                              │
│  npm.ts:    metadata → dims   │     │  dims × weights → raw score  │
│  github.ts: metadata → dims   │     │  hard rules → final Health   │
│  youtube.ts:metadata → dims   │     │                              │
└───────────────────────────────┘     └──────────────────────────────┘
```

**Layer 1 — Source `scoreHealthDimensions()` method** (on the `Source` interface):
- Each source implements this method to interpret its own metadata fields into `HealthDimensions` (four 0–100 scores).
- Sources know their own metadata schema: npm reads `npm_downloads_monthly`, GitHub reads `stars`, YouTube reads `views`.
- Shared helpers (`sources/scoring.ts`) provide `scoreFreshness()`, `scoreMetric01()`, `scoreActivityDays()`, `clamp()`.
- The `getHealthScorer()` function in `sources/index.ts` provides a registry lookup by `EntrySource` for the process stage.

**Layer 2 — Generic combiner** (`enrich/health.ts`):
- Takes `HealthDimensions`, applies the weighted formula.
- Enforces hard rules (archived → Dead, YouTube cap at Maintained).
- Returns `Health`.

### Types

```typescript
// core/types.ts — Source interface (excerpt)
interface Source {
  readonly name: string;
  readonly source: EntrySource;
  discover(writer: DiscoveryWriter): Promise<void>;
  enrich?(writer: DiscoveryWriter): Promise<void>;
  scoreHealthDimensions(entry: Entry): HealthDimensions;  // ← Layer 1
}
```

### Entry → Health flow (in `process/index.ts`)

```typescript
const scorer = getHealthScorer(entry.source);  // registry lookup
const dims = scorer(entry);                      // source.scoreHealthDimensions()
const health = computeHealth(entry, dims);       // generic combiner
```

### Health levels

Each entry receives a `Health` object: `{ score: 0–100, level: HealthLevel }`.

| Level | Score | Typical profile |
|-------|-------|-----------------|
| `Active` | ≥70 | Recent commit, high npm downloads |
| `Maintained` | ≥40 | Activity in last 365 days |
| `Stale` | ≥15 | Low/no activity in 365+ days |
| `Dead` | <15 | Archived, or no activity in 2+ years |

### Hard rules (override formula)

- `archived: true` → `Dead` immediately (score = 0)
- No `pushed_at` / `published_at` at all → cap at `Stale` (max 39)
- YouTube entries → cap at `Maintained` (max score 60)

### Generic formula

`score = freshness×0.35 + popularity×0.30 + activity×0.20 + depth×0.15`

### Source-specific dimension scoring tables

#### npm

| Dimension | Metadata fields | Scoring |
|-----------|----------------|---------|
| **Freshness** (35%) | `published_at` | < 30d → 100, < 90d → 80, < 180d → 60, < 365d → 40, < 730d → 20, ≥ 730d → 5 |
| **Popularity** (30%) | `npm_downloads_monthly` | ≥ 10k → 100, ≥ 1k → 70, ≥ 100 → 40, ≥ 10 → 20, < 10 → 5 |
| **Activity** (20%) | `npm_score_maintenance` (0–1) | 1.0 → 100, 0.5 → 50, 0.0 → 5 |
| **Depth** (15%) | `npm_score_quality` (0–1) | 1.0 → 100, 0.5 → 50, 0.0 → 5 |

#### GitHub

| Dimension | Metadata fields | Scoring |
|-----------|----------------|---------|
| **Freshness** (35%) | `pushed_at` | < 30d → 100, < 90d → 80, < 180d → 60, < 365d → 40, < 730d → 20, ≥ 730d → 5 |
| **Popularity** (30%) | `stars` + `forks` | ≥ 1k stars → 100, ≥ 100 → 70, ≥ 10 → 40, ≥ 1 → 20, 0 → 5 |
| **Activity** (20%) | `updated_at` + `open_issues` | < 30d + open issues → 100, < 90d → 60, < 365d → 30, ≥ 365d → 5 |
| **Depth** (15%) | `size` (KB) | ≥ 10k → 100, ≥ 1k → 60, ≥ 100 → 30, < 100 → 10 |

#### YouTube

| Dimension | Metadata fields | Scoring |
|-----------|----------------|---------|
| **Freshness** (35%) | `published_at` (video date) | < 30d → 100, < 90d → 80, < 180d → 60, < 365d → 40, ≥ 365d → 20 |
| **Popularity** (30%) | `views` (from enrichment) | ≥ 10k → 100, ≥ 1k → 60, ≥ 100 → 30, < 100 → 10 |
| **Activity** (20%) | `likes` + `comments` | Combined engagement: ≥ 1k → 100, ≥ 100 → 60, ≥ 10 → 30, < 10 → 5 |
| **Depth** (15%) | — | Always 0 (videos have no code depth) |

### Cross-source boost

When an npm entry has a `github_url` pointing to a GitHub repo also in the dataset, the higher of the two popularity scores is used for the npm entry. This is handled in `process/index.ts` before calling `computeHealth()`.

---

## Identity Model & Storage

The canonical key is the **URL** itself. Filenames are SHA-256 hashes of the URL truncated to 16 hex chars (64 bits of entropy).

| Source | Canonical URL | Display ID | Filename |
|--------|-------------|-----------|----------|
| npm | `https://www.npmjs.com/package/pi-mcp` | `pi-mcp` | `data/entries/a1b2c3d4e5f67890.json` |
| GitHub | `https://github.com/shaftoe/pi-mcp` | `shaftoe-pi-mcp` | `data/entries/d4e5f67890a1b2c3.json` |
| YouTube | `https://youtube.com/watch?v=ID` | `YT_ID` | `data/entries/7890a1b2c3d4e5f6.json` |

**Dedup rule: npm wins over GitHub.** If an npm package and a GitHub repo represent the same project, the npm URL is the canonical key. The process stage resolves this by sorting npm entries first and replacing GitHub entries when cross-referenced via `github_url`.

### Data Layout

```
data/entries/                            Canonical entry store (Stage 3 output)
  *.json                            CategorizedEntry (category inside JSON)

data/                              Meta files
  blacklist.json                    URL → reason map (grown by Stage 2)

.cache/
  page_*.json                       Cached API response bodies (Stage 1)
  candidates/                       Raw discoveries (Stage 1 output)
    *.json                          DiscoveryLine (discoverer + discovery)
  filtered/                         Post-filter candidates (Stage 2 output, not yet)
    *.json                          DiscoveryLine (survived filter)
```

---

## CLI Modes & Offline Workflow

### Commands

| Command | Stage | Description |
|---------|-------|-------------|
| `bun run discover` | 1 | Gather candidates from APIs + cache responses |
| `bun run discover -- --query [source:]term` | 1 | Override source queries (prefixes: `npm:`, `gh:`, `yt:`) |
| `bun run discover -- --offline` | 1 | Only use cached API responses |
| `bun run filter` | 2 | Filter candidates → grow blacklist → write survivors |
| `bun run process` | 3 | Dedup + classify + enrich → write canonical entries |
| `bun run generate` | 4 | Render README.md from canonical entries |
| `bun run pipeline` | 1–4 | Run discover → filter → process → generate sequentially |
| `bun run blacklist` | — | Manage URL blacklist (`add`, `list`, `check`, `remove` subcommands) |
| `bun run check` | — | Typecheck + lint |
| `bun run test` | — | Run all tests |
| `bun run clean` | — | Delete `data/` and `.cache/` directories |

### Typical Development Workflow

```bash
# 1. Seed the cache with targeted queries (hits API, caches responses)
bun run discover --query "gh:pi-coding-agent"

# 2. Run filter on gathered candidates (no API calls)
bun run filter

# 3. Process filtered candidates into canonical entries
bun run process

# 4. Generate README
bun run generate

# Or run everything:
bun run pipeline
```

### Offline workflow (no API calls)

```bash
# Re-run any stage without touching the network
bun run discover --offline   # reads from .cache/ API responses
bun run filter                # reads from .cache/candidates/
bun run process               # reads from .cache/filtered/
bun run generate              # reads from data/
```

---

## Key Design Decisions

1. **Four-stage pipeline** — Discover → Filter → Process → Generate. Each stage is independent, idempotent, and has clear input/output contracts.
2. **No filtering at discover time** — sources run in parallel; filtering at gather time creates race conditions and premature rejection. Discovery is a pure fetch-and-cache operation.
3. **npm URL is canonical** — when the same project appears on both npm and GitHub, the npm URL wins. Resolved in the process stage by sorting npm first and cross-referencing `github_url`.
4. **Blacklist grows in filter stage** — rejected candidates are added to `data/blacklist.json` with the reason, ISO-8601 timestamp, source type, and optional discovery metadata (source name + query). This is the primary mechanism for handling the noisy long tail.
5. **Temporal over Date** — all date/time uses `Temporal.Instant` and `Temporal.Now`. `temporal-polyfill` provides runtime support until Bun ships native Temporal.
6. **Fully injectable timing** — `Cache` and `ThrottledFetcher` accept `now()`. Tests run in microseconds.
7. **`ThrottledFetcher.fetch()` never throws** — always returns a `Response`. Only `paginate()` throws on non-OK responses.
8. **`paginate()` caches raw response bodies** — second call with same URL reads from cache.
9. **No base classes for sources** — compose `paginate()` + `ThrottledFetcher` instead of inheriting.
10. **No global mutable state** — stats returned from functions, not stored in singletons.
11. **`Repository<T>` interface** — generic storage abstraction. Current `FileRepository<T>` stores flat `dataDir/<sha256-trunc>.json`. Future SQLite swap only requires implementing the interface.
12. **String enums for domain vocabularies** — `Category`, `EntrySource`, `HealthLevel` are TypeScript string enums. Serializable as plain JSON strings, iterable at runtime via `CATEGORIES`, catch typos at compile time.
