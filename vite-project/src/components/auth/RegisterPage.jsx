import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGlobe, FaUniversity, FaUserTag } from "react-icons/fa";
import "./RegisterPage.css";

const API_URL = "http://127.0.0.1:8000/api/register/";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("Student");
  const [country, setCountry] = useState("");
  const [phoneCode, setPhoneCode] = useState("+255");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role] = useState("Researcher");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validatePhoneNumber = (code, number) => {
    const cleanNumber = number.replace(/\D/g, "");
    const validationRules = {
      "+255": { pattern: /^\d{9}$/, message: "Tanzanian numbers must be 9 digits" },
      "+254": { pattern: /^\d{9}$/, message: "Kenyan numbers must be 9 digits" },
      "+256": { pattern: /^\d{9}$/, message: "Ugandan numbers must be 9 digits" },
      "+250": { pattern: /^\d{9}$/, message: "Rwandan numbers must be 9 digits" },
      "+257": { pattern: /^\d{8}$/, message: "Burundian numbers must be 8 digits" },
    };
    const defaultRule = { pattern: /^\d{8,15}$/, message: "Phone number must be 8-15 digits" };
    const rule = validationRules[code] || defaultRule;
    if (!cleanNumber) return "Please enter a phone number";
    if (!rule.pattern.test(cleanNumber)) return rule.message;
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length < 2) newErrors.name = "Full name must contain at least 2 parts";
    if (!email.includes("@")) newErrors.email = "Email must contain @ symbol";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (username.length < 3) newErrors.username = "Username must be at least 3 characters";
    if (!country) newErrors.country = "Please select a country";
    const phoneError = validatePhoneNumber(phoneCode, phoneNumber);
    if (phoneError) newErrors.phoneNumber = phoneError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const nameParts = name.trim().split(/\s+/);
    const first_name = nameParts[0];
    const last_name = nameParts.slice(1).join(" ");

    const payload = {
      username,
      email,
      password,
      first_name,
      last_name,
      type,
      country,
      research_type: "",
      phone_number: phoneCode + phoneNumber,
      role,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        navigate("/login");
      } else {
        const data = await res.json();
        setErrors(data);
      }
    } catch {
      setErrors({ general: "Registration failed. Try again." });
    }
  };

  const countryCodes = [
    { code: "+255", country: "Tanzania" },
    { code: "+254", country: "Kenya" },
    { code: "+256", country: "Uganda" },
    { code: "+250", country: "Rwanda" },
    { code: "+257", country: "Burundi" },
    { code: "+27", country: "South Africa" },
    { code: "+234", country: "Nigeria" },
    { code: "+233", country: "Ghana" },
  ];

  const countries = ["Tanzania", "Kenya", "Uganda", "Rwanda", "Burundi", "South Africa", "Nigeria", "Ghana"];

  return (
    <AuthForm title="Register" onSubmit={handleRegister} className="auth-form-container">
      <div className="input-with-icon">
        <FaUser className="input-icon" />
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className={errors.name ? "error" : ""} />
      </div>
      {errors.name && <div className="error-message">{errors.name}</div>}

      <div className="input-with-icon">
        <FaUserTag className="input-icon" />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className={errors.username ? "error" : ""} />
      </div>
      {errors.username && <div className="error-message">{errors.username}</div>}

      <div className="input-with-icon">
        <FaEnvelope className="input-icon" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={errors.email ? "error" : ""} />
      </div>
      {errors.email && <div className="error-message">{errors.email}</div>}

      <div className="input-with-icon">
        <FaLock className="input-icon" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={errors.password ? "error" : ""} />
      </div>
      {errors.password && <div className="error-message">{errors.password}</div>}

      <div className="input-with-icon">
        <FaLock className="input-icon" />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className={errors.confirmPassword ? "error" : ""} />
      </div>
      {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}

      <div className="input-with-icon">
        <FaUniversity className="input-icon" />
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="Student">Student</option>
          <option value="University">University</option>
          <option value="Institute">Institute</option>
          <option value="Independent">Independent</option>
        </select>
      </div>

      <div className="input-with-icon phone-input-wrapper">
        <FaPhone className="input-icon" />
        <select value={phoneCode} onChange={(e) => { setPhoneCode(e.target.value); setPhoneNumber(""); }}>
          {countryCodes.map((item) => <option key={item.code} value={item.code}>{item.code}</option>)}
        </select>
        <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className={errors.phoneNumber ? "error" : ""} />
      </div>
      {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}

      <div className="input-with-icon">
        <FaGlobe className="input-icon" />
        <select value={country} onChange={(e) => setCountry(e.target.value)} required className={errors.country ? "error" : ""}>
          <option value="">Select Country</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {errors.country && <div className="error-message">{errors.country}</div>}

      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Login here</span>
      </p>
    </AuthForm>
  );
};

export default RegisterPage;









