import React from 'react';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Tooltip from '@mui/joy/Tooltip';

const BarCard = ({
  title = 'Threshold Overview',
  red = 30,
  amber = 40,
  green = 30,
  height = 20
}) => {
  const total = red + amber + green;
  const percent = (val) => `${(val / total) * 100}%`;

  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        maxWidth: 500,
        borderRadius: 'lg',
        p: 2,
        boxShadow: 'md'
      }}
    >
      <Typography level="title-md" sx={{ mb: 1 }}>
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height,
          borderRadius: 'md',
          overflow: 'hidden',
          boxShadow: 'sm'
        }}
      >
        <Tooltip title={`Red: ${red}`}>
          <Box sx={{ width: percent(red), bgcolor: '#c62828' }} />
        </Tooltip>
        <Tooltip title={`Amber: ${amber}`}>
          <Box sx={{ width: percent(amber), bgcolor: '#ff8f00' }} />
        </Tooltip>
        <Tooltip title={`Green: ${green}`}>
          <Box sx={{ width: percent(green), bgcolor: '#2e7d32' }} />
        </Tooltip>
      </Box>
    </Card>
  );
};

export default BarCard;
