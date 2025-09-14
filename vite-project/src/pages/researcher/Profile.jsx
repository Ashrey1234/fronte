



// // src/pages/researcher/Profile.jsx
// import React, { useState } from "react";
// import AppLayout from "../../components/layouts/AppLayout";
// import "./Profile.css";

// const Profile = () => {
//   // Sample user data
//   const [userData, setUserData] = useState({
//     name: "Dr. Jane Smith",
//     email: "jane.smith@research.edu",
//     institution: "University of Research",
//     department: "Computer Science",
//     position: "Senior Research Fellow",
//     contactNumber: "+1 (555) 123-4567",
//     researchInterests: ["Artificial Intelligence", "Machine Learning", "Data Science"],
//     bio: "Experienced researcher with over 10 years in AI and machine learning applications. Published more than 30 papers in top-tier conferences and journals.",
//     gender: "Female", // New field added
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({ ...userData });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleResearchInterestsChange = (e) => {
//     const interests = e.target.value.split(',').map(item => item.trim());
//     setFormData({
//       ...formData,
//       researchInterests: interests,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setUserData({ ...formData });
//     setEditMode(false);
//     // Send to backend API if needed
//   };

//   const handleCancel = () => {
//     setFormData({ ...userData });
//     setEditMode(false);
//   };

//   return (
//     <AppLayout role="researcher">
//       <div className="profile-container">
//         <div className="profile-header">
//           <h2>Researcher Profile</h2>
//           <p>Manage your personal and professional information</p>
//         </div>

//         <div className="profile-content">
//           <div className="profile-card">
//             <div className="profile-card-header">
//               <h3>Personal Information</h3>
//               {!editMode && (
//                 <button 
//                   className="btn-edit"
//                   onClick={() => setEditMode(true)}
//                 >
//                   Edit Profile
//                 </button>
//               )}
//             </div>

//             {editMode ? (
//               <form className="profile-form" onSubmit={handleSubmit}>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label htmlFor="name">Full Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="email">Email Address</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label htmlFor="institution">Institution</label>
//                     <input
//                       type="text"
//                       id="institution"
//                       name="institution"
//                       value={formData.institution}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="department">Department</label>
//                     <input
//                       type="text"
//                       id="department"
//                       name="department"
//                       value={formData.department}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label htmlFor="position">Position</label>
//                     <input
//                       type="text"
//                       id="position"
//                       name="position"
//                       value={formData.position}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="contactNumber">Contact Number</label>
//                     <input
//                       type="text"
//                       id="contactNumber"
//                       name="contactNumber"
//                       value={formData.contactNumber}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label htmlFor="gender">Gender</label>
//                     <select
//                       id="gender"
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleInputChange}
//                     >
//                       <option value="Female">Female</option>
//                       <option value="Male">Male</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="researchInterests">Research Interests (comma separated)</label>
//                   <input
//                     type="text"
//                     id="researchInterests"
//                     name="researchInterests"
//                     value={formData.researchInterests.join(', ')}
//                     onChange={handleResearchInterestsChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="bio">Bio</label>
//                   <textarea
//                     id="bio"
//                     name="bio"
//                     rows="4"
//                     value={formData.bio}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="form-actions">
//                   <button type="button" className="btn-cancel" onClick={handleCancel}>
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn-save">
//                     Save Changes
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               <div className="profile-details">
//                 <div className="detail-row">
//                   <div className="detail-item">
//                     <span className="detail-label">Full Name</span>
//                     <span className="detail-value">{userData.name}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Email Address</span>
//                     <span className="detail-value">{userData.email}</span>
//                   </div>
//                 </div>

//                 <div className="detail-row">
//                   <div className="detail-item">
//                     <span className="detail-label">Institution</span>
//                     <span className="detail-value">{userData.institution}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Department</span>
//                     <span className="detail-value">{userData.department}</span>
//                   </div>
//                 </div>

//                 <div className="detail-row">
//                   <div className="detail-item">
//                     <span className="detail-label">Position</span>
//                     <span className="detail-value">{userData.position}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Contact Number</span>
//                     <span className="detail-value">{userData.contactNumber}</span>
//                   </div>
//                 </div>

//                 <div className="detail-item">
//                   <span className="detail-label">Gender</span>
//                   <span className="detail-value">{userData.gender}</span>
//                 </div>

//                 <div className="detail-item">
//                   <span className="detail-label">Research Interests</span>
//                   <div className="interests-list">
//                     {userData.researchInterests.map((interest, index) => (
//                       <span key={index} className="interest-tag">
//                         {interest}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="detail-item">
//                   <span className="detail-label">Bio</span>
//                   <p className="bio-text">{userData.bio}</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="profile-sidebar">
//             <div className="sidebar-card">
//               <h3>Account Settings</h3>
//               <div className="sidebar-actions">
//                 <button className="sidebar-btn">Change Password</button>
//                 <button className="sidebar-btn">Notification Preferences</button>
//                 <button className="sidebar-btn">Privacy Settings</button>
//               </div>
//             </div>

//             <div className="sidebar-card">
//               <h3>Profile Completion</h3>
//               <div className="completion-meter">
//                 <div className="meter-bar">
//                   <div className="meter-fill" style={{ width: '85%' }}></div>
//                 </div>
//                 <span className="meter-text">85% Complete</span>
//               </div>
//               <p className="completion-tip">
//                 Add a profile picture and more details to complete your profile.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default Profile;






























// // src/pages/researcher/Profile.jsx
// import React, { useState, useEffect } from "react";
// import AppLayout from "../../components/layouts/AppLayout";
// import "./Profile.css";

// const Profile = () => {
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     institution: "",
//     department: "",
//     position: "",
//     contactNumber: "",
//     researchInterests: [],
//     bio: "",
//     gender: "",
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({ ...userData });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");

//   // Fetch profile data from API using fetch
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('/api/researcher-profiles/me/');
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const profileData = await response.json();
        
//         // Transform API data to match our state structure
//         const newUserData = {
//           name: profileData.user?.name || "",
//           email: profileData.user?.email || "",
//           institution: profileData.institution || "",
//           department: profileData.department || "",
//           position: profileData.position || "",
//           contactNumber: profileData.contact_number || "",
//           researchInterests: Array.isArray(profileData.research_interests) 
//             ? profileData.research_interests 
//             : (profileData.research_interests || "").split(',').map(item => item.trim()).filter(item => item),
//           bio: profileData.bio || "",
//           gender: profileData.gender || "",
//         };
        
//         setUserData(newUserData);
//         setFormData(newUserData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching profile data:", err);
//         setError("Failed to load profile data");
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleResearchInterestsChange = (e) => {
//     const interests = e.target.value.split(',').map(item => item.trim()).filter(item => item);
//     setFormData({
//       ...formData,
//       researchInterests: interests,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
    
//     try {
//       // Prepare data for API (convert to snake_case if needed)
//       const apiData = {
//         institution: formData.institution,
//         department: formData.department,
//         position: formData.position,
//         contact_number: formData.contactNumber,
//         research_interests: formData.researchInterests.join(', '),
//         bio: formData.bio,
//         gender: formData.gender,
//         // Include user fields if your API supports updating them
//         user: {
//           name: formData.name,
//           email: formData.email,
//         }
//       };

//       const response = await fetch('/api/researcher-profiles/me/', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(apiData)
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       // Update local state with new data
//       setUserData({ ...formData });
//       setEditMode(false);
//       setSuccessMessage("Profile updated successfully!");
      
//       // Clear success message after 3 seconds
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setError("Failed to update profile. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setFormData({ ...userData });
//     setEditMode(false);
//     setError(null);
//   };

//   if (loading && !userData.name) {
//     return (
//       <AppLayout role="researcher">
//         <div className="profile-container">
//           <div className="loading">Loading profile data...</div>
//         </div>
//       </AppLayout>
//     );
//   }

//   return (
//     <AppLayout role="researcher">
//       <div className="profile-container">
//         <div className="profile-header">
//           <h2>Researcher Profile</h2>
//           <p>Manage your personal and professional information</p>
//         </div>

//         {/* Error and Success Messages */}
//         {error && <div className="alert alert-error">{error}</div>}
//         {successMessage && <div className="alert alert-success">{successMessage}</div>}

//         <div className="profile-content">
//           <div className="profile-card">
//             <div className="profile-card-header">
//               <h3>Personal Information</h3>
//               {!editMode && (
//                 <button 
//                   className="btn-edit"
//                   onClick={() => setEditMode(true)}
//                   disabled={loading}
//                 >
//                   {loading ? "Processing..." : "Edit Profile"}
//                 </button>
//               )}
//             </div>

//             {editMode ? (
//               <form className="profile-form" onSubmit={handleSubmit}>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label htmlFor="name">Full Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       disabled={loading}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="email">Email Address</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label htmlFor="institution">Institution</label>
//                     <input
//                       type="text"
//                       id="institution"
//                       name="institution"
//                       value={formData.institution}
//                       onChange={handleInputChange}
//                       disabled={loading}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="department">Department</label>
//                     <input
//                       type="text"
//                       id="department"
//                       name="department"
//                       value={formData.department}
//                       onChange={handleInputChange}
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label htmlFor="position">Position</label>
//                     <input
//                       type="text"
//                       id="position"
//                       name="position"
//                       value={formData.position}
//                       onChange={handleInputChange}
//                       disabled={loading}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="contactNumber">Contact Number</label>
//                     <input
//                       type="text"
//                       id="contactNumber"
//                       name="contactNumber"
//                       value={formData.contactNumber}
//                       onChange={handleInputChange}
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label htmlFor="gender">Gender</label>
//                     <select
//                       id="gender"
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleInputChange}
//                       disabled={loading}
//                     >
//                       <option value="">Select Gender</option>
//                       <option value="Female">Female</option>
//                       <option value="Male">Male</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="researchInterests">Research Interests (comma separated)</label>
//                   <input
//                     type="text"
//                     id="researchInterests"
//                     name="researchInterests"
//                     value={formData.researchInterests.join(', ')}
//                     onChange={handleResearchInterestsChange}
//                     disabled={loading}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="bio">Bio</label>
//                   <textarea
//                     id="bio"
//                     name="bio"
//                     rows="4"
//                     value={formData.bio}
//                     onChange={handleInputChange}
//                     disabled={loading}
//                   />
//                 </div>

//                 <div className="form-actions">
//                   <button 
//                     type="button" 
//                     className="btn-cancel" 
//                     onClick={handleCancel}
//                     disabled={loading}
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     type="submit" 
//                     className="btn-save"
//                     disabled={loading}
//                   >
//                     {loading ? "Saving..." : "Save Changes"}
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               <div className="profile-details">
//                 <div className="detail-row">
//                   <div className="detail-item">
//                     <span className="detail-label">Full Name</span>
//                     <span className="detail-value">{userData.name}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Email Address</span>
//                     <span className="detail-value">{userData.email}</span>
//                   </div>
//                 </div>

//                 <div className="detail-row">
//                   <div className="detail-item">
//                     <span className="detail-label">Institution</span>
//                     <span className="detail-value">{userData.institution}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Department</span>
//                     <span className="detail-value">{userData.department}</span>
//                   </div>
//                 </div>

//                 <div className="detail-row">
//                   <div className="detail-item">
//                     <span className="detail-label">Position</span>
//                     <span className="detail-value">{userData.position}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Contact Number</span>
//                     <span className="detail-value">{userData.contactNumber}</span>
//                   </div>
//                 </div>

//                 <div className="detail-item">
//                   <span className="detail-label">Gender</span>
//                   <span className="detail-value">{userData.gender}</span>
//                 </div>

//                 <div className="detail-item">
//                   <span className="detail-label">Research Interests</span>
//                   <div className="interests-list">
//                     {userData.researchInterests.map((interest, index) => (
//                       <span key={index} className="interest-tag">
//                         {interest}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="detail-item">
//                   <span className="detail-label">Bio</span>
//                   <p className="bio-text">{userData.bio}</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="profile-sidebar">
//             <div className="sidebar-card">
//               <h3>Account Settings</h3>
//               <div className="sidebar-actions">
//                 <button className="sidebar-btn">Change Password</button>
//                 <button className="sidebar-btn">Notification Preferences</button>
//                 <button className="sidebar-btn">Privacy Settings</button>
//               </div>
//             </div>

//             <div className="sidebar-card">
//               <h3>Profile Completion</h3>
//               <div className="completion-meter">
//                 <div className="meter-bar">
//                   <div className="meter-fill" style={{ width: '85%' }}></div>
//                 </div>
//                 <span className="meter-text">85% Complete</span>
//               </div>
//               <p className="completion-tip">
//                 Add a profile picture and more details to complete your profile.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default Profile;





















// // src/pages/researcher/ProfileDashboard.jsx
// import React, { useState, useEffect } from "react";
// import AppLayout from "../../components/layouts/AppLayout";
// import "./Profile.css";

// const ProfileDashboard = () => {
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     phoneNumber: "",
//     country: "",
//     type: "",
//     role: "",
//     researchType: "",
//     gender: "",
//     profileCompletion: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch profile data from API
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("access"); // JWT token
//         const response = await fetch("http://127.0.0.1:8000/api/profile/dashboard/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const profileData = await response.json();

//         setUserData({
//           username: profileData.username || "",
//           email: profileData.email || "",
//           phoneNumber: profileData.phone_number || "",
//           country: profileData.country || "",
//           type: profileData.type || "",
//           role: profileData.role || "",
//           researchType: profileData.research_type || "",
//           gender: profileData.gender || "",
//           profileCompletion: profileData.profile_completion || 0,
//         });

//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching profile data:", err);
//         setError("Failed to load profile data");
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   if (loading) {
//     return (
//       <AppLayout role="researcher">
//         <div className="profile-container">
//           <div className="loading">Loading profile data...</div>
//         </div>
//       </AppLayout>
//     );
//   }

//   if (error) {
//     return (
//       <AppLayout role="researcher">
//         <div className="profile-container">
//           <div className="alert alert-error">{error}</div>
//         </div>
//       </AppLayout>
//     );
//   }

//   return (
//     <AppLayout role="researcher">
//       <div className="profile-container">
//         <div className="profile-header">
//           <h2>My Profile</h2>
//           <p>Manage your personal and professional information</p>
//         </div>

//         <div className="profile-content">
//           <div className="profile-card">
//             <div className="profile-card-header">
//               <h3>Personal Information</h3>
//             </div>

//             <div className="profile-details">
//               <div className="detail-row">
//                 <div className="detail-item">
//                   <span className="detail-label">Username</span>
//                   <span className="detail-value">{userData.username}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Email</span>
//                   <span className="detail-value">{userData.email}</span>
//                 </div>
//               </div>

//               <div className="detail-row">
//                 <div className="detail-item">
//                   <span className="detail-label">Phone Number</span>
//                   <span className="detail-value">{userData.phoneNumber}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Country</span>
//                   <span className="detail-value">{userData.country}</span>
//                 </div>
//               </div>

//               <div className="detail-row">
//                 <div className="detail-item">
//                   <span className="detail-label">Type</span>
//                   <span className="detail-value">{userData.type}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Role</span>
//                   <span className="detail-value">{userData.role}</span>
//                 </div>
//               </div>

//               <div className="detail-row">
//                 <div className="detail-item">
//                   <span className="detail-label">Research Type</span>
//                   <span className="detail-value">{userData.researchType}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Gender</span>
//                   <span className="detail-value">{userData.gender}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="profile-sidebar">
//             <div className="sidebar-card">
//               <h3>Profile Completion</h3>
//               <div className="completion-meter">
//                 <div className="meter-bar">
//                   <div
//                     className="meter-fill"
//                     style={{ width: `${userData.profileCompletion}%` }}
//                   ></div>
//                 </div>
//                 <span className="meter-text">{userData.profileCompletion}% Complete</span>
//               </div>
//               <p className="completion-tip">
//                 Complete your profile to enhance your account visibility.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default ProfileDashboard;























// // src/pages/researcher/ProfileDashboard.jsx
// import React, { useState, useEffect } from "react";
// import AppLayout from "../../components/layouts/AppLayout";
// import "./Profile.css";

// const ProfileDashboard = () => {
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     phoneNumber: "",
//     country: "",
//     type: "",
//     role: "",
//     researchType: "",
//     gender: "",
//     profileCompletion: 0,
//   });

//   const [formData, setFormData] = useState({ ...userData });
//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch profile data
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("access"); // JWT token
//         const response = await fetch("http://127.0.0.1:8000/api/profile/dashboard/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!response.ok) throw new Error("Failed to fetch profile");

//         const profileData = await response.json();

//         const mappedData = {
//           username: profileData.username || "",
//           email: profileData.email || "",
//           phoneNumber: profileData.phone_number || "",
//           country: profileData.country || "",
//           type: profileData.type || "",
//           role: profileData.role || "",
//           researchType: profileData.research_type || "",
//           gender: profileData.gender || "",
//           profileCompletion: profileData.profile_completion || 0,
//         };

//         setUserData(mappedData);
//         setFormData(mappedData);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load profile data");
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const handleEdit = () => setEditMode(true);

//   const handleCancel = () => {
//     setFormData({ ...userData });
//     setEditMode(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("access");
//       const response = await fetch("http://127.0.0.1:8000/api/profile/dashboard/", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           username: formData.username,
//           email: formData.email,
//           phone_number: formData.phoneNumber,
//           country: formData.country,
//           type: formData.type,
//           role: formData.role,
//           research_type: formData.researchType,
//           gender: formData.gender,
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to update profile");

//       const updatedData = await response.json();
//       setUserData(updatedData);
//       setEditMode(false);

//       // Redirect to /register after save
//       window.location.href = "/register";
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <AppLayout role="researcher">
//         <div className="profile-container">
//           <div className="loading">Loading profile data...</div>
//         </div>
//       </AppLayout>
//     );
//   }

//   if (error) {
//     return (
//       <AppLayout role="researcher">
//         <div className="profile-container">
//           <div className="alert alert-error">{error}</div>
//         </div>
//       </AppLayout>
//     );
//   }

//   return (
//     <AppLayout role="researcher">
//       <div className="profile-container">
//         <div className="profile-header">
//           <h2>My Profile</h2>
//           <p>Manage your personal and professional information</p>
//         </div>

//         <div className="profile-content">
//           <div className="profile-card">
//             <div className="profile-card-header">
//               <h3>Personal Information</h3>
//               {!editMode && (
//                 <button className="btn-edit" onClick={handleEdit}>
//                   Edit Profile
//                 </button>
//               )}
//             </div>

//             {editMode ? (
//               <form className="profile-form" onSubmit={handleSubmit}>
//                 <div className="form-row">
//                   <label>Username</label>
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-row">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-row">
//                   <label>Phone Number</label>
//                   <input
//                     type="text"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-row">
//                   <label>Country</label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-row">
//                   <label>Type</label>
//                   <input
//                     type="text"
//                     name="type"
//                     value={formData.type}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-row">
//                   <label>Role</label>
//                   <input
//                     type="text"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-row">
//                   <label>Research Type</label>
//                   <input
//                     type="text"
//                     name="researchType"
//                     value={formData.researchType}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-row">
//                   <label>Gender</label>
//                   <input
//                     type="text"
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-actions">
//                   <button type="submit">Save Changes</button>
//                   <button type="button" onClick={handleCancel}>
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               <div className="profile-details">
//                 <p>Username: {userData.username}</p>
//                 <p>Email: {userData.email}</p>
//                 <p>Phone: {userData.phoneNumber}</p>
//                 <p>Country: {userData.country}</p>
//                 <p>Type: {userData.type}</p>
//                 <p>Role: {userData.role}</p>
//                 <p>Research Type: {userData.researchType}</p>
//                 <p>Gender: {userData.gender}</p>
//               </div>
//             )}
//           </div>

//           <div className="profile-sidebar">
//             <div className="sidebar-card">
//               <h3>Profile Completion</h3>
//               <div className="completion-meter">
//                 <div className="meter-bar">
//                   <div
//                     className="meter-fill"
//                     style={{ width: `${userData.profileCompletion}%` }}
//                   ></div>
//                 </div>
//                 <span className="meter-text">
//                   {userData.profileCompletion}% Complete
//                 </span>
//               </div>
//               <p className="completion-tip">
//                 Complete your profile to enhance your account visibility.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default ProfileDashboard;



































// // src/pages/researcher/ProfileDashboard.jsx
// import React, { useState, useEffect } from "react";
// import AppLayout from "../../components/layouts/AppLayout";
// import "./Profile.css";

// const ProfileDashboard = () => {
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     phoneNumber: "",
//     country: "",
//     type: "",
//     role: "",
//     researchType: "",
//     gender: "",
//     profileCompletion: 0,
//   });

//   const [formData, setFormData] = useState({ ...userData });
//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [saveStatus, setSaveStatus] = useState("");

//   // Fetch profile data
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("access");
//         const response = await fetch("http://127.0.0.1:8000/api/profile/dashboard/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!response.ok) throw new Error("Failed to fetch profile");

//         const profileData = await response.json();

//         const mappedData = {
//           username: profileData.username || "",
//           email: profileData.email || "",
//           phoneNumber: profileData.phone_number || "",
//           country: profileData.country || "",
//           type: profileData.type || "",
//           role: profileData.role || "",
//           researchType: profileData.research_type || "",
//           gender: profileData.gender || "",
//           profileCompletion: profileData.profile_completion || 0,
//         };

//         setUserData(mappedData);
//         setFormData(mappedData);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load profile data");
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const handleEdit = () => setEditMode(true);

//   const handleCancel = () => {
//     setFormData({ ...userData });
//     setEditMode(false);
//     setSaveStatus("");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Calculate completion percentage as user fills the form
//     calculateCompletion({ ...formData, [name]: value });
//   };

//   const calculateCompletion = (data) => {
//     let completedFields = 0;
//     const totalFields = 8; // username, email, phoneNumber, country, type, role, researchType, gender
    
//     if (data.username && data.username.trim() !== "") completedFields++;
//     if (data.email && data.email.trim() !== "") completedFields++;
//     if (data.phoneNumber && data.phoneNumber.trim() !== "") completedFields++;
//     if (data.country && data.country.trim() !== "") completedFields++;
//     if (data.type && data.type.trim() !== "") completedFields++;
//     if (data.role && data.role.trim() !== "") completedFields++;
//     if (data.researchType && data.researchType.trim() !== "") completedFields++;
//     if (data.gender && data.gender.trim() !== "") completedFields++;
    
//     const completionPercentage = Math.round((completedFields / totalFields) * 100);
//     setFormData(prev => ({ ...prev, profileCompletion: completionPercentage }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("access");
//       const response = await fetch("http://127.0.0.1:8000/api/profile/dashboard/", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           username: formData.username,
//           email: formData.email,
//           phone_number: formData.phoneNumber,
//           country: formData.country,
//           type: formData.type,
//           role: formData.role,
//           research_type: formData.researchType,
//           gender: formData.gender,
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to update profile");

//       const updatedData = await response.json();
//       setUserData({ ...formData, profileCompletion: updatedData.profile_completion || formData.profileCompletion });
//       setEditMode(false);
//       setSaveStatus("success");
      
//       // Clear success message after 3 seconds
//       setTimeout(() => setSaveStatus(""), 3000);
//     } catch (err) {
//       console.error(err);
//       setSaveStatus("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <AppLayout role="researcher">
//         <div className="profile-container">
//           <div className="loading">Loading profile data...</div>
//         </div>
//       </AppLayout>
//     );
//   }

//   if (error) {
//     return (
//       <AppLayout role="researcher">
//         <div className="profile-container">
//           <div className="alert-error">{error}</div>
//         </div>
//       </AppLayout>
//     );
//   }

//   return (
//     <AppLayout role="researcher">
//       <div className="profile-container">
//         <div className="profile-header">
//           <h2>My Profile</h2>
//           <p>Manage your personal and professional information</p>
//         </div>

//         {saveStatus === "success" && (
//           <div className="alert-success">
//             Profile updated successfully!
//           </div>
//         )}
        
//         {saveStatus === "error" && (
//           <div className="alert-error">
//             Failed to update profile. Please try again.
//           </div>
//         )}

//         <div className="profile-content">
//           <div className="profile-card">
//             <div className="profile-card-header">
//               <h3>Personal Information</h3>
//               {!editMode && (
//                 <button className="btn-edit" onClick={handleEdit}>
//                   Edit Profile
//                 </button>
//               )}
//             </div>

//             {editMode ? (
//               <form className="profile-form" onSubmit={handleSubmit}>
//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label>Username</label>
//                     <input
//                       type="text"
//                       name="username"
//                       value={formData.username}
//                       onChange={handleChange}
//                       placeholder="Enter your username"
//                     />
//                   </div>
                  
//                   <div className="form-group">
//                     <label>Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="Enter your email"
//                     />
//                   </div>
                  
//                   <div className="form-group">
//                     <label>Phone Number</label>
//                     <input
//                       type="text"
//                       name="phoneNumber"
//                       value={formData.phoneNumber}
//                       onChange={handleChange}
//                       placeholder="Enter your phone number"
//                     />
//                   </div>
                  
//                   <div className="form-group">
//                     <label>Country</label>
//                     <select
//                       name="country"
//                       value={formData.country}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select Country</option>
//                       <option value="Tanzania">Tanzania</option>
//                       <option value="Kenya">Kenya</option>
//                       <option value="Uganda">Uganda</option>
//                       <option value="Rwanda">Rwanda</option>
//                       <option value="Burundi">Burundi</option>
//                       <option value="South Africa">South Africa</option>
//                       <option value="Nigeria">Nigeria</option>
//                       <option value="Ghana">Ghana</option>
//                     </select>
//                   </div>
                  
//                   <div className="form-group">
//                     <label>Type</label>
//                     <select
//                       name="type"
//                       value={formData.type}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select Type</option>
//                       <option value="Student">Student</option>
//                       <option value="University">University</option>
//                       <option value="Institute">Institute</option>
//                       <option value="Independent">Independent</option>
//                     </select>
//                   </div>
                  
//                   <div className="form-group">
//                     <label>Role</label>
//                     <input
//                       type="text"
//                       name="role"
//                       value={formData.role}
//                       onChange={handleChange}
//                       placeholder="Enter your role"
//                     />
//                   </div>
                  
//                   <div className="form-group">
//                     <label>Research Type</label>
//                     <input
//                       type="text"
//                       name="researchType"
//                       value={formData.researchType}
//                       onChange={handleChange}
//                       placeholder="Enter your research type"
//                     />
//                   </div>
                  
//                   <div className="form-group">
//                     <label>Gender</label>
//                     <select
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select Gender</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>
                
//                 <div className="form-actions">
//                   <button type="submit" className="btn-save">
//                     Save Changes
//                   </button>
//                   <button type="button" className="btn-cancel" onClick={handleCancel}>
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               <div className="profile-details">
//                 <div className="detail-row">
//                   <span className="detail-label">Username:</span>
//                   <span className="detail-value">{userData.username || "Not provided"}</span>
//                 </div>
//                 <div className="detail-row">
//                   <span className="detail-label">Email:</span>
//                   <span className="detail-value">{userData.email || "Not provided"}</span>
//                 </div>
//                 <div className="detail-row">
//                   <span className="detail-label">Phone:</span>
//                   <span className="detail-value">{userData.phoneNumber || "Not provided"}</span>
//                 </div>
//                 <div className="detail-row">
//                   <span className="detail-label">Country:</span>
//                   <span className="detail-value">{userData.country || "Not provided"}</span>
//                 </div>
//                 <div className="detail-row">
//                   <span className="detail-label">Type:</span>
//                   <span className="detail-value">{userData.type || "Not provided"}</span>
//                 </div>
//                 <div className="detail-row">
//                   <span className="detail-label">Role:</span>
//                   <span className="detail-value">{userData.role || "Not provided"}</span>
//                 </div>
//                 <div className="detail-row">
//                   <span className="detail-label">Research Type:</span>
//                   <span className="detail-value">{userData.researchType || "Not provided"}</span>
//                 </div>
//                 <div className="detail-row">
//                   <span className="detail-label">Gender:</span>
//                   <span className="detail-value">{userData.gender || "Not provided"}</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="profile-sidebar">
//             <div className="sidebar-card">
//               <h3>Profile Completion</h3>
//               <div className="completion-meter">
//                 <div className="meter-bar">
//                   <div
//                     className="meter-fill"
//                     style={{ width: `${editMode ? formData.profileCompletion : userData.profileCompletion}%` }}
//                   ></div>
//                 </div>
//                 <span className="meter-text">
//                   {editMode ? formData.profileCompletion : userData.profileCompletion}% Complete
//                 </span>
//               </div>
//               <p className="completion-tip">
//                 {editMode ? (
//                   `Keep filling the form! ${100 - formData.profileCompletion}% remaining.`
//                 ) : (
//                   "Complete your profile to enhance your account visibility."
//                 )}
//               </p>
//             </div>
            
//             {editMode && (
//               <div className="sidebar-card">
//                 <h3>Editing Tips</h3>
//                 <ul className="tips-list">
//                   <li>Fill all fields to reach 100% completion</li>
//                   <li>Use accurate information for better visibility</li>
//                   <li>Click Save to apply changes or Cancel to discard</li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default ProfileDashboard;










































// // src/pages/researcher/ProfileDashboard.jsx
// import React, { useState, useEffect } from "react";
// import AppLayout from "../../components/layouts/AppLayout";
// import "./Profile.css";

// const ProfileDashboard = () => {
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     phoneNumber: "",
//     country: "",
//     type: "",
//     role: "",
//     researchType: "",
//     gender: "",
//     profileCompletion: 0,
//   });

//   const [formData, setFormData] = useState({ ...userData });
//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [saveStatus, setSaveStatus] = useState("");

//   const researchTypes = [
//     "Environment & Marine",
//     "Aquatic Organisms",
//     "Fisheries Research",
//     "Other"
//   ];

//   const countries = ["Tanzania","Kenya","Uganda","Rwanda","Burundi","South Africa","Nigeria","Ghana"];

//   const types = ["Student","University","Institute","Independent"];

//   const genders = ["Male","Female","Other"];

//   // Fetch profile data
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("access");
//         const response = await fetch("http://127.0.0.1:8000/api/profile/dashboard/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!response.ok) throw new Error("Failed to fetch profile");

//         const profileData = await response.json();

//         const mappedData = {
//           username: profileData.username || "",
//           email: profileData.email || "",
//           phoneNumber: profileData.phone_number || "",
//           country: profileData.country || "",
//           type: profileData.type || "",
//           role: profileData.role || "",
//           researchType: profileData.research_type || "",
//           gender: profileData.gender || "",
//           profileCompletion: profileData.profile_completion || 0,
//         };

//         setUserData(mappedData);
//         setFormData(mappedData);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load profile data");
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const handleEdit = () => setEditMode(true);
//   const handleCancel = () => {
//     setFormData({ ...userData });
//     setEditMode(false);
//     setSaveStatus("");
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     calculateCompletion({ ...formData, [name]: value });
//   };

//   const calculateCompletion = (data) => {
//     let completedFields = 0;
//     const totalFields = 8; 
//     ["username","email","phoneNumber","country","type","role","researchType","gender"].forEach(f => {
//       if (data[f] && data[f].trim() !== "") completedFields++;
//     });
//     const completionPercentage = Math.round((completedFields / totalFields) * 100);
//     setFormData(prev => ({ ...prev, profileCompletion: completionPercentage }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("access");
//       const response = await fetch("http://127.0.0.1:8000/api/profile/dashboard/", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           username: formData.username,
//           email: formData.email,
//           phone_number: formData.phoneNumber,
//           country: formData.country,
//           type: formData.type,
//           role: formData.role,
//           research_type: formData.researchType,
//           gender: formData.gender,
//         }),
//       });

//       const updatedData = await response.json();

//       if (!response.ok) throw new Error("Update failed");

//       setUserData(updatedData);
//       setFormData(updatedData);
//       setEditMode(false);
//       setSaveStatus("success");
//       setTimeout(() => setSaveStatus(""), 3000);
//     } catch (err) {
//       console.error(err);
//       setSaveStatus("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <AppLayout role="researcher">
//         <div className="profile-container">
//           <div className="loading">Loading profile data...</div>
//         </div>
//       </AppLayout>
//     );
//   }

//   if (error) {
//     return (
//       <AppLayout role="researcher">
//         <div className="profile-container">
//           <div className="alert-error">{error}</div>
//         </div>
//       </AppLayout>
//     );
//   }

//   return (
//     <AppLayout role="researcher">
//       <div className="profile-container">
//         <div className="profile-header">
//           <h2>My Profile</h2>
//           <p>Manage your personal and professional information</p>
//         </div>

//         {saveStatus === "success" && <div className="alert-success">Profile updated successfully!</div>}
//         {saveStatus === "error" && <div className="alert-error">Failed to update profile.</div>}

//         <div className="profile-content">
//           <div className="profile-card">
//             <div className="profile-card-header">
//               <h3>Personal Information</h3>
//               {!editMode && <button className="btn-edit" onClick={handleEdit}>Edit Profile</button>}
//             </div>

//             {editMode ? (
//               <form className="profile-form" onSubmit={handleSubmit}>
//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label>Username</label>
//                     <input type="text" name="username" value={formData.username} onChange={handleChange}/>
//                   </div>
//                   <div className="form-group">
//                     <label>Email</label>
//                     <input type="email" name="email" value={formData.email} onChange={handleChange}/>
//                   </div>
//                   <div className="form-group">
//                     <label>Phone Number</label>
//                     <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
//                   </div>
//                   <div className="form-group">
//                     <label>Country</label>
//                     <select name="country" value={formData.country} onChange={handleChange}>
//                       <option value="">Select Country</option>
//                       {countries.map(c => <option key={c} value={c}>{c}</option>)}
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Type</label>
//                     <select name="type" value={formData.type} onChange={handleChange}>
//                       <option value="">Select Type</option>
//                       {types.map(t => <option key={t} value={t}>{t}</option>)}
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Role</label>
//                     <input type="text" name="role" value={formData.role} onChange={handleChange}/>
//                   </div>
//                   <div className="form-group">
//                     <label>Research Type</label>
//                     <select name="researchType" value={formData.researchType} onChange={handleChange}>
//                       <option value="">Select Research Type</option>
//                       {researchTypes.map(r => <option key={r} value={r}>{r}</option>)}
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Gender</label>
//                     <select name="gender" value={formData.gender} onChange={handleChange}>
//                       <option value="">Select Gender</option>
//                       {genders.map(g => <option key={g} value={g}>{g}</option>)}
//                     </select>
//                   </div>
//                 </div>
//                 <div className="form-actions">
//                   <button type="submit" className="btn-save">Save Changes</button>
//                   <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
//                 </div>
//               </form>
//             ) : (
//               <div className="profile-details">
//                 {Object.entries(userData).map(([key, value]) => (
//                   key !== "profileCompletion" && 
//                   <div className="detail-row" key={key}>
//                     <span className="detail-label">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g," $1")}:</span>
//                     <span className="detail-value">{value || "Not provided"}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="profile-sidebar">
//             <div className="sidebar-card">
//               <h3>Profile Completion</h3>
//               <div className="completion-meter">
//                 <div className="meter-bar">
//                   <div className="meter-fill" style={{ width: `${editMode ? formData.profileCompletion : userData.profileCompletion}%` }}></div>
//                 </div>
//                 <span className="meter-text">{editMode ? formData.profileCompletion : userData.profileCompletion}% Complete</span>
//               </div>
//               <p className="completion-tip">
//                 {editMode ? `Keep filling the form! ${100 - formData.profileCompletion}% remaining.` : "Complete your profile to enhance your account visibility."}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default ProfileDashboard;























// src/pages/researcher/ProfileDashboard.jsx
import React, { useState, useEffect } from "react";
import AppLayout from "../../components/layouts/AppLayout";
import "./Profile.css";

const ProfileDashboard = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    country: "",
    type: "",
    role: "",
    researchType: "",
    gender: "",
    profileCompletion: 0,
  });

  const [formData, setFormData] = useState({ ...userData });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState("");

  const researchTypes = [
    "Environment & Marine",
    "Aquatic Organisms",
    "Fisheries Research",
    "Other"
  ];

  const countries = ["Tanzania","Kenya","Uganda","Rwanda","Burundi","South Africa","Nigeria","Ghana"];
  const types = ["Student","University","Institute","Independent"];
  const genders = ["Male","Female","Other"];

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access");
        const response = await fetch("http://127.0.0.1:8000/api/profile/dashboard/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const profileData = await response.json();

        const mappedData = {
          username: profileData.username || "",
          email: profileData.email || "",
          phoneNumber: profileData.phone_number || "",
          country: profileData.country || "",
          type: profileData.type || "",
          role: profileData.role || "",
          researchType: profileData.research_type || "",
          gender: profileData.gender || "",
          profileCompletion: profileData.profile_completion || 0,
        };

        setUserData(mappedData);
        setFormData(mappedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile data");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setFormData({ ...userData });
    setEditMode(false);
    setSaveStatus("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    calculateCompletion(updatedForm);
  };

  const calculateCompletion = (data) => {
    const fields = ["username","email","phoneNumber","country","type","role","researchType","gender"];
    let completed = fields.filter(f => data[f] && data[f].toString().trim() !== "").length;
    const completion = Math.round((completed / fields.length) * 100);
    setFormData(prev => ({ ...prev, profileCompletion: completion }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("access");
      const response = await fetch("http://127.0.0.1:8000/api/profile/dashboard/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone_number: formData.phoneNumber,
          country: formData.country,
          type: formData.type,
          role: formData.role,
          research_type: formData.researchType,
          gender: formData.gender,
        }),
      });

      const updatedData = await response.json();
      if (!response.ok) throw new Error("Update failed");

      // Map backend fields to frontend
      const mappedData = {
        username: updatedData.username || "",
        email: updatedData.email || "",
        phoneNumber: updatedData.phone_number || "",
        country: updatedData.country || "",
        type: updatedData.type || "",
        role: updatedData.role || "",
        researchType: updatedData.research_type || "",
        gender: updatedData.gender || "",
        profileCompletion: updatedData.profile_completion || formData.profileCompletion,
      };

      setUserData(mappedData);
      setFormData(mappedData);
      setEditMode(false);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AppLayout role="researcher">
        <div className="profile-container">
          <div className="loading">Loading profile data...</div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout role="researcher">
        <div className="profile-container">
          <div className="alert-error">{error}</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout role="researcher">
      <div className="profile-container">
        <div className="profile-header">
          <h2>My Profile</h2>
          <p>Manage your personal and professional information</p>
        </div>

        {saveStatus === "success" && <div className="alert-success">Profile updated successfully!</div>}
        {saveStatus === "error" && <div className="alert-error">Failed to update profile.</div>}

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-card-header">
              <h3>Personal Information</h3>
              {!editMode && <button className="btn-edit" onClick={handleEdit}>Edit Profile</button>}
            </div>

            {editMode ? (
              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange}/>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <select name="country" value={formData.country} onChange={handleChange}>
                      <option value="">Select Country</option>
                      {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                      <option value="">Select Type</option>
                      {types.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input type="text" name="role" value={formData.role} onChange={handleChange}/>
                  </div>
                  <div className="form-group">
                    <label>Research Type</label>
                    <select name="researchType" value={formData.researchType} onChange={handleChange}>
                      <option value="">Select Research Type</option>
                      {researchTypes.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="">Select Gender</option>
                      {genders.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-save">Save Changes</button>
                  <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            ) : (
              <div className="profile-details">
                {Object.entries(userData).map(([key, value]) => (
                  key !== "profileCompletion" && 
                  <div className="detail-row" key={key}>
                    <span className="detail-label">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g," $1")}:</span>
                    <span className="detail-value">{value || "Not provided"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="profile-sidebar">
            <div className="sidebar-card">
              <h3>Profile Completion</h3>
              <div className="completion-meter">
                <div className="meter-bar">
                  <div className="meter-fill" style={{ width: `${formData.profileCompletion}%` }}></div>
                </div>
                <span className="meter-text">{formData.profileCompletion}% Complete</span>
              </div>
              <p className="completion-tip">
                {editMode ? `Keep filling the form! ${100 - formData.profileCompletion}% remaining.` : "Complete your profile to enhance your account visibility."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfileDashboard;
