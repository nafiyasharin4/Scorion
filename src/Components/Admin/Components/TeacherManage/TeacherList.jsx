// components/TeacherList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherList = ({ onEdit }) => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // 🔹 PAGINATION STATE (ADDED)
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 5;

  // 🔹 FETCH TEACHERS FROM BACKEND
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          'http://localhost:5000/api/admin/teachers',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setTeachers(response.data.teachers || response.data);
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'Failed to load teachers');
      }
    };

    fetchTeachers();
  }, []);

  // 🔹 BLOCK / UNBLOCK TEACHER
  const toggleBlock = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `http://localhost:5000/api/admin/blockteacher/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTeachers(prev =>
        prev.map(t =>
          t._id === id ? { ...t, isBlocked: !t.isBlocked } : t
        )
      );
    } catch (error) {
      console.error(error);
      alert('Failed to update status');
    }
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || teacher.status === statusFilter;

    const matchesDepartment =
      departmentFilter === 'all' || teacher.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // 🔹 PAGINATION LOGIC (ADDED)
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800 border border-green-200 shadow-sm',
      'on-leave': 'bg-yellow-100 text-yellow-800 border border-yellow-200 shadow-sm',
      inactive: 'bg-red-100 text-red-800 border border-red-200 shadow-sm'
    };

    const statusLabels = {
      active: 'Active',
      'on-leave': 'On Leave',
      inactive: 'Inactive'
    };

    return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Faculty Members
        </h2>

        {/* 🔍 SEARCH BAR */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search teacher by name, email or subject..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 bg-white shadow-sm"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase">Teacher</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase">Department & Subject</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase">Qualification</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase">Experience</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {currentTeachers.map((teacher) => (
              <tr key={teacher._id} className="hover:bg-blue-50 transition duration-150 group">
                <td className="px-6 py-4">
                  <div className="font-semibold">{teacher.name}</div>
                  <div className="text-sm text-gray-500">{teacher.email}</div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-semibold">{teacher.department}</div>
                  <div className="text-sm text-blue-600">{teacher.subject}</div>
                </td>

                <td className="px-6 py-4">{teacher.qualification}</td>
                <td className="px-6 py-4">{teacher.experience}</td>

                <td className="px-6 py-4">
                  {getStatusBadge(teacher.status)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => onEdit(teacher)}
                      className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleBlock(teacher._id)}
                      className={`px-3 py-2 rounded-lg transition duration-150
                        ${teacher.isBlocked
                          ? 'text-green-600 bg-green-50 hover:bg-green-100'
                          : 'text-red-600 bg-red-50 hover:bg-red-100'
                        }`}
                    >
                      {teacher.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 PAGINATION FOOTER (ADDED) */}
      <div className="px-6 py-4 border-t bg-white flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {currentTeachers.length} of {filteredTeachers.length} teachers
        </p>

        <div className="flex space-x-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherList;
