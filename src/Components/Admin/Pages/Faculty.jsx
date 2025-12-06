// App.js
import React, { useState } from 'react';
import TeacherList from '../Components/TeacherManage/TeacherList';
import TeacherModal from '../Components/TeacherManage/TeacherModal';
import AdminHeader from '../Components/Header';

// Mock data
const initialTeachers = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    department: 'Computer Science',
    subject: 'Data Structures',
    experience: '8 years',
    qualification: 'Ph.D. in Computer Science',
    joinDate: '2018-03-15',
    status: 'active',
    salary: '$85,000'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    phone: '+1 (555) 987-6543',
    department: 'Mathematics',
    subject: 'Calculus',
    experience: '12 years',
    qualification: 'M.Sc. in Mathematics',
    joinDate: '2015-08-22',
    status: 'active',
    salary: '$78,000'
  },
  {
    id: '3',
    name: 'Dr. Emily Davis',
    email: 'emily.davis@university.edu',
    phone: '+1 (555) 456-7890',
    department: 'Physics',
    subject: 'Quantum Mechanics',
    experience: '6 years',
    qualification: 'Ph.D. in Physics',
    joinDate: '2019-01-10',
    status: 'active',
    salary: '$82,000'
  },
  {
    id: '4',
    name: 'Prof. Robert Wilson',
    email: 'robert.wilson@university.edu',
    phone: '+1 (555) 234-5678',
    department: 'Chemistry',
    subject: 'Organic Chemistry',
    experience: '15 years',
    qualification: 'Ph.D. in Chemistry',
    joinDate: '2012-11-05',
    status: 'on-leave',
    salary: '$90,000'
  },
  {
    id: '5',
    name: 'Dr. Lisa Brown',
    email: 'lisa.brown@university.edu',
    phone: '+1 (555) 345-6789',
    department: 'Biology',
    subject: 'Genetics',
    experience: '10 years',
    qualification: 'Ph.D. in Biology',
    joinDate: '2016-07-18',
    status: 'inactive',
    salary: '$80,000'
  }
];

function FacultyGradePage() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setIsModalOpen(true);
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleSaveTeacher = (teacherData) => {
    if (editingTeacher) {
      // Update existing teacher
      setTeachers(teachers.map(teacher => 
        teacher.id === editingTeacher.id 
          ? { ...teacherData, id: editingTeacher.id }
          : teacher
      ));
    } else {
      // Add new teacher
      const newTeacher = {
        ...teacherData,
        id: Date.now().toString()
      };
      setTeachers([...teachers, newTeacher]);
    }
    setIsModalOpen(false);
    setEditingTeacher(null);
  };

  const handleDeleteTeacher = (teacherId) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTeacher(null);
  };

  return (
    <div>
      <AdminHeader></AdminHeader>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 mt-5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Teacher Management System
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Manage faculty information and records</p>
            </div>
            <button
              onClick={handleAddTeacher}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 w-full lg:w-auto"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-lg">Add Teacher</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transform hover:scale-105 transition duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                <p className="text-3xl font-bold text-gray-900">{teachers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transform hover:scale-105 transition duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-3xl font-bold text-gray-900">
                  {teachers.filter(t => t.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transform hover:scale-105 transition duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">On Leave</p>
                <p className="text-3xl font-bold text-gray-900">
                  {teachers.filter(t => t.status === 'on-leave').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transform hover:scale-105 transition duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-xl">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-3xl font-bold text-gray-900">
                  {teachers.filter(t => t.status === 'inactive').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Teacher List */}
        <TeacherList
          teachers={teachers}
          onEdit={handleEditTeacher}
          onDelete={handleDeleteTeacher}
        />

        {/* Modal */}
        {isModalOpen && (
          <TeacherModal
            teacher={editingTeacher}
            onSave={handleSaveTeacher}
            onClose={handleCloseModal}
          />
        )}
      </div>
      </div>
    </div>
  );
}

export default FacultyGradePage;