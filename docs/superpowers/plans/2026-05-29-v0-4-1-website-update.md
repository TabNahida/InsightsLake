# InsightsLake v0.4.1 Website Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Switch the site to the `v0.4.1` report assets, add a concise `reports` page release summary, and add a GitHub homepage entry.

**Architecture:** Keep the site static. Publish the new CSV assets into `docs/assets/data`, add a lightweight front-end configuration for versioned asset URLs, update the reports page markup/styles, and keep `process-data.js` aligned so local file fallback uses the same dataset.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node built-in test runner

---

### Task 1: Add regression tests for versioned site references

**Files:**
- Create: `tests/site-v0-4-1.test.mjs`
- Test: `docs/index.html`
- Test: `docs/reports.html`
- Test: `docs/assets/js/app.js`

- [ ] **Step 1: Write the failing test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const indexHtml = readFileSync(new URL("../docs/index.html", import.meta.url), "utf8");
const reportsHtml = readFileSync(new URL("../docs/reports.html", import.meta.url), "utf8");
const appJs = readFileSync(new URL("../docs/assets/js/app.js", import.meta.url), "utf8");

test("app.js points the active dataset at v0.4.1 assets", () => {
  assert.match(appJs, /cgp_ch_density_sram_compare_v0_4_1\.csv/);
  assert.doesNotMatch(appJs, /const DATA_URL = "assets\/data\/cgp_ch_density_sram_compare_v0_4\.csv"/);
});

test("index page download controls are wired for configured downloads", () => {
  assert.match(indexHtml, /data-download="compare"/);
  assert.match(indexHtml, /data-download="quality"/);
});

test("reports page contains the v0.4.1 summary and github entry points", () => {
  assert.match(reportsHtml, /data-report-release-notes/);
  assert.match(reportsHtml, /data-github-home/);
  assert.match(reportsHtml, /data-download="compare"/);
  assert.match(reportsHtml, /data-download="sources"/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/site-v0-4-1.test.mjs`
Expected: FAIL because the current files still point at `v0.4` and the `reports` page does not yet contain the new summary/GitHub hooks.

- [ ] **Step 3: Commit**

```bash
git add tests/site-v0-4-1.test.mjs
git commit -m "test: add v0.4.1 website regression coverage"
```

### Task 2: Publish v0.4.1 assets and add front-end version configuration

**Files:**
- Create: `docs/assets/data/cgp_ch_density_sram_compare_v0_4_1.csv`
- Create: `docs/assets/data/data_quality_report_v0_4_1.csv`
- Create: `docs/assets/data/derived_metrics_v0_4_1.csv`
- Create: `docs/assets/data/process_observations_v0_4_1.csv`
- Create: `docs/assets/data/raw_sources_v0_4_1.csv`
- Modify: `docs/assets/js/app.js`
- Modify: `docs/index.html`

- [ ] **Step 1: Copy the approved report assets into the published data directory**

Run:

```powershell
Copy-Item report/v4/cgp_ch_density_sram_compare_v0_4_1.csv docs/assets/data/
Copy-Item report/v4/data_quality_report_v0_4_1.csv docs/assets/data/
Copy-Item report/v4/derived_metrics_v0_4_1.csv docs/assets/data/
Copy-Item report/v4/process_observations_v0_4_1.csv docs/assets/data/
Copy-Item report/v4/raw_sources_v0_4_1.csv docs/assets/data/
```

- [ ] **Step 2: Add the lightweight site config in `app.js`**

```js
const SITE_CONFIG = Object.freeze({
  currentVersion: "v0.4.1",
  dataUrl: "assets/data/cgp_ch_density_sram_compare_v0_4_1.csv",
  downloads: Object.freeze({
    compare: "assets/data/cgp_ch_density_sram_compare_v0_4_1.csv",
    quality: "assets/data/data_quality_report_v0_4_1.csv",
    metrics: "assets/data/derived_metrics_v0_4_1.csv",
    observations: "assets/data/process_observations_v0_4_1.csv",
    sources: "assets/data/raw_sources_v0_4_1.csv",
    legacyWorkbook: "assets/data/foundry_process_density_public_v0_3.xlsx",
  }),
  githubUrl: "https://github.com/TabNahida",
});

const DATA_URL = SITE_CONFIG.dataUrl;
```

- [ ] **Step 3: Add DOM binding helpers for configured links and visible version labels**

```js
function applySiteConfig() {
  document.querySelectorAll("[data-download]").forEach((link) => {
    const href = SITE_CONFIG.downloads[link.dataset.download];
    if (href) {
      link.href = href;
    }
  });

  document.querySelectorAll("[data-current-version]").forEach((node) => {
    node.textContent = SITE_CONFIG.currentVersion;
  });

  document.querySelectorAll("[data-github-home]").forEach((link) => {
    link.href = SITE_CONFIG.githubUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
  });
}
```

- [ ] **Step 4: Call the config binding before data load**

```js
document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  applySiteConfig();
  initLanguage();
  activateCurrentNav();
  loadData();
});
```

- [ ] **Step 5: Update home page anchors to use data-download hooks**

```html
<a class="command" href="assets/data/cgp_ch_density_sram_compare_v0_4_1.csv" data-download="compare" data-i18n="common.downloadCsv">
  Download CSV
</a>
<a class="command" href="assets/data/data_quality_report_v0_4_1.csv" data-download="quality" data-i18n="common.dataQualityCsv">
  Data quality CSV
</a>
```

- [ ] **Step 6: Update versioned copy in `app.js` translations**

```js
"common.downloadCsv": "Download v0.4.1 CSV",
"common.dataQualityCsv": "Data quality v0.4.1 CSV",
"home.lead": "A static analysis console for the v0.4.1 public semiconductor process dataset, combining logic density, SRAM bitcell, CPP/CGP, cell height, and source confidence.",
"reports.lead": "Download the v0.4.1 normalized CSV exports used by the interactive pages.",
```

- [ ] **Step 7: Run tests to verify Task 2 progress**

Run: `node --test tests/site-v0-4-1.test.mjs`
Expected: Some checks may still fail until the reports page summary is added, but the `app.js` dataset path and home-page hooks should be satisfied.

### Task 3: Add the reports release summary and GitHub CTA

**Files:**
- Modify: `docs/reports.html`
- Modify: `docs/assets/js/app.js`
- Modify: `docs/assets/css/styles.css`

- [ ] **Step 1: Add the summary section markup to `reports.html`**

```html
<section class="release-band page-section" data-report-release-notes>
  <div class="release-card">
    <div class="section-head compact release-head">
      <div>
        <p class="eyebrow" data-i18n="reports.updateEyebrow">LATEST UPDATE</p>
        <h2><span data-current-version></span> <span data-i18n="reports.updateTitle">release summary</span></h2>
      </div>
      <a class="command primary" href="https://github.com/TabNahida" data-github-home data-i18n="reports.githubCta">Visit GitHub profile</a>
    </div>
    <p class="lead release-lead" data-i18n="reports.updateLead">
      Short release notes for the current public dataset refresh.
    </p>
    <ul class="release-list">
      <li data-i18n="reports.updateItem1">Main dataset coverage increases from 71 to 72 rows.</li>
      <li data-i18n="reports.updateItem2">Raw source coverage expands from 48 to 60 entries.</li>
      <li data-i18n="reports.updateItem3">Primary exports now carry richer metadata and context columns.</li>
      <li data-i18n="reports.updateItem4">Data quality reporting now tracks row-level issues instead of only the older summary view.</li>
    </ul>
  </div>
</section>
```

- [ ] **Step 2: Update report card download hooks**

```html
<a class="report-card primary-report" href="assets/data/cgp_ch_density_sram_compare_v0_4_1.csv" data-download="compare">
  <span>CSV</span>
  <strong>CGP / CH / Density / SRAM Dataset <span data-current-version></span></strong>
</a>
```

Apply the same `data-download` pattern for `quality`, `metrics`, `observations`, `sources`, and `legacyWorkbook`.

- [ ] **Step 3: Add i18n entries for the release summary and GitHub CTA**

```js
"reports.updateEyebrow": "LATEST UPDATE",
"reports.updateTitle": "release summary",
"reports.updateLead": "Short release notes for the current public dataset refresh.",
"reports.updateItem1": "Main dataset coverage increases from 71 to 72 rows.",
"reports.githubCta": "Visit GitHub profile",
```

Also add equivalent Chinese strings.

- [ ] **Step 4: Add minimal styles for the new release section**

```css
.release-band {
  padding-top: 0;
  padding-bottom: 18px;
}

.release-card {
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(70, 239, 180, 0.09), rgba(255, 189, 84, 0.08)), var(--panel-strong);
  box-shadow: var(--shadow);
}

.release-list {
  margin: 18px 0 0;
  padding-left: 20px;
  color: var(--soft);
}
```

- [ ] **Step 5: Run tests to verify the new summary path**

Run: `node --test tests/site-v0-4-1.test.mjs`
Expected: PASS

### Task 4: Sync local fallback data and verify the published asset set

**Files:**
- Modify: `docs/assets/js/process-data.js`
- Test: `docs/assets/data/cgp_ch_density_sram_compare_v0_4_1.csv`

- [ ] **Step 1: Regenerate `process-data.js` from the published `v0.4.1` CSV**

Run:

```powershell
$csv = Get-Content docs/assets/data/cgp_ch_density_sram_compare_v0_4_1.csv -Raw
$json = [System.Text.Json.JsonSerializer]::Serialize($csv)
Set-Content docs/assets/js/process-data.js -Value ("window.PROCESS_CSV = " + $json + ";")
```

- [ ] **Step 2: Add a quick assertion that the fallback file now embeds the new row**

Run:

```powershell
Select-String -Path docs/assets/js/process-data.js -Pattern "tsmc_n4p_n4p_hp_assumed_n4_hp_geometry_071b"
```

Expected: one match

- [ ] **Step 3: Run the regression tests again**

Run: `node --test tests/site-v0-4-1.test.mjs`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add tests/site-v0-4-1.test.mjs docs/index.html docs/reports.html docs/assets/js/app.js docs/assets/js/process-data.js docs/assets/css/styles.css docs/assets/data/*_v0_4_1.csv
git commit -m "feat: update site to the v0.4.1 report"
```

### Task 5: Manual verification for the static pages

**Files:**
- Test: `docs/index.html`
- Test: `docs/reports.html`

- [ ] **Step 1: Start a simple local static server**

Run: `@' from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler; ThreadingHTTPServer(('127.0.0.1', 8000), SimpleHTTPRequestHandler).serve_forever() '@ | python -`

Expected: local server starts from the repository root

- [ ] **Step 2: Open the reports page in the browser tool and verify visible changes**

Target: `http://127.0.0.1:8000/docs/reports.html`
Verify:

- the release summary block renders
- the GitHub CTA is visible
- the report cards point at `v0.4.1` CSV assets

- [ ] **Step 3: Open the home page in the browser tool and verify downloads still exist**

Target: `http://127.0.0.1:8000/docs/index.html`
Verify:

- the home lead references `v0.4.1`
- the two top download buttons still render and point at the updated assets

## Self-Review

- Spec coverage:
  - `v0.4.1` data switch is covered in Tasks 2 and 4
  - `reports` page release summary is covered in Task 3
  - GitHub homepage entry is covered in Task 3
  - verification is covered in Tasks 1, 4, and 5
- Placeholder scan:
  - No `TODO`, `TBD`, or vague "add tests later" steps remain
- Type consistency:
  - `data-download`, `data-current-version`, and `data-github-home` are used consistently across the plan

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-29-v0-4-1-website-update.md`.

The user explicitly asked to start implementation immediately and explicitly approved working directly on the current `main` branch, so execution should proceed inline in this session.
