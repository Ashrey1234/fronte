// src/pages/researcher/SubmitApplication.jsx
// import React from "react";
// import AppLayout from "../../components/layouts/AppLayout";

// const SubmitApplication = () => {
//   return (
//     <AppLayout role="researcher">
//       <h2>Submit Application</h2>
//       <p>Upload your research proposal, Makamu Form, and Ethical Form here.</p>
//       {/* You can add form component or file upload inputs later */}
//     </AppLayout>
//   );
// };

// export default SubmitApplication;




// import React, { useState } from 'react';
// import AppLayout from '../../components/layouts/AppLayout';
// import './SubmitApplication.css'; // CSS file ya component hii

// const ROLE_OPTIONS = [
//   'Student',
//   'University',
//   'Institute',
//   'Independent'
// ];

// const Dashboard = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     typeOfResearch: '',
//     title: '',
//     role: '',
//     photo: null,
//     proposal: null,
//     formMakomRais: null,
//     formClearance: null
//   });

//   const [statusMessage, setStatusMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     for (const key in formData) {
//       if (formData[key]) data.append(key, formData[key]);
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/attachments/upload/', {
//         method: 'POST',
//         body: data
//       });

//       if (!response.ok) throw new Error('Submission failed');

//       const result = await response.json();
//       setStatusMessage('Form submitted successfully!');
//       console.log(result);

//       setFormData({
//         fullName: '',
//         typeOfResearch: '',
//         title: '',
//         role: '',
//         photo: null,
//         proposal: null,
//         formMakomRais: null,
//         formClearance: null
//       });
//     } catch (error) {
//       console.error(error);
//       setStatusMessage('Submission failed!');
//     }
//   };

//   return (
//     <AppLayout>
//       <div className="dashboard-container">
//         <h2 className="dashboard-title">Research Submission Dashboard</h2>

//         {statusMessage && (
//           <div className={`status-message ${statusMessage.includes('successfully') ? 'success' : 'error'}`}>
//             {statusMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="dashboard-form">
//           <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
//           <input type="text" name="typeOfResearch" placeholder="Type of Research" value={formData.typeOfResearch} onChange={handleChange} required />
//           <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />

//           <select name="role" value={formData.role} onChange={handleChange} required>
//             <option value="">Select Role</option>
//             {ROLE_OPTIONS.map(role => <option key={role} value={role}>{role}</option>)}
//           </select>

//           <input type="file" name="photo" accept=".pdf" onChange={handleChange} required />
//           <input type="file" name="proposal" accept=".pdf" onChange={handleChange} required />
//           <input type="file" name="formMakomRais" accept=".pdf" onChange={handleChange} required />
//           <input type="file" name="formClearance" accept=".pdf" onChange={handleChange} required />

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </AppLayout>
//   );
// };

// export default SubmitApplication;










// import React, { useState } from 'react';
// import AppLayout from '../../components/layouts/AppLayout';
// import './SubmitApplication.css';

// const ROLE_OPTIONS = [
//   'Student',
//   'University',
//   'Institute',
//   'Independent'
// ];

// const SubmitApplication = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     typeOfResearch: '',
//     title: '',
//     role: '',
//     photo: null,
//     proposal: null,
//     formMakomRais: null,
//     formClearance: null
//   });

//   const [statusMessage, setStatusMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if all required files are uploaded
//     const requiredFiles = ['photo', 'proposal', 'formMakomRais', 'formClearance'];
//     for (const file of requiredFiles) {
//       if (!formData[file]) {
//         setStatusMessage(`Please upload your ${file}`);
//         return;
//       }
//     }

//     const data = new FormData();
//     for (const key in formData) {
//       if (formData[key]) data.append(key, formData[key]);
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/attachments/upload/', {
//         method: 'POST',
//         body: data
//       });

//       if (!response.ok) throw new Error('Submission failed');

//       const result = await response.json();
//       setStatusMessage('Form submitted successfully!');
//       console.log(result);

//       // Clear form
//       setFormData({
//         fullName: '',
//         typeOfResearch: '',
//         title: '',
//         role: '',
//         photo: null,
//         proposal: null,
//         formMakomRais: null,
//         formClearance: null
//       });
//     } catch (error) {
//       console.error(error);
//       setStatusMessage('Submission failed!');
//     }
//   };

//   // Function to show file info
//   const renderFileInfo = (file) => {
//     if (!file) return <span className="file-info">No file selected</span>;
//     return <span className="file-info">{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>;
//   };

//   return (
//     <AppLayout>
//       <div className="dashboard-container">
//         <h2 className="dashboard-title">Research Submission Dashboard</h2>

//         {statusMessage && (
//           <div className={`status-message ${statusMessage.includes('successfully') ? 'success' : 'error'}`}>
//             {statusMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="dashboard-form">
//           <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
//           <input type="text" name="typeOfResearch" placeholder="Type of Research" value={formData.typeOfResearch} onChange={handleChange} required />
//           <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />

//           <select name="role" value={formData.role} onChange={handleChange} required>
//             <option value="">Select Role</option>
//             {ROLE_OPTIONS.map(role => <option key={role} value={role}>{role}</option>)}
//           </select>

//           <div className="file-upload">
//             <label>Upload Photo (PDF)</label>
//             <input type="file" name="photo" accept=".pdf" onChange={handleChange} />
//             {renderFileInfo(formData.photo)}
//           </div>

//           <div className="file-upload">
//             <label>Upload Proposal (PDF)</label>
//             <input type="file" name="proposal" accept=".pdf" onChange={handleChange} />
//             {renderFileInfo(formData.proposal)}
//           </div>

//           <div className="file-upload">
//             <label>Form from Makom a Rais (PDF)</label>
//             <input type="file" name="formMakomRais" accept=".pdf" onChange={handleChange} />
//             {renderFileInfo(formData.formMakomRais)}
//           </div>

//           <div className="file-upload">
//             <label>Form of Clearance (PDF)</label>
//             <input type="file" name="formClearance" accept=".pdf" onChange={handleChange} />
//             {renderFileInfo(formData.formClearance)}
//           </div>

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </AppLayout>
//   );
// };

// export default SubmitApplication;


















// 





// import React, { useState } from 'react';
// import AppLayout from '../../components/layouts/AppLayout';
// import './SubmitApplication.css';

// const ROLE_OPTIONS = [
//   'Student',
//   'University',
//   'Institute',
//   'Independent'
// ];

// const FILE_LABELS = {
//   photo: "Passport Size Photo (Image)",
//   proposal: "Research Proposal (PDF)",
//   formVicePresident: "Form Vice President (PDF)",
//   formClearance: "Ethical Clearance Form (PDF)"
// };

// const SubmitApplication = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     typeOfResearch: '',
//     title: '',
//     role: '',
//     photo: null,
//     proposal: null,
//     formVicePresident: null,
//     formClearance: null
//   });

//   const [statusMessage, setStatusMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, files, value } = e.target;
//     if (files) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFiles = ['photo', 'proposal', 'formVicePresident', 'formClearance'];
//     for (const file of requiredFiles) {
//       if (!formData[file]) {
//         setStatusMessage(`Please upload your ${FILE_LABELS[file]}`);
//         return;
//       }
//     }

//     const data = new FormData();
//     for (const key in formData) {
//       if (formData[key]) data.append(key, formData[key]);
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/attachments/upload/', {
//         method: 'POST',
//         body: data
//       });

//       if (!response.ok) throw new Error('Submission failed');

//       const result = await response.json();
//       setStatusMessage('Form submitted successfully!');
//       console.log(result);

//       // Reset form
//       setFormData({
//         fullName: '',
//         typeOfResearch: '',
//         title: '',
//         role: '',
//         photo: null,
//         proposal: null,
//         formVicePresident: null,
//         formClearance: null
//       });
//     } catch (error) {
//       console.error(error);
//       setStatusMessage('Submission failed!');
//     }
//   };

//   const renderFileInfo = (file) => {
//     if (!file) return <span className="file-info">No file selected</span>;
//     return <span className="file-info">{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>;
//   };

//   return (
//     <AppLayout>
//       <div className="dashboard-container">
//         <h2 className="dashboard-title">Research Submission Dashboard</h2>

//         {statusMessage && (
//           <div className={`status-message ${statusMessage.includes('successfully') ? 'success' : 'error'}`}>
//             {statusMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="dashboard-form">
//           <input 
//             type="text" 
//             name="fullName" 
//             placeholder="Full Name" 
//             value={formData.fullName} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="typeOfResearch" 
//             placeholder="Type of Research" 
//             value={formData.typeOfResearch} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="title" 
//             placeholder="Title" 
//             value={formData.title} 
//             onChange={handleChange} 
//             required 
//           />

//           <select 
//             name="role" 
//             value={formData.role} 
//             onChange={handleChange} 
//             required
//           >
//             <option value="">Select Role</option>
//             {ROLE_OPTIONS.map(role => (
//               <option key={role} value={role}>{role}</option>
//             ))}
//           </select>

//           {/* File Uploads */}
//           {Object.keys(FILE_LABELS).map(key => (
//             <div className="file-upload" key={key}>
//               <h4 className="file-title">{FILE_LABELS[key]}</h4>

//               {key === "photo" ? (
//                 <>
//                   <input 
//                     type="file" 
//                     name={key} 
//                     accept="image/*" 
//                     onChange={handleChange} 
//                   />
//                   {formData.photo ? (
//                     <div className="passport-preview">
//                       <img src={URL.createObjectURL(formData.photo)} alt="Passport Preview" />
//                     </div>
//                   ) : (
//                     <span className="file-info">No file selected</span>
//                   )}
//                 </>
//               ) : (
//                 <>
//                   <input 
//                     type="file" 
//                     name={key} 
//                     accept=".pdf" 
//                     onChange={handleChange} 
//                   />
//                   {renderFileInfo(formData[key])}
//                 </>
//               )}
//             </div>
//           ))}

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </AppLayout>
//   );
// };

// export default SubmitApplication;

















// import React, { useState } from 'react';
// import AppLayout from '../../components/layouts/AppLayout';
// import './SubmitApplication.css';

// const ROLE_OPTIONS = [
//   'Student',
//   'University',
//   'Institute',
//   'Independent'
// ];

// const FILE_LABELS = {
//   photo: "Passport Size Photo (Image/PDF)",
//   proposal: "Research Proposal (PDF)",
//   formVicePresident: "Form Vice President (PDF)",
//   formClearance: "Ethical Clearance Form (PDF)"
// };

// const SubmitApplication = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     typeOfResearch: '',
//     title: '',
//     role: '',
//     photo: null,
//     proposal: null,
//     formVicePresident: null,
//     formClearance: null
//   });

//   const [statusMessage, setStatusMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, files, value } = e.target;
//     if (files) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFiles = ['photo', 'proposal', 'formVicePresident', 'formClearance'];
//     for (const file of requiredFiles) {
//       if (!formData[file]) {
//         setStatusMessage(`Please upload your ${FILE_LABELS[file]}`);
//         return;
//       }
//     }

//     const data = new FormData();
//     for (const key in formData) {
//       if (formData[key]) data.append(key, formData[key]);
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/attachments/upload/', {
//         method: 'POST',
//         body: data
//       });

//       if (!response.ok) throw new Error('Submission failed');

//       const result = await response.json();
//       setStatusMessage('Form submitted successfully!');
//       console.log(result);

//       // Reset form
//       setFormData({
//         fullName: '',
//         typeOfResearch: '',
//         title: '',
//         role: '',
//         photo: null,
//         proposal: null,
//         formVicePresident: null,
//         formClearance: null
//       });
//     } catch (error) {
//       console.error(error);
//       setStatusMessage('Submission failed!');
//     }
//   };

//   const renderFileInfo = (file, type) => {
//     if (!file) return <span className="file-info">No file selected</span>;

//     if (type === "photo") {
//       // Ikiwa ni image
//       if (file.type.startsWith("image/")) {
//         return (
//           <div className="passport-preview">
//             <img src={URL.createObjectURL(file)} alt="Passport Preview" />
//           </div>
//         );
//       }
//       // Ikiwa ni PDF
//       if (file.type === "application/pdf") {
//         return (
//           <a
//             href={URL.createObjectURL(file)}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="view-link"
//           >
//             View Passport PDF
//           </a>
//         );
//       }
//     } else {
//       // Zingine zote ni PDF
//       return (
//         <div className="file-preview">
//           <span className="file-info">{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
//           <a
//             href={URL.createObjectURL(file)}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="view-link"
//           >
//             View Document
//           </a>
//         </div>
//       );
//     }
//   };

//   return (
//     <AppLayout>
//       <div className="dashboard-container">
//         <h2 className="dashboard-title">Research Submission Dashboard</h2>

//         {statusMessage && (
//           <div className={`status-message ${statusMessage.includes('successfully') ? 'success' : 'error'}`}>
//             {statusMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="dashboard-form">
//           <input 
//             type="text" 
//             name="fullName" 
//             placeholder="Full Name" 
//             value={formData.fullName} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="typeOfResearch" 
//             placeholder="Type of Research" 
//             value={formData.typeOfResearch} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="title" 
//             placeholder="Title" 
//             value={formData.title} 
//             onChange={handleChange} 
//             required 
//           />

//           <select 
//             name="role" 
//             value={formData.role} 
//             onChange={handleChange} 
//             required
//           >
//             <option value="">Select Role</option>
//             {ROLE_OPTIONS.map(role => (
//               <option key={role} value={role}>{role}</option>
//             ))}
//           </select>

//           {/* File Uploads */}
//           {Object.keys(FILE_LABELS).map(key => (
//             <div className="file-upload" key={key}>
//               <h4 className="file-title">{FILE_LABELS[key]}</h4>
//               <input 
//                 type="file" 
//                 name={key} 
//                 accept={key === "photo" ? "image/*,application/pdf" : ".pdf"} 
//                 onChange={handleChange} 
//               />
//               {renderFileInfo(formData[key], key)}
//             </div>
//           ))}

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </AppLayout>
//   );
// };

// export default SubmitApplication;

























// import React, { useState } from 'react';
// import AppLayout from '../../components/layouts/AppLayout';
// import './SubmitApplication.css';

// const ROLE_OPTIONS = [
//   'Student',
//   'University',
//   'Institute',
//   'Independent'
// ];

// const FILE_LABELS = {
//   photo: "Passport Size Photo (Image/PDF)",
//   proposal: "Research Proposal (PDF)",
//   vice_president_form: "Form Vice President (PDF)",
//   ethical_form: "Ethical Clearance Form (PDF)"
// };

// const SubmitApplication = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     typeOfResearch: '',
//     title: '',
//     role: '',
//     photo: null,
//     proposal: null,
//     vice_president_form: null,
//     ethical_form: null
//   });

//   const [statusMessage, setStatusMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, files, value } = e.target;
//     if (files) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFiles = ['photo', 'proposal', 'vice_president_form', 'ethical_form'];
//     for (const file of requiredFiles) {
//       if (!formData[file]) {
//         setStatusMessage(`Please upload your ${FILE_LABELS[file]}`);
//         return;
//       }
//     }

//     const data = new FormData();
//     // Add other fields if needed by backend (e.g. application id)
//     for (const key in formData) {
//       if (formData[key]) data.append(key, formData[key]);
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/attachments/upload/', {
//         method: 'POST',
//         body: data
//       });

//       if (!response.ok) throw new Error('Submission failed');

//       const result = await response.json();
//       setStatusMessage('Form submitted successfully!');
//       console.log(result);

//       // Reset form
//       setFormData({
//         fullName: '',
//         typeOfResearch: '',
//         title: '',
//         role: '',
//         photo: null,
//         proposal: null,
//         vice_president_form: null,
//         ethical_form: null
//       });
//     } catch (error) {
//       console.error(error);
//       setStatusMessage('Submission failed!');
//     }
//   };

//   const renderFileInfo = (file, type) => {
//     if (!file) return <span className="file-info">No file selected</span>;

//     if (type === "photo") {
//       if (file.type.startsWith("image/")) {
//         return (
//           <div className="passport-preview">
//             <img src={URL.createObjectURL(file)} alt="Passport Preview" />
//           </div>
//         );
//       }
//       if (file.type === "application/pdf") {
//         return (
//           <a
//             href={URL.createObjectURL(file)}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="view-link"
//           >
//             View Passport PDF
//           </a>
//         );
//       }
//     } else {
//       return (
//         <div className="file-preview">
//           <span className="file-info">{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
//           <a
//             href={URL.createObjectURL(file)}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="view-link"
//           >
//             View Document
//           </a>
//         </div>
//       );
//     }
//   };

//   return (
//     <AppLayout>
//       <div className="dashboard-container">
//         <h2 className="dashboard-title">Research Submission Dashboard</h2>

//         {statusMessage && (
//           <div className={`status-message ${statusMessage.includes('successfully') ? 'success' : 'error'}`}>
//             {statusMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="dashboard-form">
//           <input 
//             type="text" 
//             name="fullName" 
//             placeholder="Full Name" 
//             value={formData.fullName} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="typeOfResearch" 
//             placeholder="Type of Research" 
//             value={formData.typeOfResearch} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="title" 
//             placeholder="Title" 
//             value={formData.title} 
//             onChange={handleChange} 
//             required 
//           />

//           <select 
//             name="role" 
//             value={formData.role} 
//             onChange={handleChange} 
//             required
//           >
//             <option value="">Select Role</option>
//             {ROLE_OPTIONS.map(role => (
//               <option key={role} value={role}>{role}</option>
//             ))}
//           </select>

//           {/* File Uploads */}
//           {Object.keys(FILE_LABELS).map(key => (
//             <div className="file-upload" key={key}>
//               <h4 className="file-title">{FILE_LABELS[key]}</h4>
//               <input 
//                 type="file" 
//                 name={key} 
//                 accept={key === "photo" ? "image/*,application/pdf" : ".pdf"} 
//                 onChange={handleChange} 
//               />
//               {renderFileInfo(formData[key], key)}
//             </div>
//           ))}

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </AppLayout>
//   );
// };

// export default SubmitApplication;






















// import React, { useState } from 'react';
// import AppLayout from '../../components/layouts/AppLayout';
// import './SubmitApplication.css';

// const ROLE_OPTIONS = [
//   'Student',
//   'University',
//   'Institute',
//   'Independent'
// ];

// const FILE_LABELS = {
//   photo: "Passport Size Photo (Image/PDF)",
//   proposal: "Research Proposal (PDF)",
//   vice_president_form: "Form Vice President (PDF)",
//   ethical_form: "Ethical Clearance Form (PDF)"
// };

// const SubmitApplication = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     typeOfResearch: '',
//     title: '',
//     role: '',
//     photo: null,
//     proposal: null,
//     vice_president_form: null,
//     ethical_form: null
//   });

//   const [statusMessage, setStatusMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, files, value } = e.target;
//     if (files) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFiles = ['photo', 'proposal', 'vice_president_form', 'ethical_form'];
//     for (const file of requiredFiles) {
//       if (!formData[file]) {
//         setStatusMessage(`Please upload your ${FILE_LABELS[file]}`);
//         setTimeout(() => setStatusMessage(''), 3000); // clear message after 3s
//         return;
//       }
//     }

//     const data = new FormData();
//     for (const key in formData) {
//       if (formData[key]) data.append(key, formData[key]);
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/attachments/upload/', {
//         method: 'POST',
//         body: data
//       });

//       if (!response.ok) throw new Error('Submission failed');

//       const result = await response.json();
//       setStatusMessage('Form submitted successfully!');

//       // auto-clear success message after 3s
//       setTimeout(() => setStatusMessage(''), 3000);

//       console.log(result);

//       // Reset ONLY text fields, keep uploaded files
//       setFormData(prev => ({
//         ...prev,
//         fullName: '',
//         typeOfResearch: '',
//         title: '',
//         role: ''
//       }));
//     } catch (error) {
//       console.error(error);
//       setStatusMessage('Submission failed!');
//       setTimeout(() => setStatusMessage(''), 3000); // auto-clear error
//     }
//   };

//   const renderFileInfo = (file, type) => {
//     if (!file) return <span className="file-info">No file selected</span>;

//     if (type === "photo") {
//       if (file.type.startsWith("image/")) {
//         return (
//           <div className="passport-preview">
//             <img src={URL.createObjectURL(file)} alt="Passport Preview" />
//           </div>
//         );
//       }
//       if (file.type === "application/pdf") {
//         return (
//           <a
//             href={URL.createObjectURL(file)}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="view-link"
//           >
//             View Passport PDF
//           </a>
//         );
//       }
//     } else {
//       return (
//         <div className="file-preview">
//           <span className="file-info">
//             {file.name} ({(file.size / 1024).toFixed(2)} KB)
//           </span>
//           <a
//             href={URL.createObjectURL(file)}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="view-link"
//           >
//             View Document
//           </a>
//         </div>
//       );
//     }
//   };

//   return (
//     <AppLayout>
//       <div className="dashboard-container">
//         <h2 className="dashboard-title">Research Submission Dashboard</h2>

//         {statusMessage && (
//           <div className={`status-message ${statusMessage.includes('successfully') ? 'success' : 'error'}`}>
//             {statusMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="dashboard-form">
//           <input 
//             type="text" 
//             name="fullName" 
//             placeholder="Full Name" 
//             value={formData.fullName} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="typeOfResearch" 
//             placeholder="Type of Research" 
//             value={formData.typeOfResearch} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="title" 
//             placeholder="Title" 
//             value={formData.title} 
//             onChange={handleChange} 
//             required 
//           />

//           <select 
//             name="role" 
//             value={formData.role} 
//             onChange={handleChange} 
//             required
//           >
//             <option value="">Select Role</option>
//             {ROLE_OPTIONS.map(role => (
//               <option key={role} value={role}>{role}</option>
//             ))}
//           </select>

//           {/* File Uploads */}
//           {Object.keys(FILE_LABELS).map(key => (
//             <div className="file-upload" key={key}>
//               <h4 className="file-title">{FILE_LABELS[key]}</h4>
//               <input 
//                 type="file" 
//                 name={key} 
//                 accept={key === "photo" ? "image/*,application/pdf" : ".pdf"} 
//                 onChange={handleChange} 
//               />
//               {renderFileInfo(formData[key], key)}
//             </div>
//           ))}

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </AppLayout>
//   );
// };

// export default SubmitApplication;




// now

// import React, { useState } from 'react'         ;
// import AppLayout from '../../components/layouts/AppLayout';
// import './SubmitApplication.css';

// const ROLE_OPTIONS = [
//   'Student',
//   'University',
//   'Institute',
//   'Independent'
// ];

// const FILE_LABELS = {
//   photo: "Passport Size Photo (Image/PDF)",
//   proposal: "Research Proposal (PDF)",
//   vice_president_form: "Form Vice President (PDF)",
//   ethical_form: "Ethical Clearance Form (PDF)"
// };

// const SubmitApplication = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     typeOfResearch: '',
//     title: '',
//     role: '',
//     photo: null,
//     proposal: null,
//     vice_president_form: null,
//     ethical_form: null
//   });

//   const [statusMessage, setStatusMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, files, value } = e.target;
//     if (files) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFiles = ['photo', 'proposal', 'vice_president_form', 'ethical_form'];
//     for (const file of requiredFiles) {
//       if (!formData[file]) {
//         setStatusMessage(`Please upload your ${FILE_LABELS[file]}`);
//         setTimeout(() => setStatusMessage(''), 3000); // clear message after 3s
//         return;
//       }
//     }

//     const data = new FormData();
//     for (const key in formData) {
//       if (formData[key]) data.append(key, formData[key]);
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/attachments/upload/', {
//         method: 'POST',
//         body: data
//       });

//       if (!response.ok) throw new Error('Submission failed');

//       const result = await response.json();
//       setStatusMessage('Form submitted successfully!');

//       // auto-clear success message after 3s
//       setTimeout(() => setStatusMessage(''), 3000);

//       console.log(result);

//       // Reset ONLY text fields, keep uploaded files
//       setFormData(prev => ({
//         ...prev,
//         fullName: '',
//         typeOfResearch: '',
//         title: '',
//         role: ''
//       }));
//     } catch (error) {
//       console.error(error);
//       setStatusMessage('Submission failed!');
//       setTimeout(() => setStatusMessage(''), 3000); // auto-clear error
//     }
//   };

//   const renderFileInfo = (file, type) => {
//     if (!file) return <span className="file-info">No file selected</span>;

//     if (type === "photo") {
//       if (file.type.startsWith("image/")) {
//         return (
//           <div className="passport-preview">
//             <img src={URL.createObjectURL(file)} alt="Passport Preview" />
//           </div>
//         );
//       }
//       if (file.type === "application/pdf") {
//         return (
//           <a
//             href={URL.createObjectURL(file)}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="view-link"
//           >
//             View Passport PDF
//           </a>
//         );
//       }
//     } else {
//       return (
//         <div className="file-preview">
//           <span className="file-info">
//             {file.name} ({(file.size / 1024).toFixed(2)} KB)
//           </span>
//           <a
//             href={URL.createObjectURL(file)}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="view-link"
//           >
//             View Document
//           </a>
//         </div>
//       );
//     }
//   };

//   return (
//     <AppLayout>
//       <div className="dashboard-container">
//         <h2 className="dashboard-title">Research Submission Dashboard</h2>

//         {statusMessage && (
//           <div className={`status-message ${statusMessage.includes('successfully') ? 'success' : 'error'}`}>
//             {statusMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="dashboard-form">
//           <input 
//             type="text" 
//             name="fullName" 
//             placeholder="Full Name" 
//             value={formData.fullName} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="typeOfResearch" 
//             placeholder="Type of Research" 
//             value={formData.typeOfResearch} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="title" 
//             placeholder="Title" 
//             value={formData.title} 
//             onChange={handleChange} 
//             required 
//           />

//           <select 
//             name="role" 
//             value={formData.role} 
//             onChange={handleChange} 
//             required
//           >
//             <option value="">Select Role</option>
//             {ROLE_OPTIONS.map(role => (
//               <option key={role} value={role}>{role}</option>
//             ))}
//           </select>

//           {/* File Uploads */}
//           {Object.keys(FILE_LABELS).map(key => (
//             <div className="file-upload" key={key}>
//               <h4 className="file-title">{FILE_LABELS[key]}</h4>
//               <input 
//                 type="file" 
//                 name={key} 
//                 accept={key === "photo" ? "image/*,application/pdf" : ".pdf"} 
//                 onChange={handleChange} 
//               />
//               {renderFileInfo(formData[key], key)}
//             </div>
//           ))}

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </AppLayout>
//   );
// };

// export default SubmitApplication;




















// import React, { useState, useEffect } from 'react';
// import AppLayout from '../../components/layouts/AppLayout';
// import './SubmitApplication.css';

// const ROLE_OPTIONS = [
//   'Student',
//   'University',
//   'Institute',
//   'Independent'
// ];

// const FILE_LABELS = {
//   photo: "Passport Size Photo (Image/PDF)",
//   proposal: "Research Proposal (PDF)",
//   vice_president_form: "Form Vice President (PDF)",
//   ethical_form: "Ethical Clearance Form (PDF)"
// };

// const SubmitApplication = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     typeOfResearch: '',
//     title: '',
//     role: '',
//     photo: null,
//     proposal: null,
//     vice_president_form: null,
//     ethical_form: null
//   });

//   const [statusMessage, setStatusMessage] = useState('');

//   // 🚀 Fetch uploaded files from backend on page load
//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/attachments/upload/");
//         if (!res.ok) throw new Error("Failed to fetch attachments");
//         const data = await res.json();

//         setFormData(prev => ({
//           ...prev,
//           photo: data.photo || null,
//           proposal: data.proposal || null,
//           vice_president_form: data.vice_president_form || null,
//           ethical_form: data.ethical_form || null,
//         }));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchFiles();
//   }, []);

//   const handleChange = (e) => {
//     const { name, files, value } = e.target;
//     if (files) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFiles = ['photo', 'proposal', 'vice_president_form', 'ethical_form'];
//     for (const file of requiredFiles) {
//       if (!formData[file]) {
//         setStatusMessage(`Please upload your ${FILE_LABELS[file]}`);
//         setTimeout(() => setStatusMessage(''), 3000);
//         return;
//       }
//     }

//     const data = new FormData();
//     for (const key in formData) {
//       if (formData[key] instanceof File) {
//         data.append(key, formData[key]);
//       }
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/attachments/upload/', {
//         method: 'POST',
//         body: data
//       });

//       if (!response.ok) throw new Error('Submission failed');

//       const result = await response.json();
//       setStatusMessage('Form submitted successfully!');
//       setTimeout(() => setStatusMessage(''), 3000);

//       console.log(result);

//       // Reset ONLY text fields
//       setFormData(prev => ({
//         ...prev,
//         fullName: '',
//         typeOfResearch: '',
//         title: '',
//         role: ''
//       }));
//     } catch (error) {
//       console.error(error);
//       setStatusMessage('Submission failed!');
//       setTimeout(() => setStatusMessage(''), 3000);
//     }
//   };

//   const renderFileInfo = (file, type) => {
//     if (!file) return <span className="file-info">No file uploaded</span>;

//     // If new file selected (File object)
//     if (file instanceof File) {
//       if (type === 'photo' && file.type.startsWith('image/')) {
//         return <img src={URL.createObjectURL(file)} alt="Passport Preview" className="passport-preview" />;
//       } else {
//         return (
//           <div className="file-preview">
//             <span className="file-info">{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
//             <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer" className="view-link">View Document</a>
//           </div>
//         );
//       }
//     }

//     // If file is string (URL from backend)
//     if (typeof file === 'string') {
//       const isPDF = file.endsWith('.pdf');
//       if (type === 'photo' && !isPDF) {
//         return <img src={file} alt="Passport Preview" className="passport-preview" />;
//       }
//       return (
//         <a href={file} target="_blank" rel="noopener noreferrer" className="view-link">
//           View Uploaded {FILE_LABELS[type]}
//         </a>
//       );
//     }

//     return null;
//   };

//   return (
//     <AppLayout>
//       <div className="dashboard-container">
//         <h2 className="dashboard-title">Research Submission Dashboard</h2>

//         {statusMessage && (
//           <div className={`status-message ${statusMessage.includes('successfully') ? 'success' : 'error'}`}>
//             {statusMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="dashboard-form">
//           <input 
//             type="text" 
//             name="fullName" 
//             placeholder="Full Name" 
//             value={formData.fullName} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="typeOfResearch" 
//             placeholder="Type of Research" 
//             value={formData.typeOfResearch} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="title" 
//             placeholder="Title" 
//             value={formData.title} 
//             onChange={handleChange} 
//             required 
//           />

//           <select 
//             name="role" 
//             value={formData.role} 
//             onChange={handleChange} 
//             required
//           >
//             <option value="">Select Role</option>
//             {ROLE_OPTIONS.map(role => (
//               <option key={role} value={role}>{role}</option>
//             ))}
//           </select>

//           {/* File Uploads */}
//           {Object.keys(FILE_LABELS).map(key => (
//             <div className="file-upload" key={key}>
//               <h4 className="file-title">{FILE_LABELS[key]}</h4>
//               <input 
//                 type="file" 
//                 name={key} 
//                 accept={key === "photo" ? "image/*,application/pdf" : ".pdf"} 
//                 onChange={handleChange} 
//               />
//               {renderFileInfo(formData[key], key)}
//             </div>
//           ))}

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </AppLayout>
//   );
// };

// export default SubmitApplication;

















































// import React, { useState, useEffect } from 'react';
// import AppLayout from '../../components/layouts/AppLayout';
// import './SubmitApplication.css';

// const ROLE_OPTIONS = [
//   'Student',
//   'University',
//   'Institute',
//   'Independent'
// ];

// const FILE_LABELS = {
//   photo: "Passport Size Photo (Image/PDF)",
//   proposal: "Research Proposal (PDF)",
//   vice_president_form: "Form Vice President (PDF)",
//   ethical_form: "Ethical Clearance Form (PDF)"
// };

// const SubmitApplication = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     typeOfResearch: '',
//     title: '',
//     role: '',
//     photo: null,
//     proposal: null,
//     vice_president_form: null,
//     ethical_form: null
//   });

//   const [statusMessage, setStatusMessage] = useState('');

//   // Fetch uploaded files from backend on page load
//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/attachments/upload/");
//         if (!res.ok) throw new Error("Failed to fetch attachments");
//         const data = await res.json();

//         setFormData(prev => ({
//           ...prev,
//           photo: data.photo || null,
//           proposal: data.proposal || null,
//           vice_president_form: data.vice_president_form || null,
//           ethical_form: data.ethical_form || null,
//         }));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchFiles();
//   }, []);

//   const handleChange = (e) => {
//     const { name, files, value } = e.target;
//     if (files) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFiles = ['photo', 'proposal', 'vice_president_form', 'ethical_form'];
//     for (const file of requiredFiles) {
//       if (!formData[file]) {
//         setStatusMessage(`Please upload your ${FILE_LABELS[file]}`);
//         setTimeout(() => setStatusMessage(''), 3000);
//         return;
//       }
//     }

//     const data = new FormData();
//     for (const key in formData) {
//       if (formData[key] instanceof File) {
//         data.append(key, formData[key]);
//       }
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/attachments/upload/', {
//         method: 'POST',
//         body: data
//       });

//       if (!response.ok) throw new Error('Submission failed');

//       const result = await response.json();
//       setStatusMessage('Form submitted successfully!');
//       setTimeout(() => setStatusMessage(''), 3000);

//       console.log(result);

//       // Reset ONLY text fields
//       setFormData(prev => ({
//         ...prev,
//         fullName: '',
//         typeOfResearch: '',
//         title: '',
//         role: ''
//       }));
//     } catch (error) {
//       console.error(error);
//       setStatusMessage('Submission failed!');
//       setTimeout(() => setStatusMessage(''), 3000);
//     }
//   };

//   const renderFileInfo = (file, type) => {
//     if (!file) return <span className="file-info">No file uploaded</span>;

//     // If new file selected (File object)
//     if (file instanceof File) {
//       if (type === 'photo' && file.type.startsWith('image/')) {
//         return <img src={URL.createObjectURL(file)} alt="Passport Preview" className="passport-preview" />;
//       } else {
//         return (
//           <div className="file-preview">
//             <span className="file-info">{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
//             <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer" className="view-link">View Document</a>
//           </div>
//         );
//       }
//     }

//     // If file is string (URL from backend)
//     if (typeof file === 'string') {
//       const isPDF = file.endsWith('.pdf');
//       if (type === 'photo' && !isPDF) {
//         return <img src={file} alt="Passport Preview" className="passport-preview" />;
//       }
//       return (
//         <a href={file} target="_blank" rel="noopener noreferrer" className="view-link">
//           View Uploaded {FILE_LABELS[type]}
//         </a>
//       );
//     }

//     return null;
//   };

//   return (
//     <AppLayout>
//       <div className="dashboard-container">
//         <h2 className="dashboard-title">Research Submission Dashboard</h2>

//         {statusMessage && (
//           <div className={`status-message ${statusMessage.includes('successfully') ? 'success' : 'error'}`}>
//             {statusMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="dashboard-form">
//           <input 
//             type="text" 
//             name="fullName" 
//             placeholder="Full Name" 
//             value={formData.fullName} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="typeOfResearch" 
//             placeholder="Type of Research" 
//             value={formData.typeOfResearch} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="title" 
//             placeholder="Title" 
//             value={formData.title} 
//             onChange={handleChange} 
//             required 
//           />

//           <select 
//             name="role" 
//             value={formData.role} 
//             onChange={handleChange} 
//             required
//           >
//             <option value="">Select Role</option>
//             {ROLE_OPTIONS.map(role => (
//               <option key={role} value={role}>{role}</option>
//             ))}
//           </select>

//           {/* File Uploads */}
//           {Object.keys(FILE_LABELS).map(key => (
//             <div className="file-upload" key={key}>
//               <h4 className="file-title">{FILE_LABELS[key]}</h4>
//               <input 
//                 type="file" 
//                 name={key} 
//                 accept={key === "photo" ? "image/*,application/pdf" : ".pdf"} 
//                 onChange={handleChange} 
//               />
//               {renderFileInfo(formData[key], key)}
//             </div>
//           ))}

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </AppLayout>
//   );
// };

// export default SubmitApplication;





















// import React, { useState, useEffect } from 'react';   now
// import AppLayout from '../../components/layouts/AppLayout';
// import './SubmitApplication.css';

// const ROLE_OPTIONS = [
//   'Student',
//   'University',
//   'Institute',
//   'Independent'
// ];

// const FILE_LABELS = {
//   photo: "Passport Size Photo (Image/PDF)",
//   proposal: "Research Proposal (PDF)",
//   vice_president_form: "Form Vice President (PDF)",
//   ethical_form: "Ethical Clearance Form (PDF)"
// };

// const SubmitApplication = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     typeOfResearch: '',
//     title: '',
//     role: '',
//     photo: null,
//     proposal: null,
//     vice_president_form: null,
//     ethical_form: null
//   });

//   const [statusMessage, setStatusMessage] = useState('');

//   // Fetch uploaded files from backend on page load
//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/attachments/upload/");
//         if (!res.ok) throw new Error("Failed to fetch attachments");
//         const data = await res.json();

//         setFormData(prev => ({
//           ...prev,
//           photo: data.photo || null,
//           proposal: data.proposal || null,
//           vice_president_form: data.vice_president_form || null,
//           ethical_form: data.ethical_form || null,
//         }));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchFiles();
//   }, []);

//   const handleChange = (e) => {
//     const { name, files, value } = e.target;
//     if (files) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFiles = ['photo', 'proposal', 'vice_president_form', 'ethical_form'];
//     for (const file of requiredFiles) {
//       if (!formData[file]) {
//         setStatusMessage(`Please upload your ${FILE_LABELS[file]}`);
//         setTimeout(() => setStatusMessage(''), 3000);
//         return;
//       }
//     }

//     const data = new FormData();
//     for (const key in formData) {
//       if (formData[key] instanceof File) {
//         data.append(key, formData[key]);
//       }
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/attachments/upload/', {
//         method: 'POST',
//         body: data
//       });

//       if (!response.ok) throw new Error('Submission failed');

//       const result = await response.json();
//       setStatusMessage('Form submitted successfully!');
//       setTimeout(() => setStatusMessage(''), 3000);

//       console.log(result);

//       // Reset ONLY text fields
//       setFormData(prev => ({
//         ...prev,
//         fullName: '',
//         typeOfResearch: '',
//         title: '',
//         role: ''
//       }));
//     } catch (error) {
//       console.error(error);
//       setStatusMessage('Submission failed!');
//       setTimeout(() => setStatusMessage(''), 3000);
//     }
//   };

//   const renderFileInfo = (file, type) => {
//     if (!file) return <span className="file-info">No file uploaded</span>;

//     // If new file selected (File object)
//     if (file instanceof File) {
//       if (type === 'photo' && file.type.startsWith('image/')) {
//         return <img src={URL.createObjectURL(file)} alt="Passport Preview" className="passport-preview" />;
//       } else {
//         return (
//           <div className="file-preview">
//             <span className="file-info">{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
//             <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer" className="view-link">View Document</a>
//           </div>
//         );
//       }
//     }

//     // If file is string (URL from backend)
//     if (typeof file === 'string') {
//       const isPDF = file.endsWith('.pdf');
//       if (type === 'photo' && !isPDF) {
//         return <img src={file} alt="Passport Preview" className="passport-preview" />;
//       }
//       return (
//         <a href={file} target="_blank" rel="noopener noreferrer" className="view-link">
//           View Uploaded {FILE_LABELS[type]}
//         </a>
//       );
//     }

//     return null;
//   };

//   return (
//     <AppLayout>
//       <div className="dashboard-container">
//         <h2 className="dashboard-title">Research Submission Dashboard</h2>

//         {statusMessage && (
//           <div className={`status-message ${statusMessage.includes('successfully') ? 'success' : 'error'}`}>
//             {statusMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="dashboard-form">
//           <input 
//             type="text" 
//             name="fullName" 
//             placeholder="Full Name" 
//             value={formData.fullName} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="typeOfResearch" 
//             placeholder="Type of Research" 
//             value={formData.typeOfResearch} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="title" 
//             placeholder="Title" 
//             value={formData.title} 
//             onChange={handleChange} 
//             required 
//           />

//           <select 
//             name="role" 
//             value={formData.role} 
//             onChange={handleChange} 
//             required
//           >
//             <option value="">Select Role</option>
//             {ROLE_OPTIONS.map(role => (
//               <option key={role} value={role}>{role}</option>
//             ))}
//           </select>

//           {/* File Uploads */}
//           {Object.keys(FILE_LABELS).map(key => (
//             <div className="file-upload" key={key}>
//               <h4 className="file-title">{FILE_LABELS[key]}</h4>
//               <input 
//                 type="file" 
//                 name={key} 
//                 accept={key === "photo" ? "image/*,application/pdf" : ".pdf"} 
//                 onChange={handleChange} 
//               />
//               {renderFileInfo(formData[key], key)}
//             </div>
//           ))}

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </AppLayout>
//   );
// };

// export default SubmitApplication;



























































import React, { useState, useEffect } from 'react';
import AppLayout from '../../components/layouts/AppLayout';
import './SubmitApplication.css';

const ROLE_OPTIONS = [
  'Student',
  'University',
  'Institute',
  'Independent'
];

const FILE_LABELS = {
  photo: "Passport Size Photo (Image/PDF)",
  proposal: "Research Proposal (PDF)",
  vice_president_form: "Form Vice President (PDF)",
  ethical_form: "Ethical Clearance Form (PDF)"
};

// Helper to get JWT token (adjust as needed)
const getToken = () => localStorage.getItem('accessToken');

const SubmitApplication = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    typeOfResearch: '',
    title: '',
    role: '',
    photo: null,
    proposal: null,
    vice_president_form: null,
    ethical_form: null
  });

  const [statusMessage, setStatusMessage] = useState('');

  // Fetch uploaded files from backend on page load
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/attachments/upload/", {
          headers: {
            'Authorization': 'Bearer ' + getToken()
          }
        });
        if (!res.ok) throw new Error("Failed to fetch attachments");
        const data = await res.json();

        setFormData(prev => ({
          ...prev,
          photo: data.photo || null,
          proposal: data.proposal || null,
          vice_president_form: data.vice_president_form || null,
          ethical_form: data.ethical_form || null,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchFiles();
  }, []);

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFiles = ['photo', 'proposal', 'vice_president_form', 'ethical_form'];
    for (const file of requiredFiles) {
      if (!formData[file]) {
        setStatusMessage(`Please upload your ${FILE_LABELS[file]}`);
        setTimeout(() => setStatusMessage(''), 3000);
        return;
      }
    }

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] instanceof File) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('http://localhost:8000/api/attachments/upload/', {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': 'Bearer ' + getToken()
        }
      });

      if (!response.ok) throw new Error('Submission failed');

      const result = await response.json();
      setStatusMessage('Form submitted successfully!');
      setTimeout(() => setStatusMessage(''), 3000);

      console.log(result);

      // Reset ONLY text fields
      setFormData(prev => ({
        ...prev,
        fullName: '',
        typeOfResearch: '',
        title: '',
        role: ''
      }));
    } catch (error) {
      console.error(error);
      setStatusMessage('Submission failed!');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const renderFileInfo = (file, type) => {
    if (!file) return <span className="file-info">No file uploaded</span>;

    // If new file selected (File object)
    if (file instanceof File) {
      if (type === 'photo' && file.type.startsWith('image/')) {
        return <img src={URL.createObjectURL(file)} alt="Passport Preview" className="passport-preview" />;
      } else {
        return (
          <div className="file-preview">
            <span className="file-info">{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
            <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer" className="view-link">View Document</a>
          </div>
        );
      }
    }

    // If file is string (URL from backend)
    if (typeof file === 'string') {
      const isPDF = file.endsWith('.pdf');
      if (type === 'photo' && !isPDF) {
        return <img src={file} alt="Passport Preview" className="passport-preview" />;
      }
      return (
        <a href={file} target="_blank" rel="noopener noreferrer" className="view-link">
          View Uploaded {FILE_LABELS[type]}
        </a>
      );
    }

    return null;
  };

  return (
    <AppLayout>
      <div className="dashboard-container">
        <h2 className="dashboard-title">Research Submission Dashboard</h2>

        {statusMessage && (
          <div className={`status-message ${statusMessage.includes('successfully') ? 'success' : 'error'}`}>
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="dashboard-form">
          <input 
            type="text" 
            name="fullName" 
            placeholder="Full Name" 
            value={formData.fullName} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="typeOfResearch" 
            placeholder="Type of Research" 
            value={formData.typeOfResearch} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="title" 
            placeholder="Title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />

          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Role</option>
            {ROLE_OPTIONS.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          {/* File Uploads */}
          {Object.keys(FILE_LABELS).map(key => (
            <div className="file-upload" key={key}>
              <h4 className="file-title">{FILE_LABELS[key]}</h4>
              <input 
                type="file" 
                name={key} 
                accept={key === "photo" ? "image/*,application/pdf" : ".pdf"} 
                onChange={handleChange} 
              />
              {renderFileInfo(formData[key], key)}
            </div>
          ))}

          <button type="submit">Submit</button>
        </form>
      </div>
    </AppLayout>
  );
};

export default SubmitApplication;







































