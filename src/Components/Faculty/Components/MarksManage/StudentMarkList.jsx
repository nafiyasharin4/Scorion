// StudentMarkList.jsx
import React, { useState } from 'react';

const StudentMarkList = ({ students, onAddMarks, onDeleteMarks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
    
    return matchesSearch && matchesCourse;
  });

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A': 'bg-green-100 text-green-800 border border-green-200',
      'A-': 'bg-green-50 text-green-700 border border-green-100',
      'B+': 'bg-blue-100 text-blue-800 border border-blue-200',
      'B': 'bg-blue-50 text-blue-700 border border-blue-100',
      'B-': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'C+': 'bg-orange-100 text-orange-800 border border-orange-200',
      'C': 'bg-orange-50 text-orange-700 border border-orange-100',
      'F': 'bg-red-100 text-red-800 border border-red-200'
    };
    
    return gradeColors[grade] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  const courses = [...new Set(students.map(student => student.course))];
  const allSemesters = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header with Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Student Marks</h2>
          
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="overflow-x-auto">
        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium text-gray-900 mb-2">No students found</p>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-6 hover:bg-gray-50 transition duration-150">
                {/* Student Header */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white font-semibold text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-500">{student.course} • Semester {student.semester}</p>
                      <p className="text-sm text-gray-400">{student.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onAddMarks(student)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-150 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Marks</span>
                  </button>
                </div>

                {/* Semester Marks */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {allSemesters.map(semester => {
                    const semMarks = student.marks?.[semester.toString()];
                    
                    return (
                      <div key={semester} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-gray-800">Semester {semester}</h4>
                          {semMarks ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => onAddMarks(student, semester.toString())}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => onDeleteMarks(student.id, semester.toString())}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => onAddMarks(student, semester.toString())}
                              className="text-green-600 hover:text-green-800 text-sm font-medium"
                            >
                              Add
                            </button>
                          )}
                        </div>

                        {semMarks ? (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Total Grade:</span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(semMarks.totalGrade)}`}>
                                {semMarks.totalGrade}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">SGPA:</span>
                              <span className="text-sm font-semibold text-gray-900">{semMarks.sgpa}</span>
                            </div>
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <p className="text-xs text-gray-500 mb-1">Subjects:</p>
                              {semMarks.subjects.map((subject, index) => (
                                <div key={index} className="flex justify-between text-xs">
                                  <span className="truncate">{subject.name}</span>
                                  <span className={`px-1 rounded ${getGradeColor(subject.grade)}`}>
                                    {subject.grade}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 text-center py-2">No marks added</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredStudents.length}</span> of{' '}
          <span className="font-semibold">{students.length}</span> students
        </p>
      </div>
    </div>
  );
};

export default StudentMarkList;