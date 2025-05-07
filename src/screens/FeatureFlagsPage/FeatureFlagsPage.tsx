import { Search } from '@mui/icons-material';
import {
  Box,
  Container,
  AppBar,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

type FeatureFlag = {
  id: number;
  name: string;
  description: string;
  status: 'Disable' | 'Limited' | 'Enable';
  dateCreated: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Enable':
      return {
        bg: 'rgba(17, 122, 72, 0.1)',
        color: 'rgb(17, 122, 72)'
      };
    case 'Limited':
      return {
        bg: 'rgba(242, 153, 74, 0.1)',
        color: 'rgb(242, 153, 74)'
      };
    default:
      return {
        bg: 'rgba(235, 102, 97, 0.1)',
        color: 'rgb(235, 102, 97)'
      };
  }
};

export const FeatureFlagsPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - replace with actual data later
  const featureFlags: FeatureFlag[] = [
    {
      id: 1,
      name: 'darkMode',
      description: 'Enable dark mode theme across the application',
      status: 'Enable',
      dateCreated: '2024-03-20',
    },
    {
      id: 2,
      name: 'betaFeatures',
      description: 'Access to beta features for testing',
      status: 'Limited',
      dateCreated: '2024-03-19',
    },
  ];

  const filteredFlags = featureFlags.filter(flag =>
    flag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flag.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" color="white">
          Feature Flags
        </Typography>
      </AppBar>

      <Container maxWidth={false} sx={{ mt: 3, px: 4 }}>
        {/* Header Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
            <TextField
              placeholder="Search feature flags..."
              size="small"
              sx={{ width: 300 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Feature Flags Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFlags.map((flag) => (
                <TableRow
                  key={flag.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/feature-flags/${flag.id}`)}
                >
                  <TableCell>{flag.name}</TableCell>
                  <TableCell>{flag.id}</TableCell>
                  <TableCell>{flag.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={flag.status}
                      size="small"
                      sx={{
                        bgcolor: getStatusColor(flag.status).bg,
                        color: getStatusColor(flag.status).color,
                      }}
                    />
                  </TableCell>
                  <TableCell>{flag.dateCreated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};