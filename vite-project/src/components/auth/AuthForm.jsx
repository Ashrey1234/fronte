// 📁 src/components/auth/AuthForm.jsx
import React from "react";
import "./AuthForm.css";

const AuthForm = ({ title, onSubmit, children }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{title}</h2>
        <form onSubmit={onSubmit} className="auth-form">
          {children}
          <button type="submit" className="auth-button">
            {title}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
