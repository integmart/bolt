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
  Radio,
  RadioGroup,
  FormLabel,
  Autocomplete,
  Chip,
} from '@mui/material';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const AddUserPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    passwordOption: 'create',
    password: '',
    confirmPassword: '',
    assignedClients: [] as string[],
  });

  // Sample clients data - replace with actual data
  const availableClients = [
    'Client A',
    'Client B',
    'Client C',
  ];

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
          height: 80,
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
          Add New User
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

              <FormControl>
                <FormLabel>Password Setup</FormLabel>
                <RadioGroup
                  name="passwordOption"
                  value={formData.passwordOption}
                  onChange={handleChange}
                >
                  <FormControlLabel 
                    value="create" 
                    control={<Radio />} 
                    label="Create password" 
                  />
                  <FormControlLabel 
                    value="user" 
                    control={<Radio />} 
                    label="Let user set password via email" 
                  />
                </RadioGroup>
              </FormControl>

              {formData.passwordOption === 'create' && (
                <>
                  <TextField
                    required
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    required
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                  />
                </>
              )}

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
                  Create User
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};