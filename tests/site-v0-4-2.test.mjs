import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const indexHtml = readFileSync(new URL("../docs/index.html", import.meta.url), "utf8");
const reportsHtml = readFileSync(new URL("../docs/reports.html", import.meta.url), "utf8");
const appJs = readFileSync(new URL("../docs/assets/js/app.js", import.meta.url), "utf8");
const processDataJs = readFileSync(new URL("../docs/assets/js/process-data.js", import.meta.url), "utf8");

test("app.js points the active dataset at v0.4.2 assets", () => {
  assert.match(appJs, /cgp_ch_density_sram_compare_v0_4_2\.csv/);
  assert.doesNotMatch(appJs, /const DATA_URL = "assets\/data\/cgp_ch_density_sram_compare_v0_4\.csv"/);
});

test("index page download controls are wired for configured downloads", () => {
  assert.match(indexHtml, /data-download="compare"/);
  assert.match(indexHtml, /data-download="quality"/);
});

test("reports page contains the v0.4.2 summary and github entry points", () => {
  assert.match(reportsHtml, /data-report-release-notes/);
  assert.match(reportsHtml, /data-github-home/);
  assert.match(reportsHtml, /data-download="compare"/);
  assert.match(reportsHtml, /data-download="sources"/);
});

test("local fallback dataset embeds the new v0.4.2 record set", () => {
  assert.match(processDataJs, /rapidus_2hp_hd_h138g45_leaked_075/);
});
