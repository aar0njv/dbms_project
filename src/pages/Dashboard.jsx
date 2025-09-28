import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Timetable from '../components/Timetable';
import SubjectAttendance from '../components/SubjectAttendance';
import AttendanceUpdation from '../components/AttendanceUpdation';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [session, setSession] = useState(null);
  const [attendanceChanged, setAttendanceChanged] = useState(0);
  const [targetPercentage, setTargetPercentage] = useState(75);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <p>Please log in to view your dashboard.</p>;
  }

  const handleAttendanceChange = () => {
    setAttendanceChanged(prev => prev + 1);
  };

  const handleTargetChange = (e) => {
    setTargetPercentage(e.target.value);
  };

  return (
    <div>
      <Header onTargetChange={handleTargetChange} />
      <Timetable />
      <SubjectAttendance userId={session.user.id} attendanceChanged={attendanceChanged} targetPercentage={targetPercentage} />
      <AttendanceUpdation userId={session.user.id} onAttendanceSaved={handleAttendanceChange} />
    </div>
  
  );
};

export default Dashboard;