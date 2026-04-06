import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, LabelList,
} from 'recharts';
import { scoreColor } from '../utils/scoreColor.js';

export default function CategoryBarChart({ categories }) {
  const data = Object.entries(categories).map(([name, val]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    score: val.score,
  }));

  return (
    <div className="chart-card">
      <h2 className="chart-title">Category Scores</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 40, left: 10, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 13 }} />
          <Tooltip formatter={(v) => [`${v}`, 'Score']} />
          <Bar dataKey="score" radius={[0, 4, 4, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={scoreColor(entry.score)} />
            ))}
            <LabelList dataKey="score" position="right" style={{ fontSize: 12, fontWeight: 600 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
