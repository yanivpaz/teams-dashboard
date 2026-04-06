import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts';

export default function CategoryRadarChart({ categories }) {
  const data = Object.entries(categories).map(([name, val]) => ({
    category: name.charAt(0).toUpperCase() + name.slice(1),
    score: val.score,
  }));

  return (
    <div className="chart-card">
      <h2 className="chart-title">Score Overview</h2>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data} margin={{ top: 8, right: 24, left: 24, bottom: 8 }}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.85)' }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.45)' }} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.25}
            dot={{ r: 3, fill: '#6366f1' }}
          />
          <Tooltip formatter={(v) => [`${v}`, 'Score']} contentStyle={{ background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#fff' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
