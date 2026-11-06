# sprout-prototype

Clickable prototype of the Efficiency Rating concept: a "fuel-economy rating" for how customers use Agentforce and Data 360. All figures are sample data.

## Run it

1. Clone the repo.
2. Open `index.html` in your browser. No install needed.

## Screens

The demo walks through the admin's journey. Start on the overview and press **Start the walkthrough**; the step bar on each screen has Back and Next.

| Step | URL | What it shows |
|---|---|---|
| Overview | `index.html#journey` | The five steps at a glance |
| 1 Notice | `index.html#notice` | Monthly email and Setup banner: "Your org is rated C" |
| 2 See | `index.html#dashboard` | Rating, carbon and cost per outcome, top fixes, Efficiency Agent |
| 3 Fix | `index.html#agent` | The in-flow tip in Agentforce Builder, with apply and undo |
| 4 Prove | `index.html#report` | Trend chart, badge, Net Zero Cloud export, trees funded |
| 5 Share | `index.html#share` | Public page behind "Verify this rating" |

## Editing

- Change numbers and copy in `js/data.js`.
- Each screen is one file in `js/screens/`.
- See `AGENTS.md` for the rules Codex and Claude follow in this repo.
