import { GraduationCap, Bell, User } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const [notificationCount] = useState(4);
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
    }, []);

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
        <nav className="bg-slate-800 shadow-lg border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link to="/home" className="flex items-center gap-2 group">
                        <GraduationCap className="text-cyan-400 w-8 h-8 group-hover:scale-110 transition-transform" />
                        <h1 className="text-xl font-black text-white tracking-widest group-hover:text-cyan-400 transition-colors">SCORION</h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/home" className="text-slate-300 hover:text-cyan-400 font-bold text-xs uppercase tracking-widest transition">Home</Link>
                        <Link to="/courses" className="text-slate-300 hover:text-cyan-400 font-bold text-xs uppercase tracking-widest transition">Courses</Link>
                        <Link to="/community" className="text-slate-300 hover:text-cyan-400 font-bold text-xs uppercase tracking-widest transition">Community</Link>
                        
                        {/* Profile/User Identity */}
                        {user && (
                            <Link 
                                to="/profile" 
                                className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-cyan-500/50 hover:bg-slate-900 transition group"
                            >
                                <div className="w-6 h-6 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all">
                                    <User className="w-3.5 h-3.5 text-cyan-400 group-hover:text-slate-900 transition-colors" />
                                </div>
                                <span className="text-xs font-black text-slate-200 uppercase tracking-widest truncate max-w-[120px]">
                                    {user.name}
                                </span>
                            </Link>
                        )}

                        <div className="h-6 w-[1px] bg-slate-700 mx-2"></div>

                        {/* Notification */}
                        <button
                            onClick={handleNotificationClick}
                            className="relative p-2 hover:bg-slate-700 rounded-xl transition group"
                        >
                            <Bell className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition" />
                            {notificationCount > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-800 animate-pulse"></span>
                            )}
                        </button>

                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-rose-500 hover:text-white transition-all active:scale-95"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile menu button (Simplified) */}
                    <div className="md:hidden flex items-center gap-4">
                         {user && (
                            <Link to="/profile" className="text-xs font-bold text-cyan-400">{user.name}</Link>
                         )}
                         <button onClick={handleLogout} className="text-rose-500 text-xs font-bold">LOGOUT</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
