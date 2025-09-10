// import React, { useState, useEffect } from 'react';
// import AppLayout from "../../components/layouts/AppLayout";
// import {
//   Container, Paper, Typography, Box, Grid, Card, CardContent,
//   Button, Chip, Divider, Dialog, DialogTitle, DialogContent,
//   DialogActions, TextField, Alert, Snackbar, CircularProgress,
//   Table, TableBody, TableCell, TableContainer, TableHead,
//   TableRow, TablePagination, IconButton, Accordion,
//   AccordionSummary, AccordionDetails, List, ListItem,
//   ListItemText, ListItemIcon
// } from '@mui/material';
// import {
//   Visibility as ViewIcon,
//   CheckCircle as ApproveIcon,
//   Cancel as RejectIcon,
//   Download as DownloadIcon,
//   ExpandMore as ExpandMoreIcon,
//   Description as DocumentIcon
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

//   // Get auth headers
//   const getAuthHeaders = () => ({
//     'Authorization': `Bearer ${localStorage.getItem('access')}`,
//     'Content-Type': 'application/json'
//   });

//   // Fetch applications
//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const fetchApplications = () => {
//     setLoading(true);
//     fetch(`${API_BASE_URL}/api/applications/`, {
//       headers: getAuthHeaders()
//     })
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch applications');
//         return res.json();
//       })
//       .then(data => {
//         setApplications(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error:', err);
//         setMessage({ text: 'Failed to load applications', severity: 'error' });
//         setLoading(false);
//       });
//   };

//   const handleViewApplication = (application) => {
//     setSelectedApplication(application);
//     setDialogOpen(true);
//   };

//   const handleAction = (type) => {
//     setActionType(type);
//     setFeedback('');
//   };

//   const submitAction = () => {
//     if (!selectedApplication) return;

//     const url = `${API_BASE_URL}/api/applications/${selectedApplication.id}/${actionType === 'approve' ? 'approve' : 'reject'}/`;
    
//     fetch(url, {
//       method: 'POST',
//       headers: getAuthHeaders(),
//       body: actionType === 'reject' ? JSON.stringify({ feedback }) : null
//     })
//       .then(res => {
//         if (!res.ok) throw new Error('Action failed');
//         return res.json();
//       })
//       .then(() => {
//         setMessage({ 
//           text: `Application ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`, 
//           severity: 'success' 
//         });
//         setDialogOpen(false);
//         setSelectedApplication(null);
//         fetchApplications(); // Refresh the list
//       })
//       .catch(err => {
//         console.error('Error:', err);
//         setMessage({ text: 'Action failed', severity: 'error' });
//       });
//   };

//   const handleDownload = (attachment) => {
//     // This would typically redirect to the file download URL
//     window.open(attachment.file_path, '_blank');
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedApplication(null);
//     setActionType('');
//     setFeedback('');
//   };

//   const handleCloseSnackbar = () => {
//     setMessage({ text: '', severity: 'info' });
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

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

//   if (loading) {
//     return (
//       <AppLayout>
//         <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
//           <CircularProgress />
//         </Container>
//       </AppLayout>
//     );
//   }

//   return (
//     <AppLayout>
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h4" gutterBottom>
//             Application Review Dashboard
//           </Typography>
          
//           <Box sx={{ mb: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Filter by Status
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//               {['All', 'Pending', 'Approved', 'Rejected', 'Draft'].map(status => (
//                 <Chip
//                   key={status}
//                   label={status}
//                   onClick={() => setFilterStatus(status)}
//                   color={filterStatus === status ? 'primary' : 'default'}
//                   variant={filterStatus === status ? 'filled' : 'outlined'}
//                 />
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
//                   <TableCell>Year</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Submitted At</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredApplications
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((application) => (
//                     <TableRow key={application.id}>
//                       <TableCell>{application.id}</TableCell>
//                       <TableCell>{application.title}</TableCell>
//                       <TableCell>
//                         {application.researcher_name || application.researcher}
//                       </TableCell>
//                       <TableCell>{application.research_type}</TableCell>
//                       <TableCell>{application.year}</TableCell>
//                       <TableCell>
//                         <Chip 
//                           label={application.status} 
//                           color={getStatusColor(application.status)}
//                           size="small"
//                         />
//                       </TableCell>
//                       <TableCell>
//                         {application.submitted_at 
//                           ? new Date(application.submitted_at).toLocaleDateString()
//                           : 'Not submitted'
//                         }
//                       </TableCell>
//                       <TableCell>
//                         <IconButton
//                           color="primary"
//                           onClick={() => handleViewApplication(application)}
//                         >
//                           <ViewIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 }
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

//         {/* Application Detail Dialog */}
//         <Dialog 
//           open={dialogOpen} 
//           onClose={handleCloseDialog}
//           maxWidth="md"
//           fullWidth
//         >
//           <DialogTitle>
//             Application Details: {selectedApplication?.title}
//           </DialogTitle>
//           <DialogContent dividers>
//             {selectedApplication && (
//               <Box>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="subtitle2">Research Type</Typography>
//                     <Typography>{selectedApplication.research_type}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="subtitle2">Year</Typography>
//                     <Typography>{selectedApplication.year}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="subtitle2">Status</Typography>
//                     <Chip 
//                       label={selectedApplication.status} 
//                       color={getStatusColor(selectedApplication.status)}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="subtitle2">Submitted At</Typography>
//                     <Typography>
//                       {selectedApplication.submitted_at 
//                         ? new Date(selectedApplication.submitted_at).toLocaleString()
//                         : 'Not submitted'
//                       }
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle2">Description</Typography>
//                     <Typography>{selectedApplication.description}</Typography>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle2">Objectives</Typography>
//                     <Typography>{selectedApplication.objectives}</Typography>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle2">Methodology</Typography>
//                     <Typography>{selectedApplication.methodology}</Typography>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle2">Expected Outcomes</Typography>
//                     <Typography>{selectedApplication.expected_outcomes}</Typography>
//                   </Grid>

//                   {/* Attachments Section */}
//                   <Grid item xs={12}>
//                     <Accordion defaultExpanded>
//                       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                         <Typography variant="h6">Attachments</Typography>
//                       </AccordionSummary>
//                       <AccordionDetails>
//                         {selectedApplication.attachments && selectedApplication.attachments.length > 0 ? (
//                           <List>
//                             {selectedApplication.attachments.map((attachment) => (
//                               <ListItem 
//                                 key={attachment.id}
//                                 secondaryAction={
//                                   <IconButton 
//                                     edge="end"
//                                     onClick={() => handleDownload(attachment)}
//                                   >
//                                     <DownloadIcon />
//                                   </IconButton>
//                                 }
//                               >
//                                 <ListItemIcon>
//                                   <DocumentIcon />
//                                 </ListItemIcon>
//                                 <ListItemText
//                                   primary={attachment.file_type}
//                                   secondary={attachment.original_filename}
//                                 />
//                               </ListItem>
//                             ))}
//                           </List>
//                         ) : (
//                           <Typography>No attachments available</Typography>
//                         )}
//                       </AccordionDetails>
//                     </Accordion>
//                   </Grid>

//                   {/* Officer Feedback (if rejected) */}
//                   {selectedApplication.status === 'Rejected' && selectedApplication.officer_feedback && (
//                     <Grid item xs={12}>
//                       <Alert severity="info">
//                         <Typography variant="subtitle2">Rejection Feedback</Typography>
//                         <Typography>{selectedApplication.officer_feedback}</Typography>
//                       </Alert>
//                     </Grid>
//                   )}

//                   {/* Action Buttons for Pending applications */}
//                   {selectedApplication.status === 'Pending' && (
//                     <Grid item xs={12}>
//                       <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//                         <Button
//                           variant="contained"
//                           color="success"
//                           startIcon={<ApproveIcon />}
//                           onClick={() => handleAction('approve')}
//                         >
//                           Approve
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           startIcon={<RejectIcon />}
//                           onClick={() => handleAction('reject')}
//                         >
//                           Reject
//                         </Button>
//                       </Box>
//                     </Grid>
//                   )}

//                   {/* Feedback input for rejection */}
//                   {actionType === 'reject' && (
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         multiline
//                         rows={4}
//                         label="Rejection Feedback"
//                         value={feedback}
//                         onChange={(e) => setFeedback(e.target.value)}
//                         placeholder="Please provide reason for rejection..."
//                       />
//                     </Grid>
//                   )}
//                 </Grid>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions>
//             {actionType && (
//               <Button onClick={() => setActionType('')}>
//                 Cancel Action
//               </Button>
//             )}
//             {actionType === 'reject' && (
//               <Button 
//                 onClick={submitAction}
//                 variant="contained"
//                 color="error"
//                 disabled={!feedback.trim()}
//               >
//                 Submit Rejection
//               </Button>
//             )}
//             {actionType === 'approve' && (
//               <Button 
//                 onClick={submitAction}
//                 variant="contained"
//                 color="success"
//               >
//                 Confirm Approval
//               </Button>
//             )}
//             <Button onClick={handleCloseDialog}>
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>

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

// export default OfficerDashboard;









































// import React, { useState, useEffect } from 'react';         now
// import AppLayout from "../../components/layouts/AppLayout";
// import {
//   Container, Paper, Typography, Box, Grid, Chip, Divider,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   TablePagination, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
//   TextField, Button, Snackbar, Alert, Accordion, AccordionSummary, AccordionDetails,
//   List, ListItem, ListItemText, ListItemIcon, CircularProgress
// } from '@mui/material';
// import {
//   Visibility as ViewIcon,
//   CheckCircle as ApproveIcon,
//   Cancel as RejectIcon,
//   Download as DownloadIcon,
//   ExpandMore as ExpandMoreIcon,
//   Description as DocumentIcon
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

//   // Auth headers
//   const getAuthHeaders = () => ({
//     'Authorization': `Bearer ${localStorage.getItem('access')}`,
//     'Content-Type': 'application/json'
//   });

//   // Fetch applications
//   useEffect(() => {
//     fetchApplications();
//   }, []);

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
//       body: actionType === 'reject' ? JSON.stringify({ feedback }) : null
//     })
//       .then(async res => {
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || 'Action failed');
//         return data;
//       })
//       .then(() => {
//         setMessage({
//           text: `Application ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`,
//           severity: 'success'
//         });
//         setDialogOpen(false);
//         setSelectedApplication(null);
//         fetchApplications();
//       })
//       .catch(err => {
//         console.error(err);
//         setMessage({ text: err.message || 'Action failed', severity: 'error' });
//       });
//   };

//   const handleDownload = (attachment) => {
//     // Ensure the file URL is correct
//     const fileUrl = `${API_BASE_URL}${attachment.file_path}`;
//     window.open(fileUrl, '_blank');
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedApplication(null);
//     setActionType('');
//     setFeedback('');
//   };

//   const handleCloseSnackbar = () => {
//     setMessage({ text: '', severity: 'info' });
//   };

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
//       default: return 'default';
//     }
//   };

//   if (loading) {
//     return (
//       <AppLayout>
//         <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
//           <CircularProgress />
//         </Container>
//       </AppLayout>
//     );
//   }

//   return (
//     <AppLayout>
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h4" gutterBottom>
//             Officer Dashboard
//           </Typography>

//           {/* Status Filter */}
//           <Box sx={{ mb: 3 }}>
//             <Typography variant="h6" gutterBottom>Filter by Status</Typography>
//             <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//               {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
//                 <Chip
//                   key={status}
//                   label={status}
//                   color={filterStatus === status ? 'primary' : 'default'}
//                   variant={filterStatus === status ? 'filled' : 'outlined'}
//                   onClick={() => setFilterStatus(status)}
//                 />
//               ))}
//             </Box>
//           </Box>

//           <Divider sx={{ mb: 3 }} />

//           {/* Applications Table */}
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Title</TableCell>
//                   <TableCell>Researcher</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Submitted At</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredApplications
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map(app => (
//                     <TableRow key={app.id}>
//                       <TableCell>{app.id}</TableCell>
//                       <TableCell>{app.title}</TableCell>
//                       <TableCell>{app.researcher_name || app.researcher}</TableCell>
//                       <TableCell>
//                         <Chip label={app.status} color={getStatusColor(app.status)} size="small" />
//                       </TableCell>
//                       <TableCell>{app.submitted_at ? new Date(app.submitted_at).toLocaleDateString() : 'Not submitted'}</TableCell>
//                       <TableCell>
//                         <IconButton onClick={() => handleViewApplication(app)} color="primary">
//                           <ViewIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
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

//         {/* Application Detail Dialog */}
//         <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//           <DialogTitle>{selectedApplication?.title}</DialogTitle>
//           <DialogContent dividers>
//             {selectedApplication && (
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}><Typography variant="subtitle2">Status</Typography><Chip label={selectedApplication.status} color={getStatusColor(selectedApplication.status)} /></Grid>
//                 <Grid item xs={12} sm={6}><Typography variant="subtitle2">Submitted At</Typography><Typography>{selectedApplication.submitted_at ? new Date(selectedApplication.submitted_at).toLocaleString() : 'Not submitted'}</Typography></Grid>
//                 <Grid item xs={12}><Typography variant="subtitle2">Description</Typography><Typography>{selectedApplication.description || 'N/A'}</Typography></Grid>
//                 <Grid item xs={12}><Typography variant="subtitle2">Objectives</Typography><Typography>{selectedApplication.objectives || 'N/A'}</Typography></Grid>
//                 <Grid item xs={12}><Typography variant="subtitle2">Methodology</Typography><Typography>{selectedApplication.methodology || 'N/A'}</Typography></Grid>
//                 <Grid item xs={12}><Typography variant="subtitle2">Expected Outcomes</Typography><Typography>{selectedApplication.expected_outcomes || 'N/A'}</Typography></Grid>

//                 {/* Attachments */}
//                 <Grid item xs={12}>
//                   <Accordion defaultExpanded>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                       <Typography>Attachments</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       {selectedApplication.attachments && selectedApplication.attachments.length > 0 ? (
//                         <List>
//                           {selectedApplication.attachments.map(att => (
//                             <ListItem key={att.id} secondaryAction={<IconButton onClick={() => handleDownload(att)}><DownloadIcon /></IconButton>}>
//                               <ListItemIcon><DocumentIcon /></ListItemIcon>
//                               <ListItemText primary={att.file_type} secondary={att.original_filename} />
//                             </ListItem>
//                           ))}
//                         </List>
//                       ) : (<Typography>No attachments</Typography>)}
//                     </AccordionDetails>
//                   </Accordion>
//                 </Grid>

//                 {/* Feedback if rejected */}
//                 {selectedApplication.status === 'Rejected' && selectedApplication.officer_feedback && (
//                   <Grid item xs={12}>
//                     <Alert severity="info">
//                       <Typography variant="subtitle2">Rejection Feedback</Typography>
//                       <Typography>{selectedApplication.officer_feedback}</Typography>
//                     </Alert>
//                   </Grid>
//                 )}

//                 {/* Action Buttons */}
//                 {selectedApplication.status === 'Pending' && (
//                   <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2 }}>
//                     <Button variant="contained" color="success" startIcon={<ApproveIcon />} onClick={() => handleAction('approve')}>Approve</Button>
//                     <Button variant="contained" color="error" startIcon={<RejectIcon />} onClick={() => handleAction('reject')}>Reject</Button>
//                   </Grid>
//                 )}

//                 {/* Feedback input for rejection */}
//                 {actionType === 'reject' && (
//                   <Grid item xs={12}>
//                     <TextField fullWidth multiline rows={4} label="Rejection Feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Enter rejection reason..." />
//                   </Grid>
//                 )}
//               </Grid>
//             )}
//           </DialogContent>
//           <DialogActions>
//             {actionType && <Button onClick={() => setActionType('')}>Cancel</Button>}
//             {actionType === 'reject' && <Button onClick={submitAction} variant="contained" color="error" disabled={!feedback.trim()}>Submit Rejection</Button>}
//             {actionType === 'approve' && <Button onClick={submitAction} variant="contained" color="success">Confirm Approval</Button>}
//             <Button onClick={handleCloseDialog}>Close</Button>
//           </DialogActions>
//         </Dialog>

//         {/* Snackbar for messages */}
//         <Snackbar open={!!message.text} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//           <Alert onClose={handleCloseSnackbar} severity={message.severity} sx={{ width: '100%' }}>{message.text}</Alert>
//         </Snackbar>
//       </Container>
//     </AppLayout>
//   );
// };

// export default OfficerDashboard; 








































// import React, { useState, useEffect } from 'react';
// import AppLayout from "../../components/layouts/AppLayout";    saivi
// import {
//   Container, Paper, Typography, Box, Grid, Button, Chip, Divider,
//   Dialog, DialogTitle, DialogContent, DialogActions, TextField,
//   Alert, Snackbar, CircularProgress, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, TablePagination, IconButton,
//   Accordion, AccordionSummary, AccordionDetails, List, ListItem,
//   ListItemText, ListItemIcon
// } from '@mui/material';
// import {
//   Visibility as ViewIcon,
//   CheckCircle as ApproveIcon,
//   Cancel as RejectIcon,
//   Download as DownloadIcon,
//   ExpandMore as ExpandMoreIcon,
//   Description as DocumentIcon
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
//       body: actionType === 'reject' ? JSON.stringify({ feedback }) : null
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
//         fetchApplications();
//       })
//       .catch(err => setMessage({ text: err.message || 'Action failed', severity: 'error' }));
//   };

//   const handleDownload = (attachment) => {
//     if (attachment.file_path) {
//       const link = document.createElement('a');
//       link.href = `${API_BASE_URL}${attachment.file_path}`;
//       link.download = attachment.original_filename || 'attachment';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } else {
//       setMessage({ text: 'Attachment URL not available', severity: 'error' });
//     }
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedApplication(null);
//     setActionType('');
//     setFeedback('');
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

//         {/* Application Detail Dialog */}
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
//                           <ListItem key={att.id} secondaryAction={
//                             <IconButton onClick={() => handleDownload(att)}><DownloadIcon /></IconButton>
//                           }>
//                             <ListItemIcon><DocumentIcon /></ListItemIcon>
//                             <ListItemText primary={att.file_type} secondary={att.original_filename} />
//                           </ListItem>
//                         ))}
//                       </List>
//                     ) : (<Typography>No attachments available</Typography>)}
//                   </Grid>
//                   {selectedApplication.status === 'Pending' && (
//                     <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2 }}>
//                       <Button variant="contained" color="success" startIcon={<ApproveIcon />} onClick={() => handleAction('approve')}>Approve</Button>
//                       <Button variant="contained" color="error" startIcon={<RejectIcon />} onClick={() => handleAction('reject')}>Reject</Button>
//                     </Grid>
//                   )}
//                   {actionType === 'reject' && (
//                     <Grid item xs={12}>
//                       <TextField fullWidth multiline rows={4} label="Rejection Feedback" value={feedback}
//                         onChange={e => setFeedback(e.target.value)} placeholder="Reason for rejection..." />
//                     </Grid>
//                   )}
//                 </Grid>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions>
//             {actionType && <Button onClick={() => setActionType('')}>Cancel Action</Button>}
//             {actionType === 'reject' && <Button variant="contained" color="error" onClick={submitAction} disabled={!feedback.trim()}>Submit Rejection</Button>}
//             {actionType === 'approve' && <Button variant="contained" color="success" onClick={submitAction}>Confirm Approval</Button>}
//             <Button onClick={handleCloseDialog}>Close</Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar open={!!message.text} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//           <Alert onClose={handleCloseSnackbar} severity={message.severity} sx={{ width: '100%' }}>{message.text}</Alert>
//         </Snackbar>
//       </Container>
//     </AppLayout>
//   );
// };

// export default OfficerDashboard;





















// import React, { useState, useEffect } from 'react'; earlier
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
//   Description as DocumentIcon
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
//       body: actionType === 'reject' ? JSON.stringify({ feedback }) : null
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
//         fetchApplications();
//       })
//       .catch(err => setMessage({ text: err.message || 'Action failed', severity: 'error' }));
//   };

//   const handleDownload = (attachment) => {
//     if (attachment.file_path) {
//       const link = document.createElement('a');
//       link.href = `${API_BASE_URL}${attachment.file_path}`;
//       link.download = attachment.original_filename || 'attachment';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } else {
//       setMessage({ text: 'Attachment URL not available', severity: 'error' });
//     }
//   };

//   const handleView = (attachment) => {
//     if (attachment.file_path) {
//       window.open(`${API_BASE_URL}${attachment.file_path}`, '_blank');
//     } else {
//       setMessage({ text: 'Attachment URL not available for viewing', severity: 'error' });
//     }
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedApplication(null);
//     setActionType('');
//     setFeedback('');
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

//         {/* Application Detail Dialog */}
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
//                             <ListItemText primary={att.file_type} secondary={att.original_filename} />
//                           </ListItem>
//                         ))}
//                       </List>
//                     ) : (<Typography>No attachments available</Typography>)}
//                   </Grid>
//                   {selectedApplication.status === 'Pending' && (
//                     <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2 }}>
//                       <Button variant="contained" color="success" startIcon={<ApproveIcon />} onClick={() => handleAction('approve')}>Approve</Button>
//                       <Button variant="contained" color="error" startIcon={<RejectIcon />} onClick={() => handleAction('reject')}>Reject</Button>
//                     </Grid>
//                   )}
//                   {actionType === 'reject' && (
//                     <Grid item xs={12}>
//                       <TextField fullWidth multiline rows={4} label="Rejection Feedback" value={feedback}
//                         onChange={e => setFeedback(e.target.value)} placeholder="Reason for rejection..." />
//                     </Grid>
//                   )}
//                 </Grid>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions>
//             {actionType && <Button onClick={() => setActionType('')}>Cancel Action</Button>}
//             {actionType === 'reject' && <Button variant="contained" color="error" onClick={submitAction} disabled={!feedback.trim()}>Submit Rejection</Button>}
//             {actionType === 'approve' && <Button variant="contained" color="success" onClick={submitAction}>Confirm Approval</Button>}
//             <Button onClick={handleCloseDialog}>Close</Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar open={!!message.text} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//           <Alert onClose={handleCloseSnackbar} severity={message.severity} sx={{ width: '100%' }}>{message.text}</Alert>
//         </Snackbar>
//       </Container>
//     </AppLayout>
//   );
// };

// export default OfficerDashboard;













// import React, { useState, useEffect } from 'react';
// import AppLayout from "../../components/layouts/AppLayout";     asubuhi
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
//   Description as DocumentIcon
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
//   const [viewedDocs, setViewedDocs] = useState([]); // track viewed attachments

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
//     setViewedDocs([]); // reset viewed docs for new app
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
//       body: actionType === 'reject' ? JSON.stringify({ feedback }) : null
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

//       // Mark as viewed
//       setViewedDocs(prev => [...new Set([...prev, attachment.id])]);
//     } else {
//       setMessage({ text: 'Attachment URL not available', severity: 'error' });
//     }
//   };

//   const handleView = (attachment) => {
//     if (attachment.file_url) {
//       window.open(attachment.file_url, '_blank');
//       setViewedDocs(prev => [...new Set([...prev, attachment.id])]); // mark as viewed
//     } else {
//       setMessage({ text: 'Attachment URL not available for viewing', severity: 'error' });
//     }
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

//         {/* Application Detail Dialog */}
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

//                   {selectedApplication.status === 'Pending' && (
//                     <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2 }}>
//                       <Button
//                         variant="contained"
//                         color="success"
//                         startIcon={<ApproveIcon />}
//                         onClick={() => handleAction('approve')}
//                         disabled={!selectedApplication.attachments.every(att => viewedDocs.includes(att.id))}
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         startIcon={<RejectIcon />}
//                         onClick={() => handleAction('reject')}
//                         disabled={!selectedApplication.attachments.every(att => viewedDocs.includes(att.id))}
//                       >
//                         Reject
//                       </Button>
//                     </Grid>
//                   )}

//                   {actionType === 'reject' && (
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         multiline
//                         rows={4}
//                         label="Rejection Feedback"
//                         value={feedback}
//                         onChange={e => setFeedback(e.target.value)}
//                         placeholder="Reason for rejection..."
//                       />
//                     </Grid>
//                   )}
//                 </Grid>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions>
//             {actionType && <Button onClick={() => setActionType('')}>Cancel Action</Button>}
//             {actionType === 'reject' && <Button variant="contained" color="error" onClick={submitAction} disabled={!feedback.trim()}>Submit Rejection</Button>}
//             {actionType === 'approve' && <Button variant="contained" color="success" onClick={submitAction}>Confirm Approval</Button>}
//             <Button onClick={handleCloseDialog}>Close</Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar open={!!message.text} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//           <Alert onClose={handleCloseSnackbar} severity={message.severity} sx={{ width: '100%' }}>{message.text}</Alert>
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
  Description as DocumentIcon
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
      body: actionType === 'reject' ? JSON.stringify({ feedback }) : null
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

                  {actionType === 'reject' && (
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <TextField
                        label="Feedback"
                        fullWidth
                        multiline
                        rows={3}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                      <Box sx={{ mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={submitAction}>Submit Rejection</Button>
                      </Box>
                    </Grid>
                  )}

                  {actionType === 'approve' && (
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <Button variant="contained" color="primary" onClick={submitAction}>Confirm Approval</Button>
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
