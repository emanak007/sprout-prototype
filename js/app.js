// Hash router. Loaded last, after ui.js, data.js and every screen file.

(function () {
  const order = ["journey", ...App.steps.map((s) => s.screen)];
  const root = document.getElementById("app");
  const nav = document.getElementById("nav");

  nav.innerHTML = order
    .map((key) => `<a href="#${key}" data-route="${key}">${Screens[key].label}</a>`)
    .join("");

  function current() {
    const key = location.hash.slice(1);
    return Screens[key] ? key : "journey";
  }

  // Step bar shown above every journey screen, with Back and Next.
  function stepper(key) {
    const i = App.steps.findIndex((s) => s.screen === key);
    if (i === -1) return "";
    const prev = App.steps[i - 1];
    const next = App.steps[i + 1];

    const items = App.steps
      .map((s, n) => {
        const state = n === i ? "is-current" : n < i ? "is-done" : "";
        return `
          <li>
            <a href="#${s.screen}" class="stepper-item ${state}" ${n === i ? 'aria-current="step"' : ""}>
              <span class="stepper-num">${n + 1}</span>${s.name}
            </a>
          </li>`;
      })
      .join("");

    const back = prev
      ? `<a class="btn btn-outline" href="#${prev.screen}">← ${prev.name}</a>`
      : `<a class="btn btn-outline" href="#journey">← Overview</a>`;
    const forward = next
      ? `<a class="btn btn-primary" href="#${next.screen}">Next: ${next.name} →</a>`
      : `<a class="btn btn-primary" href="#journey">Back to overview</a>`;

    return `
      <nav class="stepper" aria-label="Admin's journey">
        <ol>${items}</ol>
        <div class="stepper-nav">${back}${forward}</div>
      </nav>`;
  }

  function render() {
    const key = current();
    const screen = Screens[key];
    root.innerHTML = stepper(key) + screen.render();
    if (screen.mount) screen.mount(root);
    nav.querySelectorAll("a").forEach((a) => {
      a.classList.toggle("is-active", a.dataset.route === key);
      if (a.dataset.route === key) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  App.rerender = render;

  window.addEventListener("hashchange", () => {
    render();
    window.scrollTo(0, 0);
  });
  render();
})();
