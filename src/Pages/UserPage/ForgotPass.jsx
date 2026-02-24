import { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email) {
      toast.error('Email is required');
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/user/forgot-password', { email });
      if (res.data.success) {    
        toast.success(res.data.message || 'OTP sent successfully!');
        //  Navigate to OTP page and pass email
        navigate('/otpverification', { state: { email, purpose: 'forgot' } });
      } else {
        toast.error(res.data.message || 'Failed to send OTP');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md my-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4 shadow-xl ring-4 ring-indigo-50">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">SCORION</h1>
          <p className="text-gray-600 font-medium text-sm">Join the next generation of academic intelligence</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 transition-all">
          <div className="mb-6">
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-1">Recovery Protocol</p>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Initiate Recovery</h2>
          </div>

          <div className="mb-8">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendOTP()}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <button
            onClick={handleSendOTP}
            disabled={isLoading}
            className="w-full px-6 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center mb-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                Processing...
              </>
            ) : (
              'Initialize Protocol'
            )}
          </button>

          <button
            onClick={handleBackToLogin}
            className="w-full py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Abort & Return
          </button>
        </div>
      </div>
    </div>
  );
}
