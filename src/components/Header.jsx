import React from 'react';

const Header = () => {
  return (
    <>
      <div className="top-status-bar">
        <div className="left-logo">EzyGo+</div>
        <div className="right-controls">
          <select id="attendance-threshold">
            <option value="70">70%</option>
            <option value="75" selected>75%</option>
            <option value="80">80%</option>
            <option value="85">85%</option>
            <option value="90">90%</option>
          </select>
          <span id="college-name-display" className="college-label">Govt. Model Engineering College</span>
          <div className="profile-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <button id="logout-button" className="dashboard-button">Logout</button>
        </div>
      </div>
      <header className="dashboard-header">
        <h1 id="welcome-message">Welcome to EzyGo+</h1>
        <p>Your smart attendance tracking system for modern educational institutions</p>
      </header>
    </>
  );
};

export default Header;