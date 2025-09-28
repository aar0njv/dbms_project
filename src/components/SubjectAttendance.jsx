import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.js';
import '../styles/Dashboard.css';

const SubjectAttendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        let { data, error } = await supabase
          .from('subjects')
          .select('id, subject_code, subject_name');
        
        if (error) {
          throw error;
        }

        setSubjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching subjects:', err.message);
        setError('Failed to load subjects. Please try again.');
        setSubjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) {
    return <p>Loading subjects...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }
  
  if (subjects.length === 0) {
    return <p style={{ color: '#ccc' }}>No subjects found. Please add them in the database.</p>;
  }

  return (
    <section className="dashboard-card subject-attendance-container">
      <h2 className="card-title">Subject-wise Attendance</h2>
      <div className="subjects-grid">
        {subjects.map(subject => (
          <div key={subject.id} className="subject-box">
            <h3 className="subject-title">{subject.subject_code} - {subject.subject_name}</h3>
            {/* The rest of the attendance data will go here later */}
            <p className="attendance-status">Attendance data will be shown here.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubjectAttendance;