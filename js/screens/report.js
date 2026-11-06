// Efficiency Rating > Report & badge: trend chart, badge, export and trees.

Screens.report = {
  label: "Report & badge",
  render() {
    const d = window.DEMO;
    const b = d.badge;
    const max = Math.max(...d.trend.map((p) => p.value));

    const bars = d.trend
      .map(
        (p) => `
        <div class="bar-col">
          <span class="bar-value">${p.value.toFixed(1)}</span>
          <div class="bar ${p.after ? "bar-after" : "bar-before"}" style="height:${(p.value / max) * 100}%"></div>
          <span class="bar-label">${p.month}</span>
        </div>`
      )
      .join("");

    return `
      ${App.header("Efficiency Rating", "Report & badge")}
      <h2 class="display">You moved from ${b.from} to ${b.to}</h2>

      <div class="split">
        <section class="card">
          <h2 class="card-title">Carbon per resolved outcome (g CO₂e)</h2>
          <div class="chart" role="img" aria-label="Carbon per resolved outcome fell from ${d.trend[0].value} to ${d.trend[d.trend.length - 1].value} grams between ${d.trend[0].month} and ${d.trend[d.trend.length - 1].month}">
            ${bars}
          </div>
          <p class="muted">Grey: before fixes. Blue: after 3 fixes applied in December.
            Saved ${App.gbp(App.totalSavingGBP())}/yr and ${App.totalCo2t()} t CO₂e/yr.</p>
        </section>

        <section class="card">
          <h2 class="card-title">Your badge</h2>
          <div class="badge">
            <div class="badge-letter">${b.to}</div>
            <div>
              <strong>${App.esc(b.name)}</strong>
              <p class="small muted">${App.esc(b.detail)}</p>
              <a class="link" href="#share">Verify this rating</a>
            </div>
          </div>
          <p class="small muted">${App.esc(b.rules)}</p>
          <button class="btn btn-outline" data-action="download">Download badge</button>
        </section>
      </div>

      <div class="split split-even">
        <section class="card">
          <h2 class="card-title">Report it</h2>
          <p>Sends kWh, tCO₂e and method notes to Net Zero Cloud as Scope 3 (purchased services), ready for CSRD and SECR.</p>
          <button class="btn btn-primary" data-action="export">Export to Net Zero Cloud</button>
        </section>
        <section class="card">
          <h2 class="card-title">Trees funded in your name</h2>
          <div class="metric-value">${d.trees.toLocaleString("en-GB")}</div>
          <p class="muted">Via Salesforce's 1t.org commitment, for reaching rating ${b.to}. A nature contribution, not an offset.</p>
        </section>
      </div>`;
  },

  mount(root) {
    const on = (action, msg) =>
      root.querySelector(`[data-action="${action}"]`).addEventListener("click", () => App.toast(msg));
    on("download", "Prototype: downloads the badge as PNG and SVG.");
    on("export", "Prototype: figures sent to Net Zero Cloud as Scope 3, purchased services.");
  },
};
