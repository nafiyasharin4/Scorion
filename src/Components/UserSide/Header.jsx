import { GraduationCap } from 'lucide-react'
import React, { use } from 'react'
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        
        navigate('/login');
    }
  return (
    <div>
      <nav className="bg-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <GraduationCap className="text-cyan-400 w-8 h-8" />
              <h1 className="text-xl font-bold text-cyan-400">
                SCORION
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="/home" className="text-white hover:text-cyan-400 font-medium transition">Home</a>
              <a href="/courses" className="text-white hover:text-cyan-400 font-medium transition">Courses</a>
              <a href="/community" className="text-white hover:text-cyan-400 font-medium transition">Community</a>
              <a href="/about" className="text-white hover:text-cyan-400 font-medium transition">About</a>
              
            </div>

            {/* Logout Button */}
            <button onClick={handleLogout} className="px-5 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition">
              Login
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
