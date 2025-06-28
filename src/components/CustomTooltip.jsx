import React from 'react';
import Tooltip from '@mui/joy/Tooltip';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

const CustomTooltip = ({ header, content, children, placement = 'top' }) => {
  return (
    <Tooltip
      variant="soft"
      color="neutral"
      placement={placement}
      title={
        <Box>
          <Typography level="title-sm" fontWeight="lg" sx={{ mb: 0.5 }}>
            {header}
          </Typography>
          <Typography level="body-sm">{content}</Typography>
        </Box>
      }
      slotProps={{
        tooltip: {
          sx: {
            boxShadow: 'lg',
            borderRadius: 'md',
            p: 1.5,
            maxWidth: 300,
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
