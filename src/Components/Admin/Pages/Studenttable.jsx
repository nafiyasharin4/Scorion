import React, { useState, useEffect } from 'react';
import StudentList from '../Components/StudentManage/StudentList';
import StudentModal from '../Components/StudentManage/StudentModal';
import AdminHeader from '../Components/Header';
import { Users, UserCheck, UserX, GraduationCap, Plus, Search } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

function StudentGradeTable() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/admin/students', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setStudents(res.data.students || []);
    } catch (err) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleSaveStudent = async (studentData) => {
    try {
      if (editingStudent) {
        await axios.put(`http://localhost:5000/api/admin/edit-student/${editingStudent._id}`, studentData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        toast.success('Student updated');
      } else {
        await axios.post('http://localhost:5000/api/admin/add-student', studentData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        toast.success('Student added & invitation sent!');
      }
      fetchStudents();
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };
  const handleToggleBlock = async (student) => {
    const endpoint = student.isBlocked 
      ? `http://localhost:5000/api/admin/unblock-student/${student._id}` 
      : `http://localhost:5000/api/admin/block-student/${student._id}`;
      
    try {
      await axios.put(endpoint, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      toast.success(`Access ${student.isBlocked ? 'Authorized' : 'Suspended'}`);
      fetchStudents();
    } catch (err) {
      toast.error('Action failed');
    }
  };
  const stats = [
    { label: 'Enrolled Students', value: students.length, icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Active Learners', value: students.filter(s => !s.isBlocked).length, icon: UserCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Blocked Access', value: students.filter(s => s.isBlocked).length, icon: UserX, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { label: 'Academic Courses', value: [...new Set(students.map(s => s.course))].length, icon: GraduationCap, color: 'text-cyan-400', bg: 'bg-cyan-500/10' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl">
        
        {/* Header Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              Student <span className="text-indigo-400">Registry</span>
            </h1>
            <p className="text-slate-400 font-medium">Manage academic enrollments and system permissions.</p>
          </div>
          <button
            onClick={handleAddStudent}
            className="flex items-center gap-2 px-6 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Enroll New Student
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-800 border border-slate-700/50 p-6 rounded-2xl group transition-all hover:border-slate-600">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors">{stat.value}</p>
                </div>
                <div className={`${stat.bg} p-3 rounded-xl transition-transform group-hover:scale-110`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* List Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
          <StudentList
            students={students}
            onEdit={handleEditStudent}
            onToggleBlock={handleToggleBlock}
            loading={loading}
          />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <StudentModal
            student={editingStudent}
            onSave={handleSaveStudent}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </main>
    </div>
  );
}

export default StudentGradeTable;