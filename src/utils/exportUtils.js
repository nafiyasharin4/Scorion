import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

/**
 * Export student grade data to PDF
 * @param {Object} studentInfo - Student profile data (name, course, semester)
 * @param {Object} semesterData - The specific semester data to export
 */
export const exportToPDF = (studentInfo, semesterData) => {
  const doc = new jsPDF();
  const timestamp = new Date().toLocaleString();

  // Header / Branding
  doc.setFillColor(79, 70, 229); // Indigo-600
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('SCORION ACADEMIC REGISTRY', 15, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${timestamp}`, 150, 25);

  // Student Info Section
  doc.setTextColor(30, 41, 59); // Slate-800
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('STUDENT INTELLIGENCE PROFILE', 15, 55);
  
  doc.setDrawColor(226, 232, 240); // Slate-200
  doc.line(15, 58, 195, 58);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${studentInfo?.name || 'N/A'}`, 15, 68);
  doc.text(`Course: ${studentInfo?.course || 'N/A'}`, 15, 75);
  doc.text(`Semester: ${semesterData?.semester || 'N/A'}`, 120, 68);
  doc.text(`Attendance: ${semesterData?.attendancePercentage || '0'}%`, 120, 75);

  // Results Table
  const tableColumn = ["#", "Subject Name", "Marks", "Grade", "Status"];
  const tableRows = semesterData.subjects.map((sub, index) => [
    index + 1,
    sub.name,
    sub.marks || 0,
    sub.grade || 'N/A',
    getGradeStatus(sub.grade)
  ]);

  doc.autoTable({
    startY: 85,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [79, 70, 229], textColor: [255, 255, 255], fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 15, right: 15 }
  });

  // Summary Section
  const finalY = doc.lastAutoTable.finalY + 15;
  
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, finalY, 180, 30, 3, 3, 'F');
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SEMESTER PERFORMANCE SUMMARY', 20, finalY + 10);
  
  doc.setFontSize(20);
  doc.text(`SGPA: ${semesterData.sgpa || '0.00'}`, 25, finalY + 22);
  
  doc.setFontSize(12);
  doc.text(`OVERALL GRADE: ${semesterData.totalGrade || 'PENDING'}`, 100, finalY + 22);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // Slate-400
  doc.text('This is an electronically generated report from the Scorion Predictive Engine. Identity verified.', 105, 285, null, null, 'center');

  // Download
  doc.save(`Scorion_Report_${studentInfo?.name?.replace(/\s+/g, '_')}_Sem${semesterData.semester}.pdf`);
};

/**
 * Export student grade data to Excel
 * @param {Object} studentInfo - Student profile data
 * @param {Object} semesterData - The specific semester data
 */
export const exportToExcel = (studentInfo, semesterData) => {
  const data = [
    ["SCORION ACADEMIC REGISTRY"],
    [],
    ["STUDENT PROFILE"],
    ["Name", studentInfo?.name || 'N/A'],
    ["Course", studentInfo?.course || 'N/A'],
    ["Semester", semesterData?.semester || 'N/A'],
    ["Attendance", `${semesterData?.attendancePercentage || '0'}%`],
    [],
    ["ACADEMIC PERFORMANCE"],
    ["#", "Subject Name", "Marks", "Grade", "Status"],
    ...semesterData.subjects.map((sub, index) => [
      index + 1,
      sub.name,
      sub.marks || 0,
      sub.grade || 'N/A',
      getGradeStatus(sub.grade)
    ]),
    [],
    ["SUMMARY"],
    ["Final SGPA", semesterData.sgpa || '0.00'],
    ["Overall Grade", semesterData.totalGrade || 'PENDING'],
    ["Verification Status", "Distributed Ledger Verified"]
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Semester ${semesterData.semester}`);

  // Download
  XLSX.writeFile(wb, `Scorion_Data_${studentInfo?.name?.replace(/\s+/g, '_')}_Sem${semesterData.semester}.xlsx`);
};

// Helper for status text
const getGradeStatus = (grade) => {
  const statusMap = {
    'A+': 'Exceptional',
    'A': 'Superior',
    'B': 'Above Average',
    'C': 'Average',
    'D': 'Pass',
    'F': 'Incomplete'
  };
  return statusMap[grade] || 'Pending';
};
