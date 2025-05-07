import { Add, Search, FilterAlt } from '@mui/icons-material';
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
  Avatar,
  Chip,
  Link,
  Snackbar,
  Alert,
  Popover,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const UsersPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [filters, setFilters] = useState({
    roles: {
      Admin: false,
      'Client Admin': false
    },
    clients: {
      'Client A': false,
      'Client B': false
    }
  });

  // Sample data - replace with actual data later
  const users = [
    {
      id: 1,
      name: 'Peter Smith',
      email: 'peter@example.com',
      role: 'Admin',
      status: 'Active',
      lastActive: '2024-03-20',
      clients: []
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Client Admin',
      status: 'Inactive',
      lastActive: '2024-03-19',
      clients: ['Client A', 'Client B']
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Client Admin',
      status: 'Active',
      lastActive: '2024-03-18',
      clients: ['Client A']
    }
  ];

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (category: 'roles' | 'clients', item: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category][item]
      }
    }));
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Search filter
      const searchMatch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Role filter
      const activeRoleFilters = Object.entries(filters.roles).filter(([_, checked]) => checked);
      const roleMatch = activeRoleFilters.length === 0 || 
                       activeRoleFilters.some(([role]) => user.role === role);

      // Client filter
      const activeClientFilters = Object.entries(filters.clients).filter(([_, checked]) => checked);
      const clientMatch = activeClientFilters.length === 0 ||
                         activeClientFilters.some(([client]) => user.clients.includes(client));

      return searchMatch && roleMatch && clientMatch;
    });
  }, [users, searchQuery, filters]);

  const activeFiltersCount = Object.values(filters.roles).filter(Boolean).length +
                            Object.values(filters.clients).filter(Boolean).length;

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
          Users
        </Typography>
      </AppBar>

      <Container maxWidth={false} sx={{ mt: 3, px: 4 }}>
        {/* Header Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
            <TextField
              placeholder="Search users..."
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
            <Button
              variant="outlined"
              startIcon={<FilterAlt />}
              onClick={handleFilterClick}
              sx={{ 
                borderColor: 'rgba(0, 0, 0, 0.23)',
                position: 'relative'
              }}
            >
              Filters
              {activeFiltersCount > 0 && (
                <Chip
                  label={activeFiltersCount}
                  size="small"
                  sx={{
                    ml: 1,
                    height: 20,
                    minWidth: 20,
                    bgcolor: '#2a5898',
                    color: 'white'
                  }}
                />
              )}
            </Button>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ bgcolor: '#2a5898' }}
            onClick={() => navigate('/users/add')}
          >
            Add User
          </Button>
        </Box>

        {/* Filters Popover */}
        <Popover
          open={Boolean(filterAnchorEl)}
          anchorEl={filterAnchorEl}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2, width: 250 }}>
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <FormLabel component="legend">Role</FormLabel>
              <FormGroup>
                {Object.keys(filters.roles).map((role) => (
                  <FormControlLabel
                    key={role}
                    control={
                      <Checkbox
                        checked={filters.roles[role]}
                        onChange={() => handleFilterChange('roles', role)}
                      />
                    }
                    label={role}
                  />
                ))}
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
              <FormLabel component="legend">Assigned Clients</FormLabel>
              <FormGroup>
                {Object.keys(filters.clients).map((client) => (
                  <FormControlLabel
                    key={client}
                    control={
                      <Checkbox
                        checked={filters.clients[client]}
                        onChange={() => handleFilterChange('clients', client)}
                      />
                    }
                    label={client}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Box>
        </Popover>

        {/* Users Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Last Active</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Assigned Clients</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Link
                        component="button"
                        onClick={() => navigate(`/users/edit/${user.id}`)}
                        sx={{
                          color: '#1976d2',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {user.name}
                      </Link>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role}
                      size="small"
                      sx={{ 
                        bgcolor: user.role === 'Admin' ? 'rgba(79, 90, 186, 0.1)' : 'rgba(140, 140, 140, 0.1)',
                        color: user.role === 'Admin' ? 'rgb(79, 90, 186)' : 'rgb(140, 140, 140)'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status} 
                      size="small"
                      sx={{ 
                        bgcolor: user.status === 'Active' ? 'rgba(17, 122, 72, 0.1)' : 'rgba(235, 102, 97, 0.08)',
                        color: user.status === 'Active' ? 'rgb(17, 122, 72)' : 'rgb(235, 102, 97)'
                      }}
                    />
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    {user.clients?.map((client, index) => (
                      <Chip
                        key={index}
                        label={client}
                        size="small"
                        sx={{ 
                          mr: 0.5,
                          bgcolor: 'rgba(0, 63, 91, 0.1)',
                          color: 'rgb(0, 63, 91)'
                        }}
                      />
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
      </Container>
    </Box>
  );
};