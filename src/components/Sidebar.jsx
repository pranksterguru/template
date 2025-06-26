import React, { useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import Tooltip from '@mui/joy/Tooltip';
import Box from '@mui/joy/Box';
import { NavLink, useLocation } from 'react-router-dom';

import Dashboard from '@mui/icons-material/Dashboard';
import People from '@mui/icons-material/People';
import Settings from '@mui/icons-material/Settings';
import Gavel from '@mui/icons-material/Gavel';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

const drawerWidth = 240;
const collapsedWidth = 60;

const items = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Users', icon: <People />, path: '/users' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
  {
    text: 'LLM as Judge',
    icon: <Gavel />,
    path: '/llmjudge',
    children: [
      { text: 'Config', path: '/llmjudgeconfig' },
      { text: 'Report', path: '/llmjudgereport' }
    ]
  }
];

const Sidebar = ({ open }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (text) => {
    setOpenMenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };

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
        {items.map(({ text, icon, path, children }) => {
          const isExpanded = openMenus[text];
          const isSelected = location.pathname === path;

          return (
            <React.Fragment key={text}>
              <Tooltip title={!open ? text : ''} placement="right">
                <ListItem
                  sx={{
                    mb: 0.5,
                    justifyContent: open ? 'flex-start' : 'center',
                    px: open ? 2 : 0,
                    bgcolor: isSelected ? 'primary.50' : 'inherit',
                    '&:hover': { bgcolor: 'primary.200' }
                  }}
                >
                  <ListItemButton
                    onClick={() => children ? toggleMenu(text) : null}
                    component={children ? 'div' : NavLink}
                    to={!children ? path : undefined}
                    sx={{
                      borderRadius: 8,
                      flexDirection: open ? 'row' : 'column',
                      alignItems: 'center',
                      justifyContent: open ? 'space-between' : 'center',
                      minHeight: 48,
                      width: '100%',
                      bgcolor: 'transparent !important'
                    }}
                    selected={isSelected}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <ListItemDecorator sx={{ minWidth: 0, color: 'primary.900' }}>
                        {icon}
                      </ListItemDecorator>
                      {open && <ListItemContent>{text}</ListItemContent>}
                    </Box>
                    {open && children && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </ListItem>
              </Tooltip>

              {open && children && isExpanded && children.map(({ text: childText, path: childPath }) => (
                <ListItem
                  key={childText}
                  sx={{
                    mb: 0.5,
                    justifyContent: 'flex-start',
                    px: 4,
                    bgcolor: location.pathname === childPath ? 'primary.50' : 'inherit',
                    '&:hover': { bgcolor: 'primary.100' }
                  }}
                >
                  <ListItemButton
                    component={NavLink}
                    to={childPath}
                    selected={location.pathname === childPath}
                    sx={{
                      borderRadius: 8,
                      justifyContent: 'flex-start',
                      minHeight: 36,
                      fontSize: 'sm',
                      color: 'primary.900',
                      bgcolor: 'transparent !important'
                    }}
                  >
                    {childText}
                  </ListItemButton>
                </ListItem>
              ))}
            </React.Fragment>
          );
        })}
      </List>
    </Sheet>
  );
};

export default Sidebar;
