// MarkModal.jsx
import React, { useState, useEffect } from 'react';

const MarkModal = ({ student, semester, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    semester: '',
    subjects: [
      { name: '', grade: '', points: 0 }
    ],
    totalGrade: '',
    sgpa: 0
  });

  const [errors, setErrors] = useState({});

  // Grade points mapping
  const gradePoints = {
    'A': 9,
    'A-': 8.5,
    'B+': 8,
    'B': 7,
    'B-': 6,
    'C+': 5,
    'C': 4,
    'F': 0
  };

  useEffect(() => {
    if (student && semester && student.marks?.[semester]) {
      // Editing existing marks
      const existingMarks = student.marks[semester];
      setFormData({
        semester: semester,
        subjects: existingMarks.subjects,
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
    const validSubjects = subjects.filter(subject => subject.grade && subject.points > 0);
    if (validSubjects.length === 0) return 0;
    
    const totalPoints = validSubjects.reduce((sum, subject) => sum + subject.points, 0);
    return (totalPoints / validSubjects.length).toFixed(2);
  };

  const calculateTotalGrade = (sgpa) => {
    const sgpaValue = parseFloat(sgpa);
    if (sgpaValue >= 8.5) return 'A';
    if (sgpaValue >= 7.5) return 'A-';
    if (sgpaValue >= 6.5) return 'B+';
    if (sgpaValue >= 5.5) return 'B';
    if (sgpaValue >= 4.5) return 'B-';
    if (sgpaValue >= 3.5) return 'C+';
    if (sgpaValue >= 2.0) return 'C';
    return 'F';
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
        newErrors[`subject_${index}_name`] = 'Subject name is required';
      }
      if (!subject.grade) {
        newErrors[`subject_${index}_grade`] = 'Grade is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...formData.subjects];
    
    if (field === 'grade') {
      updatedSubjects[index] = {
        ...updatedSubjects[index],
        grade: value,
        points: gradePoints[value] || 0
      };
    } else {
      updatedSubjects[index] = {
        ...updatedSubjects[index],
        [field]: value
      };
    }

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
      subjects: [...prev.subjects, { name: '', grade: '', points: 0 }]
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
      onSave(student.id, formData.semester, formData);
    }
  };

  const handleSemesterChange = (e) => {
    setFormData(prev => ({
      ...prev,
      semester: e.target.value
    }));
  };

  const gradeOptions = Object.keys(gradePoints);

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">
                {student && semester && student.marks?.[semester] ? 'Edit Marks' : 'Add Marks'}
              </h2>
              <p className="text-green-100 text-sm mt-1">
                {student ? `For ${student.name}` : 'Select student and enter marks'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-green-100 hover:text-white transition duration-150 p-1 rounded-full hover:bg-green-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Student Info */}
          {student && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-blue-800">Name:</span>
                  <p className="text-blue-900">{student.name}</p>
                </div>
                <div>
                  <span className="font-semibold text-blue-800">Course:</span>
                  <p className="text-blue-900">{student.course}</p>
                </div>
                <div>
                  <span className="font-semibold text-blue-800">Current Semester:</span>
                  <p className="text-blue-900">{student.semester}</p>
                </div>
              </div>
            </div>
          )}

          {/* Semester Selection */}
          <div>
            <label htmlFor="semester" className="block text-sm font-semibold text-gray-700 mb-2">
              Semester *
            </label>
            <select
              id="semester"
              value={formData.semester}
              onChange={handleSemesterChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ${
                errors.semester ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem.toString()}>Semester {sem}</option>
              ))}
            </select>
            {errors.semester && (
              <p className="mt-2 text-sm text-red-600">{errors.semester}</p>
            )}
          </div>

          {/* Subjects */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Subjects and Grades *
              </label>
              <button
                type="button"
                onClick={addSubject}
                className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Subject</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.subjects.map((subject, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start p-4 border border-gray-200 rounded-lg">
                  <div className="md:col-span-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors[`subject_${index}_name`] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter subject name"
                    />
                    {errors[`subject_${index}_name`] && (
                      <p className="mt-1 text-xs text-red-600">{errors[`subject_${index}_name`]}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade
                    </label>
                    <select
                      value={subject.grade}
                      onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors[`subject_${index}_grade`] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Grade</option>
                      {gradeOptions.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                    {errors[`subject_${index}_grade`] && (
                      <p className="mt-1 text-xs text-red-600">{errors[`subject_${index}_grade`]}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 flex items-end">
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      disabled={formData.subjects.length === 1}
                      className="w-full px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Results Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Total Subjects</label>
                <p className="text-lg font-semibold text-gray-900">{formData.subjects.length}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">SGPA</label>
                <p className="text-lg font-semibold text-gray-900">{formData.sgpa}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Total Grade</label>
                <p className="text-lg font-semibold text-gray-900">{formData.totalGrade || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-150 font-medium shadow-sm"
            >
              {student && semester && student.marks?.[semester] ? 'Update Marks' : 'Save Marks'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarkModal;