import { useState } from 'react';
import teams from './data/teams.json';
import TeamSelector from './components/TeamSelector.jsx';
import AllTeamsView from './components/AllTeamsView.jsx';
import Header from './components/Header.jsx';
import OverallScore from './components/OverallScore.jsx';
import CategoryBarChart from './components/CategoryBarChart.jsx';
import CategoryRadarChart from './components/CategoryRadarChart.jsx';
import WeightedBreakdown from './components/WeightedBreakdown.jsx';
import CasesMetrics from './components/CasesMetrics.jsx';
import CategoryCards from './components/CategoryCards.jsx';

function TeamDashboard({ data }) {
  const casesMetrics = data.categories.cases?.metrics ?? null;
  return (
    <>
      <Header
        team={data.team}
        period={data.period}
        evaluatedBy={data.evaluated_by}
        evaluatedAt={data.evaluated_at}
      />
      <main className="dashboard-main">
        <OverallScore score={data.overall_score} />
        <div className="charts-row">
          <CategoryBarChart categories={data.categories} />
          <CategoryRadarChart categories={data.categories} />
        </div>
        <WeightedBreakdown categories={data.categories} weights={data.weights} />
        <CasesMetrics metrics={casesMetrics} />
        <CategoryCards categories={data.categories} />
      </main>
    </>
  );
}

const ALL_CATEGORIES = Object.keys(teams[0].categories);

export default function App() {
  const [selected, setSelected] = useState(null);
  const [catEnabled, setCatEnabled] = useState(() =>
    Object.fromEntries(ALL_CATEGORIES.map((c) => [c, true]))
  );
  const [showLabels, setShowLabels] = useState(false);

  const activeTeam = selected ? teams.find((t) => t.team === selected) : null;

  return (
    <div className="dashboard">
      <TeamSelector teams={teams} selected={selected} onSelect={setSelected} />
      {activeTeam ? (
        <TeamDashboard data={activeTeam} />
      ) : (
        <>
          <header className="dashboard-header dashboard-header--centered">
            <div>
              <h1 className="team-name">All Teams Overview</h1>
              <p className="period">{teams.length} teams &mdash; click any team to drill in</p>
            </div>
          </header>
          <AllTeamsView
            teams={teams}
            onSelect={setSelected}
            catEnabled={catEnabled}
            setCatEnabled={setCatEnabled}
            showLabels={showLabels}
            setShowLabels={setShowLabels}
          />
        </>
      )}
    </div>
  );
}
