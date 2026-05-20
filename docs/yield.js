(function () {
  const form = document.getElementById("yieldForm");
  const result = document.getElementById("yieldResult");
  const canvas = document.getElementById("yieldChart");
  const ctx = canvas.getContext("2d");

  function parseNumber(id) {
    const raw = Number(document.getElementById(id).value);
    return Number.isFinite(raw) ? raw : 0;
  }

  function poissonYield(density, areaCm2) {
    return Math.exp(-density * areaCm2);
  }

  function murphyYield(density, k, areaCm2) {
    return Math.pow(1 + (density * areaCm2) / Math.max(k, 0.01), -Math.max(k, 0.01));
  }

  function drawChart({ areaCm2, k, diesPerWafer, wafersPerMonth, defectDensity }) {
    const dMax = Math.max(0.01, defectDensity * 4);
    const steps = 70;
    const values = Array.from({ length: steps }, (_, idx) => {
      const d = (dMax * idx) / (steps - 1);
      return {
        defect: d,
        poisson: poissonYield(d, areaCm2),
        murphy: murphyYield(d, k, areaCm2),
      };
    });

    const paddings = { left: 52, right: 16, top: 24, bottom: 36 };
    const width = canvas.width - paddings.left - paddings.right;
    const height = canvas.height - paddings.top - paddings.bottom;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#050f2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(149,190,255,0.2)";
    ctx.lineWidth = 1;

    const toX = (d) => paddings.left + (d / dMax) * width;
    const toY = (y) => paddings.top + height * (1 - Math.max(0, Math.min(1, y)));

    for (let i = 0; i <= 4; i += 1) {
      const y = paddings.top + (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(paddings.left, y);
      ctx.lineTo(canvas.width - paddings.right, y);
      ctx.stroke();
    }

    for (let i = 0; i <= 5; i += 1) {
      const x = paddings.left + (width / 5) * i;
      ctx.beginPath();
      ctx.moveTo(x, paddings.top);
      ctx.lineTo(x, canvas.height - paddings.bottom);
      ctx.stroke();
    }

    function drawLine(points, strokeStyle) {
      ctx.beginPath();
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = 2;
      points.forEach((item, idx) => {
        const x = toX(item.defect);
        const y = toY(item.y);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    drawLine(
      values.map((item) => ({ defect: item.defect, y: item.poisson })),
      "#7ef6c1"
    );
    drawLine(
      values.map((item) => ({ defect: item.defect, y: item.murphy })),
      "#73a8ff"
    );

    const target = parseNumber("targetYield") / 100;
    const targetDefect = -Math.log(Math.max(0.0001, Math.min(0.9999, target))) / areaCm2;
    const targetX = toX(Math.min(targetDefect, dMax));
    ctx.strokeStyle = "#ffd166";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(targetX, paddings.top);
    ctx.lineTo(targetX, canvas.height - paddings.bottom);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#dbe7ff";
    ctx.font = "12px 'Segoe UI', 'PingFang SC', sans-serif";
    for (let i = 0; i <= 5; i += 1) {
      const y = paddings.top + (height / 5) * i;
      const label = `${Math.round((100 - (i * 20)))}%`;
      ctx.fillText(label, 10, y + 4);
    }
    for (let i = 0; i <= 4; i += 1) {
      const x = paddings.left + (width / 4) * i;
      const label = (dMax / 4 * i).toFixed(2);
      ctx.fillText(label, x - 10, canvas.height - 8);
    }

    return {
      targetDefect,
      poissAtInput: poissonYield(parseNumber("defectDensity"), areaCm2),
      murphyAtInput: murphyYield(parseNumber("defectDensity"), parseNumber("clusteringK"), areaCm2),
    };
  }

  function render(metrics, extra, areaCm2, k) {
    const poisson = metrics.poissAtInput;
    const murphy = metrics.murphyAtInput;
    const goodPoisson = Math.round(extra.diesPerWafer * extra.wafersPerMonth * poisson);
    const goodMurphy = Math.round(extra.diesPerWafer * extra.wafersPerMonth * murphy);

    result.innerHTML = `
      <strong data-i18n="yieldResultTitle">良率分析结果</strong>
      <div class="metric-row"><span data-i18n="yieldMetricPoisson">泊松模型良率</span><span>${(poisson * 100).toFixed(2)}%</span></div>
      <div class="metric-row"><span data-i18n="yieldMetricMurphy">Murphy 模型（k=${k.toFixed(1)}）良率</span><span>${(murphy * 100).toFixed(2)}%</span></div>
      <div class="metric-row"><span data-i18n="yieldMetricMonthlyPoisson">泊松月合格晶粒</span><span>${goodPoisson.toLocaleString()}</span></div>
      <div class="metric-row"><span data-i18n="yieldMetricMonthlyMurphy">Murphy 月合格晶粒</span><span>${goodMurphy.toLocaleString()}</span></div>
      <div class="metric-row"><span data-i18n="yieldMetricDefectLimit">达到目标良率所需 D0 上限</span><span>${metrics.targetDefect.toFixed(3)} defects/cm²</span></div>
    `;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const dieArea = parseNumber("dieArea");
    const diesPerWafer = parseNumber("diesPerWafer");
    const defectDensity = parseNumber("defectDensity");
    const k = parseNumber("clusteringK");
    const wafersPerMonth = parseNumber("yieldWaferPerMonth");

    const areaCm2 = dieArea / 100;
    const chartData = drawChart({ areaCm2, k, diesPerWafer, wafersPerMonth, defectDensity });
    render(chartData, { diesPerWafer, wafersPerMonth }, areaCm2, k);
  });

  if (window.__applyLocale) {
    window.__applyLocale(window.__getLocale ? window.__getLocale() : "zh");
  }

  const langSwitch = document.getElementById("langSwitch");
  if (langSwitch) {
    langSwitch.addEventListener("click", () => {
      const next = window.__getLocale ? (window.__getLocale() === "zh" ? "en" : "zh") : "en";
      if (window.__applyLocale) {
        window.__applyLocale(next);
      }
    });
  }
})();
