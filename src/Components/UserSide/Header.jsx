

import { GraduationCap, Bell, User, Menu, X, LogOut, BookOpen, Users, LayoutDashboard } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [notificationCount, setNotificationCount] = useState(0);
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const fetchUnreadCount = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) return;
            
            const response = await axios.get(`${API_BASE_URL}/api/user/notifications/unread-count`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotificationCount(response.data.count || 0);
        } catch (error) {
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
        navigate('/notifications');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-[100] shadow-sm border-b border-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo Section */}
                    <Link to="/home" className="flex items-center gap-3 group relative z-[110]">
                        <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <GraduationCap className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors">
                            SCORION
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/home" className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${location.pathname === '/home' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}>Hub</Link>
                        <Link to="/courses" className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${location.pathname === '/courses' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}>Syllabus</Link>
                        <Link to="/community" className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${location.pathname === '/community' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}>Network</Link>
                        
                        <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>

                        {/* Profile/User Identity */}
                        {user && (
                            <Link 
                                to="/profile" 
                                className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-white transition-all group shadow-sm hover:shadow-md"
                            >
                                <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center border border-indigo-200 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all">
                                    <User className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-400 leading-none uppercase tracking-widest mb-0.5">Profile</span>
                                    <span className="text-xs font-bold text-slate-900 tracking-tight truncate max-w-[100px]">
                                        {user.name?.split(' ')[0]}
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
                                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white animate-pulse"></span>
                            )}
                        </button>

                        <button
                            onClick={handleLogout}
                            className="px-6 py-2.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-all active:scale-95 shadow-sm"
                        >
                            Sign Out
                        </button>
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center gap-3">
                        <button
                            onClick={handleNotificationClick}
                            className="relative p-2 bg-slate-50 rounded-xl border border-slate-100"
                        >
                            <Bell size={18} className="text-slate-500" />
                            {notificationCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border border-white"></span>
                            )}
                        </button>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 transition-transform active:scale-90 z-[110]"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMenuOpen(false)}>
                <div 
                    className={`absolute top-0 right-0 h-full w-[80%] max-w-[300px] bg-white shadow-2xl transition-transform duration-500 transform ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col h-full pt-24 pb-8 px-6">
                        {/* User Summary */}
                        {user && (
                            <div className="mb-10 bg-indigo-50 rounded-[2rem] p-6 flex flex-col items-center text-center border border-indigo-100">
                                <div className="w-16 h-16 bg-white border-4 border-white rounded-[1.5rem] shadow-xl flex items-center justify-center text-indigo-600 font-black text-2xl mb-4">
                                    {user.name?.charAt(0)}
                                </div>
                                <h3 className="text-lg font-black text-slate-900 leading-tight">{user.name}</h3>
                                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1">{localStorage.getItem('role')}</p>
                            </div>
                        )}

                        <div className="space-y-2 flex-1">
                            <Link to="/home" className={`flex items-center gap-4 p-4 rounded-2xl transition-colors font-black text-xs uppercase tracking-widest ${location.pathname === '/home' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}>
                                <LayoutDashboard size={18} /> Hub Control
                            </Link>
                            <Link to="/courses" className={`flex items-center gap-4 p-4 rounded-2xl transition-colors font-black text-xs uppercase tracking-widest ${location.pathname === '/courses' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}>
                                <BookOpen size={18} /> Syllabus
                            </Link>
                            <Link to="/community" className={`flex items-center gap-4 p-4 rounded-2xl transition-colors font-black text-xs uppercase tracking-widest ${location.pathname === '/community' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}>
                                <Users size={18} /> Network
                            </Link>
                            <Link to="/profile" className={`flex items-center gap-4 p-4 rounded-2xl transition-colors font-black text-xs uppercase tracking-widest ${location.pathname === '/profile' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}>
                                <User size={18} /> Intelligence Profile
                            </Link>
                        </div>

                        <button 
                            onClick={handleLogout}
                            className="mt-auto flex items-center justify-center gap-3 p-5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-2xl transition-all font-black text-xs uppercase tracking-[0.2em] shadow-sm active:scale-95 group"
                        >
                            <LogOut size={18} className="transition-transform group-hover:translate-x-1" />
                            Initialize Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;




