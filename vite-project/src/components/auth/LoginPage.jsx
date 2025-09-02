// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

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
//       if (res.ok && data.access) {
//         localStorage.setItem("access", data.access);
//         localStorage.setItem("refresh", data.refresh);
//         navigate("/dashboard"); // Redirect to dashboard
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
//         {/* Logo and Welcome Message */}
//         <div style={{ textAlign: "center", marginBottom: "2rem" }}>
//           <div style={{
//             margin: "0 auto 1rem",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center"
//           }}>
//             <img 
//               src="images.png" 
//               alt="Zafiri Portal Logo" 
//               style={{ 
//                 width: "200px", 
//                 height: "200px",
//                 objectFit: "contain"
//               }}
//             />       
//           </div>
//           <h2 style={{ 
//             color: "#4a90e2", 
//             margin: "0 0 0.5rem 0",
//             fontSize: "1.8rem",
//             fontWeight: "700"
//           }}>
//             Welcome to
//           </h2>
//           <h1 style={{ 
//             color: "#2c3e50", 
//             margin: "0",
//             fontSize: "2.2rem",
//             fontWeight: "800",
//             letterSpacing: "1px"
//           }}>
//             ZAFIRI PORTAL
//           </h1>
//         </div>

//         <form onSubmit={handleLogin} className="auth-form">
//           {error && (
//             <div style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
//               {error}
//             </div>
//           )}
//           {/* Username Input with Icon */}
//           <div style={{ position: "relative", marginBottom: "1.2rem" }}>
//             <div
//               style={{
//                 position: "absolute",
//                 left: "15px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: "#777",
//                 zIndex: 1
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                 <circle cx="12" cy="7" r="4"></circle>
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               style={{ paddingLeft: "45px" }}
//             />
//           </div>
          
//           {/* Password Input with Icon */}
//           <div style={{ position: "relative", marginBottom: "1.2rem" }}>
//             <div
//               style={{
//                 position: "absolute",
//                 left: "15px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: "#777",
//                 zIndex: 1
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
//                 <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
//               </svg>
//             </div>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={{ paddingLeft: "45px" }}
//             />
//           </div>
          
//           {/* Forgot Password Link */}
//           <div style={{ textAlign: "right", margin: "-10px 0 15px 0" }}>
//             <Link 
//               to="/forgot-password" 
//               style={{ 
//                 color: "#4a90e2", 
//                 fontSize: "0.9rem", 
//                 textDecoration: "none" 
//               }}
//             >
//               Forgot Password?
//             </Link>
//           </div>
          
//           <button type="submit" className="auth-button">
//             Login
//           </button>
          
//           <p style={{ marginTop: "10px" }}>
//             Don't have an account? <Link to="/register">Register here</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
















//                    now

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

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
//       if (res.ok && data.access) {
//         // Hifadhi tokens
//         localStorage.setItem("access", data.access);
//         localStorage.setItem("refresh", data.refresh);

//         // Hifadhi pia username
//         localStorage.setItem("username", username);

//         navigate("/dashboard"); // Redirect to dashboard
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
//         {/* Logo and Welcome Message */}
//         <div style={{ textAlign: "center", marginBottom: "2rem" }}>
//           <div
//             style={{
//               margin: "0 auto 1rem",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <img
//               src="images.png"
//               alt="Zafiri Portal Logo"
//               style={{
//                 width: "200px",
//                 height: "200px",
//                 objectFit: "contain",
//               }}
//             />
//           </div>
//           <h2
//             style={{
//               color: "#4a90e2",
//               margin: "0 0 0.5rem 0",
//               fontSize: "1.8rem",
//               fontWeight: "700",
//             }}
//           >
//             Welcome to
//           </h2>
//           <h1
//             style={{
//               color: "#2c3e50",
//               margin: "0",
//               fontSize: "2.2rem",
//               fontWeight: "800",
//               letterSpacing: "1px",
//             }}
//           >
//             ZAFIRI PORTAL
//           </h1>
//         </div>

//         <form onSubmit={handleLogin} className="auth-form">
//           {error && (
//             <div
//               style={{
//                 color: "red",
//                 marginBottom: "10px",
//                 textAlign: "center",
//               }}
//             >
//               {error}
//             </div>
//           )}
//           {/* Username Input with Icon */}
//           <div style={{ position: "relative", marginBottom: "1.2rem" }}>
//             <div
//               style={{
//                 position: "absolute",
//                 left: "15px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: "#777",
//                 zIndex: 1,
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                 <circle cx="12" cy="7" r="4"></circle>
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               style={{ paddingLeft: "45px" }}
//             />
//           </div>

//           {/* Password Input with Icon */}
//           <div style={{ position: "relative", marginBottom: "1.2rem" }}>
//             <div
//               style={{
//                 position: "absolute",
//                 left: "15px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: "#777",
//                 zIndex: 1,
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <rect
//                   x="3"
//                   y="11"
//                   width="18"
//                   height="11"
//                   rx="2"
//                   ry="2"
//                 ></rect>
//                 <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
//               </svg>
//             </div>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={{ paddingLeft: "45px" }}
//             />
//           </div>

//           {/* Forgot Password Link */}
//           <div style={{ textAlign: "right", margin: "-10px 0 15px 0" }}>
//             <Link
//               to="/forgot-password"
//               style={{
//                 color: "#4a90e2",
//                 fontSize: "0.9rem",
//                 textDecoration: "none",
//               }}
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <button type="submit" className="auth-button">
//             Login
//           </button>

//           <p style={{ marginTop: "10px" }}>
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
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("username", username);
        navigate("/dashboard");
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

          <div className="input-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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

          <div className="input-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="auth-button">
            Login
          </button>

          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
