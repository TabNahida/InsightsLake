const DATA_URL = "assets/data/cgp_ch_density_sram_compare_v0_4.csv";
const ALL_VALUE = "__all";

const I18N = {
  en: {
    "brand.subtitle": "Process Intelligence",
    "nav.home": "Overview",
    "nav.ranking": "Ranking",
    "nav.density": "Density",
    "nav.yield": "Yield",
    "nav.reports": "Reports",
    "common.downloadXlsx": "Download XLSX",
    "common.downloadCsv": "Download v0.4 CSV",
    "common.dataQualityCsv": "Data quality CSV",
    "common.records": "{count} records",
    "common.rows": "{count} rows",
    "common.unlabeled": "Unlabeled",
    "common.noMatches": "No matching data",
    "common.dataLoadError": "Data could not be loaded. Check that the CSV asset exists.",
    "home.eyebrow": "PUBLIC FOUNDRY DATASET",
    "home.title": "Process Density and Library Analytics",
    "home.lead":
      "A static analysis console for the v0.4 public semiconductor process dataset, combining logic density, SRAM bitcell, CPP/CGP, cell height, and source confidence.",
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
    "yield.mapStats": "die {width} x {height} mm | area {area} mm2 | gross {gross} | good {good} | lost {bad}",
    "reports.eyebrow": "SOURCE REPORTS",
    "reports.title": "Reports and data exports",
    "reports.lead": "Download the v0.4 normalized CSV exports used by the interactive pages.",
    "reports.xlsxDesc": "Legacy v0.3 workbook with foundry sheets, comparison views, source index, and dashboard.",
    "reports.csvDesc": "Primary v0.4 CGP / cell-height / density / SRAM dataset.",
    "reports.qualityDesc": "Data quality summary with coverage counts and records marked for review.",
    "reports.metricsDesc": "Derived density and SRAM calculations with formula inputs and assumptions.",
    "reports.observationsDesc": "Normalized process observations before derived metrics are attached.",
    "reports.sourcesDesc": "Raw public source index used by the v0.4 report.",
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
    "common.downloadCsv": "下载 v0.4 CSV",
    "common.dataQualityCsv": "数据质量 CSV",
    "common.records": "{count} 条记录",
    "common.rows": "{count} 行",
    "common.unlabeled": "未标注",
    "common.noMatches": "没有匹配数据",
    "common.dataLoadError": "数据加载失败，请确认 CSV 资产存在。",
    "home.eyebrow": "PUBLIC FOUNDRY DATASET",
    "home.title": "工艺密度与库选型分析台",
    "home.lead": "面向 v0.4 公开工艺数据的静态分析网站，聚合逻辑密度、SRAM bitcell、CPP/CGP、cell height 与资料置信度。",
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
    "yield.mapStats": "die {width} x {height} mm | 面积 {area} mm2 | gross {gross} | 良品 {good} | 损失 {bad}",
    "reports.eyebrow": "SOURCE REPORTS",
    "reports.title": "报告与数据导出",
    "reports.lead": "下载交互页面使用的 v0.4 规范化 CSV 导出。",
    "reports.xlsxDesc": "v0.3 旧版 workbook，包含厂商分表、对比视图、来源索引和 dashboard。",
    "reports.csvDesc": "v0.4 主数据表：CGP / cell height / density / SRAM 对比。",
    "reports.qualityDesc": "数据质量摘要，包含覆盖率计数与需要复核的记录。",
    "reports.metricsDesc": "派生密度与 SRAM 计算，包含公式输入和假设说明。",
    "reports.observationsDesc": "挂接派生指标前的规范化工艺观察记录。",
    "reports.sourcesDesc": "v0.4 报告使用的公开来源索引。",
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
    "dieWidth",
    "dieHeight",
    "defectDensity",
    "yieldModel",
    "clusterAlpha",
    "waferDiameter",
    "wafersPerMonth",
    "yieldPercent",
    "grossDie",
    "goodDie",
    "monthlyGoodDie",
    "waferCutCanvas",
    "waferCanvas",
    "waferNode",
    "waferDensity",
  ].forEach((id) => {
    els[id] = document.getElementById(id);
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
    ["dieWidth", "dieHeight", "defectDensity", "yieldModel", "clusterAlpha", "waferDiameter", "wafersPerMonth"].forEach((id) => {
      els[id]?.addEventListener("input", renderYieldAnalyzer);
    });
    window.addEventListener("resize", debounce(renderYieldAnalyzer, 120));
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
  const dieArea = dieWidth * dieHeight;
  const defectDensity = Math.max(0, toNumber(els.defectDensity.value) || 0);
  const alpha = Math.max(0.1, toNumber(els.clusterAlpha.value) || 3);
  const waferDiameter = toNumber(els.waferDiameter.value) || 300;
  const wafersPerMonth = Math.max(0, toNumber(els.wafersPerMonth.value) || 0);
  const model = els.yieldModel.value;
  const dieYield = calculateYield(dieArea, defectDensity, model, alpha);
  const waferDies = generateWaferDies({ dieWidth, dieHeight, waferDiameter });
  const gross = waferDies.length;
  const good = Math.round(gross * dieYield);

  els.yieldPercent.textContent = formatNumber(dieYield * 100, 1);
  els.grossDie.textContent = formatNumber(gross, 0);
  els.goodDie.textContent = formatNumber(good, 0);
  els.monthlyGoodDie.textContent = formatNumber(good * wafersPerMonth, 0);

  drawWaferCutMap({ dieWidth, dieHeight, dieArea, waferDiameter, waferDies, good });
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

function drawWaferCutMap({ dieWidth, dieHeight, dieArea, waferDiameter, waferDies, good }) {
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
  const badCount = Math.max(0, waferDies.length - good);
  const badSet = new Set(
    [...waferDies]
      .sort((a, b) => b.noise - a.noise)
      .slice(0, badCount)
      .map((cell) => `${cell.row}:${cell.col}`),
  );

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#070a09";
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();

  visualDies.forEach((cell) => {
    const rectX = cx + cell.x * scale;
    const rectY = cy + cell.y * scale;
    const rectW = Math.max(1.2, cell.width * scale);
    const rectH = Math.max(1.2, cell.height * scale);
    const bad = badSet.has(`${cell.row}:${cell.col}`);
    ctx.fillStyle = bad ? "rgba(255, 117, 104, 0.72)" : "rgba(70, 239, 180, 0.55)";
    ctx.fillRect(rectX + 0.7, rectY + 0.7, Math.max(0.8, rectW - 1.4), Math.max(0.8, rectH - 1.4));
    ctx.strokeStyle = "rgba(7, 10, 9, 0.75)";
    ctx.lineWidth = 0.7;
    ctx.strokeRect(rectX + 0.7, rectY + 0.7, Math.max(0.8, rectW - 1.4), Math.max(0.8, rectH - 1.4));
  });

  ctx.restore();

  ctx.strokeStyle = "rgba(255, 189, 84, 0.82)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(103, 235, 184, 0.28)";
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
    }),
  });
  drawLegend(ctx, width, height);
}

function drawWaferMapLabel(ctx, { width, title, stats }) {
  const inset = width < 520 ? 14 : 24;
  ctx.fillStyle = "#c5d6cd";
  ctx.font = "700 13px Segoe UI";
  ctx.textAlign = "left";
  ctx.fillText(title, inset, 26);
  ctx.fillStyle = "#95a8a0";
  ctx.font = "12px Segoe UI";
  drawWrappedText(ctx, stats, inset, 47, width - inset * 2, 15, width < 520 ? 2 : 1);
  if (width >= 520) {
    ctx.textAlign = "right";
    ctx.fillText("notch", width - inset, 47);
  }
}

function drawLegend(ctx, width, height) {
  const items = [
    ["#46efb4", t("yield.goodLegend")],
    ["#ff7568", t("yield.badLegend")],
    ["#ffbd54", t("yield.edgeLegend")],
  ];
  if (width < 520) {
    const x = 14;
    let y = height - 56;
    ctx.textAlign = "left";
    items.forEach(([color, label]) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 10, 10);
      ctx.fillStyle = "#c5d6cd";
      ctx.font = "12px Segoe UI";
      ctx.fillText(label, x + 15, y + 10);
      y += 17;
    });
    return;
  }
  let x = width - 318;
  const y = 24;
  ctx.textAlign = "left";
  items.forEach(([color, label]) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 10, 10);
    ctx.fillStyle = "#c5d6cd";
    ctx.font = "12px Segoe UI";
    ctx.fillText(label, x + 15, y + 10);
    x += Math.max(84, label.length * 8 + 28);
  });
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
    ctx.fillStyle = "#070a09";
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = "rgba(103, 235, 184, 0.35)";
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
      ctx.fillStyle = row === active ? "#ffbd54" : `rgba(70, 239, 180, ${0.34 + normalized * 0.5})`;
      ctx.beginPath();
      ctx.arc(x, y, size * pulse, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = "rgba(255, 189, 84, 0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, radius + Math.sin(time * 0.002) * 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = "rgba(237, 246, 240, 0.9)";
    ctx.font = "700 13px Segoe UI";
    ctx.fillText("LOGIC DENSITY ORBIT", 26, 34);
    ctx.fillStyle = "rgba(149, 168, 160, 0.9)";
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
  const targetWidth = clamp(availableWidth, 240, 1100);
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
