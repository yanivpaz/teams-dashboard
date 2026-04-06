import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell,
} from 'recharts';
import { scoreColor, scoreBg } from '../utils/scoreColor.js';

const CATEGORY_COLORS = {
  operations: '#6366f1',
  security:   '#f59e0b',
  finance:    '#10b981',
  general:    '#3b82f6',
  cases:      '#ec4899',
};

function Leaderboard({ teams, onSelect }) {
  const sorted = [...teams].sort((a, b) => b.overall_score - a.overall_score);

  return (
    <div className="breakdown-card">
      <h2 className="chart-title">Team Leaderboard</h2>
      <table className="breakdown-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>Overall Score</th>
            <th style={{ width: '40%' }}>Bar</th>
            <th>Evaluated By</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((t, i) => (
            <tr
              key={t.team}
              className="leaderboard-row"
              onClick={() => onSelect(t.team)}
              style={{ cursor: 'pointer' }}
              title={`View ${t.team} dashboard`}
            >
              <td>
                <span className={`rank-badge rank-${i + 1}`}>{i + 1}</span>
              </td>
              <td className="cat-name">{t.team}</td>
              <td>
                <span
                  className="score-pill"
                  style={{ color: scoreColor(t.overall_score), borderColor: scoreColor(t.overall_score) }}
                >
                  {t.overall_score.toFixed(2)}
                </span>
              </td>
              <td>
                <div className="score-bar-bg">
                  <div
                    className="score-bar-fill"
                    style={{ width: `${t.overall_score}%`, backgroundColor: scoreColor(t.overall_score) }}
                  />
                </div>
              </td>
              <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{t.evaluated_by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CategoryComparison({ teams }) {
  const categories = Object.keys(teams[0].categories);
  const [enabled, setEnabled] = useState(() => Object.fromEntries(categories.map((c) => [c, true])));

  const toggle = (cat) => setEnabled((prev) => ({ ...prev, [cat]: !prev[cat] }));
  const active = categories.filter((c) => enabled[c]);

  const data = teams.map((t) => {
    const row = { team: t.team };
    categories.forEach((cat) => { row[cat] = t.categories[cat].score; });
    return row;
  });

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h2 className="chart-title" style={{ marginBottom: 16 }}>Category Comparison</h2>
        <div className="category-filters">
          {categories.map((cat) => (
            <label key={cat} className="cat-filter-label">
              <input
                type="checkbox"
                checked={enabled[cat]}
                onChange={() => toggle(cat)}
                style={{ accentColor: CATEGORY_COLORS[cat] ?? '#94a3b8' }}
              />
              <span style={{ color: enabled[cat] ? CATEGORY_COLORS[cat] : '#94a3b8' }}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="team" tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.75)' }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.55)' }} />
          <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#fff' }} />
          <Legend wrapperStyle={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }} />
          {active.map((cat) => (
            <Bar key={cat} dataKey={cat} fill={CATEGORY_COLORS[cat] ?? '#94a3b8'} radius={[3, 3, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function SummaryCards({ teams, onSelect }) {
  return (
    <div className="category-grid">
      {teams.map((t) => (
        <div
          key={t.team}
          className="category-card summary-team-card"
          style={{
            borderTopColor: scoreColor(t.overall_score),
            backgroundColor: scoreBg(t.overall_score),
            cursor: 'pointer',
          }}
          onClick={() => onSelect(t.team)}
          title={`View ${t.team} dashboard`}
        >
          <svg width="72" height="72" className="score-ring">
            <circle cx="36" cy="36" r="28" fill="none" stroke="#e5e7eb" strokeWidth="6" />
            <circle
              cx="36" cy="36" r="28"
              fill="none"
              stroke={scoreColor(t.overall_score)}
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 28}
              strokeDashoffset={2 * Math.PI * 28 * (1 - t.overall_score / 100)}
              strokeLinecap="round"
              transform="rotate(-90 36 36)"
            />
            <text x="36" y="41" textAnchor="middle" fontSize="13" fontWeight="700" fill={scoreColor(t.overall_score)}>
              {t.overall_score.toFixed(0)}
            </text>
          </svg>
          <div className="category-info">
            <h3 className="category-name">{t.team}</h3>
            <p className="category-notes">{t.evaluated_by}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AllTeamsView({ teams, onSelect }) {
  return (
    <div className="dashboard-main">
      <SummaryCards teams={teams} onSelect={onSelect} />
      <Leaderboard teams={teams} onSelect={onSelect} />
      <CategoryComparison teams={teams} />
    </div>
  );
}
