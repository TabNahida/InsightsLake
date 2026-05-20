(function () {
  const densityForm = document.getElementById("densityForm");
  const result = document.getElementById("densityResult");

  const formData = {
    diameter: 0,
    dieLength: 0,
    dieWidth: 0,
    edgeAllowance: 0,
    waferPerMonth: 0,
  };

  function parseValue(id) {
    const value = Number(document.getElementById(id).value);
    return Number.isFinite(value) ? value : 0;
  }

  function format(value) {
    return Number(value).toFixed(2);
  }

  function estimate(input) {
    const dieArea = Math.max(input.dieLength * input.dieWidth, 0.0001);
    const radius = Math.max(input.diameter / 2, 0.1);
    const usableRadius = Math.max(radius - Math.max(input.edgeAllowance, 0), 0.1);
    const waferArea = Math.PI * usableRadius * usableRadius;
    const grossDies = Math.floor(waferArea / dieArea);
    const monthly = Math.round(grossDies * input.waferPerMonth);
    const utilization = Math.min((grossDies * dieArea) / (Math.PI * radius * radius), 1);
    const density = grossDies / (Math.PI * radius * radius);
    return { dieArea, grossDies, monthly, utilization, density };
  }

  function t(key, fallback) {
    return window.__translate ? window.__translate(key) : fallback;
  }

  function render(metrics) {
    result.innerHTML = `
      <strong>${t("densityResultTitle", "密度估算结果")}</strong>
      <div class="metric-row"><span>${t("metricDieArea", "单晶粒面积")}</span><span>${format(metrics.dieArea)} mm²</span></div>
      <div class="metric-row"><span>${t("metricGrossDies", "每片晶圆晶粒数（理论）")}</span><span>${metrics.grossDies.toLocaleString()}</span></div>
      <div class="metric-row"><span>${t("metricUtilization", "晶圆几何利用率")}</span><span>${format(metrics.utilization * 100)}%</span></div>
      <div class="metric-row"><span>${t("metricMonthlyDies", "月晶粒产能（几何）")}</span><span>${metrics.monthly.toLocaleString()}</span></div>
      <div class="metric-row"><span>${t("metricWaferDensity", "单位晶圆晶粒密度")}</span><span>${format(metrics.density * 1e6)} /m²</span></div>
    `;
  }

  densityForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formData.diameter = parseValue("waferDiameter");
    formData.dieLength = parseValue("dieLength");
    formData.dieWidth = parseValue("dieWidth");
    formData.edgeAllowance = parseValue("edgeAllowance");
    formData.waferPerMonth = parseValue("waferPerMonth");

    const metrics = estimate(formData);
    render(metrics);
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
