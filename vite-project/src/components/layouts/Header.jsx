// // src/components/layouts/Header.jsx
// import React from "react";

// const Header = ({ role }) => {
//   return (
//     <header
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "10px 20px",
//         background: "#fff",
//         borderBottom: "1px solid #ddd",
//       }}
//     >
//       <h1 style={{ margin: 0 }}>Welcome, {role.charAt(0).toUpperCase() + role.slice(1)}</h1>
//       <div>
//         <button
//           style={{
//             padding: "6px 12px",
//             background: "#e74c3c",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;





// src/components/layouts/Header.jsx
// import React, { useState, useRef, useEffect } from "react";

// const Header = ({ role, toggleSidebar }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <header
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "10px 20px",
//         background: "#fff",
//         borderBottom: "1px solid #ddd",
//         position: "relative",
//         zIndex: 997,
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <button
//           onClick={toggleSidebar}
//           style={{
//             background: "none",
//             border: "none",
//             fontSize: "20px",
//             cursor: "pointer",
//             marginRight: "15px",
//             display: "none"
//           }}
//           className="menu-toggle"
//         >
//           ☰
//         </button>
//         <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#333" }}>
//           Welcome, {role.charAt(0).toUpperCase() + role.slice(1)}
//         </h1>
//       </div>
      
//       <div style={{ position: "relative" }} ref={dropdownRef}>
//         <div
//           onClick={toggleDropdown}
//           style={{
//             width: "40px",
//             height: "40px",
//             borderRadius: "50%",
//             background: "#1CA3DE",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             fontSize: "18px",
//             fontWeight: "bold"
//           }}
//         >
//           {role.charAt(0).toUpperCase()}
//         </div>
        
//         {dropdownOpen && (
//           <div
//             style={{
//               position: "absolute",
//               top: "50px",
//               right: "0",
//               background: "#fff",
//               borderRadius: "5px",
//               boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//               width: "150px",
//               zIndex: 999,
//               overflow: "hidden"
//             }}
//           >
//             <div
//               style={{
//                 padding: "12px 15px",
//                 borderBottom: "1px solid #eee",
//                 cursor: "pointer",
//                 transition: "background 0.2s"
//               }}
//               onMouseEnter={(e) => e.target.style.background = "#f5f5f5"}
//               onMouseLeave={(e) => e.target.style.background = "#fff"}
//               onClick={() => setDropdownOpen(false)}
//             >
//               Profile
//             </div>
//             <div
//               style={{
//                 padding: "12px 15px",
//                 cursor: "pointer",
//                 transition: "background 0.2s",
//                 color: "#e74c3c"
//               }}
//               onMouseEnter={(e) => e.target.style.background = "#f5f5f5"}
//               onMouseLeave={(e) => e.target.style.background = "#fff"}
//               onClick={() => {
//                 alert("Logging out...");
//                 setDropdownOpen(false);
//               }}
//             >
//               Logout
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @media (max-width: 768px) {
//           .menu-toggle {
//             display: block !important;
//           }
//         }
//       `}</style>
//     </header>
//   );
// };

// export default Header;












// // src/components/layouts/Header.jsx
// import React, { useState, useRef, useEffect } from "react";

// const Header = ({ role, toggleSidebar, user }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   // Get user's first initial for avatar
//   const getUserInitial = () => {
//     if (user && user.name) {
//       return user.name.charAt(0).toUpperCase();
//     }
//     return "U"; // Default initial if no user data
//   };

//   return (
//     <header
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "10px 20px",
//         background: "#fff",
//         borderBottom: "1px solid #ddd",
//         position: "relative",
//         zIndex: 997,
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <button
//           onClick={toggleSidebar}
//           style={{
//             background: "none",
//             border: "none",
//             fontSize: "20px",
//             cursor: "pointer",
//             marginRight: "15px",
//             display: "none"
//           }}
//           className="menu-toggle"
//         >
//           ☰
//         </button>
//         <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#333" }}>
//           Welcome, {user && user.name ? user.name : "User"}
//         </h1>
//       </div>
      
//       <div style={{ position: "relative" }} ref={dropdownRef}>
//         <div
//           onClick={toggleDropdown}
//           style={{
//             width: "40px",
//             height: "40px",
//             borderRadius: "50%",
//             background: "#1CA3DE",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             fontSize: "18px",
//             fontWeight: "bold"
//           }}
//         >
//           {getUserInitial()}
//         </div>
        
//         {dropdownOpen && (
//           <div
//             style={{
//               position: "absolute",
//               top: "50px",
//               right: "0",
//               background: "#fff",
//               borderRadius: "5px",
//               boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//               width: "200px",
//               zIndex: 999,
//               overflow: "hidden"
//             }}
//           >
//             {/* User info section */}
//             <div style={{
//               padding: "15px",
//               background: "#f9f9f9",
//               borderBottom: "1px solid #eee"
//             }}>
//               <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
//                 {user && user.name ? user.name : "User"}
//               </div>
//               <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "5px" }}>
//                 {role.charAt(0).toUpperCase() + role.slice(1)}
//               </div>
//             </div>
            
//             <div
//               style={{
//                 padding: "12px 15px",
//                 cursor: "pointer",
//                 transition: "background 0.2s"
//               }}
//               onMouseEnter={(e) => e.target.style.background = "#f5f5f5"}
//               onMouseLeave={(e) => e.target.style.background = "#fff"}
//               onClick={() => {
//                 // Handle profile navigation
//                 setDropdownOpen(false);
//               }}
//             >
//               Profile
//             </div>
//             <div
//               style={{
//                 padding: "12px 15px",
//                 cursor: "pointer",
//                 transition: "background 0.2s",
//                 color: "#e74c3c"
//               }}
//               onMouseEnter={(e) => e.target.style.background = "#f5f5f5"}
//               onMouseLeave={(e) => e.target.style.background = "#fff"}
//               onClick={() => {
//                 // Handle logout
//                 alert("Logging out...");
//                 setDropdownOpen(false);
//               }}
//             >
//               Logout
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @media (max-width: 768px) {
//           .menu-toggle {
//             display: block !important;
//           }
//         }
//       `}</style>
//     </header>
//   );
// };

// export default Header;














// // src/components/layouts/Header.jsx
// import React, { useState, useRef, useEffect } from "react";

// const Header = ({ role, toggleSidebar, user, onLogout }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   // Get user's first initial for avatar
//   const getUserInitial = () => {
//     if (user && user.name) {
//       return user.name.charAt(0).toUpperCase();
//     }
//     return "U"; // Default initial if no user data
//   };

//   const handleLogout = () => {
//     if (onLogout) {
//       onLogout();
//     }
//     setDropdownOpen(false);
//   };

//   return (
//     <header
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "10px 20px",
//         background: "#fff",
//         borderBottom: "1px solid #ddd",
//         position: "relative",
//         zIndex: 997,
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <button
//           onClick={toggleSidebar}
//           style={{
//             background: "none",
//             border: "none",
//             fontSize: "20px",
//             cursor: "pointer",
//             marginRight: "15px",
//             display: "none"
//           }}
//           className="menu-toggle"
//         >
//           ☰
//         </button>
//         <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#333" }}>
//           Welcome, {user && user.name ? user.name : "User"}
//         </h1>
//       </div>
      
//       <div style={{ position: "relative" }} ref={dropdownRef}>
//         <div
//           onClick={toggleDropdown}
//           style={{
//             width: "40px",
//             height: "40px",
//             borderRadius: "50%",
//             background: "#1CA3DE",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             fontSize: "18px",
//             fontWeight: "bold"
//           }}
//         >
//           {getUserInitial()}
//         </div>
        
//         {dropdownOpen && (
//           <div
//             style={{
//               position: "absolute",
//               top: "50px",
//               right: "0",
//               background: "#fff",
//               borderRadius: "5px",
//               boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//               width: "200px",
//               zIndex: 999,
//               overflow: "hidden"
//             }}
//           >
//             {/* User info section */}
//             <div style={{
//               padding: "15px",
//               background: "#f9f9f9",
//               borderBottom: "1px solid #eee"
//             }}>
//               <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
//                 {user && user.name ? user.name : "User"}
//               </div>
//               <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "5px" }}>
//                 {role.charAt(0).toUpperCase() + role.slice(1)}
//               </div>
//             </div>
            
//             <div
//               style={{
//                 padding: "12px 15px",
//                 cursor: "pointer",
//                 transition: "background 0.2s"
//               }}
//               onMouseEnter={(e) => e.target.style.background = "#f5f5f5"}
//               onMouseLeave={(e) => e.target.style.background = "#fff"}
//               onClick={() => {
//                 // Handle profile navigation
//                 setDropdownOpen(false);
//               }}
//             >
//               Profile
//             </div>
//             <div
//               style={{
//                 padding: "12px 15px",
//                 cursor: "pointer",
//                 transition: "all 0.2s",
//                 color: "#000", // Black text
//                 background: "#fff" // White background
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.background = "#e74c3c"; // Red background on hover
//                 e.target.style.color = "#fff"; // White text on hover
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = "#fff"; // White background
//                 e.target.style.color = "#000"; // Black text
//               }}
//               onClick={handleLogout}
//             >
//               Logout
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @media (max-width: 768px) {
//           .menu-toggle {
//             display: block !important;
//           }
//         }
//       `}</style>
//     </header>
//   );
// };

// export default Header;





















// src/components/layouts/Header.jsx
// import React, { useState, useRef, useEffect } from "react";

// const Header = ({ role, toggleSidebar, user, onLogout }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   // Get user's first initial for avatar
//   const getUserInitial = () => {
//     if (user && user.name) {
//       return user.name.charAt(0).toUpperCase();
//     }
//     return "U"; // Default initial if no user data
//   };

//   const handleLogout = () => {
//     if (onLogout) {
//       onLogout();
//     }
//     setDropdownOpen(false);
//   };

//   return (
//     <header
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "10px 20px",
//         background: "#fff",
//         borderBottom: "1px solid #ddd",
//         position: "relative",
//         zIndex: 997,
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <button
//           onClick={toggleSidebar}
//           style={{
//             background: "none",
//             border: "none",
//             fontSize: "20px",
//             cursor: "pointer",
//             marginRight: "15px",
//             display: "none"
//           }}
//           className="menu-toggle"
//         >
//           ☰
//         </button>
//         <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#333" }}>
//           Welcome, {user && user.name ? user.name : "User"}
//         </h1>
//       </div>
      
//       <div style={{ position: "relative" }} ref={dropdownRef}>
//         <div
//           onClick={toggleDropdown}
//           style={{
//             width: "40px",
//             height: "40px",
//             borderRadius: "50%",
//             background: "#1CA3DE",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             fontSize: "18px",
//             fontWeight: "bold"
//           }}
//         >
//           {getUserInitial()}
//         </div>
        
//         {dropdownOpen && (
//           <div
//             style={{
//               position: "absolute",
//               top: "50px",
//               right: "0",
//               background: "#fff",
//               borderRadius: "5px",
//               boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//               width: "200px",
//               zIndex: 999,
//               overflow: "hidden"
//             }}
//           >
//             {/* User info section - Only showing name */}
//             <div style={{
//               padding: "15px",
//               background: "#f9f9f9",
//               borderBottom: "1px solid #eee"
//             }}>
//               <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
//                 {user && user.name ? user.name : "User"}
//               </div>
//             </div>
            
//             <div
//               style={{
//                 padding: "12px 15px",
//                 cursor: "pointer",
//                 transition: "background 0.2s"
//               }}
//               onMouseEnter={(e) => e.target.style.background = "#f5f5f5"}
//               onMouseLeave={(e) => e.target.style.background = "#fff"}
//               onClick={() => {
//                 // Handle profile navigation
//                 setDropdownOpen(false);
//               }}
//             >
//               Profile
//             </div>
//             <div
//               style={{
//                 padding: "12px 15px",
//                 cursor: "pointer",
//                 transition: "all 0.2s",
//                 color: "#000", // Black text
//                 background: "#fff" // White background
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.background = "#e74c3c"; // Red background on hover
//                 e.target.style.color = "#fff"; // White text on hover
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = "#fff"; // White background
//                 e.target.style.color = "#000"; // Black text
//               }}
//               onClick={handleLogout}
//             >
//               Logout
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @media (max-width: 768px) {
//           .menu-toggle {
//             display: block !important;
//           }
//         }
//       `}</style>
//     </header>
//   );
// };

// export default Header;

















// src/components/layouts/Header.jsx
import React, { useState, useRef, useEffect } from "react";

const Header = ({ role, toggleSidebar, user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Get user's first initial for avatar
  const getUserInitial = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "U"; // Default initial if no user data
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setDropdownOpen(false);
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#fff",
        borderBottom: "1px solid #ddd",
        position: "relative",
        zIndex: 1000, // Increased z-index to ensure header is above sidebar
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={toggleSidebar}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            marginRight: "15px",
            display: "none"
          }}
          className="menu-toggle"
        >
          ☰
        </button>
        <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#333" }}>
          Welcome, {user && user.name ? user.name : "User"}
        </h1>
      </div>
      
      <div style={{ position: "relative" }} ref={dropdownRef}>
        <div
          onClick={toggleDropdown}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#1CA3DE",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          {getUserInitial()}
        </div>
        
        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              right: "0",
              background: "#fff",
              borderRadius: "5px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              width: "200px",
              zIndex: 1001, // Higher than header to ensure dropdown appears above everything
              overflow: "hidden"
            }}
          >
            {/* User info section - Only showing name */}
            <div style={{
              padding: "15px",
              background: "#f9f9f9",
              borderBottom: "1px solid #eee"
            }}>
              <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                {user && user.name ? user.name : "User"}
              </div>
            </div>
            
            <div
              style={{
                padding: "12px 15px",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.background = "#f5f5f5"}
              onMouseLeave={(e) => e.target.style.background = "#fff"}
              onClick={() => {
                // Handle profile navigation
                setDropdownOpen(false);
              }}
            >
              Profile
            </div>
            <div
              style={{
                padding: "12px 15px",
                cursor: "pointer",
                transition: "all 0.2s",
                color: "#000", // Black text
                background: "#fff" // White background
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#e74c3c"; // Red background on hover
                e.target.style.color = "#fff"; // White text on hover
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#fff"; // White background
                e.target.style.color = "#000"; // Black text
              }}
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;