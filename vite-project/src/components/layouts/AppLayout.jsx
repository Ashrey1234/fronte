// // // src/components/layouts/AppLayout.jsx
// // import React from "react";
// // import Sidebar from "./Sidebar";
// // import Header from "./Header";
// // import Footer from "./Footer";

// // const AppLayout = ({ children, role = "researcher" }) => {
// //   return (
// //     <div style={{ display: "flex", minHeight: "100vh" }}>
// //       {/* Sidebar */}
// //       <Sidebar role={role} />
      
// //       {/* Main Content Area */}
// //       <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
// //         {/* Header */}
// //         <Header role={role} />

// //         {/* Page content */}
// //         <main style={{ flex: 1, padding: "20px", background: "#f9f9f9" }}>
// //           {children}
// //         </main>

// //         {/* Footer */}
// //         <Footer />
// //       </div>
// //     </div>
// //   );
// // };

// // export default AppLayout;




// // src/components/layouts/AppLayout.jsx
// // import React, { useState } from "react";
// // import Sidebar from "./Sidebar";
// // import Header from "./Header";
// // import Footer from "./Footer";

// // const AppLayout = ({ children, role = "researcher" }) => {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);

// //   const toggleSidebar = () => {
// //     setSidebarOpen(!sidebarOpen);
// //   };

// //   return (
// //     <div style={{ display: "flex", minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
// //       {/* Sidebar with overlay for mobile */}
// //       <div 
// //         className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} 
// //         onClick={toggleSidebar}
// //       />
      
// //       {/* Sidebar */}
// //       <Sidebar role={role} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
// //       {/* Main Content Area */}
// //       <div style={{ 
// //         flex: 1, 
// //         display: "flex", 
// //         flexDirection: "column", 
// //         minHeight: "100vh",
// //         width: '100%',
// //         marginLeft: 0,
// //         transition: 'margin-left 0.3s ease'
// //       }}>
// //         {/* Header */}
// //         <Header role={role} toggleSidebar={toggleSidebar} />

// //         {/* Page content */}
// //         <main style={{ 
// //           flex: 1, 
// //           padding: "20px", 
// //           background: "#f9f9f9",
// //           overflowY: 'auto'
// //         }}>
// //           {children}
// //         </main>

// //         {/* Footer */}
// //         <Footer />
// //       </div>

// //       <style jsx>{`
// //         .sidebar-overlay {
// //           display: none;
// //           position: fixed;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           bottom: 0;
// //           background-color: rgba(0, 0, 0, 0.5);
// //           z-index: 998;
// //         }
        
// //         @media (max-width: 768px) {
// //           .sidebar-overlay.active {
// //             display: block;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default AppLayout;






// // src/components/layouts/AppLayout.jsx
// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import Footer from "./Footer";

// const AppLayout = ({ children, role = "researcher" }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
//       {/* Sidebar with overlay for mobile */}
//       <div 
//         className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} 
//         onClick={toggleSidebar}
//       />
      
//       {/* Sidebar */}
//       <Sidebar role={role} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
//       {/* Main Content Area */}
//       <div style={{ 
//         flex: 1, 
//         display: "flex", 
//         flexDirection: "column", 
//         minHeight: "100vh",
//         width: '100%',
//         marginLeft: 0,
//         transition: 'margin-left 0.3s ease'
//       }}>
//         {/* Header */}
//         <Header role={role} toggleSidebar={toggleSidebar} />

//         {/* Page content */}
//         <main style={{ 
//           flex: 1, 
//           padding: "20px", 
//           background: "#f9f9f9",
//           overflowY: 'auto'
//         }}>
//           {children}
//         </main>

//         {/* Footer */}
//         <Footer />
//       </div>

//       <style jsx>{`
//         .sidebar-overlay {
//           display: none;
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: rgba(0, 0, 0, 0.5);
//           z-index: 998;
//         }
        
//         @media (max-width: 768px) {
//           .sidebar-overlay.active {
//             display: block;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AppLayout;


















// // src/components/layouts/AppLayout.jsx
// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import Footer from "./Footer";

// const AppLayout = ({ children, role = "researcher", user }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
//       {/* Sidebar with overlay for mobile */}
//       <div 
//         className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} 
//         onClick={toggleSidebar}
//       />
      
//       {/* Sidebar */}
//       <Sidebar role={role} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
//       {/* Main Content Area */}
//       <div style={{ 
//         flex: 1, 
//         display: "flex", 
//         flexDirection: "column", 
//         minHeight: "100vh",
//         width: '100%',
//         marginLeft: 0,
//         transition: 'margin-left 0.3s ease'
//       }}>
//         {/* Header */}
//         <Header role={role} toggleSidebar={toggleSidebar} user={user} />

//         {/* Page content */}
//         <main style={{ 
//           flex: 1, 
//           padding: "20px", 
//           background: "#f9f9f9",
//           overflowY: 'auto'
//         }}>
//           {children}
//         </main>

//         {/* Footer */}
//         <Footer />
//       </div>

//       <style jsx>{`
//         .sidebar-overlay {
//           display: none;
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: rgba(0, 0, 0, 0.5);
//           z-index: 998;
//         }
        
//         @media (max-width: 768px) {
//           .sidebar-overlay.active {
//             display: block;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AppLayout;













// src/components/layouts/AppLayout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = ({ children, role = "researcher", user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Sidebar with overlay for mobile */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} 
        onClick={toggleSidebar}
      />
      
      {/* Sidebar */}
      <Sidebar role={role} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content Area */}
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh",
        width: '100%',
        marginLeft: 0,
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Header */}
        <Header 
          role={role} 
          toggleSidebar={toggleSidebar} 
          user={user} 
          onLogout={onLogout} 
        />

        {/* Page content */}
        <main style={{ 
          flex: 1, 
          padding: "20px", 
          background: "#f9f9f9",
          overflowY: 'auto'
        }}>
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      <style jsx>{`
        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 998;
        }
        
        @media (max-width: 768px) {
          .sidebar-overlay.active {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default AppLayout;