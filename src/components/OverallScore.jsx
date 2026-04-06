import { scoreColor, scoreBg, scoreLabel } from '../utils/scoreColor.js';

export default function OverallScore({ score }) {
  const color = scoreColor(score);
  const bg = scoreBg(score);
  const label = scoreLabel(score);

  return (
    <div className="overall-score-card" style={{ borderColor: color, backgroundColor: bg }}>
      <p className="overall-label">Overall Score</p>
      <p className="overall-number" style={{ color }}>{score.toFixed(2)}</p>
      <span className="overall-badge" style={{ backgroundColor: color }}>{label}</span>
    </div>
  );
}
