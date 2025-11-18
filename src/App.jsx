import React from "react";
import { Route, Routes } from "react-router-dom";

import Loginpage from "./Pages/Loginpage";
import GradePredictionLanding from "./Pages/LandingPage";
import HomePage from "./Pages/UserPage/HomePage";
import StudentDashboard from "./Pages/UserPage/UserPage";
import AdminLayout from "./Components/Admin/Pages/AdminLayout";
import Dashboard from "./Components/Admin/Pages/Dashboard";


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<GradePredictionLanding />} />
      <Route path="/login" element={<Loginpage />} />
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
    </Routes>
  );
}

export default App;
