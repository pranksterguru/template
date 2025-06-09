import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;
const collapsedWidth = 60;

const Sidebar = ({ open }) => {
  const items = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        ['& .MuiDrawer-paper']: {
          width: open ? drawerWidth : collapsedWidth,
          transition: 'width 0.3s',
          overflowX: 'hidden',
          boxSizing: 'border-box'
        }
      }}
    >
      <Toolbar />
      <List>
        {items.map(({ text, icon, path }) => (
          <Tooltip title={!open ? text : ''} placement="right" key={text}>
            <ListItem
              button
              component={NavLink}
              to={path}
              sx={{
                '&.active': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
                justifyContent: open ? 'initial' : 'center',
                px: 2
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
                {icon}
              </ListItemIcon>
              {open && <ListItemText primary={text} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
