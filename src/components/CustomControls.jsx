import React from 'react';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import * as MuiIcons from '@mui/icons-material'; // Import all icons

// Color to gradient mapping
const colorMap = {
    red: 'linear-gradient(60deg, #F44336, #D32F2F)',
    green: 'linear-gradient(60deg, #4CAF50, #388E3C)',
    amber: 'linear-gradient(60deg, #FFC107, #FFA000)',
};

// Color to icon name mapping
const iconNameMap = {
    red: 'SentimentVeryDissatisfied',
    amber: 'SentimentNeutral',
    green: 'SentimentVerySatisfied',
};

// Adjusted Size mapping (smaller card dimensions only)
const sizeMap = {
    small: {
        cardMinHeight: 50,
        cardMinWidth: 80,   // reduced from ~220
        iconSize: 24,
        iconBox: 36,
        titleSize: 'body-sm',
        valueSize: 'h4',
    },
    medium: {
        cardMinHeight: 70,
        cardMinWidth: 100,   // reduced from 220
        iconSize: 28,
        iconBox: 48,
        titleSize: 'body-md',
        valueSize: 'h2',
    },
    large: {
        cardMinHeight: 90,
        cardMinWidth: 140,   // reduced from 220
        iconSize: 36,
        iconBox: 56,
        titleSize: 'body-lg',
        valueSize: 'h1',
    },
};


const StatsCard = ({ title, value, colour = 'green', size = 'medium' }) => {
    const gradient = colorMap[colour] || colorMap.green;
    const s = sizeMap[size] || sizeMap.medium;

    // Dynamically resolve icon component
    const iconKey = iconNameMap[colour] || 'CheckCircleOutline';
    const IconComponent = MuiIcons[iconKey];

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
            }}
        >
            {/* Floating Icon */}
            <Box
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
                }}
            >
                <IconComponent sx={{ color: '#fff', fontSize: s.iconSize }} />
            </Box>

            {/* Title */}
            <Typography level={s.titleSize} sx={{ fontWeight: 600, color: 'primary.500', mb: 0.5 }}>
                {title}
            </Typography>

            {/* Value */}
            <Typography level={s.valueSize} sx={{ fontWeight: 700 }}>
                {value}
            </Typography>
        </Card>
    );
};

export default StatsCard;
