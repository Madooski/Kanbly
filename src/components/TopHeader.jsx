import React from 'react';
import './TopHeader.css';

export default function TopHeader() {
  const tabs = [
    { label: "Planning", count: 4, active: false },
    { label: "Active", count: 4, active: true },
    { label: "Published", count: 3, active: false }
  ];

  return (
    <div className="topheader">
      {/* Board Title & Tabs Row */}
      <div className="board-header">
        <div className="board-header-left">
          <h1 className="header-title">Strategic Canvas</h1>
        </div>
        
        <div className="tabs-container">
          {tabs.map((tab, idx) => (
            <button key={idx} className={`header-tab ${tab.active ? 'active' : ''}`}>
              {tab.label} <span className="tab-count">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
