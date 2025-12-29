import React from 'react';
import { BarChart3, TrendingUp, BookOpen, Award, Calendar, Target, AlertCircle } from 'lucide-react';
import AdminHeader from '../Components/Header';

export default function Dashboard() {
  const courses = [
    { name: 'Mathematics', current: 85, predicted: 88, progress: 75, color: 'bg-blue-500' },
    { name: 'Physics', current: 78, predicted: 82, progress: 60, color: 'bg-purple-500' },
    { name: 'Chemistry', current: 92, predicted: 94, progress: 85, color: 'bg-green-500' },
    { name: 'English', current: 88, predicted: 90, progress: 70, color: 'bg-yellow-500' }
  ];

  const upcomingAssignments = [
    { subject: 'Mathematics', title: 'Calculus Test', date: 'Nov 25', weight: '20%' },
    { subject: 'Physics', title: 'Lab Report', date: 'Nov 27', weight: '15%' },
    { subject: 'Chemistry', title: 'Final Project', date: 'Dec 2', weight: '25%' }
  ];

  const recentActivity = [
    { action: 'Quiz submitted', subject: 'Mathematics', score: '92%', time: '2 hours ago' },
    { action: 'Assignment graded', subject: 'English', score: '88%', time: '1 day ago' },
    { action: 'Test completed', subject: 'Physics', score: '85%', time: '2 days ago' }
  ];

  const stats = [
    { icon: BarChart3, label: 'Overall GPA', value: '3.65', change: '+0.12' },
    { icon: Target, label: 'Target GPA', value: '3.80', change: 'Goal' },
    { icon: BookOpen, label: 'Active Courses', value: '4', change: 'This Sem' },
    { icon: Award, label: 'Completed', value: '12', change: 'Assignments' }
  ];

  return (
    <div>
      <AdminHeader></AdminHeader>
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Track your progress and achieve your goals</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-indigo-100 p-2 sm:p-2.5 rounded-lg">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Performance */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Course Performance</h2>
              <div className="space-y-4">
                {courses.map((course, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900">{course.name}</span>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="text-gray-600">Current: <span className="font-semibold">{course.current}%</span></span>
                        <span className="text-indigo-600">Predicted: <span className="font-semibold">{course.predicted}%</span></span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-full ${course.color} rounded-full transition-all`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="bg-indigo-100 p-2 rounded-lg flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-600">{activity.subject}</p>
                        </div>
                        <span className="text-sm font-semibold text-indigo-600">{activity.score}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Upcoming</h2>
              <div className="space-y-3">
                {upcomingAssignments.map((assignment, idx) => (
                  <div key={idx} className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-900">{assignment.title}</h3>
                      <span className="text-xs font-medium text-indigo-600 bg-white px-2 py-0.5 rounded-full">
                        {assignment.weight}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{assignment.subject}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{assignment.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium">
                  Add New Grade
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                  View All Courses
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
