import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Cpu, 
  Network, 
  ChevronRight, 
  ArrowRight,
  Globe,
  Lock,
  BarChart3,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GradePredictionLanding = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStart = () => {
    const token = localStorage.getItem('userToken') || localStorage.getItem('teacherToken');
    if (token) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500/20 selection:text-indigo-900">
      
      {/* Dynamic Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4 shadow-xl shadow-slate-200/20' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase">SCORION</h1>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            <button onClick={() => navigate('/about')} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-colors">
              About
            </button>
            <a href="#architecture" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-colors">
              Architecture
            </a>
            <button onClick={() => navigate('/community')} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-colors">
              Network
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-600 transition-colors"
            >
              Access Identity
            </button>
            <button 
              onClick={handleStart}
              className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 transition-all hover:shadow-xl hover:shadow-indigo-100 active:scale-95"
            >
              Initialize Node
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section: The Singularity */}
      <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
        {/* Background Grid & Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-2xl">
                <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Neural Engine v4.1 Active</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                Predict Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400">Academic Destiny.</span>
              </h1>

              <p className="text-xl text-slate-500 font-bold leading-relaxed max-w-xl">
                Scorion leverages deep neural networks to visualize your academic performance trajectory before the first lecture even begins.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <button 
                  onClick={handleStart}
                  className="group px-10 py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95"
                >
                  Start Prediction Protocol
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-10 py-5 bg-white border border-slate-100 text-slate-500 font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-4 shadow-xl shadow-slate-200/10">
                  Whitepapers
                </button>
              </div>

              <div className="flex items-center gap-12 pt-10">
                <div className="space-y-1">
                  <p className="text-3xl font-black text-slate-900">96.8%</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Engine Precision</p>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-black text-slate-900">45ms</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Sync Latency</p>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-black text-slate-900">1.2k+</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Nodes Active</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative z-10 bg-white rounded-[4rem] p-10 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.15)] border border-slate-50 transform lg:rotate-3 transition-transform hover:rotate-0 duration-700 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-indigo-700"></div>
                
                <div className="flex items-center justify-between mb-10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="px-3 py-1 bg-indigo-50 rounded-full">
                    <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">Live Prediction</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Target Outcome</p>
                      <p className="text-5xl font-black text-slate-900 leading-none tracking-tighter">9.45 <span className="text-xl text-indigo-600">SGPA</span></p>
                    </div>
                    <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-3xl flex items-center justify-center">
                       <TrendingUp className="text-indigo-600 w-8 h-8" />
                    </div>
                  </div>

                  <div className="space-y-4">
                     {[
                       { name: 'Core Computing', score: 85, color: 'bg-indigo-600' },
                       { name: 'Database Systems', score: 78, color: 'bg-blue-500' },
                       { name: 'Algorithmic Logic', score: 82, color: 'bg-indigo-400' }
                     ].map((item) => (
                       <div key={item.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{item.name}</span>
                            <span className="text-[10px] font-black text-indigo-600">{item.score}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }}></div>
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="p-6 bg-slate-900 rounded-[2.5rem] mt-6 shadow-2xl">
                      <div className="flex items-center gap-4 mb-3">
                        <Activity className="text-blue-400 w-4 h-4" />
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Stability Profile: Stable</span>
                     </div>
                     <p className="text-[11px] font-bold text-white/70 leading-relaxed uppercase tracking-widest">
                       Projection synchronized with academic syllabus v4.1. Optimized path to success recalibrated.
                     </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100 rounded-[3rem] -z-10 animate-spin-slow"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-50 border border-indigo-100 rounded-full -z-10 animate-bounce-slow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Architecture */}
      <section id="architecture" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em]">Core Architecture</p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Intelligence by Design.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Cpu className="w-8 h-8" />, 
                title: 'Neural Core', 
                desc: 'Proprietary machine learning models trained on 10M+ academic data points for unmatched precision.' 
              },
              { 
                icon: <Network className="w-8 h-8" />, 
                title: 'Data Synergy', 
                desc: 'Real-time synchronization between faculty input, attendance patterns, and historical trends.' 
              },
              { 
                icon: <ShieldCheck className="w-8 h-8" />, 
                title: 'Security Layer', 
                desc: 'Enterprise-grade encryption protecting your academic identity and performance metrics.' 
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-12 bg-slate-50 rounded-[3.5rem] border border-transparent hover:border-indigo-100 hover:bg-white transition-all group shadow-sm hover:shadow-2xl">
                 <div className="w-20 h-20 bg-white shadow-xl shadow-slate-200 rounded-[2rem] flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                   {feature.icon}
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase tracking-widest">{feature.title}</h3>
                 <p className="text-slate-500 font-bold leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Protocol */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.1)_0,transparent_100%)]"></div>
          <Network className="absolute top-10 right-10 w-96 h-96 text-white/5 animate-pulse" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10 space-y-12">
          <div className="space-y-4 text-white">
            <h2 className="text-5xl font-black tracking-tight leading-none uppercase">Ready for Graduation?</h2>
            <p className="text-xl text-white/60 font-medium">Join the thousands of students already navigating their academic career with Scorion intelligence.</p>
          </div>

          <button 
             onClick={handleStart}
             className="px-12 py-6 bg-white text-slate-900 font-black text-sm uppercase tracking-[0.4em] rounded-[2rem] hover:bg-indigo-500 hover:text-white transition-all shadow-2xl active:scale-95 group flex items-center justify-center gap-6 mx-auto"
          >
             Initialize System
             <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer Nodes */}
      <footer className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2.5 rounded-xl shadow-lg shadow-indigo-200">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase">SCORION</h1>
            </div>
            
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              © {new Date().getFullYear()} SCORION NETWORK PROTOCOLS. ALL DATA TRANSMISSIONS ARE ENCRYPTED.
            </p>

            <div className="flex gap-8">
              <Globe className="w-5 h-5 text-slate-300 hover:text-indigo-600 cursor-pointer" />
              <Network className="w-5 h-5 text-slate-300 hover:text-indigo-600 cursor-pointer" />
              <Lock className="w-5 h-5 text-slate-300 hover:text-indigo-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>

      {/* Global Animation Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 8s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default GradePredictionLanding;