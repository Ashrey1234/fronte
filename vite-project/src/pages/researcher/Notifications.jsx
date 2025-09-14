

// import React, { useState, useEffect } from 'react';                                   it have delete button
// import AppLayout from "../../components/layouts/AppLayout";        
// import {
//   Container, Paper, Typography, Box, Card, CardContent,
//   Button, Chip, Divider, Accordion, AccordionSummary, AccordionDetails,
//   Alert, Snackbar, CircularProgress, List, ListItem, ListItemText,
//   ListItemIcon, IconButton, Dialog, DialogTitle, DialogContent,
//   DialogActions, Badge, Tabs, Tab, Grid
// } from '@mui/material';
// import {
//   CheckCircle as ApprovedIcon,
//   Cancel as RejectedIcon,
//   Schedule as PendingIcon,
//   ExpandMore as ExpandMoreIcon,
//   Download as DownloadIcon,
//   Description as DocumentIcon,
//   Feedback as FeedbackIcon,
//   Delete as DeleteIcon
// } from '@mui/icons-material';
// import './Notifications.css';

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
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // New
//   const [appToDelete, setAppToDelete] = useState(null); // New
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [activeTab, setActiveTab] = useState(0);

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const fetchApplications = () => {
//     setLoading(true);
//     fetch(`${API_BASE_URL}/api/applications/`, { headers: getAuthHeaders() })
//       .then(res => res.json())
//       .then(data => {
//         const myApps = data.filter(app => app.researcher_name === localStorage.getItem('username'));
//         setApplications(myApps);
//         const unread = myApps.filter(app => app.officer_feedback && !app.feedback_viewed).length;
//         setUnreadCount(unread);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setMessage({ text: 'Failed to load applications', severity: 'error' });
//         setLoading(false);
//       });
//   };

//   const viewApplicationDetails = (application) => {
//     setLoading(true);
//     fetch(`${API_BASE_URL}/api/applications/${application.id}/`, { headers: getAuthHeaders() })
//       .then(res => res.json())
//       .then(appData => {
//         fetch(`${API_BASE_URL}/api/applications/${application.id}/attachments/`, { headers: getAuthHeaders() })
//           .then(res => res.json())
//           .then(attData => {
//             setSelectedApplication({ ...appData, attachments: attData });
//             setDetailDialogOpen(true);
//             setLoading(false);
//           });
//       })
//       .catch(err => {
//         console.error(err);
//         setMessage({ text: 'Failed to load application details', severity: 'error' });
//         setLoading(false);
//       });
//   };

//   const handleDownload = (attachment) => {
//     if (attachment.file_url) window.open(attachment.file_url, '_blank');
//   };

//   const handleCloseDialog = () => {
//     setDetailDialogOpen(false);
//     setSelectedApplication(null);
//   };

//   const handleCloseSnackbar = () => setMessage({ text: '', severity: 'info' });

//   // Open delete confirmation dialog
//   const confirmDelete = (applicationId) => {
//     setAppToDelete(applicationId);
//     setDeleteDialogOpen(true);
//   };

//   const handleDelete = () => {
//     if (!appToDelete) return;

//     setLoading(true);
//     fetch(`${API_BASE_URL}/api/applications/${appToDelete}/`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//     })
//       .then(res => {
//         if (res.ok) {
//           setApplications(prev => prev.filter(app => app.id !== appToDelete));
//           setMessage({ text: "Application deleted successfully", severity: "success" });
//           handleCloseDialog();
//         } else {
//           throw new Error("Failed to delete application");
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         setMessage({ text: "Error deleting application", severity: "error" });
//       })
//       .finally(() => {
//         setLoading(false);
//         setDeleteDialogOpen(false);
//         setAppToDelete(null);
//       });
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Approved': return <ApprovedIcon color="success" />;
//       case 'Rejected': return <RejectedIcon color="error" />;
//       case 'Pending': return <PendingIcon color="warning" />;
//       default: return null;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Approved': return 'success';
//       case 'Rejected': return 'error';
//       case 'Pending': return 'warning';
//       default: return 'default';
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
//             <Badge badgeContent={unreadCount} color="error" sx={{ mr: 2 }}>
//               <FeedbackIcon color="primary" fontSize="large" />
//             </Badge>
//             <Typography variant="h4">My Notifications</Typography>
//           </Box>

//           <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 3 }}>
//             <Tab label="All Applications" />
//             <Tab label="With Feedback" />
//           </Tabs>

//           {filteredApplications.length === 0 ? (
//             <Card sx={{ textAlign: 'center', py: 4 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   {activeTab === 0 ? 'No Applications Yet' : 'No Feedback Yet'}
//                 </Typography>
//                 <Button variant="contained" href="/submit-application">
//                   Submit New Application
//                 </Button>
//               </CardContent>
//             </Card>
//           ) : (
//             filteredApplications.map(app => (
//               <Card 
//                 key={app.id} 
//                 sx={{ mb: 2, cursor: 'pointer', borderLeft: app.officer_feedback && !app.feedback_viewed ? '4px solid #ff5722' : '1px solid #e0e0e0' }}
//                 onClick={() => viewApplicationDetails(app)}
//               >
//                 <CardContent>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                     <Box sx={{ flex: 1 }}>
//                       <Typography variant="h6">{app.title}</Typography>
//                       <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
//                         {getStatusIcon(app.status)}
//                         <Chip label={app.status} color={getStatusColor(app.status)} size="small" />
//                         {app.officer_feedback && !app.feedback_viewed && <Chip label="New Feedback" color="error" size="small" />}
//                         {app.officer_feedback && <Chip icon={<FeedbackIcon />} label="Has Feedback" color="primary" variant="outlined" size="small" />}
//                       </Box>
//                       <Typography variant="body2" color="text.secondary">
//                         Submitted on: {app.submitted_at ? new Date(app.submitted_at).toLocaleDateString() : 'Not submitted'}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </Paper>

//         {/* Detail Dialog */}
//         {selectedApplication && (
//           <Dialog open={detailDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth scroll="paper">
//             <DialogTitle>{selectedApplication.title}</DialogTitle>
//             <DialogContent dividers>
//               <Box>
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

//                 {selectedApplication.officer_feedback && (
//                   <Card variant="outlined" sx={{ bgcolor: 'background.default', borderColor: 'primary.main', mb: 2 }}>
//                     <CardContent>
//                       <Typography variant="h6" color="primary">
//                         <FeedbackIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
//                         Officer Feedback
//                       </Typography>
//                       <Typography sx={{ whiteSpace: 'pre-wrap' }}>{selectedApplication.officer_feedback}</Typography>
//                     </CardContent>
//                   </Card>
//                 )}

//                 <Accordion defaultExpanded>
//                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                     <Typography>Research Details</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <Typography variant="subtitle2">Description</Typography>
//                     <Typography>{selectedApplication.description}</Typography>
//                     <Divider sx={{ my: 2 }} />
//                     <Typography variant="subtitle2">Objectives</Typography>
//                     <Typography>{selectedApplication.objectives}</Typography>
//                     <Divider sx={{ my: 2 }} />
//                     <Typography variant="subtitle2">Methodology</Typography>
//                     <Typography>{selectedApplication.methodology}</Typography>
//                     <Divider sx={{ my: 2 }} />
//                     <Typography variant="subtitle2">Expected Outcomes</Typography>
//                     <Typography>{selectedApplication.expected_outcomes}</Typography>
//                   </AccordionDetails>
//                 </Accordion>

//                 <Accordion defaultExpanded>
//                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                     <Typography>Attachments</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     {selectedApplication.attachments?.length > 0 ? (
//                       <List>
//                         {selectedApplication.attachments.map(att => (
//                           <ListItem key={att.id} secondaryAction={<IconButton onClick={() => handleDownload(att)}><DownloadIcon /></IconButton>}>
//                             <ListItemIcon><DocumentIcon /></ListItemIcon>
//                             <ListItemText primary={att.file_type} secondary={att.original_filename} />
//                           </ListItem>
//                         ))}
//                       </List>
//                     ) : <Typography>No attachments</Typography>}
//                   </AccordionDetails>
//                 </Accordion>
//               </Box>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => confirmDelete(selectedApplication.id)} color="error" startIcon={<DeleteIcon />}>
//                 Delete
//               </Button>
//               <Button onClick={handleCloseDialog}>Close</Button>
//             </DialogActions>
//           </Dialog>
//         )}

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

//         <Snackbar open={!!message.text} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//           <Alert onClose={handleCloseSnackbar} severity={message.severity} sx={{ width: '100%' }}>{message.text}</Alert>
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
