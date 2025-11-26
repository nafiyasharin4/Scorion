import React from 'react';
import { Target, TrendingUp, Users, Zap } from 'lucide-react';
import Header from '../../Components/UserSide/Header';

export default function AboutPage() {
  const features = [
    {
      icon: Target,
      title: 'Accurate Predictions',
      description: 'Get reliable grade forecasts based on your current performance'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your academic journey and see your improvement over time'
    },
    {
      icon: Zap,
      title: 'Easy to Use',
      description: 'Simple interface designed for students, by students'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with peers and share study tips and strategies'
    }
  ];

  return (
    <div>
      <Header></Header>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 lg:p-10 mb-6 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            About Grade Predictor
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We help students take control of their academic journey by providing accurate grade predictions and actionable insights. Know where you stand and what you need to achieve your goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Mission
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
            We believe every student deserves clarity about their academic standing. Our grade predictor empowers you to make informed decisions, set realistic goals, and achieve academic success.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Whether you're aiming for that perfect GPA or working to improve your grades, we're here to support you every step of the way.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-sm p-6 sm:p-8 text-white">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">5K+</div>
              <div className="text-xs sm:text-sm text-indigo-100">Students</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">50K+</div>
              <div className="text-xs sm:text-sm text-indigo-100">Predictions</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">95%</div>
              <div className="text-xs sm:text-sm text-indigo-100">Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}