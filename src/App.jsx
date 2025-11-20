import React from "react";
import { Route, Routes } from "react-router-dom";

import Loginpage from "./Pages/Loginpage";
import GradePredictionLanding from "./Pages/LandingPage";
import HomePage from "./Pages/UserPage/HomePage";
import AdminLayout from "./Components/Admin/Pages/AdminLayout";
import Dashboard from "./Components/Admin/Pages/Dashboard";
import FacultyGradePage from "./Components/Admin/Pages/Faculty";
import StudentGradeTable from "./Components/Admin/Pages/Studenttable";
import RegisterPage from "./Pages/Registerpage";
import StudentProfile from "./Pages/UserPage/UserPage1";
import StudentProfileV2 from "./Pages/UserPage/UserPage2";
import StudentProfilev3 from "./Pages/UserPage/UserPage3";


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<GradePredictionLanding />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user1" element={<StudentProfile />} />
      <Route path="/user2" element={<StudentProfileV2 />} />
      <Route path="/user3" element={<StudentProfilev3 />} />
      <Route path="/home" element={<HomePage />} />

      {/* Admin Routes using AdminLayout */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
      <Route path="/faculty" element={<FacultyGradePage />} />
      <Route path="/stdtable" element={<StudentGradeTable />} />
    </Routes>
  );
}

export default App;
