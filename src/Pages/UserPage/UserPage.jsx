import React, { useState } from 'react';
import { User, Calendar, BookOpen, TrendingUp, Award, GraduationCap } from 'lucide-react';
import Header from '../../Components/UserSide/Header';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [showPrediction, setShowPrediction] = useState(false);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/GPresult');
  }
  
  const studentData = {
    name: 'john doe',
    id: 'BCA - 2nd semester',
    overallGrade: '86.6%',
    gradeLabel: 'GRADE A',
    attendance: {
      totalDays: 120,
      classesAttended: 108,
      classesMissed: 12,
      attendanceRate: '90%'
    },
    subjects: [
      { name: 'Data Structures', obtained: 85, total: 100, percentage: 85.0 },
      { name: 'Database Systems', obtained: 82, total: 100, percentage: 82.0 },
      { name: 'Web Development', obtained: 88, total: 100, percentage: 88.0 },
      { name: 'Operating Systems', obtained: 81, total: 100, percentage: 78.0 },
      { name: 'Software Engineering', obtained: 93, total: 100, percentage: 93.0 }
    ],
    performance: {
      monthlyAverage: '84.0%',
      semesterGrade: '78.0%',
      bestSubject: 'Software Engineering',
      improvement: '+5%'
    }
  };

  const predictedGrade = '88.5%';
  const predictedLabel = 'GRADE A';

  const getColorByPercentage = (percentage) => {
    if (percentage >= 90) return 'from-purple-500 to-purple-600';
    if (percentage >= 80) return 'from-blue-500 to-blue-600';
    if (percentage >= 70) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div>
      <Header></Header>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 capitalize">{studentData.name}</h1>
                <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                  {studentData.id}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <p className="text-xs text-gray-500 mb-1">Overall Grade</p>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600">{studentData.overallGrade}</p>
              <p className="text-xs sm:text-sm text-green-600 font-semibold mt-1">{studentData.gradeLabel}</p>
            </div>
          </div>
        </div>

        {/* Attendance Details */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Attendance Details</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4 border border-blue-200">
              <p className="text-xs sm:text-sm text-blue-600 mb-1 sm:mb-2">Total Days</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-700">{studentData.attendance.totalDays}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4 border border-green-200">
              <p className="text-xs sm:text-sm text-green-600 mb-1 sm:mb-2">Classes Attended</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-700">{studentData.attendance.classesAttended}</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-3 sm:p-4 border border-red-200">
              <p className="text-xs sm:text-sm text-red-600 mb-1 sm:mb-2">Classes Missed</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-700">{studentData.attendance.classesMissed}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 sm:p-4 border border-purple-200">
              <p className="text-xs sm:text-sm text-purple-600 mb-1 sm:mb-2">Attendance Rate</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-700">{studentData.attendance.attendanceRate}</p>
            </div>
          </div>
        </div>

        {/* Subject Marks */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Subject Marks</h2>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:shadow-lg transition-all">
              + Add Subject
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {studentData.subjects.map((subject, index) => (
              <div key={index} className="group hover:bg-gray-50 rounded-xl p-3 sm:p-4 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{subject.name}</h3>
                  <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                    <span className="text-gray-600">
                      {subject.obtained}/{subject.total}
                    </span>
                    <span className="font-bold text-purple-600">{subject.percentage.toFixed(1)}%</span>
                    <button className="text-purple-600 hover:text-purple-800 font-medium hidden sm:block">
                      Update
                    </button>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getColorByPercentage(subject.percentage)} rounded-full transition-all duration-500 group-hover:shadow-lg`}
                    style={{ width: `${subject.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 text-white">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
            <h2 className="text-lg sm:text-xl font-bold">Performance Summary</h2>
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 w-full lg:w-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                <p className="text-xs sm:text-sm text-white/80 mb-1 sm:mb-2">Monthly Average</p>
                <p className="text-xl sm:text-2xl font-bold">{studentData.performance.monthlyAverage}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                <p className="text-xs sm:text-sm text-white/80 mb-1 sm:mb-2">Semester Grade</p>
                <p className="text-xl sm:text-2xl font-bold">{studentData.performance.semesterGrade}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 col-span-2 sm:col-span-1">
                <p className="text-xs sm:text-sm text-white/80 mb-1 sm:mb-2">Best Subject</p>
                <p className="text-sm sm:text-base font-bold truncate">{studentData.performance.bestSubject}</p>
              </div>
            </div>
            <div className="text-left lg:text-right w-full lg:w-auto">
              <p className="text-xs sm:text-sm text-white/80 mb-1">Overall Grade</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold">{studentData.overallGrade}</p>
            </div>
          </div>
        </div>

        {/* Predict Grade Button */}
        <button 
         onClick={handleButtonClick}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 sm:py-5 rounded-2xl shadow-xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:scale-[1.02]"
        >
          <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
          Predict Grade
        </button>

        
      </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
