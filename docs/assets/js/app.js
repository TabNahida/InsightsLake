const SITE_CONFIG = Object.freeze({
  currentVersion: "v0.4.2",
  dataUrl: "assets/data/cgp_ch_density_sram_compare_v0_4_2.csv",
  downloads: Object.freeze({
    compare: "assets/data/cgp_ch_density_sram_compare_v0_4_2.csv",
    quality: "assets/data/data_quality_report_v0_4_2.csv",
    metrics: "assets/data/derived_metrics_v0_4_2.csv",
    observations: "assets/data/process_observations_v0_4_2.csv",
    sources: "assets/data/raw_sources_v0_4_2.csv",
    legacyWorkbook: "assets/data/foundry_process_density_public_v0_3.xlsx",
  }),
  githubUrl: "https://github.com/TabNahida",
});

const DATA_URL = SITE_CONFIG.dataUrl;
const ALL_VALUE = "__all";
const CANVAS_BG_FILL = "#050a0f";
const CANVAS_PANEL_FILL = "rgba(11, 18, 26, 0.9)";
const CANVAS_TEXT_FILL = "rgba(244, 248, 251, 0.9)";
const CANVAS_MUTED_FILL = "rgba(147, 167, 184, 0.92)";
const WAFER_GOOD_FILL = "rgba(82, 218, 190, 0.64)";
const WAFER_BAD_FILL = "rgba(255, 124, 116, 0.70)";
const WAFER_EDGE_FILL = "rgba(230, 178, 84, 0.50)";
const WAFER_NO_PRINT_FILL = "rgba(112, 132, 149, 0.36)";
const WAFER_GRID_STROKE = "rgba(103, 214, 255, 0.22)";
const WAFER_OUTLINE_STROKE = "rgba(230, 178, 84, 0.78)";
const WAFER_DIE_STROKE = "rgba(4, 10, 15, 0.76)";
const LOGICFOLDING_WAFER_EDGE_FILL = WAFER_EDGE_FILL;
const LOGICFOLDING_NO_PRINT_FILL = WAFER_NO_PRINT_FILL;
const LOGICFOLDING_DIE_STROKE = WAFER_DIE_STROKE;
const LOGICFOLDING_DIE_STROKE_WIDTH = 1.05;
const LOGICFOLDING_LAYER_ALPHA = 0.78;
const LOGICFOLDING_LABEL_FILL = CANVAS_TEXT_FILL;
const LOGICFOLDING_MAX_RENDERED_FULL_DIES = 2500;

const I18N = {
  en: {
    "brand.subtitle": "Process Intelligence",
    "nav.home": "Overview",
    "nav.ranking": "Ranking",
    "nav.density": "Density",
    "nav.yield": "Yield",
    "nav.reports": "Reports",
    "common.downloadXlsx": "Download XLSX",
    "common.downloadCsv": "Download v0.4.2 CSV",
    "common.dataQualityCsv": "Data quality v0.4.2 CSV",
    "common.records": "{count} records",
    "common.rows": "{count} rows",
    "common.unlabeled": "Unlabeled",
    "common.noMatches": "No matching data",
    "common.dataLoadError": "Data could not be loaded. Check that the CSV asset exists.",
    "home.eyebrow": "PUBLIC FOUNDRY DATASET",
    "home.title": "Process Density and Library Analytics",
    "home.lead":
      "A static analysis console for the v0.4.2 public semiconductor process dataset, combining logic density, SRAM bitcell, CPP/CGP, cell height, and source confidence.",
    "home.viewRanking": "Open ranking",
    "home.snapshotEyebrow": "FOUNDRY SNAPSHOT",
    "home.snapshotTitle": "Public sample coverage",
    "home.viewReports": "View source reports",
    "home.foundryCard": "{count} records | best {density} MTr/mm2 | review {review}",
    "kpi.records": "records",
    "kpi.foundries": "foundries",
    "kpi.bestLogic": "best logic MTr/mm2",
    "kpi.bestSram": "best SRAM Mb/mm2",
    "ranking.eyebrow": "PROCESS AND LIBRARY RANKING",
    "ranking.title": "Density ranking",
    "ranking.lead":
      "Default ranking shows every row with available density data and automatically skips missing density values.",
    "ranking.metric": "Metric",
    "ranking.foundry": "Foundry",
    "ranking.process": "Process family",
    "ranking.library": "Library bucket",
    "ranking.confidence": "Confidence",
    "ranking.rows": "Rows",
    "ranking.allRows": "All rows",
    "ranking.allFoundries": "All foundries",
    "ranking.allProcesses": "All process families",
    "ranking.allLibraries": "All library buckets",
    "ranking.allConfidence": "All confidence levels",
    "ranking.tableTitle": "Dataset rows",
    "ranking.count": "{shown} shown / {total} available",
    "metric.logic": "Logic density MTr/mm2",
    "metric.sram": "Ideal SRAM density Mb/mm2",
    "metricTitle.logic": "Logic density ranking",
    "metricTitle.sram": "Ideal SRAM density ranking",
    "quality.review": "Review",
    "density.eyebrow": "DENSITY CALCULATOR",
    "density.title": "Estimate logic and SRAM density",
    "density.lead":
      "Start from a public sample or enter CPP/CGP and cell height directly to compare estimated density with a target.",
    "density.reference": "Reference sample",
    "density.scale": "Library scale factor",
    "density.target": "Target logic density",
    "density.estimatedLogic": "Estimated logic density",
    "density.idealSram": "Ideal SRAM density",
    "density.targetGap": "Target gap",
    "density.formulaSdb": "Bohr NAND2/SFF mix, break extra 0 CPP x library scale",
    "density.formulaDdb": "Bohr NAND2/SFF mix, break extra 1 CPP x library scale",
    "density.nearest": "Nearest sample: {foundry} {node}",
    "density.nearestDetail": "{density} MTr/mm2, delta {diff} MTr/mm2",
    "density.waiting": "Waiting for valid parameters",
    "yield.eyebrow": "YIELD ANALYZER",
    "yield.title": "Model die yield and wafer output",
    "yield.lead":
      "Compare common yield models and inspect a wafer cut map that shows gross dies, good dies, and defect losses.",
    "yield.dieWidth": "Die width mm",
    "yield.dieHeight": "Die height mm",
    "yield.alpha": "Clustering alpha",
    "yield.wafersPerMonth": "Wafers per month",
    "yield.waferTitle": "Wafer cut map",
    "yield.goodLegend": "good die",
    "yield.badLegend": "defect loss",
    "yield.edgeLegend": "wafer edge",
    "yield.noPrintLegend": "no-print shot",
    "yield.mapStats": "die {width} x {height} mm | area {area} mm2 | gross {gross} | good {good} | defect {bad} | edge {edge} | no-print {noPrint}",
    "reports.eyebrow": "SOURCE REPORTS",
    "reports.title": "Reports and data exports",
    "reports.lead": "Download the v0.4.2 normalized CSV exports used by the interactive pages.",
    "reports.xlsxDesc": "Legacy v0.3 workbook with foundry sheets, comparison views, source index, and dashboard.",
    "reports.csvDesc": "Primary v0.4.2 CGP / cell-height / density / SRAM dataset.",
    "reports.qualityDesc": "Data quality summary with coverage counts and records marked for review.",
    "reports.metricsDesc": "Derived density and SRAM calculations with formula inputs and assumptions.",
    "reports.observationsDesc": "Normalized process observations before derived metrics are attached.",
    "reports.sourcesDesc": "Raw public source index used by the v0.4.2 report.",
    "reports.updateEyebrow": "LATEST UPDATE",
    "reports.updateTitle": "release summary",
    "reports.updateLead": "Short release notes for the current public dataset refresh.",
    "reports.updateItem1": "Main dataset coverage increases from 72 to 75 rows.",
    "reports.updateItem2": "Raw source coverage expands from 60 to 64 entries.",
    "reports.updateItem3": "N2 is split into official generic and leaked HD comparison rows, and the Intel 18A HD comparison density is corrected.",
    "reports.updateItem4": "Rapidus 2HP official and leaked comparison rows are added to the compact public dataset.",
    "reports.githubCta": "Visit GitHub profile",
    "footer.note": "Public-source estimates for process comparison and early planning.",
  },
  zh: {
    "brand.subtitle": "工艺情报",
    "nav.home": "概览",
    "nav.ranking": "排行",
    "nav.density": "密度计算",
    "nav.yield": "良率分析",
    "nav.reports": "报告",
    "common.downloadXlsx": "下载 XLSX",
    "common.downloadCsv": "下载 v0.4.2 CSV",
    "common.dataQualityCsv": "下载 v0.4.2 数据质量 CSV",
    "common.records": "{count} 条记录",
    "common.rows": "{count} 行",
    "common.unlabeled": "未标注",
    "common.noMatches": "没有匹配数据",
    "common.dataLoadError": "数据加载失败，请确认 CSV 资产存在。",
    "home.eyebrow": "PUBLIC FOUNDRY DATASET",
    "home.title": "工艺密度与库选型分析台",
    "home.lead": "面向 v0.4.2 公开工艺数据的静态分析网站，聚合逻辑密度、SRAM bitcell、CPP/CGP、cell height 与资料置信度。",
    "home.viewRanking": "查看排行",
    "home.snapshotEyebrow": "FOUNDRY SNAPSHOT",
    "home.snapshotTitle": "公开样本覆盖",
    "home.viewReports": "查看来源报告",
    "home.foundryCard": "{count} 条记录 | 最高 {density} MTr/mm2 | 复核 {review}",
    "kpi.records": "记录",
    "kpi.foundries": "厂商",
    "kpi.bestLogic": "最高逻辑 MTr/mm2",
    "kpi.bestSram": "最高 SRAM Mb/mm2",
    "ranking.eyebrow": "PROCESS AND LIBRARY RANKING",
    "ranking.title": "密度排行",
    "ranking.lead": "默认展示所有有密度数据的行，并自动忽略缺失密度的样本。",
    "ranking.metric": "指标",
    "ranking.foundry": "厂商",
    "ranking.process": "工艺族",
    "ranking.library": "库类型归类",
    "ranking.confidence": "置信度",
    "ranking.rows": "行数",
    "ranking.allRows": "全部显示",
    "ranking.allFoundries": "全部厂商",
    "ranking.allProcesses": "全部工艺族",
    "ranking.allLibraries": "全部库类型归类",
    "ranking.allConfidence": "全部置信度",
    "ranking.tableTitle": "样本明细",
    "ranking.count": "显示 {shown} / 可用 {total}",
    "metric.logic": "逻辑密度 MTr/mm2",
    "metric.sram": "SRAM 理想密度 Mb/mm2",
    "metricTitle.logic": "逻辑密度排行",
    "metricTitle.sram": "SRAM 理想密度排行",
    "quality.review": "需复核",
    "density.eyebrow": "DENSITY CALCULATOR",
    "density.title": "估算逻辑与 SRAM 密度",
    "density.lead": "从公开样本开始，或直接输入 CPP/CGP 与 cell height，将估算密度与目标值对比。",
    "density.reference": "参考样本",
    "density.scale": "库缩放系数",
    "density.target": "目标逻辑密度",
    "density.estimatedLogic": "估算逻辑密度",
    "density.idealSram": "SRAM 理想密度",
    "density.targetGap": "目标差距",
    "density.formulaSdb": "Bohr NAND2/SFF 混合公式，break extra 0 CPP x 库缩放系数",
    "density.formulaDdb": "Bohr NAND2/SFF 混合公式，break extra 1 CPP x 库缩放系数",
    "density.nearest": "接近样本：{foundry} {node}",
    "density.nearestDetail": "{density} MTr/mm2，差值 {diff} MTr/mm2",
    "density.waiting": "等待有效参数",
    "yield.eyebrow": "YIELD ANALYZER",
    "yield.title": "良率与晶圆产出建模",
    "yield.lead": "对比常见良率模型，并通过晶圆切割示意图查看 gross die、good die 与 defect loss。",
    "yield.dieWidth": "芯片宽度 mm",
    "yield.dieHeight": "芯片高度 mm",
    "yield.alpha": "聚集参数 alpha",
    "yield.wafersPerMonth": "月投片",
    "yield.waferTitle": "晶圆切割示意图",
    "yield.goodLegend": "良品 die",
    "yield.badLegend": "缺陷损失",
    "yield.edgeLegend": "晶圆边界",
    "yield.noPrintLegend": "未曝光 shot",
    "yield.mapStats": "die {width} x {height} mm | 面积 {area} mm2 | gross {gross} | 良品 {good} | 缺陷 {bad} | 边缘 {edge} | 未曝光 {noPrint}",
    "reports.eyebrow": "SOURCE REPORTS",
    "reports.title": "报告与数据导出",
    "reports.lead": "下载交互页面使用的 v0.4.2 规范化 CSV 导出。",
    "reports.xlsxDesc": "v0.3 旧版 workbook，包含厂商分表、对比视图、来源索引和 dashboard。",
    "reports.csvDesc": "v0.4.2 主数据表：CGP / cell height / density / SRAM 对比。",
    "reports.qualityDesc": "数据质量摘要，包含覆盖率计数与需要复核的记录。",
    "reports.metricsDesc": "派生密度与 SRAM 计算，包含公式输入和假设说明。",
    "reports.observationsDesc": "挂接派生指标前的规范化工艺观察记录。",
    "reports.sourcesDesc": "v0.4.2 报告使用的公开来源索引。",
    "reports.updateEyebrow": "LATEST UPDATE",
    "reports.updateTitle": "更新摘要",
    "reports.updateLead": "当前公开数据集刷新所对应的简短发布说明。",
    "reports.updateItem1": "主数据集覆盖从 72 条记录增加到 75 条。",
    "reports.updateItem2": "公开来源索引从 60 条扩展到 64 条。",
    "reports.updateItem3": "N2 被拆分为官方通用行和泄露 HD 对比行，同时修正了 Intel 18A HD 对比密度。",
    "reports.updateItem4": "紧凑公开数据集中新增了 Rapidus 2HP 的官方行和泄露对比行。",
    "reports.githubCta": "访问 GitHub 主页",
    "footer.note": "公开资料口径，计算结果用于工艺对比与早期方案预估。",
  },
};

const state = {
  records: [],
  lang: "en",
  rankRecords: [],
  waferAnimationStarted: false,
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  applySiteConfig();
  initLanguage();
  activateCurrentNav();
  loadData();
});

function cacheElements() {
  [
    "kpiRecords",
    "kpiFoundries",
    "kpiBestLogic",
    "kpiBestSram",
    "foundryGrid",
    "metricSelect",
    "foundryFilter",
    "processFilter",
    "libraryFilter",
    "confidenceFilter",
    "rowLimit",
    "rankingTitle",
    "rankingCount",
    "rankingList",
    "tableCount",
    "dataTable",
    "presetSelect",
    "cppInput",
    "heightInput",
    "breakModel",
    "libraryScale",
    "sramCellInput",
    "targetDensity",
    "calcLogicDensity",
    "calcSramDensity",
    "calcGap",
    "formulaLabel",
    "densityNeedle",
    "nearestMatch",
    "yieldForm",
    "logicFoldingForm",
    "logicFoldingCta",
    "dieWidth",
    "dieHeight",
    "scribeX",
    "scribeY",
    "defectDensity",
    "yieldModel",
    "clusterAlpha",
    "waferDiameter",
    "edgeLoss",
    "notchKeepOut",
    "substrateCost",
    "reticleWidth",
    "reticleHeight",
    "halfFieldExposure",
    "autoOptimizeReticle",
    "reticleOffsetX",
    "reticleOffsetY",
    "showReticleGrid",
    "showReticleBackground",
    "layerCount",
    "logicLayerControls",
    "bondingControls",
    "wafersPerMonth",
    "yieldPercent",
    "grossDie",
    "goodDie",
    "monthlyGoodDie",
    "fullDieCount",
    "defectiveDieCount",
    "partialDieCount",
    "excludedDieCount",
    "costPerGoodDie",
    "waferArea",
    "totalDieArea",
    "wasteArea",
    "reticleDieCount",
    "reticleUtilization",
    "stackYieldPercent",
    "stackGoodDie",
    "stackBondingYield",
    "stackCostPerGoodDie",
    "stackReticleDieCount",
    "waferCutCanvas",
    "standardReticleCanvas",
    "logicWaferStackCanvas",
    "logicReticleCanvas",
    "waferCanvas",
    "waferNode",
    "waferDensity",
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

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
    link.rel = "noopener noreferrer";
  });
}

function initLanguage() {
  state.lang = localStorage.getItem("insightslake-language") || "en";
  if (!I18N[state.lang]) {
    state.lang = "en";
  }

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });

  applyTranslations();
}

function setLanguage(lang) {
  if (!I18N[lang]) {
    return;
  }
  state.lang = lang;
  localStorage.setItem("insightslake-language", lang);
  applyTranslations();
  refreshControlLabels();
  renderCurrentPage();
}

function applyTranslations() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === state.lang);
  });
}

function activateCurrentNav() {
  const page = document.body.dataset.page || "home";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === page);
  });
}

async function loadData() {
  try {
    if (location.protocol === "file:" && window.PROCESS_CSV) {
      hydrateData(window.PROCESS_CSV);
      return;
    }
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    hydrateData(await response.text());
  } catch (error) {
    if (window.PROCESS_CSV) {
      hydrateData(window.PROCESS_CSV);
      return;
    }
    showDataLoadError();
    console.error(error);
  }
}

function hydrateData(csv) {
  state.records = parseCsv(csv).map(normalizeRecord).filter((row) => row.foundry || row.process);
  initPageControls();
  renderCurrentPage();
  startWaferAnimation();
}

function showDataLoadError() {
  const message = t("common.dataLoadError");
  if (els.rankingList) {
    els.rankingList.innerHTML = `<div class="empty-state">${message}</div>`;
  }
  if (els.dataTable) {
    els.dataTable.innerHTML = `<tr><td colspan="8">${message}</td></tr>`;
  }
}

function initPageControls() {
  if (els.metricSelect) {
    refreshRankingControls();
    ["metricSelect", "foundryFilter", "processFilter", "libraryFilter", "confidenceFilter", "rowLimit"].forEach((id) => {
      els[id]?.addEventListener("input", renderRankingArea);
    });
  }

  if (els.presetSelect) {
    refreshDensityPresets();
    [
      "presetSelect",
      "cppInput",
      "heightInput",
      "breakModel",
      "libraryScale",
      "sramCellInput",
      "targetDensity",
    ].forEach((id) => {
      els[id]?.addEventListener("input", () => {
        if (id === "presetSelect") {
          applyDensityPreset();
        }
        renderDensityCalculator();
      });
    });
    applyDensityPreset();
  }

  if (els.yieldForm) {
    [
      "dieWidth",
      "dieHeight",
      "scribeX",
      "scribeY",
      "defectDensity",
      "yieldModel",
      "clusterAlpha",
      "waferDiameter",
      "edgeLoss",
      "notchKeepOut",
      "substrateCost",
      "reticleWidth",
      "reticleHeight",
      "halfFieldExposure",
      "autoOptimizeReticle",
      "reticleOffsetX",
      "reticleOffsetY",
      "showReticleGrid",
      "showReticleBackground",
      "wafersPerMonth",
    ].forEach((id) => {
      els[id]?.addEventListener("input", renderYieldAnalyzer);
    });
    window.addEventListener("resize", debounce(renderYieldAnalyzer, 120));
  }

  if (els.logicFoldingForm) {
    renderLogicFoldingLayerControls();
    [
      "dieWidth",
      "dieHeight",
      "scribeX",
      "scribeY",
      "waferDiameter",
      "edgeLoss",
      "notchKeepOut",
      "substrateCost",
      "reticleWidth",
      "reticleHeight",
      "halfFieldExposure",
      "autoOptimizeReticle",
      "reticleOffsetX",
      "reticleOffsetY",
      "showReticleGrid",
      "showReticleBackground",
      "layerCount",
    ].forEach((id) => {
      els[id]?.addEventListener("input", () => {
        if (id === "layerCount") {
          renderLogicFoldingLayerControls();
        }
        renderLogicFoldingAnalyzer();
      });
    });
    els.logicFoldingForm.addEventListener("input", (event) => {
      if (event.target.closest("#logicLayerControls, #bondingControls")) {
        renderLogicFoldingAnalyzer();
      }
    });
    window.addEventListener("resize", debounce(renderLogicFoldingAnalyzer, 120));
  }
}

function refreshControlLabels() {
  if (els.metricSelect) {
    refreshRankingControls();
  }
  if (els.presetSelect) {
    refreshDensityPresets();
  }
}

function renderCurrentPage() {
  renderHome();
  renderRankingArea();
  renderDensityCalculator();
  renderYieldAnalyzer();
  renderLogicFoldingAnalyzer();
}

function refreshRankingControls() {
  const metricValue = els.metricSelect?.value || "logic";
  const foundryValue = els.foundryFilter?.value || ALL_VALUE;
  const processValue = els.processFilter?.value || ALL_VALUE;
  const libraryValue = els.libraryFilter?.value || ALL_VALUE;
  const confidenceValue = els.confidenceFilter?.value || ALL_VALUE;

  if (els.metricSelect) {
    els.metricSelect.innerHTML = ["logic", "sram"]
      .map((value) => `<option value="${value}">${escapeHtml(t(`metric.${value}`))}</option>`)
      .join("");
    els.metricSelect.value = optionExists(els.metricSelect, metricValue) ? metricValue : "logic";
  }

  if (els.foundryFilter) {
    fillSelect(els.foundryFilter, [
      { value: ALL_VALUE, label: t("ranking.allFoundries") },
      ...unique(state.records.map((row) => row.foundry)).map((value) => ({ value, label: value })),
    ]);
    els.foundryFilter.value = optionExists(els.foundryFilter, foundryValue) ? foundryValue : ALL_VALUE;
  }

  if (els.processFilter) {
    fillSelect(els.processFilter, [
      { value: ALL_VALUE, label: t("ranking.allProcesses") },
      ...unique(state.records.map((row) => processBucket(row))).map((value) => ({ value, label: value })),
    ]);
    els.processFilter.value = optionExists(els.processFilter, processValue) ? processValue : ALL_VALUE;
  }

  if (els.libraryFilter) {
    fillSelect(els.libraryFilter, [
      { value: ALL_VALUE, label: t("ranking.allLibraries") },
      ...unique(state.records.map((row) => libraryBucket(row))).map((value) => ({ value, label: value })),
    ]);
    els.libraryFilter.value = optionExists(els.libraryFilter, libraryValue) ? libraryValue : ALL_VALUE;
  }

  if (els.confidenceFilter) {
    fillSelect(els.confidenceFilter, [
      { value: ALL_VALUE, label: t("ranking.allConfidence") },
      ...unique(state.records.map((row) => confidenceBucket(row.confidence))).map((value) => ({ value, label: value })),
    ]);
    els.confidenceFilter.value = optionExists(els.confidenceFilter, confidenceValue) ? confidenceValue : ALL_VALUE;
  }
}

function refreshDensityPresets() {
  if (!els.presetSelect) {
    return;
  }
  const selected = els.presetSelect.value || "0";
  const presets = getDensityPresets();
  els.presetSelect.innerHTML = presets
    .map((row, index) => `<option value="${index}">${escapeHtml(displayFoundry(row.foundry))} | ${escapeHtml(row.variant)}</option>`)
    .join("");
  els.presetSelect.value = optionExists(els.presetSelect, selected) ? selected : "0";
}

function renderHome() {
  if (!els.kpiRecords && !els.foundryGrid) {
    return;
  }
  renderKpis();
  renderFoundryGrid();
}

function renderKpis() {
  if (!els.kpiRecords) {
    return;
  }
  const foundries = unique(state.records.map((row) => row.foundry));
  const bestLogic = maxBy(state.records, (row) => row.logic);
  const bestSram = maxBy(state.records, (row) => row.sram);

  els.kpiRecords.textContent = formatNumber(state.records.length, 0);
  els.kpiFoundries.textContent = formatNumber(foundries.length, 0);
  els.kpiBestLogic.textContent = bestLogic ? formatNumber(bestLogic.logic, 1) : "--";
  els.kpiBestSram.textContent = bestSram ? formatNumber(bestSram.sram, 1) : "--";
}

function renderFoundryGrid() {
  if (!els.foundryGrid) {
    return;
  }
  const groups = groupBy(
    state.records.filter((row) => row.foundry),
    (row) => row.foundry,
  );
  const bestOverall = maxBy(state.records, (row) => row.logic)?.logic || 1;

  els.foundryGrid.innerHTML = Object.entries(groups)
    .sort(([, aRows], [, bRows]) => bRows.length - aRows.length)
    .map(([foundry, rows]) => {
      const best = maxBy(rows, (row) => row.logic);
      const bestValue = best?.logic || 0;
      const reviewCount = rows.filter((row) => row.reviewRequired).length;
      const width = clamp((bestValue / bestOverall) * 100, 4, 100);
      return `
        <article class="foundry-card">
          <strong>${escapeHtml(foundry)}</strong>
          <small>${escapeHtml(
            t("home.foundryCard", {
              count: rows.length,
              density: formatNumber(bestValue, 1),
              review: reviewCount,
            }),
          )}</small>
          <div class="mini-meter"><span style="width:${width}%"></span></div>
        </article>
      `;
    })
    .join("");
}

function renderRankingArea() {
  if (!els.rankingList) {
    return;
  }
  const metric = els.metricSelect.value || "logic";
  const foundryFilter = els.foundryFilter.value || ALL_VALUE;
  const processFilter = els.processFilter.value || ALL_VALUE;
  const libraryFilter = els.libraryFilter.value || ALL_VALUE;
  const confidenceFilter = els.confidenceFilter.value || ALL_VALUE;
  const rowLimit = els.rowLimit.value || "all";
  const config = metricConfig(metric);

  const filtered = state.records
    .filter((row) => foundryFilter === ALL_VALUE || row.foundry === foundryFilter)
    .filter((row) => processFilter === ALL_VALUE || processBucket(row) === processFilter)
    .filter((row) => libraryFilter === ALL_VALUE || libraryBucket(row) === libraryFilter)
    .filter((row) => confidenceFilter === ALL_VALUE || confidenceBucket(row.confidence) === confidenceFilter)
    .filter((row) => Number.isFinite(config.value(row)));

  const ranked = filtered.sort((a, b) => {
    const diff = config.value(a) - config.value(b);
    return config.asc ? diff : -diff;
  });

  state.rankRecords = rowLimit === "all" ? ranked : ranked.slice(0, Number(rowLimit));
  els.rankingTitle.textContent = config.title;
  els.rankingCount.textContent = t("ranking.count", { shown: state.rankRecords.length, total: ranked.length });
  els.tableCount.textContent = t("common.rows", { count: ranked.length });

  renderRankingList(state.rankRecords, config);
  renderDataTable(ranked);
}

function renderRankingList(rows, config) {
  if (!rows.length) {
    els.rankingList.innerHTML = `<div class="empty-state">${escapeHtml(t("common.noMatches"))}</div>`;
    return;
  }

  const values = rows.map((row) => config.value(row));
  const max = Math.max(...values);
  const min = Math.min(...values);

  els.rankingList.innerHTML = rows
    .map((row, index) => {
      const value = config.value(row);
      const span = max === min ? 100 : config.asc ? ((max - value) / (max - min)) * 100 : ((value - min) / (max - min)) * 100;
      const width = clamp(span, 6, 100);
      const meta = [
        displayFoundry(row.foundry),
        processBucket(row),
        libraryBucket(row),
        confidenceBucket(row.confidence),
        row.reviewRequired ? t("quality.review") : "",
      ].filter(Boolean);
      return `
        <article class="rank-row">
          <div class="rank-index">#${index + 1}</div>
          <div class="rank-main">
            <strong title="${escapeHtml(row.variant)}">${escapeHtml(row.variant)}</strong>
            <span>${escapeHtml(meta.join(" | "))}</span>
          </div>
          <div class="rank-value">
            <strong>${formatNumber(value, config.decimals)}</strong>
            <small>${config.unit}</small>
          </div>
          <div class="rank-bar"><span style="width:${width}%"></span></div>
        </article>
      `;
    })
    .join("");
}

function renderDataTable(rows) {
  if (!els.dataTable) {
    return;
  }
  if (!rows.length) {
    els.dataTable.innerHTML = `<tr><td colspan="8">${escapeHtml(t("common.noMatches"))}</td></tr>`;
    return;
  }

  els.dataTable.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td data-label="Foundry">${escapeHtml(displayFoundry(row.foundry))}</td>
          <td data-label="Node">${escapeHtml(row.variant)}</td>
          <td data-label="Library">${escapeHtml(row.libraryClass)}</td>
          <td data-label="CPP" class="numeric">${formatMaybe(row.cpp, 0)}</td>
          <td data-label="Height" class="numeric">${formatMaybe(row.height, 0)}</td>
          <td data-label="Logic" class="numeric">${formatMaybe(row.logic, 1)}</td>
          <td data-label="SRAM" class="numeric">${formatMaybe(row.sram, 1)}</td>
          <td data-label="Confidence"><span class="confidence${row.reviewRequired ? " review" : ""}">${escapeHtml(
            row.reviewRequired ? `${row.confidence} / ${t("quality.review")}` : row.confidence,
          )}</span></td>
        </tr>
      `,
    )
    .join("");
}

function applyDensityPreset() {
  const preset = getDensityPresets()[toNumber(els.presetSelect.value) || 0];
  if (!preset) {
    return;
  }
  els.cppInput.value = preset.cpp || els.cppInput.value;
  els.heightInput.value = preset.height || els.heightInput.value;
  els.breakModel.value = (Number.isFinite(preset.breakExtra) && preset.breakExtra > 0) || isDdb(preset.breakModel) ? "ddb" : "sdb";
  if (Number.isFinite(preset.sramCell)) {
    els.sramCellInput.value = preset.sramCell;
  }
}

function getDensityPresets() {
  return state.records
    .filter((row) => Number.isFinite(row.cpp) && Number.isFinite(row.height))
    .sort((a, b) => (b.logic || 0) - (a.logic || 0));
}

function renderDensityCalculator() {
  if (!els.calcLogicDensity) {
    return;
  }
  const cpp = toNumber(els.cppInput.value);
  const height = toNumber(els.heightInput.value);
  const scale = toNumber(els.libraryScale.value) || 1;
  const target = toNumber(els.targetDensity.value);
  const sramCell = toNumber(els.sramCellInput.value);
  const breakExtra = els.breakModel.value === "ddb" ? 1 : 0;
  const logicDensity = cpp > 0 && height > 0 ? calculateLogicDensity(cpp, height, breakExtra, scale) : NaN;
  const sramDensity = sramCell > 0 ? 1 / sramCell : NaN;
  const gap = Number.isFinite(target) && target > 0 ? ((logicDensity - target) / target) * 100 : NaN;

  els.calcLogicDensity.textContent = formatMaybe(logicDensity, 1);
  els.calcSramDensity.textContent = formatMaybe(sramDensity, 1);
  els.calcGap.textContent = Number.isFinite(gap) ? `${gap >= 0 ? "+" : ""}${formatNumber(gap, 1)}%` : "--";
  els.formulaLabel.textContent = els.breakModel.value === "ddb" ? t("density.formulaDdb") : t("density.formulaSdb");

  const needle = Number.isFinite(logicDensity) ? clamp((logicDensity / 240) * 100, 0, 100) : 0;
  els.densityNeedle.style.width = `${needle}%`;

  const nearest = nearestBy(
    state.records.filter((row) => Number.isFinite(row.logic)),
    (row) => Math.abs(row.logic - logicDensity),
  );
  if (nearest && Number.isFinite(logicDensity)) {
    const diff = nearest.logic - logicDensity;
    els.nearestMatch.innerHTML = `
      <strong>${escapeHtml(t("density.nearest", { foundry: displayFoundry(nearest.foundry), node: nearest.variant }))}</strong>
      <span>${escapeHtml(
        t("density.nearestDetail", {
          density: formatNumber(nearest.logic, 1),
          diff: `${diff >= 0 ? "+" : ""}${formatNumber(diff, 1)}`,
        }),
      )}</span>
    `;
  } else {
    els.nearestMatch.innerHTML = `<span>${escapeHtml(t("density.waiting"))}</span>`;
  }
}

function calculateLogicDensity(cpp, height, breakExtra = 0, scale = 1) {
  const nand2 = 0.6 * (4 / ((3 + breakExtra) * cpp * height));
  const sff = 0.4 * (32 / ((19 + breakExtra) * cpp * height));
  return (nand2 + sff) * 1_000_000 * scale;
}

function renderYieldAnalyzer() {
  if (!els.yieldPercent) {
    return;
  }
  const dieWidth = Math.max(1, toNumber(els.dieWidth.value) || 1);
  const dieHeight = Math.max(1, toNumber(els.dieHeight.value) || 1);
  const scribeX = Math.max(0, toNumber(els.scribeX?.value) || 0);
  const scribeY = Math.max(0, toNumber(els.scribeY?.value) || 0);
  const dieArea = dieWidth * dieHeight;
  const defectDensity = Math.max(0, toNumber(els.defectDensity.value) || 0);
  const alpha = Math.max(0.1, toNumber(els.clusterAlpha.value) || 3);
  const waferDiameter = toNumber(els.waferDiameter.value) || 300;
  const edgeLoss = Math.max(0, toNumber(els.edgeLoss?.value) || 0);
  const notchKeepOut = Math.max(0, toNumber(els.notchKeepOut?.value) || 0);
  const substrateCost = Math.max(0, toNumber(els.substrateCost?.value) || 0);
  const wafersPerMonth = Math.max(0, toNumber(els.wafersPerMonth.value) || 0);
  const model = els.yieldModel.value;
  const dieYield = calculateYield(dieArea, defectDensity, model, alpha);
  const reticle = readReticlePacking({ dieWidth, dieHeight, scribeX, scribeY });
  const substrate = generateSubstrateDies({ dieWidth, dieHeight, waferDiameter, edgeLoss, notchKeepOut, reticlePacking: reticle });
  const gross = substrate.fullDies.length;
  const good = Math.round(gross * dieYield);
  const defective = Math.max(0, gross - good);
  const waferArea = Math.PI * Math.pow(waferDiameter / 2, 2);
  const totalDieArea = gross * dieArea;
  const wasteArea = Math.max(0, waferArea - totalDieArea);

  els.yieldPercent.textContent = formatNumber(dieYield * 100, 1);
  els.grossDie.textContent = formatNumber(gross, 0);
  els.goodDie.textContent = formatNumber(good, 0);
  els.monthlyGoodDie.textContent = formatNumber(good * wafersPerMonth, 0);
  setText("fullDieCount", formatNumber(gross, 0));
  setText("defectiveDieCount", formatNumber(defective, 0));
  setText("partialDieCount", formatNumber(substrate.partialDies.length, 0));
  setText("excludedDieCount", formatNumber(substrate.excludedDies.length, 0));
  setText("costPerGoodDie", good > 0 ? `$${formatNumber(substrateCost / good, 2)}` : "--");
  setText("waferArea", `${formatNumber(waferArea / 100, 2)} cm2`);
  setText("totalDieArea", `${formatNumber(totalDieArea / 100, 2)} cm2`);
  setText("wasteArea", `${formatNumber(wasteArea / 100, 2)} cm2`);
  updateReticleReadout(reticle);

  drawWaferCutMap({
    dieWidth,
    dieHeight,
    dieArea,
    waferDiameter,
    waferDies: substrate.fullDies,
    partialDies: substrate.partialDies,
    excludedDies: substrate.excludedDies,
    good,
    reticlePacking: reticle,
    showReticleGrid: Boolean(els.showReticleGrid?.checked),
  });
  drawReticleResults(els.standardReticleCanvas, reticle, { showBackground: Boolean(els.showReticleBackground?.checked) });
}

function calculateYield(dieAreaMm2, defectDensity, model, alpha) {
  const areaCm2 = dieAreaMm2 / 100;
  const ad = areaCm2 * defectDensity;
  if (ad <= 0) {
    return 1;
  }
  if (model === "murphy") {
    return Math.pow((1 - Math.exp(-ad)) / ad, 2);
  }
  if (model === "negative") {
    return Math.pow(1 + ad / alpha, -alpha);
  }
  return Math.exp(-ad);
}

function calculateLogicFoldingYield({ layerYields, bondingYields }) {
  return [...layerYields, ...bondingYields].reduce((product, value) => product * clamp(Number(value) || 0, 0, 1), 1);
}

function calculateReticlePacking({ dieWidth, dieHeight, scribeX = 0, scribeY = 0, reticleWidth = 26, reticleHeight = 33, halfField = false }) {
  const safeDieWidth = Math.max(0, Number(dieWidth) || 0);
  const safeDieHeight = Math.max(0, Number(dieHeight) || 0);
  const safeScribeX = Math.max(0, Number(scribeX) || 0);
  const safeScribeY = Math.max(0, Number(scribeY) || 0);
  const fullReticleWidth = Math.max(0, Number(reticleWidth) || 26);
  const fullReticleHeight = Math.max(0, Number(reticleHeight) || 33);
  const usableWidth = halfField && fullReticleWidth >= fullReticleHeight ? fullReticleWidth * 0.5 : fullReticleWidth;
  const usableHeight = halfField && fullReticleHeight > fullReticleWidth ? fullReticleHeight * 0.5 : fullReticleHeight;
  const buildCandidate = ({ layoutDieWidth, layoutDieHeight, layoutScribeX, layoutScribeY, rotated }) => {
    const pitchX = layoutDieWidth + layoutScribeX;
    const pitchY = layoutDieHeight + layoutScribeY;
    const columns = pitchX > 0 ? Math.max(0, Math.floor((usableWidth + layoutScribeX) / pitchX)) : 0;
    const rows = pitchY > 0 ? Math.max(0, Math.floor((usableHeight + layoutScribeY) / pitchY)) : 0;
    const diePerReticle = columns * rows;
    const dieArea = safeDieWidth * safeDieHeight;
    const fieldArea = usableWidth * usableHeight;
    const utilization = fieldArea > 0 ? clamp((diePerReticle * dieArea) / fieldArea, 0, 1) : 0;
    const occupiedWidth = columns > 0 ? columns * layoutDieWidth + Math.max(0, columns - 1) * layoutScribeX : 0;
    const occupiedHeight = rows > 0 ? rows * layoutDieHeight + Math.max(0, rows - 1) * layoutScribeY : 0;
    return {
      dieWidth: layoutDieWidth,
      dieHeight: layoutDieHeight,
      scribeX: layoutScribeX,
      scribeY: layoutScribeY,
      pitchX,
      pitchY,
      columns,
      rows,
      diePerReticle,
      utilization,
      occupiedWidth,
      occupiedHeight,
      offsetX: Math.max(0, (usableWidth - occupiedWidth) / 2),
      offsetY: Math.max(0, (usableHeight - occupiedHeight) / 2),
      rotated,
    };
  };
  const normal = buildCandidate({
    layoutDieWidth: safeDieWidth,
    layoutDieHeight: safeDieHeight,
    layoutScribeX: safeScribeX,
    layoutScribeY: safeScribeY,
    rotated: false,
  });
  const rotated = buildCandidate({
    layoutDieWidth: safeDieHeight,
    layoutDieHeight: safeDieWidth,
    layoutScribeX: safeScribeY,
    layoutScribeY: safeScribeX,
    rotated: true,
  });
  const best =
    rotated.diePerReticle > normal.diePerReticle || (rotated.diePerReticle === normal.diePerReticle && rotated.utilization > normal.utilization)
      ? rotated
      : normal;

  return {
    reticleWidth: fullReticleWidth,
    reticleHeight: fullReticleHeight,
    usableWidth,
    usableHeight,
    inputDieWidth: safeDieWidth,
    inputDieHeight: safeDieHeight,
    inputScribeX: safeScribeX,
    inputScribeY: safeScribeY,
    ...best,
  };
}

function calculateReticleShotGrid({ waferDiameter, reticlePacking }) {
  const radius = waferDiameter / 2;
  if (!reticlePacking?.diePerReticle) {
    return { originX: 0, originY: 0, rects: [] };
  }
  const fieldWidth = reticlePacking.columns * reticlePacking.pitchX;
  const fieldHeight = reticlePacking.rows * reticlePacking.pitchY;
  if (fieldWidth <= 0 || fieldHeight <= 0) {
    return { originX: 0, originY: 0, rects: [] };
  }
  const originX = -reticlePacking.dieWidth / 2;
  const originY = -reticlePacking.dieHeight / 2;
  const minCol = Math.floor((-radius - originX) / fieldWidth) - 1;
  const maxCol = Math.ceil((radius - originX) / fieldWidth) + 1;
  const minRow = Math.floor((-radius - originY) / fieldHeight) - 1;
  const maxRow = Math.ceil((radius - originY) / fieldHeight) + 1;
  const rects = [];

  for (let row = minRow; row <= maxRow; row += 1) {
    for (let col = minCol; col <= maxCol; col += 1) {
      const x = originX + col * fieldWidth;
      const y = originY + row * fieldHeight;
      if (rectIntersectsCircle(x, y, fieldWidth, fieldHeight, radius)) {
        rects.push({
          x,
          y,
          width: fieldWidth,
          height: fieldHeight,
          reticleX: x - reticlePacking.offsetX,
          reticleY: y - reticlePacking.offsetY,
          row,
          col,
        });
      }
    }
  }

  return { originX, originY, rects };
}

function calculateLogicFoldingStackLayout({ width, height, waferDiameter, layerCount }) {
  const layers = Math.max(2, Math.round(Number(layerCount) || 2));
  const radius = Math.max(44, Math.min(height * 0.42, width / (layers * 2.2 + 1.1)));
  const spacing = layers > 1 ? Math.min(radius * 2.4, Math.max(radius * 2.28, (width - radius * 2.3) / (layers - 1))) : 0;
  const infoBandHeight = 54;
  const infoBandY = Math.max(height - infoBandHeight - 16, height * 0.78);
  const layerLabelBaselineY = infoBandY - 18;
  return {
    layers,
    radius,
    spacing,
    startX: width * 0.5 - ((layers - 1) * spacing) / 2,
    baseY: height * 0.44,
    scale: radius / (waferDiameter / 2),
    outOfPlaneTiltRadians: 0.58,
    perspectiveDistance: radius * 4.4,
    rotationAxis: "y",
    rollRadians: 0,
    infoBandY,
    infoBandHeight,
    layerLabelBaselineY,
  };
}

function projectWaferPoint(x, y, layout) {
  const tilt = layout.outOfPlaneTiltRadians || 0;
  const distance = Math.max(1, layout.perspectiveDistance || layout.radius * 4);
  const cosTilt = Math.cos(tilt);
  const sinTilt = Math.sin(tilt);
  const depth = x * sinTilt;
  const depthScale = distance / Math.max(1, distance - depth);
  const projectedX = x * cosTilt * depthScale;
  const projectedY = y * depthScale;
  const roll = layout.rollRadians || 0;
  if (!roll) {
    return { x: projectedX, y: projectedY, depthScale };
  }
  const cosRoll = Math.cos(roll);
  const sinRoll = Math.sin(roll);
  return {
    x: projectedX * cosRoll - projectedY * sinRoll,
    y: projectedX * sinRoll + projectedY * cosRoll,
    depthScale,
  };
}

function readReticlePacking({ dieWidth, dieHeight, scribeX, scribeY }) {
  const auto = els.autoOptimizeReticle?.checked !== false;
  const packing = calculateReticlePacking({
    dieWidth,
    dieHeight,
    scribeX,
    scribeY,
    reticleWidth: Math.max(1, toNumber(els.reticleWidth?.value) || 26),
    reticleHeight: Math.max(1, toNumber(els.reticleHeight?.value) || 33),
    halfField: Boolean(els.halfFieldExposure?.checked),
  });
  if (!auto) {
    packing.offsetX = clamp(toNumber(els.reticleOffsetX?.value) || 0, 0, Math.max(0, packing.usableWidth - packing.occupiedWidth));
    packing.offsetY = clamp(toNumber(els.reticleOffsetY?.value) || 0, 0, Math.max(0, packing.usableHeight - packing.occupiedHeight));
  } else {
    if (els.reticleOffsetX) {
      els.reticleOffsetX.value = formatNumber(packing.offsetX, 3);
    }
    if (els.reticleOffsetY) {
      els.reticleOffsetY.value = formatNumber(packing.offsetY, 3);
    }
  }
  return packing;
}

function generateSubstrateDies({ dieWidth, dieHeight, waferDiameter, edgeLoss = 0, notchKeepOut = 0, reticlePacking = null }) {
  const waferRadius = waferDiameter / 2;
  const usableRadius = Math.max(0, waferRadius - edgeLoss);
  const fullDies = [];
  const partialDies = [];
  const excludedDies = [];
  const seed = Math.round(dieWidth * 37 + dieHeight * 71 + waferDiameter + edgeLoss * 11 + notchKeepOut * 19);
  const seen = new Set();

  const addUniqueCell = (bucket, cell) => {
    const key = `${cell.row}:${cell.col}:${cell.x.toFixed(4)}:${cell.y.toFixed(4)}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    bucket.push(cell);
    return true;
  };

  const measureCell = (cell) => {
    const cellWidth = cell.width || dieWidth;
    const cellHeight = cell.height || dieHeight;
    const centerX = cell.x + cellWidth / 2;
    const centerY = cell.y + cellHeight / 2;
    const corners = dieCorners(cell.x, cell.y, cellWidth, cellHeight);
    const centerInsideWafer = Math.hypot(centerX, centerY) <= waferRadius;
    const anyCornerInsideWafer = corners.some(([px, py]) => Math.hypot(px, py) <= waferRadius);
    const visible = centerInsideWafer || anyCornerInsideWafer;
    const fullInsideWafer = visible && corners.every(([px, py]) => Math.hypot(px, py) <= waferRadius);
    const fullInsideUsable = visible && corners.every(([px, py]) => Math.hypot(px, py) <= usableRadius);
    const notchExcluded = visible && isInsideNotchKeepOut(centerX, centerY, waferRadius, notchKeepOut);
    return {
      visible,
      fullInsideWafer,
      printable: fullInsideWafer && fullInsideUsable && !notchExcluded,
    };
  };

  const classifyCell = (cell) => {
    const geometry = measureCell(cell);
    if (!geometry.visible) {
      return;
    }
    if (!geometry.fullInsideWafer) {
      addUniqueCell(partialDies, cell);
      return;
    }
    if (geometry.printable) {
      addUniqueCell(fullDies, cell);
    } else {
      addUniqueCell(excludedDies, cell);
    }
  };

  if (reticlePacking?.diePerReticle) {
    calculateReticleShotGrid({ waferDiameter, reticlePacking }).rects.forEach((shot) => {
      const shotCells = [];
      for (let localRow = 0; localRow < reticlePacking.rows; localRow += 1) {
        for (let localCol = 0; localCol < reticlePacking.columns; localCol += 1) {
          const row = shot.row * reticlePacking.rows + localRow;
          const col = shot.col * reticlePacking.columns + localCol;
          const x = shot.x + localCol * reticlePacking.pitchX;
          const y = shot.y + localRow * reticlePacking.pitchY;
          const cell = {
            x,
            y,
            width: reticlePacking.dieWidth,
            height: reticlePacking.dieHeight,
            row,
            col,
            shot,
            noise: deterministicNoise(row, col, seed),
          };
          const geometry = measureCell(cell);
          if (geometry.visible) {
            shotCells.push({ cell, geometry });
          }
        }
      }
      const exposeShot = shotCells.some(({ geometry }) => geometry.printable);
      shotCells.forEach(({ cell, geometry }) => {
        if (!exposeShot) {
          addUniqueCell(excludedDies, cell);
        } else if (geometry.printable) {
          addUniqueCell(fullDies, cell);
        } else {
          addUniqueCell(partialDies, cell);
        }
      });
    });
    return { fullDies, partialDies, excludedDies };
  }

  const columns = Math.ceil(waferDiameter / dieWidth) + 2;
  const rows = Math.ceil(waferDiameter / dieHeight) + 2;
  for (let row = -rows; row <= rows; row += 1) {
    for (let col = -columns; col <= columns; col += 1) {
      classifyCell({
        x: col * dieWidth - dieWidth / 2,
        y: row * dieHeight - dieHeight / 2,
        width: dieWidth,
        height: dieHeight,
        row,
        col,
        noise: deterministicNoise(row, col, seed),
      });
    }
  }

  return { fullDies, partialDies, excludedDies };
}

function rectIntersectsCircle(x, y, width, height, radius) {
  const closestX = clamp(0, x, x + width);
  const closestY = clamp(0, y, y + height);
  return Math.hypot(closestX, closestY) <= radius;
}

function dieCorners(x, y, dieWidth, dieHeight) {
  return [
    [x, y],
    [x + dieWidth, y],
    [x, y + dieHeight],
    [x + dieWidth, y + dieHeight],
  ];
}

function isInsideNotchKeepOut(x, y, radius, notchKeepOut) {
  if (notchKeepOut <= 0) {
    return false;
  }
  return y > radius - notchKeepOut * 2.4 && Math.abs(x) < notchKeepOut * 2.5;
}

function renderLogicFoldingLayerControls() {
  if (!els.logicLayerControls || !els.bondingControls) {
    return;
  }
  const previous = readLogicFoldingInputs();
  const count = Math.max(2, Math.round(toNumber(els.layerCount?.value) || 2));
  if (els.layerCount) {
    els.layerCount.value = count;
  }

  els.logicLayerControls.innerHTML = Array.from({ length: count }, (_, index) => {
    const layer = previous.layers[index] || {};
    return `
      <article class="layer-card">
        <strong>Layer ${index + 1}</strong>
        <label>
          <span>Yield model</span>
          <select data-layer-model="${index}">
            ${yieldModelOptions(layer.model || "negative")}
          </select>
        </label>
        <label>
          <span>D0 defects/cm2</span>
          <input data-layer-d0="${index}" type="number" min="0" step="0.01" value="${escapeHtml(layer.defectDensity ?? defaultLayerD0(index))}" />
        </label>
        <label>
          <span>Alpha</span>
          <input data-layer-alpha="${index}" type="number" min="0.1" step="0.1" value="${escapeHtml(layer.alpha ?? 3)}" />
        </label>
      </article>
    `;
  }).join("");

  els.bondingControls.innerHTML = Array.from({ length: count - 1 }, (_, index) => {
    const value = previous.bondingYields[index] ?? 99.5;
    return `
      <label class="bond-card">
        <span>Bond ${index + 1} yield %</span>
        <input data-bond-yield="${index}" type="number" min="0" max="100" step="0.01" value="${escapeHtml(value)}" />
      </label>
    `;
  }).join("");
}

function yieldModelOptions(selected) {
  return [
    ["poisson", "Poisson"],
    ["murphy", "Murphy"],
    ["negative", "Negative binomial"],
  ].map(([value, label]) => `<option value="${value}"${value === selected ? " selected" : ""}>${label}</option>`).join("");
}

function defaultLayerD0(index) {
  return formatNumber(0.08 + index * 0.02, 2);
}

function readLogicFoldingInputs() {
  const layers = [];
  els.logicLayerControls?.querySelectorAll(".layer-card").forEach((card, index) => {
    layers[index] = {
      model: card.querySelector(`[data-layer-model="${index}"]`)?.value || "negative",
      defectDensity: card.querySelector(`[data-layer-d0="${index}"]`)?.value || defaultLayerD0(index),
      alpha: card.querySelector(`[data-layer-alpha="${index}"]`)?.value || 3,
    };
  });
  const bondingYields = [];
  els.bondingControls?.querySelectorAll("[data-bond-yield]").forEach((input, index) => {
    bondingYields[index] = input.value || 99.5;
  });
  return { layers, bondingYields };
}

function renderLogicFoldingAnalyzer() {
  if (!els.stackYieldPercent) {
    return;
  }
  const dieWidth = Math.max(1, toNumber(els.dieWidth.value) || 1);
  const dieHeight = Math.max(1, toNumber(els.dieHeight.value) || 1);
  const scribeX = Math.max(0, toNumber(els.scribeX?.value) || 0);
  const scribeY = Math.max(0, toNumber(els.scribeY?.value) || 0);
  const dieArea = dieWidth * dieHeight;
  const waferDiameter = toNumber(els.waferDiameter.value) || 300;
  const edgeLoss = Math.max(0, toNumber(els.edgeLoss?.value) || 0);
  const notchKeepOut = Math.max(0, toNumber(els.notchKeepOut?.value) || 0);
  const substrateCost = Math.max(0, toNumber(els.substrateCost?.value) || 0);
  const reticle = readReticlePacking({ dieWidth, dieHeight, scribeX, scribeY });
  const substrate = generateSubstrateDies({ dieWidth, dieHeight, waferDiameter, edgeLoss, notchKeepOut, reticlePacking: reticle });
  const { layers, bondingYields } = readLogicFoldingInputs();
  const layerYields = layers.map((layer) =>
    calculateYield(dieArea, Math.max(0, toNumber(layer.defectDensity) || 0), layer.model, Math.max(0.1, toNumber(layer.alpha) || 3)),
  );
  const bondingFractions = bondingYields.map((value) => clamp((toNumber(value) || 0) / 100, 0, 1));
  const bondingProduct = bondingFractions.reduce((product, value) => product * value, 1);
  const stackYield = calculateLogicFoldingYield({ layerYields, bondingYields: bondingFractions });
  const gross = substrate.fullDies.length;
  const goodStacks = Math.round(gross * stackYield);

  els.stackYieldPercent.textContent = formatNumber(stackYield * 100, 3);
  els.stackGoodDie.textContent = formatNumber(goodStacks, 0);
  els.stackBondingYield.textContent = formatNumber(bondingProduct * 100, 3);
  els.stackCostPerGoodDie.textContent = goodStacks > 0 ? `$${formatNumber(substrateCost / goodStacks, 2)}` : "--";
  setText("fullDieCount", formatNumber(gross, 0));
  setText("partialDieCount", formatNumber(substrate.partialDies.length, 0));
  setText("excludedDieCount", formatNumber(substrate.excludedDies.length, 0));
  updateReticleReadout(reticle);
  setText("stackReticleDieCount", `${formatNumber(reticle.diePerReticle, 0)} (${reticle.columns}x${reticle.rows})`);

  drawLogicFoldingWaferStack({
    canvas: els.logicWaferStackCanvas,
    dieWidth,
    dieHeight,
    dieArea,
    waferDiameter,
    substrate,
    layerYields,
    reticlePacking: reticle,
    showReticleGrid: Boolean(els.showReticleGrid?.checked),
  });
  drawReticleResults(els.logicReticleCanvas, reticle, { showBackground: Boolean(els.showReticleBackground?.checked) });
}

function drawLogicFoldingWaferStack({ canvas, dieWidth, dieHeight, dieArea, waferDiameter, substrate, layerYields, reticlePacking, showReticleGrid }) {
  if (!canvas) {
    return;
  }
  const size = resizeCanvasToDisplay(canvas);
  const ctx = canvas.getContext("2d");
  const width = size.width;
  const height = size.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = CANVAS_BG_FILL;
  ctx.fillRect(0, 0, width, height);

  const layout = calculateLogicFoldingStackLayout({
    width,
    height,
    waferDiameter,
    layerCount: layerYields.length,
  });
  const { layers, radius, spacing, startX, baseY, scale } = layout;

  for (let layer = 0; layer < layers; layer += 1) {
    const cx = startX + layer * spacing;
    const cy = baseY + layer * radius * 0.035;
    const good = Math.round(substrate.fullDies.length * (layerYields[layer] || 1));
    ctx.save();
    ctx.globalAlpha = LOGICFOLDING_LAYER_ALPHA;
    drawLayerWafer(ctx, { cx, cy, radius, scale, waferDiameter, substrate, good, seedOffset: layer * 997, projection: layout });
    ctx.restore();
    if (showReticleGrid && reticlePacking?.diePerReticle) {
      drawReticleShotGrid(ctx, { cx, cy, scale, waferDiameter, reticlePacking, projection: layout });
    }

    ctx.fillStyle = LOGICFOLDING_LABEL_FILL;
    ctx.font = "700 12px Segoe UI";
    ctx.fillText(
      `L${layer + 1} ${formatNumber((layerYields[layer] || 0) * 100, 1)}%`,
      cx - radius * 0.42,
      layout.layerLabelBaselineY - (layers - layer - 1) * 16,
    );
  }

  ctx.fillStyle = CANVAS_PANEL_FILL;
  ctx.fillRect(24, layout.infoBandY, width - 48, layout.infoBandHeight);
  ctx.fillStyle = CANVAS_MUTED_FILL;
  ctx.font = "12px Segoe UI";
  ctx.fillText(
    `Shared die ${formatNumber(dieWidth, 1)} x ${formatNumber(dieHeight, 1)} mm | area ${formatNumber(dieArea, 1)} mm2 | layers ${layers}`,
    38,
    layout.infoBandY + 34,
  );
}

function drawLayerWafer(ctx, { cx, cy, radius, scale, substrate, good, seedOffset, projection = null }) {
  ctx.save();
  if (projection) {
    ctx.translate(cx, cy);
    traceProjectedWaferPath(ctx, radius, projection);
  } else {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  }
  ctx.clip();
  ctx.fillStyle = "rgba(9, 28, 33, 0.76)";
  if (projection) {
    traceProjectedWaferPath(ctx, radius, projection);
    ctx.fill();
  } else {
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
  }

  const sampleCells = (cells, maxCells) =>
    cells.length > maxCells ? cells.filter((_, index) => index % Math.ceil(cells.length / maxCells) === 0) : cells;
  const visualNoPrintDies = sampleCells(substrate.excludedDies || [], 260);
  const visualEdgeDies = sampleCells(substrate.partialDies || [], 260);
  visualNoPrintDies.forEach((cell) => {
    drawLayerDieCell(ctx, cell, cx, cy, scale, LOGICFOLDING_NO_PRINT_FILL, projection);
  });
  visualEdgeDies.forEach((cell) => {
    drawLayerDieCell(ctx, cell, cx, cy, scale, LOGICFOLDING_WAFER_EDGE_FILL, projection);
  });

  const fullDies =
    substrate.fullDies.length > LOGICFOLDING_MAX_RENDERED_FULL_DIES
      ? substrate.fullDies.filter((_, index) => index % Math.ceil(substrate.fullDies.length / LOGICFOLDING_MAX_RENDERED_FULL_DIES) === 0)
      : substrate.fullDies;
  const badCount = Math.max(0, substrate.fullDies.length - good);
  const badSet = new Set(
    [...substrate.fullDies]
      .sort((a, b) => deterministicNoise(a.row, a.col, seedOffset) - deterministicNoise(b.row, b.col, seedOffset))
      .slice(0, badCount)
      .map((cell) => `${cell.row}:${cell.col}`),
  );
  fullDies.forEach((cell) => {
    const bad = badSet.has(`${cell.row}:${cell.col}`);
    drawLayerDieCell(ctx, cell, cx, cy, scale, bad ? WAFER_BAD_FILL : WAFER_GOOD_FILL, projection);
  });
  ctx.restore();

  ctx.save();
  if (projection) {
    ctx.translate(cx, cy);
  }
  ctx.strokeStyle = WAFER_OUTLINE_STROKE;
  ctx.lineWidth = 3;
  if (projection) {
    traceProjectedWaferPath(ctx, radius, projection);
  } else {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  }
  ctx.stroke();
  ctx.restore();
}

function generateWaferDies({ dieWidth, dieHeight, waferDiameter }) {
  const radius = waferDiameter / 2;
  const columns = Math.ceil(waferDiameter / dieWidth) + 2;
  const rows = Math.ceil(waferDiameter / dieHeight) + 2;
  const dies = [];

  for (let row = -rows; row <= rows; row += 1) {
    for (let col = -columns; col <= columns; col += 1) {
      const centerX = col * dieWidth;
      const centerY = row * dieHeight;
      const x = centerX - dieWidth / 2;
      const y = centerY - dieHeight / 2;
      if (isFullDieInsideWaferMm(x, y, dieWidth, dieHeight, radius)) {
        dies.push({
          x,
          y,
          width: dieWidth,
          height: dieHeight,
          row,
          col,
          noise: deterministicNoise(row, col, Math.round(dieWidth * 37 + dieHeight * 71 + waferDiameter)),
        });
      }
    }
  }

  return dies;
}

function drawWaferCutMap({
  dieWidth,
  dieHeight,
  dieArea,
  waferDiameter,
  waferDies,
  partialDies = [],
  excludedDies = [],
  good,
  reticlePacking = null,
  showReticleGrid = false,
}) {
  const canvas = els.waferCutCanvas;
  if (!canvas) {
    return;
  }
  const size = resizeCanvasToDisplay(canvas);
  const ctx = canvas.getContext("2d");
  const width = size.width;
  const height = size.height;
  const cx = width * 0.5;
  const cy = height * 0.54;
  const radius = Math.min(width, height) * 0.39;
  const scale = radius / (waferDiameter / 2);
  const visualDies = waferDies.length > 2500 ? waferDies.filter((_, index) => index % Math.ceil(waferDies.length / 2500) === 0) : waferDies;
  const visualEdgeDies =
    partialDies.length > 900 ? partialDies.filter((_, index) => index % Math.ceil(partialDies.length / 900) === 0) : partialDies;
  const visualNoPrintDies =
    excludedDies.length > 900 ? excludedDies.filter((_, index) => index % Math.ceil(excludedDies.length / 900) === 0) : excludedDies;
  const badCount = Math.max(0, waferDies.length - good);
  const badSet = new Set(
    [...waferDies]
      .sort((a, b) => b.noise - a.noise)
      .slice(0, badCount)
      .map((cell) => `${cell.row}:${cell.col}`),
  );

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = CANVAS_BG_FILL;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();

  visualNoPrintDies.forEach((cell) => {
    drawWaferDieCell(ctx, cell, cx, cy, scale, WAFER_NO_PRINT_FILL);
  });
  visualEdgeDies.forEach((cell) => {
    drawWaferDieCell(ctx, cell, cx, cy, scale, WAFER_EDGE_FILL);
  });
  visualDies.forEach((cell) => {
    const bad = badSet.has(`${cell.row}:${cell.col}`);
    drawWaferDieCell(ctx, cell, cx, cy, scale, bad ? WAFER_BAD_FILL : WAFER_GOOD_FILL);
  });

  if (showReticleGrid && reticlePacking?.diePerReticle) {
    drawReticleShotGrid(ctx, { cx, cy, scale, waferDiameter, reticlePacking });
  }

  ctx.restore();

  ctx.strokeStyle = WAFER_OUTLINE_STROKE;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = WAFER_GRID_STROKE;
  ctx.lineWidth = 1;
  for (let r = radius * 0.25; r < radius; r += radius * 0.25) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawWaferMapLabel(ctx, {
    width,
    title: t("yield.waferTitle"),
    stats: t("yield.mapStats", {
      width: formatNumber(dieWidth, 1),
      height: formatNumber(dieHeight, 1),
      area: formatNumber(dieArea, 1),
      gross: formatNumber(waferDies.length, 0),
      good: formatNumber(good, 0),
      bad: formatNumber(badCount, 0),
      edge: formatNumber(partialDies.length, 0),
      noPrint: formatNumber(excludedDies.length, 0),
    }),
  });
  drawLegend(ctx, width, height);
}

function drawWaferDieCell(ctx, cell, cx, cy, scale, fillStyle) {
  const rectX = cx + cell.x * scale;
  const rectY = cy + cell.y * scale;
  const rectW = Math.max(1.2, cell.width * scale);
  const rectH = Math.max(1.2, cell.height * scale);
  ctx.fillStyle = fillStyle;
  ctx.fillRect(rectX + 0.7, rectY + 0.7, Math.max(0.8, rectW - 1.4), Math.max(0.8, rectH - 1.4));
  ctx.strokeStyle = WAFER_DIE_STROKE;
  ctx.lineWidth = 0.7;
  ctx.strokeRect(rectX + 0.7, rectY + 0.7, Math.max(0.8, rectW - 1.4), Math.max(0.8, rectH - 1.4));
}

function drawLayerDieCell(ctx, cell, cx, cy, scale, fillStyle, projection) {
  if (!projection) {
    drawWaferDieCell(ctx, cell, cx, cy, scale, fillStyle);
    return;
  }
  drawProjectedRect(
    ctx,
    cell.x * scale,
    cell.y * scale,
    cell.width * scale,
    cell.height * scale,
    projection,
    fillStyle,
    LOGICFOLDING_DIE_STROKE,
    LOGICFOLDING_DIE_STROKE_WIDTH,
  );
}

function traceProjectedWaferPath(ctx, radius, projection) {
  ctx.beginPath();
  const steps = 128;
  for (let index = 0; index <= steps; index += 1) {
    const angle = (Math.PI * 2 * index) / steps;
    const point = projectWaferPoint(Math.cos(angle) * radius, Math.sin(angle) * radius, projection);
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  }
  ctx.closePath();
}

function drawProjectedRect(ctx, x, y, width, height, projection, fillStyle = null, strokeStyle = null, strokeWidth = 0.7) {
  const points = [
    projectWaferPoint(x, y, projection),
    projectWaferPoint(x + width, y, projection),
    projectWaferPoint(x + width, y + height, projection),
    projectWaferPoint(x, y + height, projection),
  ];
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }
}

function drawReticleShotGrid(ctx, { cx, cy, scale, waferDiameter, reticlePacking, projection = null }) {
  ctx.strokeStyle = WAFER_GRID_STROKE;
  ctx.lineWidth = 1;
  if (projection) {
    ctx.save();
    ctx.translate(cx, cy);
    calculateReticleShotGrid({ waferDiameter, reticlePacking }).rects.forEach((rect) => {
      drawProjectedRect(ctx, rect.x * scale, rect.y * scale, rect.width * scale, rect.height * scale, projection, null, WAFER_GRID_STROKE);
    });
    ctx.restore();
    return;
  }
  calculateReticleShotGrid({ waferDiameter, reticlePacking }).rects.forEach((rect) => {
    ctx.strokeRect(cx + rect.x * scale, cy + rect.y * scale, rect.width * scale, rect.height * scale);
  });
}

function drawWaferMapLabel(ctx, { width, title, stats }) {
  const inset = width < 520 ? 14 : 24;
  ctx.fillStyle = CANVAS_TEXT_FILL;
  ctx.font = "700 13px Segoe UI";
  ctx.textAlign = "left";
  ctx.fillText(title, inset, 26);
  ctx.fillStyle = CANVAS_MUTED_FILL;
  ctx.font = "12px Segoe UI";
  drawWrappedText(ctx, stats, inset, 47, width - inset * 2, 15, width < 520 ? 2 : 1);
  if (width >= 520) {
    ctx.textAlign = "right";
    ctx.fillText("notch", width - inset, 47);
  }
}

function drawLegend(ctx, width, height) {
  const items = [
    [WAFER_GOOD_FILL, t("yield.goodLegend")],
    [WAFER_BAD_FILL, t("yield.badLegend")],
    [WAFER_EDGE_FILL, t("yield.edgeLegend")],
    [WAFER_NO_PRINT_FILL, t("yield.noPrintLegend")],
  ];
  if (width < 520) {
    const x = 14;
    let y = height - 56;
    ctx.textAlign = "left";
    items.forEach(([color, label]) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 10, 10);
      ctx.fillStyle = CANVAS_TEXT_FILL;
      ctx.font = "12px Segoe UI";
      ctx.fillText(label, x + 15, y + 10);
      y += 17;
    });
    return;
  }
  const itemWidths = items.map(([, label]) => Math.max(84, label.length * 8 + 28));
  const totalWidth = itemWidths.reduce((total, value) => total + value, 0);
  let x = Math.max(24, width - totalWidth - 24);
  const y = 24;
  ctx.textAlign = "left";
  items.forEach(([color, label], index) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 10, 10);
    ctx.fillStyle = CANVAS_TEXT_FILL;
    ctx.font = "12px Segoe UI";
    ctx.fillText(label, x + 15, y + 10);
    x += itemWidths[index];
  });
}

function updateReticleReadout(packing) {
  setText("reticleDieCount", `${formatNumber(packing.diePerReticle, 0)} (${packing.columns}x${packing.rows})`);
  setText("reticleUtilization", `${formatNumber(packing.utilization * 100, 4)}%`);
}

function calculateReticleRenderLayout({ canvasWidth, canvasHeight, packing }) {
  const width = Math.max(1, Number(canvasWidth) || 1);
  const height = Math.max(1, Number(canvasHeight) || 1);
  const margin = Math.max(22, Math.min(width, height) * 0.07);
  const fieldRatio = packing.usableWidth / packing.usableHeight || 1;
  let fieldH = height - margin * 2;
  let fieldW = fieldH * fieldRatio;
  if (fieldW > width - margin * 2) {
    fieldW = width - margin * 2;
    fieldH = fieldW / fieldRatio;
  }
  const fieldX = (width - fieldW) / 2;
  const fieldY = (height - fieldH) / 2;
  const minimumActiveGutterPx = Math.max(10, Math.min(width, height) * 0.018);
  const mapMaxW = Math.max(1, fieldW - minimumActiveGutterPx * 2);
  const mapMaxH = Math.max(1, fieldH - minimumActiveGutterPx * 2);
  const scale = packing.usableWidth > 0 && packing.usableHeight > 0 ? Math.min(mapMaxW / packing.usableWidth, mapMaxH / packing.usableHeight) : 1;
  const mapW = packing.usableWidth * scale;
  const mapH = packing.usableHeight * scale;
  const mapX = fieldX + (fieldW - mapW) / 2;
  const mapY = fieldY + (fieldH - mapH) / 2;
  const activeX = mapX + packing.offsetX * scale;
  const activeY = mapY + packing.offsetY * scale;
  const activeW = packing.occupiedWidth * scale;
  const activeH = packing.occupiedHeight * scale;
  return {
    fieldX,
    fieldY,
    fieldW,
    fieldH,
    mapX,
    mapY,
    mapW,
    mapH,
    scale,
    activeX,
    activeY,
    activeW,
    activeH,
    minimumActiveGutterPx,
  };
}

function drawReticleResults(canvas, packing, { showBackground = true } = {}) {
  if (!canvas) {
    return;
  }
  const size = resizeCanvasToDisplay(canvas);
  const ctx = canvas.getContext("2d");
  const width = size.width;
  const height = size.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = CANVAS_BG_FILL;
  ctx.fillRect(0, 0, width, height);

  const { fieldX, fieldY, fieldW, fieldH, mapX, mapY, scale, activeX, activeY, activeW, activeH } = calculateReticleRenderLayout({
    canvasWidth: width,
    canvasHeight: height,
    packing,
  });

  if (showBackground) {
    const fieldGradient = ctx.createLinearGradient(fieldX, fieldY, fieldX + fieldW, fieldY + fieldH);
    fieldGradient.addColorStop(0, "rgba(14, 35, 43, 0.56)");
    fieldGradient.addColorStop(1, "rgba(11, 18, 26, 0.66)");
    ctx.fillStyle = fieldGradient;
    ctx.fillRect(fieldX, fieldY, fieldW, fieldH);
  }
  ctx.strokeStyle = "rgba(147, 167, 184, 0.5)";
  ctx.lineWidth = 1;
  ctx.strokeRect(fieldX, fieldY, fieldW, fieldH);
  drawReticleRegistrationMarks(ctx, fieldX, fieldY, fieldW, fieldH);

  if (showBackground) {
    const gradient = ctx.createLinearGradient(fieldX, fieldY, fieldX + fieldW, fieldY + fieldH);
    gradient.addColorStop(0, "rgba(82, 218, 190, 0.82)");
    gradient.addColorStop(0.52, "rgba(103, 214, 255, 0.76)");
    gradient.addColorStop(1, "rgba(74, 114, 144, 0.82)");
    ctx.fillStyle = gradient;
    ctx.fillRect(activeX, activeY, activeW, activeH);
  }

  ctx.strokeStyle = "rgba(103, 214, 255, 0.9)";
  ctx.lineWidth = 2;
  if (packing.occupiedWidth > 0 && packing.occupiedHeight > 0) {
    ctx.strokeRect(activeX, activeY, activeW, activeH);
  }

  for (let row = 0; row < packing.rows; row += 1) {
    for (let col = 0; col < packing.columns; col += 1) {
      const x = mapX + (packing.offsetX + col * packing.pitchX) * scale;
      const y = mapY + (packing.offsetY + row * packing.pitchY) * scale;
      const dieW = packing.dieWidth * scale;
      const dieH = packing.dieHeight * scale;
      if (!showBackground) {
        ctx.fillStyle = col % 2 === 0 ? "rgba(82, 218, 190, 0.68)" : "rgba(103, 214, 255, 0.62)";
        ctx.fillRect(x, y, dieW, dieH);
      }
      ctx.strokeStyle = WAFER_DIE_STROKE;
      ctx.lineWidth = Math.max(1, Math.min(3, scale * Math.max(packing.scribeX, packing.scribeY, 0.2)));
      ctx.strokeRect(x, y, dieW, dieH);
    }
  }
}

function drawReticleRegistrationMarks(ctx, x, y, width, height) {
  const pad = 12;
  const len = Math.min(28, Math.max(16, Math.min(width, height) * 0.08));
  ctx.strokeStyle = CANVAS_TEXT_FILL;
  ctx.lineWidth = 2;
  [
    [x + pad, y + pad, 1, 1],
    [x + width - pad, y + pad, -1, 1],
    [x + pad, y + height - pad, 1, -1],
    [x + width - pad, y + height - pad, -1, -1],
  ].forEach(([cx, cy, sx, sy]) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy + sy * len);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + sx * len, cy);
    ctx.stroke();
  });

  ctx.fillStyle = CANVAS_TEXT_FILL;
  [
    [x + width / 2, y + pad],
    [x + width - pad, y + height / 2],
    [x + width / 2, y + height - pad],
    [x + pad, y + height / 2],
  ].forEach(([mx, my]) => {
    ctx.fillRect(mx - 4, my - 4, 8, 8);
  });
}

function setText(id, value) {
  if (els[id]) {
    els[id].textContent = value;
  }
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = String(text).split(/\s+/);
  let line = "";
  let lines = 0;
  ctx.textAlign = "left";

  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      if (lines < maxLines) {
        ctx.fillText(line, x, y + lines * lineHeight);
      }
      line = word;
      lines += 1;
    } else {
      line = test;
    }
  });

  if (line && lines < maxLines) {
    ctx.fillText(line, x, y + lines * lineHeight);
  }
}

function isFullDieInsideWaferMm(x, y, dieWidth, dieHeight, radius) {
  return [
    [x, y],
    [x + dieWidth, y],
    [x, y + dieHeight],
    [x + dieWidth, y + dieHeight],
  ].every(([px, py]) => Math.hypot(px, py) <= radius);
}

function deterministicNoise(row, col, seed) {
  const value = Math.sin(row * 127.1 + col * 311.7 + seed * 17.13) * 43758.5453;
  return value - Math.floor(value);
}

function startWaferAnimation() {
  if (!els.waferCanvas || state.waferAnimationStarted) {
    return;
  }
  const rows = state.records
    .filter((row) => Number.isFinite(row.logic))
    .sort((a, b) => b.logic - a.logic)
    .slice(0, 24);

  if (!rows.length) {
    return;
  }

  state.waferAnimationStarted = true;
  const canvas = els.waferCanvas;
  const ctx = canvas.getContext("2d");

  function draw(time) {
    const width = canvas.width;
    const height = canvas.height;
    const cx = width * 0.52;
    const cy = height * 0.49;
    const radius = Math.min(width, height) * 0.37;
    const active = rows[Math.floor(time / 1800) % rows.length];

    els.waferNode.textContent = `${displayFoundry(active.foundry)} ${active.variant}`;
    els.waferDensity.textContent = formatNumber(active.logic, 1);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = CANVAS_BG_FILL;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = WAFER_GRID_STROKE;
    ctx.lineWidth = 1;
    for (let r = radius; r > 30; r -= 32) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * 24, Math.sin(a) * 24);
      ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
      ctx.stroke();
    }

    rows.forEach((row, index) => {
      const angle = (index / rows.length) * Math.PI * 2 + time * 0.00015;
      const normalized = clamp(row.logic / 220, 0.18, 1);
      const lane = radius * (0.26 + (index % 4) * 0.16);
      const x = Math.cos(angle) * lane;
      const y = Math.sin(angle) * lane;
      const size = 5 + normalized * 13;
      const pulse = 0.72 + Math.sin(time * 0.004 + index) * 0.28;
      ctx.fillStyle = row === active ? "rgba(255, 209, 102, 0.92)" : `rgba(82, 218, 190, ${0.32 + normalized * 0.46})`;
      ctx.beginPath();
      ctx.arc(x, y, size * pulse, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = WAFER_OUTLINE_STROKE;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, radius + Math.sin(time * 0.002) * 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = CANVAS_TEXT_FILL;
    ctx.font = "700 13px Segoe UI";
    ctx.fillText("LOGIC DENSITY ORBIT", 26, 34);
    ctx.fillStyle = CANVAS_MUTED_FILL;
    ctx.font = "12px Segoe UI";
    ctx.fillText("Top process/library entries from public dataset", 26, 56);

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

function metricConfig(metric) {
  const configs = {
    logic: {
      title: t("metricTitle.logic"),
      unit: "MTr/mm2",
      decimals: 1,
      asc: false,
      value: (row) => row.logic,
    },
    sram: {
      title: t("metricTitle.sram"),
      unit: "Mb/mm2",
      decimals: 1,
      asc: false,
      value: (row) => row.sram,
    },
  };
  return configs[metric] || configs.logic;
}

function parseCsv(csv) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"' && quoted && next === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(field);
      if (row.some((value) => value.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  const headers = rows.shift().map((header) => header.trim());
  return rows.map((values) => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = values[index] ? values[index].trim() : "";
    });
    return item;
  });
}

function normalizeRecord(row) {
  const calc = firstNumber(row, "logic_density_calculated_mtr_mm2", "Logic_density_calc_MTr_per_mm2");
  const reported = firstNumber(row, "logic_density_reported_mtr_mm2", "Logic_density_reported_MTr_per_mm2");
  const sramIdeal = firstNumber(row, "sram_ideal_mb_mm2", "SRAM_ideal_Mb_per_mm2");
  const sramReported = firstNumber(row, "sram_reported_mb_mm2", "SRAM_reported_Mb_mm2");
  const confidence =
    field(row, "Confidence") || confidenceScoreLabel(firstNumber(row, "overall_confidence", "Overall_confidence"));
  return {
    id: field(row, "record_id"),
    foundry: field(row, "foundry", "Foundry"),
    family: field(row, "process_family", "Process_family"),
    process: field(row, "process_node", "Process_node"),
    variant: field(row, "variant_node", "Variant_node", "process_node", "Process_node") || "Unknown",
    libraryOption: field(row, "library_option_raw", "Library_option"),
    libraryClass: field(row, "library_bucket", "Library_class") || "Unlabeled",
    structure: field(row, "structure", "Structure"),
    cpp: firstNumber(row, "cpp_cgp_nm", "CPP_CGP_nm"),
    height: firstNumber(row, "cell_height_nm", "Cell_height_nm"),
    trackCount: firstNumber(row, "track_count"),
    breakModel: field(row, "diffusion_break_model", "Diffusion_break_model"),
    breakExtra: firstNumber(row, "break_extra_cpp", "Break_extra_CPP"),
    logicCalc: calc,
    logicReported: reported,
    logic: Number.isFinite(reported) ? reported : calc,
    sramCell: firstNumber(row, "sram_bitcell_um2", "SRAM_bitcell_um2"),
    sram: Number.isFinite(sramIdeal) ? sramIdeal : sramReported,
    confidence,
    geometryConfidence: firstNumber(row, "geometry_confidence"),
    logicConfidence: firstNumber(row, "logic_density_confidence"),
    sramConfidence: firstNumber(row, "sram_confidence"),
    reviewRequired: parseBoolean(field(row, "review_required")),
    notes: field(row, "notes", "Notes"),
    source: field(row, "density_source_url", "Density_source_URL", "geometry_source_url", "Geometry_source_URL", "sram_source_url", "SRAM_source_URL", "source_url"),
  };
}

function field(row, ...keys) {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return String(value).trim();
    }
  }
  return "";
}

function firstNumber(row, ...keys) {
  for (const key of keys) {
    const value = toNumber(row[key]);
    if (Number.isFinite(value)) {
      return value;
    }
  }
  return NaN;
}

function confidenceScoreLabel(score) {
  if (!Number.isFinite(score)) return "Unknown";
  if (score >= 4) return "High (4/4)";
  if (score >= 3) return "Medium-High (3/4)";
  if (score >= 2) return "Medium-Low (2/4)";
  if (score >= 1) return "Low (1/4)";
  return "Missing (0/4)";
}

function parseBoolean(value) {
  return ["true", "1", "yes"].includes(String(value || "").toLowerCase());
}

function processBucket(row) {
  return row.family || row.process || t("common.unlabeled");
}

function libraryBucket(row) {
  const source = `${row.libraryClass || ""} ${row.libraryOption || ""}`.toLowerCase();
  const hasHd = /\bhd\b|high density|dense/.test(source);
  const hasHp = /\bhp\b|high performance|performance/.test(source);

  if (source.includes("tbd")) return "TBD";
  if (source.includes("gaa")) return "GAA";
  if (source.includes("automotive") || source.includes("robust")) return "Robust / automotive";
  if (source.includes("cost")) return "Cost optimized";
  if (source.includes("generic") || source.includes("standard")) return "Generic / standard";
  if (source.includes("minilib") || source.includes("area")) return "Area optimized";
  if (source.includes("uhd")) return "UHD";
  if (source.includes("hdc")) return "HDC";
  if (source.includes("hpc")) return "HPC";
  if (hasHd && hasHp) return "HD/HP mixed";
  if (hasHd) return "HD";
  if (hasHp || source.includes("uhs") || source.includes("high-speed")) return "HP";
  if (source.includes("balanced")) return "Balanced";
  if (source.includes("ulp") || source.includes("ulv") || source.includes("low-power")) return "ULP/ULV";
  if (source.includes("mature") || source.includes("planar")) return "Mature";
  if (source.includes("specialty") || source.includes("reported")) return "Specialty / reported";
  return row.libraryClass || t("common.unlabeled");
}

function confidenceBucket(value) {
  const text = String(value || "").toLowerCase();
  if (!text) return "Unknown";
  if (text.includes("high") && text.includes("low")) return "Mixed / scoped";
  if (text.includes("medium-high")) return "Medium-High";
  if (text.includes("medium-low")) return "Medium-Low";
  if (text.includes("low-medium")) return "Low-Medium";
  if (text.includes("high")) return "High";
  if (text.includes("medium")) return "Medium";
  if (text.includes("low")) return "Low";
  return value;
}

function isDdb(value) {
  return String(value || "").toLowerCase().includes("ddb");
}

function displayFoundry(value) {
  return value || t("common.unlabeled");
}

function t(key, values = {}) {
  const dictionary = I18N[state.lang] || I18N.en;
  const template = dictionary[key] || I18N.en[key] || key;
  return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), template);
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") {
    return NaN;
  }
  const number = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(number) ? number : NaN;
}

function formatNumber(value, decimals = 0) {
  return Number(value).toLocaleString(state.lang === "zh" ? "zh-CN" : "en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

function formatMaybe(value, decimals = 1) {
  return Number.isFinite(value) ? formatNumber(value, decimals) : "--";
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function fillSelect(select, options) {
  select.innerHTML = options
    .map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`)
    .join("");
}

function optionExists(select, value) {
  return [...select.options].some((option) => option.value === value);
}

function groupBy(values, getKey) {
  return values.reduce((groups, value) => {
    const key = getKey(value);
    groups[key] = groups[key] || [];
    groups[key].push(value);
    return groups;
  }, {});
}

function maxBy(values, getValue) {
  return values.reduce((best, value) => {
    const score = getValue(value);
    if (!Number.isFinite(score)) {
      return best;
    }
    if (!best || score > getValue(best)) {
      return value;
    }
    return best;
  }, null);
}

function nearestBy(values, getDistance) {
  return values.reduce((best, value) => {
    const distance = getDistance(value);
    if (!Number.isFinite(distance)) {
      return best;
    }
    if (!best || distance < best.distance) {
      return { value, distance };
    }
    return best;
  }, null)?.value;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, Math.abs(width) / 2, Math.abs(height) / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function resizeCanvasToDisplay(canvas) {
  const container = canvas.parentElement;
  const availableWidth = Math.max(0, Math.floor(container.clientWidth - 20));
  const maxWidth = Math.max(320, Number(canvas.getAttribute("width")) || 1100);
  const targetWidth = clamp(availableWidth, 240, maxWidth);
  const targetHeight = Math.round(targetWidth * (targetWidth < 520 ? 0.9 : 0.66));
  const dpr = window.devicePixelRatio || 1;
  canvas.style.width = `${targetWidth}px`;
  canvas.style.height = `${targetHeight}px`;
  const rect = canvas.getBoundingClientRect();
  const cssWidth = rect.width;
  const cssHeight = rect.height;
  const pixelWidth = Math.round(cssWidth * dpr);
  const pixelHeight = Math.round(cssHeight * dpr);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { width: cssWidth, height: cssHeight };
}

function debounce(fn, wait) {
  let timer;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), wait);
  };
}

if (typeof window !== "undefined") {
  window.InsightsLakeYield = {
    calculateYield,
    calculateLogicFoldingYield,
    calculateReticlePacking,
    calculateReticleShotGrid,
    calculateReticleRenderLayout,
    calculateLogicFoldingStackLayout,
    projectWaferPoint,
    generateSubstrateDies,
  };
}
