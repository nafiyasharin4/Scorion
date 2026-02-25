import React, { useState, useEffect } from 'react';

const StudentModal = ({ student, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    department: '',
    semester: '1',
    status: 'active',
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
        department: student.department || '',
        semester: student.semester || '1',
        status: student.status || 'active',
        enrollmentDate: student.enrollmentDate ? student.enrollmentDate.split('T')[0] : new Date().toISOString().split('T')[0]
      });
    }
  }, [student]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const courses = [
    'BA English Language and Literature Honours',
    'BA Economics',
    'BBA Honours',
    'BCA Honours',
    'BSC Physics',
    'Bcom Co-operation Honours',
    'Bcom Computer Application',
    'Bcom Finance',
    'Mcom Finance',
    'MA English',
    'B.Sc. ARTIFICIAL INTELLIGENCE (HONOURS)'
  ];

  const departments = [
    'Computer Science',
    'Commerce',
    'Business Administration',
    'Physics',
    'Arts & Humanities',
    'AI'
  ];

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-[100] bg-slate-950/40">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="px-8 py-6 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              {student ? 'Edit Student File' : 'Initialize Student Record'}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">
              Registry Oversight Authority
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-950 border border-slate-700 text-slate-500 hover:text-white rounded-xl transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Identity</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-bold"
                placeholder="Enter Student Name"
              />
              {errors.name && <p className="text-[10px] text-rose-500 font-black ml-1 uppercase">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Comms Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-bold"
                placeholder="email@system.com"
              />
              {errors.email && <p className="text-[10px] text-rose-500 font-black ml-1 uppercase">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Terminal</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-bold"
                placeholder="+1 (000) 000-0000"
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Academic Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-bold"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Course */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Academic Program</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-bold"
              >
                <option value="">Select Stream</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Phase</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-bold"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem.toString()}>Phase {sem}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Operational Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-bold capitalize"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            {/* Enrollment Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Registry Date</label>
              <input
                type="date"
                name="enrollmentDate"
                value={formData.enrollmentDate}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-bold"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-slate-950 border border-slate-800 text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all"
            >
              Cancel Operation
            </button>
            <button
              type="submit"
              className="flex-[2] px-6 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              {student ? 'Commit Updates' : 'Authorize Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;


