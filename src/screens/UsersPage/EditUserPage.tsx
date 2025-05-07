import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Container,
  AppBar,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  IconButton,
  FormControlLabel,
  Autocomplete,
  Chip,
  Switch,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export const EditUserPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    status: true,
    assignedClients: [] as string[],
  });
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  // Sample clients data - replace with actual data
  const availableClients = [
    'Client A',
    'Client B',
    'Client C',
  ];

  // Simulating data fetch - replace with actual data fetching
  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'Client Admin',
      status: true,
      assignedClients: ['Client A', 'Client B'],
    };
    setFormData(mockData);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: any) => {
    setFormData(prev => ({
      ...prev,
      role: e.target.value
    }));
  };

  const handleClientChange = (_: any, newValue: string[]) => {
    setFormData(prev => ({
      ...prev,
      assignedClients: newValue
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      status: e.target.checked
    }));
  };

  const handleResetPassword = () => {
    // Add logic to send password reset email
    console.log('Password reset email sent to:', formData.email);
    setShowResetSuccess(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/users');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: '#2a5898',
          boxShadow: 'none',
          height: 64,
          px: 3,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <IconButton color="inherit" onClick={() => navigate('/users')}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" color="white">
          Edit User
        </Typography>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  required
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  required
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>

              <TextField
                required
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />

              <FormControl required fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={formData.role}
                  label="Role"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Client Admin">Client Admin</MenuItem>
                </Select>
              </FormControl>

              {formData.role === 'Client Admin' && (
                <Autocomplete
                  multiple
                  options={availableClients}
                  value={formData.assignedClients}
                  onChange={handleClientChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assigned Clients"
                      required
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option}
                        label={option}
                        sx={{
                          bgcolor: 'rgba(0, 63, 91, 0.1)',
                          color: 'rgb(0, 63, 91)'
                        }}
                      />
                    ))
                  }
                />
              )}

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.status}
                    onChange={handleStatusChange}
                    name="status"
                  />
                }
                label={formData.status ? "Active" : "Inactive"}
              />

              <Divider sx={{ my: 2 }} />

              <Button
                variant="outlined"
                onClick={handleResetPassword}
                sx={{ alignSelf: 'flex-start' }}
              >
                Reset Password
              </Button>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/users')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: '#2a5898' }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>

      <Snackbar
        open={showResetSuccess}
        autoHideDuration={6000}
        onClose={() => setShowResetSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowResetSuccess(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          Password reset email has been sent successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};