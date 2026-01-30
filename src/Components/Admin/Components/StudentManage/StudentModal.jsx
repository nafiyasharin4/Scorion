import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, GraduationCap, Calendar, ShieldCheck, Database, Layers } from 'lucide-react';

const StudentModal = ({ student, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    semester: '1',
    isBlocked: false,
    enrollmentDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        course: student.course || '',
        semester: student.semester || '1',
        isBlocked: student.isBlocked || false,
        enrollmentDate: student.enrollmentDate || new Date().toISOString().split('T')[0]
      });
    }
  }, [student]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name required';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    if (!formData.course.trim()) newErrors.course = 'Course required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const courses = [
    'BCA (Bachelor of Computer Applications)', 
    'B.Sc Computer Science', 
    'B.Sc Information Technology',
    'B.Voc Software Development',
    'B.Voc Data Science',
    'B.Com Computer Application', 
    'B.Com Finance',
    'BBA (Bachelor of Business Administration)',
    'B.Sc Mathematics',
    'B.Sc Physics',
    'B.Sc Chemistry',
    'B.A. English Language & Literature',
    'B.A. Economics',
    'B.A. Sociology'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-slate-800 border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 py-6 bg-slate-900 border-b border-slate-700/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-indigo-500/10 p-2 rounded-lg">
                <Database className="w-6 h-6 text-indigo-400" />
             </div>
             <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                    {student ? 'Edit Enrollment' : 'New Enrollment'}
                </h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                    Authorized Student Database
                </p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto custom-scrollbar space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Student Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-indigo-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Rivera"
                  className={`w-full bg-slate-900 border-2 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-700 outline-none transition-all ${errors.name ? 'border-rose-500/50' : 'border-slate-700 focus:ring-2 focus:ring-indigo-500/20'}`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Official Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-indigo-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@scorion.edu"
                  className={`w-full bg-slate-900 border-2 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-700 outline-none transition-all ${errors.email ? 'border-rose-500/50' : 'border-slate-700 focus:ring-2 focus:ring-indigo-500/20'}`}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Link</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-indigo-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+00 123 456 78"
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            {/* Course */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Major / Program</label>
              <div className="relative group">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-indigo-400" />
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Major</option>
                  {courses.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Semester */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Active Semester</label>
              <div className="relative group">
                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-indigo-400" />
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map(sem => <option key={sem} value={sem.toString()}>Term {sem}</option>)}
                </select>
              </div>
            </div>

            {/* Enrollment Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Admission Date</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-indigo-400" />
                <input
                  type="date"
                  name="enrollmentDate"
                  value={formData.enrollmentDate}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

             {/* Block Toggle */}
             <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-700/50">
                <div className="flex items-center gap-3">
                    <ShieldCheck className={`w-5 h-5 ${formData.isBlocked ? 'text-rose-500' : 'text-slate-500'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Suspend Access</span>
                </div>
                <input
                    type="checkbox"
                    name="isBlocked"
                    checked={formData.isBlocked}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-slate-700 text-indigo-500 bg-slate-900 cursor-pointer"
                />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-700/50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              Abort
            </button>
            <button
              type="submit"
              className="px-10 py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              {student ? 'Confirm Update' : 'Initialize Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;