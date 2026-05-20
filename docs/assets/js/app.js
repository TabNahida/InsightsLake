const DATA_URL = "assets/data/foundry_cgp_ch_density_sram_public_v0_3.csv";
const SDB_FACTOR = 1473684.2;
const DDB_FACTOR = 1240000;

const state = {
  records: [],
  rankRecords: [],
  animationIndex: 0,
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
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
    "topLimit",
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
    "waferCanvas",
    "waferNode",
    "waferDensity",
  ].forEach((id) => {
    els[id] = document.getElementById(id);
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
    const csv = await response.text();
    hydrateData(csv);
  } catch (error) {
    if (window.PROCESS_CSV) {
      hydrateData(window.PROCESS_CSV);
    } else {
      const message = "数据加载失败。请确认 CSV 资产存在。";
      els.rankingList.innerHTML = `<div class="empty-state">${message}</div>`;
      els.dataTable.innerHTML = `<tr><td colspan="8">${message}</td></tr>`;
      console.error(error);
    }
  }
}

function hydrateData(csv) {
  state.records = parseCsv(csv).map(normalizeRecord).filter((row) => row.foundry || row.process);
  initControls();
  renderAll();
  startWaferAnimation();
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
    foundry: row.Foundry || "未标注",
    family: row.Process_family,
    process: row.Process_node,
    variant: row.Variant_node || row.Process_node,
    libraryOption: row.Library_option,
    libraryClass: row.Library_class || "未标注",
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

function initControls() {
  fillSelect(els.foundryFilter, ["全部厂商", ...unique(state.records.map((row) => row.foundry))]);
  fillSelect(els.libraryFilter, ["全部库类型", ...unique(state.records.map((row) => simplifyLibrary(row.libraryClass)))]);

  const presets = state.records
    .filter((row) => Number.isFinite(row.cpp) && Number.isFinite(row.height))
    .sort((a, b) => (b.logic || 0) - (a.logic || 0));

  els.presetSelect.innerHTML = presets
    .map((row, index) => `<option value="${index}">${escapeHtml(row.foundry)} | ${escapeHtml(row.variant)}</option>`)
    .join("");
  els.presetSelect.dataset.presets = JSON.stringify(
    presets.map((row) => ({
      cpp: row.cpp,
      height: row.height,
      model: isDdb(row.breakModel) ? "ddb" : "sdb",
      sramCell: row.sramCell,
      label: `${row.foundry} ${row.variant}`,
    })),
  );

  ["metricSelect", "foundryFilter", "libraryFilter", "topLimit"].forEach((id) => {
    els[id].addEventListener("input", renderRankingArea);
  });

  [
    "presetSelect",
    "cppInput",
    "heightInput",
    "breakModel",
    "libraryScale",
    "sramCellInput",
    "targetDensity",
  ].forEach((id) => {
    els[id].addEventListener("input", () => {
      if (id === "presetSelect") {
        applyDensityPreset();
      }
      renderDensityCalculator();
    });
  });

  ["dieArea", "defectDensity", "yieldModel", "clusterAlpha", "waferDiameter", "wafersPerMonth"].forEach((id) => {
    els[id].addEventListener("input", renderYieldAnalyzer);
  });

  applyDensityPreset();
}

function renderAll() {
  renderKpis();
  renderFoundryGrid();
  renderRankingArea();
  renderDensityCalculator();
  renderYieldAnalyzer();
}

function renderKpis() {
  const foundries = unique(state.records.map((row) => row.foundry));
  const bestLogic = maxBy(state.records, (row) => row.logic);
  const bestSram = maxBy(state.records, (row) => row.sram);

  els.kpiRecords.textContent = formatNumber(state.records.length, 0);
  els.kpiFoundries.textContent = formatNumber(foundries.length, 0);
  els.kpiBestLogic.textContent = bestLogic ? formatNumber(bestLogic.logic, 1) : "--";
  els.kpiBestSram.textContent = bestSram ? formatNumber(bestSram.sram, 1) : "--";
}

function renderFoundryGrid() {
  const groups = groupBy(state.records, (row) => row.foundry);
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
          <small>${rows.length} records | best ${formatNumber(bestValue, 1)} MTr/mm2</small>
          <div class="mini-meter"><span style="width:${width}%"></span></div>
        </article>
      `;
    })
    .join("");
}

function renderRankingArea() {
  const metric = els.metricSelect.value;
  const foundryFilter = els.foundryFilter.value;
  const libraryFilter = els.libraryFilter.value;
  const limit = clamp(toNumber(els.topLimit.value) || 12, 5, 30);
  const config = metricConfig(metric);

  const filtered = state.records
    .filter((row) => foundryFilter === "全部厂商" || row.foundry === foundryFilter)
    .filter((row) => libraryFilter === "全部库类型" || simplifyLibrary(row.libraryClass) === libraryFilter)
    .filter((row) => Number.isFinite(config.value(row)));

  const ranked = filtered.sort((a, b) => {
    const diff = config.value(a) - config.value(b);
    return config.asc ? diff : -diff;
  });

  state.rankRecords = ranked.slice(0, limit);
  els.rankingTitle.textContent = config.title;
  els.rankingCount.textContent = `${ranked.length} records`;
  els.tableCount.textContent = `${filtered.length} records`;

  renderRankingList(state.rankRecords, config);
  renderDataTable(ranked.slice(0, 80));
}

function renderRankingList(rows, config) {
  if (!rows.length) {
    els.rankingList.innerHTML = `<div class="empty-state">没有匹配数据</div>`;
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
            <span>${escapeHtml(row.foundry)} | ${escapeHtml(row.libraryClass)} | ${escapeHtml(row.confidence)}</span>
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
  if (!rows.length) {
    els.dataTable.innerHTML = `<tr><td colspan="8">没有匹配数据</td></tr>`;
    return;
  }

  els.dataTable.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row.foundry)}</td>
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
  const presets = JSON.parse(els.presetSelect.dataset.presets || "[]");
  const preset = presets[toNumber(els.presetSelect.value) || 0];
  if (!preset) {
    return;
  }
  els.cppInput.value = preset.cpp || els.cppInput.value;
  els.heightInput.value = preset.height || els.heightInput.value;
  els.breakModel.value = preset.model;
  if (Number.isFinite(preset.sramCell)) {
    els.sramCellInput.value = preset.sramCell;
  }
}

function renderDensityCalculator() {
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
  els.formulaLabel.textContent =
    els.breakModel.value === "ddb"
      ? "DDB_FACTOR / (CPP x Height) x library scale"
      : "SDB_FACTOR / (CPP x Height) x library scale";

  const needle = Number.isFinite(logicDensity) ? clamp((logicDensity / 240) * 100, 0, 100) : 0;
  els.densityNeedle.style.width = `${needle}%`;

  const nearest = nearestBy(
    state.records.filter((row) => Number.isFinite(row.logic)),
    (row) => Math.abs(row.logic - logicDensity),
  );
  if (nearest && Number.isFinite(logicDensity)) {
    const diff = nearest.logic - logicDensity;
    els.nearestMatch.innerHTML = `
      <strong>接近样本：${escapeHtml(nearest.foundry)} ${escapeHtml(nearest.variant)}</strong>
      <span>${formatNumber(nearest.logic, 1)} MTr/mm2，差值 ${diff >= 0 ? "+" : ""}${formatNumber(diff, 1)} MTr/mm2</span>
    `;
  } else {
    els.nearestMatch.innerHTML = `<span>等待有效参数</span>`;
  }
}

function renderYieldAnalyzer() {
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
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const areas = [25, 50, 75, 100, 150, 200, 300, 450, 600];
  const yields = areas.map((area) => calculateYield(area, defectDensity, model, alpha));

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#070a09";
  ctx.fillRect(0, 0, width, height);

  const left = 46;
  const right = 18;
  const top = 20;
  const bottom = 36;
  const chartW = width - left - right;
  const chartH = height - top - bottom;

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
    ctx.fillText(`${100 - i * 25}%`, 6, y + 4);
  }

  const barGap = 12;
  const barW = chartW / areas.length - barGap;
  areas.forEach((area, index) => {
    const value = yields[index];
    const barH = value * chartH;
    const x = left + index * (barW + barGap + chartW * 0.004);
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
  ctx.fillStyle = "#c5d6cd";
  ctx.font = "12px Segoe UI";
  ctx.fillText("Die area mm2", left, height - 12);
}

function startWaferAnimation() {
  const rows = state.records
    .filter((row) => Number.isFinite(row.logic))
    .sort((a, b) => b.logic - a.logic)
    .slice(0, 24);

  if (!rows.length) {
    return;
  }

  const canvas = els.waferCanvas;
  const ctx = canvas.getContext("2d");

  function draw(time) {
    const width = canvas.width;
    const height = canvas.height;
    const cx = width * 0.52;
    const cy = height * 0.49;
    const radius = Math.min(width, height) * 0.37;
    const active = rows[Math.floor(time / 1800) % rows.length];

    els.waferNode.textContent = `${active.foundry} ${active.variant}`;
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
      title: "逻辑密度排行",
      unit: "MTr/mm2",
      decimals: 1,
      asc: false,
      value: (row) => row.logic,
    },
    logicCalc: {
      title: "计算逻辑密度排行",
      unit: "MTr/mm2",
      decimals: 1,
      asc: false,
      value: (row) => row.logicCalc,
    },
    sram: {
      title: "SRAM 理想密度排行",
      unit: "Mb/mm2",
      decimals: 1,
      asc: false,
      value: (row) => row.sram,
    },
    cpp: {
      title: "CPP/CGP 紧凑排行",
      unit: "nm",
      decimals: 0,
      asc: true,
      value: (row) => row.cpp,
    },
    height: {
      title: "Cell height 紧凑排行",
      unit: "nm",
      decimals: 0,
      asc: true,
      value: (row) => row.height,
    },
  };
  return configs[metric] || configs.logic;
}

function simplifyLibrary(value) {
  const text = String(value || "").toLowerCase();
  if (text.includes("uhd")) return "UHD";
  if (text.includes("hdc")) return "HDC";
  if (text.includes("hd")) return "HD";
  if (text.includes("hp")) return "HP";
  if (text.includes("balanced")) return "Balanced";
  if (text.includes("ulp") || text.includes("ulv")) return "ULP/ULV";
  return value || "未标注";
}

function isDdb(value) {
  return String(value || "").toLowerCase().includes("ddb");
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") {
    return NaN;
  }
  const number = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(number) ? number : NaN;
}

function formatNumber(value, decimals = 0) {
  return Number(value).toLocaleString("en-US", {
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

function fillSelect(select, values) {
  select.innerHTML = values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
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
