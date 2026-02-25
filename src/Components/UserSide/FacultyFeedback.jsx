import React from 'react';
import { MessageSquare, User, Clock, Lightbulb, BookOpen, Star } from 'lucide-react';

const FacultyFeedback = ({ semesterData }) => {
  if (!semesterData?.improvementNotes || 
      (!semesterData.improvementNotes.overall && 
       (!semesterData.improvementNotes.subjectSpecific || semesterData.improvementNotes.subjectSpecific.length === 0))) {
    return null; // Don't show if no feedback exists
  }

  const { overall, subjectSpecific, facultyName, lastUpdated } = semesterData.improvementNotes;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-[3rem] p-8 shadow-2xl shadow-purple-500/10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
              Faculty Guidance
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            </h3>
            <p className="text-[9px] font-black text-purple-600 uppercase tracking-widest mt-1">
              Personalized Improvement Roadmap
            </p>
          </div>
        </div>
        
        {lastUpdated && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-xl border border-purple-200">
            <Clock className="w-3 h-3 text-purple-500" />
            <span className="text-[9px] font-black text-purple-600 uppercase tracking-widest">
              {new Date(lastUpdated).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Faculty Info */}
      {facultyName && (
        <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl w-fit border border-purple-100">
          <User className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-black text-slate-700">
            From: <span className="text-indigo-600">{facultyName}</span>
          </span>
        </div>
      )}

      {/* Overall Feedback */}
      {overall && overall.trim() !== '' && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Overall Performance Insight</h4>
          </div>
          <div className="bg-white border border-purple-200 rounded-2xl p-5 shadow-sm max-h-60 overflow-y-auto custom-scrollbar">
            <p className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
              {overall}
            </p>
          </div>
        </div>
      )}

      {/* Subject-Specific Feedback */}
      {subjectSpecific && subjectSpecific.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Subject Focus Areas</h4>
          </div>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {subjectSpecific.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white border-l-4 border-indigo-400 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <h5 className="text-xs font-black text-slate-900 uppercase tracking-wide truncate">
                    {item.subjectName}
                  </h5>
                </div>
                <p className="text-sm font-medium text-slate-700 leading-relaxed ml-4 whitespace-pre-wrap break-words">
                  {item.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivational Footer */}
      <div className="mt-6 flex items-center gap-3 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 rounded-2xl p-4">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
        </div>
        <p className="text-xs font-bold text-slate-700">
          <span className="font-black text-purple-700">Pro Tip:</span> Review this feedback regularly and track your progress. 
          Reach out to your faculty for clarification or additional guidance anytime!
        </p>
      </div>
    </div>
  );
};

export default FacultyFeedback;


