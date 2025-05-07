import { Analytics } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader, Typography, Divider } from '@mui/material';
import React from "react";

export const EmptyStateByAnima = (): JSX.Element => {
  return (
    <Box sx={{ height: 401, px: 2, py: 4, width: '100%' }}>
      <Card sx={{ height: '100%', borderRadius: 4 }}>
        <CardHeader
          title={
            <Typography variant="h6" color="text.primary">
              Monthly Visitors
            </Typography>
          }
        />
        <Divider sx={{ mx: 3 }} />
        <CardContent>
          <Box sx={{ position: 'relative', height: '100%' }}>
            {/* Chart placeholder */}
            <Box sx={{ height: 280 }} />
            
            {/* Empty state overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 368,
                height: 206,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Analytics sx={{ fontSize: 96, color: '#c6c6c6', mb: 2 }} />
              <Typography variant="subtitle1" color="rgba(0, 0, 0, 0.6)">
                No Data Available
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};