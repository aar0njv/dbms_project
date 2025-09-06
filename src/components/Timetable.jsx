import React from 'react';

const Timetable = () => {
  const timetableData = [
    { day: 'Monday', classes: ['Data Structures', 'Operating Systems', 'Engineering Physics', 'Digital Electronics', 'Soft Skills', 'Compiler Design'] },
    { day: 'Tuesday', classes: ['Soft Skills', 'Engineering Physics', 'Operating Systems', 'Data Structures', 'Compiler Design', 'Digital Electronics'] },
    { day: 'Wednesday', classes: ['Compiler Design', 'Soft Skills', 'Engineering Physics', 'Operating Systems', 'Data Structures', 'Digital Electronics'] },
    { day: 'Thursday', classes: ['Digital Electronics', 'Compiler Design', 'Soft Skills', 'Engineering Physics', 'Operating Systems', 'Data Structures'] },
    { day: 'Friday', classes: ['Digital Electronics', 'Compiler Design', 'Data Structures', 'Operating Systems', 'Engineering Physics', 'Soft Skills'] },
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