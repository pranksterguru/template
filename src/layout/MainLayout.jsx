import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

const MainLayout = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.body', minHeight: '100vh' }}>
      <Sheet
       
        sx={{
          bgcolor: 'primary.500',
          height: 64,
          width: `calc(100% - ${open ? drawerWidth : 60}px)`,
          ml: `${open ? drawerWidth : 60}px`,
          position: 'fixed',
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          boxShadow: 'sm',
        }}
      >
        <IconButton variant="plain" color="neutral" onClick={toggleDrawer} sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography
          level="h4"
          sx={{
            color: '#ffffff',
            fontWeight: 600,
            letterSpacing: 0.5,
            fontFamily: '"Segoe UI", Roboto, sans-serif'
          }}
        >
          AI-Mind
        </Typography>
      </Sheet>
      <Sidebar open={open} />
      <Box component="main" sx={{
        flexGrow: 1,
        bgcolor: 'background.',
        p: 3,
        ml: `${open ? drawerWidth : 60}px`,
        mt: '64px'
      }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
