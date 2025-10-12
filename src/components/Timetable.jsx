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
        {/* Header row: Day | Period 1 | Period 2 | Period 3 | Period 4 | Period 5 | Period 6 */}
        <div className="timetable-header-cell">Day</div>
        <div className="timetable-header-cell">Period 1</div>
        <div className="timetable-header-cell">Period 2</div>
        <div className="timetable-header-cell">Period 3</div>
        <div className="timetable-header-cell">Period 4</div>
        <div className="timetable-header-cell">Period 5</div>
        <div className="timetable-header-cell">Period 6</div>

        {/* Data rows: Each day as a row with its subjects in period columns */}
        {timetableData.map(day => (
          <React.Fragment key={day.day}>
            <div className="timetable-time-cell">{day.day}</div>
            {day.classes.map((subject, periodIndex) => (
              <div key={periodIndex} className="timetable-subject-cell">
                <span className="subject-name">{subject}</span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Timetable;