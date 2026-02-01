import { GraduationCap, Bell, User } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const navigate = useNavigate();
    const [notificationCount, setNotificationCount] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        const dataKey = storedRole === 'teacher' ? 'teacherData' : 'userData';
        const storedData = localStorage.getItem(dataKey);
        
        if (storedData) {
            try {
                setUser(JSON.parse(storedData));
            } catch (e) {
                console.error("Failed to parse user data", e);
            }
        }
        
        // Fetch unread notification count
        fetchUnreadCount();
        
        // Poll every 30 seconds for new notifications
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchUnreadCount = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) return;
            
            const response = await axios.get('http://localhost:5000/api/user/notifications/unread-count', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotificationCount(response.data.count || 0);
        } catch (error) {
            // Silently fail - user might not have notifications yet
            console.log('No notifications or error fetching count');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('teacherToken');
        localStorage.removeItem('role');
        localStorage.removeItem('userData');
        localStorage.removeItem('teacherData');
        navigate('/login');
    };

    const handleNotificationClick = () => {
        navigate('/notification');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-[100] shadow-sm border-b border-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link to="/home" className="flex items-center gap-3 group">
                        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                            <GraduationCap className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-black text-slate-800 tracking-tighter group-hover:text-indigo-600 transition-colors">SCORION</h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/home" className="text-slate-500 hover:text-indigo-600 font-bold text-xs uppercase tracking-[0.2em] transition">Hub</Link>
                        <Link to="/courses" className="text-slate-500 hover:text-indigo-600 font-bold text-xs uppercase tracking-[0.2em] transition">Syllabus</Link>
                        <Link to="/community" className="text-slate-500 hover:text-indigo-600 font-bold text-xs uppercase tracking-[0.2em] transition">Network</Link>
                        
                        <div className="h-6 w-[1px] bg-slate-100 mx-2"></div>

                        {/* Profile/User Identity */}
                        {user && (
                            <Link 
                                to="/profile" 
                                className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-white transition group shadow-sm hover:shadow-md"
                            >
                                <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center border border-indigo-200 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all">
                                    <User className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 leading-none uppercase tracking-widest">Operator</span>
                                    <span className="text-xs font-bold text-slate-800 tracking-tight truncate max-w-[100px]">
                                        {user.name}
                                    </span>
                                </div>
                            </Link>
                        )}

                        {/* Notification */}
                        <button
                            onClick={handleNotificationClick}
                            className="relative p-2.5 hover:bg-slate-50 rounded-2xl transition group border border-transparent hover:border-slate-100"
                        >
                            <Bell className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition" />
                            {notificationCount > 0 && (
                                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
                            )}
                        </button>

                        <button
                            onClick={handleLogout}
                            className="px-6 py-2.5 bg-rose-50 text-rose-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-rose-600 hover:text-white transition-all active:scale-95 shadow-sm border border-rose-100"
                        >
                            Terminate
                        </button>
                    </div>

                    {/* Mobile menu button (Simplified) */}
                    <div className="md:hidden flex items-center gap-4">
                         {user && (
                            <Link to="/profile" className="text-xs font-bold text-indigo-600">{user.name}</Link>
                         )}
                         <button onClick={handleLogout} className="text-rose-500 text-xs font-bold">EXIT</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
