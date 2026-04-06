import { scoreColor } from '../utils/scoreColor.js';

export default function TeamSelector({ teams, selected, onSelect }) {
  return (
    <nav className="team-selector-bar">
      <div className="team-tabs">
        <button
          className={`team-tab ${selected === null ? 'active' : ''}`}
          onClick={() => onSelect(null)}
        >
          All Teams
        </button>
        {[...teams].sort((a, b) => b.overall_score - a.overall_score).map((t) => (
          <button
            key={t.team}
            className={`team-tab ${selected === t.team ? 'active' : ''}`}
            onClick={() => onSelect(t.team)}
            style={selected === t.team ? { borderBottomColor: scoreColor(t.overall_score) } : {}}
          >
            {t.team}
            <span
              className="tab-score"
              style={{ color: scoreColor(t.overall_score) }}
            >
              {t.overall_score.toFixed(0)}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
