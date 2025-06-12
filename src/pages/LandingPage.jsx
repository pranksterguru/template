import React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';

const LandingPage = () => (
  <Box>
    <Sheet
      variant="outlined"
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 4,
        borderRadius: 'md',
        boxShadow: 'sm'
      }}
    >
      <Typography level="h4" sx={{ mb: 2, textAlign: 'center', color: 'primary.900' }}>
        AWS Login
      </Typography>
      <Stack spacing={2}>
        <Input placeholder="AWS User Name" name="username" />
        <Input placeholder="AWS Password" type="password" name="password" />
        <Input placeholder="AWS Account" name="account" />
        <Input placeholder="AWS Region" name="region" />
        <Input placeholder="AWS Role" name="role" />
        <Button variant="solid" color="primary">
          Sign In
        </Button>
      </Stack>
    </Sheet>
  </Box>
);

export default LandingPage;
