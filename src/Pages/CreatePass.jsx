import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ShieldCheck, Lock, Eye, EyeOff, Loader2, CheckCircle2, XCircle } from 'lucide-react';

function CreatePasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState(0);

  const validatePassword = (pass) => {
    let strengthScore = 0;
    if (pass.length >= 8) strengthScore++;
    if (pass.length >= 12) strengthScore++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strengthScore++;
    if (/\d/.test(pass)) strengthScore++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) strengthScore++;
    return strengthScore;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(validatePassword(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Logic: Try student endpoint first, if fails with "Invalid/Expired token", try teacher.
      // Alternatively, the token itself could indicate the type, but we'll try sequential.
      
      let success = false;
      let finalMessage = "";

      try {
        const studentRes = await axios.post(`http://localhost:5000/api/user/createpassword/${token}`, { password });
        success = true;
        finalMessage = studentRes.data.message;
      } catch (err) {
        // If student route fails, try teacher route
        try {
          const teacherRes = await axios.post(`http://localhost:5000/api/teacher/createpassword/${token}`, { password });
          success = true;
          finalMessage = teacherRes.data.message;
        } catch (err2) {
          throw new Error(err2.response?.data?.message || err.response?.data?.message || "Failed to set password");
        }
      }

      if (success) {
        toast.success(finalMessage || 'Password set successfully! You can now login.');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-indigo-500/30">
      <div className="w-full max-w-md relative">
        {/* Animated background elements */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden relative backdrop-blur-sm">
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 px-8 py-12 text-center relative overflow-hidden">
             {/* Decorative pattern */}
             <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:24px_24px]"></div>
             </div>
            
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl relative z-10">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight relative z-10">Protect Your Account</h1>
            <p className="text-indigo-100 text-sm font-medium opacity-80 relative z-10">Set a secure system access key</p>
          </div>

          {/* Form Section */}
          <div className="px-8 py-10">
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">
                  New Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-400 text-slate-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={loading}
                    className={`w-full pl-12 pr-12 py-4 bg-slate-900/50 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white placeholder-slate-600 ${
                      errors.password ? 'border-red-500/50' : 'border-slate-700 group-hover:border-slate-600'
                    }`}
                    placeholder="Enter system key"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Strength Meter */}
                {password && (
                  <div className="mt-4 px-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Security Level</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        strength <= 1 ? 'text-red-400' : strength <= 3 ? 'text-yellow-400' : 'text-emerald-400'
                      }`}>
                        {strength <= 1 ? 'Vulnerable' : strength <= 3 ? 'Functional' : 'Fortified'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getStrengthColor()}`}
                        style={{ width: `${(strength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">
                  Confirm Key
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-400 text-slate-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    className={`w-full pl-12 pr-12 py-4 bg-slate-900/50 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white placeholder-slate-600 ${
                      errors.confirmPassword ? 'border-red-500/50' : 'border-slate-700 group-hover:border-slate-600'
                    }`}
                    placeholder="Verify system key"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-400 text-[11px] font-bold mt-2 ml-1 flex items-center">
                        <XCircle className="w-3.5 h-3.5 mr-1.5" />
                        {errors.confirmPassword}
                    </p>
                )}
              </div>

              {/* Requirements Checklist */}
              <div className="bg-slate-900/40 rounded-2xl p-5 border border-slate-700/50">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Security Requirements</p>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {[
                    { label: '8+ Characters', met: password.length >= 8 },
                    { label: 'Uppercase', met: /[A-Z]/.test(password) },
                    { label: 'Lowercase', met: /[a-z]/.test(password) },
                    { label: 'Number', met: /\d/.test(password) },
                    { label: 'Special Char', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
                    { label: 'Match', met: password && password === confirmPassword }
                  ].map((req, i) => (
                    <div key={i} className={`flex items-center text-[10px] font-bold transition-opacity ${req.met ? 'text-emerald-400' : 'text-slate-600'}`}>
                      {req.met ? <CheckCircle2 className="w-3 h-3 mr-2" /> : <div className="w-3 h-3 border-2 border-slate-700 rounded-full mr-2"></div>}
                      {req.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transform hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center uppercase tracking-widest text-xs"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Authorize & Finalize'
                )}
              </button>
            </form>
          </div>
        </div>
        
        <p className="mt-8 text-center text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">
          Secure Session Initialization
        </p>
      </div>
    </div>
  );
}

export default CreatePasswordPage;