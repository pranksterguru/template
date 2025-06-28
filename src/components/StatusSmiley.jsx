import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import * as MuiIcons from '@mui/icons-material';

const colorMap = {
  red: 'linear-gradient(60deg, #F44336, #D32F2F)',
  green: 'linear-gradient(60deg, #4CAF50, #388E3C)',
  amber: 'linear-gradient(60deg, #FFC107, #FFA000)',
};

const iconTransitionMap = {
  red: ['SentimentNeutral', 'SentimentVeryDissatisfied'],
  amber: ['SentimentNeutral', 'SentimentSatisfied'],
  green: ['SentimentNeutral', 'SentimentVerySatisfied'],
};

const StatusSmiley = ({ status = 'green', size = 48 }) => {
  const [initialIconKey, finalIconKey] = iconTransitionMap[status] || ['SentimentNeutral', 'CheckCircleOutline'];
  const InitialIcon = MuiIcons[initialIconKey];
  const FinalIcon = MuiIcons[finalIconKey];

  const gradient = colorMap[status] || colorMap.green;

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'sm',
        overflow: 'hidden',
        '&:hover': {
          ...(status === 'red' && { animation: 'spin 1.2s linear infinite' }),
          ...(status === 'amber' && { animation: 'pulse 1.2s ease-in-out infinite' }),
          ...(status === 'green' && { animation: 'bounce 0.6s ease infinite' }),
        },
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        '@keyframes pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        '@keyframes bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        '@keyframes faceFadeA': {
          '0%': { opacity: 1 },
          '50%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        '@keyframes faceFadeB': {
          '0%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      }}
    >
      <Box
        className="face-layer-a"
        sx={{
          position: 'absolute',
          opacity: 1,
          animation: 'faceFadeA 1.6s ease-in-out infinite',
        }}
      >
        <InitialIcon sx={{ color: '#fff', fontSize: size * 0.6 }} />
      </Box>
      <Box
        className="face-layer-b"
        sx={{
          position: 'absolute',
          opacity: 0,
          animation: 'faceFadeB 1.6s ease-in-out infinite',
        }}
      >
        <FinalIcon sx={{ color: '#fff', fontSize: size * 0.6 }} />
      </Box>
    </Box>
  );
};

export default StatusSmiley;
