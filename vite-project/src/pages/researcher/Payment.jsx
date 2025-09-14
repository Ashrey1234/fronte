

// import React, { useState, useEffect } from 'react';
// import { 
//   Container, 
//   Typography, 
//   Box, 
//   Paper, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   Button, 
//   Alert,
//   Snackbar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem,
//   CircularProgress
// } from '@mui/material';
// import { Add as AddIcon, Payment as PaymentIcon } from '@mui/icons-material';
// import AppLayout from "../../components/layouts/AppLayout";  // 👈 import layout
// import './Payment.css';

// const Payment = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [openDialog, setOpenDialog] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [formData, setFormData] = useState({
//     research_type: 'Environment & Marine',
//     year: new Date().getFullYear()
//   });

//   // Fetch user's payment history
//   const fetchPayments = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('access');   // ✅ FIXED

//       const response = await fetch("http://127.0.0.1:8000/api/payments/", {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setPayments(data);
//     } catch (err) {
//       setError('Failed to fetch payment history');
//       console.error('Error fetching payments:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   // Generate a new control number
//   const generateControlNumber = async () => {
//     try {
//       setGenerating(true);
//       const token = localStorage.getItem('access');   // ✅ FIXED

//       const response = await fetch("http://127.0.0.1:8000/api/payments/generate/", {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const newPayment = await response.json();
//       setPayments([newPayment, ...payments]);
//       setSuccess('Control number generated successfully!');
//       setOpenDialog(false);
//       setFormData({
//         research_type: 'Environment & Marine',
//         year: new Date().getFullYear()
//       });
//     } catch (err) {
//       setError('Failed to generate control number');
//       console.error('Error generating control number:', err);
//     } finally {
//       setGenerating(false);
//     }
//   };

//   // Close alert messages
//   const handleCloseAlert = () => {
//     setError('');
//     setSuccess('');
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const options = { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(amount);
//   };

//   return (
//     <AppLayout>
//       <Container maxWidth="lg" className="payment-container">
//         <Box className="payment-header">
//           <Typography variant="h4" component="h1" gutterBottom>
//             Payment Management
//           </Typography>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => setOpenDialog(true)}
//             className="generate-button"
//           >
//             Generate Control Number
//           </Button>
//         </Box>

//         {/* Error and Success Alerts */}
//         <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseAlert}>
//           <Alert onClose={handleCloseAlert} severity="error" className="alert-message">
//             {error}
//           </Alert>
//         </Snackbar>
//         <Snackbar open={!!success} autoHideDuration={6000} onClose={handleCloseAlert}>
//           <Alert onClose={handleCloseAlert} severity="success" className="alert-message">
//             {success}
//           </Alert>
//         </Snackbar>

//         {/* Payment History Table */}
//         <Paper className="payment-table-container">
//           <TableContainer className="table-scroll-container">
//             <Table stickyHeader aria-label="payment history table" className="payment-table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Control Number</TableCell>
//                   <TableCell>Research Type</TableCell>
//                   <TableCell>Year</TableCell>
//                   <TableCell>Amount</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Generated Date</TableCell>
//                   <TableCell>Expiry Date</TableCell>
//                   <TableCell>Used</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={8} align="center" className="loading-cell">
//                       <CircularProgress />
//                     </TableCell>
//                   </TableRow>
//                 ) : payments.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={8} align="center" className="no-data-cell">
//                       No payment records found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   payments.map((payment) => (
//                     <TableRow key={payment.id} className="payment-row">
//                       <TableCell className="control-number-cell">{payment.control_number}</TableCell>
//                       <TableCell>{payment.research_type}</TableCell>
//                       <TableCell>{payment.year}</TableCell>
//                       <TableCell className="amount-cell">{formatCurrency(payment.amount)}</TableCell>
//                       <TableCell>
//                         <Box className={`status-badge status-${payment.status.toLowerCase()}`}>
//                           {payment.status}
//                         </Box>
//                       </TableCell>
//                       <TableCell>{formatDate(payment.generated_date)}</TableCell>
//                       <TableCell>{formatDate(payment.expiry_date)}</TableCell>
//                       <TableCell>
//                         {payment.used_for_application ? 'Yes' : 'No'}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>

//         {/* Generate Control Number Dialog */}
//         <Dialog 
//           open={openDialog} 
//           onClose={() => setOpenDialog(false)} 
//           maxWidth="sm" 
//           fullWidth
//           className="generate-dialog"
//         >
//           <DialogTitle className="dialog-title">Generate New Control Number</DialogTitle>
//           <DialogContent>
//             <Box component="form" className="dialog-form">
//               <TextField
//                 select
//                 fullWidth
//                 label="Research Type"
//                 name="research_type"
//                 value={formData.research_type}
//                 onChange={handleInputChange}
//                 className="form-field"
//               >
//                 <MenuItem value="Environment & Marine">Environment & Marine</MenuItem>
//                 <MenuItem value="Aquatic Organisms">Aquatic Organisms</MenuItem>
//                 <MenuItem value="Fisheries Research">Fisheries Research</MenuItem>
//               </TextField>
              
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Year"
//                 name="year"
//                 value={formData.year}
//                 onChange={handleInputChange}
//                 inputProps={{
//                   min: 2000,
//                   max: new Date().getFullYear() + 5
//                 }}
//                 className="form-field"
//               />
//             </Box>
//           </DialogContent>
//           <DialogActions className="dialog-actions">
//             <Button onClick={() => setOpenDialog(false)} className="cancel-button">
//               Cancel
//             </Button>
//             <Button 
//               onClick={generateControlNumber} 
//               variant="contained" 
//               disabled={generating}
//               className="generate-confirm-button"
//               startIcon={generating ? <CircularProgress size={20} /> : <PaymentIcon />}
//             >
//               {generating ? 'Generating...' : 'Generate'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Container>
//     </AppLayout>
//   );
// };

// export default Payment;         




















import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Payment as PaymentIcon } from '@mui/icons-material';
import AppLayout from "../../components/layouts/AppLayout";
import './Payment.css';

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    research_type: 'Environment & Marine',
    year: new Date().getFullYear(),
    nationality: 'Local', // Added field
    level: 'Undergraduate' // Added field
  });

  // Fetch user's payment history
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access');

      const response = await fetch("http://127.0.0.1:8000/api/payments/", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPayments(data);
    } catch (err) {
      setError('Failed to fetch payment history');
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Generate a new control number
  const generateControlNumber = async () => {
    try {
      setGenerating(true);
      const token = localStorage.getItem('access');

      const response = await fetch("http://127.0.0.1:8000/api/payments/generate/", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const newPayment = await response.json();
      setPayments([newPayment, ...payments]);
      setSuccess('Control number generated successfully!');
      setOpenDialog(false);
      setFormData({
        research_type: 'Environment & Marine',
        year: new Date().getFullYear(),
        nationality: 'Local',
        level: 'Undergraduate'
      });
    } catch (err) {
      setError('Failed to generate control number');
      console.error('Error generating control number:', err);
    } finally {
      setGenerating(false);
    }
  };

  // Close alert messages
  const handleCloseAlert = () => {
    setError('');
    setSuccess('');
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <AppLayout>
      <Container maxWidth="lg" className="payment-container">
        <Box className="payment-header">
          <Typography variant="h4" component="h1" gutterBottom>
            Payment Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            className="generate-button"
          >
            Generate Control Number
          </Button>
        </Box>

        {/* Error and Success Alerts */}
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="error" className="alert-message">
            {error}
          </Alert>
        </Snackbar>
        <Snackbar open={!!success} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="success" className="alert-message">
            {success}
          </Alert>
        </Snackbar>

        {/* Payment History Table */}
        <Paper className="payment-table-container">
          <TableContainer className="table-scroll-container">
            <Table stickyHeader aria-label="payment history table" className="payment-table">
              <TableHead>
                <TableRow>
                  <TableCell>Control Number</TableCell>
                  <TableCell>Research Type</TableCell>
                  <TableCell>Nationality</TableCell> {/* Added column */}
                  <TableCell>Level</TableCell> {/* Added column */}
                  <TableCell>Year</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Generated Date</TableCell>
                  <TableCell>Expiry Date</TableCell>
                  <TableCell>Used</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center" className="loading-cell">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center" className="no-data-cell">
                      No payment records found
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment) => (
                    <TableRow key={payment.id} className="payment-row">
                      <TableCell className="control-number-cell">{payment.control_number}</TableCell>
                      <TableCell>{payment.research_type}</TableCell>
                      <TableCell>{payment.nationality}</TableCell> {/* Added cell */}
                      <TableCell>{payment.level}</TableCell> {/* Added cell */}
                      <TableCell>{payment.year}</TableCell>
                      <TableCell className="amount-cell">{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>
                        <Box className={`status-badge status-${payment.status.toLowerCase()}`}>
                          {payment.status}
                        </Box>
                      </TableCell>
                      <TableCell>{formatDate(payment.generated_date)}</TableCell>
                      <TableCell>{formatDate(payment.expiry_date)}</TableCell>
                      <TableCell>
                        {payment.used_for_application ? 'Yes' : 'No'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Generate Control Number Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)} 
          maxWidth="sm" 
          fullWidth
          className="generate-dialog"
        >
          <DialogTitle className="dialog-title">Generate New Control Number</DialogTitle>
          <DialogContent>
            <Box component="form" className="dialog-form">
              {/* Added Nationality Field */}
              <TextField
                select
                fullWidth
                label="Nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className="form-field"
                margin="normal"
              >
                <MenuItem value="Local">Local</MenuItem>
                <MenuItem value="Foreign">Foreign</MenuItem>
              </TextField>

              {/* Added Level Field */}
              <TextField
                select
                fullWidth
                label="Level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="form-field"
                margin="normal"
              >
                <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                <MenuItem value="Master">Master</MenuItem>
                <MenuItem value="PhD">PhD</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                label="Research Type"
                name="research_type"
                value={formData.research_type}
                onChange={handleInputChange}
                className="form-field"
                margin="normal"
              >
                <MenuItem value="Environment & Marine">Environment & Marine</MenuItem>
                <MenuItem value="Aquatic Organisms">Aquatic Organisms</MenuItem>
                <MenuItem value="Fisheries Research">Fisheries Research</MenuItem>
              </TextField>
              
              <TextField
                fullWidth
                type="number"
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                inputProps={{
                  min: 2000,
                  max: new Date().getFullYear() + 5
                }}
                className="form-field"
                margin="normal"
              />
            </Box>
          </DialogContent>
          <DialogActions className="dialog-actions">
            <Button onClick={() => setOpenDialog(false)} className="cancel-button">
              Cancel
            </Button>
            <Button 
              onClick={generateControlNumber} 
              variant="contained" 
              disabled={generating}
              className="generate-confirm-button"
              startIcon={generating ? <CircularProgress size={20} /> : <PaymentIcon />}
            >
              {generating ? 'Generating...' : 'Generate'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AppLayout>
  );
};

export default Payment;









