import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.js';
import '../styles/Dashboard.css';

const SubjectAttendance = ({ userId, attendanceChanged, targetPercentage }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjectsWithAttendance = async () => {
      try {
        // Fetch subjects
        let { data: subjectsData, error: subjectsError } = await supabase
          .from('subjects')
          .select('id, subject_code, subject_name');
        
        if (subjectsError) {
          throw subjectsError;
        }

        // Fetch attendance data for each subject
        const subjectsWithAttendance = await Promise.all(
          subjectsData.map(async (subject) => {
            const { data: attendanceData, error: attendanceError } = await supabase
              .from('attendance')
              .select('*')
              .eq('user_id', userId)
              .eq('subject_id', subject.id);

            if (attendanceError) {
              console.error('Error fetching attendance for subject:', subject.subject_name, attendanceError);
              return {
                ...subject,
                totalClasses: 0,
                attendedClasses: 0,
                percentage: 0,
                status: 'No data'
              };
            }

            const totalClasses = attendanceData.length;
            const attendedClasses = attendanceData.filter(record => record.is_present === true).length;
            const percentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;
            
            let status = 'Good';
            if (percentage < targetPercentage) {
              const classesNeeded = Math.ceil((targetPercentage * totalClasses - attendedClasses * 100) / (100 - targetPercentage));
              status = classesNeeded > 0 ? `Need ${classesNeeded} more classes` : 'At Risk';
            }

            return {
              ...subject,
              totalClasses,
              attendedClasses,
              percentage,
              status
            };
          })
        );

        setSubjects(subjectsWithAttendance);
        setError(null);
      } catch (err) {
        console.error('Error fetching subjects:', err.message);
        setError('Failed to load subjects. Please try again.');
        setSubjects([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSubjectsWithAttendance();
    }
  }, [userId, attendanceChanged, targetPercentage]);

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
            <p className="attendance-percentage" style={{
              color: subject.percentage >= targetPercentage ? '#4CAF50' : 
                     subject.percentage >= targetPercentage - 10 ? '#FF9900' : '#f44336'
            }}>
              {subject.percentage}%
            </p>
            <p className="attendance-fraction">
              {subject.attendedClasses}/{subject.totalClasses} classes
            </p>
            <p className="attendance-status" style={{
              color: subject.status === 'Good' ? '#4CAF50' : 
                     subject.status.includes('Need') ? '#FF9900' : '#f44336'
            }}>
              {subject.status}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubjectAttendance;