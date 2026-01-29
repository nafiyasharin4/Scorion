import React, { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import Header from '../../Components/UserSide/Header';
import { useNavigate } from 'react-router-dom';

export default function GradePredictorHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const dataKey = storedRole === 'teacher' ? 'teacherData' : 'userData';
    const storedData = localStorage.getItem(dataKey);
    if (storedData) setUser(JSON.parse(storedData));
  }, []);

  const handleExplore = () => {
    navigate('/user1');
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-slate-900">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/20">
                  <GraduationCap className="text-white w-10 h-10" />
                </div>
              </div>
              
              <h1 className="text-5xl font-black text-slate-800 leading-tight tracking-tight">
                Welcome back, <br />
                <span className="text-cyan-600 capitalize">{user?.name || 'Explorer'}</span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                Your personalized student platform — <span className="text-slate-900">Learn, Grow, and Connect</span> with confidence.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button onClick={handleExplore} className="px-8 py-4 bg-cyan-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-cyan-700 transition shadow-lg shadow-cyan-500/20 active:scale-95">
                  Explore Learning
                </button>
                <button onClick={() => navigate('/predict')} className="px-8 py-4 bg-white border border-slate-200 text-slate-800 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-50 transition shadow-sm active:scale-95">
                  Check Grades
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500/5 rounded-3xl blur-3xl group-hover:bg-cyan-500/10 transition-colors"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 overflow-hidden border border-slate-100 transition-transform group-hover:scale-[1.01]">
                <img
                  src="https://img.freepik.com/premium-vector/young-boy-with-glasses-jumping-air-holding-up-paper-with-prominent-grade_995281-850.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="Success illustration"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}