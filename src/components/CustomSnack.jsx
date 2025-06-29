import React from 'react';
import Snackbar from '@mui/joy/Snackbar';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const CustomSnack = ({
  open,
  onClose,
  title,
  message,
  type = 'info',
  position = 'top-right',
  hideTime = 3000,
  sticky = false,
}) => {
  const anchorOrigin = {
    'top-right': { vertical: 'top', horizontal: 'right' },
    'top-left': { vertical: 'top', horizontal: 'left' },
    'bottom-right': { vertical: 'bottom', horizontal: 'right' },
    'bottom-left': { vertical: 'bottom', horizontal: 'left' },
  }[position] || { vertical: 'top', horizontal: 'right' };

  const colorMap = {
    success: '#3F7E37',
    error: '#D32F2F',
    warning: '#ED6C02',
    info: '#0076B6',
  };

  return (
<Snackbar
  open={open}
  autoHideDuration={sticky ? null : hideTime}
  anchorOrigin={anchorOrigin}
  onClose={onClose}
  variant="plain"       // <<< REMOVE thick border
  color="neutral"       // <<< Neutral background
  size="md"             // optional
  sx={{ p: 0 }}         // optional to remove outer padding
>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderLeft: `6px solid ${colorMap[type] || '#0076B6'}`,
          borderRadius: '8px',
          boxShadow: 'lg',
          p: 2,
          minWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          position: 'relative',
        }}
      >
        <IconButton
          size="sm"
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseRoundedIcon />
        </IconButton>

        <Typography level="title-sm" fontWeight="lg" sx={{ color: 'text.primary' }}>
          {title}
        </Typography>

        <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
          {message}
        </Typography>
      </Box>
    </Snackbar>
  );
};

export default CustomSnack;
