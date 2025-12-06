import React from 'react';
import { GraduationCap } from 'lucide-react';
import Header from '../../Components/UserSide/Header';
import { useNavigate } from 'react-router-dom';

export default function GradePredictorHome() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/user1');
  }
  return (
    <div>
      <Header></Header>
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Header/Navigation */}
      

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                <GraduationCap className="text-white w-10 h-10" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-slate-800 leading-tight">
              Welcome to
              <span className="block text-cyan-500">SCORION</span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed">
              Your personalized student platform — Learn, Grow, and Connect with confidence.
            </p>

            <button onClick={handleExplore} className="px-8 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition shadow-lg hover:shadow-xl">
              Explore Now
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-6 overflow-hidden">
              <img
                src="https://img.freepik.com/premium-vector/young-boy-with-glasses-jumping-air-holding-up-paper-with-prominent-grade_995281-850.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Happy students with A+ grade"
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