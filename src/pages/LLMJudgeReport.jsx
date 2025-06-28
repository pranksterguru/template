import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import MetricBar from '../components/MetricBar';
import inputData from './input.json';

const LLMJudgeReport = () => {
  const metricBars = [];

  inputData.result.forEach((entry, index) => {
    if (entry.overall && entry.overall.metrics) {
      const metrics = entry.overall.metrics;
      Object.entries(metrics).forEach(([metricName, values]) => {
        metricBars.push(
          <MetricBar
            key={`${index}-${metricName}`}
            title={metricName.replace(/_/g, ' ')}
            red={values.Red || 0}
            amber={values.Amber || 0}
            green={values.Green || 0}
          />
        );
      });
    }
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography level="h4" sx={{ mb: 2 }}>
        LLM Judge Report
      </Typography>

<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', // ✅ 4 fixed columns
    gap: 9,                                // consistent spacing
  }}
>
  {metricBars.map((card, i) => (
    <Box key={i}>
      {card}
    </Box>
  ))}
</Box>
    </Box>
  );
};

export default LLMJudgeReport;
