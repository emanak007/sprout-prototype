// Step 1, Notice: the monthly email and the Setup banner that start the journey.

Screens.notice = {
  label: "Notice",
  render() {
    const d = window.DEMO;
    const e = d.email;
    const subject = `Your org is rated ${d.rating.current}. Fixes worth about ${App.gbp(App.totalSavingGBP())}/yr are waiting.`;

    const fixes = d.fixes
      .map((f) => `<li><span>${App.esc(f.title)}</span><strong>${App.gbp(f.savingGBP)}/yr</strong></li>`)
      .join("");

    return `
      <section class="intro">
        <h2 class="display">Your org is rated ${d.rating.current}</h2>
        <p class="lead">The admin hears about the rating where they already are: a monthly email and a banner in Setup.</p>
      </section>

      <div class="split">
        <section class="card email" aria-label="Monthly email">
          <dl class="email-meta">
            <div><dt>From</dt><dd>${App.esc(e.from)}</dd></div>
            <div><dt>To</dt><dd>${App.esc(e.to)}</dd></div>
            <div><dt>Date</dt><dd>${App.esc(e.date)}</dd></div>
          </dl>
          <h3 class="email-subject">${App.esc(subject)}</h3>
          <div class="email-body">
            <p>${App.esc(e.intro)}</p>
            <div class="email-rating">
              <span class="badge-letter badge-letter-sm">${d.rating.current}</span>
              <div>
                <strong>${d.metrics.carbonPerOutcome} g CO₂e and £${d.metrics.costPerOutcome.toFixed(2)} per resolved outcome</strong>
                <p class="small muted">Peer median ${d.metrics.peerCarbonPerOutcome} g and £${d.metrics.peerCostPerOutcome.toFixed(2)}, across ${App.esc(d.org.peerGroup)}</p>
              </div>
            </div>
            <p><strong>Your top 3 fixes</strong></p>
            <ul class="email-fixes">${fixes}</ul>
            <a class="btn btn-primary" href="#dashboard">${App.esc(e.cta)}</a>
          </div>
        </section>

        <aside class="notice-side">
          <section class="card">
            <div class="metric-label">Setup home</div>
            <div class="banner banner-setup">
              <span>${App.esc(subject)}</span>
              <a class="btn btn-primary" href="#dashboard">View rating</a>
            </div>
          </section>
          <section class="card annotation">
            <div class="metric-label">Why it works</div>
            <p>Money first, carbon second. The subject line leads with the £ saving; the carbon figures sit next to the cost on every screen.</p>
          </section>
        </aside>
      </div>`;
  },
};
