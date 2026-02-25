import { API_BASE_URL } from '../../../config';
import { GraduationCap, Bell } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TeacherHeader() {
    const navigate = useNavigate();
    const [notificationCount, setNotificationCount] = useState(0);
    const teacherData = JSON.parse(localStorage.getItem('teacherData') || '{}');

    useEffect(() => {
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchUnreadCount = async () => {
        try {
            const token = localStorage.getItem('teacherToken');
            if (!token) return;
            
            const response = await axios.get(`${API_BASE_URL}/api/teacher/notifications/unread-count`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotificationCount(response.data.count || 0);
        } catch (error) {
            console.log('No notifications or error fetching count');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('teacherToken');
        localStorage.removeItem('role');
        localStorage.removeItem('teacherData');
        navigate('/login');
    };

    // Helper to check active path
    const isActive = (path) => window.location.pathname === path;

  return (
    <nav className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/faculty/dashboard')}>
            <div className="bg-cyan-500/10 p-2 rounded-xl group-hover:bg-cyan-500/20 transition-all">
              <GraduationCap className="text-cyan-400 w-8 h-8" />
            </div>
            <div className="flex flex-col text-left">
              <h1 className="text-lg font-black text-white tracking-tighter leading-none">
                SCORION <span className="text-cyan-400">FACULTY</span>
              </h1>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none mt-1">Academic Control</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {[
              { label: 'Dashboard', path: '/faculty/dashboard' },
              { label: 'Students', path: '/faculty/students' },
              { label: 'Marks', path: '/faculty/marks' },
            ].map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  isActive(link.path)
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Section: Profile & Logout */}
          <div className="flex items-center gap-6">
            <button
               onClick={() => navigate('/faculty/notifications')}
               className="relative p-2.5 hover:bg-slate-800 rounded-2xl transition group border border-transparent hover:border-slate-700"
            >
                <Bell className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition" />
                {notificationCount > 0 && (
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-cyan-500 rounded-full border border-slate-950 animate-pulse"></span>
                )}
            </button>

            <div className="hidden lg:flex flex-col items-end">
              <span className="text-xs font-black text-white uppercase tracking-wider">{teacherData.name || 'Faculty'}</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{teacherData.department || 'Staff'}</span>
            </div>
            
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TeacherHeader