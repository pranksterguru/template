import React, { useRef } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import InfoCard from '../components/InfoCard';
import StatsCard from '../components/Statscard';
import MetricBar from '../components/MetricBar';
import Button from '@mui/joy/Button';

const Users = () => {
  const metricsRef = useRef();

  const metricData = [
    {
      name: 'Engagement',
      description: 'User activity and interaction levels',
      thresholds: { red: 20, amber: 50, green: 80 },
    },
    {
      name: 'Retention',
      description: 'User return rate over time',
      thresholds: { red: 10, amber: 40, green: 70 },
    },
    {
      name: 'Satisfaction',
      description: 'Feedback and ratings',
      thresholds: { red: 30, amber: 60, green: 90 },
    },
  ];

  const handleGetSelectedMetrics = () => {
    const selected = metricsRef.current?.getValue();
    console.log('Selected metrics:', selected);
  };

  return (
    <Box sx={{ maxWidth: 600, mt: 4 }}>


      <MetricBar red={20} amber={30} green={50} />

        <InfoCard
          icon="info"
          title="User Info"
          description="Summary of the current user base activity."
          hoverEffect
          contentAlign="left"
        />


      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <StatsCard title="Inactive" value={20} colour="red" size="small" />
        <StatsCard title="Pending" value={30} colour="amber" size="medium" />
        <StatsCard title="Active" value={50} colour="green" size="large" />
      </Box>

    </Box>
  );
};

export default Users;
