import React from 'react';
import Header from '../components/Header.jsx';
import Timetable from '../components/Timetable';
import '../styles/Dashboard.css'


const Dashboard = () => {
  return (
    <div>
      <Header />
      <Timetable />
    </div>
  );
};

export default Dashboard;