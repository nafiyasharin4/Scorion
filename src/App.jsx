import React from "react";
import { Route, Routes } from "react-router-dom";

import Loginpage from "./Pages/Loginpage";
import GradePredictionLanding from "./Pages/LandingPage";
import HomePage from "./Pages/UserPage/HomePage";
import Dashboard from "./Components/Admin/Pages/Dashboard";
import FacultyGradePage from "./Components/Admin/Pages/Faculty";
import StudentGradeTable from "./Components/Admin/Pages/Studenttable";
import StudentProfile from "./Pages/UserPage/UserPage";
import CommunityPage from "./Pages/UserPage/Community";
import AboutPage from "./Pages/UserPage/AboutPage";
import GradePredictionResult from "./Pages/UserPage/GradePredictionResult";
import DashboardLoginPage from "./Pages/DashboardLogin";
import ForgotPassword from "./Pages/UserPage/ForgotPass";
import OTPVerification from "./Pages/ForgotCode";
import ResetPasswordPage from "./Pages/Resetpass";
import FacultyDashboard from "./Components/Faculty/Pages/Dashboard";
import TeacherStuendtTable from "./Components/Faculty/Pages/StudentTable";
import MarkManagePage from "./Components/Faculty/Pages/MarksManage";

// Added from conflict area
import RegisterPage from "./Pages/Registerpage";
import AdminLogin from "./Pages/AdminLogin";
import CreatePasswordPage from "./Pages/CreatePass";
import CoursesPage from "./Pages/UserPage/courses";
import ParentAttendanceAlert from "./Pages/UserPage/Notification";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<GradePredictionLanding />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/user1" element={<StudentProfile />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/notification" element={<ParentAttendanceAlert />} />
      <Route path="/GPresult" element={<GradePredictionResult />} />
      <Route path="/DBlogin" element={<DashboardLoginPage />} />
      <Route path="/forgotpass" element={<ForgotPassword />} />
      <Route path="/forgotcode" element={<OTPVerification />} />
      <Route path="/resetpass" element={<ResetPasswordPage />} />
      <Route path="/createpass" element={<CreatePasswordPage />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/faculty" element={<FacultyGradePage />} />
      <Route path="/admin/stdtable" element={<StudentGradeTable />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Faculty Routes */}
      <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
      <Route path="/faculty/students" element={<TeacherStuendtTable />} />
      <Route path="/faculty/marks" element={<MarkManagePage />} />
    </Routes>
  );
}

export default App;
