import React, { useState, useRef } from 'react';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import InfoCard from '../components/InfoCard';
import MetricsDropdown from '../components/MetricsDropdown';
import properties from '../properties';
import { useNavigate } from 'react-router-dom';
import CustomLoader from '../components/CustomLoader';

const metricData = properties.metricData;

const LLMJudgeConfig = () => {
  const [llmModel, setLlmModel] = useState(properties.llm_model_name || '');
  const [awsRegion, setAwsRegion] = useState(properties.aws_region || '');
  const [concurrency, setConcurrency] = useState(3);
  const [requestsPerMinute, setRequestsPerMinute] = useState(3);
  const [evaluationText, setEvaluationText] = useState(properties.evaluation_standards || '');
  const [miscPrompt, setMiscPrompt] = useState('');
  const [excelFile, setExcelFile] = useState(null);
  const [loading, setLoading] = useState(false); // loader state
  const metricsRef = useRef();
  const navigate = useNavigate();

  const handleEvaluate = async () => {
    const selectedMetrics = metricsRef.current?.getValue() || [];

    if (!excelFile) {
      alert('Please upload an Excel file');
      return;
    }

    if (selectedMetrics.length === 0) {
      alert('Please select at least one metric');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('llm_model', llmModel);
      formData.append('input_excel', excelFile);
      formData.append('metrics', JSON.stringify(selectedMetrics));
      formData.append('qe_standard', evaluationText);
      formData.append('concurrency', concurrency.toString());
      formData.append('permiute', requestsPerMinute.toString());
      formData.append('aws_account', properties.demoValues.account);
      formData.append('aws_role', properties.demoValues.role);
      formData.append('region', awsRegion);
      formData.append('misc_promt', miscPrompt);

      const response = await fetch(properties.api_evaluate, {
        method: 'POST',
        headers: {
          'aws_username': properties.demoValues.username,
          'aws_password': properties.demoValues.password
        },
        body: formData
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      navigate('/LLMJudgeReport', { state: { inputData: result } });

      console.log('Evaluation Result:', result);
    } catch (error) {
      console.error('Error during evaluation:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <CustomLoader />}
      <InfoCard icon="info" title="Configure Evaluation" contentAlign="center">
        <Grid container spacing={2} sx={{ width: '100%' }}>
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
            <Button onClick={handleEvaluate}>Evaluate</Button>
          </Grid>
        </Grid>
      </InfoCard>
    </>
  );
};

export default LLMJudgeConfig;
