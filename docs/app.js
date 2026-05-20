const processData = [
  { name: "TSMC N3E", node: "3nm", density: 9.8, yield: 94.5, cost: 1.6, cycle: 15, libraryQuality: 8.7 },
  { name: "Intel 20A", node: "2nm", density: 10.2, yield: 89.1, cost: 2.3, cycle: 19, libraryQuality: 9.0 },
  { name: "Samsung 3GAE", node: "3nm", density: 9.1, yield: 93.4, cost: 2.0, cycle: 17, libraryQuality: 8.3 },
  { name: "TSMC N4P", node: "5nm", density: 8.5, yield: 97.0, cost: 1.2, cycle: 12, libraryQuality: 9.4 },
  { name: "SMIC 14LPP", node: "14nm", density: 6.2, yield: 95.1, cost: 0.8, cycle: 11, libraryQuality: 7.6 },
  { name: "UMC 12LP", node: "12nm", density: 5.9, yield: 91.3, cost: 0.85, cycle: 16, libraryQuality: 7.1 },
];

const libraryData = [
  { name: "Sky130 (Base)", node: "180-1nm", density: 5.2, yield: 97.8, cost: 0.4, cycle: 9, libraryQuality: 7.2 },
  { name: "TSMC N7 LP", node: "7nm", density: 6.5, yield: 96.5, cost: 1.1, cycle: 12, libraryQuality: 8.5 },
  { name: "TSMC N5 HP", node: "5nm", density: 8.0, yield: 95.0, cost: 1.25, cycle: 11, libraryQuality: 9.1 },
  { name: "GF 12LP", node: "12nm", density: 6.3, yield: 94.0, cost: 0.95, cycle: 13, libraryQuality: 8.0 },
  { name: "Samsung 6LP", node: "6nm", density: 6.8, yield: 93.8, cost: 1.3, cycle: 14, libraryQuality: 8.2 },
  { name: "Intel 110", node: "110nm", density: 4.6, yield: 98.4, cost: 0.6, cycle: 7, libraryQuality: 6.8 },
  { name: "SMIC 16FFC", node: "16nm", density: 5.5, yield: 93.2, cost: 0.9, cycle: 10, libraryQuality: 7.4 },
  { name: "NXP 28F", node: "28nm", density: 4.1, yield: 99.0, cost: 0.55, cycle: 8, libraryQuality: 6.5 },
];

const I18N = {
  zh: {
    "eyebrow": "Semiconductor Process Analytics",
    "lang.en": "English",
    "lang.zh": "中文",
    "heroTitle": "InsightsLake · 工艺分析平台",
    "heroDesc": "面向制造与工艺团队的静态分析门户，提供工艺与标准库排行、密度计算器和良率分析器，支持快速筛选和决策。",
    "heroStat1n": "6",
    "heroStat1": "个内建工艺样本",
    "heroStat2n": "8",
    "heroStat2": "条标准库样本",
    "heroStat3n": "0",
    "heroStat3": "后端依赖",
    "reportTitle": "已有分析报告",
    "reportKind1": "工艺密度报告",
    "report1Title": "Foundry Process Density Report v0.3",
    "report1Desc": "工艺节点密度分布与可制造性指标汇总。",
    "reportKind2": "SRAM 库密度明细",
    "report2Title": "SRAM Density Public v0.3",
    "report2Desc": "SRAM 相关工艺密度与工艺兼容性抽样。",
    "reportDownloadXlsx": "下载 XLSX",
    "reportDownloadCsv": "下载 CSV",
    "rankingProcess": "工艺排行",
    "rankingLibrary": "标准库排行",
    "rankType": "排行类型",
    "rankTypeProcess": "工艺排行",
    "rankTypeLibrary": "标准库排行",
    "rankMetric": "排序指标",
    "sortOrder": "排序方向",
    "orderDesc": "降序",
    "orderAsc": "升序",
    "rankTop": "显示前",
    "rankingHint": "按排序指标动态计算综合评分并渲染 TOPN。",
    "thRank": "排名",
    "thName": "工艺名称",
    "thNode": "节点",
    "thDensity": "密度(相对)",
    "thYield": "良率(%)",
    "thCost": "成本指数",
    "thCycle": "周期(天)",
    "thScore": "综合评分",
    "thLibrary": "库质量",
    "thLibName": "标准库",
    "thLibNode": "目标节点",
    "thLibQuality": "库质量",
    "metricScore": "综合评分",
    "metricDensity": "密度",
    "metricYield": "良率",
    "metricCost": "成本指数",
    "metricCycle": "制程周期",
    "metricLibraryQuality": "库质量",
    "densityTitle": "密度计算器",
    "densityDesc": "估算晶圆可切分晶粒、有效良率与月度产能。",
    "densityWafer": "晶圆直径（mm）",
    "densityDieL": "晶粒长（mm）",
    "densityDieW": "晶粒宽（mm）",
    "densityYieldRate": "工艺良率（0-1）",
    "densityDefectDensity": "缺陷密度 D0（defects/cm²）",
    "densityWaferPerMonth": "月晶圆片数（片）",
    "btnRunDensity": "开始计算",
    "yieldTitle": "良率分析器",
    "yieldDesc": "基于缺陷模型，快速预估每月可交付的合格晶粒量与风险。",
    "yieldDieArea": "晶粒面积（mm²）",
    "yieldDiesPerWafer": "每片理论晶粒数",
    "yieldDefectDensity": "缺陷密度（defects/cm²）",
    "yieldK": "集群因子 k（越高越乐观）",
    "yieldWaferPerMonth": "月晶圆片数（片）",
    "yieldTarget": "目标良率（%）",
    "btnRunYield": "开始分析",
    "yieldInitial": "待计算，输入参数后点击按钮。",
    "densityInitial": "待计算，输入参数后点击按钮。",
    "footer": "InsightsLake · Semiconductor Process Intelligence",
  },
  en: {
    "eyebrow": "Semiconductor Process Analytics",
    "lang.en": "English",
    "lang.zh": "中文",
    "heroTitle": "InsightsLake · Process Intelligence Hub",
    "heroDesc": "A static manufacturing analytics portal for process and library comparison with density and yield calculation tools.",
    "heroStat1n": "6",
    "heroStat1": "built-in process samples",
    "heroStat2n": "8",
    "heroStat2": "library profiles",
    "heroStat3n": "0",
    "heroStat3": "backend dependencies",
    "reportTitle": "Available Analysis Reports",
    "reportKind1": "Process Density Report",
    "report1Title": "Foundry Process Density Report v0.3",
    "report1Desc": "Aggregate process node density and manufacturability indicators.",
    "reportKind2": "SRAM Library Density Detail",
    "report2Title": "SRAM Density Public v0.3",
    "report2Desc": "SRAM process density and compatibility samples.",
    "reportDownloadXlsx": "Download XLSX",
    "reportDownloadCsv": "Download CSV",
    "rankingProcess": "Process Ranking",
    "rankingLibrary": "Library Ranking",
    "rankType": "Ranking type",
    "rankTypeProcess": "Process ranking",
    "rankTypeLibrary": "Library ranking",
    "rankMetric": "Sort metric",
    "sortOrder": "Sort order",
    "orderDesc": "Descending",
    "orderAsc": "Ascending",
    "rankTop": "Show top",
    "rankingHint": "Dynamic score is recalculated by the selected metric and ranking criteria.",
    "thRank": "Rank",
    "thName": "Process",
    "thNode": "Node",
    "thDensity": "Density",
    "thYield": "Yield (%)",
    "thCost": "Cost index",
    "thCycle": "Cycle (days)",
    "thScore": "Score",
    "thLibrary": "Library quality",
    "thLibName": "Library",
    "thLibNode": "Target node",
    "thLibQuality": "Library quality",
    "metricScore": "Score",
    "metricDensity": "Density",
    "metricYield": "Yield",
    "metricCost": "Cost",
    "metricCycle": "Cycle",
    "metricLibraryQuality": "Library quality",
    "densityTitle": "Density Calculator",
    "densityDesc": "Estimate wafer die count, effective yield, and monthly output.",
    "densityWafer": "Wafer diameter (mm)",
    "densityDieL": "Die length (mm)",
    "densityDieW": "Die width (mm)",
    "densityYieldRate": "Process yield (0-1)",
    "densityDefectDensity": "Defect density D0 (defects/cm²)",
    "densityWaferPerMonth": "Wafers per month",
    "btnRunDensity": "Run calculate",
    "yieldTitle": "Yield Analyzer",
    "yieldDesc": "Estimate monthly good die output using defect-driven yield models.",
    "yieldDieArea": "Die area (mm²)",
    "yieldDiesPerWafer": "Theoretical dies per wafer",
    "yieldDefectDensity": "Defect density (defects/cm²)",
    "yieldK": "Clustering factor k",
    "yieldWaferPerMonth": "Wafers per month",
    "yieldTarget": "Target yield (%)",
    "btnRunYield": "Run analysis",
    "yieldInitial": "Fill in values and click to run.",
    "densityInitial": "Fill in values and click to run.",
    "footer": "InsightsLake · Semiconductor Process Intelligence",
  },
};

const DEFAULT_LOCALE = "zh";
let currentLocale = localStorage.getItem("insightsLocale") || DEFAULT_LOCALE;

function t(key) {
  return (I18N[currentLocale] && I18N[currentLocale][key]) || I18N[DEFAULT_LOCALE][key] || key;
}

function applyLocale(locale) {
  currentLocale = locale;
  localStorage.setItem("insightsLocale", locale);
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (I18N[currentLocale][key] !== undefined) {
      el.textContent = I18N[currentLocale][key];
    }
  });

  const langBtn = document.getElementById("langSwitch");
  langBtn.textContent = locale === "zh" ? t("lang.en") : t("lang.zh");
  refreshRankingHead();
  refreshRankingTitle();
  buildRanking();

  const rankHint = document.getElementById("rankingHint");
  rankHint.textContent = t("rankingHint");
  document.getElementById("densityResult").innerText = t("densityInitial");
  document.getElementById("yieldResult").innerText = t("yieldInitial");
}

function normalize(values, key, invert = false) {
  const arr = values.map((item) => Number(item[key]) || 0);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min || 1;
  return values.map((item) => {
    const r = ((Number(item[key]) || 0) - min) / range;
    return invert ? 1 - r : r;
  });
}

function enrichForProcess(list) {
  const nDensity = normalize(list, "density");
  const nYield = normalize(list, "yield");
  const nCost = normalize(list, "cost", true);
  const nCycle = normalize(list, "cycle", true);
  const nLib = normalize(list, "libraryQuality");
  return list.map((item, idx) => {
    const score =
      0.4 * nDensity[idx] +
      0.24 * nYield[idx] +
      0.16 * nCost[idx] +
      0.13 * nCycle[idx] +
      0.07 * nLib[idx];
    return { ...item, _score: score, _source: "process" };
  });
}

function enrichForLibrary(list) {
  const nDensity = normalize(list, "density");
  const nYield = normalize(list, "yield");
  const nCost = normalize(list, "cost", true);
  const nCycle = normalize(list, "cycle", true);
  const nLib = normalize(list, "libraryQuality");
  return list.map((item, idx) => {
    const score =
      0.32 * nDensity[idx] +
      0.25 * nYield[idx] +
      0.20 * nCost[idx] +
      0.13 * nCycle[idx] +
      0.10 * nLib[idx];
    return { ...item, _score: score, _source: "library" };
  });
}

function formatNumber(value, digits = 2) {
  return Number(value).toFixed(digits);
}

function refreshRankingHead() {
  const head = document.getElementById("rankingHead");
  const type = document.getElementById("rankType").value;
  if (type === "library") {
    head.innerHTML = `
      <tr>
        <th>${t("thRank")}</th>
        <th>${t("thLibName")}</th>
        <th>${t("thLibNode")}</th>
        <th>${t("thDensity")}</th>
        <th>${t("thYield")}</th>
        <th>${t("thCost")}</th>
        <th>${t("thCycle")}</th>
        <th>${t("thScore")}</th>
        <th>${t("thLibQuality")}</th>
      </tr>
    `;
  } else {
    head.innerHTML = `
      <tr>
        <th>${t("thRank")}</th>
        <th>${t("thName")}</th>
        <th>${t("thNode")}</th>
        <th>${t("thDensity")}</th>
        <th>${t("thYield")}</th>
        <th>${t("thCost")}</th>
        <th>${t("thCycle")}</th>
        <th>${t("thScore")}</th>
        <th>${t("thLibrary")}</th>
      </tr>
    `;
  }
}

function refreshRankingTitle() {
  const type = document.getElementById("rankType").value;
  const rankingTitle = document.getElementById("rankingTitle");
  rankingTitle.textContent = type === "library" ? t("rankingLibrary") : t("rankingProcess");
}

function buildRanking() {
  const type = document.getElementById("rankType").value;
  const topN = Number(document.getElementById("topCount").value);
  const sortMetric = document.getElementById("sortMetric").value;
  const direction = document.getElementById("sortDirection").value;

  const dataset = type === "library" ? enrichForLibrary(libraryData) : enrichForProcess(processData);
  const valueOf = (item, metric) => {
    if (metric === "score") return item._score;
    if (!Object.prototype.hasOwnProperty.call(item, metric)) return item._score;
    return item[metric];
  };

  const sorted = [...dataset].sort((a, b) => {
    const av = valueOf(a, sortMetric);
    const bv = valueOf(b, sortMetric);
    const delta = direction === "asc" ? av - bv : bv - av;
    return delta || b._score - a._score;
  });

  const body = document.getElementById("rankingBody");
  body.innerHTML = "";
  sorted.slice(0, topN).forEach((item, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${item.name}</td>
      <td>${item.node}</td>
      <td>${formatNumber(item.density, 1)}</td>
      <td>${formatNumber(item.yield, 1)}%</td>
      <td>${formatNumber(item.cost, 2)}</td>
      <td>${formatNumber(item.cycle)}</td>
      <td>${formatNumber(item._score * 100, 1)}</td>
      <td>${formatNumber(item.libraryQuality, 1)}</td>
    `;
    body.appendChild(tr);
  });
}

function computeDensityMetrics(form) {
  const waferDiameter = Number(form.waferDiameter.value);
  const dieLength = Number(form.dieLength.value);
  const dieWidth = Number(form.dieWidth.value);
  const processYield = Number(form.yieldRate.value);
  const defectDensity = Number(form.defectDensity.value);
  const wafersPerMonth = Number(form.waferPerMonth.value);

  const dieArea = Math.max(dieLength * dieWidth, 0.01);
  const radius = waferDiameter / 2;
  const edgeKeepout = Math.min(4, radius * 0.18);
  const usableRadius = Math.max(radius - edgeKeepout, 0.8);
  const gross = Math.floor((Math.PI * usableRadius * usableRadius) / dieArea);
  const defectFactor = Math.exp(-defectDensity * dieArea / 100);
  const yieldDies = Math.max(0, Math.round(gross * processYield * defectFactor));
  const monthly = Math.max(0, Math.round(yieldDies * wafersPerMonth));
  return { dieArea, gross, yieldDies, monthly };
}

function computeYieldMetrics(form) {
  const dieArea = Number(form.yieldDieArea.value);
  const diesPerWafer = Number(form.yieldDiesPerWafer.value);
  const defectDensity = Number(form.yieldDefectDensity.value);
  const k = Math.max(0.1, Number(form.clusteringK.value));
  const wafers = Number(form.yieldWaferPerMonth.value);
  const target = Math.max(1, Number(form.targetYield.value)) / 100;

  const areaCm2 = dieArea / 100;
  const lambda = Math.max(defectDensity * areaCm2, 0.00001);
  const poisson = Math.exp(-lambda);
  const murphy = Math.pow(1 + lambda / k, -k);
  const goodPoisson = Math.round(diesPerWafer * wafers * poisson);
  const goodMurphy = Math.round(diesPerWafer * wafers * murphy);
  const maxDefectForTarget = -Math.log(target) / areaCm2;

  return { poisson, murphy, goodPoisson, goodMurphy, maxDefectForTarget };
}

function makeMetricRow(label, value) {
  return `<div class="metric-row"><span>${label}</span><span>${value}</span></div>`;
}

function renderDensityResult(metrics) {
  const result = document.getElementById("densityResult");
  result.innerHTML = `
    <strong>${currentLocale === "zh" ? "密度估算结果" : "Density estimation result"}</strong>
    ${makeMetricRow(t("densityDieL"), `${formatNumber(metrics.dieArea, 2)} mm²`)}
    ${makeMetricRow(currentLocale === "zh" ? "每片理论晶粒" : "Gross dies / wafer", metrics.gross.toLocaleString())}
    ${makeMetricRow(currentLocale === "zh" ? "缺陷修正可用晶粒" : "Usable dies / wafer", metrics.yieldDies.toLocaleString())}
    ${makeMetricRow(currentLocale === "zh" ? "预计月可交付晶粒" : "Expected monthly good dies", metrics.monthly.toLocaleString())}
  `;
}

function renderYieldResult(metrics) {
  const result = document.getElementById("yieldResult");
  result.innerHTML = `
    <strong>${currentLocale === "zh" ? "良率分析结果" : "Yield analysis result"}</strong>
    ${makeMetricRow(currentLocale === "zh" ? "泊松模型良率" : "Poisson yield", `${formatNumber(metrics.poisson * 100)}%`)}
    ${makeMetricRow(currentLocale === "zh" ? "Murphy模型（k）良率" : "Murphy yield (k)", `${formatNumber(metrics.murphy * 100)}%`)}
    ${makeMetricRow(currentLocale === "zh" ? "泊松模型月合格晶粒" : "Good dies/mo (Poisson)", metrics.goodPoisson.toLocaleString())}
    ${makeMetricRow(currentLocale === "zh" ? "Murphy模型月合格晶粒" : "Good dies/mo (Murphy)", metrics.goodMurphy.toLocaleString())}
    ${makeMetricRow(currentLocale === "zh" ? "达到目标良率需 D0 上限" : "Max D0 for target yield", `${formatNumber(metrics.maxDefectForTarget)} defects/cm²`)}
  `;
}

function bindEvents() {
  const rankType = document.getElementById("rankType");
  const sortMetric = document.getElementById("sortMetric");
  const sortDirection = document.getElementById("sortDirection");
  const topCount = document.getElementById("topCount");

  [rankType, sortMetric, sortDirection, topCount].forEach((control) => {
    control.addEventListener("change", () => {
      refreshRankingHead();
      refreshRankingTitle();
      buildRanking();
    });
  });

  document.getElementById("langSwitch").addEventListener("click", () => {
    applyLocale(currentLocale === "zh" ? "en" : "zh");
  });

  document.getElementById("densityForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const metrics = computeDensityMetrics(event.target);
    renderDensityResult(metrics);
    const yieldDies = document.getElementById("yieldDiesPerWafer");
    yieldDies.value = String(Math.max(1, metrics.yieldDies));
  });

  document.getElementById("yieldForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const metrics = computeYieldMetrics(event.target);
    renderYieldResult(metrics);
  });

  if (!I18N[currentLocale]) {
    currentLocale = DEFAULT_LOCALE;
  }
  applyLocale(currentLocale);
}

buildRanking();
bindEvents();
