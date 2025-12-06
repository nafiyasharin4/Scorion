import React, { useState } from 'react';
import { Download, ArrowLeft, Award, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import Header from '../../Components/UserSide/Header';
import { useNavigate } from 'react-router-dom';


const GradePredictionResult = () => {
  // Sample prediction data
  const [predictionData] = useState({
    studentName: 'Aarav Kumar',
    subjects: [
      { name: 'Maths', marks: 85, maxMarks: 100 },
      { name: 'Science', marks: 78, maxMarks: 100 },
      { name: 'English', marks: 92, maxMarks: 100 },
      { name: 'Computer', marks: 88, maxMarks: 100 }
    ]
  });
  const navigate = useNavigate();
  const handlePredictAgain = () => {
    navigate('/user1');
  }

  // Grade calculation function
  const calculateGrade = (marks) => {
    if (marks >= 90) return { grade: 'A+', status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-500' };
    if (marks >= 80) return { grade: 'A', status: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-100', borderColor: 'border-blue-500' };
    if (marks >= 70) return { grade: 'B+', status: 'Good', color: 'text-indigo-600', bgColor: 'bg-indigo-100', borderColor: 'border-indigo-500' };
    if (marks >= 60) return { grade: 'B', status: 'Average', color: 'text-purple-600', bgColor: 'bg-purple-100', borderColor: 'border-purple-500' };
    if (marks >= 50) return { grade: 'C', status: 'Pass', color: 'text-yellow-600', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-500' };
    return { grade: 'F', status: 'Fail', color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-500' };
  };

  // Calculate overall statistics
  const totalMarks = predictionData.subjects.reduce((sum, subject) => sum + subject.marks, 0);
  const maxTotalMarks = predictionData.subjects.reduce((sum, subject) => sum + subject.maxMarks, 0);
  const percentage = ((totalMarks / maxTotalMarks) * 100).toFixed(2);
  const overallGrade = calculateGrade(parseFloat(percentage));

  // Download PDF function (dummy)
  const handleDownloadPDF = () => {
    alert('PDF Download feature would be implemented here. Currently using browser print dialog.');
    window.print();
  };

 

  // Bar colors for chart
  const barColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

  return (
    <div>
      <Header></Header>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Grade Prediction Results</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Award className="text-blue-600" size={20} />
                Academic Performance Analysis
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePredictAgain}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-200 transition-all font-semibold shadow-md"
              >
                <ArrowLeft size={20} />
                Predict Again
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-md"
              >
                <Download size={20} />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Student Info & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Student Name */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Student Name</h3>
            <p className="text-2xl font-bold text-gray-800">{predictionData.studentName}</p>
          </div>

          {/* Overall Percentage */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-sm font-semibold opacity-90 uppercase mb-2">Overall Percentage</h3>
            <div className="flex items-center justify-between">
              <p className="text-4xl font-bold">{percentage}%</p>
              <TrendingUp size={40} className="opacity-80" />
            </div>
          </div>

          {/* Overall Grade */}
          <div className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${overallGrade.borderColor}`}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Overall Grade</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-4xl font-bold ${overallGrade.color}`}>{overallGrade.grade}</p>
                <p className={`text-sm font-semibold mt-1 ${overallGrade.color}`}>{overallGrade.status}</p>
              </div>
              {parseFloat(percentage) >= 50 ? (
                <CheckCircle size={40} className="text-green-500" />
              ) : (
                <XCircle size={40} className="text-red-500" />
              )}
            </div>
          </div>
        </div>

        {/* Marks Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Subject-wise Predicted Marks</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Subject</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Predicted Marks</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Maximum Marks</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Percentage</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Grade</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {predictionData.subjects.map((subject, index) => {
                  const subjectPercentage = ((subject.marks / subject.maxMarks) * 100).toFixed(2);
                  const subjectGrade = calculateGrade(parseFloat(subjectPercentage));
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-gray-800">{subject.name}</td>
                      <td className="text-center py-4 px-4 font-bold text-blue-600">{subject.marks}</td>
                      <td className="text-center py-4 px-4 text-gray-600">{subject.maxMarks}</td>
                      <td className="text-center py-4 px-4 font-semibold text-gray-700">{subjectPercentage}%</td>
                      <td className="text-center py-4 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full font-bold ${subjectGrade.bgColor} ${subjectGrade.color}`}>
                          {subjectGrade.grade}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        {subject.marks >= 50 ? (
                          <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                            <CheckCircle size={18} />
                            Pass
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                            <XCircle size={18} />
                            Fail
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-bold">
                  <td className="py-4 px-4 text-gray-800">Total</td>
                  <td className="text-center py-4 px-4 text-blue-600 text-lg">{totalMarks}</td>
                  <td className="text-center py-4 px-4 text-gray-600">{maxTotalMarks}</td>
                  <td className="text-center py-4 px-4 text-gray-800 text-lg">{percentage}%</td>
                  <td className="text-center py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full font-bold ${overallGrade.bgColor} ${overallGrade.color}`}>
                      {overallGrade.grade}
                    </span>
                  </td>
                  <td className="text-center py-4 px-4">
                    {parseFloat(percentage) >= 50 ? (
                      <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                        <CheckCircle size={18} />
                        Pass
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                        <XCircle size={18} />
                        Fail
                      </span>
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Custom Bar Graph */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Performance Graph</h2>
          
          {/* Graph Container */}
          <div className="relative" style={{ height: '400px' }}>
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-sm text-gray-600 font-medium pr-2">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>
            
            {/* Grid lines */}
            <div className="absolute left-12 right-0 top-0 bottom-12 flex flex-col justify-between">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border-t border-gray-200 w-full"></div>
              ))}
            </div>
            
            {/* Bars */}
            <div className="absolute left-12 right-0 top-0 bottom-12 flex items-end justify-around gap-4 px-4">
              {predictionData.subjects.map((subject, index) => (
                <div key={index} className="flex-1 flex flex-col items-center h-full justify-end">
                  {/* Bar */}
                  <div className="relative w-full flex justify-center items-end" style={{ height: '100%' }}>
                    <div 
                      className="w-full max-w-24 rounded-t-lg transition-all duration-1000 ease-out relative group cursor-pointer hover:opacity-80"
                      style={{ 
                        height: `${subject.marks}%`,
                        backgroundColor: barColors[index % barColors.length]
                      }}
                    >
                      {/* Value on top of bar */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {subject.marks} marks
                      </div>
                      <div className="absolute top-2 left-0 right-0 text-center text-white font-bold text-sm">
                        {subject.marks}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* X-axis labels */}
            <div className="absolute left-12 right-0 bottom-0 flex justify-around gap-4 px-4 pt-2">
              {predictionData.subjects.map((subject, index) => (
                <div key={index} className="flex-1 text-center">
                  <div className="text-sm font-semibold text-gray-700">{subject.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chart Legend */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 justify-center">
              {predictionData.subjects.map((subject, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: barColors[index % barColors.length] }}
                  ></div>
                  <span className="text-sm text-gray-600 font-medium">{subject.name}: {subject.marks} marks</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Summary</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${parseFloat(percentage) >= 50 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <p className="text-gray-700">
                <span className="font-semibold">Overall Result:</span> {parseFloat(percentage) >= 50 ? 'PASS' : 'FAIL'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <p className="text-gray-700">
                <span className="font-semibold">Total Marks:</span> {totalMarks} out of {maxTotalMarks}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <p className="text-gray-700">
                <span className="font-semibold">Performance Grade:</span> {overallGrade.grade} - {overallGrade.status}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <p className="text-gray-700">
                <span className="font-semibold">Subjects Passed:</span> {predictionData.subjects.filter(s => s.marks >= 50).length} out of {predictionData.subjects.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default GradePredictionResult;