import React, { useState } from 'react';
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
  const [activeIcon, setActiveIcon] = useState(0);

  const [initialIconKey, finalIconKey] = iconTransitionMap[colour] || ['SentimentNeutral', 'CheckCircleOutline'];
  const InitialIcon = MuiIcons[initialIconKey];
  const FinalIcon = MuiIcons[finalIconKey];

  const handleHoverIn = () => {
    setActiveIcon(0);
    setTimeout(() => setActiveIcon(1), 100);
  };

  const handleHoverOut = () => {
    setActiveIcon(0);
  };

  return (
    <Card
      variant="outlined"
      onMouseEnter={handleHoverIn}
      onMouseLeave={handleHoverOut}
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
        '&:hover .nudge-icon': {
          animation: 'nudgeBounce 0.6s ease',
        },
        '@keyframes nudgeBounce': {
          '0%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(2px)' },
          '100%': { transform: 'translateY(0)' },
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
          sx={{
            position: 'absolute',
            opacity: activeIcon === 0 ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <InitialIcon sx={{ color: '#fff', fontSize: s.iconSize }} />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            opacity: activeIcon === 1 ? 1 : 0,
            transition: 'opacity 0.3s ease',
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
