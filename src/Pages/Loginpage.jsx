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
        ? 'http://localhost:5000/api/teacher/login' 
        : 'http://localhost:5000/api/user/login';
      
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4 shadow-lg ring-4 ring-indigo-50">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">SCORION</h2>
            <p className="text-gray-500 mt-2 font-medium">Welcome back! Please login</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled={loading}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  disabled={loading}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Faculty Checkbox */}
            <div className="flex items-center p-3 bg-indigo-50 rounded-xl transition-colors hover:bg-indigo-100 cursor-pointer group">
              <input
                type="checkbox"
                id="isFaculty"
                name="isFaculty"
                checked={formData.isFaculty}
                onChange={handleChange}
                disabled={loading}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded-lg focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="isFaculty" className="ml-3 text-sm font-bold text-indigo-900 cursor-pointer select-none">
                I am a Faculty Member
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3.5 px-4 rounded-xl font-bold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  LOGGING IN...
                </>
              ) : (
                'SIGN IN'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center space-y-4">
            <a href="/forgotpass" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition duration-200">
              Forgot your password?
            </a>
          </div>
        </div>

        {/* Admin Link Prompt */}
        <p className="mt-8 text-center text-xs text-gray-400 font-medium">
          Super Admin? <a href="/admin/login" className="text-gray-500 hover:text-indigo-600 underline">Login here</a>
        </p>
      </div>
    </div>
  );
}