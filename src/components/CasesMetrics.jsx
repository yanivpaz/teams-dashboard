export default function CasesMetrics({ metrics }) {
  if (!metrics) return null;

  const stats = [
    { label: 'Opened', value: metrics.opened },
    { label: 'Closed', value: metrics.closed },
    { label: 'Avg Resolution', value: `${metrics.avg_resolution_hours}h` },
  ];

  return (
    <div className="cases-card">
      <h2 className="chart-title">Cases Metrics</h2>
      <div className="cases-stats">
        {stats.map((s) => (
          <div key={s.label} className="stat-chip">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
