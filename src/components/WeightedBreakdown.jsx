import { scoreColor } from '../utils/scoreColor.js';

export default function WeightedBreakdown({ categories, weights }) {
  const rows = Object.entries(categories).map(([name, val]) => {
    const weight = weights[name] ?? 0;
    const contribution = val.score * weight;
    return { name, score: val.score, weight, contribution };
  });

  const total = rows.reduce((acc, r) => acc + r.contribution, 0);

  return (
    <div className="breakdown-card">
      <h2 className="chart-title">Weighted Breakdown</h2>
      <table className="breakdown-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Weight</th>
            <th>Score</th>
            <th>Contribution</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td className="cat-name">{r.name.charAt(0).toUpperCase() + r.name.slice(1)}</td>
              <td>{(r.weight * 100).toFixed(0)}%</td>
              <td>
                <span className="score-pill" style={{ color: scoreColor(r.score), borderColor: scoreColor(r.score) }}>
                  {r.score}
                </span>
              </td>
              <td><strong>{r.contribution.toFixed(2)}</strong></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="total-label">Computed Overall</td>
            <td><strong>{total.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
