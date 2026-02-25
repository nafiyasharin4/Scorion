

import { useState, useRef, useEffect } from 'react';
import { Mail, ArrowLeft, Shield, Loader2 } from 'lucide-react';
import { useNavigate ,useLocation} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function OTPVerification() {
  const location = useLocation();
  const emailFromState = location.state?.email || '';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [email] = useState(emailFromState); 
  const navigate = useNavigate();

  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    otpRefs[0].current?.focus();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      otpRefs[5].current?.focus();
      setError('');
    }
  };

  const purpose = location.state?.purpose || 'register'; // Default to register if not provided
  
  const handleVerifyOTP = async () => {
    const code = otp.join('');

    if (code.length !== 6) {
      setError("Please enter full 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      // Use different endpoints based on purpose
      const endpoint = purpose === 'forgot' 
        ? "${API_BASE_URL}/api/user/forgot-password/verify-otp"
        : "${API_BASE_URL}/api/user/verify-otp";

      const res = await axios.post(endpoint, {
        email,
        otp: code
      });
      console.log(res.data, "Verification response");

      if (res.data.success) {
        toast.success(res.data.message || 'OTP Verified!');
        // Navigate based on purpose
        if (purpose === 'forgot') {
          navigate('/resetpass', { state: { email } });
        } else {
          navigate('/login');
        }
      } else {
        toast.error(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }

    setIsLoading(true); // Keep loading state until navigation if success
    setIsLoading(false);
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    setError('');

    try {
      // resend logic might need similar branching if resend endpoint is different
      // assuming register flow might have separate resend or uses the same
      const endpoint = purpose === 'forgot'
        ? `${API_BASE_URL}/api/user/forgot-password`
        : `${API_BASE_URL}/api/user/register`; // Or a dedicated resend endpoint if exists

      // Note: If calling register again, it might fail if user already exists
      // Check if there is a dedicated resend-otp endpoint
      
      const res = await axios.post(endpoint, { email });
      if (res.data.success) {
        setIsLoading(false);
        setCountdown(60);
        setOtp(['', '', '', '', '', '']);
        otpRefs[0].current?.focus();

        const successMsg = document.getElementById('resend-success');
        if (successMsg) {
          successMsg.classList.remove('hidden');
          setTimeout(() => successMsg.classList.add('hidden'), 3000);
        }
        toast.success(res.data.message || 'OTP resent successfully!');
      } else {
        toast.error(res.data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    if (purpose === 'forgot') {
      navigate('/forgotpass');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md my-10">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4 shadow-xl ring-4 ring-indigo-50">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">SCORION</h1>
          <p className="text-gray-600 font-medium text-sm">Join the next generation of academic intelligence</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 transition-all">
          <div className="mb-6">
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-1">Verification Protocol</p>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Otp Validation</h2>
          </div>

          <div id="resend-success" className="hidden mb-4 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-[10px] font-black text-emerald-700 text-center uppercase tracking-widest">
            Protocol sequence resent successfully
          </div>

          <div className="mb-8">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-1 text-center">
              Security Access Code (6 digits)
            </label>
            <div className="flex gap-2 sm:gap-3 justify-center" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black border rounded-2xl outline-none transition-all ${
                    error ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 text-slate-700'
                  }`}
                />
              ))}
            </div>
            {error && <p className="mt-3 text-[10px] font-black text-rose-500 text-center uppercase tracking-widest">{error}</p>}
          </div>

          <div className="mb-8 text-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {countdown > 0 ? (
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Next otp in {countdown}s</p>
            ) : (
              <button
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-[0.2em] underline disabled:opacity-50"
              >
                Resend otp
              </button>
            )}
          </div>

          <button
            onClick={handleVerifyOTP}
            disabled={isLoading}
            className="w-full px-6 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center mb-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                Processing...
              </>
            ) : (
              'Verify Identity'
            )}
          </button>

          <button
            onClick={handleBackToEmail}
            className="w-full py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Modify Email Address
          </button>

        </div>
      </div>
    </div>
  );
}




