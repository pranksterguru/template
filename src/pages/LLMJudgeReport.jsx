import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Accordion from '@mui/joy/Accordion';
import AccordionSummary from '@mui/joy/AccordionSummary';
import AccordionDetails from '@mui/joy/AccordionDetails';
import MetricBar from '../components/MetricBar';
import inputData from './input.json';

const LLMJudgeReport = () => {
  const metricBars = [];

  // Extract overall metrics
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

  // Extract test details
  const detailAccordions = [];

  inputData.result.forEach((entry, index) => {
    if (Array.isArray(entry.details)) {
      entry.details.forEach((detail, i) => {
        detailAccordions.push(
          <Accordion
            key={`accordion-${index}-${i}`}
            sx={{
              mb: 1.5,
              borderRadius: 'sm',
              boxShadow: 'sm',
              transition: 'box-shadow 0.2s ease',
              '&:hover': {
                boxShadow: 'md',
              },
            }}
          >
            <AccordionSummary>
              <Typography level="title-sm" fontWeight="md">
                {detail['test_name']}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pb: 1 }}>
              <Typography level="body-sm" color="neutral">
                Accordion content goes here.
              </Typography>
            </AccordionDetails>
          </Accordion>
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
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 8,
          mb: 3,
        }}
      >
        {metricBars.map((card, i) => (
          <Box key={i}>{card}</Box>
        ))}
      </Box>

      <Box>
        {detailAccordions}
      </Box>
    </Box>
  );
};

export default LLMJudgeReport;
