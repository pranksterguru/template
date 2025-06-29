import React from 'react';
import brainImg from './brain.png';
import { useTheme } from '@mui/joy/styles';

const CustomLoader = () => {
  const theme = useTheme();
const glowColor = theme.palette.primary.plainColor;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      zIndex: 9999,
    }}>
      <img
        src={brainImg}
        alt="Brain AI"
        style={{
          width: '240px',
          height: '240px',
          marginBottom: '30px',
          filter: `drop-shadow(0 0 10px ${glowColor})`,
          animation: 'pulse 2s infinite',
        }}
      />
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            style={{
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              backgroundColor: glowColor,
              animation: 'dotPulse 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      <div style={{
        fontSize: '1.5rem',
        color: glowColor,
        animation: 'fadeInOut 2s infinite',
      }}>
        Please wait... !!
      </div>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes dotPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.4); opacity: 0.5; }
          }
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default CustomLoader;
