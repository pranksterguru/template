import React from 'react';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import Home from '@mui/icons-material/Home';
import Dashboard from '@mui/icons-material/Dashboard';
import People from '@mui/icons-material/People';
import Settings from '@mui/icons-material/Settings';
import Gavel from '@mui/icons-material/Gavel';
import Tooltip from '@mui/joy/Tooltip';
import { NavLink, useLocation } from 'react-router-dom';
import Box from '@mui/joy/Box';

const drawerWidth = 240;
const collapsedWidth = 60;

const items = [
  { text: 'Landing Page', icon: <Home />, path: '/landing' },
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Users', icon: <People />, path: '/users' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
  { text: 'LLM as Judge', icon: <Gavel />, path: '/llm-judge' }
];

const Sidebar = ({ open }) => {
  const location = useLocation();

  return (
    <Sheet
      variant="solid"
      color="neutral"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        height: '100vh',
        boxShadow: 'md',
        p: 0,
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1100,
        bgcolor: 'background.body'
      }}
    >
      <Box sx={{ height: 64 }} />
      <List
        sx={{
          p: 0,
          m: 0,
          '--ListItem-radius': '8px',
        }}
      >
        {items.map(({ text, icon, path }) => (
          <Tooltip title={!open ? text : ''} placement="right" key={text}>
            <ListItem
              sx={{
                mb: 0.5,
                justifyContent: open ? 'flex-start' : 'center',
                px: open ? 2 : 0,
                bgcolor: location.pathname === path ? 'primary.200' : 'inherit',
                '&:hover': { bgcolor: 'primary.200' }
              }}
            >
              <ListItemButton
                component={NavLink}
                to={path}
                sx={{
                  borderRadius: 8,
                  flexDirection: open ? 'row' : 'column',
                  alignItems: 'center',
                  justifyContent: open ? 'flex-start' : 'center',
                  minHeight: 48,
                  bgcolor: 'transparent !important'
                }}
                selected={location.pathname === path}
              >
                <ListItemDecorator
                  sx={{
                    justifyContent: 'center',
                    minWidth: 0,
                    color: 'primary.900',
                    mr: open ? 1.5 : 0,
                  }}
                >
                  {icon}
                </ListItemDecorator>
                {open && <ListItemContent>{text}</ListItemContent>}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Sheet>
  );
};

export default Sidebar;
