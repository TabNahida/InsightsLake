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

test("standard yield reticle results use the standalone large layout", () => {
  assert.match(yieldHtml, /class="page-section reticle-section"/);
  assert.match(yieldHtml, /class="reticle-results standalone-reticle"/);
  assert.match(yieldHtml, /id="standardReticleCanvas"/);
});

test("LogicFolding page exposes layer, bonding, wafer stack, and reticle targets", () => {
  assert.match(logicFoldingHtml, /id="logicFoldingForm"/);
  assert.match(logicFoldingHtml, /id="layerCount"[^>]+value="2"/);
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
  assert.equal(typeof helpers.calculateReticleShotGrid, "function");
  assert.equal(typeof helpers.calculateReticleRenderLayout, "function");
  assert.equal(typeof helpers.calculateLogicFoldingStackLayout, "function");
  assert.equal(typeof helpers.projectWaferPoint, "function");
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
    dieWidth: 12,
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
  assert.ok(packing.utilization > 0.89 && packing.utilization < 0.9);
});

test("reticle packing auto-rotates equivalent die dimensions to the same best layout", async () => {
  const helpers = await loadYieldHelpers();
  const tall = helpers.calculateReticlePacking({
    dieWidth: 8,
    dieHeight: 12,
    scribeX: 0.2,
    scribeY: 0.2,
    reticleWidth: 26,
    reticleHeight: 33,
    halfField: false,
  });
  const wide = helpers.calculateReticlePacking({
    dieWidth: 12,
    dieHeight: 8,
    scribeX: 0.2,
    scribeY: 0.2,
    reticleWidth: 26,
    reticleHeight: 33,
    halfField: false,
  });
  assert.equal(tall.diePerReticle, wide.diePerReticle);
  assert.equal(tall.columns, wide.columns);
  assert.equal(tall.rows, wide.rows);
  assert.equal(Number(tall.utilization.toFixed(8)), Number(wide.utilization.toFixed(8)));
  assert.equal(tall.rotated, true);
  assert.equal(wide.rotated, false);
});

test("reticle render layout keeps near-full die arrays clear of the frame", async () => {
  const helpers = await loadYieldHelpers();
  const packing = helpers.calculateReticlePacking({
    dieWidth: 12,
    dieHeight: 8,
    scribeX: 0.2,
    scribeY: 0.2,
    reticleWidth: 26,
    reticleHeight: 33,
    halfField: false,
  });
  const layout = helpers.calculateReticleRenderLayout({ canvasWidth: 980, canvasHeight: 620, packing });
  assert.ok(layout.activeY - layout.fieldY >= layout.minimumActiveGutterPx);
  assert.ok(layout.fieldY + layout.fieldH - (layout.activeY + layout.activeH) >= layout.minimumActiveGutterPx);
});

test("reticle shot grid aligns to active die-array boundaries", async () => {
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
  const grid = helpers.calculateReticleShotGrid({ waferDiameter: 300, reticlePacking: packing });
  const first = grid.rects.find((rect) => rect.col === 0 && rect.row === 0);
  assert.equal(Number(first.width.toFixed(6)), Number((packing.columns * packing.pitchX).toFixed(6)));
  assert.equal(Number(first.height.toFixed(6)), Number((packing.rows * packing.pitchY).toFixed(6)));
  assert.equal(Number(first.x.toFixed(6)), Number((-packing.dieWidth / 2).toFixed(6)));
  assert.equal(Number(first.y.toFixed(6)), Number((-packing.dieHeight / 2).toFixed(6)));
  assert.equal(Number((first.reticleX + packing.offsetX).toFixed(6)), Number(first.x.toFixed(6)));
  assert.equal(Number((first.reticleY + packing.offsetY).toFixed(6)), Number(first.y.toFixed(6)));
});

test("LogicFolding stack layout separates foreshortened flat wafer planes", async () => {
  const helpers = await loadYieldHelpers();
  const layout = helpers.calculateLogicFoldingStackLayout({
    width: 1100,
    height: 660,
    waferDiameter: 300,
    layerCount: 2,
  });
  assert.equal(layout.layers, 2);
  assert.ok(layout.spacing > layout.radius * 2.25);
  assert.ok(layout.outOfPlaneTiltRadians > 0.9 && layout.outOfPlaneTiltRadians < 1.25);
  assert.ok(layout.perspectiveDistance > layout.radius * 2);
  assert.doesNotMatch(appJs, /ctx\.transform\(1,\s*-0\.16,\s*-0\.3,\s*1,\s*0,\s*0\)/);
});

test("LogicFolding projection makes the near side larger than the far side", async () => {
  const helpers = await loadYieldHelpers();
  const layout = helpers.calculateLogicFoldingStackLayout({
    width: 1100,
    height: 660,
    waferDiameter: 300,
    layerCount: 2,
  });
  const near = helpers.projectWaferPoint(60, layout.radius * 0.72, layout);
  const far = helpers.projectWaferPoint(60, -layout.radius * 0.72, layout);
  assert.ok(near.depthScale > far.depthScale);
  assert.ok(Math.abs(near.y) > Math.abs(far.y));
});

test("reticle-based substrate dies land inside matching shot fields", async () => {
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
  const substrate = helpers.generateSubstrateDies({
    dieWidth: 10,
    dieHeight: 8,
    waferDiameter: 300,
    edgeLoss: 3,
    notchKeepOut: 5,
    reticlePacking: packing,
  });
  assert.ok(substrate.fullDies.length > 0);
  for (const die of substrate.fullDies.slice(0, 80)) {
    assert.ok(die.shot);
    const localX = Number((die.x - die.shot.x).toFixed(6));
    const localY = Number((die.y - die.shot.y).toFixed(6));
    const validX = Array.from({ length: packing.columns }, (_, col) => Number((col * packing.pitchX).toFixed(6)));
    const validY = Array.from({ length: packing.rows }, (_, row) => Number((row * packing.pitchY).toFixed(6)));
    assert.ok(validX.includes(localX));
    assert.ok(validY.includes(localY));
  }
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
