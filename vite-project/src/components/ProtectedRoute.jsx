import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  if (!token || (allowedRoles && !allowedRoles.includes(role))) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;











// // src/components/ProtectedRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ isLoggedIn, children }) => {
//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

// export default ProtectedRoute;
