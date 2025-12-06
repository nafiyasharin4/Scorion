// components/TeacherList.js
import React, { useState } from 'react';

const TeacherList = ({ teachers, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || teacher.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

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

  const departments = [...new Set(teachers.map(teacher => teacher.department))];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header with Filters */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Faculty Members</h2>
            <p className="text-gray-600 text-sm lg:text-base">
              Total: <span className="font-semibold text-blue-600">{filteredTeachers.length}</span> teachers
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 bg-white shadow-sm"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 bg-white shadow-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 bg-white shadow-sm"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                Teacher
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                Department & Subject
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                Qualification
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTeachers.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-20 h-20 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-xl font-semibold text-gray-900 mb-2">No teachers found</p>
                    <p className="text-gray-500 max-w-md">Try adjusting your search criteria or filters to find what you're looking for.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-blue-50 transition duration-150 group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-14 w-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition duration-200">
                        <span className="text-white font-bold text-lg">
                          {teacher.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition duration-150">
                          {teacher.name}
                        </div>
                        <div className="text-sm text-gray-500">{teacher.email}</div>
                        <div className="text-sm text-gray-400">{teacher.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base font-semibold text-gray-900">{teacher.department}</div>
                    <div className="text-sm text-blue-600 font-medium">{teacher.subject}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 max-w-xs">{teacher.qualification}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{teacher.experience}</div>
                    <div className="text-sm text-gray-500">
                      Since {new Date(teacher.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(teacher.status)}
                    <div className="text-sm font-semibold text-gray-900 mt-1">{teacher.salary}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onEdit(teacher)}
                        className="text-blue-600 hover:text-blue-900 transition duration-150 flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => onDelete(teacher.id)}
                        className="text-red-600 hover:text-red-900 transition duration-150 flex items-center space-x-2 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
          <p className="text-sm text-gray-600 font-medium">
            Displaying <span className="text-blue-600 font-bold">{filteredTeachers.length}</span> of{' '}
            <span className="text-blue-600 font-bold">{teachers.length}</span> faculty members
          </p>
          {filteredTeachers.length < teachers.length && (
            <p className="text-sm text-gray-500">
              Filtered by: 
              {statusFilter !== 'all' && <span className="font-semibold text-blue-600 ml-1">Status: {statusFilter}</span>}
              {statusFilter !== 'all' && departmentFilter !== 'all' && <span className="mx-1">•</span>}
              {departmentFilter !== 'all' && <span className="font-semibold text-blue-600">Department: {departmentFilter}</span>}
              {searchTerm && <span className="font-semibold text-blue-600 ml-1">• Search: "{searchTerm}"</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherList;