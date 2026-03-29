import React from 'react';
import './TopNavbar.css';

const TopNavbar = ({ onToggleSidebar, onChangeField }) => {
  return (
    <nav className="top-navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onToggleSidebar}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="brand">
          <span className="material-symbols-outlined brand-icon">auto_awesome</span>
          <h1 className="brand-name">Kaban <span className="brand-accent">Smart</span></h1>
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-bar">
          <span className="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search tasks or insights..." />
        </div>
      </div>

      <div className="navbar-right">
        <button className="change-field-btn" onClick={onChangeField}>
          <span className="material-symbols-outlined">swap_horiz</span>
          <span className="btn-label">Change Field</span>
        </button>
        <div className="nav-actions">
          <button className="nav-icon-btn">
            <span className="material-symbols-outlined">notifications</span>
            <span className="notification-dot"></span>
          </button>
          <button className="nav-icon-btn">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
        <div className="user-avatar">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3SzNzGReXHQz56v-ziaRnrAr05sTDrvnFnsliZau3bv3JTm68A_a9AO8ldbtHO4gPCR3x3NCuJPkGEcZxCsSi5wn4cCkh2aOi7D0oVLXuWbvRY6iHsxfTWquOrGLMiSDb8AqtHAro6glb_TB3QBcW0sgjODs832os19_sMNzInWzWWmbtgMvX1BAhOWlLw2oBuqrM-syKmakBugan3Ckay2onO96MPmr8QlwDiZ4lAyAq3xrnocDlrEVJfo2ZcaTbAQWDWIHohX7c" alt="User" />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
