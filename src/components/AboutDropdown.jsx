import { useState, useRef, useEffect } from 'react';

const VERSION = '1.0.0';

export default function AboutDropdown() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setPanel(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const select = (item) => { setPanel(item); setOpen(false); };

  return (
    <div className="about-wrapper" ref={ref}>
      <button className="about-btn" onClick={() => { setOpen((v) => !v); setPanel(null); }}>
        About ▾
      </button>

      {open && (
        <div className="about-dropdown">
          <button className="about-item" onClick={() => select('version')}>Version</button>
          <button className="about-item" onClick={() => select('help')}>Help</button>
        </div>
      )}

      {panel === 'version' && (
        <div className="about-panel">
          <div className="about-panel-header">
            <span className="about-panel-title">Version</span>
            <button className="about-panel-close" onClick={() => setPanel(null)}>✕</button>
          </div>
          <p className="about-panel-body">
            <strong>Team Activity Dashboard</strong><br />
            Version {VERSION}<br /><br />
            Built with React + Recharts + Vite.
          </p>
        </div>
      )}

      {panel === 'help' && (
        <div className="about-panel">
          <div className="about-panel-header">
            <span className="about-panel-title">Help</span>
            <button className="about-panel-close" onClick={() => setPanel(null)}>✕</button>
          </div>
          <ul className="about-panel-body help-list">
            <li><strong>All Teams</strong> — overview with leaderboard and category comparison.</li>
            <li><strong>Team tabs</strong> — click a team to see its full dashboard.</li>
            <li><strong>Category filters</strong> — use checkboxes to show/hide categories in the comparison chart.</li>
            <li><strong>Show scores</strong> — toggle score labels above each bar.</li>
            <li><strong>Data</strong> — edit <code>src/data/teams.json</code> to update team scores.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
