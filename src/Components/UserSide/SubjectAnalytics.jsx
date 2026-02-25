import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertCircle, Award, Target } from 'lucide-react';

/**
 * Analyzes subject-wise performance across semesters
 * @param {Array} allMarks - All semester marks data
 * @returns {Array} Analytics data with trends and recommendations
 */
const analyzeSubjectPerformance = (allMarks) => {
  if (!allMarks || allMarks.length < 2) return [];

  const subjectMap = new Map();

  // Aggregate all subject data across semesters
  allMarks.forEach((semesterData, semIndex) => {
    semesterData.subjects?.forEach(subject => {
      if (!subjectMap.has(subject.name)) {
        subjectMap.set(subject.name, []);
      }
      subjectMap.get(subject.name).push({
        semester: semesterData.semester,
        marks: subject.marks || 0,
        grade: subject.grade,
        index: semIndex
      });
    });
  });

  // Calculate trends and analytics
  const analytics = [];
  subjectMap.forEach((history, subjectName) => {
    if (history.length < 2) return;

    const latest = history[history.length - 1];
    const previous = history[history.length - 2];
    const marksDiff = latest.marks - previous.marks;
    const avgMarks = history.reduce((sum, h) => sum + h.marks, 0) / history.length;
    const trend = marksDiff > 5 ? 'improving' : marksDiff < -5 ? 'declining' : 'stable';
    const performance = latest.marks >= 80 ? 'excellent' : latest.marks >= 60 ? 'good' : 'needs-attention';

    analytics.push({
      name: subjectName,
      currentMarks: latest.marks,
      currentGrade: latest.grade,
      previousMarks: previous.marks,
      marksDifference: marksDiff,
      trend,
      performance,
      avgMarks: avgMarks.toFixed(1),
      history,
      recommendation: generateRecommendation(trend, performance, marksDiff)
    });
  });

  // Sort by performance (lowest first for attention)
  return analytics.sort((a, b) => a.currentMarks - b.currentMarks);
};

const generateRecommendation = (trend, performance, diff) => {
  if (performance === 'needs-attention') {
    return {
      type: 'critical',
      message: 'Immediate focus required. Schedule review sessions.',
      priority: 'high'
    };
  }
  if (trend === 'declining') {
    return {
      type: 'warning',
      message: `Performance dropped by ${Math.abs(diff)} marks. Address gaps early.`,
      priority: 'medium'
    };
  }
  if (trend === 'improving' && performance === 'excellent') {
    return {
      type: 'success',
      message: 'Outstanding progress! Maintain momentum.',
      priority: 'low'
    };
  }
  if (trend === 'improving') {
    return {
      type: 'positive',
      message: `Improved by ${diff} marks. Keep up the effort!`,
      priority: 'low'
    };
  }
  return {
    type: 'neutral',
    message: 'Stable performance. Strive for excellence.',
    priority: 'low'
  };
};

const SubjectAnalytics = ({ marks }) => {
  const analytics = analyzeSubjectPerformance(marks);

  if (analytics.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-xl shadow-indigo-500/5">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Insufficient Data for Trend Analysis</p>
          <p className="text-slate-400 text-xs mt-2">Complete at least 2 semesters to unlock insights</p>
        </div>
      </div>
    );
  }

  const getTrendIcon = (trend) => {
    if (trend === 'improving') return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    if (trend === 'declining') return <TrendingDown className="w-4 h-4 text-rose-500" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  const getTrendColor = (trend) => {
    if (trend === 'improving') return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (trend === 'declining') return 'text-rose-600 bg-rose-50 border-rose-100';
    return 'text-slate-600 bg-slate-50 border-slate-100';
  };

  const getPerformanceColor = (performance) => {
    if (performance === 'excellent') return 'border-l-indigo-500';
    if (performance === 'good') return 'border-l-blue-500';
    return 'border-l-amber-500';
  };

  const getRecommendationStyle = (type) => {
    const styles = {
      critical: 'bg-rose-50 border-rose-100 text-rose-600',
      warning: 'bg-amber-50 border-amber-100 text-amber-600',
      positive: 'bg-emerald-50 border-emerald-100 text-emerald-600',
      success: 'bg-indigo-50 border-indigo-100 text-indigo-600',
      neutral: 'bg-slate-50 border-slate-100 text-slate-600'
    };
    return styles[type] || styles.neutral;
  };

  // Identify subjects needing immediate attention
  const criticalSubjects = analytics.filter(s => s.performance === 'needs-attention' || s.trend === 'declining');
  const improvingSubjects = analytics.filter(s => s.trend === 'improving');
  
  return (
    <div className="bg-white border border-slate-100 rounded-[3.5rem] p-10 shadow-2xl shadow-indigo-500/5 space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Performance Intelligence</h2>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Subject-wise Trend Analytics</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-indigo-600/5 border border-indigo-100 rounded-xl">
          <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{analytics.length} Subjects Tracked</p>
        </div>
      </div>

      {/* PRIORITY FOCUS AREAS - Highly Visible Section */}
      {criticalSubjects.length > 0 && (
        <div className="bg-gradient-to-br from-rose-50 to-amber-50 border-2 border-rose-200 rounded-[2.5rem] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center animate-pulse">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black text-rose-900 uppercase tracking-tight">⚠️ Priority Focus Areas</h3>
                <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest">Immediate Action Required</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {criticalSubjects.map((subject, idx) => (
                <div key={idx} className="bg-white border-l-4 border-rose-500 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-base font-black text-slate-900 mb-1">{subject.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-rose-600">Current: {subject.currentMarks}/100</span>
                        <span className="text-xs font-black text-slate-400">•</span>
                        <span className="text-xs font-black text-slate-500">Grade: {subject.currentGrade}</span>
                      </div>
                    </div>
                    {subject.trend === 'declining' && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-rose-100 rounded-lg">
                        <TrendingDown className="w-3 h-3 text-rose-600" />
                        <span className="text-[8px] font-black text-rose-600 uppercase">Declining</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-3">
                    <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest mb-1">📋 Action Plan</p>
                    <p className="text-xs font-bold text-amber-900 leading-relaxed">{subject.recommendation.message}</p>
                    {subject.marksDifference < 0 && (
                      <p className="text-xs font-bold text-rose-600 mt-2">
                        ↓ Dropped {Math.abs(subject.marksDifference)} marks from last semester
                      </p>
                    )}
                  </div>
                  
                  {/* Specific Improvement Tips */}
                  <div className="mt-3 space-y-1">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Recommended Steps:</p>
                    <ul className="text-[10px] font-bold text-slate-600 space-y-1 ml-4">
                      <li className="list-disc">Review last exam patterns and common mistakes</li>
                      <li className="list-disc">Schedule {Math.ceil((100 - subject.currentMarks) / 10)} extra study sessions</li>
                      <li className="list-disc">Seek faculty guidance on weak topics</li>
                      {subject.avgMarks > subject.currentMarks && (
                        <li className="list-disc">Target: Reach your average of {subject.avgMarks} marks</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-rose-200 rounded-2xl p-4">
              <Award className="w-5 h-5 text-rose-500 flex-shrink-0" />
              <p className="text-xs font-bold text-rose-900">
                <span className="font-black">Focus Goal:</span> Improve these {criticalSubjects.length} subject{criticalSubjects.length > 1 ? 's' : ''} by at least 10 marks this semester to achieve balanced academic performance.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS SHOWCASE - For Improving Subjects */}
      {improvingSubjects.length > 0 && (
        <div className="bg-gradient-to-br from-emerald-50 to-indigo-50 border border-emerald-200 rounded-[2.5rem] p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-emerald-600" />
            <div>
              <h3 className="text-base font-black text-emerald-900 uppercase tracking-tight">🎯 Momentum Builders</h3>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Keep Up The Great Work!</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {improvingSubjects.map((subject, idx) => (
              <div key={idx} className="bg-white border border-emerald-200 rounded-xl px-4 py-2 flex items-center gap-2">
                <span className="text-sm font-black text-slate-900">{subject.name}</span>
                <span className="text-xs font-black text-emerald-600">+{subject.marksDifference}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {analytics.map((subject, index) => (
          <div
            key={index}
            className={`border-l-4 ${getPerformanceColor(subject.performance)} bg-slate-50 border border-slate-100 rounded-[2rem] p-6 hover:bg-white transition-all group`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Subject Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-base font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {subject.name}
                  </h3>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${getTrendColor(subject.trend)}`}>
                    {getTrendIcon(subject.trend)}
                    <span className="text-[9px] font-black uppercase tracking-widest">
                      {subject.trend}
                    </span>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="flex items-center gap-6 mb-4">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Current</p>
                    <p className="text-2xl font-black text-slate-900">{subject.currentMarks} <span className="text-sm text-slate-400">/ 100</span></p>
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-0.5">Grade: {subject.currentGrade}</p>
                  </div>
                  
                  <div className="w-px h-12 bg-slate-200"></div>
                  
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Previous</p>
                    <p className="text-xl font-black text-slate-500">{subject.previousMarks}</p>
                  </div>

                  <div className="w-px h-12 bg-slate-200"></div>

                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Change</p>
                    <p className={`text-xl font-black ${subject.marksDifference > 0 ? 'text-emerald-600' : subject.marksDifference < 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                      {subject.marksDifference > 0 ? '+' : ''}{subject.marksDifference}
                    </p>
                  </div>

                  <div className="w-px h-12 bg-slate-200"></div>

                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Avg</p>
                    <p className="text-xl font-black text-blue-600">{subject.avgMarks}</p>
                  </div>
                </div>

                {/* Recommendation */}
                <div className={`flex items-start gap-3 p-4 rounded-xl border ${getRecommendationStyle(subject.recommendation.type)}`}>
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">
                      {subject.recommendation.priority.toUpperCase()} PRIORITY
                    </p>
                    <p className="text-xs font-bold leading-relaxed">
                      {subject.recommendation.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini Trend Chart */}
              <div className="lg:w-48 flex flex-col items-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Historical Trend</p>
                <div className="flex items-end gap-2 h-24 w-full justify-center">
                  {subject.history.map((point, idx) => {
                    const height = (point.marks / 100) * 100;
                    const isLatest = idx === subject.history.length - 1;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 group/bar">
                        <div className="relative flex-1 w-full flex items-end">
                          <div
                            className={`w-full rounded-t-lg transition-all ${
                              isLatest ? 'bg-gradient-to-t from-indigo-500 to-indigo-600' : 'bg-slate-300'
                            } ${isLatest ? 'shadow-lg shadow-indigo-500/30' : ''}`}
                            style={{ height: `${height}%` }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded-lg text-[8px] font-black opacity-0 group-hover/bar:opacity-100 transition-all whitespace-nowrap">
                              {point.marks}M
                            </div>
                          </div>
                        </div>
                        <p className="text-[8px] font-black text-slate-400 uppercase">S{point.semester}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Insights */}
      <div className="mt-10 grid sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-[2rem] p-6">
          <Award className="w-8 h-8 text-emerald-600 mb-3" />
          <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Strong Subjects</p>
          <p className="text-3xl font-black text-emerald-700">
            {analytics.filter(s => s.performance === 'excellent').length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-[2rem] p-6">
          <AlertCircle className="w-8 h-8 text-amber-600 mb-3" />
          <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-1">Needs Focus</p>
          <p className="text-3xl font-black text-amber-700">
            {analytics.filter(s => s.performance === 'needs-attention').length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-[2rem] p-6">
          <TrendingUp className="w-8 h-8 text-indigo-600 mb-3" />
          <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-1">Improving</p>
          <p className="text-3xl font-black text-indigo-700">
            {analytics.filter(s => s.trend === 'improving').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubjectAnalytics;


