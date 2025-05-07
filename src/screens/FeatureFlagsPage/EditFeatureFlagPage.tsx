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
} from '@mui/material';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export const EditFeatureFlagPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Disable' as 'Disable' | 'Limited' | 'Enable',
  });

  // Simulating data fetch - replace with actual data fetching
  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData = {
      name: 'darkMode',
      description: 'Enable dark mode theme across the application',
      status: 'Enable' as const,
    };
    setFormData(mockData);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      // Convert to camelCase and remove spaces
      const camelCaseName = (value as string)
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
      setFormData(prev => ({
        ...prev,
        [name]: camelCaseName
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name as string]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to update feature flag
    console.log('Updated feature flag:', formData);
    navigate('/feature-flags');
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
        <IconButton color="inherit" onClick={() => navigate('/feature-flags')}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" color="white">
          Edit Feature Flag
        </Typography>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                required
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                helperText="Name will be automatically converted to camelCase"
              />

              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
              />

              <FormControl required fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value="Disable">Disable</MenuItem>
                  <MenuItem value="Limited">Limited</MenuItem>
                  <MenuItem value="Enable">Enable</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/feature-flags')}
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
    </Box>
  );
};