// import React, { useState } from "react";
// import AuthForm from "./AuthForm";
// import { useNavigate } from "react-router-dom";

// const API_URL = "http://127.0.0.1:8000/api/password-reset/";

// const ForgotPasswordPage = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage("");
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMessage(
//           data.message ||
//             "If an account exists with this email, you will receive a password reset link shortly."
//         );
//       } else {
//         setMessage(data.error || "An error occurred. Please try again.");
//       }
//     } catch (error) {
//       setMessage("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <AuthForm title="Forgot Password" onSubmit={handleResetPassword}>
//       <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
//         Enter your email address and we'll send you a link to reset your password.
//       </p>
//       <div style={{ position: "relative", marginBottom: "1.2rem" }}>
//         <div
//           style={{
//             position: "absolute",
//             left: "15px",
//             top: "50%",
//             transform: "translateY(-50%)",
//             color: "#777",
//             zIndex: 1,
//           }}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="18"
//             height="18"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//             <polyline points="22,6 12,13 2,6"></polyline>
//           </svg>
//         </div>
//         <input
//           type="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{ paddingLeft: "45px" }}
//         />
//       </div>
//       {message && (
//         <div
//           style={{
//             padding: "10px",
//             borderRadius: "5px",
//             backgroundColor: "#e6f7ff",
//             border: "1px solid #91d5ff",
//             marginBottom: "15px",
//             textAlign: "center",
//           }}
//         >
//           {message}
//         </div>
//       )}
//       <button
//         type="submit"
//         disabled={isLoading}
//         style={{ opacity: isLoading ? 0.7 : 1 }}
//       >
//         {isLoading ? "Sending..." : "Send Reset Link"}
//       </button>
//       <p style={{ textAlign: "center", marginTop: "20px" }}>
//         Remember your password?{" "}
//         <span
//           onClick={() => navigate("/login")}
//           style={{ color: "#4a90e2", cursor: "pointer", fontWeight: "600" }}
//         >
//           Login here
//         </span>
//       </p>
//     </AuthForm>
//   );
// };

// export default ForgotPasswordPage;




















import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import "./ForgotPasswordPage.css";

const API_URL = "http://127.0.0.1:8000/api/password-reset/";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "If an account exists with this email, you will receive a password reset link shortly.");
      } else {
        setMessage(data.error || "An error occurred. Please try again.");
      }
    } catch {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm title="Forgot Password" className="auth-form-container" onSubmit={handleResetPassword}>
      <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <div className="input-field">
        <div className="input-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {message && <div className="message-box">{message}</div>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Reset Link"}
      </button>

      <div className="login-link">
        Remember your password? <span onClick={() => navigate("/login")}>Login here</span>
      </div>
    </AuthForm>
  );
};

export default ForgotPasswordPage;
