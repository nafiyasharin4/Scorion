// StudentMarkList.jsx
import React, { useState } from 'react';

const StudentMarkList = ({ students, onAddMarks, onDeleteMarks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
    
    return matchesSearch && matchesCourse;
  });

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A': 'bg-green-100 text-green-800 border border-green-200',
      'A-': 'bg-green-50 text-green-700 border border-green-100',
      'B+': 'bg-blue-100 text-blue-800 border border-blue-200',
      'B': 'bg-blue-50 text-blue-700 border border-blue-100',
      'B-': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'C+': 'bg-orange-100 text-orange-800 border border-orange-200',
      'C': 'bg-orange-50 text-orange-700 border border-orange-100',
      'F': 'bg-red-100 text-red-800 border border-red-200'
    };
    
    return gradeColors[grade] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  const courses = [...new Set(students.map(student => student.course))];
  const allSemesters = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header with Filters */}
      <div className="p-8 border-b border-slate-700/50 bg-slate-900/40">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Academic Registry</h2>
            <div className="flex gap-1">
               {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>)}
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 group">
              <input
                type="text"
                placeholder="Search students by identity..."
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
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-6 py-3.5 bg-slate-950 border border-slate-700 rounded-2xl text-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-slate-900 transition-colors"
              >
                <option value="all">Domain: All</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="overflow-hidden">
        {filteredStudents.length === 0 ? (
          <div className="p-20 text-center opacity-40">
            <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl font-black text-slate-400 uppercase tracking-tighter">No Academic Data Found</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700/30">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-8 hover:bg-slate-700/10 transition-colors group/row">
                {/* Student Header */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-slate-950 border border-slate-700 rounded-2xl flex items-center justify-center text-cyan-400 font-black ring-2 ring-slate-800 shadow-inner group-hover/row:ring-cyan-500/30 transition-all">
                      {student.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white group-hover/row:text-cyan-400 transition-colors">{student.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                         <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{student.course}</span>
                         <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                         <span className="text-[10px] text-cyan-500/80 font-black uppercase tracking-widest">Semester {student.semester}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onAddMarks(student)}
                    className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 text-[10px] uppercase tracking-widest"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Initialize Marks
                  </button>
                </div>

                {/* Semester Marks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {allSemesters.map(semester => {
                    const semMarks = student.marks?.[semester.toString()];
                    
                    return (
                      <div key={semester} className={`rounded-2xl p-5 border transition-all ${semMarks ? 'bg-slate-900 border-slate-700/50 hover:border-slate-500/50 shadow-lg' : 'bg-slate-950/30 border-slate-800/50 border-dashed'}`}>
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Semester {semester}</h4>
                          {semMarks ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => onAddMarks(student, semester.toString())}
                                className="p-1.5 bg-slate-800 text-slate-400 hover:text-cyan-400 rounded-lg transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => onDeleteMarks(student.id, semester.toString())}
                                className="p-1.5 bg-slate-800 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <button
                               onClick={() => onAddMarks(student, semester.toString())}
                               className="text-[9px] font-black text-cyan-500/60 uppercase tracking-widest hover:text-cyan-400 transition-colors"
                            >
                               Initialize
                            </button>
                          )}
                        </div>

                        {semMarks ? (
                          <div className="space-y-4">
                            <div className="flex justify-between items-end">
                               <div>
                                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Performance Index</p>
                                  <p className="text-2xl font-black text-white">{semMarks.sgpa}</p>
                               </div>
                               <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getGradeColor(semMarks.totalGrade)}`}>
                                 {semMarks.totalGrade}
                               </span>
                            </div>
                            
                            <div className="pt-4 border-t border-slate-800 space-y-2">
                              {semMarks.subjects.map((subject, index) => (
                                <div key={index} className="flex justify-between items-center group/sub">
                                  <span className="text-[10px] font-bold text-slate-400 truncate pr-2 group-hover/sub:text-slate-300 transition-colors">{subject.name}</span>
                                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-black border ${getGradeColor(subject.grade)}`}>
                                    {subject.grade}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="py-8 text-center">
                             <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest">No Records</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-8 py-5 border-t border-slate-700/50 bg-slate-900/40">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
           System Registry Integrity: <span className="text-slate-300">{filteredStudents.length}</span> / {students.length} STUDENT ENTRIES
        </p>
      </div>
    </div>
  );
};

export default StudentMarkList;