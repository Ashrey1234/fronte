// // // src/pages/researcher/Notifications.jsx
// // import React from "react";
// // import AppLayout from "../../components/layouts/AppLayout";

// // const Notifications = () => {
// //   return (
// //     <AppLayout role="researcher">
// //       <h2>Notifications</h2>
// //       <p>Feedback from Officer or Admin will appear here.</p>
// //       {/* You can map notifications from API here */}
// //     </AppLayout>
// //   );
// // };

// // export default Notifications;



















// import React, { useState, useEffect } from 'react';
// import AppLayout from "../../components/layouts/AppLayout";
// import {
//   Container, Paper, Typography, Box, Grid, Card, CardContent,
//   Button, Chip, Divider, Accordion, AccordionSummary, AccordionDetails,
//   Alert, Snackbar, CircularProgress, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, TablePagination, IconButton,
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   List, ListItem, ListItemText, ListItemIcon
// } from '@mui/material';
// import {
//   Visibility as ViewIcon,
//   CheckCircle as ApprovedIcon,
//   Cancel as RejectedIcon,
//   Schedule as PendingIcon,
//   ExpandMore as ExpandMoreIcon,
//   Download as DownloadIcon,
//   Description as DocumentIcon
// } from '@mui/icons-material';
// import './Notifications.css';

// const API_BASE_URL = 'http://127.0.0.1:8000';

// // Helper to get auth headers
// const getAuthHeaders = () => ({
//   'Authorization': `Bearer ${localStorage.getItem('access')}`,
//   'Content-Type': 'application/json'
// });

// const Notifications = () => {
//   const [applications, setApplications] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState({ text: '', severity: 'info' });
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [detailDialogOpen, setDetailDialogOpen] = useState(false);

//   // Fetch researcher's applications
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
//         // Filter to only show submitted applications (not drafts)
//         const submittedApps = data.filter(app => app.status !== 'Draft');
//         setApplications(submittedApps);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error:', err);
//         setMessage({ text: 'Failed to load applications', severity: 'error' });
//         setLoading(false);
//       });
//   };

//   const viewApplicationDetails = (application) => {
//     // Fetch the full application details with attachments
//     setLoading(true);
//     fetch(`${API_BASE_URL}/api/applications/${application.id}/`, {
//       headers: getAuthHeaders()
//     })
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch application details');
//         return res.json();
//       })
//       .then(data => {
//         setSelectedApplication(data);
//         setDetailDialogOpen(true);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error:', err);
//         setMessage({ text: 'Failed to load application details', severity: 'error' });
//         setLoading(false);
//       });
//   };

//   const handleDownload = (attachment) => {
//     // This would typically redirect to the file download URL
//     window.open(attachment.file_path, '_blank');
//   };

//   const handleCloseDialog = () => {
//     setDetailDialogOpen(false);
//     setSelectedApplication(null);
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

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Approved':
//         return <ApprovedIcon color="success" />;
//       case 'Rejected':
//         return <RejectedIcon color="error" />;
//       case 'Pending':
//         return <PendingIcon color="warning" />;
//       default:
//         return null;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Approved':
//         return 'success';
//       case 'Rejected':
//         return 'error';
//       case 'Pending':
//         return 'warning';
//       default:
//         return 'default';
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
//             Notifications
//           </Typography>
          
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//             View the status of your submitted research applications and officer feedback.
//           </Typography>

//           {applications.length === 0 ? (
//             <Card sx={{ textAlign: 'center', py: 4 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   No Notifications Yet
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                   You haven't submitted any research applications yet.
//                 </Typography>
//                 <Button variant="contained" href="/submit-application">
//                   Submit New Application
//                 </Button>
//               </CardContent>
//             </Card>
//           ) : (
//             <>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>ID</TableCell>
//                       <TableCell>Title</TableCell>
//                       <TableCell>Research Type</TableCell>
//                       <TableCell>Year</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell>Submitted At</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {applications
//                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                       .map((application) => (
//                         <TableRow key={application.id}>
//                           <TableCell>{application.id}</TableCell>
//                           <TableCell>{application.title}</TableCell>
//                           <TableCell>{application.research_type}</TableCell>
//                           <TableCell>{application.year}</TableCell>
//                           <TableCell>
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                               {getStatusIcon(application.status)}
//                               <Chip 
//                                 label={application.status} 
//                                 color={getStatusColor(application.status)}
//                                 size="small"
//                                 sx={{ ml: 1 }}
//                               />
//                             </Box>
//                           </TableCell>
//                           <TableCell>
//                             {application.submitted_at 
//                               ? new Date(application.submitted_at).toLocaleDateString()
//                               : 'Not submitted'
//                             }
//                           </TableCell>
//                           <TableCell>
//                             <IconButton
//                               color="primary"
//                               onClick={() => viewApplicationDetails(application)}
//                             >
//                               <ViewIcon />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     }
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25]}
//                 component="div"
//                 count={applications.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//             </>
//           )}
//         </Paper>

//         {/* Application Detail Dialog */}
//         {selectedApplication && (
//           <Dialog 
//             open={detailDialogOpen} 
//             onClose={handleCloseDialog}
//             maxWidth="md"
//             fullWidth
//           >
//             <DialogTitle>
//               Application Details: {selectedApplication.title}
//             </DialogTitle>
//             <DialogContent dividers>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="subtitle2">Research Type</Typography>
//                   <Typography>{selectedApplication.research_type}</Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="subtitle2">Year</Typography>
//                   <Typography>{selectedApplication.year}</Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="subtitle2">Category</Typography>
//                   <Typography>{selectedApplication.category || 'N/A'}</Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="subtitle2">Status</Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     {getStatusIcon(selectedApplication.status)}
//                     <Chip 
//                       label={selectedApplication.status} 
//                       color={getStatusColor(selectedApplication.status)}
//                       sx={{ ml: 1 }}
//                     />
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="subtitle2">Submitted At</Typography>
//                   <Typography>
//                     {selectedApplication.submitted_at 
//                       ? new Date(selectedApplication.submitted_at).toLocaleString()
//                       : 'Not submitted'
//                     }
//                   </Typography>
//                 </Grid>

//                 {/* Officer Feedback Section */}
//                 {selectedApplication.officer_feedback && (
//                   <Grid item xs={12}>
//                     <Card variant="outlined" sx={{ bgcolor: 'background.default' }}>
//                       <CardContent>
//                         <Typography variant="h6" gutterBottom>
//                           Officer Feedback
//                         </Typography>
//                         <Typography>
//                           {selectedApplication.officer_feedback}
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 )}

//                 {/* Attachments Section */}
//                 <Grid item xs={12}>
//                   <Accordion defaultExpanded>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                       <Typography variant="h6">Attachments</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       {selectedApplication.attachments && selectedApplication.attachments.length > 0 ? (
//                         <List>
//                           {selectedApplication.attachments.map((attachment) => (
//                             <ListItem 
//                               key={attachment.id}
//                               secondaryAction={
//                                 <IconButton 
//                                   edge="end"
//                                   onClick={() => handleDownload(attachment)}
//                                 >
//                                   <DownloadIcon />
//                                 </IconButton>
//                               }
//                             >
//                               <ListItemIcon>
//                                 <DocumentIcon />
//                               </ListItemIcon>
//                               <ListItemText
//                                 primary={attachment.file_type}
//                                 secondary={attachment.original_filename}
//                               />
//                             </ListItem>
//                           ))}
//                         </List>
//                       ) : (
//                         <Typography>No attachments available</Typography>
//                       )}
//                     </AccordionDetails>
//                   </Accordion>
//                 </Grid>

//                 {/* Application Details */}
//                 <Grid item xs={12}>
//                   <Accordion>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                       <Typography variant="h6">Application Details</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                           <Typography variant="subtitle2">Research Description</Typography>
//                           <Typography>{selectedApplication.description}</Typography>
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Divider sx={{ my: 2 }} />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Typography variant="subtitle2">Objectives</Typography>
//                           <Typography>{selectedApplication.objectives}</Typography>
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Divider sx={{ my: 2 }} />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Typography variant="subtitle2">Methodology</Typography>
//                           <Typography>{selectedApplication.methodology}</Typography>
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Divider sx={{ my: 2 }} />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Typography variant="subtitle2">Expected Outcomes</Typography>
//                           <Typography>{selectedApplication.expected_outcomes}</Typography>
//                         </Grid>
//                       </Grid>
//                     </AccordionDetails>
//                   </Accordion>
//                 </Grid>
//               </Grid>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDialog}>
//                 Close
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

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

// export default Notifications;















// import React, { useState, useEffect } from 'react';
// import AppLayout from "../../components/layouts/AppLayout";
// import {
//   Container, Paper, Typography, Box, Card, CardContent,
//   Button, Chip, Divider, Accordion, AccordionSummary, AccordionDetails,
//   Alert, Snackbar, CircularProgress, List, ListItem, ListItemText,
//   ListItemIcon, IconButton, Dialog, DialogTitle, DialogContent,
//   DialogActions, Badge
// } from '@mui/material';
// import {
//   CheckCircle as ApprovedIcon,
//   Cancel as RejectedIcon,
//   Schedule as PendingIcon,
//   ExpandMore as ExpandMoreIcon,
//   Download as DownloadIcon,
//   Description as DocumentIcon,
//   Notifications as NotificationsIcon
// } from '@mui/icons-material';
// import './Notifications.css';

// const API_BASE_URL = 'http://127.0.0.1:8000';

// // Helper to get auth headers
// const getAuthHeaders = () => ({
//   'Authorization': `Bearer ${localStorage.getItem('access')}`,
//   'Content-Type': 'application/json'
// });

// // Helper to get current user ID from token
// const getCurrentUserId = () => {
//   try {
//     const token = localStorage.getItem('access');
//     if (!token) return null;
    
//     // Decode JWT token to get user ID
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return payload.user_id;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };

// const Notifications = () => {
//   const [applications, setApplications] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState({ text: '', severity: 'info' });
//   const [detailDialogOpen, setDetailDialogOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);

//   // Fetch researcher's applications
//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const fetchApplications = () => {
//     setLoading(true);
//     const currentUserId = getCurrentUserId();
    
//     if (!currentUserId) {
//       setMessage({ text: 'Cannot identify user. Please log in again.', severity: 'error' });
//       setLoading(false);
//       return;
//     }

//     fetch(`${API_BASE_URL}/api/applications/`, {
//       headers: getAuthHeaders()
//     })
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch applications');
//         return res.json();
//       })
//       .then(data => {
//         // Filter to only show current user's applications that have been reviewed
//         const userApplications = data.filter(app => 
//           app.researcher === currentUserId && 
//           app.status !== 'Draft' && 
//           (app.status === 'Approved' || app.status === 'Rejected' || app.officer_feedback)
//         );
        
//         setApplications(userApplications);
        
//         // Count unread notifications (applications with feedback that haven't been viewed)
//         const unread = userApplications.filter(app => 
//           app.officer_feedback && !app.feedback_viewed
//         ).length;
//         setUnreadCount(unread);
        
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error:', err);
//         setMessage({ text: 'Failed to load notifications', severity: 'error' });
//         setLoading(false);
//       });
//   };

//   const markFeedbackAsRead = (applicationId) => {
//     // Update the application to mark feedback as viewed
//     fetch(`${API_BASE_URL}/api/applications/${applicationId}/mark_feedback_viewed/`, {
//       method: 'POST',
//       headers: getAuthHeaders()
//     })
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to mark feedback as read');
//         // Update local state to reflect the change
//         setApplications(prev => prev.map(app => 
//           app.id === applicationId ? { ...app, feedback_viewed: true } : app
//         ));
//         setUnreadCount(prev => prev - 1);
//       })
//       .catch(err => {
//         console.error('Error:', err);
//       });
//   };

//   const viewApplicationDetails = (application) => {
//     // Fetch the full application details with attachments
//     setLoading(true);
//     fetch(`${API_BASE_URL}/api/applications/${application.id}/`, {
//       headers: getAuthHeaders()
//     })
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch application details');
//         return res.json();
//       })
//       .then(data => {
//         setSelectedApplication(data);
//         setDetailDialogOpen(true);
        
//         // Mark feedback as read when viewing details
//         if (data.officer_feedback && !data.feedback_viewed) {
//           markFeedbackAsRead(data.id);
//         }
        
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error:', err);
//         setMessage({ text: 'Failed to load application details', severity: 'error' });
//         setLoading(false);
//       });
//   };

//   const handleDownload = (attachment) => {
//     window.open(attachment.file_path, '_blank');
//   };

//   const handleCloseDialog = () => {
//     setDetailDialogOpen(false);
//     setSelectedApplication(null);
//   };

//   const handleCloseSnackbar = () => {
//     setMessage({ text: '', severity: 'info' });
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Approved':
//         return <ApprovedIcon color="success" />;
//       case 'Rejected':
//         return <RejectedIcon color="error" />;
//       case 'Pending':
//         return <PendingIcon color="warning" />;
//       default:
//         return null;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Approved':
//         return 'success';
//       case 'Rejected':
//         return 'error';
//       case 'Pending':
//         return 'warning';
//       default:
//         return 'default';
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
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//             <Badge badgeContent={unreadCount} color="error" sx={{ mr: 2 }}>
//               <NotificationsIcon color="primary" fontSize="large" />
//             </Badge>
//             <Typography variant="h4">
//               Notifications
//             </Typography>
//           </Box>
          
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//             View feedback from officers on your submitted research applications.
//           </Typography>

//           {applications.length === 0 ? (
//             <Card sx={{ textAlign: 'center', py: 4 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   No Notifications Yet
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                   You don't have any application feedback from officers yet.
//                 </Typography>
//                 <Button variant="contained" href="/submit-application">
//                   Submit New Application
//                 </Button>
//               </CardContent>
//             </Card>
//           ) : (
//             <Box>
//               {applications.map((application) => (
//                 <Card 
//                   key={application.id} 
//                   sx={{ 
//                     mb: 2, 
//                     cursor: 'pointer',
//                     borderLeft: application.officer_feedback && !application.feedback_viewed ? 
//                       '4px solid #ff5722' : '1px solid #e0e0e0'
//                   }}
//                   onClick={() => viewApplicationDetails(application)}
//                 >
//                   <CardContent>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <Box>
//                         <Typography variant="h6" gutterBottom>
//                           {application.title}
//                         </Typography>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                           {getStatusIcon(application.status)}
//                           <Chip 
//                             label={application.status} 
//                             color={getStatusColor(application.status)}
//                             size="small"
//                             sx={{ ml: 1 }}
//                           />
//                           {application.officer_feedback && !application.feedback_viewed && (
//                             <Chip 
//                               label="New Feedback" 
//                               color="error"
//                               size="small"
//                               sx={{ ml: 1 }}
//                             />
//                           )}
//                         </Box>
//                         <Typography variant="body2" color="text.secondary">
//                           Submitted on: {application.submitted_at ? 
//                             new Date(application.submitted_at).toLocaleDateString() : 
//                             'Not submitted'
//                           }
//                         </Typography>
//                       </Box>
//                       <Box>
//                         <Typography variant="body2" color="text.secondary">
//                           Click to view details
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {application.officer_feedback && (
//                       <Box sx={{ mt: 2 }}>
//                         <Divider sx={{ mb: 2 }} />
//                         <Typography variant="subtitle2" gutterBottom>
//                           Officer Feedback:
//                         </Typography>
//                         <Typography variant="body2">
//                           {application.officer_feedback.length > 150 
//                             ? `${application.officer_feedback.substring(0, 150)}...` 
//                             : application.officer_feedback
//                           }
//                         </Typography>
//                       </Box>
//                     )}
//                   </CardContent>
//                 </Card>
//               ))}
//             </Box>
//           )}
//         </Paper>

//         {/* Application Detail Dialog */}
//         {selectedApplication && (
//           <Dialog 
//             open={detailDialogOpen} 
//             onClose={handleCloseDialog}
//             maxWidth="md"
//             fullWidth
//           >
//             <DialogTitle>
//               Application Details: {selectedApplication.title}
//             </DialogTitle>
//             <DialogContent dividers>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle2">Research Type</Typography>
//                 <Typography>{selectedApplication.research_type}</Typography>
//               </Box>
              
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle2">Year</Typography>
//                 <Typography>{selectedApplication.year}</Typography>
//               </Box>
              
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle2">Status</Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   {getStatusIcon(selectedApplication.status)}
//                   <Chip 
//                     label={selectedApplication.status} 
//                     color={getStatusColor(selectedApplication.status)}
//                     sx={{ ml: 1 }}
//                   />
//                 </Box>
//               </Box>

//               {/* Officer Feedback Section */}
//               {selectedApplication.officer_feedback && (
//                 <Box sx={{ mb: 3 }}>
//                   <Card variant="outlined" sx={{ bgcolor: 'background.default' }}>
//                     <CardContent>
//                       <Typography variant="h6" gutterBottom color="primary">
//                         Officer Feedback
//                       </Typography>
//                       <Typography>
//                         {selectedApplication.officer_feedback}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Box>
//               )}

//               {/* Attachments Section */}
//               <Accordion defaultExpanded>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                   <Typography variant="h6">Attachments</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   {selectedApplication.attachments && selectedApplication.attachments.length > 0 ? (
//                     <List>
//                       {selectedApplication.attachments.map((attachment) => (
//                         <ListItem 
//                           key={attachment.id}
//                           secondaryAction={
//                             <IconButton 
//                               edge="end"
//                               onClick={() => handleDownload(attachment)}
//                             >
//                               <DownloadIcon />
//                             </IconButton>
//                           }
//                         >
//                           <ListItemIcon>
//                             <DocumentIcon />
//                           </ListItemIcon>
//                           <ListItemText
//                             primary={attachment.file_type}
//                             secondary={attachment.original_filename}
//                           />
//                         </ListItem>
//                       ))}
//                     </List>
//                   ) : (
//                     <Typography>No attachments available</Typography>
//                   )}
//                 </AccordionDetails>
//               </Accordion>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDialog}>
//                 Close
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

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

// export default Notifications;







































// import React, { useState, useEffect } from 'react';
// import AppLayout from "../../components/layouts/AppLayout";          asubuhi 
// import {
//   Container, Paper, Typography, Box, Card, CardContent,
//   Button, Chip, Divider, Accordion, AccordionSummary, AccordionDetails,
//   Alert, Snackbar, CircularProgress, List, ListItem, ListItemText,
//   ListItemIcon, IconButton, Dialog, DialogTitle, DialogContent,
//   DialogActions, Badge, Tabs, Tab
// } from '@mui/material';
// import {
//   CheckCircle as ApprovedIcon,
//   Cancel as RejectedIcon,
//   Schedule as PendingIcon,
//   ExpandMore as ExpandMoreIcon,
//   Download as DownloadIcon,
//   Description as DocumentIcon,
//   Notifications as NotificationsIcon,
//   Feedback as FeedbackIcon
// } from '@mui/icons-material';
// import './Notifications.css';

// const API_BASE_URL = 'http://127.0.0.1:8000';

// // Helper to get auth headers
// const getAuthHeaders = () => ({
//   'Authorization': `Bearer ${localStorage.getItem('access')}`,
//   'Content-Type': 'application/json'
// });

// const Notifications = () => {
//   const [applications, setApplications] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState({ text: '', severity: 'info' });
//   const [detailDialogOpen, setDetailDialogOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [activeTab, setActiveTab] = useState(0);

//   // Fetch researcher's applications
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
//         // Filter to only show current user's submitted applications
//         const submittedApps = data.filter(app => 
//           app.status !== 'Draft' && 
//           (app.status === 'Approved' || app.status === 'Rejected' || app.officer_feedback)
//         );
        
//         setApplications(submittedApps);
        
//         // Count unread notifications (applications with feedback that haven't been viewed)
//         const unread = submittedApps.filter(app => 
//           app.officer_feedback && !app.feedback_viewed
//         ).length;
//         setUnreadCount(unread);
        
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error:', err);
//         setMessage({ text: 'Failed to load notifications', severity: 'error' });
//         setLoading(false);
//       });
//   };

//   const markFeedbackAsRead = (applicationId) => {
//     // Update the application to mark feedback as viewed
//     fetch(`${API_BASE_URL}/api/applications/${applicationId}/mark_feedback_viewed/`, {
//       method: 'POST',
//       headers: getAuthHeaders()
//     })
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to mark feedback as read');
//         // Update local state to reflect the change
//         setApplications(prev => prev.map(app => 
//           app.id === applicationId ? { ...app, feedback_viewed: true } : app
//         ));
//         setUnreadCount(prev => prev - 1);
//       })
//       .catch(err => {
//         console.error('Error:', err);
//       });
//   };

//   const viewApplicationDetails = (application) => {
//     // Fetch the full application details with attachments
//     setLoading(true);
//     fetch(`${API_BASE_URL}/api/applications/${application.id}/`, {
//       headers: getAuthHeaders()
//     })
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch application details');
//         return res.json();
//       })
//       .then(data => {
//         // Also fetch attachments for this application
//         return fetch(`${API_BASE_URL}/api/applications/${application.id}/attachments/`, {
//           headers: getAuthHeaders()
//         })
//           .then(attachmentsRes => {
//             if (!attachmentsRes.ok) throw new Error('Failed to fetch attachments');
//             return attachmentsRes.json();
//           })
//           .then(attachmentsData => {
//             // Combine application data with attachments
//             return { ...data, attachments: attachmentsData };
//           });
//       })
//       .then(fullData => {
//         setSelectedApplication(fullData);
//         setDetailDialogOpen(true);
        
//         // Mark feedback as read when viewing details
//         if (fullData.officer_feedback && !fullData.feedback_viewed) {
//           markFeedbackAsRead(fullData.id);
//         }
        
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error:', err);
//         setMessage({ text: 'Failed to load application details', severity: 'error' });
//         setLoading(false);
//       });
//   };

//   const handleDownload = (attachment) => {
//     window.open(attachment.file_path, '_blank');
//   };

//   const handleCloseDialog = () => {
//     setDetailDialogOpen(false);
//     setSelectedApplication(null);
//   };

//   const handleCloseSnackbar = () => {
//     setMessage({ text: '', severity: 'info' });
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Approved':
//         return <ApprovedIcon color="success" />;
//       case 'Rejected':
//         return <RejectedIcon color="error" />;
//       case 'Pending':
//         return <PendingIcon color="warning" />;
//       default:
//         return null;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Approved':
//         return 'success';
//       case 'Rejected':
//         return 'error';
//       case 'Pending':
//         return 'warning';
//       default:
//         return 'default';
//     }
//   };

//   // Filter applications based on tab selection
//   const filteredApplications = activeTab === 0 
//     ? applications 
//     : applications.filter(app => app.officer_feedback);

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
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//             <Badge badgeContent={unreadCount} color="error" sx={{ mr: 2 }}>
//               <NotificationsIcon color="primary" fontSize="large" />
//             </Badge>
//             <Typography variant="h4">
//               Notifications
//             </Typography>
//           </Box>
          
//           <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
//             <Tab label="All Applications" />
//             <Tab label="With Feedback" />
//           </Tabs>

//           <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//             View feedback from officers on your submitted research applications.
//           </Typography>

//           {filteredApplications.length === 0 ? (
//             <Card sx={{ textAlign: 'center', py: 4 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   {activeTab === 0 ? 'No Applications Yet' : 'No Feedback Yet'}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                   {activeTab === 0 
//                     ? "You haven't submitted any research applications yet." 
//                     : "You don't have any application feedback from officers yet."
//                   }
//                 </Typography>
//                 <Button variant="contained" href="/submit-application">
//                   Submit New Application
//                 </Button>
//               </CardContent>
//             </Card>
//           ) : (
//             <Box>
//               {filteredApplications.map((application) => (
//                 <Card 
//                   key={application.id} 
//                   sx={{ 
//                     mb: 2, 
//                     cursor: 'pointer',
//                     borderLeft: application.officer_feedback && !application.feedback_viewed ? 
//                       '4px solid #ff5722' : '1px solid #e0e0e0'
//                   }}
//                   onClick={() => viewApplicationDetails(application)}
//                 >
//                   <CardContent>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                       <Box sx={{ flex: 1 }}>
//                         <Typography variant="h6" gutterBottom>
//                           {application.title}
//                         </Typography>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
//                           {getStatusIcon(application.status)}
//                           <Chip 
//                             label={application.status} 
//                             color={getStatusColor(application.status)}
//                             size="small"
//                           />
//                           {application.officer_feedback && !application.feedback_viewed && (
//                             <Chip 
//                               label="New Feedback" 
//                               color="error"
//                               size="small"
//                             />
//                           )}
//                           {application.officer_feedback && (
//                             <Chip 
//                               icon={<FeedbackIcon />}
//                               label="Has Feedback" 
//                               color="primary"
//                               variant="outlined"
//                               size="small"
//                             />
//                           )}
//                         </Box>
//                         <Typography variant="body2" color="text.secondary">
//                           Submitted on: {application.submitted_at ? 
//                             new Date(application.submitted_at).toLocaleDateString() : 
//                             'Not submitted'
//                           }
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           Research Type: {application.research_type}
//                         </Typography>
//                       </Box>
//                       <Box>
//                         <Typography variant="body2" color="text.secondary">
//                           Click to view details
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {application.officer_feedback && (
//                       <Box sx={{ mt: 2 }}>
//                         <Divider sx={{ mb: 2 }} />
//                         <Typography variant="subtitle2" gutterBottom>
//                           Officer Feedback:
//                         </Typography>
//                         <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
//                           {application.officer_feedback.length > 150 
//                             ? `${application.officer_feedback.substring(0, 150)}...` 
//                             : application.officer_feedback
//                           }
//                         </Typography>
//                       </Box>
//                     )}
//                   </CardContent>
//                 </Card>
//               ))}
//             </Box>
//           )}
//         </Paper>

//         {/* Application Detail Dialog */}
//         {selectedApplication && (
//           <Dialog 
//             open={detailDialogOpen} 
//             onClose={handleCloseDialog}
//             maxWidth="md"
//             fullWidth
//             scroll="paper"
//           >
//             <DialogTitle>
//               Application Details: {selectedApplication.title}
//             </DialogTitle>
//             <DialogContent dividers>
//               <Box sx={{ mb: 3 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   {getStatusIcon(selectedApplication.status)}
//                   <Chip 
//                     label={selectedApplication.status} 
//                     color={getStatusColor(selectedApplication.status)}
//                     sx={{ ml: 1, mr: 2 }}
//                   />
//                   <Typography variant="body2" color="text.secondary">
//                     Submitted on: {selectedApplication.submitted_at ? 
//                       new Date(selectedApplication.submitted_at).toLocaleDateString() : 
//                       'Not submitted'
//                     }
//                   </Typography>
//                 </Box>

//                 <Grid container spacing={2} sx={{ mb: 2 }}>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="subtitle2">Research Type</Typography>
//                     <Typography>{selectedApplication.research_type}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="subtitle2">Year</Typography>
//                     <Typography>{selectedApplication.year}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="subtitle2">Category</Typography>
//                     <Typography>{selectedApplication.category || 'N/A'}</Typography>
//                   </Grid>
//                 </Grid>

//                 {/* Officer Feedback Section */}
//                 {selectedApplication.officer_feedback && (
//                   <Box sx={{ mb: 3 }}>
//                     <Card variant="outlined" sx={{ bgcolor: 'background.default', borderColor: 'primary.main' }}>
//                       <CardContent>
//                         <Typography variant="h6" gutterBottom color="primary">
//                           <FeedbackIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
//                           Officer Feedback
//                         </Typography>
//                         <Typography sx={{ whiteSpace: 'pre-wrap' }}>
//                           {selectedApplication.officer_feedback}
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   </Box>
//                 )}

//                 {/* Application Details */}
//                 <Accordion defaultExpanded={!selectedApplication.officer_feedback}>
//                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                     <Typography variant="h6">Research Details</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography variant="subtitle2" gutterBottom>Description</Typography>
//                       <Typography>{selectedApplication.description}</Typography>
//                     </Box>
//                     <Divider sx={{ my: 2 }} />
//                     <Box sx={{ mb: 2 }}>
//                       <Typography variant="subtitle2" gutterBottom>Objectives</Typography>
//                       <Typography>{selectedApplication.objectives}</Typography>
//                     </Box>
//                     <Divider sx={{ my: 2 }} />
//                     <Box sx={{ mb: 2 }}>
//                       <Typography variant="subtitle2" gutterBottom>Methodology</Typography>
//                       <Typography>{selectedApplication.methodology}</Typography>
//                     </Box>
//                     <Divider sx={{ my: 2 }} />
//                     <Box>
//                       <Typography variant="subtitle2" gutterBottom>Expected Outcomes</Typography>
//                       <Typography>{selectedApplication.expected_outcomes}</Typography>
//                     </Box>
//                   </AccordionDetails>
//                 </Accordion>

//                 {/* Attachments Section */}
//                 <Accordion defaultExpanded>
//                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                     <Typography variant="h6">Attachments</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     {selectedApplication.attachments && selectedApplication.attachments.length > 0 ? (
//                       <List>
//                         {selectedApplication.attachments.map((attachment) => (
//                           <ListItem 
//                             key={attachment.id}
//                             secondaryAction={
//                               <IconButton 
//                                 edge="end"
//                                 onClick={() => handleDownload(attachment)}
//                               >
//                                 <DownloadIcon />
//                               </IconButton>
//                             }
//                           >
//                             <ListItemIcon>
//                               <DocumentIcon />
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={attachment.file_type}
//                               secondary={attachment.original_filename}
//                             />
//                           </ListItem>
//                         ))}
//                       </List>
//                     ) : (
//                       <Typography>No attachments available</Typography>
//                     )}
//                   </AccordionDetails>
//                 </Accordion>
//               </Box>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDialog}>
//                 Close
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

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

// export default Notifications;
































// import React, { useState, useEffect } from 'react';
// import AppLayout from "../../components/layouts/AppLayout";        
// import {
//   Container, Paper, Typography, Box, Card, CardContent,
//   Button, Chip, Divider, Accordion, AccordionSummary, AccordionDetails,
//   Alert, Snackbar, CircularProgress, List, ListItem, ListItemText,
//   ListItemIcon, IconButton, Dialog, DialogTitle, DialogContent,
//   DialogActions, Badge, Tabs, Tab
// } from '@mui/material';
// import {
//   CheckCircle as ApprovedIcon,
//   Cancel as RejectedIcon,
//   Schedule as PendingIcon,
//   ExpandMore as ExpandMoreIcon,
//   Download as DownloadIcon,
//   Description as DocumentIcon,
//   Notifications as NotificationsIcon,
//   Feedback as FeedbackIcon
// } from '@mui/icons-material';

// const API_BASE_URL = 'http://127.0.0.1:8000';

// const getAuthHeaders = () => ({
//   'Authorization': `Bearer ${localStorage.getItem('access')}`,
//   'Content-Type': 'application/json'
// });

// const Notifications = () => {
//   const [applications, setApplications] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState({ text: '', severity: 'info' });
//   const [detailDialogOpen, setDetailDialogOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const fetchApplications = () => {
//     setLoading(true);
//     fetch(`${API_BASE_URL}/api/applications/`, { headers: getAuthHeaders() })
//       .then(res => res.json())
//       .then(data => {
//         // Filter to only submitted applications
//         const submittedApps = data.filter(app => app.status !== 'Draft');
//         setApplications(submittedApps);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setMessage({ text: 'Failed to load applications', severity: 'error' });
//         setLoading(false);
//       });
//   };

//   const viewApplicationDetails = (app) => {
//     setLoading(true);
//     fetch(`${API_BASE_URL}/api/applications/${app.id}/`, { headers: getAuthHeaders() })
//       .then(res => res.json())
//       .then(appData => {
//         return fetch(`${API_BASE_URL}/api/applications/${app.id}/attachments/`, { headers: getAuthHeaders() })
//           .then(attRes => attRes.json())
//           .then(attData => ({ ...appData, attachments: attData }));
//       })
//       .then(fullData => {
//         setSelectedApplication(fullData);
//         setDetailDialogOpen(true);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setMessage({ text: 'Failed to load details', severity: 'error' });
//         setLoading(false);
//       });
//   };

//   const handleDownload = (attachment) => {
//     window.open(attachment.file_url, '_blank');
//   };

//   const handleCloseDialog = () => {
//     setDetailDialogOpen(false);
//     setSelectedApplication(null);
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Approved': return <ApprovedIcon color="success" />;
//       case 'Rejected': return <RejectedIcon color="error" />;
//       case 'Pending': return <PendingIcon color="warning" />;
//       default: return null;
//     }
//   };

//   const filteredApplications = activeTab === 0 
//     ? applications 
//     : applications.filter(app => app.officer_feedback);

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
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//             <NotificationsIcon color="primary" fontSize="large" sx={{ mr: 2 }} />
//             <Typography variant="h4">Notifications</Typography>
//           </Box>

//           <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
//             <Tab label="All Applications" />
//             <Tab label="With Feedback" />
//           </Tabs>

//           {filteredApplications.length === 0 ? (
//             <Typography>No applications found.</Typography>
//           ) : (
//             filteredApplications.map(app => (
//               <Card key={app.id} sx={{ mb: 2, cursor: 'pointer' }} onClick={() => viewApplicationDetails(app)}>
//                 <CardContent>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Box>
//                       <Typography variant="h6">{app.title}</Typography>
//                       <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//                         {getStatusIcon(app.status)}
//                         <Chip label={app.status} size="small" />
//                         {app.officer_feedback && <Chip icon={<FeedbackIcon />} label="Has Feedback" size="small" />}
//                       </Box>
//                     </Box>
//                     <Typography variant="body2" color="text.secondary">Click to view</Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </Paper>

//         {selectedApplication && (
//           <Dialog open={detailDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//             <DialogTitle>{selectedApplication.title}</DialogTitle>
//             <DialogContent dividers>
//               <Typography variant="subtitle2">Status:</Typography>
//               <Typography>{selectedApplication.status}</Typography>

//               {selectedApplication.officer_feedback && (
//                 <Box sx={{ mt: 2, mb: 2 }}>
//                   <Typography variant="subtitle2">Officer Feedback:</Typography>
//                   <Typography>{selectedApplication.officer_feedback}</Typography>
//                 </Box>
//               )}

//               {selectedApplication.attachments && selectedApplication.attachments.length > 0 && (
//                 <Box sx={{ mt: 2 }}>
//                   <Typography variant="subtitle2">Attachments:</Typography>
//                   <List>
//                     {selectedApplication.attachments.map(att => (
//                       <ListItem key={att.id} secondaryAction={
//                         <IconButton onClick={() => handleDownload(att)}>
//                           <DownloadIcon />
//                         </IconButton>
//                       }>
//                         <ListItemIcon><DocumentIcon /></ListItemIcon>
//                         <ListItemText primary={att.file_type} secondary={att.original_filename} />
//                       </ListItem>
//                     ))}
//                   </List>
//                 </Box>
//               )}
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDialog}>Close</Button>
//             </DialogActions>
//           </Dialog>
//         )}

//         <Snackbar open={!!message.text} autoHideDuration={6000} onClose={() => setMessage({ text: '', severity: 'info' })}>
//           <Alert severity={message.severity}>{message.text}</Alert>
//         </Snackbar>
//       </Container>
//     </AppLayout>
//   );
// };

// export default Notifications;























import React, { useState, useEffect } from 'react';
import AppLayout from "../../components/layouts/AppLayout";        
import {
  Container, Paper, Typography, Box, Card, CardContent,
  Button, Chip, Divider, Accordion, AccordionSummary, AccordionDetails,
  Alert, Snackbar, CircularProgress, List, ListItem, ListItemText,
  ListItemIcon, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, Badge, Tabs, Tab, Grid
} from '@mui/material';
import {
  CheckCircle as ApprovedIcon,
  Cancel as RejectedIcon,
  Schedule as PendingIcon,
  ExpandMore as ExpandMoreIcon,
  Download as DownloadIcon,
  Description as DocumentIcon,
  Feedback as FeedbackIcon,
} from '@mui/icons-material';
import './Notifications.css';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Helper to get auth headers
const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('access')}`,
  'Content-Type': 'application/json'
});

const Notifications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', severity: 'info' });
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/applications/`, { headers: getAuthHeaders() })
      .then(res => res.json())
      .then(data => {
        // Filter only applications of current user
        const myApps = data.filter(app => app.researcher_name === localStorage.getItem('username'));
        setApplications(myApps);

        const unread = myApps.filter(app => app.officer_feedback && !app.feedback_viewed).length;
        setUnreadCount(unread);

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessage({ text: 'Failed to load applications', severity: 'error' });
        setLoading(false);
      });
  };

  const viewApplicationDetails = (application) => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/applications/${application.id}/`, { headers: getAuthHeaders() })
      .then(res => res.json())
      .then(appData => {
        fetch(`${API_BASE_URL}/api/applications/${application.id}/attachments/`, { headers: getAuthHeaders() })
          .then(res => res.json())
          .then(attData => {
            setSelectedApplication({ ...appData, attachments: attData });
            setDetailDialogOpen(true);
            setLoading(false);
          });
      })
      .catch(err => {
        console.error(err);
        setMessage({ text: 'Failed to load application details', severity: 'error' });
        setLoading(false);
      });
  };

  const handleDownload = (attachment) => {
    if (attachment.file_url) window.open(attachment.file_url, '_blank');
  };

  const handleCloseDialog = () => {
    setDetailDialogOpen(false);
    setSelectedApplication(null);
  };

  const handleCloseSnackbar = () => setMessage({ text: '', severity: 'info' });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <ApprovedIcon color="success" />;
      case 'Rejected': return <RejectedIcon color="error" />;
      case 'Pending': return <PendingIcon color="warning" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Rejected': return 'error';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  const filteredApplications = activeTab === 0
    ? applications
    : applications.filter(app => app.officer_feedback);

  if (loading) {
    return (
      <AppLayout>
        <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Container>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Badge badgeContent={unreadCount} color="error" sx={{ mr: 2 }}>
              <FeedbackIcon color="primary" fontSize="large" />
            </Badge>
            <Typography variant="h4">My Notifications</Typography>
          </Box>

          <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 3 }}>
            <Tab label="All Applications" />
            <Tab label="With Feedback" />
          </Tabs>

          {filteredApplications.length === 0 ? (
            <Card sx={{ textAlign: 'center', py: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {activeTab === 0 ? 'No Applications Yet' : 'No Feedback Yet'}
                </Typography>
                <Button variant="contained" href="/submit-application">
                  Submit New Application
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map(app => (
              <Card 
                key={app.id} 
                sx={{ mb: 2, cursor: 'pointer', borderLeft: app.officer_feedback && !app.feedback_viewed ? '4px solid #ff5722' : '1px solid #e0e0e0' }}
                onClick={() => viewApplicationDetails(app)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{app.title}</Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                        {getStatusIcon(app.status)}
                        <Chip label={app.status} color={getStatusColor(app.status)} size="small" />
                        {app.officer_feedback && !app.feedback_viewed && <Chip label="New Feedback" color="error" size="small" />}
                        {app.officer_feedback && <Chip icon={<FeedbackIcon />} label="Has Feedback" color="primary" variant="outlined" size="small" />}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Submitted on: {app.submitted_at ? new Date(app.submitted_at).toLocaleDateString() : 'Not submitted'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Paper>

        {/* Detail Dialog */}
        {selectedApplication && (
          <Dialog open={detailDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth scroll="paper">
            <DialogTitle>{selectedApplication.title}</DialogTitle>
            <DialogContent dividers>
              <Box>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Research Type</Typography>
                    <Typography>{selectedApplication.research_type}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Year</Typography>
                    <Typography>{selectedApplication.year}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Category</Typography>
                    <Typography>{selectedApplication.category || 'N/A'}</Typography>
                  </Grid>
                </Grid>

                {selectedApplication.officer_feedback && (
                  <Card variant="outlined" sx={{ bgcolor: 'background.default', borderColor: 'primary.main', mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" color="primary">
                        <FeedbackIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        Officer Feedback
                      </Typography>
                      <Typography sx={{ whiteSpace: 'pre-wrap' }}>{selectedApplication.officer_feedback}</Typography>
                    </CardContent>
                  </Card>
                )}

                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Research Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="subtitle2">Description</Typography>
                    <Typography>{selectedApplication.description}</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2">Objectives</Typography>
                    <Typography>{selectedApplication.objectives}</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2">Methodology</Typography>
                    <Typography>{selectedApplication.methodology}</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2">Expected Outcomes</Typography>
                    <Typography>{selectedApplication.expected_outcomes}</Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Attachments</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {selectedApplication.attachments?.length > 0 ? (
                      <List>
                        {selectedApplication.attachments.map(att => (
                          <ListItem key={att.id} secondaryAction={<IconButton onClick={() => handleDownload(att)}><DownloadIcon /></IconButton>}>
                            <ListItemIcon><DocumentIcon /></ListItemIcon>
                            <ListItemText primary={att.file_type} secondary={att.original_filename} />
                          </ListItem>
                        ))}
                      </List>
                    ) : <Typography>No attachments</Typography>}
                  </AccordionDetails>
                </Accordion>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        )}

        <Snackbar open={!!message.text} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={handleCloseSnackbar} severity={message.severity} sx={{ width: '100%' }}>{message.text}</Alert>
        </Snackbar>
      </Container>
    </AppLayout>
  );
};

export default Notifications;
