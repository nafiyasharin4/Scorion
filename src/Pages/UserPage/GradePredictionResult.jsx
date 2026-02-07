import React, { useState, useEffect } from 'react';
import { Download, ArrowLeft, Award, CheckCircle, XCircle, TrendingUp, Activity, ShieldCheck } from 'lucide-react';
import Header from '../../Components/UserSide/Header';
import { useNavigate, useLocation } from 'react-router-dom';

import { exportToPDF, exportToExcel } from '../../utils/exportUtils';
import { ChevronDown, FileText, Table } from 'lucide-react';

const GradePredictionResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSemesterData, setSelectedSemesterData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showExportOptions, setShowExportOptions] = useState(false);

  useEffect(() => {
    // Priority 1: Use explicitly selected semester data passed from UserPage
    if (location.state?.selectedSemesterData) {
      setSelectedSemesterData(location.state.selectedSemesterData);
      setProfile(location.state.profile);
    } 
    // Priority 2: Fallback to marks array (default to latest only if no selection was made)
    else if (location.state?.marks && location.state.marks.length > 0) {
      setSelectedSemesterData(location.state.marks[location.state.marks.length - 1]);
      setProfile(location.state.profile);
    } 
    // Priority 3: No data available, redirect back
    else {
      navigate('/userprofile');
    }
  }, [location.state, navigate]);

  const handlePredictAgain = () => {
    navigate('/userprofile');
  };

  const getGradeDetails = (grade) => {
    if (!grade) return { status: 'Awaiting', color: 'text-slate-400', bgColor: 'bg-slate-50', borderColor: 'border-slate-100' };
    const normalized = grade.trim().toUpperCase();
    const details = {
      'O': { status: 'Outstanding', color: 'text-indigo-600', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-100' },
      'A+': { status: 'Excellent', color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100' },
      'A': { status: 'Superior', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-100' },
      'B+': { status: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-100' },
      'B': { status: 'Above Average', color: 'text-blue-500', bgColor: 'bg-blue-50/50', borderColor: 'border-blue-100' },
      'C': { status: 'Average', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-100' },
      'P': { status: 'Pass', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-100' },
      'F': { status: 'Incomplete', color: 'text-rose-600', bgColor: 'bg-rose-50', borderColor: 'border-rose-100' }
    };
    return details[normalized] || { status: 'Satisfactory', color: 'text-slate-600', bgColor: 'bg-slate-50', borderColor: 'border-slate-200' };
  };

  const handleExportPDF = () => {
    exportToPDF(profile, selectedSemesterData);
    setShowExportOptions(false);
  };

  const handleExportExcel = () => {
    exportToExcel(profile, selectedSemesterData);
    setShowExportOptions(false);
  };

  const barColors = ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

  if (!selectedSemesterData) return null;

  const overallDetails = getGradeDetails(selectedSemesterData.totalGrade);
  const percentage = (selectedSemesterData.sgpa * 10).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-indigo-500/20">
      <Header />
      <div className="max-w-7xl mx-auto py-10 lg:py-16 px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Core Identity Hub */}
        <div className="bg-white border border-slate-100 rounded-[3.5rem] p-10 shadow-2xl shadow-indigo-500/5 relative text-slate-800">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-700"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 font-black">
             <div>
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                     <Activity className="text-indigo-600 w-7 h-7" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Academic <span className="text-indigo-600">Intelligence</span></h1>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/30">
                        Semester {selectedSemesterData.semester}
                      </span>
                      <ShieldCheck className="text-emerald-500 w-4 h-4" />
                      <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-[9px]">Prediction Registry</span>
                    </div>
                  </div>
               </div>
             </div>
            <div className="flex gap-4 relative">
              <button
                onClick={handlePredictAgain}
                className="px-8 py-4 bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-100 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center gap-3 shadow-sm"
              >
                <ArrowLeft size={16} />
                Return to Hub
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowExportOptions(!showExportOptions)}
                  className="px-8 py-4 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all flex items-center gap-3 shadow-xl shadow-indigo-500/20 active:scale-95 border-b-4 border-indigo-900"
                >
                  <Download size={16} />
                  Export Registry
                  <ChevronDown size={14} className={`transition-transform ${showExportOptions ? 'rotate-180' : ''}`} />
                </button>

                {showExportOptions && (
                  <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-slate-100 rounded-[1.5rem] shadow-2xl p-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
                    <button 
                      onClick={handleExportPDF}
                      className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 rounded-xl transition-all group"
                    >
                      <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                        <FileText size={20} />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black text-slate-900 uppercase">PDF Matrix</p>
                        <p className="text-[9px] font-bold text-slate-400">Formal Report</p>
                      </div>
                    </button>

                    <button 
                      onClick={handleExportExcel}
                      className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 rounded-xl transition-all group"
                    >
                      <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                        <Table size={20} />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black text-slate-900 uppercase">Excel Ledger</p>
                        <p className="text-[9px] font-bold text-slate-400">Data Analytics</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Primary Analytical Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-xl shadow-indigo-500/5 hover:border-indigo-200 transition-all group">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Final Prediction SGPA</h3>
            <p className="text-6xl font-black text-slate-900 transition-transform group-hover:scale-110">{selectedSemesterData.sgpa}</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/30 group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-4 relative z-10">Neural Stability Score</h3>
            <div className="flex items-center justify-between relative z-10">
              <p className="text-6xl font-black">{percentage}%</p>
              <TrendingUp size={48} className="opacity-20 translate-x-4 transition-transform group-hover:translate-x-0" />
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-xl shadow-indigo-500/5 flex flex-col justify-between hover:border-blue-200 transition-all">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Attendance Clearance</h3>
             <div className="flex items-center justify-between">
                <p className="text-6xl font-black text-slate-900">{selectedSemesterData.attendancePercentage || '0'}%</p>
                <div className="w-12 h-12 rounded-2xl border-4 border-slate-50 border-t-indigo-600 animate-spin"></div>
             </div>
          </div>

          <div className={`bg-white border border-slate-100 rounded-[3rem] p-10 shadow-xl shadow-indigo-500/5 flex flex-col justify-between border-t-8 ${overallDetails.borderColor}`}>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Predicted Grade</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-6xl font-black ${overallDetails.color}`}>{selectedSemesterData.totalGrade}</p>
                <p className={`text-[10px] font-black uppercase tracking-widest mt-3 ${overallDetails.color}`}>{overallDetails.status}</p>
              </div>
              {selectedSemesterData.totalGrade !== 'F' ? (
                <CheckCircle size={48} className="text-emerald-500 opacity-20" />
              ) : (
                <XCircle size={48} className="text-rose-500 opacity-20" />
              )}
            </div>
          </div>
        </div>

        {/* Structural Breakdown */}
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-12 xl:col-span-7 bg-white border border-slate-100 rounded-[3.5rem] p-12 shadow-2xl shadow-indigo-500/5 overflow-hidden">
            <div className="flex items-center justify-between mb-12">
               <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Analytical Partition</h2>
               <div className="h-px flex-1 mx-8 bg-slate-100 hidden sm:block"></div>
               <Award className="text-indigo-200 w-10 h-10" />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {selectedSemesterData.subjects.map((subject, index) => {
                const details = getGradeDetails(subject.grade);
                return (
                  <div key={index} className="flex flex-col p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] group hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner ${details.bgColor} ${details.color} border ${details.borderColor}`}>
                        {subject.grade}
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weighting</p>
                         <p className="text-sm font-black text-slate-900">{subject.marks || 0} / 100</p>
                      </div>
                    </div>
                    <p className="text-base font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{subject.name}</p>
                    <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">{details.status}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-5 bg-white border border-slate-100 rounded-[3.5rem] p-12 shadow-2xl shadow-indigo-500/5 relative overflow-hidden flex flex-col">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 relative z-10">Visual Grade Distribution</h2>
            <div className="h-[350px] flex items-end justify-start gap-4 pt-16 relative z-10 pb-8 overflow-x-auto">
              {selectedSemesterData.subjects && selectedSemesterData.subjects.map((subject, index) => {
                const points = {'O':10, 'A+':9, 'A':8, 'B+':7, 'B':6, 'C':5, 'P':4, 'F':0}[subject.grade] || (subject.marks / 10) || 0;
                return (
                  <div key={index} className="flex-shrink-0 flex flex-col items-center gap-4 h-full group" style={{ minWidth: '60px', maxWidth: '80px' }}>
                    <div className="w-full flex-1 flex flex-col justify-end">
                      <div 
                        className="w-full rounded-xl transition-all duration-700 relative cursor-pointer"
                        style={{ 
                          height: `${Math.max(points * 10, 10)}%`,
                          backgroundColor: barColors[index % barColors.length],
                          boxShadow: `0 10px 30px -5px ${barColors[index % barColors.length]}40`
                        }}
                      >
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[9px] font-black opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-2xl whitespace-nowrap z-20">
                          {subject.grade} • {subject.marks}
                        </div>
                      </div>
                    </div>
                    <div className="h-10 flex items-center justify-center">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter text-center line-clamp-2" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{subject.name?.substring(0, 12)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-indigo-50 p-6 rounded-[2.5rem] mt-auto border border-indigo-100">
               <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Recommendation Protocol</p>
               <p className="text-xs font-bold text-slate-600 leading-relaxed">
                 Continue maintaining <span className="text-indigo-700 font-black">Velocity α</span> in core subjects to ensure your terminal projection remains superior.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradePredictionResult;