import React, { useState } from 'react';
import { User, BookOpen, Award, GraduationCap } from 'lucide-react';
import "../../Styles/StudentDashboard.css"


export default function StudentDashboard() {
  const [studentName, setStudentName] = useState('Alex Johnson');
  const [course, setCourse] = useState('Computer Science - Year 2');
  const [subjects, setSubjects] = useState([
    { name: 'Data Structures', marks: 85, maxMarks: 100 },
    { name: 'Database Systems', marks: 92, maxMarks: 100 },
    { name: 'Web Development', marks: 88, maxMarks: 100 },
    { name: 'Operating Systems', marks: 78, maxMarks: 100 },
    { name: 'Software Engineering', marks: 90, maxMarks: 100 },
  ]);

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: 'New Subject', marks: 0, maxMarks: 100 }]);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const calculateAverage = () => {
    if (subjects.length === 0) return 0;
    const totalPercentage = subjects.reduce(
      (sum, s) => sum + (Number(s.marks) / Number(s.maxMarks)) * 100,
      0
    );
    return (totalPercentage / subjects.length).toFixed(2);
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { letter: 'A+', color: '#16a34a' };
    if (percentage >= 85) return { letter: 'A', color: '#16a34a' };
    if (percentage >= 80) return { letter: 'B+', color: '#2563eb' };
    if (percentage >= 75) return { letter: 'B', color: '#2563eb' };
    if (percentage >= 70) return { letter: 'C+', color: '#ca8a04' };
    if (percentage >= 65) return { letter: 'C', color: '#ca8a04' };
    if (percentage >= 60) return { letter: 'D', color: '#ea580c' };
    return { letter: 'F', color: '#dc2626' };
  };

  const getSubjectPercentage = (marks, maxMarks) =>
    ((Number(marks) / Number(maxMarks)) * 100).toFixed(1);

  const average = calculateAverage();
  const overallGrade = getGrade(average);

  return (
    <div className="dashboard-container">
      <div className="dashboard-max-width">
        {/* Profile Section */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-left">
              <div className="avatar">
                <User size={40} color="white" />
              </div>
              <div>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="name-input"
                />
                <div className="course-container">
                  <GraduationCap size={20} color="#6b7280" />
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="course-input"
                  />
                </div>
              </div>
            </div>
            <div className="overall-grade">
              <div className="overall-label">Overall Average</div>
              <div className="overall-percentage">{average}%</div>
              <div
                className="overall-letter"
                style={{ color: overallGrade.color }}
              >
                {overallGrade.letter}
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="subjects-card">
          <div className="subjects-header">
            <div className="subjects-title">
              <BookOpen size={28} color="#4f46e5" />
              <h2 className="subjects-heading">Subject Marks</h2>
            </div>
            <button onClick={addSubject} className="add-button">
              + Add Subject
            </button>
          </div>

          <div className="subjects-list">
            {subjects.map((subject, index) => {
              const percentage = getSubjectPercentage(
                subject.marks,
                subject.maxMarks
              );
              const grade = getGrade(percentage);

              return (
                <div key={index} className="subject-item">
                  <div className="subject-row">
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) =>
                        updateSubject(index, 'name', e.target.value)
                      }
                      className="subject-name-input"
                      placeholder="Subject name"
                    />
                    <div className="subject-controls">
                      <div className="marks-input-group">
                        <input
                          type="number"
                          value={subject.marks}
                          onChange={(e) =>
                            updateSubject(index, 'marks', e.target.value)
                          }
                          className="marks-input"
                          min="0"
                        />
                        <span className="separator">/</span>
                        <input
                          type="number"
                          value={subject.maxMarks}
                          onChange={(e) =>
                            updateSubject(index, 'maxMarks', e.target.value)
                          }
                          className="marks-input"
                          min="1"
                        />
                      </div>
                      <div className="grade-display">
                        <div className="percentage-text">{percentage}%</div>
                        <div
                          className="grade-text"
                          style={{ color: grade.color }}
                        >
                          {grade.letter}
                        </div>
                      </div>
                      <button
                        onClick={() => removeSubject(index)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="summary">
            <div className="summary-header">
              <Award size={24} color="white" />
              <h3 className="summary-title">Performance Summary</h3>
            </div>
            <div className="summary-grid">
              <div>
                <div className="summary-label">Total Subjects</div>
                <div className="summary-value">{subjects.length}</div>
              </div>
              <div>
                <div className="summary-label">Average Score</div>
                <div className="summary-value">{average}%</div>
              </div>
              <div>
                <div className="summary-label">Overall Grade</div>
                <div className="summary-value">{overallGrade.letter}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
