import { scoreColor, scoreBg } from '../utils/scoreColor.js';

function ScoreRing({ score }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = scoreColor(score);

  return (
    <svg width="72" height="72" className="score-ring">
      <circle cx="36" cy="36" r={r} fill="none" stroke="#e5e7eb" strokeWidth="6" />
      <circle
        cx="36" cy="36" r={r}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 36 36)"
      />
      <text x="36" y="41" textAnchor="middle" fontSize="14" fontWeight="700" fill={color}>
        {score}
      </text>
    </svg>
  );
}

export default function CategoryCards({ categories }) {
  return (
    <div className="category-grid">
      {Object.entries(categories).map(([name, val]) => (
        <div
          key={name}
          className="category-card"
          style={{ borderTopColor: scoreColor(val.score), backgroundColor: scoreBg(val.score) }}
        >
          <ScoreRing score={val.score} />
          <div className="category-info">
            <h3 className="category-name">{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
            <p className="category-notes">{val.notes}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
