import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";

// Baadaye uta-add dashboards yako
// import ResearcherDashboard from "./pages/researcher/Dashboard";
// import OfficerDashboard from "./pages/officer/Dashboard";
// import AdminDashboard from "./pages/admin/Dashboard";

function App() {
  // Temporary: check if user is logged in (example, replace with real auth)
  const isLoggedIn = false;

  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Redirect root to login if not logged in */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        {/* Example of protected dashboard routes (replace later) */}
        {/* <Route path="/dashboard/researcher" element={<ResearcherDashboard />} />
        <Route path="/dashboard/officer" element={<OfficerDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} /> */}

        {/* 404 fallback */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;









// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import LoginPage from "./components/auth/LoginPage";
// import RegisterPage from "./components/auth/RegisterPage";
// import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
// import ResetPasswordPage from "./components/auth/ResetPasswordPage";

// import ProtectedRoute from "./components/ProtectedRoute";
// import AppLayout from "./components/layouts/AppLayout";

// // Dashboards
// import ResearcherDashboard from "./pages/researcher/Dashboard";
// // import OfficerDashboard from "./pages/officer/Dashboard";
// // import AdminDashboard from "./pages/admin/Dashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 🔑 Auth routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//         <Route path="/reset-password" element={<ResetPasswordPage />} />

//         {/* 🔐 Researcher Dashboard */}
//         <Route
//           path="/researcher/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["researcher"]}>
//               <AppLayout>
//                 <ResearcherDashboard />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* 🔐 Officer Dashboard */}
//         {/* <Route
//           path="/officer/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["officer"]}>
//               <AppLayout>
//                 <OfficerDashboard />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         /> */}

//         {/* 🔐 Admin Dashboard */}
//         {/* <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <AppLayout>
//                 <AdminDashboard />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         /> */}

//         {/* 🔀 Redirect root */}
//         <Route path="/" element={<Navigate to="/login" />} />

//         {/* ❌ 404 fallback */}
//         <Route path="*" element={<div>404 - Page Not Found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;









// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // Auth pages
// import LoginPage from "./components/auth/LoginPage";
// import RegisterPage from "./components/auth/RegisterPage";
// import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
// import ResetPasswordPage from "./components/auth/ResetPasswordPage";

// // Protected route wrapper
// import ProtectedRoute from "./components/ProtectedRoute";
// import AppLayout from "./components/layouts/AppLayout";

// // Researcher Dashboard (ensure file exists with exact casing)
// import ResearcherDashboard from "./pages/researcher/Dashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 🔑 Auth routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//         <Route path="/reset-password" element={<ResetPasswordPage />} />

//         {/* 🔐 Researcher Dashboard */}
//         <Route
//           path="/researcher/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["researcher"]}>
//               <AppLayout>
//                 <ResearcherDashboard />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* Officer/Admin dashboards commented because files may not exist */}
//         {/*
//         <Route
//           path="/officer/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["officer"]}>
//               <AppLayout>
//                 <OfficerDashboard />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <AppLayout>
//                 <AdminDashboard />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />
//         */}

//         {/* 🔀 Redirect root */}
//         <Route path="/" element={<Navigate to="/login" />} />

//         {/* ❌ 404 fallback */}
//         <Route path="*" element={<div>404 - Page Not Found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


















// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import LoginPage from "./components/auth/LoginPage";
// import RegisterPage from "./components/auth/RegisterPage";
// import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
// import ResetPasswordPage from "./components/auth/ResetPasswordPage";

// import ProtectedRoute from "./components/ProtectedRoute";
// // import AppLayout from "./components/layouts/AppLayout";
// import ResearcherDashboard from "./pages/researcher/Dashboard";


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//         <Route path="/reset-password" element={<ResetPasswordPage />} />

//         <Route
//           path="/researcher/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["researcher"]}>
//               <AppLayout>
//                 <ResearcherDashboard />
//               </AppLayout>
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="*" element={<div>404 - Page Not Found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

