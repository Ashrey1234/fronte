









// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import Footer from "./Footer";
// import "./AppLayout.css";

// const AppLayout = ({ children, role = "researcher", user, onLogout }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="app-layout">
//       {/* Sidebar overlay for mobile */}
//       <div 
//         className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} 
//         onClick={toggleSidebar}
//       />
      
//       {/* Sidebar */}
//       <Sidebar role={role} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
//       {/* Main Content */}
//       <div className="main-content">
//         <Header 
//           role={role} 
//           toggleSidebar={toggleSidebar} 
//           user={user} 
//           onLogout={onLogout} 
//         />

//         <main className="page-content">
//           {children}
//         </main>

//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default AppLayout;


























// src/components/layouts/AppLayout.jsx
import React, { useState } from "react";
import { ResearcherSidebar, OfficerSidebar, AdminSidebar } from "./sidebars";
import Header from "./Header";
import Footer from "./Footer";
import "./AppLayout.css";

const AppLayout = ({ children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Detect role automatically
  const role = localStorage.getItem("role")?.toLowerCase() || "researcher";

  return (
    <div className="app-layout">
      {/* Sidebar overlay for mobile */}
      <div className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`} onClick={toggleSidebar} />

      {/* Sidebar based on role */}
      {role === "researcher" && <ResearcherSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
      {role === "officer" && <OfficerSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
      {role === "admin" && <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}

      {/* Main Content */}
      <div className="main-content">
        <Header role={role} toggleSidebar={toggleSidebar} user={user} onLogout={onLogout} />
        <main className="page-content">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
