




// // OfficerDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import AppLayout from "../../components/layouts/AppLayout";                
// import {
//   Container, Paper, Typography, Box, Grid, Button, Chip, Divider,
//   Dialog, DialogTitle, DialogContent, DialogActions, TextField,
//   Alert, Snackbar, CircularProgress, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, TablePagination, IconButton,
//   List, ListItem, ListItemText, ListItemIcon
// } from '@mui/material';
// import {
//   Visibility as ViewIcon,
//   CheckCircle as ApproveIcon,
//   Cancel as RejectIcon,
//   Download as DownloadIcon,
//   Description as DocumentIcon,
//   PictureAsPdf as CertificateIcon,
//   Delete as DeleteIcon
// } from '@mui/icons-material';
// import './OfficerDashboard.css';

// const API_BASE_URL = 'http://127.0.0.1:8000';

// const OfficerDashboard = () => {
//   const [applications, setApplications] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [appToDelete, setAppToDelete] = useState(null);
//   const [feedback, setFeedback] = useState('');
//   const [actionType, setActionType] = useState('');
//   const [message, setMessage] = useState({ text: '', severity: 'info' });
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [viewedDocs, setViewedDocs] = useState([]);

//   const getAuthHeaders = () => ({
//     'Authorization': `Bearer ${localStorage.getItem('access')}`,
//     'Content-Type': 'application/json'
//   });

//   useEffect(() => { fetchApplications(); }, []);

//   const fetchApplications = () => {
//     setLoading(true);
//     fetch(`${API_BASE_URL}/api/applications/`, { headers: getAuthHeaders() })
//       .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch applications'))
//       .then(data => {
//         setApplications(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setMessage({ text: 'Failed to load applications', severity: 'error' });
//         setLoading(false);
//       });
//   };

//   const handleViewApplication = (application) => {
//     setSelectedApplication(application);
//     setDialogOpen(true);
//     setActionType('');
//     setFeedback('');
//     setViewedDocs([]);

//     fetch(`${API_BASE_URL}/api/applications/${application.id}/attachments/`, { headers: getAuthHeaders() })
//       .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch attachments'))
//       .then(data => {
//         setSelectedApplication(prev => ({ ...prev, attachments: data }));
//       })
//       .catch(err => console.error(err));
//   };

//   const handleAction = (type) => {
//     setActionType(type);
//     setFeedback('');
//   };

//   const submitAction = () => {
//     if (!selectedApplication || !actionType) return;

//     const url = `${API_BASE_URL}/api/applications/${selectedApplication.id}/${actionType === 'approve' ? 'approve' : 'reject'}/`;

//     fetch(url, {
//       method: 'POST',
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ feedback })
//     })
//       .then(async res => {
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || 'Action failed');
//         return data;
//       })
//       .then(() => {
//         setMessage({ text: `Application ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`, severity: 'success' });
//         setDialogOpen(false);
//         setSelectedApplication(null);
//         setActionType('');
//         setFeedback('');
//         setViewedDocs([]);
//         fetchApplications();
//       })
//       .catch(err => setMessage({ text: err.message || 'Action failed', severity: 'error' }));
//   };

//   const handleDownload = (attachment) => {
//     if (attachment.file_url) {
//       const link = document.createElement('a');
//       link.href = attachment.file_url;
//       link.download = attachment.original_filename || attachment.file_url.split('/').pop();
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       setViewedDocs(prev => [...new Set([...prev, attachment.id])]);
//     } else {
//       setMessage({ text: 'Attachment URL not available', severity: 'error' });
//     }
//   };

//   const handleView = (attachment) => {
//     if (attachment.file_url) {
//       window.open(attachment.file_url, '_blank');
//       setViewedDocs(prev => [...new Set([...prev, attachment.id])]);
//     } else {
//       setMessage({ text: 'Attachment URL not available', severity: 'error' });
//     }
//   };

//   const handleGenerateCertificate = (applicationId) => {
//     fetch(`${API_BASE_URL}/api/applications/${applicationId}/certificate/`, {
//       method: 'GET',
//       headers: getAuthHeaders(),
//     })
//       .then(async res => {
//         if (!res.ok) {
//           const data = await res.json();
//           throw new Error(data.error || "Failed to generate certificate");
//         }
//         return res.blob();
//       })
//       .then(blob => {
//         const url = window.URL.createObjectURL(new Blob([blob]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', `certificate_${applicationId}.pdf`);
//         document.body.appendChild(link);
//         link.click();
//         link.parentNode.removeChild(link);

//         setMessage({ text: 'Certificate downloaded successfully', severity: 'success' });
//       })
//       .catch(err => {
//         console.error(err);
//         setMessage({ text: err.message || 'Failed to generate certificate', severity: 'error' });
//       });
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedApplication(null);
//     setActionType('');
//     setFeedback('');
//     setViewedDocs([]);
//   };

//   const handleCloseSnackbar = () => setMessage({ text: '', severity: 'info' });

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredApplications = filterStatus === 'All'
//     ? applications
//     : applications.filter(app => app.status === filterStatus);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Pending': return 'warning';
//       case 'Approved': return 'success';
//       case 'Rejected': return 'error';
//       case 'Draft': return 'default';
//       default: return 'default';
//     }
//   };

//   // Confirm delete popup
//   const confirmDelete = (applicationId) => {
//     setAppToDelete(applicationId);
//     setDeleteDialogOpen(true);
//   };

//   const handleDelete = () => {
//     if (!appToDelete) return;

//     setLoading(true);
//     fetch(`${API_BASE_URL}/api/applications/${appToDelete}/`, {
//       method: 'DELETE',
//       headers: getAuthHeaders(),
//     })
//       .then(res => {
//         if (res.ok) {
//           setApplications(prev => prev.filter(app => app.id !== appToDelete));
//           setMessage({ text: 'Application deleted successfully', severity: 'success' });
//           setDialogOpen(false);
//         } else {
//           throw new Error('Failed to delete application');
//         }
//       })
//       .catch(err => setMessage({ text: err.message || 'Error deleting application', severity: 'error' }))
//       .finally(() => {
//         setLoading(false);
//         setDeleteDialogOpen(false);
//         setAppToDelete(null);
//       });
//   };

//   if (loading) return (
//     <AppLayout>
//       <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
//         <CircularProgress />
//       </Container>
//     </AppLayout>
//   );

//   return (
//     <AppLayout>
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h4" gutterBottom>Application Review Dashboard</Typography>

//           <Box sx={{ mb: 3 }}>
//             <Typography variant="h6">Filter by Status</Typography>
//             <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//               {['All','Pending','Approved','Rejected','Draft'].map(status => (
//                 <Chip key={status} label={status} onClick={() => setFilterStatus(status)}
//                   color={filterStatus===status?'primary':'default'}
//                   variant={filterStatus===status?'filled':'outlined'} />
//               ))}
//             </Box>
//           </Box>

//           <Divider sx={{ mb: 3 }} />

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Title</TableCell>
//                   <TableCell>Researcher</TableCell>
//                   <TableCell>Research Type</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Submitted At</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredApplications.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map(app => (
//                   <TableRow key={app.id}>
//                     <TableCell>{app.id}</TableCell>
//                     <TableCell>{app.title}</TableCell>
//                     <TableCell>{app.researcher_name || app.researcher}</TableCell>
//                     <TableCell>{app.research_type}</TableCell>
//                     <TableCell>
//                       <Chip label={app.status} color={getStatusColor(app.status)} size="small" />
//                     </TableCell>
//                     <TableCell>{app.submitted_at ? new Date(app.submitted_at).toLocaleString() : 'Not submitted'}</TableCell>
//                     <TableCell>
//                       <IconButton color="primary" onClick={() => handleViewApplication(app)}>
//                         <ViewIcon />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => confirmDelete(app.id)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={filteredApplications.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>

//         {/* Application Details Dialog */}
//         <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//           <DialogTitle>Application Details: {selectedApplication?.title}</DialogTitle>
//           <DialogContent dividers>
//             {selectedApplication && (
//               <Box>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="subtitle2">Research Type</Typography>
//                     <Typography>{selectedApplication.research_type}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="subtitle2">Status</Typography>
//                     <Chip label={selectedApplication.status} color={getStatusColor(selectedApplication.status)} />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle2">Attachments</Typography>
//                     {selectedApplication.attachments && selectedApplication.attachments.length > 0 ? (
//                       <List>
//                         {selectedApplication.attachments.map(att => (
//                           <ListItem key={att.id}
//                             secondaryAction={
//                               <Box sx={{ display: 'flex', gap: 1 }}>
//                                 <IconButton onClick={() => handleDownload(att)}>
//                                   <DownloadIcon />
//                                 </IconButton>
//                                 <IconButton onClick={() => handleView(att)}>
//                                   <ViewIcon />
//                                 </IconButton>
//                               </Box>
//                             }
//                           >
//                             <ListItemIcon><DocumentIcon /></ListItemIcon>
//                             <ListItemText primary={att.file_type} secondary={att.original_filename || att.file_url.split('/').pop()} />
//                           </ListItem>
//                         ))}
//                       </List>
//                     ) : (<Typography>No attachments available</Typography>)}
//                   </Grid>

//                   {/* Certificate section */}
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle2">Certificate</Typography>
//                     {selectedApplication.status === 'Approved' ? (
//                       <Button
//                         variant="contained"
//                         color="secondary"
//                         startIcon={<CertificateIcon />}
//                         onClick={() => handleGenerateCertificate(selectedApplication.id)}
//                       >
//                         Download Certificate
//                       </Button>
//                     ) : (
//                       <Typography>Certificate available only after approval</Typography>
//                     )}
//                   </Grid>

//                   {/* Approve / Reject buttons */}
//                   {selectedApplication.status === 'Pending' && (
//                     <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2 }}>
//                       <Button
//                         variant="contained"
//                         color="success"
//                         startIcon={<ApproveIcon />}
//                         onClick={() => handleAction('approve')}
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         startIcon={<RejectIcon />}
//                         onClick={() => handleAction('reject')}
//                       >
//                         Reject
//                       </Button>
//                     </Grid>
//                   )}

//                   {/* Feedback input */}
//                   {actionType && (
//                     <Grid item xs={12} sx={{ mt: 2 }}>
//                       <TextField
//                         label={actionType === 'reject' ? "Feedback for rejection" : "Officer Feedback (appears on certificate)"}
//                         fullWidth
//                         multiline
//                         rows={3}
//                         value={feedback}
//                         onChange={(e) => setFeedback(e.target.value)}
//                       />
//                       <Box sx={{ mt: 2 }}>
//                         <Button variant="contained" color="primary" onClick={submitAction}>
//                           {actionType === 'reject' ? "Submit Rejection" : "Confirm Approval"}
//                         </Button>
//                       </Box>
//                     </Grid>
//                   )}

//                 </Grid>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDialog}>Close</Button>
//             <Button color="error" startIcon={<DeleteIcon />} onClick={() => confirmDelete(selectedApplication?.id)}>
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Delete Confirmation Dialog */}
//         <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             <Typography>Are you sure you want to delete this application?</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
//             <Button onClick={handleDelete} color="error">Yes</Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar
//           open={!!message.text}
//           autoHideDuration={4000}
//           onClose={handleCloseSnackbar}
//         >
//           <Alert severity={message.severity} sx={{ width: '100%' }}>
//             {message.text}
//           </Alert>
//         </Snackbar>
//       </Container>
//     </AppLayout>
//   );
// };

// export default OfficerDashboard;




























// // OfficerDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import AppLayout from "../../components/layouts/AppLayout";                
// import {
//   Container, Paper, Typography, Box, Grid, Button, Chip, Divider,
//   Dialog, DialogTitle, DialogContent, DialogActions, TextField,
//   Alert, Snackbar, CircularProgress, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, TablePagination, IconButton,
//   List, ListItem, ListItemText, ListItemIcon
// } from '@mui/material';
// import {
//   Visibility as ViewIcon,
//   CheckCircle as ApproveIcon,
//   Cancel as RejectIcon,
//   Download as DownloadIcon,
//   Description as DocumentIcon,
//   PictureAsPdf as CertificateIcon,
// } from '@mui/icons-material';
// import './OfficerDashboard.css';

// const API_BASE_URL = 'http://127.0.0.1:8000';

// const OfficerDashboard = () => {
//   const [applications, setApplications] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [feedback, setFeedback] = useState('');
//   const [actionType, setActionType] = useState('');
//   const [message, setMessage] = useState({ text: '', severity: 'info' });
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [viewedDocs, setViewedDocs] = useState([]);

//   const getAuthHeaders = () => ({
//     'Authorization': `Bearer ${localStorage.getItem('access')}`,
//     'Content-Type': 'application/json'
//   });

//   useEffect(() => { fetchApplications(); }, []);

//   const fetchApplications = () => {
//     setLoading(true);
//     fetch(`${API_BASE_URL}/api/applications/`, { headers: getAuthHeaders() })
//       .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch applications'))
//       .then(data => {
//         setApplications(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setMessage({ text: 'Failed to load applications', severity: 'error' });
//         setLoading(false);
//       });
//   };

//   const handleViewApplication = (application) => {
//     setSelectedApplication(application);
//     setDialogOpen(true);
//     setActionType('');
//     setFeedback('');
//     setViewedDocs([]);

//     fetch(`${API_BASE_URL}/api/applications/${application.id}/attachments/`, { headers: getAuthHeaders() })
//       .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch attachments'))
//       .then(data => {
//         setSelectedApplication(prev => ({ ...prev, attachments: data }));
//       })
//       .catch(err => console.error(err));
//   };

//   const handleAction = (type) => {
//     setActionType(type);
//     setFeedback('');
//   };

//   const submitAction = () => {
//     if (!selectedApplication || !actionType) return;

//     const url = `${API_BASE_URL}/api/applications/${selectedApplication.id}/${actionType === 'approve' ? 'approve' : 'reject'}/`;

//     fetch(url, {
//       method: 'POST',
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ feedback })
//     })
//       .then(async res => {
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || 'Action failed');
//         return data;
//       })
//       .then(() => {
//         setMessage({ text: `Application ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`, severity: 'success' });
//         setDialogOpen(false);
//         setSelectedApplication(null);
//         setActionType('');
//         setFeedback('');
//         setViewedDocs([]);
//         fetchApplications();
//       })
//       .catch(err => setMessage({ text: err.message || 'Action failed', severity: 'error' }));
//   };

//   const handleDownload = (attachment) => {
//     if (attachment.file_url) {
//       const link = document.createElement('a');
//       link.href = attachment.file_url;
//       link.download = attachment.original_filename || attachment.file_url.split('/').pop();
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       setViewedDocs(prev => [...new Set([...prev, attachment.id])]);
//     } else {
//       setMessage({ text: 'Attachment URL not available', severity: 'error' });
//     }
//   };

//   const handleView = (attachment) => {
//     if (attachment.file_url) {
//       window.open(attachment.file_url, '_blank');
//       setViewedDocs(prev => [...new Set([...prev, attachment.id])]);
//     } else {
//       setMessage({ text: 'Attachment URL not available', severity: 'error' });
//     }
//   };

//   const handleGenerateCertificate = (applicationId) => {
//     fetch(`${API_BASE_URL}/api/applications/${applicationId}/certificate/`, {
//       method: 'GET',
//       headers: getAuthHeaders(),
//     })
//       .then(async res => {
//         if (!res.ok) {
//           const data = await res.json();
//           throw new Error(data.error || "Failed to generate certificate");
//         }
//         return res.blob();
//       })
//       .then(blob => {
//         const url = window.URL.createObjectURL(new Blob([blob]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', `certificate_${applicationId}.pdf`);
//         document.body.appendChild(link);
//         link.click();
//         link.parentNode.removeChild(link);

//         setMessage({ text: 'Certificate downloaded successfully', severity: 'success' });
//       })
//       .catch(err => {
//         console.error(err);
//         setMessage({ text: err.message || 'Failed to generate certificate', severity: 'error' });
//       });
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedApplication(null);
//     setActionType('');
//     setFeedback('');
//     setViewedDocs([]);
//   };

//   const handleCloseSnackbar = () => setMessage({ text: '', severity: 'info' });

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredApplications = filterStatus === 'All'
//     ? applications
//     : applications.filter(app => app.status === filterStatus);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Pending': return 'warning';
//       case 'Approved': return 'success';
//       case 'Rejected': return 'error';
//       case 'Draft': return 'default';
//       default: return 'default';
//     }
//   };

//   if (loading) return (
//     <AppLayout>
//       <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
//         <CircularProgress />
//       </Container>
//     </AppLayout>
//   );

//   return (
//     <AppLayout>
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h4" gutterBottom>Application Review Dashboard</Typography>

//           <Box sx={{ mb: 3 }}>
//             <Typography variant="h6">Filter by Status</Typography>
//             <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//               {['All','Pending','Approved','Rejected','Draft'].map(status => (
//                 <Chip key={status} label={status} onClick={() => setFilterStatus(status)}
//                   color={filterStatus===status?'primary':'default'}
//                   variant={filterStatus===status?'filled':'outlined'} />
//               ))}
//             </Box>
//           </Box>

//           <Divider sx={{ mb: 3 }} />

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Title</TableCell>
//                   <TableCell>Researcher</TableCell>
//                   <TableCell>Research Type</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Submitted At</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredApplications.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map(app => (
//                   <TableRow key={app.id}>
//                     <TableCell>{app.id}</TableCell>
//                     <TableCell>{app.title}</TableCell>
//                     <TableCell>{app.researcher_name || app.researcher}</TableCell>
//                     <TableCell>{app.research_type}</TableCell>
//                     <TableCell>
//                       <Chip label={app.status} color={getStatusColor(app.status)} size="small" />
//                     </TableCell>
//                     <TableCell>{app.submitted_at ? new Date(app.submitted_at).toLocaleString() : 'Not submitted'}</TableCell>
//                     <TableCell>
//                       <IconButton color="primary" onClick={() => handleViewApplication(app)}>
//                         <ViewIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={filteredApplications.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>

//         {/* Application Details Dialog */}
//         <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//           <DialogTitle>Application Details: {selectedApplication?.title}</DialogTitle>
//           <DialogContent dividers>
//             {selectedApplication && (
//               <Box>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="subtitle2">Research Type</Typography>
//                     <Typography>{selectedApplication.research_type}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="subtitle2">Status</Typography>
//                     <Chip label={selectedApplication.status} color={getStatusColor(selectedApplication.status)} />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle2">Attachments</Typography>
//                     {selectedApplication.attachments && selectedApplication.attachments.length > 0 ? (
//                       <List>
//                         {selectedApplication.attachments.map(att => (
//                           <ListItem key={att.id}
//                             secondaryAction={
//                               <Box sx={{ display: 'flex', gap: 1 }}>
//                                 <IconButton onClick={() => handleDownload(att)}>
//                                   <DownloadIcon />
//                                 </IconButton>
//                                 <IconButton onClick={() => handleView(att)}>
//                                   <ViewIcon />
//                                 </IconButton>
//                               </Box>
//                             }
//                           >
//                             <ListItemIcon><DocumentIcon /></ListItemIcon>
//                             <ListItemText primary={att.file_type} secondary={att.original_filename || att.file_url.split('/').pop()} />
//                           </ListItem>
//                         ))}
//                       </List>
//                     ) : (<Typography>No attachments available</Typography>)}
//                   </Grid>

//                   {/* Certificate section */}
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle2">Certificate</Typography>
//                     {selectedApplication.status === 'Approved' ? (
//                       <Button
//                         variant="contained"
//                         color="secondary"
//                         startIcon={<CertificateIcon />}
//                         onClick={() => handleGenerateCertificate(selectedApplication.id)}
//                       >
//                         Download Certificate
//                       </Button>
//                     ) : (
//                       <Typography>Certificate available only after approval</Typography>
//                     )}
//                   </Grid>

//                   {/* Approve / Reject buttons */}
//                   {selectedApplication.status === 'Pending' && (
//                     <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2 }}>
//                       <Button
//                         variant="contained"
//                         color="success"
//                         startIcon={<ApproveIcon />}
//                         onClick={() => handleAction('approve')}
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         startIcon={<RejectIcon />}
//                         onClick={() => handleAction('reject')}
//                       >
//                         Reject
//                       </Button>
//                     </Grid>
//                   )}

//                   {/* Feedback input */}
//                   {actionType && (
//                     <Grid item xs={12} sx={{ mt: 2 }}>
//                       <TextField
//                         label={actionType === 'reject' ? "Feedback for rejection" : "Officer Feedback (appears on certificate)"}
//                         fullWidth
//                         multiline
//                         rows={3}
//                         value={feedback}
//                         onChange={(e) => setFeedback(e.target.value)}
//                       />
//                       <Box sx={{ mt: 2 }}>
//                         <Button variant="contained" color="primary" onClick={submitAction}>
//                           {actionType === 'reject' ? "Submit Rejection" : "Confirm Approval"}
//                         </Button>
//                       </Box>
//                     </Grid>
//                   )}

//                 </Grid>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDialog}>Close</Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar
//           open={!!message.text}
//           autoHideDuration={4000}
//           onClose={handleCloseSnackbar}
//         >
//           <Alert severity={message.severity} sx={{ width: '100%' }}>
//             {message.text}
//           </Alert>
//         </Snackbar>
//       </Container>
//     </AppLayout>
//   );
// };

// export default OfficerDashboard;












// OfficerDashboard.jsx
import React, { useState, useEffect } from 'react';
import AppLayout from "../../components/layouts/AppLayout";                
import {
  Container, Paper, Typography, Box, Grid, Button, Chip, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Alert, Snackbar, CircularProgress, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TablePagination, IconButton,
  List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';
import {
  Visibility as ViewIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Download as DownloadIcon,
  Description as DocumentIcon,
  PictureAsPdf as CertificateIcon,
} from '@mui/icons-material';
import './OfficerDashboard.css';

const API_BASE_URL = 'http://127.0.0.1:8000';

const OfficerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [actionType, setActionType] = useState('');
  const [message, setMessage] = useState({ text: '', severity: 'info' });
  const [filterStatus, setFilterStatus] = useState('All');
  const [viewedDocs, setViewedDocs] = useState([]);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('access')}`,
    'Content-Type': 'application/json'
  });

  useEffect(() => { fetchApplications(); }, []);

  const fetchApplications = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/applications/`, { headers: getAuthHeaders() })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch applications'))
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessage({ text: 'Failed to load applications', severity: 'error' });
        setLoading(false);
      });
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setDialogOpen(true);
    setActionType('');
    setFeedback('');
    setViewedDocs([]);

    fetch(`${API_BASE_URL}/api/applications/${application.id}/attachments/`, { headers: getAuthHeaders() })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch attachments'))
      .then(data => {
        setSelectedApplication(prev => ({ ...prev, attachments: data }));
      })
      .catch(err => console.error(err));
  };

  const handleAction = (type) => {
    setActionType(type);
    setFeedback('');
  };

  const submitAction = () => {
    if (!selectedApplication || !actionType) return;

    const url = `${API_BASE_URL}/api/applications/${selectedApplication.id}/${actionType === 'approve' ? 'approve' : 'reject'}/`;

    fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ feedback })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Action failed');
        return data;
      })
      .then(() => {
        setMessage({ text: `Application ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`, severity: 'success' });
        setDialogOpen(false);
        setSelectedApplication(null);
        setActionType('');
        setFeedback('');
        setViewedDocs([]);
        fetchApplications();
      })
      .catch(err => setMessage({ text: err.message || 'Action failed', severity: 'error' }));
  };

  const handleDownload = (attachment) => {
    if (attachment.file_url) {
      const link = document.createElement('a');
      link.href = attachment.file_url;
      link.download = attachment.original_filename || attachment.file_url.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setViewedDocs(prev => [...new Set([...prev, attachment.id])]);
    } else {
      setMessage({ text: 'Attachment URL not available', severity: 'error' });
    }
  };

  const handleView = (attachment) => {
    if (attachment.file_url) {
      window.open(attachment.file_url, '_blank');
      setViewedDocs(prev => [...new Set([...prev, attachment.id])]);
    } else {
      setMessage({ text: 'Attachment URL not available', severity: 'error' });
    }
  };

  const handleGenerateCertificate = (applicationId) => {
    const url = `${API_BASE_URL}/api/applications/${applicationId}/certificate/`;

    fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    })
      .then(async res => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch certificate");
        }
        return res.blob();
      })
      .then(blob => {
        const urlBlob = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');

        // Role check
        const userRole = localStorage.getItem('role') || 'Officer'; // adjust if stored elsewhere
        const filename = userRole === 'Officer'
          ? `certificate_officer_${applicationId}.pdf`
          : `certificate_online_${applicationId}.pdf`;

        link.href = urlBlob;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        setMessage({ text: 'Certificate downloaded successfully', severity: 'success' });
      })
      .catch(err => {
        console.error(err);
        setMessage({ text: err.message || 'Failed to download certificate', severity: 'error' });
      });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedApplication(null);
    setActionType('');
    setFeedback('');
    setViewedDocs([]);
  };

  const handleCloseSnackbar = () => setMessage({ text: '', severity: 'info' });

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredApplications = filterStatus === 'All'
    ? applications
    : applications.filter(app => app.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Approved': return 'success';
      case 'Rejected': return 'error';
      case 'Draft': return 'default';
      default: return 'default';
    }
  };

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
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>Application Review Dashboard</Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Filter by Status</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['All','Pending','Approved','Rejected','Draft'].map(status => (
                <Chip key={status} label={status} onClick={() => setFilterStatus(status)}
                  color={filterStatus===status?'primary':'default'}
                  variant={filterStatus===status?'filled':'outlined'} />
              ))}
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Researcher</TableCell>
                  <TableCell>Research Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Submitted At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredApplications.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map(app => (
                  <TableRow key={app.id}>
                    <TableCell>{app.id}</TableCell>
                    <TableCell>{app.title}</TableCell>
                    <TableCell>{app.researcher_name || app.researcher}</TableCell>
                    <TableCell>{app.research_type}</TableCell>
                    <TableCell>
                      <Chip label={app.status} color={getStatusColor(app.status)} size="small" />
                    </TableCell>
                    <TableCell>{app.submitted_at ? new Date(app.submitted_at).toLocaleString() : 'Not submitted'}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleViewApplication(app)}>
                        <ViewIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredApplications.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Application Details Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>Application Details: {selectedApplication?.title}</DialogTitle>
          <DialogContent dividers>
            {selectedApplication && (
              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Research Type</Typography>
                    <Typography>{selectedApplication.research_type}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Status</Typography>
                    <Chip label={selectedApplication.status} color={getStatusColor(selectedApplication.status)} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Attachments</Typography>
                    {selectedApplication.attachments && selectedApplication.attachments.length > 0 ? (
                      <List>
                        {selectedApplication.attachments.map(att => (
                          <ListItem key={att.id}
                            secondaryAction={
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton onClick={() => handleDownload(att)}>
                                  <DownloadIcon />
                                </IconButton>
                                <IconButton onClick={() => handleView(att)}>
                                  <ViewIcon />
                                </IconButton>
                              </Box>
                            }
                          >
                            <ListItemIcon><DocumentIcon /></ListItemIcon>
                            <ListItemText primary={att.file_type} secondary={att.original_filename || att.file_url.split('/').pop()} />
                          </ListItem>
                        ))}
                      </List>
                    ) : (<Typography>No attachments available</Typography>)}
                  </Grid>

                  {/* Certificate section */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Certificate</Typography>
                    {selectedApplication.status === 'Approved' ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<CertificateIcon />}
                        onClick={() => handleGenerateCertificate(selectedApplication.id)}
                      >
                        Download Certificate
                      </Button>
                    ) : (
                      <Typography>Certificate available only after approval</Typography>
                    )}
                  </Grid>

                  {/* Approve / Reject buttons */}
                  {selectedApplication.status === 'Pending' && (
                    <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<ApproveIcon />}
                        onClick={() => handleAction('approve')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<RejectIcon />}
                        onClick={() => handleAction('reject')}
                      >
                        Reject
                      </Button>
                    </Grid>
                  )}

                  {/* Feedback input */}
                  {actionType && (
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <TextField
                        label={actionType === 'reject' ? "Feedback for rejection" : "Officer Feedback (appears on certificate)"}
                        fullWidth
                        multiline
                        rows={3}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                      <Box sx={{ mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={submitAction}>
                          {actionType === 'reject' ? "Submit Rejection" : "Confirm Approval"}
                        </Button>
                      </Box>
                    </Grid>
                  )}

                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={!!message.text}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity={message.severity} sx={{ width: '100%' }}>
            {message.text}
          </Alert>
        </Snackbar>
      </Container>
    </AppLayout>
  );
};

export default OfficerDashboard;
