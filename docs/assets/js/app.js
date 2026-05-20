const DATA_URL = "assets/data/foundry_cgp_ch_density_sram_public_v0_3.csv";
const SDB_FACTOR = 1473684.2;
const DDB_FACTOR = 1240000;
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
    "common.downloadCsv": "Download CSV",
    "common.records": "{count} records",
    "common.rows": "{count} rows",
    "common.unlabeled": "Unlabeled",
    "common.noMatches": "No matching data",
    "common.dataLoadError": "Data could not be loaded. Check that the CSV asset exists.",
    "home.eyebrow": "PUBLIC FOUNDRY DATASET",
    "home.title": "Process Density and Library Analytics",
    "home.lead":
      "A static analysis console for public semiconductor process data, combining logic density, SRAM bitcell, CPP/CGP, cell height, and source confidence.",
    "home.viewRanking": "Open ranking",
    "home.snapshotEyebrow": "FOUNDRY SNAPSHOT",
    "home.snapshotTitle": "Public sample coverage",
    "home.viewReports": "View source reports",
    "home.foundryCard": "{count} records | best {density} MTr/mm2",
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
    "ranking.library": "Library class",
    "ranking.rows": "Rows",
    "ranking.allRows": "All rows",
    "ranking.allFoundries": "All foundries",
    "ranking.allLibraries": "All library classes",
    "ranking.tableTitle": "Dataset rows",
    "ranking.count": "{shown} shown / {total} available",
    "metric.logic": "Logic density MTr/mm2",
    "metric.logicCalc": "Calculated logic density MTr/mm2",
    "metric.sram": "Ideal SRAM density Mb/mm2",
    "metric.cpp": "CPP/CGP nm",
    "metric.height": "Cell height nm",
    "metricTitle.logic": "Logic density ranking",
    "metricTitle.logicCalc": "Calculated logic density ranking",
    "metricTitle.sram": "Ideal SRAM density ranking",
    "metricTitle.cpp": "Compact CPP/CGP ranking",
    "metricTitle.height": "Compact cell-height ranking",
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
    "density.formulaSdb": "SDB_FACTOR / (CPP x Height) x library scale",
    "density.formulaDdb": "DDB_FACTOR / (CPP x Height) x library scale",
    "density.nearest": "Nearest sample: {foundry} {node}",
    "density.nearestDetail": "{density} MTr/mm2, delta {diff} MTr/mm2",
    "density.waiting": "Waiting for valid parameters",
    "yield.eyebrow": "YIELD ANALYZER",
    "yield.title": "Model die yield and wafer output",
    "yield.lead":
      "Compare common yield models and inspect a wafer cut map that shows gross dies, good dies, and defect losses.",
    "yield.alpha": "Clustering alpha",
    "yield.wafersPerMonth": "Wafers per month",
    "yield.chartTitle": "Yield by die area",
    "yield.chartAxis": "Die area mm2",
    "yield.waferTitle": "Wafer cut map",
    "yield.goodLegend": "good die",
    "yield.badLegend": "defect loss",
    "yield.edgeLegend": "wafer edge",
    "yield.mapStats": "visual dies {gross} | good {good} | lost {bad}",
    "reports.eyebrow": "SOURCE REPORTS",
    "reports.title": "Reports and data exports",
    "reports.lead": "Download the workbook and normalized CSV used by the interactive pages.",
    "reports.xlsxDesc": "Workbook with foundry sheets, comparison views, source index, and dashboard.",
    "reports.csvDesc": "Normalized data source for the static site and downstream scripts.",
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
    "common.downloadCsv": "下载 CSV",
    "common.records": "{count} 条记录",
    "common.rows": "{count} 行",
    "common.unlabeled": "未标注",
    "common.noMatches": "没有匹配数据",
    "common.dataLoadError": "数据加载失败，请确认 CSV 资产存在。",
    "home.eyebrow": "PUBLIC FOUNDRY DATASET",
    "home.title": "工艺密度与库选型分析台",
    "home.lead": "面向公开工艺数据的静态分析网站，聚合逻辑密度、SRAM bitcell、CPP/CGP、cell height 与资料置信度。",
    "home.viewRanking": "查看排行",
    "home.snapshotEyebrow": "FOUNDRY SNAPSHOT",
    "home.snapshotTitle": "公开样本覆盖",
    "home.viewReports": "查看来源报告",
    "home.foundryCard": "{count} 条记录 | 最高 {density} MTr/mm2",
    "kpi.records": "记录",
    "kpi.foundries": "厂商",
    "kpi.bestLogic": "最高逻辑 MTr/mm2",
    "kpi.bestSram": "最高 SRAM Mb/mm2",
    "ranking.eyebrow": "PROCESS AND LIBRARY RANKING",
    "ranking.title": "密度排行",
    "ranking.lead": "默认展示所有有密度数据的行，并自动忽略缺失密度的样本。",
    "ranking.metric": "指标",
    "ranking.foundry": "厂商",
    "ranking.library": "库类型",
    "ranking.rows": "行数",
    "ranking.allRows": "全部显示",
    "ranking.allFoundries": "全部厂商",
    "ranking.allLibraries": "全部库类型",
    "ranking.tableTitle": "样本明细",
    "ranking.count": "显示 {shown} / 可用 {total}",
    "metric.logic": "逻辑密度 MTr/mm2",
    "metric.logicCalc": "计算逻辑密度 MTr/mm2",
    "metric.sram": "SRAM 理想密度 Mb/mm2",
    "metric.cpp": "CPP/CGP nm",
    "metric.height": "Cell height nm",
    "metricTitle.logic": "逻辑密度排行",
    "metricTitle.logicCalc": "计算逻辑密度排行",
    "metricTitle.sram": "SRAM 理想密度排行",
    "metricTitle.cpp": "CPP/CGP 紧凑排行",
    "metricTitle.height": "Cell height 紧凑排行",
    "density.eyebrow": "DENSITY CALCULATOR",
    "density.title": "估算逻辑与 SRAM 密度",
    "density.lead": "从公开样本开始，或直接输入 CPP/CGP 与 cell height，将估算密度与目标值对比。",
    "density.reference": "参考样本",
    "density.scale": "库缩放系数",
    "density.target": "目标逻辑密度",
    "density.estimatedLogic": "估算逻辑密度",
    "density.idealSram": "SRAM 理想密度",
    "density.targetGap": "目标差距",
    "density.formulaSdb": "SDB_FACTOR / (CPP x Height) x 库缩放系数",
    "density.formulaDdb": "DDB_FACTOR / (CPP x Height) x 库缩放系数",
    "density.nearest": "接近样本：{foundry} {node}",
    "density.nearestDetail": "{density} MTr/mm2，差值 {diff} MTr/mm2",
    "density.waiting": "等待有效参数",
    "yield.eyebrow": "YIELD ANALYZER",
    "yield.title": "良率与晶圆产出建模",
    "yield.lead": "对比常见良率模型，并通过晶圆切割示意图查看 gross die、good die 与 defect loss。",
    "yield.alpha": "聚集参数 alpha",
    "yield.wafersPerMonth": "月投片",
    "yield.chartTitle": "不同 die 面积良率",
    "yield.chartAxis": "Die area mm2",
    "yield.waferTitle": "晶圆切割示意图",
    "yield.goodLegend": "良品 die",
    "yield.badLegend": "缺陷损失",
    "yield.edgeLegend": "晶圆边界",
    "yield.mapStats": "示意 die {gross} | 良品 {good} | 损失 {bad}",
    "reports.eyebrow": "SOURCE REPORTS",
    "reports.title": "报告与数据导出",
    "reports.lead": "下载交互页面使用的 workbook 和规范化 CSV。",
    "reports.xlsxDesc": "包含厂商分表、对比视图、来源索引和 dashboard 的工作簿。",
    "reports.csvDesc": "静态站与下游脚本使用的规范化数据源。",
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
    "libraryFilter",
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
    "dieArea",
    "defectDensity",
    "yieldModel",
    "clusterAlpha",
    "waferDiameter",
    "wafersPerMonth",
    "yieldPercent",
    "grossDie",
    "goodDie",
    "monthlyGoodDie",
    "yieldCanvas",
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
    ["metricSelect", "foundryFilter", "libraryFilter", "rowLimit"].forEach((id) => {
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
    ["dieArea", "defectDensity", "yieldModel", "clusterAlpha", "waferDiameter", "wafersPerMonth"].forEach((id) => {
      els[id]?.addEventListener("input", renderYieldAnalyzer);
    });
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
  const libraryValue = els.libraryFilter?.value || ALL_VALUE;

  if (els.metricSelect) {
    els.metricSelect.innerHTML = ["logic", "logicCalc", "sram", "cpp", "height"]
      .map((value) => `<option value="${value}">${escapeHtml(t(`metric.${value}`))}</option>`)
      .join("");
    els.metricSelect.value = metricValue;
  }

  if (els.foundryFilter) {
    fillSelect(els.foundryFilter, [
      { value: ALL_VALUE, label: t("ranking.allFoundries") },
      ...unique(state.records.map((row) => row.foundry)).map((value) => ({ value, label: value })),
    ]);
    els.foundryFilter.value = optionExists(els.foundryFilter, foundryValue) ? foundryValue : ALL_VALUE;
  }

  if (els.libraryFilter) {
    fillSelect(els.libraryFilter, [
      { value: ALL_VALUE, label: t("ranking.allLibraries") },
      ...unique(state.records.map((row) => simplifyLibrary(row.libraryClass))).map((value) => ({ value, label: value })),
    ]);
    els.libraryFilter.value = optionExists(els.libraryFilter, libraryValue) ? libraryValue : ALL_VALUE;
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
      const width = clamp((bestValue / bestOverall) * 100, 4, 100);
      return `
        <article class="foundry-card">
          <strong>${escapeHtml(foundry)}</strong>
          <small>${escapeHtml(t("home.foundryCard", { count: rows.length, density: formatNumber(bestValue, 1) }))}</small>
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
  const libraryFilter = els.libraryFilter.value || ALL_VALUE;
  const rowLimit = els.rowLimit.value || "all";
  const config = metricConfig(metric);

  const filtered = state.records
    .filter((row) => foundryFilter === ALL_VALUE || row.foundry === foundryFilter)
    .filter((row) => libraryFilter === ALL_VALUE || simplifyLibrary(row.libraryClass) === libraryFilter)
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
      return `
        <article class="rank-row">
          <div class="rank-index">#${index + 1}</div>
          <div class="rank-main">
            <strong title="${escapeHtml(row.variant)}">${escapeHtml(row.variant)}</strong>
            <span>${escapeHtml(displayFoundry(row.foundry))} | ${escapeHtml(row.libraryClass)} | ${escapeHtml(row.confidence)}</span>
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
          <td>${escapeHtml(displayFoundry(row.foundry))}</td>
          <td>${escapeHtml(row.variant)}</td>
          <td>${escapeHtml(row.libraryClass)}</td>
          <td class="numeric">${formatMaybe(row.cpp, 0)}</td>
          <td class="numeric">${formatMaybe(row.height, 0)}</td>
          <td class="numeric">${formatMaybe(row.logic, 1)}</td>
          <td class="numeric">${formatMaybe(row.sram, 1)}</td>
          <td><span class="confidence">${escapeHtml(row.confidence)}</span></td>
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
  els.breakModel.value = isDdb(preset.breakModel) ? "ddb" : "sdb";
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
  const factor = els.breakModel.value === "ddb" ? DDB_FACTOR : SDB_FACTOR;
  const logicDensity = cpp > 0 && height > 0 ? (factor / (cpp * height)) * scale : NaN;
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

function renderYieldAnalyzer() {
  if (!els.yieldPercent) {
    return;
  }
  const dieArea = Math.max(1, toNumber(els.dieArea.value) || 1);
  const defectDensity = Math.max(0, toNumber(els.defectDensity.value) || 0);
  const alpha = Math.max(0.1, toNumber(els.clusterAlpha.value) || 3);
  const waferDiameter = toNumber(els.waferDiameter.value) || 300;
  const wafersPerMonth = Math.max(0, toNumber(els.wafersPerMonth.value) || 0);
  const model = els.yieldModel.value;
  const dieYield = calculateYield(dieArea, defectDensity, model, alpha);
  const gross = grossDiesPerWafer(dieArea, waferDiameter);
  const good = gross * dieYield;

  els.yieldPercent.textContent = formatNumber(dieYield * 100, 1);
  els.grossDie.textContent = formatNumber(gross, 0);
  els.goodDie.textContent = formatNumber(good, 0);
  els.monthlyGoodDie.textContent = formatNumber(good * wafersPerMonth, 0);

  drawYieldChart({ dieArea, defectDensity, model, alpha });
  drawWaferCutMap({ dieArea, dieYield, waferDiameter });
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

function grossDiesPerWafer(dieAreaMm2, waferDiameterMm) {
  const radius = waferDiameterMm / 2;
  const waferArea = Math.PI * radius * radius;
  const edgeLoss = Math.PI * waferDiameterMm / Math.sqrt(2 * dieAreaMm2);
  return Math.max(0, Math.floor(waferArea / dieAreaMm2 - edgeLoss));
}

function drawYieldChart({ dieArea, defectDensity, model, alpha }) {
  const canvas = els.yieldCanvas;
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const areas = [25, 50, 75, 100, 150, 200, 300, 450, 600];
  const yields = areas.map((area) => calculateYield(area, defectDensity, model, alpha));

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#070a09";
  ctx.fillRect(0, 0, width, height);

  const left = 48;
  const right = 18;
  const top = 34;
  const bottom = 38;
  const chartW = width - left - right;
  const chartH = height - top - bottom;

  ctx.fillStyle = "#c5d6cd";
  ctx.font = "700 13px Segoe UI";
  ctx.textAlign = "left";
  ctx.fillText(t("yield.chartTitle"), left, 20);
  ctx.textAlign = "right";
  ctx.fillStyle = "#95a8a0";
  ctx.font = "12px Segoe UI";
  ctx.fillText(t("yield.chartAxis"), width - right, 20);
  ctx.textAlign = "left";

  ctx.strokeStyle = "rgba(149, 168, 160, 0.25)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = top + (chartH * i) / 4;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(width - right, y);
    ctx.stroke();
    ctx.fillStyle = "#95a8a0";
    ctx.font = "12px Segoe UI";
    ctx.fillText(`${100 - i * 25}%`, 8, y + 4);
  }

  const step = chartW / areas.length;
  const barW = Math.max(18, step - 13);
  areas.forEach((area, index) => {
    const value = yields[index];
    const barH = value * chartH;
    const x = left + index * step + (step - barW) / 2;
    const y = top + chartH - barH;
    const gradient = ctx.createLinearGradient(0, y, 0, top + chartH);
    gradient.addColorStop(0, "#46efb4");
    gradient.addColorStop(0.72, "#ffbd54");
    gradient.addColorStop(1, "#f56b9d");
    ctx.fillStyle = gradient;
    roundRect(ctx, x, y, barW, barH, 5);
    ctx.fill();

    if (Math.abs(area - dieArea) < 1) {
      ctx.strokeStyle = "#edf6f0";
      ctx.lineWidth = 2;
      roundRect(ctx, x - 3, y - 3, barW + 6, barH + 6, 6);
      ctx.stroke();
    }

    ctx.fillStyle = "#95a8a0";
    ctx.font = "12px Segoe UI";
    ctx.textAlign = "center";
    ctx.fillText(area, x + barW / 2, height - 12);
  });

  ctx.textAlign = "left";
}

function drawWaferCutMap({ dieArea, dieYield, waferDiameter }) {
  const canvas = els.waferCutCanvas;
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const cx = width * 0.5;
  const cy = height * 0.54;
  const radius = Math.min(width, height) * 0.39;
  const dieSideMm = Math.sqrt(dieArea);
  const diePx = clamp((dieSideMm / waferDiameter) * radius * 2, 5, 48);
  const half = diePx / 2;
  const cells = [];

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#070a09";
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();

  const count = Math.ceil((radius * 2) / diePx);
  for (let row = -count; row <= count; row += 1) {
    for (let col = -count; col <= count; col += 1) {
      const x = cx + col * diePx;
      const y = cy + row * diePx;
      if (isFullDieInsideWafer(x, y, half, cx, cy, radius)) {
        const bad = deterministicNoise(row, col, Math.round(dieArea)) > dieYield;
        cells.push({ x: x - half, y: y - half, bad, row, col });
      }
    }
  }

  cells.forEach((cell) => {
    ctx.fillStyle = cell.bad ? "rgba(255, 117, 104, 0.72)" : "rgba(70, 239, 180, 0.55)";
    ctx.fillRect(cell.x + 0.7, cell.y + 0.7, diePx - 1.4, diePx - 1.4);
    ctx.strokeStyle = "rgba(7, 10, 9, 0.75)";
    ctx.lineWidth = 0.7;
    ctx.strokeRect(cell.x + 0.7, cell.y + 0.7, diePx - 1.4, diePx - 1.4);
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

  const badCount = cells.filter((cell) => cell.bad).length;
  const goodCount = cells.length - badCount;
  drawWaferMapLabel(ctx, {
    width,
    title: t("yield.waferTitle"),
    stats: t("yield.mapStats", {
      gross: formatNumber(cells.length, 0),
      good: formatNumber(goodCount, 0),
      bad: formatNumber(badCount, 0),
    }),
  });
  drawLegend(ctx, width);
}

function drawWaferMapLabel(ctx, { width, title, stats }) {
  ctx.fillStyle = "#c5d6cd";
  ctx.font = "700 13px Segoe UI";
  ctx.textAlign = "left";
  ctx.fillText(title, 24, 26);
  ctx.fillStyle = "#95a8a0";
  ctx.font = "12px Segoe UI";
  ctx.fillText(stats, 24, 47);
  ctx.textAlign = "right";
  ctx.fillText("notch", width - 24, 47);
}

function drawLegend(ctx, width) {
  const items = [
    ["#46efb4", t("yield.goodLegend")],
    ["#ff7568", t("yield.badLegend")],
    ["#ffbd54", t("yield.edgeLegend")],
  ];
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

function isFullDieInsideWafer(x, y, half, cx, cy, radius) {
  return [
    [x - half, y - half],
    [x + half, y - half],
    [x - half, y + half],
    [x + half, y + half],
  ].every(([px, py]) => Math.hypot(px - cx, py - cy) <= radius);
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
    logicCalc: {
      title: t("metricTitle.logicCalc"),
      unit: "MTr/mm2",
      decimals: 1,
      asc: false,
      value: (row) => row.logicCalc,
    },
    sram: {
      title: t("metricTitle.sram"),
      unit: "Mb/mm2",
      decimals: 1,
      asc: false,
      value: (row) => row.sram,
    },
    cpp: {
      title: t("metricTitle.cpp"),
      unit: "nm",
      decimals: 0,
      asc: true,
      value: (row) => row.cpp,
    },
    height: {
      title: t("metricTitle.height"),
      unit: "nm",
      decimals: 0,
      asc: true,
      value: (row) => row.height,
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
  const calc = toNumber(row.Logic_density_calc_MTr_per_mm2);
  const reported = toNumber(row.Logic_density_reported_MTr_per_mm2);
  return {
    foundry: row.Foundry || "",
    family: row.Process_family,
    process: row.Process_node,
    variant: row.Variant_node || row.Process_node || "Unknown",
    libraryOption: row.Library_option,
    libraryClass: row.Library_class || "Unlabeled",
    structure: row.Structure,
    cpp: toNumber(row.CPP_CGP_nm),
    height: toNumber(row.Cell_height_nm),
    breakModel: row.Diffusion_break_model,
    breakExtra: toNumber(row.Break_extra_CPP),
    logicCalc: calc,
    logicReported: reported,
    logic: Number.isFinite(reported) ? reported : calc,
    sramCell: toNumber(row.SRAM_bitcell_um2),
    sram: toNumber(row.SRAM_ideal_Mb_per_mm2) || toNumber(row.SRAM_reported_Mb_mm2),
    confidence: row.Confidence || "Unknown",
    notes: row.Notes,
    source: row.Density_source_URL || row.Geometry_source_URL || row.SRAM_source_URL,
  };
}

function simplifyLibrary(value) {
  const text = String(value || "").toLowerCase();
  if (text.includes("uhd")) return "UHD";
  if (text.includes("hdc")) return "HDC";
  if (text.includes("hd")) return "HD";
  if (text.includes("hp")) return "HP";
  if (text.includes("balanced")) return "Balanced";
  if (text.includes("ulp") || text.includes("ulv")) return "ULP/ULV";
  return value || t("common.unlabeled");
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
