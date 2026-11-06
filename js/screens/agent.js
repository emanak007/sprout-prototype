// Agentforce Builder: the in-flow efficiency tip on the "Order status" topic.

Screens.agent = {
  label: "Agent Builder",
  render() {
    const a = window.DEMO.agent;
    const t = a.tip;
    const applied = App.state.appliedFixes.has("model");

    const topics = a.topics
      .map(
        (name) => `
        <li class="topic ${name === a.flaggedTopic ? "is-active" : ""}">
          ${App.esc(name)}
          ${name === a.flaggedTopic && !applied ? '<span class="dot" aria-label="Has an efficiency tip"></span>' : ""}
        </li>`
      )
      .join("");

    const options = (list, selected) =>
      list.map((o) => `<option ${o === selected ? "selected" : ""}>${App.esc(o)}</option>`).join("");

    const model = applied ? a.models[1] : a.models[0];
    const knowledge = applied ? a.knowledgeSources[1] : a.knowledgeSources[0];

    const tip = applied
      ? `
        <section class="tip tip-done" role="status">
          <h2 class="tip-title">Applied to sandbox</h2>
          <p>"${App.esc(a.flaggedTopic)}" now uses a small model with order articles only.
          Carbon per outcome: ${t.carbonBefore} g → ${t.carbonAfter} g.</p>
          <div class="tip-actions">
            <button class="btn btn-outline" data-action="undo">Undo</button>
            <a class="link" href="#report">See the result next month →</a>
          </div>
        </section>`
      : `
        <section class="tip">
          <h2 class="tip-title">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
            ${App.esc(t.title)}
          </h2>
          <p>${App.esc(t.body)}</p>
          <div class="tip-stats">
            <div class="tip-stat"><span class="metric-label">Carbon per outcome</span><strong>${t.carbonBefore} g → ${t.carbonAfter} g</strong></div>
            <div class="tip-stat"><span class="metric-label">Saving per year</span><strong>${App.gbp(t.savingGBP)}</strong></div>
            <div class="tip-stat"><span class="metric-label">CO₂e avoided per year</span><strong>${t.co2t} t</strong></div>
          </div>
          <div class="tip-actions">
            <button class="btn btn-primary" data-action="apply">Apply to sandbox first</button>
            <button class="btn btn-outline" data-action="tests">See test conversations</button>
            <button class="link-btn muted-link" data-action="dismiss">Not now</button>
          </div>
          <p class="small muted">Nothing changes without your approval. You can undo it in one click.</p>
        </section>`;

    return `
      ${App.header("Agent", a.name)}
      <div class="builder">
        <aside class="card topics">
          <div class="metric-label">Topics</div>
          <ul>${topics}</ul>
        </aside>
        <div class="builder-main">
          <section class="card">
            <h2 class="display-sm">${App.esc(a.flaggedTopic)}</h2>
            <div class="field-row">
              <div>
                <label class="field-label" for="model-select">Model</label>
                <select id="model-select">${options(a.models, model)}</select>
              </div>
              <div>
                <label class="field-label" for="knowledge-select">Knowledge sources</label>
                <select id="knowledge-select">${options(a.knowledgeSources, knowledge)}</select>
              </div>
            </div>
          </section>
          ${tip}
        </div>
      </div>`;
  },

  mount(root) {
    const on = (action, fn) => {
      const el = root.querySelector(`[data-action="${action}"]`);
      if (el) el.addEventListener("click", fn);
    };
    on("apply", () => {
      App.state.appliedFixes.add("model");
      App.toast("Applied to sandbox. Production is unchanged until you approve.");
      App.rerender();
    });
    on("undo", () => {
      App.state.appliedFixes.delete("model");
      App.toast("Undone. The topic is back on the large model.");
      App.rerender();
    });
    on("tests", () => App.toast("Prototype: would show last month's conversations side by side."));
    on("dismiss", () => App.toast("Tip hidden for 30 days."));
  },
};
