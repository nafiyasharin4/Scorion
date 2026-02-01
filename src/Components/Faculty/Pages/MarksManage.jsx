import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import TeacherHeader from '../Components/Header';
import StudentMarkList from '../Components/MarksManage/StudentMarkList';
import MarkModal from '../Components/MarksManage/MarkModal';

function MarkManagePage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch all students
      const studentsRes = await axios.get('http://localhost:5000/api/teacher/studentsearch/');
      const allStudents = studentsRes.data.students;

      // 2. Fetch all marks
      const marksRes = await axios.get('http://localhost:5000/api/teacher/marks');
      const allMarks = marksRes.data.marks;

      // 3. Merge data
      const mergedStudents = allStudents.map(s => {
        const studentMarks = {};
        allMarks
          .filter(m => m.student && m.student._id === s._id)
          .forEach(m => {
            studentMarks[m.semester] = {
              subjects: m.subjects,
              totalGrade: m.totalGrade,
              sgpa: m.sgpa,
              _id: m._id // Store original mark ID for updates
            };
          });

        return {
          id: s._id,
          name: s.name,
          email: s.email,
          phone: s.phone || 'N/A',
          course: s.course,
          semester: s.semester,
          status: s.status ? s.status.toLowerCase() : 'active',
          enrollmentDate: s.createdAt,
          marks: studentMarks
        };
      });

      setStudents(mergedStudents);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to synchronize academic records');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMarks = (student, semester = '') => {
    setEditingStudent(student);
    setSelectedSemester(semester);
    setIsModalOpen(true);
  };

  const handleSaveMarks = async (studentId, semester, markData) => {
    try {
      const student = students.find(s => s.id === studentId);
      const existingMark = student.marks[semester];

      if (existingMark) {
        // Update existing mark
        await axios.put(`http://localhost:5000/api/teacher/update/${existingMark._id}`, {
          ...markData,
          SGPA: markData.sgpa // Match backend field casing if necessary
        });
        toast.success(`Semester ${semester} marks updated`);
      } else {
        // Add new mark
        const payload = {
          studentId,
          semester,
          ...markData
        };
        await axios.post('http://localhost:5000/api/teacher/add-mark', payload);
        toast.success(`Marks initialized for Semester ${semester}`);
      }
      
      // Refresh data
      await fetchData();
      setIsModalOpen(false);
      setEditingStudent(null);
      setSelectedSemester('');
    } catch (error) {
      console.error('Error saving marks:', error);
      toast.error('Critical failure in mark synchronization');
    }
  };

  const handleDeleteMarks = async (studentId, semester) => {
    const student = students.find(s => s.id === studentId);
    const markRecord = student?.marks[semester];
    
    if (!markRecord?._id) {
      toast.error('Record integrity failure: No internal ID found');
      return;
    }

    if (window.confirm(`Permanently purge Semester ${semester} records for ${student.name}?`)) {
      try {
        const token = localStorage.getItem('teacherToken');
        if (!token) {
          toast.error('Session expired. Please login again.');
          return;
        }
        
        await axios.delete(`http://localhost:5000/api/teacher/delete-mark/${markRecord._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success(`Semester ${semester} registry purged`);
        await fetchData();
      } catch (error) {
        console.error('Purge failure:', error);
        toast.error(error.response?.data?.message || 'Failed to purge academic record');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
    setSelectedSemester('');
  };

  // Calculate statistics
  const studentsWithMarks = students.filter(student => student.marks && Object.keys(student.marks).length > 0);
  const totalSemesters = students.reduce((total, student) => 
    total + (student.marks ? Object.keys(student.marks).length : 0), 0
  );

  const averageSGPA = studentsWithMarks.length > 0 
    ? studentsWithMarks.reduce((sum, student) => {
        const semesterGPAs = Object.values(student.marks).map(mark => mark.sgpa);
        const studentAvg = semesterGPAs.reduce((a, b) => a + b, 0) / semesterGPAs.length;
        return sum + studentAvg;
      }, 0) / studentsWithMarks.length
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="text-cyan-500 font-black uppercase tracking-widest text-xs">Accessing Student Records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <TeacherHeader />
      
      <main className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              Mark <span className="text-cyan-400">Management</span>
            </h1>
            <p className="text-slate-400 font-medium font-bold uppercase tracking-widest text-[10px]">Academic Performance Monitoring</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Students', value: students.length, color: 'text-indigo-400', bg: 'bg-indigo-500/10', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
            { label: 'With Marks', value: studentsWithMarks.length, color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Total Semesters', value: totalSemesters, color: 'text-purple-400', bg: 'bg-purple-500/10', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
            { label: 'Avg SGPA', value: averageSGPA.toFixed(2), color: 'text-orange-400', bg: 'bg-orange-500/10', icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z' }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-800 border border-slate-700/50 p-6 rounded-2xl hover:border-slate-600 transition-colors group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors">{stat.value}</p>
                </div>
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <svg className={`w-6 h-6 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Student Mark List */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
          <StudentMarkList
            students={students}
            onAddMarks={handleAddMarks}
            onDeleteMarks={handleDeleteMarks}
          />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <MarkModal
            student={editingStudent}
            semester={selectedSemester}
            onSave={handleSaveMarks}
            onClose={handleCloseModal}
          />
        )}
      </main>
    </div>
  );
}

export default MarkManagePage;