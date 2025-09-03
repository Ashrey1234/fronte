// // src/pages/researcher/Profile.jsx
// import React from "react";
// import AppLayout from "../../components/layouts/AppLayout";

// const Profile = () => {
//   return (
//     <AppLayout role="researcher">
//       <h2>Profile</h2>
//       <p>View and edit your personal information here.      </p>



      
//       {/* You can add profile form inputs here */}
//     </AppLayout>
//   );
// };

// export default Profile;







// src/pages/researcher/Profile.jsx
import React, { useState } from "react";
import AppLayout from "../../components/layouts/AppLayout";
import "./Profile.css";

const Profile = () => {
  // Sample user data - in a real app this would come from authentication context or API
  const [userData, setUserData] = useState({
    name: "Dr. Jane Smith",
    email: "jane.smith@research.edu",
    institution: "University of Research",
    department: "Computer Science",
    position: "Senior Research Fellow",
    contactNumber: "+1 (555) 123-4567",
    researchInterests: ["Artificial Intelligence", "Machine Learning", "Data Science"],
    bio: "Experienced researcher with over 10 years in AI and machine learning applications. Published more than 30 papers in top-tier conferences and journals.",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...userData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleResearchInterestsChange = (e) => {
    const interests = e.target.value.split(',').map(item => item.trim());
    setFormData({
      ...formData,
      researchInterests: interests,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({ ...formData });
    setEditMode(false);
    // In a real application, you would send this data to your backend API
  };

  const handleCancel = () => {
    setFormData({ ...userData });
    setEditMode(false);
  };

  return (
    <AppLayout role="researcher">
      <div className="profile-container">
        <div className="profile-header">
          <h2>Researcher Profile</h2>
          <p>Manage your personal and professional information</p>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-card-header">
              <h3>Personal Information</h3>
              {!editMode && (
                <button 
                  className="btn-edit"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>

            {editMode ? (
              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="institution">Institution</label>
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="researchInterests">Research Interests (comma separated)</label>
                  <input
                    type="text"
                    id="researchInterests"
                    name="researchInterests"
                    value={formData.researchInterests.join(', ')}
                    onChange={handleResearchInterestsChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-save">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">Full Name</span>
                    <span className="detail-value">{userData.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email Address</span>
                    <span className="detail-value">{userData.email}</span>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">Institution</span>
                    <span className="detail-value">{userData.institution}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Department</span>
                    <span className="detail-value">{userData.department}</span>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">Position</span>
                    <span className="detail-value">{userData.position}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Contact Number</span>
                    <span className="detail-value">{userData.contactNumber}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Research Interests</span>
                  <div className="interests-list">
                    {userData.researchInterests.map((interest, index) => (
                      <span key={index} className="interest-tag">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Bio</span>
                  <p className="bio-text">{userData.bio}</p>
                </div>
              </div>
            )}
          </div>

          <div className="profile-sidebar">
            <div className="sidebar-card">
              <h3>Account Settings</h3>
              <div className="sidebar-actions">
                <button className="sidebar-btn">Change Password</button>
                <button className="sidebar-btn">Notification Preferences</button>
                <button className="sidebar-btn">Privacy Settings</button>
              </div>
            </div>

            <div className="sidebar-card">
              <h3>Profile Completion</h3>
              <div className="completion-meter">
                <div className="meter-bar">
                  <div className="meter-fill" style={{ width: '85%' }}></div>
                </div>
                <span className="meter-text">85% Complete</span>
              </div>
              <p className="completion-tip">
                Add a profile picture and more details to complete your profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
