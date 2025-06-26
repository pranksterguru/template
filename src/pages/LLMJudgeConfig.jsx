import React, { useState, useRef } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import InfoCard from '../components/InfoCard';
import Metrics from '../components/Metrics';

const metricData = [
    {
        name: 'metric1',
        description: 'description of the metric',
        thresholds: { green: 50, amber: 75, red: 90 }
    },
    {
        name: 'metric2',
        description: 'description of the metric',
        thresholds: { green: 60, amber: 80, red: 95 }
    },
    {
        name: 'metric3',
        description: 'description of the metric',
        thresholds: { green: 40, amber: 70, red: 85 }
    }
];

const LLMJudgeConfig = () => {
    const [llmModel, setLlmModel] = useState('');
    const [evaluationText, setEvaluationText] = useState('');
    const [excelFile, setExcelFile] = useState(null);
    const metricsRef = useRef();

const handleEvaluate = () => {
    const selectedMetrics = metricsRef.current?.getValue() || [];

    console.log('Evaluating with:');
    console.log('LLM Model:', llmModel);
    console.log('Evaluation Text:', evaluationText);
    console.log('Uploaded File:', excelFile?.name || 'No file selected');
    console.log('Selected Metrics:', selectedMetrics);
};

    return (
        <InfoCard icon="info" title="Configure Evaluation" contentAlign="center">
            <Stack spacing={2} sx={{ maxWidth: 500, width: '100%' }}>
                <Box>
                    <Typography level="body-sm" sx={{ mb: 0.5 }}>
                        LLM Model Name
                    </Typography>
                    <Input
                        value={llmModel}
                        onChange={(e) => setLlmModel(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                </Box>

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

                <Box sx={{ mt: 2 }}>
                    <Typography level="body-sm" sx={{ mb: 1 }}>
                        Select Metrics
                    </Typography>
                    <Metrics ref={metricsRef} metricData={metricData} />
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
