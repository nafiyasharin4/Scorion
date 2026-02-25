

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, TrendingUp, BookOpen, Award, Calendar, Target, AlertCircle, Clock, Zap, Star, Megaphone, FileText, ShieldCheck } from 'lucide-react';
import AdminHeader from '../Components/Header';
import toast from 'react-hot-toast';
import { exportInstitutionalSummaryToExcel } from '../../../utils/exportUtils';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [greeting, setGreeting] = useState('Welcome back');
  const [stats, setStats] = useState([]);
  const [systemEvents, setSystemEvents] = useState([]);
  const [courseMetrics, setCourseMetrics] = useState([]);
  const [upcomingItems, setUpcomingItems] = useState([]);
  const [allMarksData, setAllMarksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good morning');
    else if (hours < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    fetchStats();
  }, []);

  const handleGlobalBroadcast = async () => {
    const title = prompt("Enter Global Broadcast Title:");
    const message = prompt("Enter Broadcast Message:");
    
    if (!title || !message) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${API_BASE_URL}/api/admin/broadcast-global`, 
        { title, message, severity: 'critical' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Global broadcast sent to all users!");
    } catch (err) {
      console.error("Failed to broadcast:", err);
      toast.error("Failed to send global broadcast.");
    }
  };

  const handleExportInstitutional = () => {
    if (allMarksData.length === 0) {
      toast.error("No institutional data available to export.");
      return;
    }
    exportInstitutionalSummaryToExcel(allMarksData);
    toast.success("Institutional audit report generated!");
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${API_BASE_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data.stats);
      setSystemEvents(res.data.systemEvents);
      setCourseMetrics(res.data.courseMetrics || []);
      setUpcomingItems(res.data.upcomingAlerts || []);
      setAllMarksData(res.data.allMarks || []);
    } catch (err) {
      console.error('Failed to fetch admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const upcomingAssignments = upcomingItems; // Use dynamic items now

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

        {/* Dashboard Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                {greeting}, <span className="text-cyan-400">Admin</span>
              </h1>
              <p className="text-slate-400 font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                System performance is optimal. Analytics updated 5m ago.
              </p>
            </div>
            <div className="flex items-center gap-3">
               <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-300">Term: FALL 2026</span>
               </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {loading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="bg-slate-800/50 h-32 animate-pulse rounded-2xl border border-slate-700/50"></div>
            ))
          ) : (
            stats.map((stat, idx) => {
              const Icon = {
                'Institutional Avg': BarChart3,
                'Total Students': Target,
                'Active Teachers': BookOpen,
                'Active Courses': Award
              }[stat.label] || Zap;

              return (
                <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-slate-900 p-3 rounded-xl ring-1 ring-slate-700 group-hover:ring-indigo-500/50 transition-all">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
                      stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700/50 text-slate-400'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                </div>
              );
            })
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Performance Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-8 py-6 bg-slate-900/50 border-b border-slate-700/50 flex items-center justify-between">
                <h2 className="text-lg font-black text-white uppercase tracking-tight">Academic Pulse</h2>
                <div className="flex gap-1">
                   {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>)}
                </div>
              </div>
              <div className="p-8 space-y-7">
                {courseMetrics.length > 0 ? (
                  courseMetrics.map((course, idx) => (
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
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">No course performance data</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Logs/Activity */}
            <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-8 py-6 bg-slate-900/50 border-b border-slate-700/50 flex justify-between items-center">
                <h2 className="text-lg font-black text-white uppercase tracking-tight">System Events</h2>
                <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300">View Logs</button>
              </div>
              <div className="p-4">
                {systemEvents.length > 0 ? (
                  systemEvents.map((act, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-700/30 rounded-2xl transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-700 group-hover:border-slate-600 transition-all">
                          {act.type === 'system' && <Zap className="w-4 h-4 text-amber-400" />}
                          {act.type === 'security' && <AlertCircle className="w-4 h-4 text-rose-400" />}
                          {act.type === 'user' && <Star className="w-4 h-4 text-cyan-400" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-200">{act.action}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{act.time}</p>
                        </div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-indigo-500"></div>
                    </div>
                  ))
                ) : (
                  <p className="p-8 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">No recent system events</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-6 py-5 bg-slate-900/50 border-b border-slate-700/50">
                <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  Upcoming
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingAssignments.map((assignment, idx) => (
                  <div key={idx} className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl hover:border-slate-600 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-bold text-white mb-1">{assignment.title}</h3>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{assignment.subject}</p>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded ${
                        assignment.priority === 'Urgent' ? 'bg-rose-500/20 text-rose-400' : 'bg-indigo-500/20 text-indigo-400'
                      }`}>
                        {assignment.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                      <div className="flex items-center gap-1">
                         <Clock className="w-3 h-3" />
                         <span>{assignment.date}</span>
                      </div>
                      <span className="text-slate-400 uppercase font-black tracking-widest">{assignment.weight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Control Center */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <h2 className="text-lg font-black text-white mb-6 relative z-10 tracking-tight">Control Center</h2>
                <div className="space-y-2 relative z-10">
                  <button 
                    onClick={handleExportInstitutional}
                    className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all text-white font-bold text-xs uppercase tracking-widest"
                  >
                    Institutional Export
                    <FileText className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => navigate('/admin/faculty')}
                    className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all text-white font-bold text-xs uppercase tracking-widest"
                  >
                    Security Audit
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleGlobalBroadcast}
                    className="w-full flex items-center justify-between p-4 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/20 rounded-2xl transition-all text-white font-bold text-xs uppercase tracking-widest"
                  >
                    Global Broadcast
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




