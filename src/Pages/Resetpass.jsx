import { useState } from 'react';
import { Eye, EyeOff, Lock, ArrowLeft, CheckCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('One number');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) {
      toast.error('Email is missing. Please start again.');
      return;
    }

    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      newErrors.newPassword = passwordErrors.join(', ');
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/user/reset-password', {
        email,
        newPassword
      });

      if (res.data.success) {
        setIsSuccess(true);
        toast.success('Password reset successful!');
      } else {
        toast.error(res.data.message || 'Failed to reset password');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-emerald-50">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Success!</h2>
            <p className="text-gray-600 mb-8 font-medium">
              Your password has been updated. You can now log in with your new identity.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 active:scale-[0.98]"
            >
              PROCEED TO LOGIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md my-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4 shadow-xl ring-4 ring-indigo-50">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 uppercase tracking-tight">SCORION</h1>
          <p className="text-gray-600 font-medium text-sm">Join the next generation of academic intelligence</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 transition-all">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-1">Recovery Protocol</p>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Initialize New Credential</h2>
            </div>
            
            {/* New Password Field */}
            <div>
              <label htmlFor="newPassword" className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                Access Credential
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600 text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full pl-11 pr-12 py-3.5 border rounded-2xl outline-none transition-all ${errors.newPassword ? 'border-rose-500 bg-rose-50' : 'border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'}`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-all"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.newPassword}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                Verify Credential
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600 text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-11 pr-12 py-3.5 border rounded-2xl outline-none transition-all ${errors.confirmPassword ? 'border-rose-500 bg-rose-50' : 'border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'}`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-all"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100">
              <p className="text-[10px] font-black text-indigo-900 mb-3 uppercase tracking-widest">Protocol Requirements:</p>
              <ul className="text-[10px] font-bold text-slate-500 uppercase tracking-wide space-y-2">
                <li className={`flex items-center gap-2 ${newPassword.length >= 8 ? 'text-emerald-600' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 8 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                  Min 8 Characters
                </li>
                <li className={`flex items-center gap-2 ${/[A-Z]/.test(newPassword) ? 'text-emerald-600' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(newPassword) ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                  Case Diversity [A-Z]
                </li>
                <li className={`flex items-center gap-2 ${/[a-z]/.test(newPassword) ? 'text-emerald-600' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(newPassword) ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                  Case Diversity [a-z]
                </li>
                <li className={`flex items-center gap-2 ${/[0-9]/.test(newPassword) ? 'text-emerald-600' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(newPassword) ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                  Numeric Input [0-9]
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                  Processing...
                </>
              ) : (
                'Recalibrate Credential'
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-all gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Abort Recovery
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            SCORION INTELLIGENCE NODE © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}