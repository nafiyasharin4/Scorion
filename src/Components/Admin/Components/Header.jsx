import { GraduationCap } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('role');
        navigate('/admin/login');
    };

    // Helper to check active path
    const isActive = (path) => window.location.pathname === path;

  return (
    <nav className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
            <div className="bg-cyan-500/10 p-2 rounded-xl group-hover:bg-cyan-500/20 transition-all">
              <GraduationCap className="text-cyan-400 w-8 h-8" />
            </div>
            <div className="flex flex-col text-left">
              <h1 className="text-lg font-black text-white tracking-tighter leading-none">
                SCORION <span className="text-cyan-400">ADMIN</span>
              </h1>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none mt-1">Super Control</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {[
              { label: 'Dashboard', path: '/admin/dashboard' },
              { label: 'Students', path: '/admin/students' },
              { label: 'Faculty', path: '/admin/faculty' },
            ].map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  isActive(link.path)
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader
