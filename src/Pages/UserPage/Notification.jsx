import React, { useState } from 'react';
import {
  AlertTriangle,
  User,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  Shield
} from 'lucide-react';

import Header from '../../Components/UserSide/Header';

export default function ParentAttendanceAlert() {
  const [isVisible, setIsVisible] = useState(true);

  // Student data
  const studentData = {
    name: 'Rahul Kumar',
    class: 'BCA',
    rollNumber: '34',
    photo: 'RK',
    attendancePercentage: 68,
    totalDays: 180,
    daysPresent: 122,
    daysAbsent: 58,
    requiredPercentage: 75
  };

  // Monthly attendance data
  const monthlyData = [
    { month: 'Aug', present: 18, absent: 4 },
    { month: 'Sep', present: 16, absent: 6 },
    { month: 'Oct', present: 20, absent: 2 },
    { month: 'Nov', present: 15, absent: 7 },
    { month: 'Dec', present: 14, absent: 8 }
  ];

  // Semester-wise attendance
  const semesterAttendance = [
    { semester: 'Semester 1', attendance: 72, status: 'warning' },
    { semester: 'Semester 2', attendance: 65, status: 'critical' },
    { semester: 'Semester 3', attendance: 70, status: 'warning' },
    { semester: 'Semester 4', attendance: 68, status: 'critical' },
    { semester: 'Semester 5', attendance: 60, status: 'critical' },
    { semester: 'Semester 6', attendance: 77, status: 'warning' }
  ];

  const maxPresent = Math.max(...monthlyData.map(m => m.present));

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ✅ ADDED HEADER COMPONENT HERE */}
      <Header title="Parent Attendance Alert" />

      {/* Old Red Header stays as it is */}
      <div className="bg-white border-b-4 border-red-500 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 sm:p-4 rounded-2xl">
                <AlertTriangle className="text-red-600" size={32} />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Low Attendance Alert
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <Shield className="text-indigo-600" size={18} />
                  <p className="text-sm sm:text-base text-indigo-600 font-semibold">
                    Parent Access Only
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 border-2 border-red-200 px-4 py-2 rounded-xl">
              <p className="text-xs text-red-600 font-semibold uppercase tracking-wide">
                Urgent Action Required
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">

        {/* Student Info Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 animate-fadeIn">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">

            {/* Profile */}
            <div className="flex flex-col sm:flex-row items-center gap-6 flex-1">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                  {studentData.photo}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                  <User className="text-gray-600" size={20} />
                </div>
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {studentData.name}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mt-1">
                  {studentData.class}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Roll Number:{' '}
                  <span className="font-semibold text-gray-700">
                    {studentData.rollNumber}
                  </span>
                </p>
              </div>
            </div>

            {/* Circular Progress */}
            <div className="relative flex items-center justify-center">
              <svg className="transform -rotate-90" width="160" height="160">
                <circle cx="80" cy="80" r="70" stroke="#fee2e2" strokeWidth="12" fill="none" />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#dc2626"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - studentData.attendancePercentage / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-red-600">
                  {studentData.attendancePercentage}%
                </span>
                <span className="text-xs text-gray-600 mt-1">Attendance</span>
              </div>
            </div>

          </div>
        </div>

        {/* Alert message */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-600 rounded-2xl shadow-lg p-6 sm:p-8 animate-fadeIn">
          <div className="flex items-start gap-4">
            <div className="bg-red-600 p-3 rounded-xl flex-shrink-0">
              <AlertTriangle className="text-white" size={28} />
            </div>

            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-red-900 mb-3">
                Attendance Below Required Level
              </h3>
              <p className="text-base sm:text-lg text-red-800 mb-6">
                Your child's attendance has fallen below the required 75%.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="text-indigo-600" size={20} />
                    <p className="text-xs text-gray-600 font-semibold uppercase">Total Days</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{studentData.totalDays}</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <p className="text-xs text-gray-600 font-semibold uppercase">Days Present</p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{studentData.daysPresent}</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <XCircle className="text-red-600" size={20} />
                    <p className="text-xs text-gray-600 font-semibold uppercase">Days Absent</p>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{studentData.daysAbsent}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 animate-fadeIn">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="text-indigo-600" size={24} /> Monthly Attendance Breakdown
          </h3>

          <div className="mb-8">
            <div className="flex items-end justify-between gap-2 sm:gap-4 h-64">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg"
                      style={{ height: `${(data.present / maxPresent) * 200}px` }}
                    >
                      <div className="text-white text-xs sm:text-sm font-bold text-center pt-2">
                        {data.present}
                      </div>
                    </div>

                    <div
                      className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-b-lg"
                      style={{ height: `${(data.absent / maxPresent) * 200}px` }}
                    >
                      <div className="text-white text-xs sm:text-sm font-bold text-center pt-2">
                        {data.absent}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">{data.month}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Semester */}
          <h4 className="text-lg font-bold text-gray-900 mb-4">Semester-wise Attendance</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {semesterAttendance.map((semester, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-gray-900">{semester.semester}</p>
                  <span
                    className={`text-lg font-bold ${
                      semester.status === 'critical' ? 'text-red-600' : 'text-yellow-600'
                    }`}
                  >
                    {semester.attendance}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      semester.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${semester.attendance}%` }}
                  ></div>
                </div>

                <p className="text-xs text-gray-600 mt-2">
                  {semester.status === 'critical'
                    ? '⚠️ Critical - Below 70%'
                    : '⚠️ Warning - Below 75%'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3">ISS ARTS AND SCIENCE COLLEGE</h3>
              <p className="text-gray-400 text-sm mb-4">
                Committed to Excellence in Education
              </p>
              <p className="text-gray-400 text-sm">
                © 2026 ISS ARTS AND SCIENCE COLLEGE. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-3">Support & Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="text-indigo-400" size={18} />
                  <span className="text-gray-300 text-sm">04933297481</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-indigo-400" size={18} />
                  <span className="text-gray-300 text-sm">issascpmna@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-indigo-400" size={18} />
                  <span className="text-gray-300 text-sm">Mon–Fri: 9:30am – 3:30pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
