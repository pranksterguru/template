import React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';
import HourglassEmptyOutlined from '@mui/icons-material/HourglassEmptyOutlined';
import HelpOutline from '@mui/icons-material/HelpOutline';

const InfoCard = (props) => {
  const { icon, title, description, hoverEffect } = props;

  const iconMap = {
    info: <InfoOutlined sx={{ color: '#fff', fontSize: 20 }} />,
    success: <CheckCircleOutlined sx={{ color: '#fff', fontSize: 20 }} />,
    danger: <ErrorOutline sx={{ color: '#fff', fontSize: 20 }} />,
    warning: <WarningAmberOutlined sx={{ color: '#fff', fontSize: 20 }} />,
    pending: <HourglassEmptyOutlined sx={{ color: '#fff', fontSize: 20 }} />,
    help: <HelpOutline sx={{ color: '#fff', fontSize: 20 }} />
  };

  const showHeader = Boolean(title);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 'lg',
        boxShadow: 'md',
        p: 0,
        pt: showHeader ? 3.5 : 2,
        position: 'relative',
        overflow: 'visible',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ...(hoverEffect && {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 'xl',
          }
        })
      }}
    >
      {showHeader && (
        <Box
          sx={{
            position: 'absolute',
            top: -14,
            left: 16,
            right: 16,
            zIndex: 1,
            bgcolor: '#0076B6',
            color: '#fff',
            px: 2,
            py: 1,
            borderRadius: 'md',
            boxShadow: 'sm',
            display: 'flex',
            alignItems: 'center',
            gap: 1.2
          }}
        >
          {icon && iconMap[icon]}
          <Typography
            level="body-md"
            sx={{
              color: (theme) => theme.palette.text.white
            }}
          >
            {title}
          </Typography>
        </Box>
      )}

      <Box sx={{ px: 2, py: 1 }}>
  {props.children ?? description}

      </Box>
    </Card>
  );
};

export default InfoCard;
