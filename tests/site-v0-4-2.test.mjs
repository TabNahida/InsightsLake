import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const indexHtml = readFileSync(new URL("../docs/index.html", import.meta.url), "utf8");
const reportsHtml = readFileSync(new URL("../docs/reports.html", import.meta.url), "utf8");
const yieldHtml = readFileSync(new URL("../docs/yield.html", import.meta.url), "utf8");
const logicFoldingHtml = readFileSync(new URL("../docs/logicfolding-yield.html", import.meta.url), "utf8");
const gitignore = readFileSync(new URL("../.gitignore", import.meta.url), "utf8");
const appJs = readFileSync(new URL("../docs/assets/js/app.js", import.meta.url), "utf8");
const processDataJs = readFileSync(new URL("../docs/assets/js/process-data.js", import.meta.url), "utf8");
let cachedYieldHelpers;

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

test("superpowers planning artifacts are ignored", () => {
  assert.match(gitignore, /^docs\/superpowers\/$/m);
  assert.match(gitignore, /^\.superpowers\/$/m);
});

test("yield page links to the dedicated LogicFolding calculator", () => {
  assert.match(yieldHtml, /href="logicfolding-yield\.html"/);
  assert.match(yieldHtml, /logicFoldingCta/);
});

test("LogicFolding page exposes layer, bonding, wafer stack, and reticle targets", () => {
  assert.match(logicFoldingHtml, /id="logicFoldingForm"/);
  assert.match(logicFoldingHtml, /id="layerCount"/);
  assert.match(logicFoldingHtml, /id="logicLayerControls"/);
  assert.match(logicFoldingHtml, /id="bondingControls"/);
  assert.match(logicFoldingHtml, /id="logicWaferStackCanvas"/);
  assert.match(logicFoldingHtml, /id="logicReticleCanvas"/);
});

test("yield helper API is exposed for calculation tests", async () => {
  const helpers = await loadYieldHelpers();
  assert.equal(typeof helpers.calculateYield, "function");
  assert.equal(typeof helpers.calculateLogicFoldingYield, "function");
  assert.equal(typeof helpers.calculateReticlePacking, "function");
});

test("LogicFolding stack yield multiplies layer yields and bonding interfaces", async () => {
  const helpers = await loadYieldHelpers();
  const actual = helpers.calculateLogicFoldingYield({
    layerYields: [0.9, 0.8, 0.7, 0.6],
    bondingYields: [0.99, 0.98, 0.97],
  });
  const expected = 0.9 * 0.8 * 0.7 * 0.6 * 0.99 * 0.98 * 0.97;
  assert.equal(Number(actual.toFixed(8)), Number(expected.toFixed(8)));
});

test("reticle packing uses physical die and scribe dimensions", async () => {
  const helpers = await loadYieldHelpers();
  const packing = helpers.calculateReticlePacking({
    dieWidth: 10,
    dieHeight: 8,
    scribeX: 0.2,
    scribeY: 0.2,
    reticleWidth: 26,
    reticleHeight: 33,
    halfField: false,
  });
  assert.equal(packing.columns, 2);
  assert.equal(packing.rows, 4);
  assert.equal(packing.diePerReticle, 8);
  assert.ok(packing.utilization > 0.74 && packing.utilization < 0.75);
});

async function loadYieldHelpers() {
  if (cachedYieldHelpers) {
    return cachedYieldHelpers;
  }
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  const previousLocalStorage = globalThis.localStorage;

  globalThis.window = {};
  globalThis.document = {
    addEventListener() {},
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
    body: { dataset: {} },
    documentElement: {},
  };
  globalThis.localStorage = {
    getItem() {
      return null;
    },
    setItem() {},
  };

  await import(`../docs/assets/js/app.js?test=${Date.now()}`);
  const helpers = globalThis.window.InsightsLakeYield;
  cachedYieldHelpers = helpers;

  globalThis.window = previousWindow;
  globalThis.document = previousDocument;
  globalThis.localStorage = previousLocalStorage;

  return helpers;
}
