import React from 'react';

const AttendanceUpdation = () => {
  const subjects = [
    { code: 'CS201', name: 'Data Structures' },
    { code: 'CS202', name: 'Operating Systems' },
    { code: 'CS203', name: 'Engineering Physics' },
    { code: 'CS204', name: 'Digital Electronics' },
    { code: 'CS205', name: 'Soft Skills' },
    { code: 'CS206', name: 'Compiler Design' },
  ];

  return (
    <section className="dashboard-card attendance-updation-card">
      <h2 className="card-title">Daily Attendance Updation</h2>
      <p className="updation-info">Mark your attendance for today's classes.</p>
      <div className="updation-controls">
        <select className="subject-select">
          {subjects.map(subject => (
            <option key={subject.code} value={subject.code}>
              {subject.code} - {subject.name}
            </option>
          ))}
        </select>
        <div className="button-group">
          <button className="updation-button add-button">Add Class</button>
          <button className="updation-button delete-button">Delete Class</button>
        </div>
      </div>
      <div className="attendance-log-container">
        {/* This is where the log of updated classes will go */}
        <p className="log-placeholder">Classes marked today will appear here.</p>
      </div>
      <button className="save-button">Save Changes</button>
    </section>
  );
};

export default AttendanceUpdation;