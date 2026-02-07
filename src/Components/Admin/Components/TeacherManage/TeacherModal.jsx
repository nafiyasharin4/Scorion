import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, BookOpen, GraduationCap, Briefcase, Calendar, IndianRupee, ShieldCheck, Loader2, Clock, ShieldAlert } from 'lucide-react';

const TeacherModal = ({ teacher, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    subject: '',
    highestQualification: '',
    teachingExperience: '',
    joinDate: new Date().toISOString().split('T')[0],
    isBlocked: false,
    salary: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || '',
        email: teacher.email || '',
        phone: teacher.phone || '',
        department: teacher.department || '',
        subject: teacher.subject || '',
        highestQualification: teacher.highestQualification || '',
        teachingExperience: teacher.teachingExperience || '',
        joinDate: teacher.joinDate || new Date().toISOString().split('T')[0],
        isBlocked: teacher.isBlocked || false,
        salary: teacher.salary?.toString() || ''
      });
    }
  }, [teacher]);

  const validateForm = () => {
    const newErrors = {};

    if (!String(formData.name || '').trim()) newErrors.name = 'Full name is required';
    if (!String(formData.email || '').trim()) {
        newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
    }
    if (!String(formData.phone || '').trim()) newErrors.phone = 'Phone number is required';
    if (!String(formData.department || '').trim()) newErrors.department = 'Department is required';
    if (!String(formData.subject || '').trim()) newErrors.subject = 'Subject is required';
    if (!String(formData.highestQualification || '').trim()) newErrors.highestQualification = 'Qualification is required';
    if (!String(formData.salary || '').trim()) newErrors.salary = 'Salary is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Clean salary string to Number before saving
      const cleanSalary = typeof formData.salary === 'string' 
        ? Number(formData.salary.replace(/[^0-9]/g, '')) 
        : formData.salary;
        
      onSave({ ...formData, salary: cleanSalary });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const departments = [
    'Computer Science',
    'Commerce',
    'Business Administration',
    'Physics',
    'Arts & Humanities',
    'AI'
  ];

  const qualifications = ['Ph.D.', 'M.Sc.', 'M.A.', 'M.Tech', 'B.Tech', 'B.Sc.', 'B.A.'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="bg-slate-800 border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 py-6 bg-slate-900 border-b border-slate-700/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-cyan-500/10 p-2 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
             </div>
             <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                    {teacher ? 'Modify Personnel' : 'Initialize Access'}
                </h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                    Internal Faculty Record
                </p>
             </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto custom-scrollbar space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-cyan-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Robert Fox"
                  className={`w-full bg-slate-900 border-2 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-700 outline-none transition-all ${errors.name ? 'border-rose-500/50 focus:ring-rose-500/10' : 'border-slate-700 focus:ring-cyan-500/10'}`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">System Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-cyan-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="faculty@scorion.com"
                  className={`w-full bg-slate-900 border-2 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-700 outline-none transition-all ${errors.email ? 'border-rose-500/50 focus:ring-rose-500/10' : 'border-slate-700 focus:ring-cyan-500/10'}`}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-cyan-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full bg-slate-900 border-2 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-700 outline-none transition-all ${errors.phone ? 'border-rose-500/50 focus:ring-rose-500/10' : 'border-slate-700 focus:ring-cyan-500/10'}`}
                />
              </div>
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Annual Sustenance (INR)</label>
              <div className="relative group">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400" />
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="75,000"
                  className={`w-full bg-slate-900 border-2 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-700 outline-none transition-all ${errors.salary ? 'border-rose-500/50 focus:ring-rose-500/10' : 'border-slate-700 focus:ring-cyan-500/10'}`}
                />
              </div>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Department</label>
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-cyan-400" />
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                </select>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Specialization</label>
              <div className="relative group">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-cyan-400" />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Advanced Quantum Theory"
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-700 outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

             {/* Qualification */}
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Credentials</label>
              <div className="relative group">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-cyan-400" />
                <select
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Choose Qualification</option>
                  {qualifications.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Experience Tenure</label>
              <div className="relative group">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-cyan-400" />
                <input
                  type="text"
                  name="teachingExperience"
                  value={formData.teachingExperience}
                  onChange={handleChange}
                  placeholder="8 Years"
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-700 outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            {/* Join Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Commission Date</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-cyan-400" />
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="px-10 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              {teacher ? 'Update Registry' : 'Grant Access'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;