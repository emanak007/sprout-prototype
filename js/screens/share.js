// Step 5, Share: the public page behind "Verify this rating", plus trees funded.

Screens.share = {
  label: "Share",
  render() {
    const d = window.DEMO;
    const b = d.badge;
    const v = d.verification;

    const uses = v.uses.map((u) => `<li>${App.esc(u)}</li>`).join("");

    return `
      <section class="intro">
        <h2 class="display">Share a rating anyone can check</h2>
        <p class="lead">The badge links to a public verification page, so a reader can see exactly what the rating covers.</p>
      </section>

      <div class="split">
        <section class="card verify" aria-label="Rating verification page">
          <div class="verify-head">
            <div class="kicker">Rating verification</div>
            <span class="pill-done">${App.esc(v.status)}</span>
          </div>
          <div class="badge">
            <div class="badge-letter">${b.to}</div>
            <div>
              <strong>${App.esc(b.name)}</strong>
              <p>${App.esc(d.org.name)}</p>
              <p class="small muted">${App.esc(b.detail)}</p>
            </div>
          </div>
          <dl class="verify-list">
            <div><dt>What it covers</dt><dd>${App.esc(v.scope)}</dd></div>
            <div><dt>Method</dt><dd>${App.esc(v.method)}</dd></div>
            <div><dt>Period</dt><dd>${App.esc(v.period)}</dd></div>
            <div><dt>Review</dt><dd>${App.esc(v.nextReview)}</dd></div>
            <div><dt>Wording rules</dt><dd>${App.esc(b.rules)}</dd></div>
          </dl>
        </section>

        <aside class="notice-side">
          <section class="card">
            <h2 class="card-title">Where to use it</h2>
            <ul class="use-list">${uses}</ul>
            <button class="btn btn-outline" data-action="download">Download badge</button>
          </section>
          <section class="card">
            <h2 class="card-title">Trees funded in your name</h2>
            <div class="metric-value">${d.trees.toLocaleString("en-GB")}</div>
            <p class="muted">Via Salesforce's 1t.org commitment, for reaching rating ${b.to}. A nature contribution, not an offset.</p>
          </section>
        </aside>
      </div>`;
  },

  mount(root) {
    root
      .querySelector('[data-action="download"]')
      .addEventListener("click", () => App.toast("Prototype: downloads the badge as PNG and SVG."));
  },
};
