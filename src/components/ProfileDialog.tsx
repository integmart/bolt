import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button, 
  Box,
  Chip
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ProfileDialog = ({ open, onClose }: ProfileDialogProps) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    onClose();
    navigate('/users/edit/1');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Profile Settings</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="First Name"
              value="Peter"
              disabled
              fullWidth
            />
            <TextField
              label="Last Name"
              value="Smith"
              disabled
              fullWidth
            />
          </Box>
          
          <TextField
            label="Email"
            value="peter.smith@example.com"
            disabled
            fullWidth
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              label="Role"
              value="Admin"
              disabled
              fullWidth
            />
            <Chip 
              label="Admin"
              size="small"
              sx={{ 
                bgcolor: 'rgba(79, 90, 186, 0.1)',
                color: 'rgb(79, 90, 186)'
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleEditProfile} variant="contained">Edit Profile</Button>
      </DialogActions>
    </Dialog>
  );
};