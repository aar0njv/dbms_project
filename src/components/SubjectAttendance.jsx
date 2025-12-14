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
                status: 'No data',
                classesNeeded: 0,
                classesCanSkip: 0
              };
            }

            const totalClasses = attendanceData.length;
            const attendedClasses = attendanceData.filter(record => record.is_present === true).length;
            const percentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;
            
            // Calculate classes needed to meet target
            let classesNeeded = 0;
            if (percentage < targetPercentage && totalClasses > 0) {
              classesNeeded = Math.ceil((targetPercentage * totalClasses - attendedClasses * 100) / (100 - targetPercentage));
            }
            
            // Calculate classes that can be skipped while maintaining target
            let classesCanSkip = 0;
            if (percentage >= targetPercentage && totalClasses > 0) {
              // Calculate maximum absences allowed while maintaining target
              const maxAbsencesAllowed = Math.floor(attendedClasses * (100 - targetPercentage) / targetPercentage);
              const currentAbsences = totalClasses - attendedClasses;
              classesCanSkip = maxAbsencesAllowed - currentAbsences;
              // Ensure we don't show negative values
              classesCanSkip = Math.max(0, classesCanSkip);
            }

            let status = 'Good';
            if (percentage < targetPercentage) {
              status = classesNeeded > 0 ? `Need ${classesNeeded} more classes` : 'At Risk';
            } else if (classesCanSkip > 0) {
              status = `Can skip ${classesCanSkip} classes`;
            }

            return {
              ...subject,
              totalClasses,
              attendedClasses,
              percentage,
              status,
              classesNeeded,
              classesCanSkip
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
                     subject.status.includes('Need') ? '#FF9900' : 
                     subject.status.includes('skip') ? '#4CAF50' : '#f44336'
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