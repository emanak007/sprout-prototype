// The admin's journey: an overview of the five steps, each opening its own screen.

Screens.journey = {
  label: "Journey",
  render() {
    const d = window.DEMO;
    const copy = {
      Notice: {
        body: `A Setup banner and monthly email: <strong>"Your org is rated ${d.rating.current}. Fixes worth about ${App.gbp(App.totalSavingGBP())}/yr are waiting."</strong>`,
        foot: "Hook: money first, carbon second",
      },
      See: { body: "Dashboard: rating, <strong>gCO₂e and £ per outcome</strong>, peer benchmark, top 3 fixes." },
      Fix: {
        body: "A tip appears <strong>inside Agentforce Builder</strong>: switch model, archive stale data, retire flows. Preview, then approve.",
      },
      Prove: {
        body: "Next month the rating moves up. <strong>One click exports</strong> the figures to Net Zero Cloud for CSRD / SECR.",
      },
      Share: {
        body: "Verified <strong>rating badge</strong> for PR and tenders, plus trees funded through 1t.org.",
      },
    };

    const cards = App.steps
      .map((s, i) => {
        const c = copy[s.name];
        return `
        <li class="step">
          <span class="step-num">${i + 1}</span>
          <h2>${s.name}</h2>
          <p>${c.body}</p>
          ${c.foot ? `<p class="muted small">${c.foot}</p>` : ""}
          <a class="link" href="#${s.screen}">See the screen →</a>
        </li>`;
      })
      .join("");

    return `
      <section class="intro">
        <h1 class="display">The admin's journey</h1>
        <p class="lead">From "I never think about carbon" to a verified rating, in five steps. No extra tool to log in to.</p>
        <a class="btn btn-primary start-btn" href="#${App.steps[0].screen}">Start the walkthrough →</a>
      </section>
      <ol class="steps">${cards}</ol>`;
  },
};
