import React from "react";
import { Route, Routes } from "react-router-dom";

import Loginpage from "./Pages/Loginpage";
import GradePredictionLanding from "./Pages/LandingPage";
import HomePage from "./Pages/UserPage/HomePage";
import StudentDashboard from "./Pages/UserPage/UserPage";
import AdminLayout from "./Components/Admin/Pages/AdminLayout";
import Dashboard from "./Components/Admin/Pages/Dashboard";
import FacultyGradePage from "./Components/Admin/Pages/Faculty";
import StudentGradeTable from "./Components/Admin/Pages/Studenttable";
import RegisterPage from "./Pages/Registerpage";


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<GradePredictionLanding />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user" element={<StudentDashboard />} />
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
