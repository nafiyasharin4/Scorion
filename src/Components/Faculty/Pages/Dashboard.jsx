import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, TrendingUp, BookOpen, Award, Calendar, Target, AlertCircle, Clock, Users, Megaphone, FileText, Settings } from 'lucide-react';
import TeacherHeader from '../Components/Header';
import toast from 'react-hot-toast';
import { exportDeptSummaryToExcel } from '../../../utils/exportUtils';
import { useNavigate } from 'react-router-dom';

export default function FacultyDashboard() {
  const [data, setData] = useState({
    students: [],
    marks: [],
    profile: null,
    loading: true
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSendDeptAlert = async () => {
    const title = prompt("Enter Alert Title:");
    const message = prompt("Enter Alert Message:");
    
    if (!title || !message) return;

    try {
      const token = localStorage.getItem('teacherToken');
      await axios.post('http://localhost:5000/api/teacher/dept-alert', 
        { title, message, severity: 'warning' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Department alert sent successfully!");
    } catch (err) {
      console.error("Failed to send alert:", err);
      toast.error("Failed to send department alert.");
    }
  };

  const handleExportDept = () => {
    if (data.marks.length === 0) {
      toast.error("No data available to export.");
      return;
    }
    exportDeptSummaryToExcel(data.marks, data.profile?.department || 'Department');
    toast.success("Department report generated!");
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('teacherToken');
      const [stuRes, markRes, profileRes] = await Promise.all([
        axios.get('http://localhost:5000/api/teacher/studentsearch/', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/teacher/marks', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/teacher/profile', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      const localTeacher = JSON.parse(localStorage.getItem('teacherData') || '{}');
      setData({
        students: stuRes.data.students,
        marks: markRes.data.marks,
        profile: { ...localTeacher, ...profileRes.data },
        loading: false
      });
    } catch (err) {
      console.error('Dashboard synchronization failed:', err);
      const localTeacher = JSON.parse(localStorage.getItem('teacherData') || '{}');
      setData(prev => ({ 
        ...prev, 
        profile: localTeacher,
        loading: false 
      }));
    }
  };

  const calculateStats = () => {
    const totalStudents = data.students.length;
    const activeStudents = data.students.filter(s => s.status?.toLowerCase() === 'active').length;
    
    const uniqueCourses = [...new Set(data.students.map(s => s.course))].filter(Boolean);
    
    // Average SGPA across all recordable marks
    const allSGPAs = data.marks.map(m => m.sgpa).filter(val => val > 0);
    const avgGPA = allSGPAs.length > 0 
      ? (allSGPAs.reduce((a, b) => a + b, 0) / allSGPAs.length).toFixed(2)
      : '0.00';

    return [
      { icon: BarChart3, label: 'Dept. Avg Performance', value: avgGPA, change: 'LIVE', color: 'text-cyan-400' },
      { icon: Users, label: 'Total Students', value: totalStudents.toString(), change: 'DB Sync', color: 'text-indigo-400' },
      { icon: BookOpen, label: 'Active Domains', value: uniqueCourses.length.toString(), change: 'Faculties', color: 'text-purple-400' },
      { icon: Target, label: 'Active Personnel', value: activeStudents.toString(), change: 'Operational', color: 'text-emerald-400' }
    ];
  };

  const getCourseData = () => {
    const courseStats = {};
    data.marks.forEach(m => {
      const cName = m.student?.course || 'Unknown';
      if (!courseStats[cName]) {
        courseStats[cName] = { totalSGPA: 0, count: 0 };
      }
      courseStats[cName].totalSGPA += m.sgpa;
      courseStats[cName].count += 1;
    });

    return Object.keys(courseStats).map((name, idx) => {
      const avg = (courseStats[name].totalSGPA / courseStats[name].count).toFixed(1);
      const colors = ['bg-indigo-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500'];
      return {
        name,
        current: Math.min(Math.round(parseFloat(avg) * 10), 100),
        progress: Math.min(Math.round(parseFloat(avg) * 10), 100),
        color: colors[idx % colors.length],
        predicted: Math.min(Math.round(parseFloat(avg) * 10 + 5), 100)
      };
    }).slice(0, 4);
  };

  const courses = getCourseData();

  const getUpcomingAlerts = () => {
    return data.marks
      .filter(m => m.attendancePercentage && m.attendancePercentage < 40)
      .map(m => ({
        subject: m.student?.course || 'Student',
        title: `Low Attendance: ${m.student?.name}`,
        date: `Sem ${m.semester}`,
        weight: `${m.attendancePercentage}%`,
        priority: 'Urgent'
      }))
      .slice(0, 3);
  };

  const upcomingAssignments = getUpcomingAlerts();

  const recentActivity = data.marks.slice(-3).reverse().map(m => ({
    action: 'Score Published',
    subject: m.student?.name || 'Student',
    score: `${m.sgpa} SGPA`,
    time: 'Recent'
  }));

  const stats = calculateStats();

  if (data.loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <TeacherHeader />
      
      <main className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-cyan-500/20">
                {data.profile?.name?.charAt(0) || 'F'}
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">
                  Welcome back, <span className="text-cyan-400">{data.profile?.name || 'Faculty'}</span>
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Registry Monitoring & Oversight</span>
                  <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                  <span className="text-indigo-400 font-black uppercase tracking-widest text-[10px]">{data.profile?.department || 'Department N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-slate-900 p-3 rounded-xl ring-1 ring-slate-700 group-hover:ring-indigo-500/50 transition-all">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-slate-950 text-slate-500 border border-slate-700">
                  {stat.change}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Performance */}
            <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-8 py-6 bg-slate-900/50 border-b border-slate-700/50 flex items-center justify-between">
                <h2 className="text-lg font-black text-white uppercase tracking-tight">Course Performance</h2>
                <div className="flex gap-1">
                   {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>)}
                </div>
              </div>
              <div className="p-8 space-y-7">
                {courses.length > 0 ? (
                  courses.map((course, idx) => (
                    <div key={idx} className="space-y-3 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${course.color} shadow-lg shadow-indigo-500/20`}></div>
                          <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{course.name}</span>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Avg: <span className="text-slate-300">{course.current}%</span></span>
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-cyan-500/10 rounded-lg">
                             <TrendingUp className="w-3 h-3 text-cyan-400" />
                             <span className="text-[11px] font-black text-cyan-400 uppercase tracking-widest">{course.predicted}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-0.5">
                        <div 
                          className={`h-full ${course.color} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(79,70,229,0.3)]`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center">
                    <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-3 opacity-20" />
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">No course metrics recorded yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-8 py-6 bg-slate-900/50 border-b border-slate-700/50 flex justify-between items-center">
                <h2 className="text-lg font-black text-white uppercase tracking-tight">Recent Activity</h2>
                <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300">View All</button>
              </div>
              <div className="p-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 hover:bg-slate-700/30 rounded-2xl transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-700 group-hover:border-slate-600 transition-all">
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-bold text-slate-200">{activity.action}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{activity.subject}</p>
                          </div>
                          <span className="text-sm font-black text-indigo-400">{activity.score}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{activity.time}</p>
                      </div>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-indigo-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Assignments */}
            <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-6 py-5 bg-slate-900/50 border-b border-slate-700/50">
                <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  Upcoming
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingAssignments.length > 0 ? (
                  upcomingAssignments.map((assignment, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl hover:border-slate-600 transition-all group">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-sm font-bold text-white mb-1">{assignment.title}</h3>
                          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{assignment.subject}</p>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
                          {assignment.weight}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2 text-[10px] font-bold text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{assignment.date}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">Queue empty - schedule stable</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <h2 className="text-lg font-black text-white mb-6 relative z-10 tracking-tight">Quick Controls</h2>
                <div className="space-y-2 relative z-10">
                  <button 
                    onClick={handleExportDept}
                    className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all text-white font-bold text-xs uppercase tracking-widest"
                  >
                    Export Dept. Report
                    <FileText className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => navigate('/faculty/syllabus')}
                    className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all text-white font-bold text-xs uppercase tracking-widest"
                  >
                    Manage Syllabus
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleSendDeptAlert}
                    className="w-full flex items-center justify-between p-4 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/20 rounded-2xl transition-all text-white font-bold text-xs uppercase tracking-widest"
                  >
                    Send Dept. Alert
                    <Megaphone className="w-4 h-4 text-rose-300" />
                  </button>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
