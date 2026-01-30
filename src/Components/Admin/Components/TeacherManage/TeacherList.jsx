import React, { useState } from 'react';
import { Search, Filter, Edit2, Trash2, Mail, Phone, BookOpen, GraduationCap, Clock, ShieldAlert } from 'lucide-react';

const TeacherList = ({ teachers, onEdit, onDelete, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      (teacher.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (teacher.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (teacher.subject?.toLowerCase().includes(searchTerm.toLowerCase()));
      
    // Logic for blocked status
    const isBlocked = teacher.isBlocked;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && !isBlocked) || 
                         (statusFilter === 'blocked' && isBlocked);
                         
    const matchesDepartment = departmentFilter === 'all' || teacher.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusBadge = (isBlocked) => {
    if (isBlocked) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <ShieldAlert className="w-3 h-3" />
          Blocked
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <Clock className="w-3 h-3" />
        Active
      </span>
    );
  };

  const departments = [...new Set(teachers.map(teacher => teacher.department))].filter(Boolean);

  if (loading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Synchronizing Faculty Data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search & Filter Bar */}
      <div className="p-6 border-b border-slate-700/50 bg-slate-800/50">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="text"
              placeholder="Search faculty by name, email, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none text-white placeholder-slate-500 transition-all font-medium"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-slate-300 outline-none focus:ring-2 focus:ring-cyan-500 font-bold text-xs uppercase tracking-widest cursor-pointer hover:bg-slate-800 transition-colors"
            >
              <option value="all">Status: All</option>
              <option value="active">Status: Active</option>
              <option value="blocked">Status: Blocked</option>
            </select>
            
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-slate-300 outline-none focus:ring-2 focus:ring-cyan-500 font-bold text-xs uppercase tracking-widest cursor-pointer hover:bg-slate-800 transition-colors"
            >
              <option value="all">Dept: All</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900/40 border-b border-slate-700/50">
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Faculty Identity</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Domain & Specialization</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Experience</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">System Status</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {filteredTeachers.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center justify-center opacity-40">
                    <BookOpen className="w-16 h-16 text-slate-600 mb-4" />
                    <p className="text-xl font-black text-slate-400 uppercase tracking-tighter">No Personnel Found</p>
                    <p className="text-sm text-slate-500 mt-2 font-medium">Verify your filter parameters and try again.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTeachers.map((teacher) => (
                <tr key={teacher._id} className="hover:bg-slate-700/20 transition-colors group">
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center text-cyan-400 font-black shadow-inner ring-2 ring-slate-800 group-hover:ring-cyan-500/30 transition-all">
                        {teacher.name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors">{teacher.name}</div>
                        <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-1">
                          <Mail className="w-3 h-3" />
                          {teacher.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-300">{teacher.department}</div>
                    <div className="text-xs text-cyan-500/80 font-bold mt-1 uppercase tracking-wider">{teacher.subject}</div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex flex-col">
                       <span className="text-sm font-bold text-slate-300">{teacher.teachingExperience || 'N/A'}</span>
                       <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{teacher.highestQualification}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    {getStatusBadge(teacher.isBlocked)}
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(teacher)}
                        className="p-2.5 bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 rounded-xl transition-all shadow-sm group/btn"
                        title="Edit Profile"
                      >
                        <Edit2 className="w-4.5 h-4.5" />
                      </button>
                      <button
                        onClick={() => onDelete(teacher._id)}
                        className="p-2.5 bg-slate-900 border border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-500/50 rounded-xl transition-all shadow-sm"
                        title="Remove Access"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination / Info Footer */}
      <div className="px-6 py-4 bg-slate-900/20 border-t border-slate-700/50">
        <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
           <span>Displaying {filteredTeachers.length} of {teachers.length} authorized personnel</span>
           <div className="flex gap-2">
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded">Page 1</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherList;