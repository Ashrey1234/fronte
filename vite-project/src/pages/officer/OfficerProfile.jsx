// import React from "react";
// import AppLayout from "../../components/layouts/AppLayout";

// const OfficerProfile = () => {
//   return (
//     <AppLayout>
//       <h1>Officer Profile</h1>
//       <p>Manage your officer account details here.</p>
//     </AppLayout>
//   );
// };

// export default OfficerProfile;




















// src/pages/officer/OfficerProfile.jsx
import React, { useState, useEffect } from "react";
import AppLayout from "../../components/layouts/AppLayout";
import "./OfficerDashboard.css";

const OfficerProfile = () => {
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
  const [saveStatus, setSaveStatus] = useState("");

  const countries = ["Tanzania","Kenya","Uganda","Rwanda","Burundi","South Africa","Nigeria","Ghana"];
  const types = ["Officer","Admin","Supervisor"];
  const genders = ["Male","Female","Other"];
  const researchTypes = [
    "Environment & Marine",
    "Aquatic Organisms",
    "Fisheries Research",
    "Other"
  ];

  // Fetch profile data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access");
        const response = await fetch("http://127.0.0.1:8000/api/profile/dashboard/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch profile data");

        const data = await response.json();

        const mappedData = {
          username: data.username || "",
          email: data.email || "",
          phoneNumber: data.phone_number || "",
          country: data.country || "",
          type: data.type || "",
          role: data.role || "",
          researchType: data.research_type || "",
          gender: data.gender || "",
          profileCompletion: data.profile_completion || 0,
        };

        setUserData(mappedData);
        setFormData(mappedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setFormData({ ...userData });
    setEditMode(false);
    setSaveStatus("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    calculateCompletion(updated);
  };

  const calculateCompletion = (data) => {
    const fields = ["username","email","phoneNumber","country","type","role","researchType","gender"];
    const completed = fields.filter(f => data[f] && data[f].toString().trim() !== "").length;
    const completion = Math.round((completed / fields.length) * 100);
    setFormData(prev => ({ ...prev, profileCompletion: completion }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
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

      if (!response.ok) throw new Error("Update failed");

      const updatedData = await response.json();

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

  if (loading) return <AppLayout><div className="profile-container">Loading...</div></AppLayout>;

  return (
    <AppLayout>
      <div className="profile-container">
        <div className="profile-header">
          <h2>Officer Profile</h2>
          <p>Manage your officer account details here.</p>
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

export default OfficerProfile;
