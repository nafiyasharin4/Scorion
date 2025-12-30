// components/StudentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = ({ onEdit }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');

  // 🔹 PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // 🔹 FETCH STUDENTS
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get(
        'http://localhost:5000/api/admin/students',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(res.data.students || res.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to fetch students');
    }
  };

  // 🔹 BLOCK / UNBLOCK STUDENT
  const toggleBlockStudent = async (student) => {
    try {
      const token = localStorage.getItem('token');

      const url = student.isBlocked
        ? `http://localhost:5000/api/admin/unblock-student/${student._id}`
        : `http://localhost:5000/api/admin/block-student/${student._id}`;

      await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchStudents();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  // 🔹 FILTER
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || student.status === statusFilter;

    const matchesCourse =
      courseFilter === 'all' || student.course === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  // 🔹 PAGINATION LOGIC
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800 border border-green-200',
      inactive: 'bg-red-100 text-red-800 border border-red-200',
      suspended: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const courses = [...new Set(students.map((s) => s.course))];

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Student Records
          </h2>

          <div className="flex flex-col lg:flex-row gap-4">
            <input
              type="text"
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            <select
              value={courseFilter}
              onChange={(e) => {
                setCourseFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Student</th>
              <th className="px-6 py-4 text-left">Contact</th>
              <th className="px-6 py-4 text-left">Course</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Enrollment Date</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentStudents.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {student.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold">{student.name}</div>
                      <div className="text-sm text-gray-500">
                        ID: {student._id}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div>{student.email}</div>
                  <div className="text-sm text-gray-500">{student.phone}</div>
                </td>

                <td className="px-6 py-4">
                  <div>{student.course}</div>
                  <div className="text-sm text-gray-500">
                    Semester {student.semester}
                  </div>
                </td>

                <td className="px-6 py-4">
                  {getStatusBadge(student.status)}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(student.enrollmentDate).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => onEdit(student)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleBlockStudent(student)}
                      className={`${
                        student.isBlocked
                          ? 'text-green-600 hover:text-green-900'
                          : 'text-red-600 hover:text-red-900'
                      }`}
                    >
                      {student.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t bg-gray-50 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {currentStudents.length} of {filteredStudents.length} students
        </p>

        <div className="flex space-x-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
