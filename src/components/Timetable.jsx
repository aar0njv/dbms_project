import React from 'react';
import '../styles/Dashboard.css';

const Timetable = () => {
  const timetableData = [
    { day: 'Monday', classes: ['Data Structures', 'Operating Systems', 'Logic System Design', 'Computer Networks', 'Professional Ethics', 'Web Development'] },
    { day: 'Tuesday', classes: ['Data Structures', 'Soft Skills', 'Operating Systems', 'Cloud Computing', 'Computer Networks', 'Professional Ethics'] },
    { day: 'Wednesday', classes: ['Logic System Design', 'Web Development', 'Cloud Computing', 'Data Structures', 'Operating Systems', 'Soft Skills'] },
    { day: 'Thursday', classes: ['Computer Networks', 'Operating Systems', 'Professional Ethics', 'Data Structures', 'Logic System Design', 'Cloud Computing'] },
    { day: 'Friday', classes: ['Web Development', 'Logic System Design', 'Soft Skills', 'Professional Ethics', 'Cloud Computing', 'Data Structures'] },
  ];

  return (
    <section className="dashboard-card timetable-card">
      <h2 className="card-title">Weekly Timetable</h2>
      <div className="timetable-grid">
        <div className="timetable-header-cell">Time</div>
        <div className="timetable-header-cell">Monday</div>
        <div className="timetable-header-cell">Tuesday</div>
        <div className="timetable-header-cell">Wednesday</div>
        <div className="timetable-header-cell">Thursday</div>
        <div className="timetable-header-cell">Friday</div>

        {[...Array(6)].map((_, periodIndex) => (
          <React.Fragment key={periodIndex}>
            <div className="timetable-time-cell">Period {periodIndex + 1}</div>
            {timetableData.map(day => (
              <div key={day.day} className="timetable-subject-cell">
                <span className="subject-name">{day.classes[periodIndex]}</span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Timetable;