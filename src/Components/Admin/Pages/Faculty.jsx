

import React, { useState, useEffect } from 'react';
import TeacherList from '../Components/TeacherManage/TeacherList';
import TeacherModal from '../Components/TeacherManage/TeacherModal';
import AdminHeader from '../Components/Header';
import { Users, UserCheck, UserMinus, UserX, Plus, Search, Filter } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

function FacultyGradePage() {
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/admin/teachers`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setTeachers(res.data.teachers || []);
    } catch (err) {
      toast.error('Failed to fetch teachers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setIsModalOpen(true);
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleSaveTeacher = async (teacherData) => {
    try {
      if (editingTeacher) {
        await axios.put(`${API_BASE_URL}/api/admin/edit-teacher/${editingTeacher._id}`, teacherData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        toast.success('Teacher updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/add-teacher`, teacherData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        toast.success('Teacher added and invite email sent!');
      }
      fetchTeachers();
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };
  const handleToggleBlock = async (teacher) => {
    const endpoint = teacher.isBlocked 
      ? `${API_BASE_URL}/api/admin/unblockteacher/${teacher._id}` 
      : `${API_BASE_URL}/api/admin/blockteacher/${teacher._id}`;
      
    try {
      await axios.put(endpoint, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      toast.success(`Access ${teacher.isBlocked ? 'Authorized' : 'Suspended'}`);
      fetchTeachers();
    } catch (err) {
      toast.error('Action failed');
    }
  };
  const stats = [
    { 
      label: 'Total Faculty', 
      value: teachers.length, 
      icon: Users, 
      color: 'text-indigo-400', 
      bg: 'bg-indigo-500/10' 
    },
    { 
      label: 'Active', 
      value: teachers.filter(t => !t.isBlocked).length, 
      icon: UserCheck, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10' 
    },
    { 
      label: 'Blocked', 
      value: teachers.filter(t => t.isBlocked).length, 
      icon: UserX, 
      color: 'text-rose-400', 
      bg: 'bg-rose-500/10' 
    },
    { 
      label: 'Departments', 
      value: [...new Set(teachers.map(t => t.department))].length, 
      icon: Filter, 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10' 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl">
        {/* Page Title & Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              Faculty <span className="text-cyan-400">Management</span>
            </h1>
            <p className="text-slate-400 font-medium">Configure system access and administrative roles for academics.</p>
          </div>
          <button
            onClick={handleAddTeacher}
            className="flex items-center gap-2 px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Faculty Member
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-800 border border-slate-700/50 p-6 rounded-2xl hover:border-slate-600 transition-colors group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors">{stat.value}</p>
                </div>
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* List Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
          <TeacherList
            teachers={teachers}
            onEdit={handleEditTeacher}
            onToggleBlock={handleToggleBlock}
            loading={loading}
          />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <TeacherModal
            teacher={editingTeacher}
            onSave={handleSaveTeacher}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </main>
    </div>
  );
}

export default FacultyGradePage;




