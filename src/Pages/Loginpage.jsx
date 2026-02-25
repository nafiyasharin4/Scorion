

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2, Mail, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isFaculty: false
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      // Determine endpoint based on checkbox
      const endpoint = formData.isFaculty 
        ? `${API_BASE_URL}/api/teacher/login` 
        : `${API_BASE_URL}/api/user/login`;
      
      const response = await axios.post(endpoint, {
        email: formData.email,
        password: formData.password
      });

        if (response.data.token) {
          const tokenKey = formData.isFaculty ? 'teacherToken' : 'userToken';
          const role = formData.isFaculty ? 'teacher' : 'user';
          
          localStorage.setItem(tokenKey, response.data.token);
          localStorage.setItem('role', role);
          
          if (formData.isFaculty) {
            localStorage.setItem('teacherData', JSON.stringify(response.data.teacher));
            toast.success('Faculty Login successful!');
            navigate('/faculty/dashboard');
          } else {
            localStorage.setItem('userData', JSON.stringify(response.data.user));
            toast.success('Student Login successful!');
            navigate('/home');
          }
        } else {
          toast.error(response.data.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md my-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4 shadow-xl ring-4 ring-indigo-50">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">SCORION</h1>
          <p className="text-gray-600 font-medium text-sm">Join the next generation of academic intelligence</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 transition-all">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-6">
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-1">student/teacher login </p>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase"> login</h2>
            </div>

            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                  Communication Node
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled={loading}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                  Access Credential
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    disabled={loading}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Faculty Checkbox */}
              <div className="flex items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-slate-100/50 transition-colors cursor-pointer group">
                <input
                  type="checkbox"
                  id="isFaculty"
                  name="isFaculty"
                  checked={formData.isFaculty}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 transition-all cursor-pointer"
                />
                <label htmlFor="isFaculty" className="ml-3 text-[10px] font-bold text-slate-500 uppercase tracking-wide cursor-pointer select-none">
                  I am a <span className="text-indigo-600 font-black">Faculty Member</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Authenticate Protocol'
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-4">
            <a href="/forgotpass" className="block text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors">
              Forgot password ?
            </a>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
              Don't have an account?{' '}
              <a href="/register" className="text-indigo-600 font-black hover:underline ml-1">
                Register here
              </a>
            </p>
          </div>
        </div>

     
      </div>
    </div>
  );
}




