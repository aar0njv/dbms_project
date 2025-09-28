import React from 'react';
import Header from '../components/Header.jsx';
import Timetable from '../components/Timetable';
import SubjectAttendance from '../components/SubjectAttendance';
import AttendanceUpdation from '../components/AttendanceUpdation.jsx';
import '../styles/Dashboard.css'


const Dashboard = () => {
  return (
    <div>
      <Header />
      <Timetable />
      <SubjectAttendance />
      <AttendanceUpdation />
    </div>
  );
};

export default Dashboard;