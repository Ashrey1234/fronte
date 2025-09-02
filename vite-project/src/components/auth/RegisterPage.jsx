

// import React, { useState } from "react";
// import AuthForm from "./AuthForm";
// import { useNavigate } from "react-router-dom";

// const API_URL = "http://127.0.0.1:8000/api/register/";

// const RegisterPage = () => {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [type, setType] = useState("Student");
//   const [country, setCountry] = useState("");
//   const [phoneCode, setPhoneCode] = useState("+255");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   // Function to validate phone number based on country code
//   const validatePhoneNumber = (code, number) => {
//     // Remove any non-digit characters
//     const cleanNumber = number.replace(/\D/g, "");

//     // Validation rules for different country codes
//     const validationRules = {
//       "+1": {
//         // USA/Canada
//         pattern: /^\d{10}$/,
//         message: "US/Canada numbers must be 10 digits (e.g., 1234567890)",
//       },
//       "+44": {
//         // UK
//         pattern: /^\d{10,11}$/,
//         message: "UK numbers must be 10-11 digits",
//       },
//       "+91": {
//         // India
//         pattern: /^\d{10}$/,
//         message: "Indian numbers must be 10 digits",
//       },
//       "+254": {
//         // Kenya
//         pattern: /^\d{9}$/,
//         message: "Kenyan numbers must be 9 digits (e.g., 712345678)",
//       },
//       "+255": {
//         // Tanzania
//         pattern: /^\d{9}$/,
//         message: "Tanzanian numbers must be 9 digits (e.g., 712345678)",
//       },
//       "+256": {
//         // Uganda
//         pattern: /^\d{9}$/,
//         message: "Ugandan numbers must be 9 digits",
//       },
//       "+250": {
//         // Rwanda
//         pattern: /^\d{9}$/,
//         message: "Rwandan numbers must be 9 digits",
//       },
//       "+257": {
//         // Burundi
//         pattern: /^\d{8}$/,
//         message: "Burundian numbers must be 8 digits",
//       },
//       "+27": {
//         // South Africa
//         pattern: /^\d{9}$/,
//         message: "South African numbers must be 9 digits",
//       },
//       "+234": {
//         // Nigeria
//         pattern: /^\d{10}$/,
//         message: "Nigerian numbers must be 10 digits",
//       },
//       "+233": {
//         // Ghana
//         pattern: /^\d{9}$/,
//         message: "Ghanaian numbers must be 9 digits",
//       },
//       "+251": {
//         // Ethiopia
//         pattern: /^\d{9}$/,
//         message: "Ethiopian numbers must are 9 digits",
//       },
//       "+20": {
//         // Egypt
//         pattern: /^\d{10}$/,
//         message: "Egyptian numbers must be 10 digits",
//       },
//       "+263": {
//         // Zimbabwe
//         pattern: /^\d{9}$/,
//         message: "Zimbabwean numbers must be 9 digits",
//       },
//       "+260": {
//         // Zambia
//         pattern: /^\d{9}$/,
//         message: "Zambian numbers must be 9 digits",
//       },
//       "+261": {
//         // Madagascar
//         pattern: /^\d{9}$/,
//         message: "Madagascar numbers must be 9 digits",
//       },
//       "+262": {
//         // Reunion
//         pattern: /^\d{9}$/,
//         message: "Reunion numbers must be 9 digits",
//       },
//       "+268": {
//         // Eswatini
//         pattern: /^\d{8}$/,
//         message: "Eswatini numbers must be 8 digits",
//       },
//     };

//     // Default validation if no specific rule exists
//     const defaultRule = {
//       pattern: /^\d{8,15}$/,
//       message: "Phone number must be 8-15 digits",
//     };

//     const rule = validationRules[code] || defaultRule;

//     if (!cleanNumber) {
//       return "Please enter a phone number";
//     }

//     if (!rule.pattern.test(cleanNumber)) {
//       return rule.message;
//     }

//     return null;
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Full name validation (at least 3 words)
//     const nameParts = name.trim().split(/\s+/);
//     if (nameParts.length < 3) {
//       newErrors.name = "Full name must contain at least 3 parts";
//     }

//     // Email validation
//     if (!email.includes("@")) {
//       newErrors.email = "Email must contain @ symbol";
//     }

//     // Password confirmation validation
//     if (password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     // Password strength validation
//     if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     // Username validation
//     if (username.length < 3) {
//       newErrors.username = "Username must be at least 3 characters";
//     }

//     // Country validation
//     if (!country) {
//       newErrors.country = "Please select a country";
//     }

//     // Phone number validation
//     const phoneError = validatePhoneNumber(phoneCode, phoneNumber);
//     if (phoneError) {
//       newErrors.phoneNumber = phoneError;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       console.log("Registering:", {
//         name,
//         username,
//         email,
//         password,
//         confirmPassword,
//         type,
//         country,
//         phone: phoneCode + phoneNumber,
//       });
//       // TODO: Call your register API
//       // On success, redirect to login
//       navigate("/login");
//     }
//   };

//   const countryCodes = [
//     { code: "+1", country: "United States/Canada" },
//     { code: "+44", country: "United Kingdom" },
//     { code: "+91", country: "India" },
//     { code: "+254", country: "Kenya" },
//     { code: "+255", country: "Tanzania" },
//     { code: "+256", country: "Uganda" },
//     { code: "+250", country: "Rwanda" },
//     { code: "+257", country: "Burundi" },
//     { code: "+27", country: "South Africa" },
//     { code: "+234", country: "Nigeria" },
//     { code: "+233", country: "Ghana" },
//     { code: "+251", country: "Ethiopia" },
//     { code: "+20", country: "Egypt" },
//     { code: "+263", country: "Zimbabwe" },
//     { code: "+260", country: "Zambia" },
//     { code: "+261", country: "Madagascar" },
//     { code: "+262", country: "Reunion" },
//     { code: "+268", country: "Eswatini" },
//   ];

//   const countries = [
//     "United States",
//     "Canada",
//     "United Kingdom",
//     "India",
//     "Kenya",
//     "Tanzania",
//     "Uganda",
//     "Rwanda",
//     "Burundi",
//     "South Africa",
//     "Nigeria",
//     "Ghana",
//     "Ethiopia",
//     "Egypt",
//     "Zimbabwe",
//     "Zambia",
//     "Madagascar",
//     "Reunion",
//     "Eswatini",
//   ];

//   // Format phone number as user types
//   const formatPhoneNumber = (value) => {
//     // Remove all non-digit characters
//     const cleanValue = value.replace(/\D/g, "");

//     // Format based on country code
//     if (phoneCode === "+1") {
//       // US/Canada format: (123) 456-7890
//       if (cleanValue.length <= 3) return cleanValue;
//       if (cleanValue.length <= 6)
//         return `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3)}`;
//       return `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(
//         3,
//         6
//       )}-${cleanValue.slice(6, 10)}`;
//     } else if (phoneCode === "+44") {
//       // UK format: 01234 567890
//       if (cleanValue.length <= 5) return cleanValue;
//       return `${cleanValue.slice(0, 5)} ${cleanValue.slice(5, 11)}`;
//     } else {
//       // Default format for other countries
//       return cleanValue;
//     }
//   };

//   const handlePhoneNumberChange = (e) => {
//     const formattedValue = formatPhoneNumber(e.target.value);
//     setPhoneNumber(formattedValue);
//   };

//   return (
//     <AuthForm title="Register" onSubmit={handleRegister}>
//       {/* Full Name Input with Icon */}
//       <div
//         style={{
//           position: "relative",
//           marginBottom: errors.name ? "0.5rem" : "1.2rem",
//         }}
//       >
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
//             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//             <circle cx="12" cy="7" r="4"></circle>
//           </svg>
//         </div>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className={errors.name ? "error" : ""}
//           style={{ paddingLeft: "45px" }}
//         />
//         {errors.name && <div className="error-message">{errors.name}</div>}
//       </div>

//       {/* Username Input with Icon */}
//       <div
//         style={{
//           position: "relative",
//           marginBottom: errors.username ? "0.5rem" : "1.2rem",
//         }}
//       >
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
//             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//             <circle cx="12" cy="7" r="4"></circle>
//           </svg>
//         </div>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           className={errors.username ? "error" : ""}
//           style={{ paddingLeft: "45px" }}
//         />
//         {errors.username && (
//           <div className="error-message">{errors.username}</div>
//         )}
//       </div>

//       {/* Email Input with Icon */}
//       <div
//         style={{
//           position: "relative",
//           marginBottom: errors.email ? "0.5rem" : "1.2rem",
//         }}
//       >
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
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className={errors.email ? "error" : ""}
//           style={{ paddingLeft: "45px" }}
//         />
//         {errors.email && <div className="error-message">{errors.email}</div>}
//       </div>

//       {/* Password Input with Icon */}
//       <div
//         style={{
//           position: "relative",
//           marginBottom: errors.password ? "0.5rem" : "1.2rem",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             left: "15px",
//             top: "50%",
//             transform: "translateY(-50%)",
//             color: "##777",
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
//             <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
//             <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
//           </svg>
//         </div>
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className={errors.password ? "error" : ""}
//           style={{ paddingLeft: "45px" }}
//         />
//         {errors.password && (
//           <div className="error-message">{errors.password}</div>
//         )}
//       </div>

//       {/* Confirm Password Input with Icon */}
//       <div
//         style={{
//           position: "relative",
//           marginBottom: errors.confirmPassword ? "0.5rem" : "1.2rem",
//         }}
//       >
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
//             <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
//             <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
//           </svg>
//         </div>
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           className={errors.confirmPassword ? "error" : ""}
//           style={{ paddingLeft: "45px" }}
//         />
//         {errors.confirmPassword && (
//           <div className="error-message">{errors.confirmPassword}</div>
//         )}
//       </div>

//       {/* Account Type Select with Icon */}
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
//             <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
//             <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
//             <path d="M2 2l7.586 7.586"></path>
//             <circle cx="11" cy="11" r="2"></circle>
//           </svg>
//         </div>
//         <select
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           required
//           style={{ paddingLeft: "45px" }}
//         >
//           <option value="Student">Student</option>
//           <option value="University">University</option>
//           <option value="Institute">Institute</option>
//           <option value="Independent">Independent</option>
//         </select>
//       </div>

//       {/* Phone Number Input */}
//       <div style={{ marginBottom: errors.phoneNumber ? "0.5rem" : "1.2rem" }}>
//         <div style={{ display: "flex", gap: "10px" }}>
//           {/* Country Code Select with Icon */}
//           <div style={{ position: "relative", width: "30%" }}>
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
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//               </svg>
//             </div>
//             <select
//               value={phoneCode}
//               onChange={(e) => {
//                 setPhoneCode(e.target.value);
//                 setPhoneNumber("");
//               }}
//               style={{ paddingLeft: "40px", width: "100%" }}
//               required
//             >
//               {countryCodes.map((item) => (
//                 <option key={`${item.code}-${item.country}`} value={item.code}>
//                   {item.code}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Phone Number Input */}
//           <div style={{ position: "relative", width: "70%" }}>
//             <input
//               type="tel"
//               placeholder="Phone Number"
//               value={phoneNumber}
//               onChange={handlePhoneNumberChange}
//               className={errors.phoneNumber ? "error" : ""}
//               style={{ width: "100%", paddingLeft: "15px" }}
//               required
//             />
//           </div>
//         </div>
//         {errors.phoneNumber && (
//           <div className="error-message">{errors.phoneNumber}</div>
//         )}
//       </div>

//       {/* Country Select with Icon */}
//       <div
//         style={{
//           position: "relative",
//           marginBottom: errors.country ? "0.5rem" : "1.2rem",
//         }}
//       >
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
//             <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//             <circle cx="12" cy="10" r="3"></circle>
//           </svg>
//         </div>
//         <select
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//           required
//           className={errors.country ? "error" : ""}
//           style={{ paddingLeft: "45px" }}
//         >
//           <option value="">Select Country</option>
//           {countries.map((country) => (
//             <option key={country} value={country}>
//               {country}
//             </option>
//           ))}
//         </select>
//         {errors.country && (
//           <div className="error-message">{errors.country}</div>
//         )}
//       </div>

//       <p style={{ marginTop: "10px" }}>
//         Already have an account?{" "}
//         <span
//           onClick={() => navigate("/login")}
//           style={{ color: "#4a90e2", cursor: "pointer" }}
//         >
//           Login here
//         </span>
//       </p>
//     </AuthForm>
//   );
// };

// export default RegisterPage;











// 





// import React, { useState } from "react";
// import AuthForm from "./AuthForm";
// import { useNavigate } from "react-router-dom";
// import { FaUser, FaEnvelope, FaLock, FaPhone, FaGlobe, FaUniversity, FaUserTag } from "react-icons/fa";

// const API_URL = "http://127.0.0.1:8000/api/register/";

// const RegisterPage = () => {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [type, setType] = useState("Student");
//   const [country, setCountry] = useState("");
//   const [phoneCode, setPhoneCode] = useState("+255");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [role] = useState("Researcher");
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   // Function to validate phone number based on country code
//   const validatePhoneNumber = (code, number) => {
//     const cleanNumber = number.replace(/\D/g, "");
//     const validationRules = {
//       "+255": { pattern: /^\d{9}$/, message: "Tanzanian numbers must be 9 digits (e.g., 712345678)" },
//       "+254": { pattern: /^\d{9}$/, message: "Kenyan numbers must be 9 digits" },
//       "+256": { pattern: /^\d{9}$/, message: "Ugandan numbers must be 9 digits" },
//       "+250": { pattern: /^\d{9}$/, message: "Rwandan numbers must be 9 digits" },
//       "+257": { pattern: /^\d{8}$/, message: "Burundian numbers must be 8 digits" },
//     };
//     const defaultRule = { pattern: /^\d{8,15}$/, message: "Phone number must be 8-15 digits" };
//     const rule = validationRules[code] || defaultRule;

//     if (!cleanNumber) return "Please enter a phone number";
//     if (!rule.pattern.test(cleanNumber)) return rule.message;
//     return null;
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const nameParts = name.trim().split(/\s+/);
//     if (nameParts.length < 2) newErrors.name = "Full name must contain at least 2 parts";
//     if (!email.includes("@")) newErrors.email = "Email must contain @ symbol";
//     if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
//     if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
//     if (username.length < 3) newErrors.username = "Username must be at least 3 characters";
//     if (!country) newErrors.country = "Please select a country";
//     const phoneError = validatePhoneNumber(phoneCode, phoneNumber);
//     if (phoneError) newErrors.phoneNumber = phoneError;

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // UPDATED handleRegister
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const nameParts = name.trim().split(/\s+/);
//     const first_name = nameParts[0];
//     const last_name = nameParts.slice(1).join(" ");

//     const payload = {
//       username,
//       email,
//       password,
//       first_name,
//       last_name,
//       type,
//       country,
//       research_type: "", // optional
//       phone_number: phoneCode + phoneNumber,
//       role,
//     };

//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (res.ok) {
//         navigate("/login");
//       } else {
//         const data = await res.json();
//         setErrors(data);
//       }
//     } catch (err) {
//       setErrors({ general: "Registration failed. Try again." });
//     }
//   };

//   const countryCodes = [
//     { code: "+255", country: "Tanzania" },
//     { code: "+254", country: "Kenya" },
//     { code: "+256", country: "Uganda" },
//     { code: "+250", country: "Rwanda" },
//     { code: "+257", country: "Burundi" },
//     { code: "+27", country: "South Africa" },
//     { code: "+234", country: "Nigeria" },
//     { code: "+233", country: "Ghana" },
//   ];

//   const countries = ["Tanzania", "Kenya", "Uganda", "Rwanda", "Burundi", "South Africa", "Nigeria", "Ghana"];

//   return (
//     <AuthForm title="Register" onSubmit={handleRegister}>
//       {/* Full Name */}
//       <div className="input-with-icon">
//         <FaUser className="input-icon" />
//         <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className={errors.name ? "error" : ""} />
//       </div>
//       {errors.name && <div className="error-message">{errors.name}</div>}

//       {/* Username */}
//       <div className="input-with-icon">
//         <FaUserTag className="input-icon" />
//         <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className={errors.username ? "error" : ""} />
//       </div>
//       {errors.username && <div className="error-message">{errors.username}</div>}

//       {/* Email */}
//       <div className="input-with-icon">
//         <FaEnvelope className="input-icon" />
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={errors.email ? "error" : ""} />
//       </div>
//       {errors.email && <div className="error-message">{errors.email}</div>}

//       {/* Password */}
//       <div className="input-with-icon">
//         <FaLock className="input-icon" />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={errors.password ? "error" : ""} />
//       </div>
//       {errors.password && <div className="error-message">{errors.password}</div>}

//       {/* Confirm Password */}
//       <div className="input-with-icon">
//         <FaLock className="input-icon" />
//         <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className={errors.confirmPassword ? "error" : ""} />
//       </div>
//       {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}

//       {/* Account Type */}
//       <div className="input-with-icon">
//         <FaUniversity className="input-icon" />
//         <select value={type} onChange={(e) => setType(e.target.value)} required>
//           <option value="Student">Student</option>
//           <option value="University">University</option>
//           <option value="Institute">Institute</option>
//           <option value="Independent">Independent</option>
//         </select>
//       </div>

//       {/* Phone */}
//       <div className="input-with-icon">
//         <FaPhone className="input-icon" />
//         <div style={{ display: "flex", gap: "5px", width: "100%" }}>
//           <select value={phoneCode} onChange={(e) => { setPhoneCode(e.target.value); setPhoneNumber(""); }} style={{ width: "30%" }}>
//             {countryCodes.map((item) => (
//               <option key={item.code} value={item.code}>{item.code}</option>
//             ))}
//           </select>
//           <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className={errors.phoneNumber ? "error" : ""} style={{ width: "70%" }} />
//         </div>
//       </div>
//       {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}

//       {/* Country */}
//       <div className="input-with-icon">
//         <FaGlobe className="input-icon" />
//         <select value={country} onChange={(e) => setCountry(e.target.value)} required className={errors.country ? "error" : ""}>
//           <option value="">Select Country</option>
//           {countries.map((c) => (
//             <option key={c} value={c}>{c}</option>
//           ))}
//         </select>
//       </div>
//       {errors.country && <div className="error-message">{errors.country}</div>}

//       <p style={{ marginTop: "10px" }}>
//         Already have an account?{" "}
//         <span onClick={() => navigate("/login")} style={{ color: "#4a90e2", cursor: "pointer" }}>
//           Login here
//         </span>
//       </p>

//       <style jsx>{`
//         .input-with-icon {
//           position: relative;
//           width: 100%;
//           margin-bottom: 15px;
//         }
        
//         .input-icon {
//           position: absolute;
//           left: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #666;
//           z-index: 1;
//         }
        
//         .input-with-icon input,
//         .input-with-icon select {
//           width: 100%;
//           padding: 12px 12px 12px 40px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           font-size: 16px;
//           box-sizing: border-box;
//         }
        
//         .input-with-icon input:focus,
//         .input-with-icon select:focus {
//           border-color: #4a90e2;
//           outline: none;
//           box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
//         }
        
//         .error {
//           border-color: #e74c3c !important;
//         }
        
//         .error-message {
//           color: #e74c3c;
//           font-size: 14px;
//           margin-top: -10px;
//           margin-bottom: 10px;
//           text-align: left;
//           width: 100%;
//         }
//       `}</style>
//     </AuthForm>
//   );
// };

// export default RegisterPage;




















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
