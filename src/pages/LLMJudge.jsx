import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Accordion from '@mui/joy/Accordion';
import AccordionSummary from '@mui/joy/AccordionSummary';
import AccordionDetails from '@mui/joy/AccordionDetails';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Grid from '@mui/joy/Grid';
import Table from '@mui/joy/Table';

import StatsCard from '../components/Statscard';
import InfoCard from '../components/InfoCard'; 
import llmJudgeData from '../llmJudgeData';

function renderCards(cardsObj) {
  const cards = cardsObj.cards;
  const columns = cardsObj.columns;
  const fillers = Array.from({ length: columns - cards.length });
  return (
    <Grid container spacing={2} columns={columns} sx={{ mb: 2 }}>
      {cards.map((card) => (
        <Grid key={card.name} xs={1}>
          <StatsCard
            title={card.name}
            value={card.score}
            colour={card.colour}
            size={card.size}
          />
        </Grid>
      ))}
      {fillers.map((_, idx) => (
        <Grid key={`filler-${idx}`} xs={1} />
      ))}
    </Grid>
  );
}

function renderTable(tableObj) {
  return (
    <Table size="sm" sx={{ maxWidth: 500, mb: 2 }}>
      <thead>
        <tr>
          {tableObj.headers.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableObj.rows.map((row, idx) => (
          <tr key={idx}>
            {row.map((cell, cidx) => (
              <td key={cidx}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function renderElement(el) {
  if (el.type === 'cards') return renderCards(el);
  if (el.type === 'table') return renderTable(el);
  return null;
}

const LLMJudge = () => {
  const [llmModel, setLlmModel] = useState('');
  const [evaluationText, setEvaluationText] = useState('');
  const [excelFile, setExcelFile] = useState(null);
  const [showReport, setShowReport] = useState(false);

  const handleEvaluate = () => {
    setShowReport(true);
  };

  const { overall, details } = llmJudgeData.result[0];

  return (
    <Box>
      <Typography level="h4" sx={{ mb: 2 }}>
        LLM as Judge
      </Typography>

      {!showReport && (
        <InfoCard icon="info" title="Evaluation Input" hoverEffect>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Input
              placeholder="LLM Model Name"
              value={llmModel}
              onChange={(e) => setLlmModel(e.target.value)}
            />
            <Textarea
              minRows={3}
              placeholder="Evaluation Standards"
              value={evaluationText}
              onChange={(e) => setEvaluationText(e.target.value)}
            />
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setExcelFile(e.target.files[0])}
            />
            <Button onClick={handleEvaluate}>Evaluate</Button>
          </Box>
        </InfoCard>
      )}

      {showReport && (
        <>
          <Box sx={{ mb: 4 }}>
            <Typography level="h5" sx={{ mb: 1 }}>
              {overall.overallname}
            </Typography>
            {overall.elements.map((el, idx) => (
              <Box key={idx} sx={{ mb: 2 }}>
                {renderElement(el)}
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />
          <Typography level="h5" sx={{ mb: 2 }}>
            Detail
          </Typography>

          <Accordion sx={{ maxWidth: 700 }}>
            {details.map((item) => (
              <Accordion key={item.id} sx={{ mb: 1 }}>
                <AccordionSummary indicator={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography level="title-md">{item.name}</Typography>
                    <Typography level="body-sm" sx={{ ml: 1, color: 'neutral.500' }}>
                      ({item.model})
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {item.elements.map((el, elIdx) => (
                    <Box key={elIdx} sx={{ mb: 2 }}>
                      {renderElement(el)}
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </Accordion>
        </>
      )}
    </Box>
  );
};

export default LLMJudge;
