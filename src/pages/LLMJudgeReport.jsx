import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import MetricBar from '../components/MetricBar';
import InfoCard from '../components/InfoCard';
import inputData from './input.json';
import LLMJudgeReportAccordion from '../components/LLMJudgeReportAccordion';

const LLMJudgeReport = () => {
  const [expandedKeys, setExpandedKeys] = useState({});
  const [filterColor, setFilterColor] = useState(null);

  const metricBars = [];

  inputData.result.forEach((entry, index) => {
    if (entry.overall?.metrics) {
      Object.entries(entry.overall.metrics).forEach(([metricName, values]) => {
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

  const detailAccordions = [];

  inputData.result.forEach((entry, index) => {
    if (Array.isArray(entry.details)) {
      entry.details.forEach((detail, i) => {
        const status = (detail.overall_rating || '').toLowerCase();
        if (!filterColor || status === filterColor) {
          const key = `accordion-${index}-${i}`;
          detailAccordions.push(
            <LLMJudgeReportAccordion
              key={key}
              detail={detail}
              index={index}
              detailIndex={i}
              expanded={!!expandedKeys[key]}
              onToggle={() =>
                setExpandedKeys((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
            />
          );
        }
      });
    }
  });

  const expandAll = () => {
    const all = {};
    inputData.result.forEach((entry, index) => {
      if (Array.isArray(entry.details)) {
        entry.details.forEach((detail, i) => {
          const status = (detail.overall_rating || '').toLowerCase();
          if (!filterColor || status === filterColor) {
            all[`accordion-${index}-${i}`] = true;
          }
        });
      }
    });
    setExpandedKeys(all);
  };

  const collapseAll = () => {
    setExpandedKeys({});
  };

  const resetAll = () => {
    setExpandedKeys({});
    setFilterColor(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography level="h4" sx={{ mb: 2 }}>
        LLM as Judge Report
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 8,
          mb: 3,
        }}
      >
        {metricBars.map((card, i) => (
          <Box key={i}>{card}</Box>
        ))}
      </Box>

<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2, flexWrap: 'wrap' }}>
  <Button onClick={expandAll}>Expand All Details</Button>
  <Button onClick={collapseAll}>Collapse All Details</Button>
  <Button onClick={resetAll}>Reset</Button>
  <Button
    onClick={() => setFilterColor('red')}
    sx={{
      backgroundColor: '#c62828',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#c62828'
      }
    }}
  >
    Red
  </Button>
  <Button
    onClick={() => setFilterColor('amber')}
    sx={{
      backgroundColor: '#ff8f00',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#ff8f00'
      }
    }}
  >
    Amber
  </Button>
  <Button
    onClick={() => setFilterColor('green')}
    sx={{
      backgroundColor: '#2e7d32',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#2e7d32'
      }
    }}
  >
    Green
  </Button>
</Box>



      <Box sx={{ width: '100%', mt: 2 }}>
        <InfoCard
          icon="info"
          title="Test Evaluation Details"
          contentAlign="center"
        >
          <Box sx={{ width: '100%' }}>{detailAccordions}</Box>
        </InfoCard>
      </Box>
    </Box>
  );
};

export default LLMJudgeReport;
