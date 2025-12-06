import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isFaculty: false
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = "http://localhost:5000/api/admin/login";

      const res = await axios.post(url, {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login Success:", res.data);
      localStorage.setItem("token", res.data.token);
      if(res.data.token){
      navigate("/home");  
      }

      // redirect after login
      
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">SCORION</h2>
            <p className="text-gray-600 mt-2">Login to your account</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-300 text-red-700 p-3 text-center rounded">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Faculty checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isFaculty"
                checked={formData.isFaculty}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label className="ml-3 text-sm font-medium text-gray-700">I am a Faculty Member</label>
            </div>

            {/* Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <a href="/forgotpass" className="text-sm text-indigo-600 hover:text-indigo-800">
              Forgot your password?
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1 text-center">
            <p className="text-sm">Don't have an account?</p>
            <a href="/register" className="text-sm text-indigo-600 hover:text-indigo-800">
              Sign up
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
