// import React, { useState } from "react";
// import AuthForm from "./AuthForm";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const API_URL = "http://127.0.0.1:8000/api/password-reset-confirm/";

// const ResetPasswordPage = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token");
//   const uid = searchParams.get("uid");

//   const validateForm = () => {
//     const newErrors = {};
//     if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
//     if (password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setIsLoading(true);
//     setMessage("");
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           uid,
//           token,
//           new_password: password,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMessage(
//           data.message ||
//             "Your password has been reset successfully. Redirecting to login..."
//         );
//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       } else {
//         setMessage(
//           data.detail ||
//             data.error ||
//             "An error occurred. Please try again."
//         );
//       }
//     } catch (error) {
//       setMessage("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <AuthForm title="Reset Password" onSubmit={handleResetPassword}>
//       {/* Password Input */}
//       <div style={{ position: "relative", marginBottom: errors.password ? "0.5rem" : "1.2rem" }}>
//         <input
//           type="password"
//           placeholder="New Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className={errors.password ? "error" : ""}
//           style={{ paddingLeft: "15px" }}
//         />
//         {errors.password && <div className="error-message">{errors.password}</div>}
//       </div>
//       {/* Confirm Password Input */}
//       <div style={{ position: "relative", marginBottom: errors.confirmPassword ? "0.5rem" : "1.2rem" }}>
//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           className={errors.confirmPassword ? "error" : ""}
//           style={{ paddingLeft: "15px" }}
//         />
//         {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
//       </div>
//       {message && (
//         <div style={{
//           padding: "10px",
//           borderRadius: "5px",
//           backgroundColor: message.includes("successfully") ? "#f6ffed" : "#fff2e8",
//           border: message.includes("successfully") ? "1px solid #b7eb8f" : "1px solid #ffbb96",
//           marginBottom: "15px",
//           textAlign: "center"
//         }}>
//           {message}
//         </div>
//       )}
//       <button
//         type="submit"
//         disabled={isLoading}
//         style={{ opacity: isLoading ? 0.7 : 1 }}
//       >
//         {isLoading ? "Resetting..." : "Reset Password"}
//       </button>
//     </AuthForm>
//   );
// };

// export default ResetPasswordPage;












import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./ResetPasswordPage.css";

const API_URL = "http://127.0.0.1:8000/api/password-reset-confirm/";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");

  const validateForm = () => {
    const newErrors = {};
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setMessage("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token, new_password: password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Your password has been reset successfully. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.detail || data.error || "An error occurred. Please try again.");
      }
    } catch {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm title="Reset Password" onSubmit={handleResetPassword} className="auth-form-container">
      <div className={`input-field ${errors.password ? "error-field" : ""}`}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={errors.password ? "error" : ""}
        />
        {errors.password && <div className="error-message">{errors.password}</div>}
      </div>

      <div className={`input-field ${errors.confirmPassword ? "error-field" : ""}`}>
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={errors.confirmPassword ? "error" : ""}
        />
        {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
      </div>

      {message && (
        <div className={`message-box ${message.includes("successfully") ? "message-success" : "message-error"}`}>
          {message}
        </div>
      )}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>
    </AuthForm>
  );
};

export default ResetPasswordPage;
