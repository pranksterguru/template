import React, { useEffect, useState } from 'react';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import CustomTooltip from './CustomTooltip';

const MetricBar = ({
  title = 'Threshold Overview',
  red = 30,
  amber = 30,
  green = 30,
  height = 20,
  onSegmentClick = () => {}
}) => {
  const total = red + amber + green;

  const getPercent = (val) => ((val / total) * 100).toFixed(1);

  const [animatedWidths, setAnimatedWidths] = useState({
    red: '0%',
    amber: '0%',
    green: '0%'
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedWidths({
        red: `${getPercent(red)}%`,
        amber: `${getPercent(amber)}%`,
        green: `${getPercent(green)}%`
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
        p: 1.5,
        boxShadow: 'sm',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
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
        <CustomTooltip header="Red" content={`Count: ${red}\n Percentage: ${getPercent(red)}%`}>
          <Box
            sx={{
              width: animatedWidths.red,
              bgcolor: 'rgba(198, 40, 40, 1)',
              transition: 'width 5s ease 0.3s',
              cursor: 'pointer'
            }}
            onClick={() => onSegmentClick('red')}
          />
        </CustomTooltip>

        <CustomTooltip header="Amber" content={`Count: ${amber}\n Percentage: ${getPercent(amber)}%`}>
          <Box
            sx={{
              width: animatedWidths.amber,
              bgcolor: 'rgba(255, 143, 0, 1)',
              transition: 'width 8s ease 0.6s',
              cursor: 'pointer'
            }}
            onClick={() => onSegmentClick('amber')}
          />
        </CustomTooltip>

        <CustomTooltip header="Green" content={`Count: ${green}\n Percentage: ${getPercent(green)}%`}>
          <Box
            sx={{
              width: animatedWidths.green,
              bgcolor: 'rgba(46, 125, 50, 1)',
              transition: 'width 4s ease 0.9s',
              cursor: 'pointer'
            }}
            onClick={() => onSegmentClick('green')}
          />
        </CustomTooltip>
      </Box>
    </Card>
  );
};

export default MetricBar;
