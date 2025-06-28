// LLMReportControls.jsx
import React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import DownloadIcon from '@mui/icons-material/Download'; // Or use PrintIcon if preferred

const LLMReportControls = ({ onExpandAll, onCollapseAll, onReset, onFilter }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        gap: 2,
        overflowX: 'auto',
        px: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 'md',
          px: 1.5,
          py: 1,
          whiteSpace: 'nowrap'
        }}
      >
        <Typography level="title-sm">Actions:</Typography>
        <Button size="sm" onClick={onExpandAll}>Expand All</Button>
        <Button size="sm" onClick={onCollapseAll}>Collapse All</Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 'md',
          px: 1.5,
          py: 1,
          whiteSpace: 'nowrap'
        }}
      >
        <Typography level="title-sm">Reset:</Typography>
        <Button size="sm" onClick={onReset}>Reset</Button>
        <Button
          size="sm"
          onClick={() => window.print()}
          startDecorator={<DownloadIcon />}
        >
          Export
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 'md',
          px: 1.5,
          py: 1,
          whiteSpace: 'nowrap'
        }}
      >
        <Typography level="title-sm">Filter by Status:</Typography>
        {['red', 'amber', 'green'].map((color) => (
          <Button
            key={color}
            size="sm"
            onClick={() => onFilter(color)}
            sx={{
              backgroundColor:
                color === 'red' ? '#c62828' :
                color === 'amber' ? '#ff8f00' :
                '#2e7d32',
              color: '#fff',
              '&:hover': {
                backgroundColor:
                  color === 'red' ? '#c62828' :
                  color === 'amber' ? '#ff8f00' :
                  '#2e7d32'
              }
            }}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Button>
        ))}
      </Box>
    </Box>
  </Box>
);

export default LLMReportControls;
