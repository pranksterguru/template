import React, { useEffect, useState } from 'react';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Tooltip from '@mui/joy/Tooltip';

const MetricBar = ({
  title = 'Threshold Overview',
  red = 30,
  amber = 30,
  green = 30,
  height = 30
}) => {
  const total = red + amber + green;
  const percent = (val) => `${(val / total) * 100}%`;

  const [animatedWidths, setAnimatedWidths] = useState({
    red: '0%',
    amber: '0%',
    green: '0%'
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedWidths({
        red: percent(red),
        amber: percent(amber),
        green: percent(green)
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [red, amber, green]);

  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 'lg',
        p: 1.5, // reduced padding
        boxShadow: 'sm',
        display: 'flex',
        flexDirection: 'column',
        gap: 1, // tighter vertical spacing
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: (theme) => `0 0 8px ${theme.palette.primary.outlinedBorder}99`
        }
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
  <Box
    sx={{
      width: animatedWidths.red,
      bgcolor: 'rgba(198, 40, 40, 0.7)', // #c62828 with 70% opacity
      transition: 'width 5s ease 0.3s',
    }}
  />
</Tooltip>
<Tooltip title={`Amber: ${amber}`}>
  <Box
    sx={{
      width: animatedWidths.amber,
      bgcolor: 'rgba(255, 143, 0, 0.7)', // #ff8f00 with 70% opacity
      transition: 'width 8s ease 0.6s',
    }}
  />
</Tooltip>
<Tooltip title={`Green: ${green}`}>
  <Box
    sx={{
      width: animatedWidths.green,
      bgcolor: 'rgba(46, 125, 50, 0.7)', // #2e7d32 with 70% opacity
      transition: 'width 4s ease 0.9s',
    }}
  />
</Tooltip>

      </Box>
    </Card>
  );
};

export default MetricBar;
