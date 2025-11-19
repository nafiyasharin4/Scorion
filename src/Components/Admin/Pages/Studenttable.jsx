// StudentGradeTable.jsx
import { useState } from 'react';
import "../Styles/Studenttable.css"

import React from 'react';

export default function StudentReport() {
  const students = [
    {
      name: "Alex Chen",
      email: "alex.chen@student.edu",
      department: "BBA",
      semester: 4,
      attendance: "95%",
      totalScore: 88,
      grade: "B"
    },
    {
      name: "Maria Garcia",
      email: "maria.g@student.edu",
      department: "BCA",
      semester: 2,
      attendance: "100%",
      totalScore: 92,
      grade: "A"
    },
    {
      name: "John Smith",
      email: "j.smith@student.edu",
      department: "BCom",
      semester: 3,
      attendance: "88%",
      totalScore: 81,
      grade: "B"
    },
    {
      name: "Emma Wilson",
      email: "emma.w@student.edu",
      department: "BA English",
      semester: 1,
      attendance: "98%",
      totalScore: 94,
      grade: "A"
    }
  ];

  const totalStudents = students.length;
  const averageScore = Math.round(
    students.reduce((sum, student) => sum + student.totalScore, 0) / totalStudents
  );
  const passRate = "100%";

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh'
  };

  const headerStyle = {
    textAlign: 'center',
    color: 'white',
    marginBottom: '40px'
  };

  const h1Style = {
    fontSize: '2.5rem',
    fontWeight: '600',
    marginBottom: '10px'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    marginBottom: '30px'
  };

  const sectionTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '20px'
  };

  const tableContainerStyle = {
    overflowX: 'auto'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const theadStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  };

  const thStyle = {
    padding: '16px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const tdStyle = {
    padding: '16px',
    color: '#2d3748',
    fontSize: '0.95rem',
    borderBottom: '1px solid #e2e8f0'
  };

  const gradeBadgeStyle = {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '20px',
    fontWeight: '600',
    fontSize: '0.875rem'
  };

  const gradeAStyle = {
    ...gradeBadgeStyle,
    backgroundColor: '#c6f6d5',
    color: '#22543d'
  };

  const gradeBStyle = {
    ...gradeBadgeStyle,
    backgroundColor: '#bee3f8',
    color: '#2c5282'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  };

  const statCardStyle = {
    background: 'white',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    textAlign: 'center'
  };

  const statLabelStyle = {
    fontSize: '0.875rem',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '10px'
  };

  const statValueStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={h1Style}>Student Grade Report</h1>
      </div>

      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>Academic Performance Overview</h2>
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead style={theadStyle}>
              <tr>
                <th style={thStyle}>Student</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Semester</th>
                <th style={thStyle}>Attendance (10%)</th>
                <th style={thStyle}>Total Score</th>
                <th style={thStyle}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{student.name}</td>
                  <td style={tdStyle}>{student.email}</td>
                  <td style={tdStyle}>{student.department}</td>
                  <td style={tdStyle}>{student.semester}</td>
                  <td style={tdStyle}>{student.attendance}</td>
                  <td style={tdStyle}>{student.totalScore}</td>
                  <td style={tdStyle}>
                    <span style={student.grade === 'A' ? gradeAStyle : gradeBStyle}>
                      {student.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <div style={statLabelStyle}>Total Students</div>
          <div style={statValueStyle}>{totalStudents}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statLabelStyle}>Average Score</div>
          <div style={statValueStyle}>{averageScore}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statLabelStyle}>Pass Rate</div>
          <div style={statValueStyle}>{passRate}</div>
        </div>
      </div>
    </div>
  );
}