import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AttendanceUpdation = ({ userId, onAttendanceSaved }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendanceLog, setAttendanceLog] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      const { data, error } = await supabase
        .from('subjects')
        .select('id, subject_code, subject_name');
      
      if (!error && data) {
        setSubjects(data);
        if (data.length > 0) {
          setSelectedSubject(data[0].id);
        }
      }
    };

    fetchSubjects();
  }, []);

  const handleAddClass = async () => {
    if (!selectedSubject) return;

    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    
    // Check if attendance already exists for today
    const { data: existingRecord } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', userId)
      .eq('subject_id', selectedSubject)
      .eq('date', today)
      .single();

    if (existingRecord) {
      alert('Attendance already marked for this subject today!');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('attendance')
      .insert([
        {
          user_id: userId,
          subject_id: selectedSubject,
          date: today,
          is_present: true
        }
      ])
      .select('*, subjects(subject_code, subject_name)');

    if (error) {
      alert('Error marking attendance: ' + error.message);
    } else {
      const subject = subjects.find(s => s.id === selectedSubject);
      setAttendanceLog([...attendanceLog, {
        id: data[0].id,
        subject_name: subject.subject_name,
        subject_code: subject.subject_code,
        date: today,
        is_present: true
      }]);
      
    }
    setLoading(false);
  };

  const handleMarkAbsent = async () => {
    if (!selectedSubject) return;

    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    
    // Check if attendance already exists for today
    const { data: existingRecord } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', userId)
      .eq('subject_id', selectedSubject)
      .eq('date', today)
      .single();

    if (existingRecord) {
      alert('Attendance already marked for this subject today!');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('attendance')
      .insert([
        {
          user_id: userId,
          subject_id: selectedSubject,
          date: today,
          is_present: false
        }
      ])
      .select('*, subjects(subject_code, subject_name)');

    if (error) {
      alert('Error marking absence: ' + error.message);
    } else {
      const subject = subjects.find(s => s.id === selectedSubject);
      setAttendanceLog([...attendanceLog, {
        id: data[0].id,
        subject_name: subject.subject_name,
        subject_code: subject.subject_code,
        date: today,
        is_present: false
      }]);

    }
    setLoading(false);
  };

  const handleDeleteClass = async () => {
    if (!selectedSubject) return;

    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    
    const { error } = await supabase
      .from('attendance')
      .delete()
      .eq('user_id', userId)
      .eq('subject_id', selectedSubject)
      .eq('date', today);

    if (error) {
      alert('Error deleting attendance: ' + error.message);
    } else {
      setAttendanceLog(attendanceLog.filter(log => 
        !(log.date === today && subjects.find(s => s.id === selectedSubject && (s.subject_code === log.subject_code || s.subject_name === log.subject_name)))
      ));
      alert('Attendance deleted successfully!');
    }
    setLoading(false);
  };

  const handleSaveChanges = () => {
    if (onAttendanceSaved) {
      onAttendanceSaved();
    }
    alert('Changes saved! Attendance data updated.');
  };

  return (
    <section className="dashboard-card attendance-updation-card">
      <h2 className="card-title">Daily Attendance Updation</h2>
      <p className="updation-info">Mark your attendance for today's classes.</p>
      <div className="updation-controls">
        <select 
          className="subject-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>
              {subject.subject_code} - {subject.subject_name}
            </option>
          ))}
        </select>
        <div className="button-group">
          <button 
            className="updation-button add-button"
            onClick={handleAddClass}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Mark Present'}
          </button>
          <button 
            className="updation-button absent-button"
            onClick={handleMarkAbsent}
            disabled={loading}
            style={{ backgroundColor: '#F7C948', borderColor: '#F7C948' }}
          >
            {loading ? 'Adding...' : 'Mark Absent'}
          </button>
          <button 
            className="updation-button delete-button"
            onClick={handleDeleteClass}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Record'}
          </button>
        </div>
      </div>
      <div className="attendance-log-container">
        {attendanceLog.length === 0 ? (
          <p className="log-placeholder">Classes marked today will appear here.</p>
        ) : (
          <div>
            <h4 style={{ color: '#FF9900', marginBottom: '10px' }}>Today's Attendance:</h4>
            {attendanceLog.map((log, index) => (
              <div key={index} style={{ 
                padding: '8px', 
                marginBottom: '5px', 
                backgroundColor: '#444', 
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>{log.subject_code} - {log.subject_name}</span>
                <span style={{ color: log.is_present ? '#4CAF50' : '#ff6b6b' }}>
                  {log.is_present ? '✓ Present' : '✗ Absent'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <button 
        className="save-button"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
    </section>
  );
};

export default AttendanceUpdation;