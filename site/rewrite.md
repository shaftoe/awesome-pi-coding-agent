# Site Rewrite Plan

**Last updated:** 2026-04-27

Adapt the Astro/Starlight site (`site/`) to consume the new four-stage pipeline architecture documented in `docs/ARCHITECTURE.md`.

---

## Problem Statement

The site was built against an **old data layout** with 8 categories stored in per-category subdirectories (`data/extensions/*.json`, `data/themes/*.json`, etc.). The new pipeline uses a **flat entry store** (`data/entries/*.json`) with a `category` field inside each JSON file and only **4 categories** (Extension, Theme, Video, Misc).

This creates several mismatches:

| Aspect | Old (site expects) | New (pipeline provides) |
|--------|--------------------|-------------------------|
| Entry storage | `data/{category}s/` dirs | `data/entries/` flat dir |
| Categories | 8 (`extension`, `tool`, `theme`, `provider`, `template`, `video`, `example`, `documentation`) | 4 (`Extension`, `Theme`, `Video`, `Misc`) |
| Category type | lowercase strings | PascalCase string enum |
| Data bridge | `src/lib/site-data.ts` (doesn't exist yet) | `site/src/lib/data.ts` re-exports `@pipeline/lib/site-data.ts` |
| Metadata fields | `stars`, `last_commit`, `language` | Source-specific: `stars` (GitHub), `views` (YouTube), `npm_downloads_monthly` (npm) |
| Health levels | `active`, `maintained`, `stale`, `dead` (lowercase) | `Active`, `Maintained`, `Stale`, `Dead` (PascalCase) |
| Search index | Inlines old category list + reads old dir layout | Must read `data/entries/` flat dir |

---

## Task Breakdown

### 1. Refactor `site/src/lib/` — site presentation layer ✅

Instead of creating a bridge module `src/lib/site-data.ts` (rejected — would duplicate data access), the site imports **data access** directly from pipeline core and keeps **presentation logic** in its own `site/src/lib/`:

| Concern | Source | Import path |
|---------|--------|-------------|
| Data access (loadAllEntries, etc.) | `src/core/store.ts` | `@pipeline/core/store` |
| Types (Category, CategorizedEntry, etc.) | `src/core/types.ts` | `@pipeline/core/types` |
| HTML entity decode | `src/core/html.ts` | `@pipeline/core/html` |
| Category metadata, formatting, aggregation | **new** `site/src/lib/` files | local imports |

**New files in `site/src/lib/`:**

```
site/src/lib/
  data.ts          ← re-exports from @pipeline/core + local presentation
  categories.ts    ← CATEGORY_ORDER, CATEGORY_META, getCategories(), getStats()
  format.ts        ← displayName(), formatStars(), formatNumber(), timeAgo(), popularity()
```

**Why this is better:**
- When the store migrates to SQLite, only `src/core/store.ts` changes — the site doesn't care
- No duplicate file-reading code in a bridge module
- Clean dependency: site → core (presentation reads data), never the reverse
- `data.ts` is a thin facade: re-exports types/store from core + presentation helpers from local modules

### 2. Create `site/src/lib/categories.ts` — category metadata + aggregation ✅

New file containing all category presentation logic:

- `CATEGORY_ORDER` — display order (Extension → Theme → Video → Misc)
- `CATEGORY_META` — icon, title, description, href, slug per category
- `getCategories(entries)` — group entries by category, return `CategoryInfo[]`
- `getStats(entries)` — compute totals, health counts, source counts

### 3. Create `site/src/lib/format.ts` — formatting helpers ✅

New file with all presentation formatting:

- `displayName(entry)` — source-aware name (YouTube title, GitHub repo name, npm package name)
- `formatStars(n)` / `formatNumber(n)` — human-friendly numbers (1.2k, 314)
- `popularity(entry)` — source-aware popularity string (⭐ stars, ⬇ downloads, 📺 views)
- `timeAgo(isoDate)` — relative time ("3d ago", "2mo ago")
- `lastUpdated(entry)` / `language(entry)` — convenience metadata accessors

### 4. Rewrite `site/src/lib/data.ts` — thin re-export facade ✅

Rewritten to import from the correct sources:
- Types + data access from `@pipeline/core/store` and `@pipeline/core/types`
- HTML decode from `@pipeline/core/html`
- Presentation helpers from local `./categories.ts` and `./format.ts`

### 5. Update `site/astro.config.mjs` — sidebar + config ✅

Updated sidebar from 6 old categories to 4 new ones:

| Old | New |
|-----|-----|
| 🔌 Extensions | 🔌 Extensions |
| 🛠️ Tools & Utilities | *(merged into Extensions / Misc)* |
| 🎨 Themes | 🎨 Themes |
| 🔗 Providers | *(merged into Misc)* |
| 📋 Templates | *(merged into Misc)* |
| 🎬 Videos | 🎬 Videos & Tutorials |

Added `/misc` route.

### 6. Update `site/src/pages/[slug].astro` — category pages ✅

- Works with the new 4-category model
- Uses source-appropriate metadata fields (stars, npm_downloads_monthly, views)
- Shows appropriate popularity metric per source
- Health levels map correctly to CSS classes

### 7. Update `site/src/components/IndexPage.astro` — home page ✅

- Uses new `getStats()` and `getCategories()` APIs
- Category cards link to new slugs (`extensions`, `themes`, `videos`, `misc`)

### 8. Update `site/src/integrations/search-index.ts` — build-time data ✅

- Reads from `data/entries/` flat directory (not per-category dirs)
- Derives category from JSON `category` field (no hardcoded list)
- Source-aware popularity in search results

### 9. Update `site/src/integrations/build-checks.ts` — smoke tests ✅

- Checks for new `/misc/` route
- Verifies old routes (`/tools/`, `/providers/`, `/templates/`) do NOT exist

### 10. Update `site/src/components/Search.astro` — search UI ✅

- Updated `CATEGORY_ICONS` to new 4 categories
- Source-aware popularity display (📺 views, ⭐ stars, ⬇ downloads)

### 11. Update `site/src/styles/custom.css` — style adjustments ✅

Reviewed — no changes needed. Health badge CSS classes already use lowercase values which match the enum values (`active`, `maintained`, `stale`, `dead`).

### 12. Verify `site/src/content/docs/index.mdx` — landing page ✅

Verified — works correctly with updated `IndexPage.astro`.

### Bonus: Fix `src/core/store.ts` — bundled context compatibility ✅

Fixed `import.meta.dir` being `undefined` in Astro's Node-based prerender context. `resolveDataDir()` now falls back to `process.cwd()`-relative paths when `import.meta.dir` is unavailable or points to a non-existent directory.

---

## Dependency Graph

```
Task 1 (site/src/lib/categories.ts)  ┐
Task 2 (site/src/lib/format.ts)       ├─ can be done in parallel, no deps
Task 3 (site/src/lib/data.ts facade)  ┘  ← depends on tasks 1+2
  │
  ├── Task 4  (astro config)
  ├── Task 5  ([slug].astro pages)
  ├── Task 6  (IndexPage.astro)
  ├── Task 7  (search-index integration)
  ├── Task 8  (build-checks integration)
  ├── Task 9  (Search.astro)
  ├── Task 10 (custom.css)
  └── Task 11 (index.mdx)
```

All tasks complete. Build passes, all acceptance criteria met.

---

## Acceptance Criteria

- [x] `bun run check` passes (typecheck + lint)
- [x] `cd site && bun run build` succeeds
- [x] Build output has pages for: `/`, `/extensions/`, `/themes/`, `/videos/`, `/misc/`
- [x] No old category routes (`/tools/`, `/providers/`, `/templates/`) in build output
- [x] `search-index.json` contains entries from all 4 new categories
- [x] Health badges render correctly for all 4 levels
- [x] Entry cards show source-appropriate metadata (stars / downloads / views)
- [x] Post-build smoke checks pass

---

## Out of Scope

- Design changes / visual refresh
- New features (filters, sorting, etc.)
- Removing the Starlight dependency
- Server-side rendering / dynamic data
