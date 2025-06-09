import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

const MainLayout = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!open);
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${open ? drawerWidth : 60}px)`,
          ml: `${open ? drawerWidth : 60}px`,
          bgcolor: theme.palette.secondary.main // Barclays dark blue
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{
              color: '#ffffff',         // Force white text (Barclays standard for dark backgrounds)
              fontWeight: 600,          // Slightly bolder
              letterSpacing: 0.5,       // Improve readability
              fontFamily: '"Segoe UI", Roboto, sans-serif'
            }}
          >
            Barclays Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar open={open} />

      <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.background.default, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
