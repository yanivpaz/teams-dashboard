# Team Activity Dashboard

A React dashboard for visualizing team activity scores across multiple categories. Load a JSON report file and get an instant overview of team health — with leaderboards, category breakdowns, and drill-down views per team.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install and run

```bash
git clone https://github.com/yanivpaz/teams-dashboard.git
cd teams-dashboard
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Adding or Updating Teams

All team data lives in a single file:

```
src/data/teams.json
```

It is a JSON array where each element represents one team. To add a new team, append an object following this structure:

```json
{
  "team": "My Team",
  "period": "2026-04-06T00:00:00.000Z",
  "categories": {
    "operations": { "score": 85, "notes": "Brief note" },
    "security":   { "score": 90, "notes": "Brief note" },
    "finance":    { "score": 75, "notes": "Brief note" },
    "general":    { "score": 80, "notes": "Brief note" },
    "cases": {
      "score": 70,
      "notes": "Brief note",
      "metrics": { "opened": 100, "closed": 90, "avg_resolution_hours": 24 }
    }
  },
  "weights": { "operations": 0.25, "security": 0.25, "finance": 0.2, "general": 0.2, "cases": 0.1 },
  "overall_score": 81.0,
  "evaluated_by": "Evaluator Name",
  "evaluated_at": "2026-04-06T00:00:00.000Z"
}
```

**Fields:**

| Field | Type | Description |
|---|---|---|
| `team` | string | Team display name |
| `period` | ISO date string | Reporting period |
| `categories` | object | One entry per category (see below) |
| `categories[n].score` | number 0–100 | Raw score for this category |
| `categories[n].notes` | string | Short description shown on the card |
| `categories[n].metrics` | object | Optional — only used for `cases` |
| `weights` | object | Weight per category; must sum to 1.0 |
| `overall_score` | number | Weighted overall score (pre-calculated) |
| `evaluated_by` | string | Evaluator name |
| `evaluated_at` | ISO date string | Evaluation timestamp |

**Score color coding:**

| Range | Color | Meaning |
|---|---|---|
| 80 – 100 | Green | Good |
| 60 – 79 | Amber | Fair |
| 0 – 59 | Red | At Risk |

---

## Dashboard Views

### All Teams (default)

Shown when no team tab is selected. Includes:

- **Summary cards** — one card per team with score ring; click to open that team
- **Leaderboard** — teams ranked by overall score with inline progress bar; click any row to drill in
- **Category Comparison** — grouped bar chart comparing all teams across every category side by side

### Single Team

Click any team tab or card to focus on one team. Includes:

- **Overall Score** — large color-coded score with Good / Fair / At Risk label
- **Category Bar Chart** — horizontal bars per category, color-coded by score
- **Score Overview (Radar)** — spider chart showing the team's shape across categories
- **Weighted Breakdown** — table showing each category's weight, score, and contribution to the overall
- **Cases Metrics** — opened / closed / avg resolution time (only shown if `metrics` is present)
- **Category Cards** — one card per category with a score ring and notes

### Navigation

The tab bar at the top lists all teams with their overall score. Click **All Teams** to return to the overview.

---

## Project Structure

```
team-dashboard/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── data/
    │   └── teams.json          # All team data — edit this file
    ├── utils/
    │   └── scoreColor.js       # Score → color/label helpers
    └── components/
        ├── TeamSelector.jsx    # Tab bar navigation
        ├── AllTeamsView.jsx    # Overview: cards, leaderboard, comparison chart
        ├── Header.jsx          # Team name, period, evaluator
        ├── OverallScore.jsx    # Hero score card
        ├── CategoryBarChart.jsx
        ├── CategoryRadarChart.jsx
        ├── WeightedBreakdown.jsx
        ├── CasesMetrics.jsx
        └── CategoryCards.jsx
```

---

## Build for Production

```bash
npm run build
```

Output is written to `dist/`. Serve it with any static file server:

```bash
npm run preview
```
