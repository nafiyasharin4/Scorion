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
    <div>
      <Header></Header>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Our Courses</h1>
          </div>
          <p className="text-center text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Discover excellence in education with our carefully designed programs
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
            >
              {/* Course Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold mb-1">{course.shortName}</h2>
                <p className="text-sm text-blue-100">{course.name}</p>
              </div>

              {/* Course Details */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {course.description}
                </p>

                {/* Info Grid */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold">{course.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <IndianRupee className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Total Fee</p>
                      <p className="font-semibold">{course.totalFee}</p>
                      <p className="text-xs text-gray-500">({course.semesterFee}/semester)</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 mr-3 text-purple-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Available Seats</p>
                      <p className="font-semibold">{course.seats} Students</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Award className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Eligibility</p>
                      <p className="font-semibold text-sm">{course.eligibility}</p>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="border-t pt-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">KEY HIGHLIGHTS</p>
                  <div className="flex flex-wrap gap-2">
                    {course.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Help Choosing?</h3>
          <p className="text-gray-600 mb-6">
            Our admission counselors are here to guide you through the selection process
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Contact Admissions
            </button>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-blue-600">
              Download Prospectus
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}