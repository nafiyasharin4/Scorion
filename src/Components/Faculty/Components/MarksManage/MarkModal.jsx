// MarkModal.jsx
import React, { useState, useEffect } from 'react';

const MarkModal = ({ student, semester, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    semester: '',
    subjects: [
      { name: '', marks: 0, grade: '', points: 0 }
    ],
    attendancePercentage: 75,
    academicYear: '2023-24',
    totalGrade: '',
    sgpa: 0
  });

  const [errors, setErrors] = useState({});

  const gradePoints = {
    'A+': 10,
    'A': 9,
    'B': 8,
    'C': 7,
    'D': 6,
    'F': 0
  };

  const CALICUT_UNIVERSITY_SUBJECTS = {
    '1': ['English-I', 'Critical Thinking', 'Mathematical Foundation', 'Computer Fundamentals & HTML', 'Programming in C'],
    '2': ['English-II', 'Discrete Mathematics', 'Data Structures using C', 'Financial Accounting', 'C++ Programming'],
    '3': ['Database Management System', 'Python Programming', 'Numerical Methods', 'Data Communication', 'Digital Electronics'],
    '4': ['Operating Systems', 'Java Programming', 'Microprocessors', 'E-Commerce', 'Computer Networks'],
    '5': ['Android Programming', 'Web Programming (PHP)', 'Software Engineering', 'Computer Graphics', 'Java Practical'],
    '6': ['System Software', 'Machine Learning', 'Android Practical', 'Project Work', 'Viva-Voce']
  };

  const populateSubjects = () => {
    const sem = formData.semester;
    if (CALICUT_UNIVERSITY_SUBJECTS[sem]) {
      const universitySubjects = CALICUT_UNIVERSITY_SUBJECTS[sem].map(name => ({
        name,
        marks: 0,
        grade: '',
        points: 0
      }));
      setFormData(prev => ({ ...prev, subjects: universitySubjects }));
    }
  };

  useEffect(() => {
    if (student && semester && student.marks?.[semester]) {
      // Editing existing marks
      const existingMarks = student.marks[semester];
      setFormData({
        semester: semester,
        subjects: existingMarks.subjects || [],
        attendancePercentage: existingMarks.attendancePercentage || 0,
        academicYear: existingMarks.academicYear || '2023-24',
        totalGrade: existingMarks.totalGrade,
        sgpa: existingMarks.sgpa
      });
    } else if (student && semester) {
      // Adding marks for specific semester
      setFormData(prev => ({
        ...prev,
        semester: semester
      }));
    } else if (student) {
      // Adding marks for new semester
      setFormData(prev => ({
        ...prev,
        semester: student.semester || '1'
      }));
    }
  }, [student, semester]);

  const calculateSGPA = (subjects) => {
    const validSubjects = subjects.filter(subject => subject.grade);
    if (validSubjects.length === 0) return 0;
    
    const totalPoints = validSubjects.reduce((sum, subject) => sum + (gradePoints[subject.grade] || 0), 0);
    return (totalPoints / validSubjects.length).toFixed(2);
  };

  const calculateTotalGrade = (sgpa) => {
    const avgPoint = parseFloat(sgpa);
    if (avgPoint >= 9) return "A+";
    if (avgPoint >= 8) return "A";
    if (avgPoint >= 7) return "B";
    if (avgPoint >= 6) return "C";
    if (avgPoint >= 5) return "D";
    return "F";
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.semester) {
      newErrors.semester = 'Semester is required';
    }

    if (formData.subjects.length === 0) {
      newErrors.subjects = 'At least one subject is required';
    }

    formData.subjects.forEach((subject, index) => {
      if (!subject.name.trim()) {
        newErrors[`subject_${index}_name`] = 'Required';
      }
      if (!subject.grade) {
        newErrors[`subject_${index}_grade`] = 'Required';
      }
    });

    if (formData.attendancePercentage < 0 || formData.attendancePercentage > 100) {
      newErrors.attendance = 'Invalid percentage';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...formData.subjects];
    
    let updatedValue = value;
    if (field === 'marks') {
      updatedValue = value === '' ? 0 : parseInt(value);
      // Auto-calculate grade from marks
      if (updatedValue >= 90) updatedSubjects[index].grade = 'A+';
      else if (updatedValue >= 80) updatedSubjects[index].grade = 'A';
      else if (updatedValue >= 70) updatedSubjects[index].grade = 'B';
      else if (updatedValue >= 60) updatedSubjects[index].grade = 'C';
      else if (updatedValue >= 40) updatedSubjects[index].grade = 'D';
      else updatedSubjects[index].grade = 'F';
    }

    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [field]: updatedValue
    };

    const sgpa = calculateSGPA(updatedSubjects);
    const totalGrade = calculateTotalGrade(sgpa);

    setFormData(prev => ({
      ...prev,
      subjects: updatedSubjects,
      sgpa: parseFloat(sgpa),
      totalGrade
    }));
  };

  const addSubject = () => {
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, { name: '', marks: 0, grade: '', points: 0 }]
    }));
  };

  const removeSubject = (index) => {
    if (formData.subjects.length > 1) {
      const updatedSubjects = formData.subjects.filter((_, i) => i !== index);
      const sgpa = calculateSGPA(updatedSubjects);
      const totalGrade = calculateTotalGrade(sgpa);

      setFormData(prev => ({
        ...prev,
        subjects: updatedSubjects,
        sgpa: parseFloat(sgpa),
        totalGrade
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(student.id, formData.semester, {
        ...formData,
        status: parseFloat(formData.sgpa) >= 5 ? 'passed' : 'failed'
      });
    }
  };

  const gradeOptions = Object.keys(gradePoints);

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-[100] bg-slate-950/40">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="px-8 py-6 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              {student && semester && student.marks?.[semester] ? 'Edit Academic Entry' : 'New Academic Entry'}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">
              {student?.name} • Semester {formData.semester || '??'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-950 border border-slate-700 text-slate-500 hover:text-white rounded-xl transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 flex-1 overflow-y-auto space-y-8 custom-scrollbar">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Semester (Max 6)</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({...formData, semester: e.target.value})}
                className="w-full px-5 py-4 bg-slate-950 border border-slate-700 rounded-2xl text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-bold uppercase tracking-widest text-xs"
              >
                <option value="">Select Phase</option>
                {[1, 2, 3, 4, 5, 6].map(sem => (
                  <option key={sem} value={sem.toString()}>Semester {sem}</option>
                ))}
              </select>
              {errors.semester && <p className="text-[10px] text-rose-500 font-black ml-1 uppercase">{errors.semester}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Attendance (%)</label>
              <input
                type="number"
                value={formData.attendancePercentage}
                onChange={(e) => setFormData({...formData, attendancePercentage: e.target.value})}
                placeholder="0-100"
                className="w-full px-5 py-4 bg-slate-950 border border-slate-700 rounded-2xl text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-bold text-xs"
              />
              {errors.attendance && <p className="text-[10px] text-rose-500 font-black ml-1 uppercase">{errors.attendance}</p>}
            </div>

            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-4 flex items-center gap-4">
              <div className="h-10 w-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 font-black">
                {formData.totalGrade || '??'}
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Calculated SGPA</p>
                <p className="text-xl font-black text-white">{formData.sgpa}</p>
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Subject Performance</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={populateSubjects}
                  disabled={!formData.semester}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Auto-inject Subjects
                </button>
                <button
                  type="button"
                  onClick={addSubject}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-slate-700"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Subject
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {formData.subjects.map((subject, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 bg-slate-950/50 border border-slate-700 rounded-2xl group hover:border-slate-600 transition-all">
                  <div className="md:col-span-6">
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                      placeholder="Subject Name"
                      className="w-full bg-transparent border-b border-slate-800 focus:border-cyan-500/50 outline-none px-1 py-1 text-sm font-bold text-slate-200 placeholder-slate-400 transition-all"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <input
                      type="number"
                      value={subject.marks}
                      onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                      placeholder="Mark"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1 text-[10px] font-black text-white uppercase tracking-widest outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="md:col-span-3 flex items-center px-4 bg-slate-900 border border-slate-800 rounded-xl">
                    <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">
                      Grade: {subject.grade || '---'}
                    </span>
                  </div>

                  <div className="md:col-span-1">
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="w-full h-full flex items-center justify-center text-slate-600 hover:text-rose-500 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-slate-950 border border-slate-800 text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] px-6 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              Commit Marks & Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarkModal;