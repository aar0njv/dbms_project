import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard'
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ <AuthPage /> } />
          <Route path="/dashboard" element={ <Dashboard /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;