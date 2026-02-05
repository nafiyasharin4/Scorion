import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Target, 
  GraduationCap, 
  ChevronRight, 
  Search,
  Sparkles,
  TrendingUp,
  Clock,
  Layout,
  MessageSquare
} from 'lucide-react';
import Header from '../../Components/UserSide/Header';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function SyllabusPage() {
  const [activeSemester, setActiveSemester] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [targetSGPA, setTargetSGPA] = useState('8.0');
  const [curriculumData, setCurriculumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Profile fetch failed');
    }
  };

  const LOCAL_CURRICULUM = {
    '1': {
      title: 'Foundation Phase',
      description: 'Core concepts of computing and mathematical logic',
      subjects: [
        { name: 'English-I', code: 'ENG1A01', credits: 3, difficulty: 'Easy', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { name: 'Critical Thinking', code: 'ENG1A02', credits: 3, difficulty: 'Medium', color: 'text-blue-500', bg: 'bg-blue-50' },
        { name: 'Mathematical Foundation', code: 'BCS1B01', credits: 4, difficulty: 'Hard', color: 'text-rose-500', bg: 'bg-rose-50' },
        { name: 'Computer Fundamentals & HTML', code: 'BCS1C01', credits: 3, difficulty: 'Medium', color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { name: 'Programming in C', code: 'BCS1C02', credits: 4, difficulty: 'Hard', color: 'text-amber-500', bg: 'bg-amber-50' }
      ]
    },
    '2': {
      title: 'Structural Phase',
      description: 'Advanced programming architectures and data logic',
      subjects: [
        { name: 'English-II', code: 'ENG2A03', credits: 3, difficulty: 'Easy', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { name: 'Discrete Mathematics', code: 'BCS2B02', credits: 4, difficulty: 'Hard', color: 'text-rose-500', bg: 'bg-rose-50' },
        { name: 'Data Structures using C', code: 'BCS2C03', credits: 4, difficulty: 'Hard', color: 'text-amber-500', bg: 'bg-amber-50' },
        { name: 'Financial Accounting', code: 'BCS2C04', credits: 3, difficulty: 'Medium', color: 'text-blue-500', bg: 'bg-blue-50' },
        { name: 'C++ Programming', code: 'BCS2B03', credits: 4, difficulty: 'Medium', color: 'text-indigo-500', bg: 'bg-indigo-50' }
      ]
    },
    '3': {
      title: 'Data Integration Phase',
      description: 'Information management and system communication',
      subjects: [
        { name: 'Database Management System', code: 'BCS3B04', credits: 4, difficulty: 'Medium', color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { name: 'Python Programming', code: 'BCS3C05', credits: 4, difficulty: 'Medium', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { name: 'Numerical Methods', code: 'BCS3C06', credits: 3, difficulty: 'Hard', color: 'text-rose-500', bg: 'bg-rose-50' },
        { name: 'Data Communication', code: 'BCS3B05', credits: 3, difficulty: 'Medium', color: 'text-blue-500', bg: 'bg-blue-50' },
        { name: 'Digital Electronics', code: 'BCS3A12', credits: 4, difficulty: 'Hard', color: 'text-amber-500', bg: 'bg-amber-50' }
      ]
    },
    '4': {
      title: 'Execution Phase',
      description: 'Operating systems and advanced software protocols',
      subjects: [
        { name: 'Operating Systems', code: 'BCS4B06', credits: 4, difficulty: 'Hard', color: 'text-rose-500', bg: 'bg-rose-50' },
        { name: 'Java Programming', code: 'BCS4C07', credits: 4, difficulty: 'Hard', color: 'text-amber-500', bg: 'bg-amber-50' },
        { name: 'Microprocessors', code: 'BCS4C08', credits: 3, difficulty: 'Hard', color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { name: 'E-Commerce', code: 'BCS4A13', credits: 3, difficulty: 'Easy', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { name: 'Computer Networks', code: 'BCS4A14', credits: 4, difficulty: 'Medium', color: 'text-blue-500', bg: 'bg-blue-50' }
      ]
    },
    '5': {
      title: 'Specialization Phase',
      description: 'Advanced web engineering and mobile development architectures',
      subjects: [
        { name: 'Android Programming', code: 'BCS5B07', credits: 4, difficulty: 'Hard', color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { name: 'Web Programming (PHP)', code: 'BCS5B08', credits: 4, difficulty: 'Medium', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { name: 'Software Engineering', code: 'BCS5B09', credits: 3, difficulty: 'Medium', color: 'text-blue-500', bg: 'bg-blue-50' },
        { name: 'Computer Graphics', code: 'BCS5B10', credits: 3, difficulty: 'Hard', color: 'text-rose-500', bg: 'bg-rose-50' },
        { name: 'Java Practical', code: 'BCS5B11', credits: 2, difficulty: 'Easy', color: 'text-amber-500', bg: 'bg-amber-50' }
      ]
    },
    '6': {
      title: 'Terminal Phase',
      description: 'System synthesis and graduation project protocols',
      subjects: [
        { name: 'System Software', code: 'BCS6B12', credits: 4, difficulty: 'Hard', color: 'text-rose-500', bg: 'bg-rose-50' },
        { name: 'Machine Learning', code: 'BCS6B13', credits: 4, difficulty: 'Hard', color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { name: 'Android Practical', code: 'BCS6B14', credits: 2, difficulty: 'Medium', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { name: 'Project Work', code: 'BCS6B15', credits: 6, difficulty: 'High', color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Viva-Voce', code: 'BCS6B16', credits: 2, difficulty: 'Medium', color: 'text-amber-500', bg: 'bg-amber-50' }
      ]
    }
  };

  useEffect(() => {
    syncSyllabus();
  }, [activeSemester]);

  const syncSyllabus = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(`http://localhost:5000/api/user/syllabus/${activeSemester}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data) {
        setCurriculumData(response.data);
      } else {
        setCurriculumData(LOCAL_CURRICULUM[activeSemester]);
      }
    } catch (error) {
      setCurriculumData(LOCAL_CURRICULUM[activeSemester]);
    } finally {
      setLoading(false);
    }
  };

  const currentSem = curriculumData || LOCAL_CURRICULUM[activeSemester];
  const filteredSubjects = currentSem?.subjects?.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const calculateRequiredGrades = (target) => {
    const val = parseFloat(target);
    if (isNaN(val) || val < 0 || val > 10) return '---';
    if (val > 9) return 'Maintain A+ Consistency';
    if (val > 8) return 'Aim for A average';
    if (val > 7) return 'Target B+ or above';
    return 'Regular study will suffice';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      
      {/* Dynamic Hero Section */}
      <div className="bg-slate-900 text-white pt-16 pb-32 px-4 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Scorion Curriculum Matrix</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none">
                Academic <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Roadmap.</span>
              </h1>
              <p className="text-slate-400 font-bold max-w-xl text-lg leading-relaxed">
                Navigating the <span className="text-indigo-400">{profile?.course || 'Phase'}</span> curriculum for <span className="text-cyan-400">{profile?.department || 'Registry'}</span>. Synchronized with internal evaluation protocols for real-time tracking.
              </p>
            </div>

            {/* AI Goal Setter Card */}
            <div className="w-full max-w-sm bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Target className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest">Intelligence Target</h3>
                  <p className="text-[10px] text-slate-400 font-bold">Configure your semester objective</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target SGPA</label>
                    <span className="text-indigo-400 font-black text-xs">{targetSGPA}</span>
                  </div>
                  <input 
                    type="range" 
                    min="4.0" 
                    max="10.0" 
                    step="0.1" 
                    value={targetSGPA}
                    onChange={(e) => setTargetSGPA(e.target.value)}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between mt-1 text-[8px] font-black text-slate-500 uppercase">
                    <span>4.0</span>
                    <span>10.0</span>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">AI Recommendation</p>
                  <p className="text-xs font-bold text-indigo-300 italic">"{calculateRequiredGrades(targetSGPA)}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Hub */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 pb-20 relative z-20">
        <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-indigo-500/5 border border-slate-100 overflow-hidden">
          {/* Navigation Bar */}
          <div className="flex flex-col md:flex-row border-b border-slate-50">
            <div className="flex-1 flex overflow-x-auto p-4 gap-2 scrollbar-hide">
              {Object.keys(LOCAL_CURRICULUM).map(sem => (
                <button
                  key={sem}
                  onClick={() => setActiveSemester(sem)}
                  className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                    activeSemester === sem 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' 
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  Phase {sem}
                </button>
              ))}
            </div>
            
            <div className="p-4 border-l border-slate-50 flex items-center">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search Modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-xs max-w-[200px]"
                />
              </div>
            </div>
          </div>

          <div className="p-10">
            {/* Phase Description */}
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Semester {activeSemester}: {currentSem?.title}</h2>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">Deployment Phase</span>
                  <span className="text-slate-300">•</span>
                  <p className="text-slate-500 font-bold text-sm">{currentSem?.description}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-center bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Total Credits</p>
                  <p className="text-lg font-black text-slate-900">{currentSem?.subjects?.reduce((a, b) => a + b.credits, 0) || 0}</p>
                </div>
                <div className="text-center bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Modules</p>
                  <p className="text-lg font-black text-slate-900">{currentSem?.subjects?.length || 0}</p>
                </div>
              </div>
            </div>

            {/* Subject Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSubjects.map((subject, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 ${subject.bg} rounded-bl-[4rem] group-hover:scale-110 transition-transform -z-0`}></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors border border-slate-50">
                        <BookOpen size={20} />
                      </div>
                      <span className={`text-[9px] font-black px-3 py-1 rounded-full border ${subject.color} ${subject.bg.replace('bg-', 'border-')}`}>
                        {subject.difficulty}
                      </span>
                    </div>

                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{subject.code}</p>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors mb-6 flex-1">
                      {subject.name}
                    </h3>

                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={14} className="text-indigo-500" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{subject.credits} Credits</span>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-700 transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {(loading === false && filteredSubjects.length === 0) && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                  <Layout size={40} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">No Matching Protocols</h3>
                <p className="text-slate-500 font-bold">Try adjusting your search criteria</p>
              </div>
            )}
            
            {loading && (
               <div className="text-center py-20 animate-pulse">
                 <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Synchronizing Matrix...</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}