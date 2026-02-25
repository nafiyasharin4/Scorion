

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, GraduationCap, Loader2, ShieldAlert } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/login`, formData);
      
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('role', 'admin');
        toast.success('Admin authentication successful!');
        navigate('/admin/dashboard');
      } else {
        toast.error(response.data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid admin credentials.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-cyan-500/30">
      <div className="w-full max-w-md relative">
        {/* Background glow effects */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 md:p-10 relative backdrop-blur-sm">
          {/* Logo and Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-4 ring-slate-800">
              <GraduationCap className="w-10 h-10 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tighter flex items-center gap-2">
              ADMIN <span className="text-cyan-400">SCORION</span>
            </h1>
            <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-slate-900/50 border border-slate-700 rounded-full">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Restricted Access</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Admin Identifier
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  placeholder="admin@scorion.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                System Key
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full pl-12 pr-12 py-4 bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-4 px-4 rounded-xl font-black uppercase tracking-tighter transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-[0.98] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-10 text-center text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em]">
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}




