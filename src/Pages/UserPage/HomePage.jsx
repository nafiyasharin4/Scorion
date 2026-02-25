import { API_BASE_URL } from '../../config';
import React, { useState, useEffect } from 'react';
import { GraduationCap, TrendingUp, ShieldCheck, Activity } from 'lucide-react';
import Header from '../../Components/UserSide/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function GradePredictorHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const role = localStorage.getItem('role');
      const tokenKey = role === 'teacher' ? 'teacherToken' : 'userToken';
      const token = localStorage.getItem(tokenKey);
      
      const endpoint = role === 'teacher' 
        ? `${API_BASE_URL}/api/teacher/profile`
        : `${API_BASE_URL}/api/user/profile`;
      
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data) {
        setUser(res.data);
      } else {
        console.error('Home identity sync failed: No data');
      }
    } catch (err) {
      console.error('Home identity sync failed:', err);
      // Optional: toast.error('Identity sync failed');
    }
  };

  const handleDashboard = () => {
    const role = localStorage.getItem('role');
    navigate(role === 'teacher' ? '/faculty/dashboard' : '/userprofile');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-indigo-500/20">
      <Header />
      
      {/* Hero Sector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Descriptive Loadout */}
          <div className="space-y-12">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200">
                <GraduationCap className="text-white w-8 h-8" />
              </div>
              <div className="h-px w-20 bg-slate-200"></div>
            </div>
            
            <div className="space-y-4">
              <p className="text-indigo-600 font-black uppercase tracking-[0.4em] text-[10px]">Scorion Predictive Intelligence</p>
              <h1 className="text-6xl lg:text-7xl font-black text-slate-900 leading-none tracking-tight">
                Welcome, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 capitalize">
                  {user?.name?.split(' ')[0] || 'Member'}
                </span>
              </h1>
            </div>
            
            <p className="text-xl text-slate-500 leading-relaxed font-bold max-w-lg">
              Unlock the power of <span className="text-indigo-600">predictive analytics</span>. Monitor attendance, simulate semester outcomes, and navigate your academic journey with precision.
            </p>

            <div className="flex flex-wrap gap-5 pt-4">
              <button 
                onClick={handleDashboard}
                className="px-8 py-4 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95 border-b-4 border-indigo-900"
              >
                Access Hub
              </button>
              <button 
                onClick={handleDashboard}
                className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-600 font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-3 shadow-sm"
              >
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                Analyze Performance
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-slate-100">
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" /> Distributed Ledger
                  </p>
                  <p className="text-lg font-black text-slate-800">100% Secure</p>
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Activity className="w-3 h-3 text-indigo-500" /> Neural Sync
                  </p>
                  <p className="text-lg font-black text-slate-800">Real-time Data</p>
               </div>
            </div>
          </div>

          {/* Visual Matrix */}
          <div className="relative group p-4">
            <div className="absolute inset-0 bg-indigo-600/5 rounded-[4rem] group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="relative bg-white rounded-[3rem] shadow-2xl p-6 border border-slate-50 transition-transform duration-700 group-hover:rotate-1 overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-700"></div>
               <img
                src="https://img.freepik.com/premium-vector/young-boy-with-glasses-jumping-air-holding-up-paper-with-prominent-grade_995281-850.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Intellectual Success"
                className="w-full h-auto rounded-[2rem] transition-all duration-1000"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white/95 to-transparent">
                 <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-1">Academic Projection</p>
                 <p className="text-2xl font-black text-slate-900">Visualizing Potential.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}