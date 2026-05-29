# InsightsLake v0.4.1 Website Update Design

Date: 2026-05-29

## Goal

Update the static InsightsLake website so it uses the new `v0.4.1` report assets instead of `v0.4`, and add a concise release-style summary on the `reports` page. The `reports` page must also provide a clear way to jump to the author's GitHub homepage.

## Approved Scope

The user approved the following scope:

- Switch the website's active report/data version from `v0.4` to `v0.4.1`
- Add a short `v0.4.1` update summary on the `reports` page only
- Add a GitHub homepage link on the `reports` page

The user did not ask for a full changelog, dynamic diff generation, or a broad visual redesign.

## Current State

The current site is a static site under `docs/` with versioned CSV assets under `docs/assets/data/`. The primary data loading path and several download links currently point to `v0.4` files.

Relevant existing behavior:

- `docs/assets/js/app.js` hardcodes the main dataset URL as `assets/data/cgp_ch_density_sram_compare_v0_4.csv`
- `index.html` includes direct download links to `v0.4` CSV files
- `reports.html` lists `v0.4` CSV exports and one legacy `v0.3` workbook
- English and Chinese text in `app.js` explicitly mentions `v0.4`

## Data Findings

Comparison of `report/v4` assets shows that `v0.4.1` is not just a file rename:

- Main compare dataset rows: `71 -> 72`
- Main compare dataset columns: `32 -> 37`
- Data quality report rows: `44 -> 96`
- Data quality report columns: `3 -> 7`
- Derived metrics rows: `71 -> 72`
- Derived metrics columns: `15 -> 17`
- Process observations rows: `71 -> 72`
- Process observations columns: `63 -> 68`
- Raw source index rows: `48 -> 60`

The main compare dataset keeps the existing core fields used by the current UI, while adding more fields and one new record. The data quality report in `v0.4.1` becomes a row-level issue list rather than the old summary-style shape.

## Design Decisions

### 1. Data Asset Strategy

Keep versioned files in `docs/assets/data/` and add the new `v0.4.1` CSVs there without deleting the old `v0.4` files.

Reasoning:

- It preserves explicit version history inside the published site
- It avoids silently breaking old references during this update
- It keeps the change small and appropriate for a static site

Files to publish into `docs/assets/data/`:

- `cgp_ch_density_sram_compare_v0_4_1.csv`
- `data_quality_report_v0_4_1.csv`
- `derived_metrics_v0_4_1.csv`
- `process_observations_v0_4_1.csv`
- `raw_sources_v0_4_1.csv`

### 2. Version Configuration

Introduce a lightweight front-end configuration point for site-level versioned references instead of leaving version strings scattered across HTML and JS.

This configuration will define:

- Current dataset version string: `v0.4.1`
- Main dataset URL
- Reports/download URLs
- GitHub homepage URL: `https://github.com/TabNahida`

This is intentionally lightweight and local to the current front-end codebase. No build step or dynamic generation is introduced.

### 3. Data Loading Behavior

All interactive pages should load `v0.4.1` as the active dataset.

Implementation intent:

- Replace the current hardcoded main dataset URL with the configured `v0.4.1` URL
- Update any direct download links that should point to the current report version
- Update text strings that mention the active report version

No generic CSV schema adapter is planned in this change. The site should continue to read the existing core fields it already depends on. If any page turns out to rely on a field name that changed in `v0.4.1`, targeted compatibility handling can be added during implementation, but schema abstraction is out of scope for this update.

### 4. Reports Page Update Summary

Add a short release-style summary section to `docs/reports.html`, placed between the existing hero section and the report download grid.

The summary should be brief and high-signal, not a technical changelog. It should present approximately 3 to 5 bullets derived from confirmed report differences. The messaging should stay at a product/release-note level.

Planned summary content:

- Main dataset updated from `71` to `72` records
- Source index expanded from `48` to `60` entries
- Multiple report exports now include richer metadata/context columns
- Data quality reporting now uses a finer-grained issue list instead of the older summary-only format

### 5. GitHub Homepage Entry

Add a clear external CTA on the `reports` page that links to `https://github.com/TabNahida`.

Placement:

- Within the new `v0.4.1` summary area or immediately adjacent to the hero content

Intent:

- Give users an obvious path to the author's GitHub homepage
- Keep the link associated with the report/update context rather than hiding it in the footer

### 6. Existing Download Grid

Keep the current report card layout and legacy workbook card, but update the active CSV cards so they point to `v0.4.1` files and describe them as `v0.4.1` assets.

The legacy `v0.3` workbook remains available as a historical export.

## Content and UX Requirements

- The new summary appears only on the `reports` page
- The summary is concise and release-note-like, not a long diff
- The GitHub entry is easy to spot and clearly marked as an external destination
- English and Chinese strings that reference the current active report version must reflect `v0.4.1`
- The change should preserve the site's existing visual language and layout patterns

## Non-Goals

- No redesign of ranking, density, or yield features
- No automated changelog generation from CSV diffs
- No new build tooling
- No restructuring of the site's navigation
- No removal of legacy `v0.4` or `v0.3` assets unless separately requested

## Validation Plan

Implementation will be considered correct only if these checks pass:

- The home page, ranking page, density page, and reports page load successfully with the `v0.4.1` dataset
- The `reports` page shows the new summary block and GitHub CTA in both English and Chinese
- All primary download links on the `reports` page point to `*_v0_4_1.csv`
- The legacy `v0.3` workbook link still works
- The new `reports` page content remains readable on desktop and mobile layouts

## Assumptions

- The intended GitHub homepage is `https://github.com/TabNahida`
- `v0.4.1` preserves the existing core field names used by the UI logic
- The update summary should be authored manually from verified differences rather than computed in the browser
