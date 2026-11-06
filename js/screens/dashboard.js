// Setup > Efficiency Rating: the main dashboard with top fixes and the Efficiency Agent.

Screens.dashboard = {
  label: "Dashboard",
  render() {
    const d = window.DEMO;
    const m = d.metrics;

    const ratingCells = d.rating.scale
      .map((r) => `<span class="rating-cell ${r === d.rating.current ? "is-current" : ""}">${r}</span>`)
      .join("");

    const fixes = d.fixes
      .map((f, i) => {
        const applied = App.state.appliedFixes.has(f.id);
        const meta = [f.area, f.note].filter(Boolean).join(" · ");
        const button = applied
          ? `<span class="pill-done">Applied in sandbox</span>`
          : `<button class="btn ${i === 0 ? "btn-primary" : "btn-outline"}" data-fix="${f.id}">Review fix</button>`;
        return `
          <li class="fix">
            <div class="fix-text">
              <strong>${App.esc(f.title)}</strong>
              <span class="muted">${App.esc(meta)}</span>
            </div>
            <div class="fix-impact">${App.gbp(f.savingGBP)}/yr · ${f.co2t} t CO₂e</div>
            <div class="fix-action">${button}</div>
          </li>`;
      })
      .join("");

    return `
      ${App.header("Setup", "Efficiency Rating")}

      <div class="banner" role="status">
        Your org is rated <strong>${d.rating.current}</strong>. Fixes worth about
        <strong>${App.gbp(App.totalSavingGBP())}/yr</strong> are waiting.
      </div>

      <div class="title-row">
        <div>
          <h2 class="display-sm">${d.org.month}</h2>
          <p class="muted">Compared with ${d.org.peerGroup}</p>
        </div>
        <div class="title-actions">
          <button class="btn btn-outline" data-action="export-csrd">Export for CSRD</button>
          <button class="link-btn" data-action="how-sci">How we calculate (SCI)</button>
        </div>
      </div>

      <div class="metric-grid">
        <div class="card metric">
          <div class="metric-label">Overall rating</div>
          <div class="rating-row">${ratingCells}</div>
          <div class="muted small">${d.rating.fixesToNext} fixes away from ${d.rating.next}</div>
        </div>
        <div class="card metric">
          <div class="metric-label">Carbon per resolved outcome</div>
          <div class="metric-value">${m.carbonPerOutcome} g <span class="unit">CO₂e</span></div>
          <div class="muted small">Peer median ${m.peerCarbonPerOutcome} g</div>
        </div>
        <div class="card metric">
          <div class="metric-label">Cost per resolved outcome</div>
          <div class="metric-value">£${m.costPerOutcome.toFixed(2)}</div>
          <div class="muted small">Peer median £${m.peerCostPerOutcome.toFixed(2)}</div>
        </div>
        <div class="card metric">
          <div class="metric-label">Stale data</div>
          <div class="metric-value">${m.staleDataPct}%</div>
          <div class="muted small">Not used in 2+ years</div>
        </div>
      </div>

      <div class="split">
        <section class="card">
          <h2 class="card-title">Top fixes</h2>
          <ul class="fix-list">${fixes}</ul>
        </section>

        <section class="card" aria-label="Ask Efficiency Agent">
          <h2 class="card-title">Ask Efficiency Agent</h2>
          <div class="chat" id="chat-log">
            <div class="bubble bubble-user">Why did our score drop in October?</div>
            <div class="bubble bubble-agent">${App.esc(d.agentAnswers[0].answer)}</div>
          </div>
          <form id="chat-form" class="chat-form">
            <label for="chat-input" class="field-label">Your question</label>
            <input id="chat-input" type="text" placeholder="Ask about your rating…" autocomplete="off" />
          </form>
        </section>
      </div>`;
  },

  mount(root) {
    root.querySelectorAll("[data-fix]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const fix = window.DEMO.fixes.find((f) => f.id === btn.dataset.fix);
        if (fix.screen) {
          location.hash = fix.screen;
        } else {
          App.state.appliedFixes.add(fix.id);
          App.toast(`Applied in sandbox: ${fix.title}`);
          App.rerender();
        }
      });
    });

    root.querySelector('[data-action="export-csrd"]').addEventListener("click", () =>
      App.toast("Prototype: exports kWh, tCO₂e and method notes as Scope 3 (purchased services).")
    );
    root.querySelector('[data-action="how-sci"]').addEventListener("click", () =>
      App.toast("SCI: carbon per functional unit. Here, gCO₂e per successful outcome.")
    );

    const form = root.querySelector("#chat-form");
    const input = root.querySelector("#chat-input");
    const log = root.querySelector("#chat-log");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const question = input.value.trim();
      if (!question) return;
      const words = question.toLowerCase().split(/\W+/);
      const match = window.DEMO.agentAnswers.find((a) => a.keywords.some((k) => words.includes(k)));
      const answer = match ? match.answer : window.DEMO.defaultAnswer;
      log.insertAdjacentHTML(
        "beforeend",
        `<div class="bubble bubble-user">${App.esc(question)}</div><div class="bubble bubble-agent">${App.esc(answer)}</div>`
      );
      input.value = "";
      log.scrollTop = log.scrollHeight;
    });
  },
};
