import React, { useEffect, useState } from 'react';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
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

const sizeMap = {
  small: {
    cardMinHeight: 50,
    cardMinWidth: 80,
    iconSize: 24,
    iconBox: 36,
    titleSize: 'body-sm',
    valueSize: 'h4',
  },
  medium: {
    cardMinHeight: 70,
    cardMinWidth: 100,
    iconSize: 28,
    iconBox: 48,
    titleSize: 'body-md',
    valueSize: 'h2',
  },
  large: {
    cardMinHeight: 90,
    cardMinWidth: 140,
    iconSize: 36,
    iconBox: 56,
    titleSize: 'body-lg',
    valueSize: 'h1',
  },
};

const StatsCard = ({ title, value, colour = 'green', size = 'medium' }) => {
  const gradient = colorMap[colour] || colorMap.green;
  const s = sizeMap[size] || sizeMap.medium;
  const [initialIconKey, finalIconKey] = iconTransitionMap[colour] || ['SentimentNeutral', 'CheckCircleOutline'];
  const InitialIcon = MuiIcons[initialIconKey];
  const FinalIcon = MuiIcons[finalIconKey];

  const [playOnce, setPlayOnce] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPlayOnce(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{
        position: 'relative',
        minWidth: 'fit-content',
        maxWidth: 180,
        minHeight: s.cardMinHeight,
        borderRadius: 'md',
        boxShadow: 'lg',
        overflow: 'visible',
        p: 1.5,
        pt: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 'xl',
        },
        ...(colour === 'red' && {
          '&:hover .nudge-icon': {
            animation: 'spin 1.2s linear infinite',
          },
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }),
        ...(colour === 'amber' && {
          '&:hover .nudge-icon': {
            animation: 'pulse 1.2s ease-in-out infinite',
          },
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.15)' },
          },
        }),
        ...(colour === 'green' && {
          '&:hover .nudge-icon': {
            animation: 'bounce 0.6s ease infinite',
          },
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-6px)' },
          },
        }),
        '&:hover .face-layer-a': {
          animation: 'faceFadeA 1.6s ease-in-out infinite',
        },
        '&:hover .face-layer-b': {
          animation: 'faceFadeB 1.6s ease-in-out infinite',
        },
        ...(playOnce && {
          '& .face-layer-a': {
            animation: 'faceFadeA 1.6s ease-in-out 1',
          },
          '& .face-layer-b': {
            animation: 'faceFadeB 1.6s ease-in-out 1',
          },
        }),
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
        className="nudge-icon"
        sx={{
          position: 'absolute',
          top: -s.iconBox / 2,
          right: 12,
          width: s.iconBox,
          height: s.iconBox,
          borderRadius: '50%',
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'sm',
          overflow: 'hidden',
        }}
      >
        <Box
          className="face-layer-a"
          sx={{
            position: 'absolute',
            opacity: 1,
          }}
        >
          <InitialIcon sx={{ color: '#fff', fontSize: s.iconSize }} />
        </Box>
        <Box
          className="face-layer-b"
          sx={{
            position: 'absolute',
            opacity: 0,
          }}
        >
          <FinalIcon sx={{ color: '#fff', fontSize: s.iconSize }} />
        </Box>
      </Box>

      <Typography level={s.titleSize} sx={{ fontWeight: 600, color: 'primary.500', mb: 0.5 }}>
        {title}
      </Typography>

      <Typography level={s.valueSize} sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
    </Card>
  );
};

export default StatsCard;
