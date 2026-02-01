import React, { useState } from 'react';
import { BookOpen, Clock, IndianRupee, GraduationCap, Users, Award } from 'lucide-react';
import Header from '../../Components/UserSide/Header';

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const courses = [
    {
      id: 1,
      name: 'Bachelor of Computer Applications',
      shortName: 'BCA',
      category: 'Technology',
      duration: '3 Years',
      eligibility: '10+2 with Mathematics',
      totalFee: '₹1,80,000',
      semesterFee: '₹30,000',
      seats: 60,
      description: 'A comprehensive program covering programming, database management, web development, and software engineering.',
      highlights: ['Programming Languages', 'Database Management', 'Web Development', 'Software Engineering']
    },
    {
      id: 2,
      name: 'Bachelor of Business Administration',
      shortName: 'BBA',
      category: 'Management',
      duration: '3 Years',
      eligibility: '10+2 from any stream',
      totalFee: '₹2,10,000',
      semesterFee: '₹35,000',
      seats: 120,
      description: 'Develop leadership and management skills with focus on business strategy, marketing, and entrepreneurship.',
      highlights: ['Business Strategy', 'Marketing Management', 'Financial Analysis', 'Entrepreneurship']
    },
    {
      id: 3,
      name: 'Bachelor of Commerce',
      shortName: 'B.Com',
      category: 'Commerce',
      duration: '3 Years',
      eligibility: '10+2 with Commerce/Mathematics',
      totalFee: '₹90,000',
      semesterFee: '₹15,000',
      seats: 180,
      description: 'Study accounting, taxation, finance, and business laws to build a strong foundation in commerce.',
      highlights: ['Accounting', 'Taxation', 'Business Law', 'Financial Management']
    },
    {
      id: 4,
      name: 'Bachelor of Science in Physics',
      shortName: 'B.Sc Physics',
      category: 'Science',
      duration: '3 Years',
      eligibility: '10+2 with Physics, Chemistry, Mathematics',
      totalFee: '₹1,20,000',
      semesterFee: '₹20,000',
      seats: 45,
      description: 'Explore fundamental principles of physics including mechanics, thermodynamics, and quantum physics.',
      highlights: ['Classical Mechanics', 'Quantum Physics', 'Thermodynamics', 'Electronics']
    },
    {
      id: 5,
      name: 'Bachelor of Arts in English',
      shortName: 'BA English',
      category: 'Arts',
      duration: '3 Years',
      eligibility: '10+2 from any stream',
      totalFee: '₹75,000',
      semesterFee: '₹12,500',
      seats: 90,
      description: 'Deep dive into English literature, linguistics, and creative writing with focus on critical thinking.',
      highlights: ['English Literature', 'Linguistics', 'Creative Writing', 'Critical Analysis']
    }
  ];

  const categories = ['All', 'Technology', 'Management', 'Commerce', 'Science', 'Arts'];

  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-blue-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-2xl -ml-10 -mb-10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/20">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6">Our Academic Core</h1>
          <p className="text-xl text-indigo-100/80 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-relaxed">
            Discover excellence with <span className="text-white">Scorion's</span> elite educational frameworks
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-slate-50 flex flex-wrap gap-3 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-105'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-transparent hover:border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden group hover:-translate-y-3 border border-slate-50"
            >
              {/* Course Header */}
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-8 text-white relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full uppercase tracking-widest">
                    {course.category}
                  </span>
                  <BookOpen className="w-6 h-6 text-white/50" />
                </div>
                <h2 className="text-3xl font-black mb-2 tracking-tight group-hover:scale-105 transition-transform origin-left">{course.shortName}</h2>
                <p className="text-sm font-bold text-indigo-100/90">{course.name}</p>
              </div>

              {/* Course Details */}
              <div className="p-10 space-y-8">
                <p className="text-slate-500 font-bold text-sm leading-relaxed">
                   {course.description}
                </p>

                {/* Info List */}
                <div className="space-y-5">
                   {[
                     { icon: Clock, label: 'Standard Duration', value: course.duration, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                     { icon: IndianRupee, label: 'Total Investment', value: course.totalFee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                     { icon: Users, label: 'Capacity Node', value: `${course.seats} Slots`, color: 'text-blue-600', bg: 'bg-blue-50' },
                     { icon: Award, label: 'Criteria Protocol', value: course.eligibility, color: 'text-amber-600', bg: 'bg-amber-50' }
                   ].map((item, idx) => (
                     <div key={idx} className="flex items-center gap-5 group/item">
                        <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center transition-transform group-hover/item:scale-110 shadow-sm`}>
                           <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                           <p className="text-base font-black text-slate-800 tracking-tight">{item.value}</p>
                        </div>
                     </div>
                   ))}
                </div>

                {/* Highlights */}
                <div className="pt-8 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Curriculum Highlights</p>
                  <div className="grid grid-cols-2 gap-3">
                    {course.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="text-[10px] bg-slate-50 text-slate-600 px-3 py-2 rounded-xl font-black uppercase tracking-tighter border border-slate-100 group-hover:border-indigo-100 transition-colors"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 border-b-4 border-indigo-900 group-hover:scale-[1.02]">
                  Apply for Admission
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-slate-50 py-24 px-4 overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Need Strategic Guidance?</h3>
          <p className="text-lg text-slate-500 font-bold mb-12 max-w-2xl mx-auto leading-relaxed">
            Our specialized academic consultants are ready to orchestrate your transition into our elite programs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200">
              Connect Admissions
            </button>
            <button className="bg-white text-indigo-600 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all border-2 border-slate-100">
              Download Matrix
            </button>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl aspect-square bg-indigo-500/5 rounded-full blur-[120px] -z-0"></div>
      </div>
    </div>
  );
}