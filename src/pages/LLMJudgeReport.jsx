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
  const [filterMetricColor, setFilterMetricColor] = useState(null);

  const handleMetricClick = (metricName, color) => {
    console.log(`MetricBar segment clicked: ${metricName} - ${color}`);
    setFilterMetricColor({ metric: metricName, color });
    setFilterColor(null);
  };

  const metricBars = [];

  inputData.result.forEach((entry, index) => {
    if (entry.overall?.metrics) {
      Object.entries(entry.overall.metrics).forEach(([metricName, values]) => {
        const readable = metricName.replace(/_/g, ' ');
        metricBars.push(
          <MetricBar
            key={`${index}-${metricName}`}
            title={readable}
            red={values.Red || 0}
            amber={values.Amber || 0}
            green={values.Green || 0}
            onSegmentClick={(color) => handleMetricClick(readable, color)}
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
        const key = `accordion-${index}-${i}`;

        const matchesColor = !filterColor || status === filterColor;

        const matchesMetricColor =
          !filterMetricColor ||
          detail.elements?.some((el) =>
            el.type === 'cards' &&
            el.cards?.some((card) => {
              const result = card.name === filterMetricColor.metric && card.colour?.toLowerCase() === filterMetricColor.color;
              if (result) {
                console.log(`Matched detail for ${filterMetricColor.metric} ${filterMetricColor.color} in test "${detail.test_name}"`);
              }
              return result;
            })
          );

        if (matchesColor && matchesMetricColor) {
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
        } else {
          console.log(
            `Filtered out: test="${detail.test_name}", status="${status}", matchesColor=${matchesColor}, matchesMetricColor=${matchesMetricColor}`
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
          const key = `accordion-${index}-${i}`;

          const matchesColor = !filterColor || status === filterColor;
          const matchesMetricColor =
            !filterMetricColor ||
            detail.elements?.some((el) =>
              el.type === 'cards' &&
              el.cards?.some(
                (card) =>
                  card.name === filterMetricColor.metric &&
                  card.colour?.toLowerCase() === filterMetricColor.color
              )
            );

          if (matchesColor && matchesMetricColor) {
            all[key] = true;
            console.log(`Expanding: ${key}`);
          }
        });
      }
    });
    setExpandedKeys(all);
  };

  const collapseAll = () => {
    console.log('Collapsing all');
    setExpandedKeys({});
  };

  const resetAll = () => {
    console.log('Resetting filters and expansions');
    setExpandedKeys({});
    setFilterColor(null);
    setFilterMetricColor(null);
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
          onClick={() => {
            setFilterColor('red');
            setFilterMetricColor(null);
            console.log('Filter by status red');
          }}
          sx={{
            backgroundColor: '#c62828',
            color: '#fff',
            '&:hover': { backgroundColor: '#c62828' }
          }}
        >
          Red
        </Button>
        <Button
          onClick={() => {
            setFilterColor('amber');
            setFilterMetricColor(null);
            console.log('Filter by status amber');
          }}
          sx={{
            backgroundColor: '#ff8f00',
            color: '#fff',
            '&:hover': { backgroundColor: '#ff8f00' }
          }}
        >
          Amber
        </Button>
        <Button
          onClick={() => {
            setFilterColor('green');
            setFilterMetricColor(null);
            console.log('Filter by status green');
          }}
          sx={{
            backgroundColor: '#2e7d32',
            color: '#fff',
            '&:hover': { backgroundColor: '#2e7d32' }
          }}
        >
          Green
        </Button>
      </Box>

      <Box sx={{ width: '100%', mt: 2 }}>
        <InfoCard icon="info" title="Test Evaluation Details" contentAlign="center">
          <Box sx={{ width: '100%' }}>{detailAccordions}</Box>
        </InfoCard>
      </Box>
    </Box>
  );
};

export default LLMJudgeReport;
