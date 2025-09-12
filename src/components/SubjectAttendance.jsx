import React from 'react';


const SubjectAttendance = () => {
  // Dummy data for 6 subjects
  const subjects = [
    { code: 'CS201', name: 'Data Structures', attended: 25, total: 30, target: 75 },
    { code: 'CS202', name: 'Operating Systems', attended: 20, total: 30, target: 75 },
    { code: 'CS203', name: 'Engineering Physics', attended: 22, total: 30, target: 75 },
    { code: 'CS204', name: 'Digital Electronics', attended: 18, total: 30, target: 75 },
    { code: 'CS205', name: 'Soft Skills', attended: 28, total: 30, target: 75 },
    { code: 'CS206', name: 'Compiler Design', attended: 27, total: 30, target: 75 },
    { code: 'CS207', name: 'Cyber Security', attended: 15, total: 30, target: 75 },
    { code: 'CS208', name: 'Web Dev', attended: 12, total: 30, target: 75 }
  ];

  const calculateStatus = (attended, total, target) => {
    const currentPercentage = (attended / total) * 100;
    const requiredClasses = Math.ceil((target / 100) * total);
    const classesToAttend = requiredClasses - attended;
    const classesCanBunk = total - requiredClasses - (total - attended);

    if (currentPercentage >= target) {
      return `You can bunk ${Math.floor(classesCanBunk)} more classes`;
    } else {
      return `Attend ${classesToAttend} more classes`;
    }
  };

  return (
    <section className="dashboard-card subject-attendance-container">
      <h2 className="card-title">Subject-wise Attendance</h2>
      <div className="subjects-grid">
        {subjects.map(subject => (
          <div key={subject.code} className="subject-box">
            <h3 className="subject-title">{subject.code} - {subject.name}</h3>
            <p className="attendance-percentage">
              {((subject.attended / subject.total) * 100).toFixed(1)}%
            </p>
            <p className="attendance-fraction">
              {subject.attended} / {subject.total} classes attended
            </p>
            <p className="attendance-status">
              {calculateStatus(subject.attended, subject.total, subject.target)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubjectAttendance;