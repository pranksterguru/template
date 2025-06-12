import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';

const Dashboard = () => (
  <Box>
    <Sheet variant="outlined" sx={{ p: 3, maxWidth: 650, mx: 'auto', mt: 4, borderRadius: 'md' }}>
      <Typography level="h4" sx={{ mb: 2 }}>
        Account Summary
      </Typography>
      <Table hoverRow size="sm" sx={{ mb: 2 }}>
        <thead>
          <tr>
            <th><strong>Account</strong></th>
            <th><strong>Status</strong></th>
            <th><strong>Balance</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Savings</td>
            <td>Active</td>
            <td>₹25,000</td>
          </tr>
          <tr>
            <td>Current</td>
            <td>Inactive</td>
            <td>₹10,000</td>
          </tr>
        </tbody>
      </Table>
      <Divider sx={{ mb: 3 }} />
      <Stack direction="row" spacing={2}>
        <Button color="primary">Barclays Action</Button>
        <Button variant="outlined" color="primary">Secondary Action</Button>
      </Stack>
    </Sheet>
  </Box>
);

export default Dashboard;
