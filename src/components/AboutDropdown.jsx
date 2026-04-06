import { useState, useRef, useEffect } from 'react';

const VERSION = '1.0.0';

export default function AboutDropdown() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState(null);
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });

  // Recalculate drop position from button coords (escapes stacking context)
  const updatePos = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (btnRef.current && !btnRef.current.closest('.about-wrapper').contains(e.target)) {
        setOpen(false);
        setPanel(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openMenu = () => {
    updatePos();
    setOpen((v) => !v);
    setPanel(null);
  };

  const select = (item) => {
    updatePos();
    setPanel(item);
    setOpen(false);
  };

  const popupStyle = { position: 'fixed', top: pos.top, right: pos.right, zIndex: 9999 };

  return (
    <div className="about-wrapper">
      <button className="about-btn" ref={btnRef} onClick={openMenu}>
        About ▾
      </button>

      {open && (
        <div className="about-dropdown" style={popupStyle}>
          <button className="about-item" onClick={() => select('version')}>Version</button>
          <button className="about-item" onClick={() => select('help')}>Help</button>
        </div>
      )}

      {panel === 'version' && (
        <div className="about-panel" style={popupStyle}>
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
        <div className="about-panel" style={popupStyle}>
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
