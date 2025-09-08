









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
















// import React, { useState, useEffect } from 'react';
// import AppLayout from "../../components/layouts/AppLayout"; 
// import './SubmitApplication.css';

// const API_BASE_URL = 'http://localhost:8000/api';
// const TOKEN = 'your-token-here'; // Replace with actual token or fetch from auth

// const SubmitApplication = () => {
//   const [applications, setApplications] = useState([]);
//   const [userRole, setUserRole] = useState('Researcher'); // Replace with role fetch
//   const [formData, setFormData] = useState({
//     title: '',
//     category: '',
//     start_date: '',
//     end_date: '',
//   });
//   const [attachmentForm, setAttachmentForm] = useState({
//     applicationId: '',
//     file_type: 'Proposal',
//     file: null,
//   });
//   const [feedback, setFeedback] = useState('');
//   const [message, setMessage] = useState('');

//   // Fetch applications on mount
//   useEffect(() => {
//     fetchApplications();
//     // TODO: Fetch user role (e.g., via /api/user/role/)
//   }, []);

//   const fetchApplications = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/applications/`, {
//         headers: { Authorization: `Token ${TOKEN}` },
//       });
//       if (!response.ok) throw new Error('Failed to fetch applications');
//       const data = await response.json();
//       setApplications(data);
//     } catch (error) {
//       setMessage(`Error fetching applications: ${error.message}`);
//     }
//   };

//   // Handle application creation
//   const handleCreateApplication = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${API_BASE_URL}/applications/`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Token ${TOKEN}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to create application');
//       }
//       setMessage('Application created successfully!');
//       setFormData({ title: '', category: '', start_date: '', end_date: '' });
//       fetchApplications();
//     } catch (error) {
//       setMessage(`Error creating application: ${error.message}`);
//     }
//   };

//   // Handle attachment upload
//   const handleUploadAttachment = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     formDataToSend.append('application', attachmentForm.applicationId);
//     formDataToSend.append('file_type', attachmentForm.file_type);
//     formDataToSend.append('file_path', attachmentForm.file);

//     try {
//       const response = await fetch(`${API_BASE_URL}/attachments/`, {
//         method: 'POST',
//         headers: { Authorization: `Token ${TOKEN}` },
//         body: formDataToSend,
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to upload attachment');
//       }
//       setMessage('Attachment uploaded successfully!');
//       setAttachmentForm({ applicationId: '', file_type: 'Proposal', file: null });
//       fetchApplications();
//     } catch (error) {
//       setMessage(`Error uploading attachment: ${error.message}`);
//     }
//   };

//   // Handle application submission
//   const handleSubmitApplication = async (id) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/applications/${id}/submit/`, {
//         method: 'POST',
//         headers: { Authorization: `Token ${TOKEN}` },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to submit application');
//       }
//       setMessage('Application submitted successfully!');
//       fetchApplications();
//     } catch (error) {
//       setMessage(`Error submitting application: ${error.message}`);
//     }
//   };

//   // Handle application approval
//   const handleApproveApplication = async (id) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/applications/${id}/approve/`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Token ${TOKEN}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ feedback }),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to approve application');
//       }
//       setMessage('Application approved successfully!');
//       setFeedback('');
//       fetchApplications();
//     } catch (error) {
//       setMessage(`Error approving application: ${error.message}`);
//     }
//   };

//   // Handle application rejection
//   const handleRejectApplication = async (id) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/applications/${id}/reject/`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Token ${TOKEN}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ feedback }),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to reject application');
//       }
//       setMessage('Application rejected successfully!');
//       setFeedback('');
//       fetchApplications();
//     } catch (error) {
//       setMessage(`Error rejecting application: ${error.message}`);
//     }
//   };

//   // Handle attachment review
//   const handleReviewAttachment = async (attachmentId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/attachments/${attachmentId}/review/`, {
//         method: 'POST',
//         headers: { Authorization: `Token ${TOKEN}` },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to review attachment');
//       }
//       setMessage('Attachment reviewed successfully!');
//       fetchApplications();
//     } catch (error) {
//       setMessage(`Error reviewing attachment: ${error.message}`);
//     }
//   };

//   return (
//     <AppLayout>
//       <div className="submit-application-container">
//         <h1>Submit Application</h1>
//         {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}

//         {/* Create Application Form */}
//         <div className="section">
//           <h2>Create Application</h2>
//           <form onSubmit={handleCreateApplication}>
//             <input
//               type="text"
//               placeholder="Title"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               required
//             />
//             <input
//               type="text"
//               placeholder="Category"
//               value={formData.category}
//               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//               required
//             />
//             <input
//               type="date"
//               value={formData.start_date}
//               onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
//               required
//             />
//             <input
//               type="date"
//               value={formData.end_date}
//               onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
//               required
//             />
//             <button type="submit">Create Application</button>
//           </form>
//         </div>

//         {/* Upload Attachment Form */}
//         <div className="section">
//           <h2>Upload Attachment</h2>
//           <form onSubmit={handleUploadAttachment}>
//             <select
//               value={attachmentForm.applicationId}
//               onChange={(e) => setAttachmentForm({ ...attachmentForm, applicationId: e.target.value })}
//               required
//             >
//               <option value="">Select Application</option>
//               {applications.map((app) => (
//                 <option key={app.id} value={app.id}>
//                   {app.title}
//                 </option>
//               ))}
//             </select>
//             <select
//               value={attachmentForm.file_type}
//               onChange={(e) => setAttachmentForm({ ...attachmentForm, file_type: e.target.value })}
//             >
//               <option value="Proposal">Proposal</option>
//               <option value="Makamu Form">Makamu Form</option>
//               <option value="Ethical Form">Ethical Form</option>
//             </select>
//             <input
//               type="file"
//               accept=".pdf,.docx"
//               onChange={(e) => setAttachmentForm({ ...attachmentForm, file: e.target.files[0] })}
//               required
//             />
//             <button type="submit">Upload Attachment</button>
//           </form>
//         </div>

//         {/* Application List */}
//         <div className="section">
//           <h2>Applications</h2>
//           {applications.map((app) => (
//             <div key={app.id} className="application">
//               <h3>{app.title}</h3>
//               <p>Category: {app.category}</p>
//               <p>Status: {app.status}</p>
//               <p>Start Date: {app.start_date}</p>
//               <p>End Date: {app.end_date}</p>
//               <p>Feedback: {app.officer_feedback || 'None'}</p>
//               <p>Can Submit: {app.can_submit ? 'Yes' : 'No'}</p>
//               {userRole === 'Officer' && <p>Can Approve: {app.can_officer_approve ? 'Yes' : 'No'}</p>}
//               <div className="actions">
//                 {userRole === 'Researcher' && app.status === 'Draft' && app.can_submit && (
//                   <button onClick={() => handleSubmitApplication(app.id)}>Submit</button>
//                 )}
//                 {userRole === 'Officer' && app.status === 'Pending' && app.can_officer_approve && (
//                   <>
//                     <input
//                       type="text"
//                       placeholder="Feedback"
//                       value={feedback}
//                       onChange={(e) => setFeedback(e.target.value)}
//                     />
//                     <button onClick={() => handleApproveApplication(app.id)}>Approve</button>
//                     <button onClick={() => handleRejectApplication(app.id)}>Reject</button>
//                   </>
//                 )}
//               </div>
//               <h4>Attachments</h4>
//               {app.attachments.length > 0 ? (
//                 <ul>
//                   {app.attachments.map((attachment) => (
//                     <li key={attachment.id}>
//                       {attachment.file_type} ({attachment.original_filename})
//                       {userRole === 'Officer' &&
//                         !attachment.reviewed_by_officer.some((u) => u.id === 1) && ( // Replace 1 with actual user ID
//                           <button onClick={() => handleReviewAttachment(attachment.id)}>Review</button>
//                         )}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No attachments</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default SubmitApplication;
























// import React, { useState, useEffect } from 'react';
// import AppLayout from "../../components/layouts/AppLayout";
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   Grid,
//   Box,
//   Alert,
//   Snackbar,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   IconButton,
//   Divider,
//   CircularProgress,
//   Card,
//   CardContent,
//   CardActions,
//   Stepper,
//   Step,
//   StepLabel
// } from '@mui/material';
// import {
//   AttachFile as AttachFileIcon,
//   Delete as DeleteIcon,
//   CloudUpload as CloudUploadIcon,
//   Save as SaveIcon,
//   Send as SendIcon,
//   Description as DescriptionIcon
// } from '@mui/icons-material';
// import './SubmitApplication.css';

// const API_BASE_URL = 'http://127.0.0.1:8000';

// const SubmitApplication = () => {
//   // State for application form
//   const [application, setApplication] = useState({
//     title: '',
//     research_type: 'Environment & Marine',
//     year: new Date().getFullYear(),
//     description: '',
//     objectives: '',
//     methodology: '',
//     expected_outcomes: ''
//   });

//   // State for attachments
//   const [attachments, setAttachments] = useState([]);
//   const [newAttachment, setNewAttachment] = useState({
//     file_type: 'Makamu Form',
//     file: null
//   });

//   // UI state
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState({ text: '', severity: 'info' });
//   const [applicationId, setApplicationId] = useState(null);
//   const [activeStep, setActiveStep] = useState(0);

//   // Fetch application if editing
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const id = urlParams.get('id');
    
//     if (id) {
//       setLoading(true);
//       fetch(`${API_BASE_URL}/api/applications/${id}/`, {
//         headers: { 
//           'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//           'Content-Type': 'application/json'
//         }
//       })
//       .then(response => {
//         if (!response.ok) throw new Error('Failed to fetch application');
//         return response.json();
//       })
//       .then(data => {
//         setApplication(data);
//         setApplicationId(id);
//         return fetch(`${API_BASE_URL}/api/applications/${id}/attachments/`, {
//           headers: { 
//             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//             'Content-Type': 'application/json'
//           }
//         });
//       })
//       .then(response => {
//         if (!response.ok) throw new Error('Failed to fetch attachments');
//         return response.json();
//       })
//       .then(data => {
//         setAttachments(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setMessage({ text: 'Failed to load application data', severity: 'error' });
//         setLoading(false);
//       });
//     }
//   }, []);

//   // Handle application form changes
//   const handleApplicationChange = (e) => {
//     const { name, value } = e.target;
//     setApplication(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle attachment file selection
//   const handleFileChange = (e) => {
//     setNewAttachment(prev => ({
//       ...prev,
//       file: e.target.files[0]
//     }));
//   };

//   // Handle attachment type change
//   const handleAttachmentTypeChange = (e) => {
//     setNewAttachment(prev => ({
//       ...prev,
//       file_type: e.target.value
//     }));
//   };

//   // Save application as draft
//   const saveDraft = () => {
//     setSaving(true);
//     const url = applicationId 
//       ? `${API_BASE_URL}/api/applications/${applicationId}/` 
//       : `${API_BASE_URL}/api/applications/`;
//     const method = applicationId ? 'PUT' : 'POST';
    
//     fetch(url, {
//       method: method,
//       headers: { 
//         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(application)
//     })
//     .then(response => {
//       if (!response.ok) throw new Error('Failed to save application');
//       return response.json();
//     })
//     .then(data => {
//       setApplicationId(data.id);
//       setMessage({ text: 'Draft saved successfully', severity: 'success' });
//       setSaving(false);
//       setActiveStep(1); // Move to attachments step
//     })
//     .catch(error => {
//       console.error('Error saving draft:', error);
//       setMessage({ text: 'Failed to save draft', severity: 'error' });
//       setSaving(false);
//     });
//   };

//   // Upload attachment
//   const uploadAttachment = () => {
//     if (!applicationId) {
//       setMessage({ 
//         text: 'Please save the application first before uploading attachments', 
//         severity: 'warning' 
//       });
//       return;
//     }

//     if (!newAttachment.file) {
//       setMessage({ 
//         text: 'Please select a file to upload', 
//         severity: 'warning' 
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file_type', newAttachment.file_type);
//     formData.append('file_path', newAttachment.file);

//     fetch(`${API_BASE_URL}/api/applications/${applicationId}/attachments/`, {
//       method: 'POST',
//       headers: { 
//         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//       },
//       body: formData
//     })
//     .then(response => {
//       if (!response.ok) throw new Error('Failed to upload attachment');
//       return response.json();
//     })
//     .then(data => {
//       setAttachments(prev => [...prev, data]);
//       setNewAttachment({ file_type: 'Makamu Form', file: null });
//       setMessage({ text: 'File uploaded successfully', severity: 'success' });
      
//       // Clear file input
//       document.getElementById('file-input').value = '';
//     })
//     .catch(error => {
//       console.error('Error uploading attachment:', error);
//       setMessage({ text: 'Failed to upload file', severity: 'error' });
//     });
//   };

//   // Delete attachment
//   const deleteAttachment = (attachmentId) => {
//     fetch(`${API_BASE_URL}/api/applications/${applicationId}/attachments/${attachmentId}/`, {
//       method: 'DELETE',
//       headers: { 
//         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//       }
//     })
//     .then(response => {
//       if (!response.ok) throw new Error('Failed to delete attachment');
//       setAttachments(prev => prev.filter(a => a.id !== attachmentId));
//       setMessage({ text: 'File deleted successfully', severity: 'success' });
//     })
//     .catch(error => {
//       console.error('Error deleting attachment:', error);
//       setMessage({ text: 'Failed to delete file', severity: 'error' });
//     });
//   };

//   // Submit application
//   const submitApplication = () => {
//     if (!applicationId) {
//       setMessage({ 
//         text: 'Please save the application first before submitting', 
//         severity: 'warning' 
//       });
//       return;
//     }

//     // Check if all required attachments are present
//     const requiredTypes = ['Makamu Form', 'Proposal', 'Ethical Form'];
//     const existingTypes = attachments.map(a => a.file_type);
//     const missingTypes = requiredTypes.filter(type => !existingTypes.includes(type));
    
//     if (missingTypes.length > 0) {
//       setMessage({ 
//         text: `Missing required attachments: ${missingTypes.join(', ')}`, 
//         severity: 'warning' 
//       });
//       return;
//     }

//     setSubmitting(true);
//     fetch(`${API_BASE_URL}/api/applications/${applicationId}/submit/`, {
//       method: 'POST',
//       headers: { 
//         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => {
//       if (!response.ok) throw new Error('Failed to submit application');
//       return response.json();
//     })
//     .then(data => {
//       setMessage({ 
//         text: 'Application submitted successfully', 
//         severity: 'success' 
//       });
//       setSubmitting(false);
//       setActiveStep(2); // Move to completion step
//     })
//     .catch(error => {
//       console.error('Error submitting application:', error);
//       setMessage({ text: 'Failed to submit application', severity: 'error' });
//       setSubmitting(false);
//     });
//   };

//   // Close snackbar
//   const handleCloseSnackbar = () => {
//     setMessage({ text: '', severity: 'info' });
//   };

//   // Steps for the application process
//   const steps = ['Application Details', 'Attachments', 'Review & Submit'];

//   if (loading) {
//     return (
//       <AppLayout>
//         <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
//           <CircularProgress />
//         </Container>
//       </AppLayout>
//     );
//   }

//   return (
//     <AppLayout>
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Paper elevation={3} sx={{ p: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom align="center">
//             Research Application Submission
//           </Typography>
          
//           <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
          
//           {/* Application Form - Step 1 */}
//           {activeStep === 0 && (
//             <Box component="form" sx={{ mt: 3 }}>
//               <Typography variant="h5" gutterBottom>
//                 Application Details
//               </Typography>
              
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     label="Research Title"
//                     name="title"
//                     value={application.title}
//                     onChange={handleApplicationChange}
//                   />
//                 </Grid>
                
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     fullWidth
//                     select
//                     label="Research Type"
//                     name="research_type"
//                     value={application.research_type}
//                     onChange={handleApplicationChange}
//                   >
//                     <MenuItem value="Environment & Marine">Environment & Marine</MenuItem>
//                     <MenuItem value="Aquatic Organisms">Aquatic Organisms</MenuItem>
//                     <MenuItem value="Fisheries Research">Fisheries Research</MenuItem>
//                   </TextField>
//                 </Grid>
                
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     fullWidth
//                     type="number"
//                     label="Year"
//                     name="year"
//                     value={application.year}
//                     onChange={handleApplicationChange}
//                     inputProps={{ min: 2000, max: new Date().getFullYear() + 5 }}
//                   />
//                 </Grid>
                
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     multiline
//                     rows={3}
//                     label="Research Description"
//                     name="description"
//                     value={application.description}
//                     onChange={handleApplicationChange}
//                   />
//                 </Grid>
                
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     multiline
//                     rows={3}
//                     label="Objectives"
//                     name="objectives"
//                     value={application.objectives}
//                     onChange={handleApplicationChange}
//                   />
//                 </Grid>
                
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     multiline
//                     rows={4}
//                     label="Methodology"
//                     name="methodology"
//                     value={application.methodology}
//                     onChange={handleApplicationChange}
//                   />
//                 </Grid>
                
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     multiline
//                     rows={3}
//                     label="Expected Outcomes"
//                     name="expected_outcomes"
//                     value={application.expected_outcomes}
//                     onChange={handleApplicationChange}
//                   />
//                 </Grid>
//               </Grid>
              
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
//                 <Button
//                   variant="contained"
//                   startIcon={<SaveIcon />}
//                   onClick={saveDraft}
//                   disabled={saving}
//                 >
//                   {saving ? <CircularProgress size={24} /> : 'Save & Continue'}
//                 </Button>
//               </Box>
//             </Box>
//           )}
          
//           {/* Attachments Section - Step 2 */}
//           {activeStep === 1 && (
//             <Box sx={{ mt: 3 }}>
//               <Typography variant="h5" gutterBottom>
//                 Required Attachments
//               </Typography>
              
//               <Card variant="outlined" sx={{ mb: 3 }}>
//                 <CardContent>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} sm={4}>
//                       <TextField
//                         fullWidth
//                         select
//                         label="Attachment Type"
//                         value={newAttachment.file_type}
//                         onChange={handleAttachmentTypeChange}
//                       >
//                         <MenuItem value="Makamu Form">Makamu Form</MenuItem>
//                         <MenuItem value="Proposal">Proposal</MenuItem>
//                         <MenuItem value="Ethical Form">Ethical Form</MenuItem>
//                       </TextField>
//                     </Grid>
                    
//                     <Grid item xs={12} sm={5}>
//                       <Button
//                         fullWidth
//                         variant="outlined"
//                         component="label"
//                         startIcon={<CloudUploadIcon />}
//                       >
//                         Select File
//                         <input
//                           id="file-input"
//                           type="file"
//                           hidden
//                           onChange={handleFileChange}
//                         />
//                       </Button>
//                       {newAttachment.file && (
//                         <Typography variant="body2" sx={{ mt: 1 }}>
//                           Selected: {newAttachment.file.name}
//                         </Typography>
//                       )}
//                     </Grid>
                    
//                     <Grid item xs={12} sm={3}>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         onClick={uploadAttachment}
//                         disabled={!newAttachment.file}
//                       >
//                         Upload
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
              
//               {/* Attachments List */}
//               <Typography variant="h6" gutterBottom>
//                 Uploaded Files
//               </Typography>
              
//               {attachments.length > 0 ? (
//                 <List sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
//                   {attachments.map((attachment) => (
//                     <ListItem
//                       key={attachment.id}
//                       secondaryAction={
//                         <IconButton 
//                           edge="end" 
//                           aria-label="delete"
//                           onClick={() => deleteAttachment(attachment.id)}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       }
//                     >
//                       <ListItemIcon>
//                         <DescriptionIcon />
//                       </ListItemIcon>
//                       <ListItemText
//                         primary={attachment.file_type}
//                         secondary={attachment.original_filename}
//                       />
//                     </ListItem>
//                   ))}
//                 </List>
//               ) : (
//                 <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
//                   No attachments uploaded yet
//                 </Typography>
//               )}
              
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
//                 <Button
//                   variant="outlined"
//                   onClick={() => setActiveStep(0)}
//                 >
//                   Back to Application
//                 </Button>
                
//                 <Button
//                   variant="contained"
//                   startIcon={<SendIcon />}
//                   onClick={submitApplication}
//                   disabled={submitting || attachments.length < 3}
//                 >
//                   {submitting ? <CircularProgress size={24} /> : 'Submit Application'}
//                 </Button>
//               </Box>
//             </Box>
//           )}
          
//           {/* Completion Step - Step 3 */}
//           {activeStep === 2 && (
//             <Box sx={{ mt: 3, textAlign: 'center' }}>
//               <Typography variant="h5" gutterBottom>
//                 Application Submitted Successfully!
//               </Typography>
//               <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//                 Your research application has been submitted for review. You will be notified once it has been processed.
//               </Typography>
//               <Button variant="contained" onClick={() => window.location.href = '/'}>
//                 Return to Dashboard
//               </Button>
//             </Box>
//           )}
//         </Paper>
        
//         {/* Notification Snackbar */}
//         <Snackbar
//           open={!!message.text}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//         >
//           <Alert 
//             onClose={handleCloseSnackbar} 
//             severity={message.severity} 
//             sx={{ width: '100%' }}
//           >
//             {message.text}
//           </Alert>
//         </Snackbar>
//       </Container>
//     </AppLayout>
//   );
// };

// export default SubmitApplication;












import React, { useState, useEffect } from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import {
  Container, Paper, Typography, TextField, MenuItem, Button, Grid, Box,
  Alert, Snackbar, List, ListItem, ListItemText, ListItemIcon, IconButton,
  CircularProgress, Card, CardContent, Stepper, Step, StepLabel
} from '@mui/material';
import {
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  Save as SaveIcon,
  Send as SendIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import './SubmitApplication.css';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Helper to get auth headers
const getAuthHeaders = (isJson = true) => {
  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('access')}`,
  };
  if (isJson) headers['Content-Type'] = 'application/json';
  return headers;
};

const SubmitApplication = () => {
  const [application, setApplication] = useState({
    title: '',
    category: '',
    research_type: 'Environment & Marine',
    year: new Date().getFullYear(),
    start_date: '',
    end_date: '',
    description: '',
    objectives: '',
    methodology: '',
    expected_outcomes: ''
  });

  const [attachments, setAttachments] = useState([]);
  const [newAttachment, setNewAttachment] = useState({ file_type: 'Makamu Form', file: null });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', severity: 'info' });
  const [applicationId, setApplicationId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  // Fetch existing application if editing
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) return;

    setLoading(true);
    fetch(`${API_BASE_URL}/api/applications/${id}/`, { headers: getAuthHeaders() })
      .then(res => { if (!res.ok) throw new Error('Failed to fetch'); return res.json(); })
      .then(data => {
        setApplication(data);
        setApplicationId(id);
        return fetch(`${API_BASE_URL}/api/applications/${id}/attachments/`, { headers: getAuthHeaders() });
      })
      .then(res => { if (!res.ok) throw new Error('Failed to fetch attachments'); return res.json(); })
      .then(data => setAttachments(data))
      .catch(err => setMessage({ text: 'Failed to load application data', severity: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  const handleApplicationChange = e => {
    const { name, value } = e.target;
    setApplication(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => setNewAttachment(prev => ({ ...prev, file: e.target.files[0] }));
  const handleAttachmentTypeChange = e => setNewAttachment(prev => ({ ...prev, file_type: e.target.value }));

  const saveDraft = () => {
    setSaving(true);
    const url = applicationId ? `${API_BASE_URL}/api/applications/${applicationId}/` : `${API_BASE_URL}/api/applications/`;
    const method = applicationId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(application)
    })
      .then(res => { if (!res.ok) throw new Error('Failed to save'); return res.json(); })
      .then(data => {
        setApplicationId(data.id);
        setMessage({ text: 'Draft saved successfully', severity: 'success' });
        setActiveStep(1);
      })
      .catch(() => setMessage({ text: 'Failed to save draft', severity: 'error' }))
      .finally(() => setSaving(false));
  };

  const uploadAttachment = () => {
    if (!applicationId) {
      setMessage({ text: 'Save the application first', severity: 'warning' });
      return;
    }
    if (!newAttachment.file) {
      setMessage({ text: 'Select a file to upload', severity: 'warning' });
      return;
    }

    const formData = new FormData();
    formData.append('file_type', newAttachment.file_type);
    formData.append('file_path', newAttachment.file);

    fetch(`${API_BASE_URL}/api/applications/${applicationId}/attachments/`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access')}` },
      body: formData
    })
      .then(res => { if (!res.ok) throw new Error('Upload failed'); return res.json(); })
      .then(data => {
        setAttachments(prev => [...prev, data]);
        setNewAttachment({ file_type: 'Makamu Form', file: null });
        document.getElementById('file-input').value = '';
        setMessage({ text: 'File uploaded successfully', severity: 'success' });
      })
      .catch(() => setMessage({ text: 'Failed to upload file', severity: 'error' }));
  };

  const deleteAttachment = attachmentId => {
    fetch(`${API_BASE_URL}/api/applications/${applicationId}/attachments/${attachmentId}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access')}` }
    })
      .then(res => { if (!res.ok) throw new Error('Delete failed'); setAttachments(prev => prev.filter(a => a.id !== attachmentId)); })
      .then(() => setMessage({ text: 'File deleted successfully', severity: 'success' }))
      .catch(() => setMessage({ text: 'Failed to delete file', severity: 'error' }));
  };

  const submitApplication = () => {
    if (!applicationId) {
      setMessage({ text: 'Save the application first', severity: 'warning' });
      return;
    }
    const requiredTypes = ['Makamu Form', 'Proposal', 'Ethical Form'];
    const existingTypes = attachments.map(a => a.file_type);
    const missingTypes = requiredTypes.filter(type => !existingTypes.includes(type));
    if (missingTypes.length > 0) {
      setMessage({ text: `Missing attachments: ${missingTypes.join(', ')}`, severity: 'warning' });
      return;
    }

    setSubmitting(true);
    fetch(`${API_BASE_URL}/api/applications/${applicationId}/submit/`, {
      method: 'POST',
      headers: getAuthHeaders()
    })
      .then(res => { if (!res.ok) throw new Error('Submit failed'); return res.json(); })
      .then(() => {
        setMessage({ text: 'Application submitted successfully', severity: 'success' });
        setActiveStep(2);
      })
      .catch(() => setMessage({ text: 'Failed to submit application', severity: 'error' }))
      .finally(() => setSubmitting(false));
  };

  const handleCloseSnackbar = () => setMessage({ text: '', severity: 'info' });
  const steps = ['Application Details', 'Attachments', 'Review & Submit'];

  if (loading) return (
    <AppLayout>
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    </AppLayout>
  );

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Research Application Submission
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map(label => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>

          {/* Step 1: Application Details */}
          {activeStep === 0 && (
            <Box component="form" sx={{ mt: 3 }}>
              <Typography variant="h5" gutterBottom>Application Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField required fullWidth label="Research Title" name="title" value={application.title} onChange={handleApplicationChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth label="Category" name="category" value={application.category} onChange={handleApplicationChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth select label="Research Type" name="research_type" value={application.research_type} onChange={handleApplicationChange}>
                    <MenuItem value="Environment & Marine">Environment & Marine</MenuItem>
                    <MenuItem value="Aquatic Organisms">Aquatic Organisms</MenuItem>
                    <MenuItem value="Fisheries Research">Fisheries Research</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth type="number" label="Year" name="year" value={application.year} onChange={handleApplicationChange} inputProps={{ min: 2000, max: new Date().getFullYear() + 5 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth type="date" label="Start Date" name="start_date" value={application.start_date} onChange={handleApplicationChange} InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth type="date" label="End Date" name="end_date" value={application.end_date} onChange={handleApplicationChange} InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12}><TextField required fullWidth multiline rows={3} label="Research Description" name="description" value={application.description} onChange={handleApplicationChange} /></Grid>
                <Grid item xs={12}><TextField required fullWidth multiline rows={3} label="Objectives" name="objectives" value={application.objectives} onChange={handleApplicationChange} /></Grid>
                <Grid item xs={12}><TextField required fullWidth multiline rows={4} label="Methodology" name="methodology" value={application.methodology} onChange={handleApplicationChange} /></Grid>
                <Grid item xs={12}><TextField required fullWidth multiline rows={3} label="Expected Outcomes" name="expected_outcomes" value={application.expected_outcomes} onChange={handleApplicationChange} /></Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button variant="contained" startIcon={<SaveIcon />} onClick={saveDraft} disabled={saving}>
                  {saving ? <CircularProgress size={24} /> : 'Save & Continue'}
                </Button>
              </Box>
            </Box>
          )}

          {/* Step 2: Attachments */}
          {activeStep === 1 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h5" gutterBottom>Required Attachments</Typography>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <TextField fullWidth select label="Attachment Type" value={newAttachment.file_type} onChange={handleAttachmentTypeChange}>
                        <MenuItem value="Makamu Form">Makamu Form</MenuItem>
                        <MenuItem value="Proposal">Proposal</MenuItem>
                        <MenuItem value="Ethical Form">Ethical Form</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Button fullWidth variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
                        Select File
                        <input id="file-input" type="file" hidden onChange={handleFileChange} />
                      </Button>
                      {newAttachment.file && <Typography variant="body2" sx={{ mt: 1 }}>Selected: {newAttachment.file.name}</Typography>}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Button fullWidth variant="contained" onClick={uploadAttachment} disabled={!newAttachment.file}>Upload</Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Typography variant="h6" gutterBottom>Uploaded Files</Typography>
              {attachments.length > 0 ? (
                <List sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  {attachments.map(a => (
                    <ListItem key={a.id} secondaryAction={
                      <IconButton edge="end" onClick={() => deleteAttachment(a.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }>
                      <ListItemIcon><DescriptionIcon /></ListItemIcon>
                      <ListItemText primary={a.file_type} secondary={a.original_filename} />
                    </ListItem>
                  ))}
                </List>
              ) : <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>No attachments uploaded yet</Typography>}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button variant="outlined" onClick={() => setActiveStep(0)}>Back to Application</Button>
                <Button variant="contained" startIcon={<SendIcon />} onClick={submitApplication} disabled={submitting || attachments.length < 3}>
                  {submitting ? <CircularProgress size={24} /> : 'Submit Application'}
                </Button>
              </Box>
            </Box>
          )}

          {/* Step 3: Completion */}
          {activeStep === 2 && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Application Submitted Successfully!</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Your research application has been submitted for review.</Typography>
              <Button variant="contained" onClick={() => window.location.href = '/'}>Return to Dashboard</Button>
            </Box>
          )}
        </Paper>

        <Snackbar open={!!message.text} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={handleCloseSnackbar} severity={message.severity} sx={{ width: '100%' }}>{message.text}</Alert>
        </Snackbar>
      </Container>
    </AppLayout>
  );
};

export default SubmitApplication;
