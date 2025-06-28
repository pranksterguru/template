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
      });
    }
  });

  const expandAll = () => {
    const all = {};
    inputData.result.forEach((entry, index) => {
      if (Array.isArray(entry.details)) {
        entry.details.forEach((_, i) => {
          all[`accordion-${index}-${i}`] = true;
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
        <Button onClick={expandAll}>Expand All Details</Button>
        <Button onClick={collapseAll}>Collapse All Details</Button>
        <Button onClick={resetAll}>Reset</Button>
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
