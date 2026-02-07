import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import TeacherHeader from '../Components/Header';
import StudentListTable from '../Components/StudentManage/StudentList';
import StudentModal from '../Components/StudentManage/StudentModal';
import ImprovementNotesModal from '../Components/StudentManage/ImprovementNotesModal';

function TeacherStuendtTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedStudentForNotes, setSelectedStudentForNotes] = useState(null);
  const [studentMarks, setStudentMarks] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/teacher/studentsearch/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('teacherToken')}`
        }
      });
      
      // Normalize data to match component expectations
      const normalizedData = response.data.students.map(s => ({
        id: s._id,
        name: s.name || 'N/A',
        email: s.email,
        phone: s.phone || 'N/A',
        course: s.course || 'N/A',
        semester: s.semester || '1',
        status: s.status ? s.status.toLowerCase() : 'active',
        enrollmentDate: s.createdAt || new Date().toISOString()
      }));
      
      setStudents(normalizedData);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load student data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleSaveStudent = async (studentData) => {
    try {
      if (editingStudent) {
        // Since we don't have a direct "edit-student" on teacherRoutes yet, 
        // we might need to use admin route or add it to teacherRoutes.
        // For now, let's assume we can update if it matches backend capabilities
        // or just update locally if backend is not ready.
        // But the task says "view real users", so viewing is priority.
        
        // Let's implement local update for now if backend doesn't support teacher editing students
        setStudents(students.map(student => 
          student.id === editingStudent.id 
            ? { ...studentData, id: editingStudent.id }
            : student
        ));
        toast.success('Student record updated (local)');
      } else {
        // Add new student (local for now)
        const newStudent = {
          ...studentData,
          id: Date.now().toString()
        };
        setStudents([...students, newStudent]);
        toast.success('New student record created (local)');
      }
      setIsModalOpen(false);
      setEditingStudent(null);
    } catch (error) {
      toast.error('Failed to save student data');
    }
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleAddNotes = async (student) => {
    try {
      // Fetch student marks
      const token = localStorage.getItem('teacherToken');
      const response = await axios.get(`http://localhost:5000/api/teacher/marks?studentId=${student.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSelectedStudentForNotes(student);
      setStudentMarks(response.data.marks || []);
      setIsNotesModalOpen(true);
    } catch (error) {
      console.error('Error fetching marks:', error);
      toast.error('Failed to load student marks. Please try again.');
    }
  };

  const handleCloseNotesModal = () => {
    setIsNotesModalOpen(false);
    setSelectedStudentForNotes(null);
    setStudentMarks([]);
  };

  const handleNotesUpdate = () => {
    toast.success('Notes will be visible to student!');
    handleCloseNotesModal();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="text-cyan-500 font-black uppercase tracking-widest text-xs">Synchronizing Database...</p>
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
              Student <span className="text-cyan-400">Management</span>
            </h1>
            <p className="text-slate-400 font-medium font-bold uppercase tracking-widest text-[10px]">Registry Oversight Control</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Students', value: students.length, color: 'text-indigo-400', bg: 'bg-indigo-500/10', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
            { label: 'Active', value: students.filter(s => s.status === 'active').length, color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Inactive', value: students.filter(s => s.status === 'inactive').length, color: 'text-rose-400', bg: 'bg-rose-500/10', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Suspended', value: students.filter(s => s.status === 'suspended').length, color: 'text-amber-400', bg: 'bg-amber-500/10', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z' }
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

        {/* Student List */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
          <StudentListTable
            students={students}
            onEdit={handleEditStudent}
            onAddNotes={handleAddNotes}
          />
        </div>

        {/* Student Edit Modal */}
        {isModalOpen && (
          <StudentModal
            student={editingStudent}
            onSave={handleSaveStudent}
            onClose={handleCloseModal}
          />
        )}

        {/* Improvement Notes Modal */}
        {isNotesModalOpen && selectedStudentForNotes && (
          <ImprovementNotesModal
            student={selectedStudentForNotes}
            marks={studentMarks}
            onClose={handleCloseNotesModal}
            onUpdate={handleNotesUpdate}
          />
        )}
      </main>
    </div>
  );
}

export default TeacherStuendtTable;