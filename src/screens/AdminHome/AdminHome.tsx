import { AppBar, Box, Container, Typography } from '@mui/material';
import React from "react";
import { EmptyStateByAnima } from "./sections/EmptyStateByAnima";
import { TopWidgetByAnima } from "./sections/TopWidgetByAnima";

export const AdminHome = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
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
          Home
        </Typography>
      </AppBar>
      <Container maxWidth={false}>
        <TopWidgetByAnima />
        <EmptyStateByAnima />
      </Container>
    </Box>
  );
};