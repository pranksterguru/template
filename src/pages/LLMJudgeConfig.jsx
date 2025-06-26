import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import InfoCard from '../components/InfoCard';

const LLMJudgeConfig = () => {
  const [llmModel, setLlmModel] = useState('');
  const [evaluationText, setEvaluationText] = useState('');
  const [excelFile, setExcelFile] = useState(null);

  const handleEvaluate = () => {
    console.log('Evaluating with:', { llmModel, evaluationText, excelFile });
    // Placeholder for evaluation logic
  };

  return (
      <InfoCard icon="info" title="Configure Evaluation">
        <Stack spacing={1} sx={{ maxWidth: 500, width: '100%' }}>
         
            <Typography level="body-sm" sx={{ mb: 0.5 }}>
              LLM Model Name
            </Typography>
            <Input
              value={llmModel}
              onChange={(e) => setLlmModel(e.target.value)}
              sx={{ width: '100%' }}
            />
         

          <Box>
            <Typography level="body-sm" sx={{ mb: 0.5 }}>
              Evaluation Standards
            </Typography>
            <Textarea
              minRows={3}
              value={evaluationText}
              onChange={(e) => setEvaluationText(e.target.value)}
              sx={{ width: '100%' }}
            />
          </Box>

          <Box>
            <Typography level="body-sm" sx={{ mb: 0.5 }}>
              Upload Excel File
            </Typography>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setExcelFile(e.target.files[0])}
              style={{ width: '100%' }}
            />
          </Box>

          <Button onClick={handleEvaluate}>Evaluate</Button>
        </Stack>
      </InfoCard>
  );
};

export default LLMJudgeConfig;
