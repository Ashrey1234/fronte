









// import React, { useEffect, useState } from "react";
// import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
// import AppLayout from "../../components/layouts/AppLayout";
// import "./SubmitApplication.css";

// const API_BASE_URL = "http://127.0.0.1:8000";

// const SubmitApplication = ({ applicationId }) => {
//   const [application, setApplication] = useState(null);
//   const [attachments, setAttachments] = useState([]);
//   const [fileType, setFileType] = useState("Proposal");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // Refresh token function
//   const refreshToken = async () => {
//     const refresh = localStorage.getItem("refresh");
//     if (!refresh) {
//       window.location.href = "/login";
//       return null;
//     }
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ refresh }),
//       });
//       const data = await res.json();
//       if (data.access) {
//         localStorage.setItem("access", data.access);
//         return data.access;
//       } else {
//         throw new Error("Failed to refresh token");
//       }
//     } catch (err) {
//       console.error(err);
//       window.location.href = "/login";
//       return null;
//     }
//   };

//   // Fetch application + attachments
//   useEffect(() => {
//     const fetchApplication = async () => {
//       let token = localStorage.getItem("access");
//       try {
//         const res = await fetch(`${API_BASE_URL}/applications/${applicationId}/`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.status === 401) {
//           token = await refreshToken();
//           if (!token) return;
//           const retryRes = await fetch(`${API_BASE_URL}/applications/${applicationId}/`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           if (!retryRes.ok) throw new Error("Failed to fetch application after refresh");
//           const data = await retryRes.json();
//           setApplication(data);
//           setAttachments(data.attachments || []);
//           return;
//         }

//         if (!res.ok) throw new Error("Failed to fetch application");
//         const data = await res.json();
//         setApplication(data);
//         setAttachments(data.attachments || []);
//       } catch (err) {
//         console.error("Error fetching application", err);
//         setError("Failed to load application details");
//       }
//     };

//     fetchApplication();
//   }, [applicationId]);

//   // Handle file upload
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     if (!file) {
//       setError("Please choose a file.");
//       return;
//     }

//     let token = localStorage.getItem("access");

//     const uploadFile = async () => {
//       const formData = new FormData();
//       formData.append("application_id", applicationId); // matches backend
//       formData.append("file_type", fileType);
//       formData.append("file", file); // matches serializer

//       setLoading(true);
//       try {
//         const res = await fetch(`${API_BASE_URL}/attachments/upload/`, {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//           body: formData,
//         });

//         if (res.status === 401) {
//           token = await refreshToken();
//           if (!token) return;
//           const retryRes = await fetch(`${API_BASE_URL}/attachments/upload/`, {
//             method: "POST",
//             headers: { Authorization: `Bearer ${token}` },
//             body: formData,
//           });
//           if (!retryRes.ok) throw new Error("Upload failed after token refresh");
//           const data = await retryRes.json();
//           if (data && data.id) setAttachments((prev) => [...prev, data]);
//           setMessage("File uploaded successfully!");
//           setFile(null);
//           document.getElementById("file-input").value = "";
//           return;
//         }

//         if (!res.ok) throw new Error("Upload failed");
//         const data = await res.json();
//         if (data && data.id) {
//           setAttachments((prev) => [...prev, data]);
//           setMessage("File uploaded successfully!");
//           setFile(null);
//           document.getElementById("file-input").value = "";
//         } else {
//           setError("Upload succeeded but server did not return attachment ID.");
//         }
//       } catch (err) {
//         console.error("Upload error", err);
//         setError("File upload failed.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     uploadFile();
//   };

//   return (
//     <AppLayout>
//       <div className="app-attachments-container">
//         <h2>Application & Attachments</h2>

//         {error && (
//           <div className="error-message">
//             <FaExclamationTriangle className="icon" /> {error}
//           </div>
//         )}

//         {application ? (
//           <div className="application-info">
//             <h3>{application.title}</h3>
//             <p><b>Category:</b> {application.category}</p>
//             <p><b>Status:</b> {application.status}</p>
//             <p><b>Researcher:</b> {application.researcher}</p>
//           </div>
//         ) : (
//           <p>Loading application...</p>
//         )}

//         <div className="upload-section">
//           <h3>Upload Attachment</h3>
//           <form onSubmit={handleUpload}>
//             <div className="form-group">
//               <label htmlFor="file-type">File Type:</label>
//               <select
//                 id="file-type"
//                 value={fileType}
//                 onChange={(e) => setFileType(e.target.value)}
//               >
//                 <option value="Proposal">Proposal</option>
//                 <option value="Makamu Form">Makamu Form</option>
//                 <option value="Ethical Form">Ethical Form</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <input
//                 id="file-input"
//                 type="file"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//             </div>

//             <button type="submit" disabled={loading}>
//               {loading ? "Uploading..." : "Upload"}
//             </button>
//           </form>

//           {message && (
//             <div className="success-message">
//               <FaCheckCircle className="icon" /> {message}
//             </div>
//           )}
//         </div>

//         <div className="attachments-list">
//           <h3>Existing Attachments</h3>
//           {attachments.length > 0 ? (
//             <ul>
//               {attachments.map((att) => (
//                 <li key={att.id}>
//                   <b>{att.file_type}</b> -{" "}
//                   <a href={`${API_BASE_URL}${att.file_path}`} target="_blank" rel="noreferrer">
//                     View File
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No attachments uploaded yet.</p>
//           )}
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default SubmitApplication;
















import React, { useState, useEffect } from 'react';
import AppLayout from "../../components/layouts/AppLayout"; 
import './SubmitApplication.css';

const API_BASE_URL = 'http://localhost:8000/api';
const TOKEN = 'your-token-here'; // Replace with actual token or fetch from auth

const SubmitApplication = () => {
  const [applications, setApplications] = useState([]);
  const [userRole, setUserRole] = useState('Researcher'); // Replace with role fetch
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    start_date: '',
    end_date: '',
  });
  const [attachmentForm, setAttachmentForm] = useState({
    applicationId: '',
    file_type: 'Proposal',
    file: null,
  });
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  // Fetch applications on mount
  useEffect(() => {
    fetchApplications();
    // TODO: Fetch user role (e.g., via /api/user/role/)
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/`, {
        headers: { Authorization: `Token ${TOKEN}` },
      });
      if (!response.ok) throw new Error('Failed to fetch applications');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      setMessage(`Error fetching applications: ${error.message}`);
    }
  };

  // Handle application creation
  const handleCreateApplication = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/applications/`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create application');
      }
      setMessage('Application created successfully!');
      setFormData({ title: '', category: '', start_date: '', end_date: '' });
      fetchApplications();
    } catch (error) {
      setMessage(`Error creating application: ${error.message}`);
    }
  };

  // Handle attachment upload
  const handleUploadAttachment = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('application', attachmentForm.applicationId);
    formDataToSend.append('file_type', attachmentForm.file_type);
    formDataToSend.append('file_path', attachmentForm.file);

    try {
      const response = await fetch(`${API_BASE_URL}/attachments/`, {
        method: 'POST',
        headers: { Authorization: `Token ${TOKEN}` },
        body: formDataToSend,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload attachment');
      }
      setMessage('Attachment uploaded successfully!');
      setAttachmentForm({ applicationId: '', file_type: 'Proposal', file: null });
      fetchApplications();
    } catch (error) {
      setMessage(`Error uploading attachment: ${error.message}`);
    }
  };

  // Handle application submission
  const handleSubmitApplication = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${id}/submit/`, {
        method: 'POST',
        headers: { Authorization: `Token ${TOKEN}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }
      setMessage('Application submitted successfully!');
      fetchApplications();
    } catch (error) {
      setMessage(`Error submitting application: ${error.message}`);
    }
  };

  // Handle application approval
  const handleApproveApplication = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${id}/approve/`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to approve application');
      }
      setMessage('Application approved successfully!');
      setFeedback('');
      fetchApplications();
    } catch (error) {
      setMessage(`Error approving application: ${error.message}`);
    }
  };

  // Handle application rejection
  const handleRejectApplication = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${id}/reject/`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reject application');
      }
      setMessage('Application rejected successfully!');
      setFeedback('');
      fetchApplications();
    } catch (error) {
      setMessage(`Error rejecting application: ${error.message}`);
    }
  };

  // Handle attachment review
  const handleReviewAttachment = async (attachmentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/attachments/${attachmentId}/review/`, {
        method: 'POST',
        headers: { Authorization: `Token ${TOKEN}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to review attachment');
      }
      setMessage('Attachment reviewed successfully!');
      fetchApplications();
    } catch (error) {
      setMessage(`Error reviewing attachment: ${error.message}`);
    }
  };

  return (
    <AppLayout>
      <div className="submit-application-container">
        <h1>Submit Application</h1>
        {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}

        {/* Create Application Form */}
        <div className="section">
          <h2>Create Application</h2>
          <form onSubmit={handleCreateApplication}>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              required
            />
            <input
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              required
            />
            <button type="submit">Create Application</button>
          </form>
        </div>

        {/* Upload Attachment Form */}
        <div className="section">
          <h2>Upload Attachment</h2>
          <form onSubmit={handleUploadAttachment}>
            <select
              value={attachmentForm.applicationId}
              onChange={(e) => setAttachmentForm({ ...attachmentForm, applicationId: e.target.value })}
              required
            >
              <option value="">Select Application</option>
              {applications.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.title}
                </option>
              ))}
            </select>
            <select
              value={attachmentForm.file_type}
              onChange={(e) => setAttachmentForm({ ...attachmentForm, file_type: e.target.value })}
            >
              <option value="Proposal">Proposal</option>
              <option value="Makamu Form">Makamu Form</option>
              <option value="Ethical Form">Ethical Form</option>
            </select>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={(e) => setAttachmentForm({ ...attachmentForm, file: e.target.files[0] })}
              required
            />
            <button type="submit">Upload Attachment</button>
          </form>
        </div>

        {/* Application List */}
        <div className="section">
          <h2>Applications</h2>
          {applications.map((app) => (
            <div key={app.id} className="application">
              <h3>{app.title}</h3>
              <p>Category: {app.category}</p>
              <p>Status: {app.status}</p>
              <p>Start Date: {app.start_date}</p>
              <p>End Date: {app.end_date}</p>
              <p>Feedback: {app.officer_feedback || 'None'}</p>
              <p>Can Submit: {app.can_submit ? 'Yes' : 'No'}</p>
              {userRole === 'Officer' && <p>Can Approve: {app.can_officer_approve ? 'Yes' : 'No'}</p>}
              <div className="actions">
                {userRole === 'Researcher' && app.status === 'Draft' && app.can_submit && (
                  <button onClick={() => handleSubmitApplication(app.id)}>Submit</button>
                )}
                {userRole === 'Officer' && app.status === 'Pending' && app.can_officer_approve && (
                  <>
                    <input
                      type="text"
                      placeholder="Feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                    <button onClick={() => handleApproveApplication(app.id)}>Approve</button>
                    <button onClick={() => handleRejectApplication(app.id)}>Reject</button>
                  </>
                )}
              </div>
              <h4>Attachments</h4>
              {app.attachments.length > 0 ? (
                <ul>
                  {app.attachments.map((attachment) => (
                    <li key={attachment.id}>
                      {attachment.file_type} ({attachment.original_filename})
                      {userRole === 'Officer' &&
                        !attachment.reviewed_by_officer.some((u) => u.id === 1) && ( // Replace 1 with actual user ID
                          <button onClick={() => handleReviewAttachment(attachment.id)}>Review</button>
                        )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No attachments</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default SubmitApplication;