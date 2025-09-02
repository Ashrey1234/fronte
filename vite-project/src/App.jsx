// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./components/auth/LoginPage";
// import RegisterPage from "./components/auth/RegisterPage";
// import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
// import ResetPasswordPage from "./components/auth/ResetPasswordPage";

// // Baadaye uta-add dashboards yako
// // import ResearcherDashboard from "./pages/researcher/Dashboard";
// // import OfficerDashboard from "./pages/officer/Dashboard";
// // import AdminDashboard from "./pages/admin/Dashboard";

// function App() {
//   // Temporary: check if user is logged in (example, replace with real auth)
//   const isLoggedIn = false;

//   return (
//     <Router>
//       <Routes>
//         {/* Auth routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//         <Route path="/reset-password" element={<ResetPasswordPage />} />

//         {/* Redirect root to login if not logged in */}
//         <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

//         {/* Example of protected dashboard routes (replace later) */}
//         {/* <Route path="/dashboard/researcher" element={<ResearcherDashboard />} />
//         <Route path="/dashboard/officer" element={<OfficerDashboard />} />
//         <Route path="/dashboard/admin" element={<AdminDashboard />} /> */}

//         {/* 404 fallback */}
//         <Route path="*" element={<div>404 - Page Not Found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;








import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";

// Researcher pages
import Dashboard from "./pages/researcher/Dashboard";
import Payment from "./pages/researcher/Payment";
import SubmitApplication from "./pages/researcher/SubmitApplication";
import Notifications from "./pages/researcher/Notifications";
import Profile from "./pages/researcher/Profile";

// ProtectedRoute component
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // Temporary: check if user is logged in (replace with real auth later)
  const isLoggedIn = true; // set true for testing researcher flow

  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Root redirect */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

        {/* Researcher protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-application"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SubmitApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;









































