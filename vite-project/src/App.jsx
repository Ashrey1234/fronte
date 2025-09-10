
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AppLayout from "./components/layouts/AppLayout";

// import LoginPage from "./components/auth/LoginPage";
// import RegisterPage from "./components/auth/RegisterPage";
// import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
// import ResetPasswordPage from "./components/auth/ResetPasswordPage";

// // Researcher pages
// import Dashboard from "./pages/researcher/Dashboard";
// import Payment from "./pages/researcher/Payment";
// import SubmitApplication from "./pages/researcher/SubmitApplication";
// import Notifications from "./pages/researcher/Notifications";
// import Profile from "./pages/researcher/Profile";

// // ProtectedRoute component
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   // Temporary: check if user is logged in (replace with real auth later)
//   const isLoggedIn = true; // set true for testing researcher flow

//   return (
//     <Router>
//       <Routes>
//         {/* Auth routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//         <Route path="/reset-password" element={<ResetPasswordPage />} />

//         {/* Root redirect */}
//         <Route
//           path="/"
//           element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
//         />

//         {/* Researcher protected routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/payments"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <Payment />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/submit-application"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <SubmitApplication />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/notifications"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <Notifications />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />


        

//         {/* 404 fallback */}
//         <Route path="*" element={<div>404 - Page Not Found</div>} />
//       </Routes>


//               {/* <Route
//           path="/admindashboard"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />            */}





//     </Router>
//   );
// }

// export default App;













// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AppLayout from "./components/layouts/AppLayout";

// import LoginPage from "./components/auth/LoginPage";
// import RegisterPage from "./components/auth/RegisterPage";
// import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
// import ResetPasswordPage from "./components/auth/ResetPasswordPage";

// // Researcher pages
// import Dashboard from "./pages/researcher/Dashboard";
// import Payment from "./pages/researcher/Payment";
// import SubmitApplication from "./pages/researcher/SubmitApplication";
// import Notifications from "./pages/researcher/Notifications";
// import Profile from "./pages/researcher/Profile";

// // Officer pages
// import OfficerDashboard from "./pages/officer/OfficerDashboard";
// import ReviewApplications from "./pages/officer/ReviewApplications";
// import OfficerProfile from "./pages/officer/OfficerProfile";

// // ProtectedRoute component
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   // Temporary: check if user is logged in (replace with real auth later)
//   const isLoggedIn = true; // set true for testing flow
//   const role = "researcher"; // TODO: dynamically get from auth/localStorage

//   return (
//     <Router>
//       <Routes>
//         {/* Auth routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//         <Route path="/reset-password" element={<ResetPasswordPage />} />

//         {/* Root redirect */}
//         <Route
//           path="/"
//           element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
//         />

//         {/* Researcher protected routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <AppLayout role="researcher">
//                 <Dashboard />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/payments"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <AppLayout role="researcher">
//                 <Payment />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/submit-application"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <AppLayout role="researcher">
//                 <SubmitApplication />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/notifications"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <AppLayout role="researcher">
//                 <Notifications />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <AppLayout role="researcher">
//                 <Profile />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* Officer protected routes */}
//         <Route
//           path="/officer-dashboard"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <AppLayout role="officer">
//                 <OfficerDashboard />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/review-applications"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <AppLayout role="officer">
//                 <ReviewApplications />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/officer-profile"
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <AppLayout role="officer">
//                 <OfficerProfile />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* 404 fallback */}
//         <Route path="*" element={<div>404 - Page Not Found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;














// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";

import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";

import Dashboard from "./pages/researcher/Dashboard";
import Payment from "./pages/researcher/Payment";
import SubmitApplication from "./pages/researcher/SubmitApplication";
import Notifications from "./pages/researcher/Notifications";
import Profile from "./pages/researcher/Profile";

import OfficerDashboard from "./pages/officer/OfficerDashboard";
import ReviewApplications from "./pages/officer/ReviewApplications";
import OfficerProfile from "./pages/officer/OfficerProfile";

// ProtectedRoute component
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isLoggedIn = !!localStorage.getItem("access");
  const userRole = localStorage.getItem("role")?.toLowerCase() || "researcher";

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
          element={
            isLoggedIn
              ? userRole === "admin"
                ? <Navigate to="/admin-dashboard" />
                : userRole === "officer"
                ? <Navigate to="/officer-dashboard" />
                : <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          }
        />

        {/* Researcher */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AppLayout>
                <Payment />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-application"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AppLayout>
                <SubmitApplication />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AppLayout>
                <Notifications />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AppLayout>
                <Profile />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Officer */}
        <Route
          path="/officer-dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AppLayout>
                <OfficerDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/review-applications"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AppLayout>
                <ReviewApplications />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/officer-profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AppLayout>
                <OfficerProfile />
              </AppLayout>
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
