// components/StudentList.js
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const StudentListTable = ({ students, onEdit, onDelete, onAddNotes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
    
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800 border border-green-200',
      inactive: 'bg-red-100 text-red-800 border border-red-200',
      suspended: 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const courses = [...new Set(students.map(student => student.course))];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header with Filters */}
      <div className="p-8 border-b border-slate-700/50 bg-slate-900/40">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Student Registry</h2>
            <div className="flex gap-1">
               {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>)}
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 group">
              <input
                type="text"
                placeholder="Search students by identity or credentials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none text-white placeholder-slate-600 transition-all font-medium"
              />
              <svg className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3.5 bg-slate-950 border border-slate-700 rounded-2xl text-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:bg-slate-900 transition-colors"
              >
                <option value="all">Status: All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
              
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-4 py-3.5 bg-slate-950 border border-slate-700 rounded-2xl text-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:bg-slate-900 transition-colors"
              >
                <option value="all">Course: All</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900/60 border-b border-slate-700/50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Student Identity</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Contact & Access</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Academic Path</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Commissioned</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center justify-center opacity-40">
                    <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xl font-black text-slate-400 uppercase tracking-tighter">No Registry Records Found</p>
                    <p className="text-sm text-slate-500 mt-2 font-medium">Verify your synchronization parameters and try again.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-700/20 transition-colors group">
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-slate-950 border border-slate-700 rounded-xl flex items-center justify-center text-cyan-400 font-black shadow-inner ring-2 ring-slate-800 group-hover:ring-cyan-500/30 transition-all">
                        {student.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors">{student.name}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">ID: #{student.id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-300">{student.email}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{student.phone}</div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-300">{student.course}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{student.department || 'N/A'}</div>
                    <div className="text-[10px] text-cyan-500/80 font-black uppercase tracking-widest mt-1">Semester {student.semester}</div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    {student.status === 'active' ? (
                       <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
                    ) : student.status === 'inactive' ? (
                       <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20">Inactive</span>
                    ) : (
                       <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">Suspended</span>
                    )}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-xs font-bold text-slate-500">
                    {new Date(student.enrollmentDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onAddNotes && onAddNotes(student)}
                        className="p-2.5 bg-purple-950 border border-purple-700 text-purple-400 hover:text-purple-300 hover:border-purple-500/50 rounded-xl transition-all shadow-sm"
                        title="Add Improvement Notes"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(student)}
                        className="p-2.5 bg-slate-950 border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 rounded-xl transition-all shadow-sm"
                        title="Modify Profile"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
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
      <div className="px-8 py-5 border-t border-slate-700/50 bg-slate-900/40">
        <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <p>
            Authorized Overview: <span className="text-slate-300">{filteredStudents.length}</span> / {students.length} PERSONNEL
          </p>
          <p className="text-cyan-500/60 tracking-[0.3em]">SECURE SYSTEM MODULE</p>
        </div>
      </div>
    </div>
  );
};

export default StudentListTable;