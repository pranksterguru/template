import React, { useState, useRef } from 'react';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import InfoCard from '../components/InfoCard';
import MetricsDropdown from '../components/MetricsDropdown';
import CustomLoader from '../components/CustomLoader';
import StatsCard from '../components/Statscard';
import Card from '@mui/joy/Card';
import properties from '../properties';
import mockdata from './input_single.json';


const metricData = properties.metricData;

const LLMJudgePlayground = () => {
    const [llmModel, setLlmModel] = useState(properties.llm_model_name || '');
    const [awsRegion, setAwsRegion] = useState(properties.aws_region || '');
    const [evaluationText, setEvaluationText] = useState(properties.evaluation_standards || '');
    const [miscPrompt, setMiscPrompt] = useState('');
    const [aiGenerated, setAiGenerated] = useState('');
    const [inputToAi, setInputToAi] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultDetail, setResultDetail] = useState(null);
    const metricsRef = useRef();

    const handleRun = async () => {
        const selectedMetrics = metricsRef.current?.getValue() || [];

        if (selectedMetrics.length === 0) {
            alert('Please select at least one metric');
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('llm_model', llmModel);
            formData.append('metrics', JSON.stringify(selectedMetrics));
            formData.append('qe_standard', evaluationText);
            formData.append('region', awsRegion);
            formData.append('misc_promt', miscPrompt);
            formData.append('ai_generated', aiGenerated);
            formData.append('input_to_ai', inputToAi);
            formData.append('aws_account', properties.demoValues.account);
            formData.append('aws_role', properties.demoValues.role);

            const response = await fetch(properties.api_playground, {
                method: 'POST',
                headers: {
                    'aws_username': properties.demoValues.username,
                    'aws_password': properties.demoValues.password
                },
                body: formData
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const json = await response.json();
            const detail = json?.result?.[1]?.details?.[0];
            if (!detail) throw new Error('Invalid API response: no result detail found');
            setResultDetail(detail);
        } catch (error) {
            console.error('Error during evaluation, using fallback data:', error);
            // fallback to static input_single.json
            const fallbackDetail = mockdata?.result?.[1]?.details?.[0];
            if (fallbackDetail) {
                setResultDetail(fallbackDetail);
            } else {
                alert('API failed and fallback data is invalid.');
            }
        } finally {
            setLoading(false);
        }

    };

    const renderDetail = (detail) => {
        return detail.elements?.map((el, idx) => {
            if (el.type === 'cards') {
                return (
                    <Box
                        key={`cards-${idx}`}
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${el.columns || 3}, 1fr)`,
                            gap: 2,
                            my: 2
                        }}
                    >
                        {el.cards.map((card, cIdx) => (
                            <StatsCard
                                key={`card-${cIdx}`}
                                title={card.name}
                                value={card.score}
                                colour={card.colour?.toLowerCase()}
                                size="small"
                            />
                        ))}
                    </Box>
                );
            }

            if (el.type === 'textarea' && Array.isArray(el.data)) {
                return (
                    <Box
                        key={`textarea-${idx}`}
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${el.data.length}, 1fr)`,
                            gap: 2,
                            my: 2,
                        }}
                    >
                        {el.data.map((item, tIdx) => (
                            <Card key={`text-${tIdx}`} variant="outlined" sx={{ p: 2 }}>
                                <Typography level="title-sm" sx={{ mb: 1 }}>
                                    {item.title}
                                </Typography>
                                <Typography level="body-sm" color="neutral">
                                    {item.content}
                                </Typography>
                            </Card>
                        ))}
                    </Box>
                );
            }

            return null;
        });
    };

    return (
        <Box sx={{ p: 3 }}>
            {loading && <CustomLoader />}
            <InfoCard icon="info" title="LLM Playground" contentAlign="center">
                <Grid container spacing={2} sx={{ width: '100%' }}>
                    <Grid xs={12} sm={6}>
                        <Typography level="body-sm" sx={{ mb: 0.5 }}>
                            LLM Model Name
                        </Typography>
                        <Input value={llmModel} onChange={(e) => setLlmModel(e.target.value)} fullWidth sx={{ mb: 2 }} />

                        <Typography level="body-sm" sx={{ mb: 0.5 }}>
                            AWS Region
                        </Typography>
                        <Input value={awsRegion} onChange={(e) => setAwsRegion(e.target.value)} fullWidth sx={{ mb: 2 }} />
                    </Grid>

                    <Grid xs={12} sm={6}>
                        <Typography level="body-sm" sx={{ mb: 1 }}>
                            Select Metrics
                        </Typography>
                        <MetricsDropdown ref={metricsRef} metricData={metricData} />

                        <Typography level="body-sm" sx={{ mt: 3, mb: 0.5 }}>
                            Misc Prompt
                        </Typography>
                        <Textarea minRows={6} value={miscPrompt} onChange={(e) => setMiscPrompt(e.target.value)} fullWidth />
                    </Grid>

                    <Grid xs={12}>
                        <Typography level="body-sm" sx={{ mb: 0.5 }}>
                            Evaluation Standards
                        </Typography>
                        <Textarea minRows={10} value={evaluationText} onChange={(e) => setEvaluationText(e.target.value)} fullWidth sx={{ mb: 2 }} />
                    </Grid>

                    <Grid xs={12}>
                        <Typography level="body-sm" sx={{ mb: 0.5 }}>
                            AI Generated
                        </Typography>
                        <Textarea minRows={10} value={aiGenerated} onChange={(e) => setAiGenerated(e.target.value)} fullWidth sx={{ mb: 2 }} />
                    </Grid>

                    <Grid xs={12}>
                        <Typography level="body-sm" sx={{ mb: 0.5 }}>
                            Input to AI Generation
                        </Typography>
                        <Textarea minRows={10} value={inputToAi} onChange={(e) => setInputToAi(e.target.value)} fullWidth sx={{ mb: 2 }} />
                    </Grid>

                    <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={handleRun}>Run Playground</Button>
                    </Grid>
                </Grid>
            </InfoCard>

            {resultDetail && (
                <Box sx={{ mt: 6 }}>
                    <InfoCard icon="info" title={resultDetail.test_name || 'Playground Result'} contentAlign="center">
                        {renderDetail(resultDetail)}
                    </InfoCard>
                </Box>
            )}
        </Box>
    );
};

export default LLMJudgePlayground;
