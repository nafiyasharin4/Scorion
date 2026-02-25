import { API_BASE_URL } from '../../config';
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
import Header from '../../Components/UserSide/Header';

export default function NotificationPage() {
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
      const token = localStorage.getItem('userToken');
      const response = await axios.get(`${API_BASE_URL}/api/user/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success || response.data.notifications) {
        setNotifications(response.data.notifications || []);
      } else {
        toast.error(response.data.message || 'Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error(error.response?.data?.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.put(`${API_BASE_URL}/api/user/notifications/${id}/read`, {}, {
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
      const token = localStorage.getItem('userToken');
      await axios.put(`${API_BASE_URL}/api/user/notifications/mark-all-read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all as read:', error);
      toast.error('Failed to mark all as read');
    }
  };

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-gradient-to-br from-rose-50 to-red-50',
          border: 'border-rose-200',
          icon: 'bg-rose-600',
          iconColor: 'text-white',
          title: 'text-rose-900',
          IconComponent: AlertTriangle
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
          border: 'border-amber-200',
          icon: 'bg-amber-500',
          iconColor: 'text-white',
          title: 'text-amber-900',
          IconComponent: AlertTriangle
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-indigo-50 to-blue-50',
          border: 'border-indigo-200',
          icon: 'bg-indigo-600',
          iconColor: 'text-white',
          title: 'text-indigo-900',
          IconComponent: Info
        };
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'read') return n.isRead;
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Loading Notifications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Bell className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notifications</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                {unreadCount} Unread • {notifications.length} Total
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-200"
            >
              <Check className="w-4 h-4" />
              Mark All Read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {['all', 'unread', 'read'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                filter === f
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-100 p-16 text-center shadow-xl">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Bell className="w-10 h-10 text-slate-200" />
            </div>
            <h2 className="text-xl font-black text-slate-400 uppercase tracking-tight mb-2">No Notifications</h2>
            <p className="text-slate-400 text-sm font-medium">
              {filter === 'unread' ? 'All caught up! No unread notifications.' : 'You have no notifications yet.'}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedNotifications.map((notification) => {
                const styles = getSeverityStyles(notification.severity);
                const IconComponent = styles.IconComponent;
                
                return (
                  <div
                    key={notification._id}
                    onClick={() => !notification.isRead && markAsRead(notification._id)}
                    className={`${styles.bg} border-2 ${styles.border} rounded-3xl p-6 shadow-lg transition-all cursor-pointer hover:shadow-xl ${
                      !notification.isRead ? 'ring-2 ring-indigo-500/20' : 'opacity-75'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${styles.icon} p-3 rounded-2xl flex-shrink-0 shadow-lg`}>
                        <IconComponent className={`w-6 h-6 ${styles.iconColor}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className={`text-lg font-black ${styles.title} mb-1`}>
                              {notification.title}
                            </h3>
                            {notification.relatedSemester && (
                              <span className="inline-block px-2 py-0.5 bg-white/60 rounded-full text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">
                                Semester {notification.relatedSemester}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {!notification.isRead && (
                              <span className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></span>
                            )}
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                              {new Date(notification.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm font-medium text-slate-700 leading-relaxed mt-2 break-words">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            <Clock className="w-3 h-3" />
                            {new Date(notification.createdAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          {notification.isRead && (
                            <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
                              <CheckCircle className="w-3 h-3" />
                              Read
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Page Info */}
            {totalPages > 1 && (
              <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredNotifications.length)} of {filteredNotifications.length}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}