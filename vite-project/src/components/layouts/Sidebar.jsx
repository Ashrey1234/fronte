// // src/components/layouts/Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = ({ role }) => {
//   let links = [];

//   if (role === "researcher") {
//     links = [
//       { name: "Dashboard", path: "/dashboard" },
//       { name: "Submit Application", path: "/submit-application" },
//       { name: "Payments", path: "/payments" },
//       { name: "Notifications", path: "/notifications" },
//       { name: "Profile", path: "/profile" },
//     ];
//   } else if (role === "officer") {
//     links = [
//       { name: "Dashboard", path: "/dashboard" },
//       { name: "Review Applications", path: "/review-applications" },
//       { name: "Profile", path: "/profile" },
//     ];
//   } else if (role === "admin") {
//     links = [
//       { name: "Dashboard", path: "/dashboard" },
//       { name: "User Management", path: "/users" },
//       { name: "Payment Verification", path: "/payments" },
//       { name: "Applications Management", path: "/applications" },
//       { name: "Reports", path: "/reports" },
//       { name: "System Logs", path: "/logs" },
//     ];
//   }

//   return (
//     <aside style={{ width: "220px", background: "#2c3e50", color: "#fff", padding: "20px" }}>
//       <h2 style={{ color: "#ecf0f1" }}>MyApp</h2>
//       <nav>
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {links.map((link) => (
//             <li key={link.name} style={{ margin: "15px 0" }}>
//               <Link to={link.path} style={{ color: "#ecf0f1", textDecoration: "none" }}>
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







// // src/components/layouts/Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { 
//   FaTachometerAlt, 
//   FaFileAlt, 
//   FaBell, 
//   FaUser
// } from "react-icons/fa";

// const Sidebar = ({ role, isOpen, toggleSidebar }) => {
//   let links = [];

//   // Define menu items with icons for each role
//   if (role === "researcher") {
//     links = [
//       { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
//       { name: "Submit Application", path: "/submit-application", icon: <FaFileAlt /> },
//       { name: "Notifications", path: "/notifications", icon: <FaBell /> },
//       { name: "Profile", path: "/profile", icon: <FaUser /> },
//     ];
//   } else if (role === "officer") {
//     links = [
//       { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
//       { name: "Review Applications", path: "/review-applications", icon: <FaFileAlt /> },
//       { name: "Profile", path: "/profile", icon: <FaUser /> },
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
//     <>
//       <aside 
//         className={`sidebar ${isOpen ? 'open' : ''}`}
//         style={{
//           width: "250px",
//           background: "#1CA3DE",
//           color: "#fff",
//           display: "flex",
//           flexDirection: "column",
//           position: "fixed",
//           left: 0,
//           top: 0,
//           bottom: 0,
//           zIndex: 999,
//           transition: "transform 0.3s ease",
//           boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
//         }}
//       >
//         <div style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
//           <h2 style={{ color: "#fff", margin: 0, fontSize: "1.5rem" }}>MyApp</h2>
//         </div>
        
//         <nav style={{ flex: 1, padding: "15px 0", overflowY: "auto" }}>
//           <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//             {links.map((link) => (
//               <li key={link.name} style={{ margin: 0 }}>
//                 <Link 
//                   to={link.path} 
//                   style={{ 
//                     color: "#fff", 
//                     textDecoration: "none",
//                     display: "flex",
//                     alignItems: "center",
//                     padding: "15px 20px",
//                     transition: "background 0.2s"
//                   }}
//                   onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
//                   onMouseLeave={(e) => e.target.style.background = "transparent"}
//                   onClick={toggleSidebar}
//                 >
//                   <span style={{ marginRight: "15px", fontSize: "1.2rem", width: "24px", display: "flex", justifyContent: "center" }}>
//                     {link.icon}
//                   </span>
//                   {link.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       <style jsx>{`
//         @media (max-width: 768px) {
//           .sidebar {
//             transform: translateX(-100%);
//           }
//           .sidebar.open {
//             transform: translateX(0);
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Sidebar;




















// // src/components/layouts/Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { 
//   FaTachometerAlt, 
//   FaFileAlt, 
//   FaBell, 
//   FaUser
// } from "react-icons/fa";

// const Sidebar = ({ role, isOpen, toggleSidebar }) => {
//   let links = [];

//   // Define menu items with icons for each role
//   if (role === "researcher") {
//     links = [
//       { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
//       { name: "Submit Application", path: "/submit-application", icon: <FaFileAlt /> },
//       { name: "Notifications", path: "/notifications", icon: <FaBell /> },
//       { name: "Profile", path: "/profile", icon: <FaUser /> },
//     ];
//   } else if (role === "officer") {
//     links = [
//       { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
//       { name: "Review Applications", path: "/review-applications", icon: <FaFileAlt /> },
//       { name: "Profile", path: "/profile", icon: <FaUser /> },
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
//     <>
//       <aside 
//         className={`sidebar ${isOpen ? 'open' : ''}`}
//         style={{
//           width: "220px", // Changed from 250px to 220px
//           background: "#1CA3DE",
//           color: "#fff",
//           display: "flex",
//           flexDirection: "column",
//           position: "fixed",
//           left: 0,
//           top: 0,
//           bottom: 0,
//           zIndex: 999,
//           transition: "transform 0.3s ease",
//           boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
//         }}
//       >
//         <div style={{ padding: "20px" }}> {/* Removed borderBottom */}
//           <h2 style={{ color: "#fff", margin: 0, fontSize: "1.5rem" }}>MyApp</h2>
//         </div>
        
//         <nav style={{ flex: 1, padding: "15px 0", overflowY: "auto" }}>
//           <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//             {links.map((link) => (
//               <li key={link.name} style={{ margin: 0 }}>
//                 <Link 
//                   to={link.path} 
//                   style={{ 
//                     color: "#fff", 
//                     textDecoration: "none",
//                     display: "flex",
//                     alignItems: "center",
//                     padding: "15px 20px",
//                     transition: "background 0.2s"
//                   }}
//                   onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
//                   onMouseLeave={(e) => e.target.style.background = "transparent"}
//                   onClick={toggleSidebar}
//                 >
//                   <span style={{ marginRight: "15px", fontSize: "1.2rem", width: "24px", display: "flex", justifyContent: "center" }}>
//                     {link.icon}
//                   </span>
//                   {link.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       <style jsx>{`
//         @media (max-width: 768px) {
//           .sidebar {
//             transform: translateX(-100%);
//           }
//           .sidebar.open {
//             transform: translateX(0);
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Sidebar;






// src/components/layouts/Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { 
//   FaTachometerAlt, 
//   FaFileAlt, 
//   FaBell, 
//   FaUser
// } from "react-icons/fa";

// const Sidebar = ({ role, isOpen, toggleSidebar }) => {
//   let links = [];

//   // Define menu items with icons for each role
//   if (role === "researcher") {
//     links = [
//       { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
//       { name: "Submit Application", path: "/submit-application", icon: <FaFileAlt /> },
//       { name: "Notifications", path: "/notifications", icon: <FaBell /> },
//       { name: "Profile", path: "/profile", icon: <FaUser /> },
//     ];
//   } else if (role === "officer") {
//     links = [
//       { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
//       { name: "Review Applications", path: "/review-applications", icon: <FaFileAlt /> },
//       { name: "Profile", path: "/profile", icon: <FaUser /> },
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
//     <>
//       <aside 
//         className={`sidebar ${isOpen ? 'open' : ''}`}
//         style={{
//           width: "280px", // Increased from 220px to 280px
//           background: "#1CA3DE",
//           color: "#fff",
//           display: "flex",
//           flexDirection: "column",
//           position: "fixed",
//           left: 0,
//           top: 0,
//           bottom: 0,
//           zIndex: 999,
//           transition: "transform 0.3s ease",
//           boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
//         }}
//       >
//         <div style={{ padding: "20px" }}>
//           <h2 style={{ color: "#fff", margin: 0, fontSize: "1.5rem" }}>MyApp</h2>
//         </div>
        
//         <nav style={{ flex: 1, padding: "15px 0", overflowY: "auto" }}>
//           <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//             {links.map((link) => (
//               <li key={link.name} style={{ margin: 0 }}>
//                 <Link 
//                   to={link.path} 
//                   style={{ 
//                     color: "#fff", 
//                     textDecoration: "none",
//                     display: "flex",
//                     alignItems: "center",
//                     padding: "15px 20px",
//                     transition: "background 0.2s"
//                   }}
//                   onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
//                   onMouseLeave={(e) => e.target.style.background = "transparent"}
//                   onClick={toggleSidebar}
//                 >
//                   <span style={{ marginRight: "15px", fontSize: "1.2rem", width: "24px", display: "flex", justifyContent: "center" }}>
//                     {link.icon}
//                   </span>
//                   {link.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       <style jsx>{`
//         @media (max-width: 768px) {
//           .sidebar {
//             transform: translateX(-100%);
//           }
//           .sidebar.open {
//             transform: translateX(0);
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Sidebar;



















// src/components/layouts/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaFileAlt, 
  FaBell, 
  FaUser
} from "react-icons/fa";

const Sidebar = ({ role, isOpen, toggleSidebar }) => {
  let links = [];

  // Define menu items with icons for each role
  if (role === "researcher") {
    links = [
      { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
      { name: "Submit Application", path: "/submit-application", icon: <FaFileAlt /> },
      { name: "Notifications", path: "/notifications", icon: <FaBell /> },
      { name: "Profile", path: "/profile", icon: <FaUser /> },
    ];
  } else if (role === "officer") {
    links = [
      { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
      { name: "Review Applications", path: "/review-applications", icon: <FaFileAlt /> },
      { name: "Profile", path: "/profile", icon: <FaUser /> },
    ];
  } else if (role === "admin") {
    links = [
      { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
      { name: "User Management", path: "/users", icon: <FaUser /> },
      { name: "Applications Management", path: "/applications", icon: <FaFileAlt /> },
      { name: "Reports", path: "/reports", icon: <FaFileAlt /> },
    ];
  }

  return (
    <>
      <aside 
        className={`sidebar ${isOpen ? 'open' : ''}`}
        style={{
          width: "280px",
          background: "#1CA3DE",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 999,
          transition: "transform 0.3s ease",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
        }}
      >
        <div style={{ 
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {/* Logo */}
          <img 
            src="images.png" 
            alt="Logo" 
            style={{ 
              width: "60px", 
              height: "60px", 
              marginBottom: "15px",
              borderRadius: "50%",
              objectFit: "cover"
            }} 
          />
          <h2 style={{ color: "#fff", margin: 0, fontSize: "1.5rem" }}>MyApp</h2>
        </div>
        
        <nav style={{ flex: 1, padding: "15px 0", overflowY: "auto" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {links.map((link) => (
              <li key={link.name} style={{ margin: 0 }}>
                <Link 
                  to={link.path} 
                  style={{ 
                    color: "#fff", 
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px 20px",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
                  onMouseLeave={(e) => e.target.style.background = "transparent"}
                  onClick={toggleSidebar}
                >
                  <span style={{ marginRight: "15px", fontSize: "1.2rem", width: "24px", display: "flex", justifyContent: "center" }}>
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <style jsx>{`
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;