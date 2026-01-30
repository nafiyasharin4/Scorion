import React, { useState, useEffect } from 'react';
import Header from '../../Components/UserSide/Header';
import { User, Mail, Shield, Book, Award, Clock, ChevronRight, Settings, LogOut, Phone, MapPin, GraduationCap, Briefcase, Activity, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const tokenKey = role === 'teacher' ? 'teacherToken' : 'userToken';
      const token = localStorage.getItem(tokenKey);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const endpoint = role === 'teacher' 
        ? 'http://localhost:5000/api/teacher/profile'
        : 'http://localhost:5000/api/user/profile';

      const res = await axios.get(endpoint, config);
      setProfile(res.data);

      if (role === 'user') {
        const marksRes = await axios.get('http://localhost:5000/api/user/marks', config);
        setMarks(marksRes.data.marks);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to sync profile identity');
      // If unauthorized, redirect might be handled by interceptor but let's be safe
      if (err.response?.status === 401) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Accessing Secure Profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const isTeacher = role === 'teacher';
  const latestMark = marks.length > 0 ? marks[marks.length - 1] : null;
  const avgGPA = marks.length > 0 
    ? (marks.reduce((acc, m) => acc + parseFloat(m.sgpa), 0) / marks.length).toFixed(2)
    : '0.00';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-indigo-500/20">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Personality Card */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-500/5 relative">
              <div className="h-44 bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 relative">
                 <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
                 <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
              </div>
              
              <div className="px-10 pb-12 relative">
                {/* Visual ID */}
                <div className="relative -mt-24 mb-6 flex justify-center">
                  <div className="w-40 h-40 bg-white border-[12px] border-white rounded-[2.5rem] flex items-center justify-center text-indigo-600 font-black text-6xl shadow-2xl shadow-indigo-500/20 overflow-hidden ring-1 ring-slate-100">
                    {profile.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute bottom-6 right-[30%] w-6 h-6 bg-emerald-500 border-4 border-white rounded-full animate-pulse shadow-lg shadow-emerald-500/30"></div>
                </div>

                <div className="text-center space-y-3">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">{profile.name}</h1>
                  <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]"></div>
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{isTeacher ? 'Faculty Authority' : 'Academic Member'}</p>
                  </div>
                </div>

                <div className="mt-12 space-y-4">
                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-[2rem] group hover:border-indigo-200 hover:bg-white transition-all cursor-default shadow-sm hover:shadow-md">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" /> Communication Node
                    </p>
                    <p className="text-sm font-bold text-slate-800 truncate">{profile.email}</p>
                  </div>
                  
                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5" /> Identity Status
                    </p>
                    <p className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                       <Activity className="w-3 h-3" />
                       Synchronized & Active
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hub Actions */}
            <div className="bg-white border border-slate-100 rounded-[3rem] p-8 space-y-3 shadow-xl shadow-indigo-500/5">
               <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 rounded-[2rem] transition-all group border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                     <Settings className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                     <span className="text-sm font-black text-slate-500 group-hover:text-slate-900 uppercase tracking-widest">Configuration</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
               </button>
               <button 
                  onClick={() => {
                    localStorage.clear();
                    navigate('/login');
                  }}
                  className="w-full flex items-center justify-between p-5 hover:bg-rose-50 rounded-[2rem] transition-all group border border-transparent hover:border-rose-100"
               >
                  <div className="flex items-center gap-4">
                     <LogOut className="w-5 h-5 text-rose-500" />
                     <span className="text-sm font-black text-rose-600 uppercase tracking-widest">Terminate Session</span>
                  </div>
               </button>
            </div>
          </div>

          {/* Contextual Intelligence */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Numerical Matrix */}
            <div className="grid sm:grid-cols-2 gap-6">
               <div className="bg-white border border-slate-100 p-10 rounded-[3.5rem] h-56 flex flex-col justify-between group hover:border-indigo-300 transition-all shadow-xl shadow-indigo-500/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                  <div className="bg-slate-50 p-4 rounded-2xl w-fit border border-slate-100 shadow-sm group-hover:scale-110 group-hover:bg-white transition-transform duration-500">
                     <Layers className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-5xl font-black text-slate-900 leading-none">{isTeacher ? '24' : marks.length}</p>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">{isTeacher ? 'Teaching Capacity' : 'Semester Record Capacity'}</p>
                  </div>
               </div>
               
               <div className="bg-white border border-slate-100 p-10 rounded-[3.5rem] h-56 flex flex-col justify-between group hover:border-blue-300 transition-all shadow-xl shadow-indigo-500/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                  <div className="bg-slate-50 p-4 rounded-2xl w-fit border border-slate-100 shadow-sm group-hover:scale-110 group-hover:bg-white transition-transform duration-500">
                     <Award className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-5xl font-black text-slate-900 leading-none">{isTeacher ? (profile.teachingExperience || '5+') : avgGPA}</p>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">{isTeacher ? 'Pedagogical Experience' : 'Cumulative Analytical SGPA'}</p>
                  </div>
               </div>
            </div>

            {/* Static Identity Parameters */}
            <div className="bg-white border border-slate-100 rounded-[3.5rem] overflow-hidden shadow-2xl shadow-indigo-500/5">
               <div className="px-12 py-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    {isTeacher ? 'Professional Authority Profile' : 'Student Core Registry Identity'}
                  </h2>
                  <div className="px-4 py-1.5 bg-indigo-600/5 border border-indigo-600/10 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Verified Data</div>
               </div>
               <div className="p-12 grid md:grid-cols-2 gap-16">
                  <div className="space-y-10">
                    <div className="flex items-start gap-6">
                       <div className="bg-indigo-50 p-3.5 rounded-2xl border border-indigo-100 shadow-sm">
                          {isTeacher ? <Briefcase className="w-6 h-6 text-indigo-600" /> : <GraduationCap className="w-6 h-6 text-indigo-600" />}
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                            {isTeacher ? 'Faculty Assignment Domain' : 'Primary Academic Program'}
                          </p>
                          <p className="text-xl font-black text-slate-900 tracking-tight">
                            {isTeacher ? (profile.department || 'Science Faculty') : (profile.course || 'Unassigned')}
                          </p>
                       </div>
                    </div>
                    <div className="flex items-start gap-6">
                       <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-100 shadow-sm">
                          {isTeacher ? <Book className="w-6 h-6 text-blue-600" /> : <Layers className="w-6 h-6 text-blue-600" />}
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                            {isTeacher ? 'Core Specialization' : 'Active Academic Phase'}
                          </p>
                          <p className="text-xl font-black text-slate-900 tracking-tight">
                            {isTeacher ? (profile.subject || 'Core Engineering') : `Semester ${profile.semester || 'PENDING'}`}
                          </p>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="flex items-start gap-6">
                       <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-100 shadow-sm">
                          <MapPin className="w-6 h-6 text-emerald-600" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Regional Node</p>
                          <p className="text-xl font-black text-slate-900 tracking-tight">Main Campus Core</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-6">
                       <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-100 shadow-sm">
                          <Activity className="w-6 h-6 text-amber-600" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">System Identifier</p>
                          <p className="text-base font-black text-amber-600/80 font-mono tracking-widest uppercase">#{profile._id?.substring(profile._id.length - 8)}</p>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Strategic Intervention */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[3.5rem] p-12 relative overflow-hidden group shadow-2xl shadow-indigo-200">
               <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
                  <div className="max-w-md">
                    <h2 className="text-3xl font-black text-white tracking-tight mb-5">
                       Accelerate Your Journey.
                    </h2>
                    <p className="text-white/80 font-bold text-sm leading-relaxed uppercase tracking-widest">
                      {isTeacher 
                        ? "Synchronize your faculty dashboard and orchestrate academic oversight across your student domains."
                        : "Initialize neural grade projection protocols to visualize your probable semester outcomes."}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate(isTeacher ? '/faculty/dashboard' : '/user1', { state: { marks } })} 
                    className="px-12 py-5 bg-white text-indigo-600 font-black text-xs uppercase tracking-[0.3em] rounded-[2rem] hover:bg-indigo-50 transition-all shadow-2xl active:scale-95 whitespace-nowrap"
                  >
                    {isTeacher ? 'Sync Faculty Node' : 'Access Analytics'}
                  </button>
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
