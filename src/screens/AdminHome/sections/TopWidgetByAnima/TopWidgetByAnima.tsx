import { Campaign, MonetizationOn, RemoveRedEye, TrendingUp } from '@mui/icons-material';
import { Card, CardContent, CardHeader, Grid, Typography, Box, Chip } from '@mui/material';
import React from "react";

const widgetData = [
  {
    title: "Total Clients",
    icon: <Campaign sx={{ color: 'white' }} />,
    value: "0",
    bgColor: "rgb(0, 63, 91)",
  },
  {
    title: "Total Users",
    icon: <RemoveRedEye sx={{ color: 'white' }} />,
    value: "0",
    bgColor: "rgb(79, 90, 186)",
  },
  {
    title: "ARR",
    icon: <MonetizationOn sx={{ color: 'white' }} />,
    value: "$0",
    bgColor: "rgb(47, 119, 114)",
  },
];

export const TopWidgetByAnima = (): JSX.Element => {
  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {widgetData.map((widget, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              sx={{
                bgcolor: widget.bgColor,
                color: 'white',
                py: 1.5,
              }}
              title={
                <Box display="flex" alignItems="center" gap={1}>
                  {widget.icon}
                  <Typography variant="h6">{widget.title}</Typography>
                </Box>
              }
            />
            <CardContent>
              <Typography variant="h4" color="text.secondary" gutterBottom>
                {widget.value}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Chip
                  icon={<TrendingUp sx={{ fontSize: 16 }} />}
                  label="N/A"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(17, 122, 72, 0.1)',
                    color: 'rgb(17, 122, 72)',
                    '& .MuiChip-icon': {
                      color: 'rgb(17, 122, 72)',
                    },
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  No data available
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};