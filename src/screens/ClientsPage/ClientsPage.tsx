import { Add, Search, ContentCopy } from '@mui/icons-material';
import { 
  Box, 
  Container, 
  AppBar, 
  Typography, 
  Button, 
  TextField, 
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Link,
  Tooltip
} from '@mui/material';
import React from "react";
import { useNavigate } from 'react-router-dom';

export const ClientsPage = (): JSX.Element => {
  const navigate = useNavigate();
  
  // Sample data - replace with actual data later
  const clients = [
    {
      id: 1,
      clientId: 'gwmrg33A1AUWtCFCvrvPs5949W',
      name: 'Client Name',
      email: 'client@example.com',
      status: 'Active',
      type: 'Enterprise',
      lastActive: '2024-03-20'
    },
    // Add more sample data as needed
  ];

  const handleCopyClientId = (clientId: string) => {
    navigator.clipboard.writeText(clientId);
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
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" color="white">
          Clients
        </Typography>
      </AppBar>

      <Container maxWidth={false} sx={{ mt: 3, px: 4 }}>
        {/* Header Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
            <TextField
              placeholder="Search clients..."
              size="small"
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ bgcolor: '#2a5898' }}
            onClick={() => navigate('/clients/add')}
          >
            Add Client
          </Button>
        </Box>

        {/* Clients Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Client ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Last Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <Link
                      component="button"
                      onClick={() => navigate(`/clients/edit/${client.id}`)}
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {client.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'monospace',
                        }}
                      >
                        {client.clientId}
                      </Typography>
                      <Tooltip title="Copy Client ID">
                        <IconButton
                          size="small"
                          onClick={() => handleCopyClientId(client.clientId)}
                          sx={{ ml: 1 }}
                        >
                          <ContentCopy fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={client.status} 
                      size="small"
                      sx={{ 
                        bgcolor: client.status === 'Active' ? 'rgba(17, 122, 72, 0.1)' : 'error.light',
                        color: client.status === 'Active' ? 'rgb(17, 122, 72)' : 'error.main'
                      }}
                    />
                  </TableCell>
                  <TableCell>{client.type}</TableCell>
                  <TableCell>{client.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};