import React, { useState } from 'react';

export default function StudentProfile() {
  const [student] = useState({
    name: "john doe",
    department: "BCA",
    year: "2nd semester",
    overallAverage: 86.60,
    grade: "A"
  });

  const [attendance] = useState({
    totalClasses: 120,
    attended: 108,
    missed: 12,
    rate: 90.0
  });

  const [subjects] = useState([
    { name: "Data Structures", score: 85, maxScore: 100 },
    { name: "Database Systems", score: 82, maxScore: 100 },
    { name: "Web Development", score: 88, maxScore: 100 },
    { name: "Operating Systems", score: 78, maxScore: 100 },
    { name: "Software Engineering", score: 90, maxScore: 100 }
  ]);

  const getHighestScore = () => {
    const highest = subjects.reduce((max, subject) => 
      (subject.score / subject.maxScore * 100) > (max.score / max.maxScore * 100) ? subject : max
    );
    return { name: highest.name, percentage: (highest.score / highest.maxScore * 100).toFixed(1) };
  };

  const getLowestScore = () => {
    const lowest = subjects.reduce((min, subject) => 
      (subject.score / subject.maxScore * 100) < (min.score / min.maxScore * 100) ? subject : min
    );
    return { name: lowest.name, percentage: (lowest.score / lowest.maxScore * 100).toFixed(1) };
  };

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '16px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header Section with Profile */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              {/* Profile Photo */}
              <div style={{ 
                width: '96px', 
                height: '96px', 
                background: 'linear-gradient(135deg, #3b82f6, #9333ea)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white', 
                fontSize: '32px', 
                fontWeight: 'bold',
                boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
              }}>
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              {/* Student Info */}
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                  {student.name}
                </h1>
                <p style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  {student.department} - {student.year}
                </p>
              </div>
            </div>
            
            {/* Overall Performance Badge */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Overall Average</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981' }}>{student.overallAverage}%</div>
              <div style={{ 
                display: 'inline-block', 
                marginTop: '8px', 
                padding: '4px 16px', 
                backgroundColor: '#d1fae5', 
                color: '#059669', 
                borderRadius: '9999px', 
                fontSize: '14px', 
                fontWeight: '600' 
              }}>
                Grade: {student.grade}
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Section */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg style={{ width: '24px', height: '24px', color: '#3b82f6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Attendance Details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', borderRadius: '8px', padding: '16px', border: '1px solid #bfdbfe' }}>
              <div style={{ color: '#2563eb', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Total Classes</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e40af' }}>{attendance.totalClasses}</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderRadius: '8px', padding: '16px', border: '1px solid #bbf7d0' }}>
              <div style={{ color: '#16a34a', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Classes Attended</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#15803d' }}>{attendance.attended}</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #fef2f2, #fee2e2)', borderRadius: '8px', padding: '16px', border: '1px solid #fecaca' }}>
              <div style={{ color: '#dc2626', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Classes Missed</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#b91c1c' }}>{attendance.missed}</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)', borderRadius: '8px', padding: '16px', border: '1px solid #e9d5ff' }}>
              <div style={{ color: '#9333ea', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Attendance Rate</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#7e22ce' }}>{attendance.rate}%</div>
            </div>
          </div>
        </div>

        {/* Subject Marks Section */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <svg style={{ width: '24px', height: '24px', color: '#3b82f6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              Subject Marks
            </h2>
            <button style={{ 
              padding: '8px 16px', 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              borderRadius: '8px', 
              fontSize: '14px', 
              fontWeight: '600', 
              border: 'none',
              cursor: 'pointer' 
            }}>
              + Add Subject
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {subjects.map((subject, index) => {
              const percentage = (subject.score / subject.maxScore * 100).toFixed(1);
              return (
                <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '12px' }}>
                    <h3 style={{ fontWeight: '600', color: '#1f2937', margin: 0 }}>{subject.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>{subject.score} / {subject.maxScore}</span>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>{percentage}%</span>
                      <span style={{ padding: '4px 12px', backgroundColor: '#f3e8ff', color: '#7e22ce', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>Section</span>
                    </div>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '12px', overflow: 'hidden' }}>
                    <div style={{ 
                      background: 'linear-gradient(90deg, #3b82f6, #9333ea)', 
                      height: '100%', 
                      borderRadius: '9999px', 
                      width: `${percentage}%`,
                      transition: 'width 0.5s ease'
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Summary */}
        <div style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', borderRadius: '12px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', padding: '24px', color: 'white' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg style={{ width: '28px', height: '28px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Performance Summary
              </h2>
              <p style={{ color: '#bfdbfe', margin: 0 }}>Academic Year 2024-2025</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '4px' }}>{student.overallAverage}%</div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: '#bfdbfe' }}>Overall Grade: {student.grade}</div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ color: '#bfdbfe', fontSize: '14px', marginBottom: '4px' }}>Highest Score</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{getHighestScore().percentage}%</div>
              <div style={{ fontSize: '14px', color: '#bfdbfe', marginTop: '4px' }}>{getHighestScore().name}</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ color: '#bfdbfe', fontSize: '14px', marginBottom: '4px' }}>Lowest Score</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{getLowestScore().percentage}%</div>
              <div style={{ fontSize: '14px', color: '#bfdbfe', marginTop: '4px' }}>{getLowestScore().name}</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ color: '#bfdbfe', fontSize: '14px', marginBottom: '4px' }}>Total Subjects</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{subjects.length}</div>
              <div style={{ fontSize: '14px', color: '#bfdbfe', marginTop: '4px' }}>All subjects passed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
