export default function Header({ team, period, evaluatedBy, evaluatedAt }) {
  const periodDate = new Date(period).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
  const evaluatedDate = new Date(evaluatedAt).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <header className="dashboard-header">
      <div>
        <h1 className="team-name">{team} Team</h1>
        <p className="period">Period: {periodDate}</p>
      </div>
      <div className="evaluated-info">
        <span>Evaluated by <strong>{evaluatedBy}</strong></span>
        <span className="evaluated-at">{evaluatedDate}</span>
      </div>
    </header>
  );
}
