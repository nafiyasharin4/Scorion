import React, { useState, useEffect } from 'react';
import Header from '../../Components/UserSide/Header';
import { User, Mail, Shield, Book, Award, Clock, ChevronRight, Settings, LogOut, Phone, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const dataKey = storedRole === 'teacher' ? 'teacherData' : 'userData';
    const storedData = localStorage.getItem(dataKey);
    
    if (storedData) {
      setUserData(JSON.parse(storedData));
      setRole(storedRole);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!userData) return null;

  const isTeacher = role === 'teacher';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Essential Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800 border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl relative">
              {/* Profile Cover/Background */}
              <div className="h-32 bg-gradient-to-r from-cyan-500 to-indigo-600"></div>
              
              <div className="px-8 pb-8">
                {/* Avatar */}
                <div className="relative -mt-16 mb-6">
                  <div className="w-32 h-32 bg-slate-900 border-4 border-slate-800 rounded-2xl flex items-center justify-center text-cyan-400 font-black text-4xl shadow-2xl mx-auto">
                    {userData.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute bottom-1 right-[35%] w-6 h-6 bg-emerald-500 border-4 border-slate-800 rounded-full"></div>
                </div>

                {/* Name & Role */}
                <div className="text-center space-y-1">
                  <h1 className="text-2xl font-black text-white">{userData.name}</h1>
                  <p className="text-xs font-black text-cyan-500 uppercase tracking-[0.2em]">{isTeacher ? 'FACULTY MEMBER' : 'STUDENT'}</p>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
                    <Mail className="w-5 h-5 text-slate-500" />
                    <div className="truncate">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</p>
                      <p className="text-sm font-bold text-slate-200 truncate">{userData.email}</p>
                    </div>
                  </div>
                  
                  {userData.phone && (
                    <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
                      <Phone className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Contact Number</p>
                        <p className="text-sm font-bold text-slate-200">{userData.phone}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
                    <Shield className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Account Status</p>
                      <p className="text-sm font-bold text-emerald-400">Verified & Secure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats/Actions */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-3xl p-6 space-y-4">
               <button className="w-full flex items-center justify-between p-4 hover:bg-slate-700/50 rounded-2xl transition-all group">
                  <div className="flex items-center gap-3">
                     <Settings className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                     <span className="text-sm font-bold">Profile Settings</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
               </button>
               <button 
                  onClick={() => {
                    localStorage.clear();
                    navigate('/login');
                  }}
                  className="w-full flex items-center justify-between p-4 hover:bg-rose-500/10 rounded-2xl transition-all group"
               >
                  <div className="flex items-center gap-3">
                     <LogOut className="w-5 h-5 text-rose-500" />
                     <span className="text-sm font-bold text-rose-500">Sign Out</span>
                  </div>
               </button>
            </div>
          </div>

          {/* Right Column: Detailed Context */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
               <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-3xl h-48 flex flex-col justify-between group hover:border-cyan-500/50 transition-all">
                  <div className="bg-cyan-500/10 w-12 h-12 rounded-xl flex items-center justify-center">
                     <Book className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white">{isTeacher ? '6' : '4'}</p>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1">{isTeacher ? 'Assigned Classes' : 'Active Courses'}</p>
                  </div>
               </div>
               
               <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-3xl h-48 flex flex-col justify-between group hover:border-indigo-500/50 transition-all">
                  <div className="bg-indigo-500/10 w-12 h-12 rounded-xl flex items-center justify-center">
                     <Award className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white">{isTeacher ? (userData.experience || '8+ Yrs') : '3.8'}</p>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1">{isTeacher ? 'Industry Experience' : 'Overall GPA'}</p>
                  </div>
               </div>
            </div>

            {/* Professional/Academic Details Section */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-3xl overflow-hidden shadow-xl">
               <div className="px-8 py-6 bg-slate-900/50 border-b border-slate-700/50">
                  <h2 className="text-sm font-black text-white uppercase tracking-widest">
                    {isTeacher ? 'Professional Profile' : 'Academic Identity'}
                  </h2>
               </div>
               <div className="p-8 grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       {isTeacher ? <Briefcase className="w-6 h-6 text-slate-500 mt-1" /> : <GraduationCap className="w-6 h-6 text-slate-500 mt-1" />}
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            {isTeacher ? 'Faculty Department' : 'Enrolled Program'}
                          </p>
                          <p className="text-lg font-black text-slate-200">
                            {isTeacher ? (userData.department || 'Science Dept') : (userData.course || 'B.Tech Specialization')}
                          </p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       {isTeacher ? <Award className="w-6 h-6 text-slate-500 mt-1" /> : <Clock className="w-6 h-6 text-slate-500 mt-1" />}
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            {isTeacher ? 'Primary Subject' : 'Current Semester'}
                          </p>
                          <p className="text-lg font-black text-slate-200">
                            {isTeacher ? (userData.subject || 'Core Mathematics') : `Term ${userData.semester || '5'}`}
                          </p>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <MapPin className="w-6 h-6 text-slate-500 mt-1" />
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{isTeacher ? 'Office Location' : 'Campus Location'}</p>
                          <p className="text-lg font-black text-slate-200">{isTeacher ? 'Building A, Room 402' : 'Main University Campus'}</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <Shield className="w-6 h-6 text-slate-500 mt-1" />
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Identifier</p>
                          <p className="text-sm font-bold text-indigo-400 font-mono">#{userData.id?.substring(0, 10).toUpperCase() || 'ID-TEMP'}</p>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Motivational Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-120 transition-transform duration-700"></div>
               <div className="relative z-10">
                  <h2 className="text-2xl font-black text-white tracking-tight mb-2">
                    {isTeacher ? 'Ready for the Class?' : 'Ready for the Next Semester?'}
                  </h2>
                  <p className="text-indigo-100 font-medium max-w-md">
                    {isTeacher 
                      ? "Your student performance metrics are ready for review. Prepare your lecture notes and check the current class marks."
                      : "Your predicted results for the upcoming term are looking exceptional. Keep up the consistent work."}
                  </p>
                  <button 
                    onClick={() => navigate(isTeacher ? '/faculty/dashboard' : '/GPresult')} 
                    className="mt-8 px-8 py-3 bg-white text-indigo-800 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-cyan-400 hover:text-slate-900 transition-all shadow-xl shadow-indigo-900/40 active:scale-95"
                  >
                    {isTeacher ? 'Go to Dashboard' : 'View Prediction Results'}
                  </button>
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
