import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { SocketProvider } from "./contexts/SocketContext";
import axios from "axios";

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

// Flag to prevent duplicate blocked toasts
let isBlockedToastShown = false;

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Global Axios Interceptor for Blocking
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 403 && error.response.data.message === "Account blocked") {
          if (!isBlockedToastShown) {
            isBlockedToastShown = true;
            
            // Clear all auth data
            localStorage.removeItem('userToken');
            localStorage.removeItem('teacherToken');
            localStorage.removeItem('role');
            localStorage.removeItem('userData');
            localStorage.removeItem('teacherData');
            
            toast.error(error.response.data.reason || "Your account has been blocked by the admin.", {
              id: 'blocked-toast',
              duration: 6000
            });
            
            navigate('/login');

            // Reset flag after a delay to allow future blocking toasts (e.g. if they try to log in again while blocked)
            setTimeout(() => {
              isBlockedToastShown = false;
            }, 5000);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
      isBlockedToastShown = false;
    };
  }, [navigate]);

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



