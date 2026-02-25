import { API_BASE_URL } from '../../../../config';
import React, { useState, useEffect } from 'react';
import { MessageSquare, Save, X, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ImprovementNotesModal = ({ student, marks, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [overallNotes, setOverallNotes] = useState('');
  const [subjectNotes, setSubjectNotes] = useState([]);

  useEffect(() => {
    if (marks && marks.length > 0) {
      // Default to latest semester
      const latest = marks[marks.length - 1];
      setSelectedSemester(latest);
      loadExistingNotes(latest);
    }
  }, [marks]);

  const loadExistingNotes = (semesterData) => {
    if (semesterData.improvementNotes) {
      setOverallNotes(semesterData.improvementNotes.overall || '');
      setSubjectNotes(semesterData.improvementNotes.subjectSpecific || []);
    } else {
      setOverallNotes('');
      // Initialize subject notes from subjects
      const initialSubjectNotes = semesterData.subjects.map(sub => ({
        subjectName: sub.name,
        feedback: ''
      }));
      setSubjectNotes(initialSubjectNotes);
    }
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
    loadExistingNotes(semester);
  };

  const handleSubjectNoteChange = (subjectName, feedback) => {
    setSubjectNotes(prev => {
      const existing = prev.find(n => n.subjectName === subjectName);
      if (existing) {
        return prev.map(n => 
          n.subjectName === subjectName ? { ...n, feedback } : n
        );
      } else {
        return [...prev, { subjectName, feedback }];
      }
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('teacherToken');
      
      // Get studentId from marks (populated data) or from student object
      const studentId = selectedSemester.student?._id || selectedSemester.student || student._id || student.id;
      
      console.log('Saving notes for studentId:', studentId, 'semester:', selectedSemester.semester);
      
      const payload = {
        studentId: studentId,
        semester: selectedSemester.semester,
        improvementNotes: {
          overall: overallNotes,
          subjectSpecific: subjectNotes.filter(n => n.feedback && n.feedback.trim() !== ''),
          lastUpdated: new Date()
        }
      };

      await axios.post(
        `${API_BASE_URL}/api/teacher/students/improvement-notes`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Improvement notes saved successfully!');
      onUpdate && onUpdate();
      onClose();
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('Failed to save improvement notes');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedSemester) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[3rem] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-8 text-white relative">
          <div className="absolute top-6 right-6">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Improvement Guidance</h2>
              <p className="text-indigo-100 text-sm font-bold">Personalized Feedback for {student.name}</p>
            </div>
          </div>

          {/* Semester Selector */}
          {marks.length > 1 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {marks.map((sem, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSemesterChange(sem)}
                  className={`px-4 py-2 rounded-xl font-black text-xs uppercase transition-all ${
                    selectedSemester.semester === sem.semester
                      ? 'bg-white text-indigo-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Semester {sem.semester}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-300px)]">
          {/* Overall Semester Feedback */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Overall Semester Feedback</h3>
            </div>
            <textarea
              value={overallNotes}
              onChange={(e) => setOverallNotes(e.target.value)}
              placeholder="Provide general feedback on student's overall performance, strengths, and areas for improvement..."
              className="w-full h-32 px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-indigo-500 focus:outline-none resize-none font-medium text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* Subject-Specific Feedback */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Subject-Specific Recommendations</h3>
            </div>
            
            <div className="space-y-4">
              {selectedSemester.subjects.map((subject, idx) => {
                const existingNote = subjectNotes.find(n => n.subjectName === subject.name);
                return (
                  <div key={idx} className="border-l-4 border-indigo-200 bg-slate-50 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-sm font-black text-slate-900">{subject.name}</h4>
                        <p className="text-xs font-bold text-slate-500">
                          Marks: {subject.marks}/100 • Grade: {subject.grade}
                        </p>
                      </div>
                    </div>
                    <textarea
                      value={existingNote?.feedback || ''}
                      onChange={(e) => handleSubjectNoteChange(subject.name, e.target.value)}
                      placeholder={`Specific feedback for ${subject.name}: topics to review, study strategies, etc...`}
                      className="w-full h-20 px-4 py-2 border border-slate-200 rounded-xl focus:border-indigo-400 focus:outline-none resize-none text-sm font-medium text-slate-700 placeholder:text-slate-400 bg-white"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
            <CheckCircle className="w-4 h-4" />
            <span>Your feedback will be visible to the student</span>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-300 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-500/30"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Feedback'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementNotesModal;