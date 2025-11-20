import React, { useState } from 'react';
import { Users, TrendingUp, Award, Search, Filter } from 'lucide-react';

export default function StudentGradeTable() {
  const [students] = useState([
    {
      id: 1,
      name: "Christian Anderson",
      email: "christian.anderson@university.edu",
      department: "BBA",
      semester: "2nd Semester",
      currentGrade: 85,
      predictedGrade: 88,
      status: "Pass"
    },
    {
      id: 2,
      name: "Sarah Martinez",
      email: "sarah.martinez@university.edu",
      department: "Physics",
      semester: "2nd Semester",
      currentGrade: 92,
      predictedGrade: 94,
      status: "Pass"
    },
    {
      id: 3,
      name: "John Doe",
      email: "john.doe@university.edu",
      department: "BCA",
      semester: "2nd Semester",
      currentGrade: 78,
      predictedGrade: 82,
      status: "Pass"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const passMark = 40;
  const totalStudents = students.length;
  const averageScore = Math.round(
    students.reduce((acc, student) => acc + student.currentGrade, 0) / totalStudents
  );
  const passedStudents = students.filter(s => s.currentGrade >= passMark).length;

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGradeColor = (grade) => {
    if (grade >= 90) return "text-green-600 bg-green-50";
    if (grade >= 75) return "text-blue-600 bg-blue-50";
    if (grade >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getTrendIcon = (current, predicted) => {
    if (predicted > current) {
      return <TrendingUp size={16} className="text-green-500" />;
    } else if (predicted < current) {
      return <TrendingUp size={16} className="text-red-500 rotate-180" />;
    }
    return <span className="text-gray-400">−</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            SCORION
          </h1>
          <p className="text-gray-600">Track and predict student performance</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              <Filter size={20} />
              <span className="hidden md:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Student Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Semester</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Current Grade</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Predicted Grade</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Trend</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-gray-800">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{student.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        {student.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{student.semester}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-lg font-bold ${getGradeColor(student.currentGrade)}`}>
                        {student.currentGrade}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-lg font-bold ${getGradeColor(student.predictedGrade)}`}>
                        {student.predictedGrade}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getTrendIcon(student.currentGrade, student.predictedGrade)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        student.status === "Pass" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-lg">{student.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{student.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    student.status === "Pass" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {student.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Department</span>
                    <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      {student.department}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Semester</span>
                    <span className="text-sm text-gray-700 font-medium">{student.semester}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="text-center flex-1">
                    <span className="text-xs text-gray-500 block mb-1">Current</span>
                    <span className={`inline-block px-2 py-1 rounded-lg font-bold text-sm ${getGradeColor(student.currentGrade)}`}>
                      {student.currentGrade}%
                    </span>
                  </div>
                  <div className="px-2">
                    {getTrendIcon(student.currentGrade, student.predictedGrade)}
                  </div>
                  <div className="text-center flex-1">
                    <span className="text-xs text-gray-500 block mb-1">Predicted</span>
                    <span className={`inline-block px-2 py-1 rounded-lg font-bold text-sm ${getGradeColor(student.predictedGrade)}`}>
                      {student.predictedGrade}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm md:text-base font-medium opacity-90">Total Students</h3>
              <Users size={24} className="opacity-80" />
            </div>
            <p className="text-3xl md:text-4xl font-bold">{totalStudents}</p>
            <p className="text-sm opacity-75 mt-1">{passedStudents} students passing</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm md:text-base font-medium opacity-90">Average Score</h3>
              <TrendingUp size={24} className="opacity-80" />
            </div>
            <p className="text-3xl md:text-4xl font-bold">{averageScore}%</p>
            <p className="text-sm opacity-75 mt-1">Class performance</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm md:text-base font-medium opacity-90">Pass Mark</h3>
              <Award size={24} className="opacity-80" />
            </div>
            <p className="text-3xl md:text-4xl font-bold">{passMark}%</p>
            <p className="text-sm opacity-75 mt-1">Minimum requirement</p>
          </div>
        </div>
      </div>
    </div>
  );
}