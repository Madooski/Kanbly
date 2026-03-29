import React from 'react';
import './Sidebar.css';

const Sidebar = ({ initialField, onLogout, isOpen }) => {
  const navItems = [
    { label: 'My Board', icon: 'dashboard', active: true },
    { label: 'Insights', icon: 'insights', active: false },
    { label: 'Team', icon: 'group', active: false },
    { label: 'Archive', icon: 'archive', active: false },
    { label: 'Settings', icon: 'settings', active: false },
  ];

  const fieldLabels = {
    developer: { title: 'Developer', icon: 'terminal' },
    marketer: { title: 'Marketer', icon: 'campaign' },
    hr: { title: 'HR/Ops', icon: 'account_tree' },
    founder: { title: 'Founder', icon: 'rocket_launch' },
    freelancer: { title: 'Freelancer', icon: 'work' },
    student: { title: 'Student', icon: 'school' }
  };

  const currentField = fieldLabels[initialField] || { title: 'Workspace', icon: 'grid_view' };

  return (
    <aside className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <div className="user-profile">
          <div className="profile-icon">
            <span className="material-symbols-outlined">{currentField.icon}</span>
          </div>
          <div className="profile-info">
            <span className="profile-name">Global Editor</span>
            <span className="profile-role">{currentField.title}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item, idx) => (
            <a key={idx} href="#" className={`nav-link ${item.active ? 'active' : ''}`}>
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="new-insight-btn">
            <span className="material-symbols-outlined">add</span>
            <span className="nav-label">New Insight</span>
          </button>
          <button className="logout-btn" onClick={onLogout}>
            <span className="material-symbols-outlined">logout</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
