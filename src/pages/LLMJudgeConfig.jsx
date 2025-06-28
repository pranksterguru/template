import React, { useState, useRef } from 'react';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import InfoCard from '../components/InfoCard';
import MetricsDropdown from '../components/MetricsDropdown';

const metricData = [
  {
    name: 'metric1',
    description: 'description of the metric',
    thresholds: { green: 100, amber: 70, red: 30 }
  },
  {
    name: 'metric2',
    description: 'description of the metric',
    thresholds: { green: 100, amber: 70, red: 30 }
  },
  {
    name: 'metric3',
    description: 'description of the metric',
    thresholds: { green: 100, amber: 70, red: 30 }
  }
];

const LLMJudgeConfig = () => {
  const [llmModel, setLlmModel] = useState('');
  const [awsRegion, setAwsRegion] = useState('');
  const [concurrency, setConcurrency] = useState('');
  const [requestsPerMinute, setRequestsPerMinute] = useState('');
  const [evaluationText, setEvaluationText] = useState('');
  const [miscPrompt, setMiscPrompt] = useState('');
  const [excelFile, setExcelFile] = useState(null);
  const metricsRef = useRef();

  const handleEvaluate = () => {
    const selectedMetrics = metricsRef.current?.getValue() || [];
    console.log('Evaluating with:');
    console.log('LLM Model:', llmModel);
    console.log('AWS Region:', awsRegion);
    console.log('Concurrency:', concurrency);
    console.log('Requests Per Minute:', requestsPerMinute);
    console.log('Evaluation Text:', evaluationText);
    console.log('Misc Prompt:', miscPrompt);
    console.log('Uploaded File:', excelFile?.name || 'No file selected');
    console.log('Selected Metrics:', selectedMetrics);
  };

  return (
    <InfoCard icon="info" title="Configure Evaluation" contentAlign="center">
      <Grid container spacing={2} sx={{ width: '100%' }}>
        {/* Left Column */}
        <Grid xs={12} sm={6}>
          <Typography level="body-sm" sx={{ mb: 0.5 }}>
            LLM Model Name
          </Typography>
          <Input
            value={llmModel}
            onChange={(e) => setLlmModel(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Typography level="body-sm" sx={{ mb: 0.5 }}>
            AWS Region
          </Typography>
          <Input
            value={awsRegion}
            onChange={(e) => setAwsRegion(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid xs={6}>
              <Typography level="body-sm" sx={{ mb: 0.5 }}>
                Concurrency
              </Typography>
              <Input
                type="number"
                value={concurrency}
                onChange={(e) => setConcurrency(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid xs={6}>
              <Typography level="body-sm" sx={{ mb: 0.5 }}>
                Requests Per Minute
              </Typography>
              <Input
                type="number"
                value={requestsPerMinute}
                onChange={(e) => setRequestsPerMinute(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>

          <Typography level="body-sm" sx={{ mb: 0.5 }}>
            Upload Excel File
          </Typography>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setExcelFile(e.target.files[0])}
            style={{ width: '100%' }}
          />
        </Grid>

        {/* Right Column */}
        <Grid xs={12} sm={6}>
          <Typography level="body-sm" sx={{ mb: 1 }}>
            Select Metrics
          </Typography>
          <MetricsDropdown ref={metricsRef} metricData={metricData} />

          <Typography level="body-sm" sx={{ mt: 3, mb: 0.5 }}>
            Misc Prompt
          </Typography>
          <Textarea
            minRows={6}
            value={miscPrompt}
            onChange={(e) => setMiscPrompt(e.target.value)}
            fullWidth
          />
        </Grid>

        {/* Evaluation Standards - full row, just above button */}
        <Grid xs={12}>
          <Typography level="body-sm" sx={{ mb: 0.5 }}>
            Evaluation Standards
          </Typography>
          <Textarea
            minRows={10}
            value={evaluationText}
            onChange={(e) => setEvaluationText(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button  onClick={handleEvaluate}>Evaluate</Button>
        </Grid>
      </Grid>
    </InfoCard>
  );
};

export default LLMJudgeConfig;
