

import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Users, Zap, ShieldCheck, Cpu, Network, GraduationCap, ArrowRight } from 'lucide-react';
import Header from '../../Components/UserSide/Header';
import axios from 'axios';

export default function AboutPage() {
  const [stats, setStats] = useState({
    students: 0,
    predictions: 0,
    accuracy: 96
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/user/system-stats`);
        if (res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch system stats", err);
      }
    };
    fetchStats();
  }, []);

  const features = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Neural Core',
      description: 'Proprietary machine learning models trained on vast academic data points for unmatched precision.'
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: 'Data Synergy',
      description: 'Real-time synchronization between faculty input, attendance patterns, and historical trends.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Security Layer',
      description: 'Enterprise-grade encryption protecting your academic identity and performance metrics.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Protocol Speed',
      description: 'High-speed processing layers that deliver projections in milliseconds with zero latency.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500/20 selection:text-indigo-900">
      <Header />
      
      <div className="pt-20 lg:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center space-y-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
             <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-2xl mx-auto">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Institutional Intelligence v4.1</span>
             </div>
             
             <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                The Future of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Academic Strategy.</span>
             </h1>
             
             <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
                Scorion is more than a grade predictor—it's a comprehensive neural ecosystem designed to give students and faculty the insights they need to optimize educational outcomes.
             </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
             {[
               { label: 'Verified Students', value: stats.students || '0', sub: 'Active Nodes' },
               { label: 'Neural Predictions', value: stats.predictions || '0', sub: 'Data Transmissions' },
               { label: 'Engine Precision', value: `${stats.accuracy}%`, sub: 'Sync Accuracy' }
             ].map((stat, i) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-indigo-500/5 border border-slate-100 text-center group hover:scale-[1.02] transition-transform duration-500">
                   <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">{stat.label}</p>
                   <p className="text-5xl font-black text-slate-900 mb-2">{stat.value}</p>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.sub}</p>
                </div>
             ))}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
             {features.map((feature, idx) => (
                <div key={idx} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                      {feature.icon}
                   </div>
                   <h3 className="text-sm font-black text-slate-900 mb-3 tracking-tight uppercase tracking-widest">{feature.title}</h3>
                   <p className="text-xs font-bold text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
             ))}
          </div>

          {/* Mission Section */}
          <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
             <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 text-center lg:text-left">
                   <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-none uppercase">Empowering Every <br />Student.</h2>
                   <p className="text-white/60 font-bold leading-relaxed uppercase tracking-widest text-sm">
                      Our mission is to democratize academic foresight. We believe clarity drives achievement, and through institutional synchronization, we build the roadmaps to student success.
                   </p>
                
                </div>
                <div className="hidden lg:block">
                   <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 h-[300px] flex items-center justify-center relative">
                      <Target className="w-40 h-40 text-white/5 animate-pulse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Cpu className="w-20 h-20 text-indigo-500/20 opacity-40 animate-spin-slow" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-lg">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <h1 className="text-lg font-black text-slate-900 tracking-tighter uppercase">SCORION</h1>
           </div>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
             © 2026 SCORION NETWORK PROTOCOLS. SYSTEM STATUS: OPTIMAL.
           </p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}} />
    </div>
  );
}




