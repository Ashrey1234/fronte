
// src/pages/researcher/SubmitApplication.jsx

import React, { useState, useEffect } from 'react';
import AppLayout from "../../components/layouts/AppLayout";      
import {
  Container, Paper, Typography, TextField, MenuItem, Button, Grid, Box,
  Alert, Snackbar, List, ListItem, ListItemText, ListItemIcon, IconButton,
  CircularProgress, Card, CardContent, Stepper, Step, StepLabel,
  Chip, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import {
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  Save as SaveIcon,
  Send as SendIcon,
  Description as DocumentIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as ApprovedIcon,
  Cancel as RejectedIcon,
  Schedule as PendingIcon
} from '@mui/icons-material';
import './SubmitApplication.css';

const API_BASE_URL = 'http://127.0.0.1:8000';

const getAuthHeaders = (isJson = true) => {
  const headers = { 'Authorization': `Bearer ${localStorage.getItem('access')}` };
  if (isJson) headers['Content-Type'] = 'application/json';
  return headers;
};

const getFileName = (path) => path ? path.split('/').pop() : '';

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
    expected_outcomes: '',
    status: 'Draft',
    officer_feedback: ''
  });

  const [attachments, setAttachments] = useState([]);
  const [newAttachment, setNewAttachment] = useState({ file_type: 'Makamu Form', file: null });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', severity: 'info' });
  const [applicationId, setApplicationId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

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
        if (data.status !== 'Draft') setShowFeedback(true);
        return fetch(`${API_BASE_URL}/api/applications/${id}/attachments/`, { headers: getAuthHeaders() });
      })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch attachments'))
      .then(data => setAttachments(data))
      .catch(() => setMessage({ text: 'Failed to load application data', severity: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  const handleApplicationChange = e => setApplication(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
      .then(res => res.ok ? res.json() : Promise.reject('Failed to save'))
      .then(data => {
        setApplicationId(data.id);
        setMessage({ text: 'Draft saved successfully', severity: 'success' });
        setActiveStep(1);
      })
      .catch(() => setMessage({ text: 'Failed to save draft', severity: 'error' }))
      .finally(() => setSaving(false));
  };

  const uploadAttachment = () => {
    if (!applicationId) return setMessage({ text: 'Save the application first', severity: 'warning' });
    if (!newAttachment.file) return setMessage({ text: 'Select a file to upload', severity: 'warning' });
    const formData = new FormData();
    formData.append('file_type', newAttachment.file_type);
    formData.append('file_path', newAttachment.file);
    fetch(`${API_BASE_URL}/api/applications/${applicationId}/attachments/`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access')}` },
      body: formData
    })
      .then(res => res.ok ? res.json() : Promise.reject('Upload failed'))
      .then(data => {
        setAttachments(prev => [...prev, data]);
        setNewAttachment({ file_type: 'Makamu Form', file: null });
        document.getElementById('file-input').value = '';
        setMessage({ text: 'File uploaded successfully', severity: 'success' });
      })
      .catch(() => setMessage({ text: 'Failed to upload file', severity: 'error' }));
  };

  const deleteAttachment = id => {
    fetch(`${API_BASE_URL}/api/applications/${applicationId}/attachments/${id}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access')}` }
    })
      .then(res => res.ok ? setAttachments(prev => prev.filter(a => a.id !== id)) : Promise.reject('Delete failed'))
      .then(() => setMessage({ text: 'File deleted successfully', severity: 'success' }))
      .catch(() => setMessage({ text: 'Failed to delete file', severity: 'error' }));
  };

  const submitApplication = () => {
    if (!applicationId) return setMessage({ text: 'Save the application first', severity: 'warning' });
    const requiredTypes = ['Makamu Form', 'Proposal', 'Ethical Form'];
    const missing = requiredTypes.filter(t => !attachments.map(a => a.file_type).includes(t));
    if (missing.length) return setMessage({ text: `Missing attachments: ${missing.join(', ')}`, severity: 'warning' });

    setSubmitting(true);
    fetch(`${API_BASE_URL}/api/applications/${applicationId}/submit/`, {
      method: 'POST',
      headers: getAuthHeaders()
    })
      .then(res => res.ok ? res.json() : Promise.reject('Submit failed'))
      .then(() => {
        setApplication(prev => ({ ...prev, status: 'Pending' }));
        setShowFeedback(true);
        setMessage({ text: 'Application submitted successfully', severity: 'success' });
        setActiveStep(2);
      })
      .catch(() => setMessage({ text: 'Failed to submit application', severity: 'error' }))
      .finally(() => setSubmitting(false));
  };

  const handleCloseSnackbar = () => setMessage({ text: '', severity: 'info' });
  const steps = ['Application Details', 'Attachments', 'Review & Submit'];

  const getStatusIcon = () => {
    switch (application.status) {
      case 'Approved': return <ApprovedIcon color="success" />;
      case 'Rejected': return <RejectedIcon color="error" />;
      case 'Pending': return <PendingIcon color="warning" />;
      default: return null;
    }
  };
  const getStatusColor = () => {
    switch (application.status) {
      case 'Approved': return 'success';
      case 'Rejected': return 'error';
      case 'Pending': return 'warning';
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
      <Container maxWidth="lg" className="submit-container">
        <Paper className="submit-paper">
          <Typography variant="h4" gutterBottom align="center">
            Research Application Submission
          </Typography>

          {/* Feedback & status */}
          {showFeedback && (
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getStatusIcon()}
                  <Typography variant="h6" sx={{ ml: 1 }}>Application Status: </Typography>
                  <Chip label={application.status} color={getStatusColor()} sx={{ ml: 2 }} />
                </Box>
                {application.officer_feedback && (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Officer Feedback</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{application.officer_feedback}</Typography>
                    </AccordionDetails>
                  </Accordion>
                )}
              </CardContent>
            </Card>
          )}

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map(label => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>

          {/* Step 1: Application Details */}
          {activeStep === 0 && (
            <Box component="form" sx={{ mt: 3 }}>
              <Grid container spacing={4}>
                {/* Line 1 */}
                <Grid item xs={12} sm={6} className="form-line">
                  <TextField fullWidth label="Research Title" name="title" value={application.title} onChange={handleApplicationChange} />
                </Grid>
                <Grid item xs={12} sm={6} className="form-line">
                  <TextField fullWidth label="Category" name="category" value={application.category} onChange={handleApplicationChange} />
                </Grid>

                {/* Line 2 */}
                <Grid item xs={12} sm={6} className="form-line">
                  <TextField fullWidth select label="Research Type" name="research_type" value={application.research_type} onChange={handleApplicationChange}>
                    <MenuItem value="Environment & Marine">Environment & Marine</MenuItem>
                    <MenuItem value="Aquatic Organisms">Aquatic Organisms</MenuItem>
                    <MenuItem value="Fisheries Research">Fisheries Research</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} className="form-line">
                  <TextField fullWidth type="number" label="Year" name="year" value={application.year} onChange={handleApplicationChange} inputProps={{ min: 2000, max: new Date().getFullYear() + 5 }} />
                </Grid>

                {/* Line 3 */}
                <Grid item xs={12} sm={6} className="form-line">
                  <TextField fullWidth type="date" label="Start Date" name="start_date" value={application.start_date} onChange={handleApplicationChange} InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} sm={6} className="form-line">
                  <TextField fullWidth type="date" label="End Date" name="end_date" value={application.end_date} onChange={handleApplicationChange} InputLabelProps={{ shrink: true }} />
                </Grid>

                {/* Line 4 */}
                <Grid item xs={12} className="form-line">
                  <TextField fullWidth multiline minRows={6} label="Research Description" name="description" value={application.description} onChange={handleApplicationChange} className="large-field" />
                </Grid>

                {/* Line 5 */}
                <Grid item xs={12} className="form-line">
                  <TextField fullWidth multiline minRows={6} label="Objectives" name="objectives" value={application.objectives} onChange={handleApplicationChange} className="large-field" />
                </Grid>

                {/* Line 6 */}
                <Grid item xs={12} className="form-line">
                  <TextField fullWidth multiline minRows={6} label="Methodology" name="methodology" value={application.methodology} onChange={handleApplicationChange} className="large-field" />
                </Grid>

                {/* Line 7 */}
                <Grid item xs={12} className="form-line">
                  <TextField fullWidth multiline minRows={6} label="Expected Outcomes" name="expected_outcomes" value={application.expected_outcomes} onChange={handleApplicationChange} className="large-field" />
                </Grid>
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
                    <ListItem key={a.id} secondaryAction={<IconButton edge="end" onClick={() => deleteAttachment(a.id)}><DeleteIcon /></IconButton>}>
                      <ListItemIcon><DocumentIcon /></ListItemIcon>
                      <ListItemText primary={a.file_type} secondary={getFileName(a.file_path)} />
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

          {/* Step 3: Success */}
          {activeStep === 2 && (
            <Box className="submit-success">
              <Typography variant="h5" gutterBottom>Application Submitted Successfully!</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Your research application has been submitted for review.
              </Typography>
              <Button variant="contained" onClick={() => window.location.href = '/'}>Return to Dashboard</Button>
            </Box>
          )}
        </Paper>

        {/* Snackbar for messages */}
        <Snackbar 
          open={!!message.text} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={message.severity} sx={{ width: '100%' }}>
            {message.text}
          </Alert>
        </Snackbar>
      </Container>
    </AppLayout>
  );
};

export default SubmitApplication;













