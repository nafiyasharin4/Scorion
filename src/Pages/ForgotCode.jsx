import { useState, useRef, useEffect } from 'react';
import { Mail, ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [email] = useState('student@example.com'); // This would come from previous page
  const navigate = useNavigate()
  
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    // Focus first input on mount
    otpRefs[0].current?.focus();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value[0];
    }
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(''); // Clear error on input

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Only process if pasted data is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      otpRefs[5].current?.focus();
      setError('');
    }
  };

  const handleVerifyOTP = () => {
    navigate('/resetpass')
  };

  const handleResendOTP = () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      setIsLoading(false);
      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
      otpRefs[0].current?.focus();
      // Show success message
      const successMsg = document.getElementById('resend-success');
      if (successMsg) {
        successMsg.classList.remove('hidden');
        setTimeout(() => successMsg.classList.add('hidden'), 3000);
      }
    }, 1000);
  };

  const handleBackToEmail = () => {
    // Navigate back to email input page
    console.log('Going back to email page');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title Section */}
        <div className="text-center mb-8">
          <div className="inline-block bg-indigo-600 text-white rounded-full p-3 mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify OTP</h1>
          <p className="text-gray-600">Enter the code sent to your email</p>
        </div>

        {/* OTP Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">


          {/* Success Message (Hidden by default) */}
          <div id="resend-success" className="hidden mb-4 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 text-center">
            OTP resent successfully!
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
              Enter 6-Digit OTP
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
                  className={`w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 ${
                    error ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all`}
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>
            {error && (
              <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
            )}
          </div>

          {/* Timer and Resend */}
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Didn't receive the code?
            </p>
            {countdown > 0 ? (
              <p className="text-sm font-semibold text-indigo-600">
                Resend OTP in {countdown} seconds
              </p>
            ) : (
              <button
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerifyOTP}
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying...
              </span>
            ) : (
              'Verify OTP'
            )}
          </button>

          {/* Back Button */}
          <button
            onClick={handleBackToEmail}
            className="w-full text-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Change Email Address
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Tips:</p>
          <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
            <li>Check your spam/junk folder if you don't see the email</li>
            <li>Make sure you entered the correct email address</li>
            <li>The OTP is valid for 10 minutes</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}