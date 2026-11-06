// Shared helpers used by every screen. Loaded before the screen files.

window.Screens = window.Screens || {};

window.App = {
  // Prototype state that should survive switching screens.
  state: {
    appliedFixes: new Set(),
  },

  // The admin's journey, in order. Each step has its own screen.
  steps: [
    { name: "Notice", screen: "notice" },
    { name: "See", screen: "dashboard" },
    { name: "Fix", screen: "agent" },
    { name: "Prove", screen: "report" },
    { name: "Share", screen: "share" },
  ],

  esc(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  },

  gbp(amount) {
    return "£" + amount.toLocaleString("en-GB");
  },

  totalSavingGBP() {
    return window.DEMO.fixes.reduce((sum, f) => sum + f.savingGBP, 0);
  },

  totalCo2t() {
    const total = window.DEMO.fixes.reduce((sum, f) => sum + f.co2t, 0);
    return Math.round(total * 10) / 10;
  },

  // Page header with the gauge icon, matching the mockups.
  header(kicker, title) {
    return `
      <header class="page-header card">
        <div class="page-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22"><path d="M4 16a8 8 0 0 1 16 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 16l4-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </div>
        <div>
          <div class="kicker">${App.esc(kicker)}</div>
          <h1>${App.esc(title)}</h1>
        </div>
      </header>`;
  },

  toast(message) {
    const el = document.getElementById("toast");
    el.textContent = message;
    el.hidden = false;
    clearTimeout(App._toastTimer);
    App._toastTimer = setTimeout(() => (el.hidden = true), 3000);
  },
};
