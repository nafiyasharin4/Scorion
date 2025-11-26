import React, { useState } from 'react';
import TeacherHeader from '../Components/Header';
import StudentMarkList from '../Components/MarksManage/StudentMarkList';
import MarkModal from '../Components/MarksManage/MarkModal';

// Mock data with marks
const initialStudentsWithMarks = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    course: 'Computer Science',
    semester: '3',
    status: 'active',
    enrollmentDate: '2023-09-01',
    marks: {
      '1': {
        subjects: [
          { name: 'Mathematics', grade: 'A', points: 9 },
          { name: 'Physics', grade: 'B+', points: 8 },
          { name: 'Chemistry', grade: 'A-', points: 8.5 }
        ],
        totalGrade: 'A-',
        sgpa: 8.5
      },
      '2': {
        subjects: [
          { name: 'Data Structures', grade: 'A', points: 9 },
          { name: 'Algorithms', grade: 'B+', points: 8 },
          { name: 'Database Systems', grade: 'A', points: 9 }
        ],
        totalGrade: 'A',
        sgpa: 8.67
      }
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    course: 'Electrical Engineering',
    semester: '2',
    status: 'active',
    enrollmentDate: '2024-01-15',
    marks: {
      '1': {
        subjects: [
          { name: 'Mathematics', grade: 'B+', points: 8 },
          { name: 'Physics', grade: 'A-', points: 8.5 },
          { name: 'Engineering Drawing', grade: 'B', points: 7 }
        ],
        totalGrade: 'B+',
        sgpa: 7.83
      }
    }
  }
];

function MarkManagePage() {
  const [students, setStudents] = useState(initialStudentsWithMarks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState('');

  const handleAddMarks = (student, semester = '') => {
    setEditingStudent(student);
    setSelectedSemester(semester);
    setIsModalOpen(true);
  };

  const handleSaveMarks = (studentId, semester, markData) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId 
          ? {
              ...student,
              marks: {
                ...student.marks,
                [semester]: markData
              }
            }
          : student
      )
    );
    setIsModalOpen(false);
    setEditingStudent(null);
    setSelectedSemester('');
  };

  const handleDeleteMarks = (studentId, semester) => {
    if (window.confirm('Are you sure you want to delete these marks?')) {
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === studentId
            ? {
                ...student,
                marks: Object.fromEntries(
                  Object.entries(student.marks || {}).filter(([sem]) => sem !== semester)
                )
              }
            : student
        )
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
    setSelectedSemester('');
  };

  // Calculate statistics
  const studentsWithMarks = students.filter(student => student.marks && Object.keys(student.marks).length > 0);
  const totalSemesters = students.reduce((total, student) => 
    total + (student.marks ? Object.keys(student.marks).length : 0), 0
  );

  const averageSGPA = studentsWithMarks.length > 0 
    ? studentsWithMarks.reduce((sum, student) => {
        const semesterGPAs = Object.values(student.marks).map(mark => mark.sgpa);
        const studentAvg = semesterGPAs.reduce((a, b) => a + b, 0) / semesterGPAs.length;
        return sum + studentAvg;
      }, 0) / studentsWithMarks.length
    : 0;

  return (
    <div>
      <TeacherHeader />
      <div className="min-h-screen bg-gray-50 mt-5">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Student Mark Management</h1>
                <p className="text-gray-600 mt-2">Manage student marks and academic performance</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleAddMarks(null)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Marks</span>
                </button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">With Marks</p>
                  <p className="text-2xl font-bold text-gray-900">{studentsWithMarks.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Semesters</p>
                  <p className="text-2xl font-bold text-gray-900">{totalSemesters}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg SGPA</p>
                  <p className="text-2xl font-bold text-gray-900">{averageSGPA.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Student Mark List */}
          <StudentMarkList
            students={students}
            onAddMarks={handleAddMarks}
            onDeleteMarks={handleDeleteMarks}
          />

          {/* Modal */}
          {isModalOpen && (
            <MarkModal
              student={editingStudent}
              semester={selectedSemester}
              onSave={handleSaveMarks}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MarkManagePage;