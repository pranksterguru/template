import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Accordion from '@mui/joy/Accordion';
import AccordionSummary from '@mui/joy/AccordionSummary';
import AccordionDetails from '@mui/joy/AccordionDetails';
import Card from '@mui/joy/Card';
import StatsCard from './Statscard';
import StatusSmiley from './StatusSmiley'; // make sure path is correct

const LLMJudgeReportAccordion = ({ detail, index, detailIndex }) => {
  const status = (detail.overall_rating || 'green').toLowerCase(); // default to green

  return (
    <Accordion
      key={`accordion-${index}-${detailIndex}`}
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
      <AccordionSummary
        sx={{
          minHeight: 48,
          px: 2,
          py: 1.5,
          borderTop: '1px groove',
backgroundColor: 'neutral.solidBg',

          '&.MuiAccordionSummary-root:hover': {
            backgroundColor: 'transparent !important',
          },
          '& .MuiAccordionSummary-button': {
            backgroundColor: 'transparent !important',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          },
          '& .MuiAccordionSummary-button:hover': {
            backgroundColor: 'transparent !important',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Typography level="title-md" fontWeight="md">
            {detail['test_name']}
          </Typography>
        </Box>
        <Box sx={{ ml: 2 }}>
          <StatusSmiley status={status} size={32} />
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 2, pb: 1 }}>
        {detail.elements?.map((el, elIdx) => {
          if (el.type === 'cards') {
            return (
              <Box
                key={`cards-${elIdx}`}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${el.columns || 3}, 1fr)`,
                  gap: 2,
                  my: 3.5,
                  overflow: 'visible',
                  px: 0.5,
                }}
              >
                {el.cards.map((card, cardIdx) => (
                  <StatsCard
                    key={`card-${cardIdx}`}
                    title={card.name}
                    value={card.score}
                    colour={card.colour.toLowerCase()}
                    size="small"
                  />
                ))}
              </Box>
            );
          }

          if (el.type === 'textarea' && Array.isArray(el.data)) {
            return (
              <Box
                key={`textarea-${elIdx}`}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${el.data.length}, 1fr)`,
                  gap: 2,
                  my: 2,
                }}
              >
                {el.data.map((item, idx) => (
                  <Card
                    key={`text-${idx}`}
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 'sm',
                      boxShadow: 'xs',
                    }}
                  >
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
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default LLMJudgeReportAccordion;
