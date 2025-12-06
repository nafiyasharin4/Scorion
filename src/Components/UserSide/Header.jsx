import { GraduationCap, Bell } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const [notificationCount] = useState(4);

    const handleLogout = () => {
        navigate('/login');
    };

    const handleNotificationClick = () => {
        navigate('/notification');
    };

    return (
        <nav className="bg-slate-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <GraduationCap className="text-cyan-400 w-8 h-8" />
                        <h1 className="text-xl font-bold text-cyan-400">SCORION</h1>
                    </div>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="/home" className="text-white hover:text-cyan-400 font-medium transition">Home</a>
                        <a href="/courses" className="text-white hover:text-cyan-400 font-medium transition">Courses</a>
                        <a href="/community" className="text-white hover:text-cyan-400 font-medium transition">Community</a>
                        <a href="/about" className="text-white hover:text-cyan-400 font-medium transition">About</a>

                        {/* Notification */}
                        <button
                            onClick={handleNotificationClick}
                            className="relative p-2 hover:bg-slate-700 rounded-full transition"
                        >
                            <Bell className="w-6 h-6 text-white hover:text-cyan-400 transition" />
                            {notificationCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                    {notificationCount}
                                </span>
                            )}
                        </button>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-5 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Header;
