(async () => {
  const METRIC_INFO = {
    logicDensity: { label: "metricLogicDensity", better: "desc", unit: "metricUnitLogicDensity", decimals: 1 },
    sramDensity: { label: "metricSramDensity", better: "desc", unit: "metricUnitSramDensity", decimals: 2 },
    cppNm: { label: "metricCpp", better: "asc", unit: "metricUnitCpp", decimals: 0 },
    cellHeight: { label: "metricCellHeight", better: "asc", unit: "metricUnitCellHeight", decimals: 0 },
    confidence: { label: "metricConfidence", better: "desc", unit: "metricUnitConfidence", decimals: 1 },
  };

  const CSV_PATH = "reports/foundry_cgp_ch_density_sram_public_v0_3.csv";
  const state = {
    locale: getLocale(),
    rawRows: [],
    processRows: [],
    libraryRows: [],
    error: "",
  };

  function getLocale() {
    const saved = localStorage.getItem("insightsLocale");
    return saved === "en" || saved === "zh" ? saved : "zh";
  }

  function t(key) {
    return window.__I18N && window.__I18N[state.locale] && window.__I18N[state.locale][key]
      ? window.__I18N[state.locale][key]
      : key;
  }

  function asNumber(value) {
    if (value === undefined || value === null) return null;
    const n = Number(String(value).trim());
    return Number.isFinite(n) ? n : null;
  }

  function parseConfidence(text) {
    if (!text) return null;
    const normalizedRaw = String(text).trim();
    if (!normalizedRaw) return null;
    const normalized = normalizedRaw.toLowerCase();
    const numberMatch = normalizedRaw.match(/[-+]?\d*\.?\d+/);
    const numericText = numberMatch ? numberMatch[0] : "";
    const numeric = Number(numericText);
    if (Number.isFinite(numeric) && numericText.length > 0) {
      return Math.max(0, Math.min(5, numeric));
    }
    if (normalized.includes("very high") || normalized === "high") return 5;
    if (normalized.includes("high")) return 4.5;
    if (normalized.includes("medium-high")) return 4;
    if (normalized.includes("medium")) return 3;
    if (normalized.includes("very low")) return 1;
    if (normalized.includes("low")) return 2;
    if (normalized.includes("not found")) return 1;
    return null;
  }

  function parseCSV(text) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      const next = text[i + 1];
      if (char === '"') {
        if (inQuotes && next === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        row.push(field);
        field = "";
      } else if ((char === "\n" || char === "\r") && !inQuotes) {
        if (field.length > 0 || row.length > 0) {
          row.push(field);
          if (row.some((item) => item !== "")) rows.push(row);
          row = [];
          field = "";
        }
        if (char === "\r" && next === "\n") {
          i += 1;
        }
      } else {
        field += char;
      }
    }
    if (field.length > 0 || row.length > 0) {
      row.push(field);
      rows.push(row);
    }
    return rows.filter((r) => r.length > 1);
  }

  function csvToObjects(text) {
    const matrix = parseCSV(text);
    if (!matrix.length) return [];
    const headers = matrix[0].map((h) => String(h).replace(/^\uFEFF/, "").trim());
    return matrix.slice(1).map((r) => {
      const obj = {};
      headers.forEach((header, idx) => {
        obj[header] = (r[idx] !== undefined ? String(r[idx]).trim() : "");
      });
      return obj;
    });
  }

  function normalizeRecord(row) {
    return {
      foundry: row.Foundry || "",
      processNode: row.Process_node || "",
      variantNode: row.Variant_node || "",
      libraryOption: row.Library_option || "",
      libraryClass: row.Library_class || "",
      structure: row.Structure || "",
      logicDensity: asNumber(row.Logic_density_reported_MTr_per_mm2) ?? asNumber(row.Logic_density_calc_MTr_per_mm2),
      sramDensity: asNumber(row.SRAM_reported_Mb_mm2) ?? asNumber(row.SRAM_ideal_Mb_per_mm2),
      cppNm: asNumber(row.CPP_CGP_nm),
      cellHeight: asNumber(row.Cell_height_nm),
      confidence: parseConfidence(row.Confidence),
    };
  }

  function mean(values) {
    const valid = values.filter((v) => typeof v === "number" && Number.isFinite(v));
    if (!valid.length) return null;
    return valid.reduce((sum, v) => sum + v, 0) / valid.length;
  }

  function aggregate(rows, grouper) {
    const map = new Map();
    rows.forEach((row) => {
      const key = grouper(row);
      if (!key) return;
      const item = map.get(key) || {
        key,
        name: "",
        node: "",
        variant: "",
        logicDensity: [],
        sramDensity: [],
        cppNm: [],
        cellHeight: [],
        confidence: [],
      };
      item.name = item.name || row.name;
      if (row.node) item.node = row.node;
      if (row.variant) item.variant = row.variant || item.variant;
      item.logicDensity.push(row.logicDensity);
      item.sramDensity.push(row.sramDensity);
      item.cppNm.push(row.cppNm);
      item.cellHeight.push(row.cellHeight);
      item.confidence.push(row.confidence);
      map.set(key, item);
    });
    return Array.from(map.values()).map((group) => ({
      name: group.name,
      node: group.node,
      variant: group.variant,
      logicDensity: mean(group.logicDensity),
      sramDensity: mean(group.sramDensity),
      cppNm: mean(group.cppNm),
      cellHeight: mean(group.cellHeight),
      confidence: mean(group.confidence),
    }));
  }

  function hydrateDatasets(rawRows) {
    const normalized = rawRows.map(normalizeRecord).filter((r) => r.foundry || r.processNode || r.libraryOption);

    const processRows = aggregate(
      normalized.map((r) => ({
        name: `${r.foundry || "Unknown"} ${r.processNode || ""}`.trim(),
        node: r.processNode || "—",
        variant: r.variantNode || r.structure || "—",
        logicDensity: r.logicDensity,
        sramDensity: r.sramDensity,
        cppNm: r.cppNm,
        cellHeight: r.cellHeight,
        confidence: r.confidence,
      })),
      (r) => `${r.name}|${r.node}`
    );

    const libraryRows = aggregate(
      normalized
        .map((r) => ({
          name: r.libraryOption || "",
          node: r.processNode || "—",
          variant: r.libraryClass || r.structure || "—",
          logicDensity: r.logicDensity,
          sramDensity: r.sramDensity,
          cppNm: r.cppNm,
          cellHeight: r.cellHeight,
          confidence: r.confidence,
        }))
        .filter((r) => r.name),
      (r) => `${r.name}|${r.node}`
    );

    state.rawRows = normalized;
    state.processRows = processRows;
    state.libraryRows = libraryRows;
  }

  function formatValue(value, metricKey) {
    if (value === null || value === undefined || !Number.isFinite(value)) return "—";
    const decimals = METRIC_INFO[metricKey]?.decimals ?? 1;
    if (metricKey === "confidence") {
      return `${value.toFixed(decimals)} / 5`;
    }
    return Number(value).toFixed(decimals);
  }

  function getCurrentRows() {
    return document.getElementById("rankType").value === "library" ? state.libraryRows : state.processRows;
  }

  function refreshRankingHead() {
    const type = document.getElementById("rankType").value;
    const title = document.getElementById("rankingTitle");
    title.textContent = type === "library" ? t("rankingLibrary") : t("rankingProcess");
  }

  function sortRows(rows, metricKey, direction) {
    const metric = METRIC_INFO[metricKey] ? metricKey : "logicDensity";
    const dir = direction || "desc";
    const asc = dir === "asc";
    return rows.slice().sort((a, b) => {
      const av = a[metric];
      const bv = b[metric];
      const an = typeof av === "number" ? av : (asc ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY);
      const bn = typeof bv === "number" ? bv : (asc ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY);
      if (an !== bn) {
        return asc ? an - bn : bn - an;
      }
      return (a.name || "").localeCompare(b.name || "");
    });
  }

  function renderRanking() {
    const selectedMetric = document.getElementById("sortMetric").value;
    const topCount = Number(document.getElementById("topCount").value);
    const sortDirection = document.getElementById("sortDirection").value;
    const rows = getCurrentRows();

    if (!rows.length) {
      const body = document.getElementById("rankingBody");
      body.innerHTML = `<tr><td colspan="10" class="muted">${t("rankingEmpty")}</td></tr>`;
      return;
    }

    const sorted = sortRows(rows, selectedMetric, sortDirection).slice(0, topCount);
    const body = document.getElementById("rankingBody");
    body.innerHTML = sorted
      .map((row, index) => {
        const metricValue = formatValue(row[selectedMetric], selectedMetric);
        return `
          <tr>
            <td>${index + 1}</td>
            <td>${row.name}</td>
            <td>${row.node || "—"}</td>
            <td>${row.variant || "—"}</td>
            <td>${formatValue(row.logicDensity, "logicDensity")}</td>
            <td>${formatValue(row.sramDensity, "sramDensity")}</td>
            <td>${formatValue(row.cppNm, "cppNm")}</td>
            <td>${formatValue(row.cellHeight, "cellHeight")}</td>
            <td>${formatValue(row.confidence, "confidence")}</td>
            <td>${metricValue}</td>
          </tr>
        `;
      })
      .join("");
  }

  function bindEvents() {
    const rankType = document.getElementById("rankType");
    const sortMetric = document.getElementById("sortMetric");
    const sortDirection = document.getElementById("sortDirection");
    const topCount = document.getElementById("topCount");

    [rankType, sortMetric, sortDirection, topCount].forEach((el) => {
      el.addEventListener("change", () => {
        if (el.id === "sortMetric") {
          const defaultDirection = METRIC_INFO[el.value].better;
          sortDirection.value = defaultDirection;
        }
        refreshRankingHead();
        renderRanking();
      });
    });

    document.getElementById("langSwitch").addEventListener("click", () => {
      const next = state.locale === "zh" ? "en" : "zh";
      state.locale = next;
      localStorage.setItem("insightsLocale", next);
      if (window.__applyLocale) {
        window.__applyLocale(next);
      }
      refreshRankingHead();
      renderRanking();
    });
  }

  try {
    const response = await fetch(CSV_PATH, { cache: "no-store" });
    const text = await response.text();
    const rawRows = csvToObjects(text);
    if (!rawRows.length) {
      state.error = "empty-csv";
      throw new Error("empty csv");
    }
    hydrateDatasets(rawRows);
  } catch (error) {
    console.error("Load CSV failed:", error);
    state.error = error.message || "load-failed";
  }

  if (window.__applyLocale) {
    state.locale = window.__getLocale ? window.__getLocale() : state.locale;
    window.__applyLocale(state.locale);
  }

  if (state.error) {
    const body = document.getElementById("rankingBody");
    body.innerHTML = `<tr><td colspan="10" class="muted">${t("rankingError")}</td></tr>`;
  } else {
    refreshRankingHead();
    renderRanking();
  }

  bindEvents();
})();
