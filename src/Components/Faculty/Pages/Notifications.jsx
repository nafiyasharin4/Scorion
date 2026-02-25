

import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  XCircle,
  Info,
  Clock,
  Check,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import TeacherHeader from '../Components/Header';

export default function FacultyNotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('teacherToken');
      const response = await axios.get(`${API_BASE_URL}/api/teacher/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('teacherToken');
      await axios.put(`${API_BASE_URL}/api/teacher/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, isRead: true } : n
      ));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('teacherToken');
      await axios.put(`${API_BASE_URL}/api/teacher/notifications/mark-all-read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      toast.success('All alerts acknowledged');
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-gradient-to-br from-rose-950/20 to-red-950/20',
          border: 'border-rose-500/30',
          icon: 'bg-rose-600',
          iconColor: 'text-white',
          title: 'text-rose-200',
          IconComponent: AlertTriangle
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-br from-amber-950/20 to-orange-950/20',
          border: 'border-amber-500/30',
          icon: 'bg-amber-500',
          iconColor: 'text-white',
          title: 'text-amber-200',
          IconComponent: AlertTriangle
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-cyan-950/20 to-slate-900/50',
          border: 'border-cyan-500/30',
          icon: 'bg-cyan-600',
          iconColor: 'text-white',
          title: 'text-cyan-200',
          IconComponent: Info
        };
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'read') return n.isRead;
    return true;
  });

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <TeacherHeader />
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Synchronizing Alerts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <TeacherHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/5">
              <Bell className="w-7 h-7 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight leading-none">Command Alerts</h1>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">
                {unreadCount} Unread • {notifications.length} System Logs
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
               onClick={markAllAsRead}
               className="px-5 py-2.5 bg-cyan-600 text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-cyan-500 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/10"
            >
                <Check className="w-4 h-4" />
                Acknowledge All
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-8">
          {['all', 'unread', 'read'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                filter === f
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-cyan-500/50 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-800 p-20 text-center shadow-2xl">
            <div className="w-20 h-20 bg-slate-950 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-800">
              <Bell className="w-10 h-10 text-slate-800" />
            </div>
            <h2 className="text-xl font-black text-slate-500 uppercase tracking-tight mb-2">System Clear</h2>
            <p className="text-slate-600 text-sm font-bold uppercase tracking-widest">
              {filter === 'unread' ? 'No pending operational alerts' : 'Intelligence log is currently empty'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedNotifications.map((notification) => {
              const styles = getSeverityStyles(notification.severity);
              const IconComponent = styles.IconComponent;
              
              return (
                <div
                  key={notification._id}
                  onClick={() => !notification.isRead && markAsRead(notification._id)}
                  className={`${styles.bg} border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all group cursor-pointer ${
                    !notification.isRead ? 'ring-1 ring-cyan-500/20 shadow-lg shadow-cyan-500/5' : 'opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${styles.icon} p-3 rounded-2xl flex-shrink-0 shadow-lg`}>
                      <IconComponent className={`w-6 h-6 ${styles.iconColor}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className={`text-lg font-black ${styles.title} mb-1 tracking-tight`}>
                            {notification.title}
                          </h3>
                        </div>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="text-sm font-bold text-slate-300 leading-relaxed mt-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(notification.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}




