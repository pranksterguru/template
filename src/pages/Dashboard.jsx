import React from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Stack,
  Divider
} from '@mui/material';

const Dashboard = () => {
  return (
    <Box>




      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Account Summary
        </Typography>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#e0f7ff' }}>
            <TableRow>
              <TableCell><strong>Account</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Balance</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell>Savings</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>₹25,000</TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell>Current</TableCell>
              <TableCell>Inactive</TableCell>
              <TableCell>₹10,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
              <Divider sx={{ mb: 3 }} />

              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained" color="primary">
          Barclays Action
        </Button>
        <Button variant="outlined" color="primary">
          Secondary Action
        </Button>
      </Stack>
      </Paper>
    </Box>
  );
};

export default Dashboard;
