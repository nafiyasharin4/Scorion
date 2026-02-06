import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./contexts/SocketContext";

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
import ForgotPassword from "./Pages/UserPage/ForgotPass";
import OTPVerification from "./Pages/ForgotCode";
import ResetPasswordPage from "./Pages/Resetpass";
import FacultyDashboard from "./Components/Faculty/Pages/Dashboard";
import TeacherStuendtTable from "./Components/Faculty/Pages/StudentTable";
import MarkManagePage from "./Components/Faculty/Pages/MarksManage";
import FacultyNotificationPage from "./Components/Faculty/Pages/Notifications";

// Added from conflict area
import RegisterPage from "./Pages/Registerpage";
import AdminLogin from "./Pages/AdminLogin";
import CreatePasswordPage from "./Pages/CreatePass";
import CoursesPage from "./Pages/UserPage/courses";
import ParentAttendanceAlert from "./Pages/UserPage/Notification";
import ProfilePage from "./Pages/UserPage/Profile";

function App() {
  return (
    <SocketProvider>
      <Toaster 
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#3b3db6ff',
            color: '#f8fafc',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            padding: '12px 24px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<GradePredictionLanding />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/userprofile" element={<StudentProfile />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/notifications" element={<ParentAttendanceAlert />} />
        <Route path="/Gradepredictionresults" element={<GradePredictionResult />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/otpverification" element={<OTPVerification />} />
        <Route path="/resetpass" element={<ResetPasswordPage />} />
        <Route path="/createpass/:token" element={<CreatePasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/faculty" element={<FacultyGradePage />} />
        <Route path="/admin/students" element={<StudentGradeTable />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Faculty Routes */}
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/students" element={<TeacherStuendtTable />} />
        <Route path="/faculty/marks" element={<MarkManagePage />} />
        <Route path="/faculty/notifications" element={<FacultyNotificationPage />} />
      </Routes>
    </SocketProvider>
  );
}

export default App;

