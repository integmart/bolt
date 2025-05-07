import { ArrowBack, CloudUpload } from '@mui/icons-material';
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
  FormControlLabel,
  Paper,
  IconButton,
  InputAdornment,
  Tooltip,
  Switch,
  Divider,
  Autocomplete,
  Chip,
} from '@mui/material';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

type FeatureFlag = {
  id: number;
  name: string;
  description: string;
  status: 'Disable' | 'Limited' | 'Enable';
};

export const AddClientPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    category: '',
    website: '',
    hostname: '',
    active: true,
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    featureFlags: [] as number[],
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [hostnameError, setHostnameError] = useState('');
  const [websiteError, setWebsiteError] = useState('');

  // Sample feature flags - replace with actual data from your backend
  const availableFeatureFlags: FeatureFlag[] = [
    {
      id: 1,
      name: 'darkMode',
      description: 'Enable dark mode theme',
      status: 'Enable',
    },
    {
      id: 2,
      name: 'betaFeatures',
      description: 'Access to beta features',
      status: 'Limited',
    },
  ];

  const validateHostname = (value: string) => {
    if (!value) return '';
    const hostnameRegex = /^[a-zA-Z0-9-]+$/;
    return hostnameRegex.test(value) ? '' : 'Only letters, numbers, and dashes are allowed';
  };

  const validateWebsite = (value: string) => {
    if (!value) return '';
    try {
      new URL(value);
      return '';
    } catch {
      return 'Please enter a valid URL (e.g., https://integmart.com)';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'hostname') {
      const error = validateHostname(value);
      setHostnameError(error);
      if (error) return;
    }

    if (name === 'website') {
      const error = validateWebsite(value);
      setWebsiteError(error);
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert('File size must be less than 50MB');
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        if (img.width !== 250 || img.height !== 250) {
          alert('Image dimensions must be 250x250 pixels');
          setLogoFile(null);
          e.target.value = '';
        }
      };
      img.src = URL.createObjectURL(file);
      setLogoFile(file);
    }
  };

  const handleSelectChange = (e: any) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      active: e.target.checked
    }));
  };

  const handleFeatureFlagChange = (_: any, selectedFlags: FeatureFlag[]) => {
    setFormData(prev => ({
      ...prev,
      featureFlags: selectedFlags.map(flag => flag.id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hostnameError || websiteError) return;
    console.log('Form submitted:', { ...formData, logo: logoFile });
    navigate('/clients');
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
        <IconButton color="inherit" onClick={() => navigate('/clients')}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" color="white">
          Add New Client
        </Typography>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Company Info Section */}
              <Typography variant="h6" sx={{ mb: 2 }}>Company Information</Typography>
              <TextField
                required
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                fullWidth
              />

              <FormControl required fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Trucks">Trucks</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Client First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Client Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  type="email"
                />
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>

              <TextField
                label="Client Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                fullWidth
                placeholder="https://integmart.com"
                error={!!websiteError}
                helperText={websiteError}
              />

              <Divider sx={{ my: 2 }} />

              {/* Company Address Section */}
              <Typography variant="h6" sx={{ mb: 2 }}>Company Address</Typography>
              <TextField
                label="Address Line 1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Address Line 2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                fullWidth
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Province/State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
              <TextField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                fullWidth
              />

              <Divider sx={{ my: 2 }} />

              {/* Logo Section */}
              <Typography variant="h6" sx={{ mb: 2 }}>Company Logo</Typography>
              <Tooltip title="Upload a 250x250 pixel image (max 50MB)">
                <Box
                  sx={{
                    border: '2px dashed rgba(0, 0, 0, 0.23)',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.main',
                    },
                  }}
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    style={{ display: 'none' }}
                  />
                  <CloudUpload sx={{ fontSize: 48, color: 'rgba(0, 0, 0, 0.54)', mb: 1 }} />
                  <Typography>
                    {logoFile ? logoFile.name : 'Upload Logo (250x250 pixels, max 50MB)'}
                  </Typography>
                </Box>
              </Tooltip>

              <Divider sx={{ my: 2 }} />

              {/* Feature Flags Section */}
              <Typography variant="h6" sx={{ mb: 2 }}>Feature Flags</Typography>
              <Autocomplete
                multiple
                options={availableFeatureFlags}
                getOptionLabel={(option) => `${option.name} (${option.status})`}
                onChange={handleFeatureFlagChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Feature Flags"
                    placeholder="Select feature flags"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option.id}
                      label={option.name}
                      sx={{
                        bgcolor: 'rgba(79, 90, 186, 0.1)',
                        color: 'rgb(79, 90, 186)'
                      }}
                    />
                  ))
                }
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1">{option.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.description}
                      </Typography>
                    </Box>
                    <Chip
                      label={option.status}
                      size="small"
                      sx={{
                        ml: 1,
                        bgcolor: option.status === 'Enable' 
                          ? 'rgba(17, 122, 72, 0.1)'
                          : option.status === 'Limited'
                          ? 'rgba(242, 153, 74, 0.1)'
                          : 'rgba(235, 102, 97, 0.1)',
                        color: option.status === 'Enable'
                          ? 'rgb(17, 122, 72)'
                          : option.status === 'Limited'
                          ? 'rgb(242, 153, 74)'
                          : 'rgb(235, 102, 97)',
                      }}
                    />
                  </Box>
                )}
              />

              <Divider sx={{ my: 2 }} />

              {/* Hostname and Status Section */}
              <Typography variant="h6" sx={{ mb: 2 }}>Domain Settings</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                  required
                  label="Hostname"
                  name="hostname"
                  value={formData.hostname}
                  onChange={handleChange}
                  sx={{ width: '400px' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">.integmart.com</InputAdornment>,
                  }}
                  error={!!hostnameError}
                  helperText={hostnameError || "Enter subdomain (must be unique)"}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.active}
                      onChange={handleSwitchChange}
                      name="active"
                      color="primary"
                    />
                  }
                  label="Active"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/clients')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: '#2a5898' }}
                  disabled={!!hostnameError || !!websiteError}
                >
                  Create Client
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};