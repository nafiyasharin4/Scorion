import React, { useState } from 'react';
import { Search, Edit2, Trash2, Mail, Phone, BookOpen, GraduationCap, Clock, ShieldAlert, User, Database, UserCheck, UserX } from 'lucide-react';

const StudentList = ({ students, onEdit, onToggleBlock, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      (student.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.email?.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const isBlocked = student.isBlocked;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && !isBlocked) || 
                         (statusFilter === 'blocked' && isBlocked);
                         
    const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
    const matchesDept = deptFilter === 'all' || student.department === deptFilter;
    
    return matchesSearch && matchesStatus && matchesCourse && matchesDept;
  });

  const getStatusBadge = (isBlocked) => {
    if (isBlocked) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <ShieldAlert className="w-3 h-3" />
          Access Denied
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
        <Clock className="w-3 h-3" />
        Authorized
      </span>
    );
  };

  const courses = [...new Set(students.map(s => s.course))].filter(Boolean);
  const departments = [...new Set(students.map(s => s.department))].filter(Boolean);

  if (loading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Pulling Registry Data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-800">
      {/* Search & Filter */}
      <div className="p-6 border-b border-slate-700/50 bg-slate-800/50">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              placeholder="Query by student name or credentials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-slate-600 transition-all font-medium"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-slate-800 transition-colors"
            >
              <option value="all">Access: All</option>
              <option value="active">Access: Authorized</option>
              <option value="blocked">Access: Denied</option>
            </select>

            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-slate-800 transition-colors"
            >
              <option value="all">Dept: All</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-slate-800 transition-colors"
            >
              <option value="all">Program: All</option>
              {courses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900/40 border-b border-slate-700/50">
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Student Identity</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Program & Level</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">System Status</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Enrolled Since</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center justify-center opacity-40">
                    <Database className="w-16 h-16 text-slate-600 mb-4" />
                    <p className="text-xl font-black text-slate-400 uppercase tracking-tighter">Null Dataset</p>
                    <p className="text-sm text-slate-500 mt-2">Try adjusting your filters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-slate-700/20 transition-colors group">
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center text-indigo-400 font-black shadow-inner ring-2 ring-slate-800 group-hover:ring-indigo-500/30 transition-all">
                        {student.name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors">{student.name}</div>
                        <div className="text-[11px] text-slate-500 font-bold flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-600" />
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-300">{student.course}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{student.department}</div>
                    <div className="text-[10px] text-indigo-400/80 font-black mt-1 uppercase tracking-widest">Semester {student.semester}</div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    {getStatusBadge(student.isBlocked)}
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <span className="text-xs font-bold text-slate-500">
                      {new Date(student.createdAt || student.enrollmentDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(student)}
                        className="p-2.5 bg-slate-900 border border-slate-700 text-slate-500 hover:text-indigo-400 hover:border-indigo-500/50 rounded-xl transition-all"
                        title="Edit Profile"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleBlock(student)}
                        className={`p-2.5 bg-slate-900 border border-slate-700 rounded-xl transition-all ${
                          student.isBlocked 
                            ? 'text-emerald-500 hover:text-emerald-400 hover:border-emerald-500/50' 
                            : 'text-rose-500 hover:text-rose-400 hover:border-rose-500/50'
                        }`}
                        title={student.isBlocked ? "Authorize Access" : "Suspend Access"}
                      >
                        {student.isBlocked ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-slate-900/20 border-t border-slate-700/50">
        <div className="flex justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
           <span>Active Entries: {filteredStudents.length} / {students.length}</span>
           <span className="text-indigo-500 font-black">Authorized Access Only</span>
        </div>
      </div>
    </div>
  );
};

export default StudentList;