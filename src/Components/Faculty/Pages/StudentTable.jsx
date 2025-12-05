import React, { useState } from 'react';
import TeacherHeader from '../Components/Header';
import StudentListTable from '../Components/StudentManage/StudentList';
import StudentModal from '../Components/StudentManage/StudentModal';

// Mock data
const initialStudents = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    course: 'Computer Science',
    semester: '3',
    status: 'active',
    enrollmentDate: '2023-09-01'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    course: 'Electrical Engineering',
    semester: '2',
    status: 'active',
    enrollmentDate: '2024-01-15'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1 (555) 456-7890',
    course: 'Business Administration',
    semester: '5',
    status: 'inactive',
    enrollmentDate: '2022-08-20'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 (555) 234-5678',
    course: 'Psychology',
    semester: '4',
    status: 'active',
    enrollmentDate: '2023-11-10'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+1 (555) 345-6789',
    course: 'Medicine',
    semester: '6',
    status: 'suspended',
    enrollmentDate: '2022-05-15'
  }
];

function TeacherStuendtTable() {
  const [students, setStudents] = useState(initialStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleSaveStudent = (studentData) => {
    if (editingStudent) {
      // Update existing student
      setStudents(students.map(student => 
        student.id === editingStudent.id 
          ? { ...studentData, id: editingStudent.id }
          : student
      ));
    } else {
      // Add new student
      const newStudent = {
        ...studentData,
        id: Date.now().toString()
      };
      setStudents([...students, newStudent]);
    }
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== studentId));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  return (
    <div>
      <TeacherHeader></TeacherHeader>
    <div className="min-h-screen bg-gray-50 mt-5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Student Management System</h1>
              <p className="text-gray-600 mt-2">Manage your student records efficiently</p>
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
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.filter(s => s.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.filter(s => s.status === 'inactive').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.filter(s => s.status === 'suspended').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Student List */}
        <StudentListTable
          students={students}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />

        {/* Modal */}
        {isModalOpen && (
          <StudentModal
            student={editingStudent}
            onSave={handleSaveStudent}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
    </div>
  );
}

export default TeacherStuendtTable;