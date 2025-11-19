import React from 'react';
import "../Styles/Faculty.css"

const FacultyDirectory = () => {
  const facultyData = [
    {
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      department: 'BCA'
    },
    {
      name: 'Dr. Michael Chen',
      email: 'michael.chen@university.edu',
      department: 'BA English'
    },
    {
      name: 'Prof. Emily Rodriguez',
      email: 'emily.rodriguez@university.edu',
      department: 'BCA'
    },
    {
      name: 'Dr. James Williams',
      email: 'james.williams@university.edu',
      department: 'BCOM'
    },
    {
      name: 'Dr. Lisa Anderson',
      email: 'lisa.anderson@university.edu',
      department: 'BBA'
    }
  ];

  return (
    <div className="body-wrapper">
      <div className="container">
        {/* Faculty Info Card */}
        <div className="faculty-card">
          <div className="info-row">
            <span className="label">Faculty:</span>
            <span className="value">Dr. Sarah Johnson</span>
          </div>
          <div className="info-row">
            <span className="label">Department:</span>
            <span className="value">BCA</span>
          </div>
          <div className="info-row last-row">
            <span className="label">Email:</span>
            <span className="value">sarah.johnson@university.edu</span>
          </div>
        </div>

        {/* Faculty Directory Table */}
        <div className="directory-card">
          <h2 className="directory-title">Faculty Directory</h2>
          <table className="faculty-table">
            <thead>
              <tr>
                <th className="th-first">Teacher</th>
                <th>Email</th>
                <th className="th-last">Department</th>
              </tr>
            </thead>
            <tbody>
              {facultyData.map((faculty, index) => (
                <tr key={index}>
                  <td>{faculty.name}</td>
                  <td className="email-cell">{faculty.email}</td>
                  <td>{faculty.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacultyDirectory;