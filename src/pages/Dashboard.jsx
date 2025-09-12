import React from 'react';
import Header from '../components/Header.jsx';
import Timetable from '../components/Timetable';
import SubjectAttendance from '../components/SubjectAttendance';
import '../styles/Dashboard.css'


const Dashboard = () => {
  return (
    <div>
      <Header />
      <Timetable />
      <SubjectAttendance />
    </div>
  );
};

export default Dashboard;