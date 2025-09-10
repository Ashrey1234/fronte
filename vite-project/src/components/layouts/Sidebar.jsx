





// // src/components/layouts/Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { FaTachometerAlt, FaFileAlt, FaBell, FaUser } from "react-icons/fa";
// import "./Sidebar.css"; // ✅ import CSS
// import { FaCreditCard } from "react-icons/fa";

// const Sidebar = ({ role, isOpen, toggleSidebar }) => {
//   let links = [];

//   if (role === "researcher") {
//     links = [
//       { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
//       // { name: "Payments", path: "/payments", icon: <FaFileAlt /> },
//       { name: "Payments", path: "/payments", icon: <FaCreditCard /> },
//       { name: "Submit Application", path: "/submit-application", icon: <FaFileAlt /> },
//       { name: "Notifications", path: "/notifications", icon: <FaBell /> },
//       { name: "Profile", path: "/profile", icon: <FaUser /> },
//     ];
//   } else if (role === "officer") {
//     links = [
//       { name: "Dashboard", path: "/officer-dashboard", icon: <FaTachometerAlt /> },
//       { name: "Review Applications", path: "/review-applications", icon: <FaFileAlt /> },
//       { name: "Profile", path: "/officer-profile", icon: <FaUser /> },
//     ];
//   } else if (role === "admin") {
//     links = [
//       { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
//       { name: "User Management", path: "/users", icon: <FaUser /> },
//       { name: "Applications Management", path: "/applications", icon: <FaFileAlt /> },
//       { name: "Reports", path: "/reports", icon: <FaFileAlt /> },
//     ];
//   }

//   return (
//     <aside className={`sidebar ${isOpen ? "open" : ""}`}>
//       <div className="logo-container">
//         <img src="images.png" alt="Logo" />
//         <h2>Research Management System</h2>
//       </div>

//       <nav>
//         <ul>
//           {links.map((link) => (
//             <li key={link.name}>
//               <Link to={link.path} onClick={toggleSidebar}>
//                 <span>{link.icon}</span>
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;















