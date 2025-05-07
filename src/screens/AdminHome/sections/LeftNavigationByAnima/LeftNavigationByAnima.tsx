import { Home, Person, Group, Logout, Flag } from '@mui/icons-material';
import { 
  Avatar, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Menu,
  MenuItem,
  styled 
} from '@mui/material';
import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const navigationItems = [
  { icon: <Home fontSize="small" />, label: "Home", path: "/" },
  { icon: <Group fontSize="small" />, label: "Clients", path: "/clients" },
  { icon: <Person fontSize="small" />, label: "Users", path: "/users" },
  { icon: <Flag fontSize="small" />, label: "Feature Flags", path: "/feature-flags" },
];

const StyledDrawer = styled(Drawer)({
  width: 80,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 80,
    boxSizing: 'border-box',
    backgroundColor: 'white',
    border: 'none',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  },
});

export const LeftNavigationByAnima = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    // Add logout logic here
    console.log('Logout clicked');
  };

  return (
    <StyledDrawer variant="permanent">
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ height: 64, width: 64, margin: 'auto' }}>
          <img
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="Logo"
            src="/icon-color-1.png"
          />
        </Box>

        <List sx={{ flex: 1, px: 1 }}>
          {navigationItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 48,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: 2,
                  bgcolor: location.pathname === item.path ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                  borderRadius: 1,
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mb: 0.5 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 12,
                    fontWeight: location.pathname === item.path ? 500 : 400,
                    textAlign: 'center',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 2 }}>
          <Avatar
            onClick={handleClick}
            sx={{
              width: 28,
              height: 28,
              bgcolor: 'rgb(166, 174, 242)',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            PS
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </StyledDrawer>
  );
}