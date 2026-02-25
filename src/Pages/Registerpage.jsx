

import { useState } from 'react';
import { User, Mail, Phone, Lock, Loader2, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        department: '',
        course: '',
        termsAccepted: false
    });
    const [errors, setErrors] = useState({});

    // Calicut University Mapping
    const DEPARTMENTS = {
        'Computer Science': [
            'BCA Honours',
            'BSc Computer Science',
            'BSc Information Technology',
            'MSc Computer Science',
            'MCA (Master of Computer Applications)'
        ],
        'Commerce': [
            'Bcom Finance',
            'Bcom Computer Application',
            'Bcom Co-operation Honours',
            'Mcom Finance'
        ],
        'Business Administration': [
            'BBA Honours'
        ],
        'Physics': [
            'BSC Physics'
        ],
        'Arts & Humanities': [
            'BA English Language and Literature Honours',
            'BA Economics',
            'MA English',
            'BA Malayalam',
            'BA Sociology',
            'BA History'
        ],
        'AI': [
            'B.Sc. ARTIFICIAL INTELLIGENCE (HONOURS)'
        ]
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name === 'department') {
            setFormData({ 
                ...formData, 
                department: value,
                course: '' 
            });
        } else {
            setFormData({ 
                ...formData, 
                [name]: type === 'checkbox' ? checked : value 
            });
        }
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Phone must be 10 digits';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.course) newErrors.course = 'Course is required';

        if (!formData.termsAccepted) {
            toast.error('Please accept the Terms and Conditions');
            return;
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            try {
                const response = await axios.post("${API_BASE_URL}/api/user/register", {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    department: formData.department,
                    course: formData.course
                });

                if (response.data.success || response.status === 201 || response.status === 200) {
                    toast.success(response.data.message || 'Registration successful! Please verify your email.');
                    navigate("/otpverification", {
                        state: { email: formData.email, purpose: 'register' }
                    });
                } else {
                    toast.error(response.data.message || 'Registration failed');
                }
            } catch (error) {
                const message = error.response?.data?.message || 'Registration failed. Try again later.';
                toast.error(message);
                console.error("Registration error:", error);
            } finally {
                setLoading(false);
            }
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
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-1">Onboarding Protocol</p>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Initialize Account</h2>
                        </div>

                        <div className="space-y-4">
                            {/* Personal Info Group */}
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                                        Identity Name
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all ${errors.name ? 'border-rose-500 bg-rose-50' : 'border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'}`}
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    {errors.name && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.name}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                                    Communication Node
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all ${errors.email ? 'border-rose-500 bg-rose-50' : 'border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'}`}
                                        placeholder="email@example.com"
                                    />
                                </div>
                                {errors.email && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.email}</p>}
                            </div>

                            {/* Academic Selection Group */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                                        Department
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3.5 bg-slate-50 border rounded-2xl text-[11px] font-black uppercase tracking-wider text-slate-700 outline-none transition-all appearance-none cursor-pointer ${errors.department ? 'border-rose-500 bg-rose-50' : 'border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'}`}
                                    >
                                        <option value="">Select Domain</option>
                                        {Object.keys(DEPARTMENTS).map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                    {errors.department && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.department}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                                        Academic Course
                                    </label>
                                    <select
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                        disabled={!formData.department}
                                        className={`w-full px-4 py-3.5 bg-slate-50 border rounded-2xl text-[11px] font-black uppercase tracking-wider text-slate-700 outline-none transition-all appearance-none cursor-pointer ${errors.course ? 'border-rose-500 bg-rose-50' : 'border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50'}`}
                                    >
                                        <option value="">Select Protocol</option>
                                        {formData.department && DEPARTMENTS[formData.department].map(course => (
                                            <option key={course} value={course}>{course}</option>
                                        ))}
                                    </select>
                                    {errors.course && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.course}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                                        Phone Access
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all ${errors.phone ? 'border-rose-500 bg-rose-50' : 'border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'}`}
                                            placeholder="1234567890"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.phone}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`w-full pl-11 pr-12 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all ${errors.password ? 'border-rose-500 bg-rose-50' : 'border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'}`}
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
                                    {errors.password && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={`w-full pl-11 pr-12 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all ${errors.confirmPassword ? 'border-rose-500 bg-rose-50' : 'border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'}`}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.confirmPassword}</p>}
                                </div>
                            </div>

                            <div className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-slate-100/50 transition-colors">
                                <input
                                    type="checkbox"
                                    id="termsAccepted"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                    className="mt-1 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 transition-all cursor-pointer"
                                />
                                <label htmlFor="termsAccepted" className="ml-3 text-[10px] font-bold text-slate-500 uppercase tracking-wide leading-relaxed cursor-pointer select-none">
                                    I authorize the <span className="text-indigo-600 font-black hover:underline">Neural Terms</span> and <span className="text-indigo-600 font-black hover:underline">Data Protocols</span>
                                </label>
                            </div>
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
                                    'Register'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-600 mt-8 font-medium">
                    Already have an account?{' '}
                    <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-bold underline transition-colors">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
}




