const processData = [
  {
    name: "TSMC N3E",
    node: "3nm",
    density: 9.6,
    yield: 94.5,
    cost: 1.6,
    cycle: 15,
    throughput: 1.35,
  },
  {
    name: "Intel 18A",
    node: "1.8nm",
    density: 10.3,
    yield: 88.2,
    cost: 2.1,
    cycle: 19,
    throughput: 1.05,
  },
  {
    name: "Samsung 3GAE",
    node: "3nm",
    density: 9.2,
    yield: 92.8,
    cost: 1.9,
    cycle: 17,
    throughput: 1.12,
  },
  {
    name: "TSMC N4P",
    node: "5nm",
    density: 8.4,
    yield: 96.6,
    cost: 1.2,
    cycle: 12,
    throughput: 1.46,
  },
  {
    name: "台积电 N5",
    node: "5nm",
    density: 7.9,
    yield: 97.2,
    cost: 1.05,
    cycle: 11,
    throughput: 1.52,
  },
  {
    name: "格芯 G1",
    node: "12nm",
    density: 5.6,
    yield: 93.0,
    cost: 0.78,
    cycle: 18,
    throughput: 0.94,
  },
  {
    name: "华虹 12LP",
    node: "12nm",
    density: 5.9,
    yield: 91.3,
    cost: 0.82,
    cycle: 16,
    throughput: 1.01,
  },
  {
    name: "中芯 N+2",
    node: "14nm",
    density: 5.0,
    yield: 89.1,
    cost: 0.7,
    cycle: 10,
    throughput: 0.82,
  },
];

function normalize(values, key, invert = false) {
  const nums = values.map((item) => item[key]);
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const range = max - min || 1;
  return values.map((item) => {
    const ratio = (item[key] - min) / range;
    return invert ? 1 - ratio : ratio;
  });
}

function enrichRankingData(list) {
  const normDensity = normalize(list, "density", false);
  const normYield = normalize(list, "yield", false);
  const normCost = normalize(list, "cost", true);
  const normCycle = normalize(list, "cycle", true);
  const normThroughput = normalize(list, "throughput", false);

  return list.map((item, i) => ({
    ...item,
    densityRank: normDensity[i],
    yieldRank: normYield[i],
    costRank: normCost[i],
    cycleRank: normCycle[i],
    throughputRank: normThroughput[i],
    score:
      0.42 * normDensity[i] +
      0.28 * normYield[i] +
      0.15 * normCost[i] +
      0.15 * normThroughput[i] +
      0.10 * normCycle[i],
  }));
}

function formatNumber(value, digits = 2) {
  return Number(value).toFixed(digits);
}

function buildRanking() {
  const sortMetric = document.getElementById("sortMetric").value;
  const topN = Number(document.getElementById("topCount").value);
  const enriched = enrichRankingData(processData);
  const sorted = [...enriched].sort((a, b) => {
    if (sortMetric === "score") {
      return b.score - a.score;
    }
    if (sortMetric === "cost" || sortMetric === "cycle") {
      return a[sortMetric] - b[sortMetric];
    }
    return b[sortMetric] - a[sortMetric];
  });

  const rows = sorted.slice(0, topN);
  const body = document.getElementById("rankingBody");
  body.innerHTML = "";
  rows.forEach((item, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${item.name}</td>
      <td>${item.node}</td>
      <td>${formatNumber(item.density, 1)}</td>
      <td>${formatNumber(item.yield, 1)}%</td>
      <td>${formatNumber(item.cost, 2)}</td>
      <td>${item.cycle}天</td>
      <td>${formatNumber(item.score * 100, 1)}</td>
    `;
    body.appendChild(tr);
  });
}

function computeDensityMetrics(form) {
  const d = Number(form.waferDiameter.value);
  const dieL = Number(form.dieLength.value);
  const dieW = Number(form.dieWidth.value);
  const processYield = Number(form.yieldRate.value);
  const d0 = Number(form.defectDensity.value);
  const wafers = Number(form.waferPerMonth.value);

  const dieArea = Math.max(dieL * dieW, 0.01);
  const radius = d / 2;
  const edgeReserve = Math.min(radius - 1, 3);
  const usableRadius = Math.max(radius - edgeReserve, 0.1);
  const grossDies = Math.floor((Math.PI * usableRadius * usableRadius) / dieArea);
  const d0Penalty = Math.exp(-d0 * (dieArea / 100));
  const yieldDies = Math.floor(grossDies * processYield * d0Penalty);
  const monthlyGood = Math.round(yieldDies * wafers);

  return {
    dieArea,
    grossDies,
    yieldDies,
    monthlyGood,
  };
}

function computeYieldMetrics(form) {
  const dieArea = Number(form.yieldDieArea.value);
  const diesPerWafer = Number(form.yieldDiesPerWafer.value);
  const d0 = Number(form.yieldDefectDensity.value);
  const k = Number(form.clusteringK.value);
  const wafers = Number(form.yieldWaferPerMonth.value);
  const target = Number(form.targetYield.value) / 100;

  const areaCm2 = dieArea / 100;
  const lambda = Math.max(d0 * areaCm2, 0.00001);
  const poissonYield = Math.exp(-lambda);
  const murphyYield = Math.pow(1 + lambda / Math.max(k, 0.01), -k);
  const goodPoisson = Math.round(diesPerWafer * wafers * poissonYield);
  const goodMurphy = Math.round(diesPerWafer * wafers * murphyYield);
  const maxD0 = -Math.log(target) / areaCm2;

  return {
    poissonYield,
    murphyYield,
    goodPoisson,
    goodMurphy,
    maxD0,
  };
}

function setDensityResult(metrics) {
  const result = document.getElementById("densityResult");
  result.innerHTML = `
    <strong>密度估算结果</strong>
    <div class="metric"><span>单颗面积</span><span>${formatNumber(metrics.dieArea, 2)} mm²</span></div>
    <div class="metric"><span>理论每片晶圆晶粒</span><span>${metrics.grossDies.toLocaleString()}</span></div>
    <div class="metric"><span>按工艺与缺陷修正后每片可用</span><span>${metrics.yieldDies.toLocaleString()}</span></div>
    <div class="metric"><span>预计月可用晶粒</span><span>${metrics.monthlyGood.toLocaleString()}</span></div>
  `;
}

function setYieldResult(metrics) {
  const result = document.getElementById("yieldResult");
  result.innerHTML = `
    <strong>良率分析结果</strong>
    <div class="metric"><span>泊松模型良率</span><span>${formatNumber(metrics.poissonYield * 100)}%</span></div>
    <div class="metric"><span>Murphy模型(给定 k)</span><span>${formatNumber(metrics.murphyYield * 100)}%</span></div>
    <div class="metric"><span>泊松模型下月合格晶粒</span><span>${metrics.goodPoisson.toLocaleString()}</span></div>
    <div class="metric"><span>Murphy模型下月合格晶粒</span><span>${metrics.goodMurphy.toLocaleString()}</span></div>
    <div class="metric"><span>目标良率阈值对应 D0 上限</span><span>${formatNumber(metrics.maxD0)} defects/cm²</span></div>
  `;
}

function bindEvents() {
  const sortMetric = document.getElementById("sortMetric");
  const topCount = document.getElementById("topCount");
  sortMetric.addEventListener("change", buildRanking);
  topCount.addEventListener("change", buildRanking);

  document.getElementById("densityForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const metrics = computeDensityMetrics(event.target);
    setDensityResult(metrics);
  });

  document.getElementById("yieldForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const metrics = computeYieldMetrics(event.target);
    setYieldResult(metrics);
  });

  const densityDies = computeDensityMetrics(document.getElementById("densityForm"));
  setDensityResult(densityDies);
  const yieldForm = document.getElementById("yieldForm");
  const syncedDies = Number(densityDies.yieldDies);
  document.getElementById("yieldDiesPerWafer").value = Math.max(1, Math.round(Number(document.getElementById("yieldForm").yieldDiesPerWafer.value) || syncedDies));
}

buildRanking();
bindEvents();
