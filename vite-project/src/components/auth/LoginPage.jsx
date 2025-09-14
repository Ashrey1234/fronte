





// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";      origin code 
// import "./LoginPage.css";

// const API_URL = "http://127.0.0.1:8000/api/token/";

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await res.json();

//     if (res.ok && data.access) {
//   // localStorage.setItem("access", data.access);
//   // localStorage.setItem("refresh", data.refresh);
//   // localStorage.setItem("username", username);
//   // localStorage.setItem("role", data.role);


//  // Normalize role to lowercase
//         const role = data.role.toLowerCase();

//         localStorage.setItem("access", data.access);
//         localStorage.setItem("refresh", data.refresh);
//         localStorage.setItem("username", username);
//         localStorage.setItem("role", role);



//   if (data.role === "Admin") {
//     navigate("/admin-dashboard");
//   } else if (data.role === "Officer") {
//     navigate("/officer-dashboard");
//   } else {
//     navigate("/dashboard"); // default researcher
//   }


//       } else {
//         setError("Invalid username or password.");
//       }
//     } catch {
//       setError("Login failed. Try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <div className="logo-container">
//           <img src="images.png" alt="Zafiri Portal Logo" />
//           <h2>Welcome to</h2>
//           <h1>ZAFIRI PORTAL</h1>
//         </div>

//         <form onSubmit={handleLogin} className="auth-form">
//           {error && <div className="error-message">{error}</div>}

//           <div className="input-wrapper">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//               <circle cx="12" cy="7" r="4"></circle>
//             </svg>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-wrapper">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
//               <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
//             </svg>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div className="forgot-password">
//             <Link to="/forgot-password">Forgot Password?</Link>
//           </div>

//           <button type="submit" className="auth-button">
//             Login
//           </button>

//           <p>
//             Don't have an account? <Link to="/register">Register here</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;






























// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./LoginPage.css";

// const API_URL = "http://127.0.0.1:8000/api/token/";

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // 👈 state ya ku-toggle
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await res.json();

//       if (res.ok && data.access) {
//         const role = data.role.toLowerCase();
//         localStorage.setItem("access", data.access);
//         localStorage.setItem("refresh", data.refresh);
//         localStorage.setItem("username", username);
//         localStorage.setItem("role", role);

//         if (data.role === "Admin") {
//           navigate("/admin-dashboard");
//         } else if (data.role === "Officer") {
//           navigate("/officer-dashboard");
//         } else {
//           navigate("/dashboard");
//         }
//       } else {
//         setError("Invalid username or password.");
//       }
//     } catch {
//       setError("Login failed. Try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <div className="logo-container">
//           <img src="images.png" alt="Zafiri Portal Logo" />
//           <h2>Welcome to</h2>
//           <h1>ZAFIRI PORTAL</h1>
//         </div>

//         <form onSubmit={handleLogin} className="auth-form">
//           {error && <div className="error-message">{error}</div>}

//           {/* Username input */}
//           <div className="input-wrapper">
//             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
//               viewBox="0 0 24 24" fill="none" stroke="currentColor"
//               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//               <circle cx="12" cy="7" r="4"></circle>
//             </svg>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           {/* Password input with toggle 👁️/🙈 */}
//           <div className="input-wrapper">
//             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
//               viewBox="0 0 24 24" fill="none" stroke="currentColor"
//               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
//               <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
//             </svg>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <span
//               className="toggle-password"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </span>
//           </div>

//           <div className="forgot-password">
//             <Link to="/forgot-password">Forgot Password?</Link>
//           </div>

//           <button type="submit" className="auth-button">Login</button>

//           <p>
//             Don't have an account? <Link to="/register">Register here</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;






















import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const API_URL = "http://127.0.0.1:8000/api/token/";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.access) {
        const role = data.role.toLowerCase();
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);

  //       if (data.role === "Admin") {
  //         navigate("/admin-dashboard");
  //       } else if (data.role === "Officer") {
  //         navigate("/officer-dashboard");
  //       } else {
  //         navigate("/dashboard");
  //       }
  //     } else {
  //       setError("Invalid username or password.");
  //     }
  //   } catch {
  //     setError("Login failed. Try again.");
  //   }
  // };








     if (data.role === "Officer") {
            navigate("/officer-dashboard");
      } else {
            navigate("/dashboard");
      }

      } else {
          setError("Invalid username or password.");
        }
     } catch {
        setError("Login failed. Try again.");
      }
    };
  


  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-container">
          <img src="images.png" alt="Zafiri Portal Logo" />
          <h2>Welcome to</h2>
          <h1>ZAFIRI PORTAL</h1>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          {/* Username input */}
          <div className="input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password input with icon toggle */}
          <div className="input-wrapper has-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </span>
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="auth-button">Login</button>

          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;