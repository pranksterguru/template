import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import InfoCard from '../components/InfoCard';

// sample data (unchanged)

const sampleData = [
  {
    request_id: "578e980b",
    agent_id: "ABC123",
    request_state: "SUBMITTED",
    complaint_id: "ABCD",
    complaint_issue: ["Points"],
    cost_card_details: "DI-100",
    additional_details: "",
    input_token_count: 2997,
    output_token_count: 736,
    generated_letter: "generated",
    modified_letter: "modified",
    feedback_rating: 5,
    feedback_comment: ["Costs were all captured accurately", "CUSTOM_COMMENT:"],
    response_time: 18,
    created_at: "2028-07-03T13:00:04.832707",
    modified_at: "2028-07-03T13:01:15.029473",
    readability_score: 57
  },
  {
    request_id: "578e980c",
    agent_id: "DEF456",
    request_state: "SUBMITTED",
    complaint_id: "EFGH",
    complaint_issue: ["Delay"],
    cost_card_details: "DI-200",
    additional_details: "",
    input_token_count: 2500,
    output_token_count: 500,
    generated_letter: "generated2",
    modified_letter: "modified2",
    feedback_rating: 4,
    feedback_comment: ["Some delay issues", "CUSTOM_COMMENT:"],
    response_time: 12,
    created_at: "2028-07-04T11:00:04.832707",
    modified_at: "2028-07-04T11:01:15.029473",
    readability_score: 60
  },
  {
    request_id: "578e980d",
    agent_id: "GHI789",
    request_state: "SUBMITTED",
    complaint_id: "IJKL",
    complaint_issue: ["Incorrect Bill"],
    cost_card_details: "DI-300",
    additional_details: "",
    input_token_count: 2800,
    output_token_count: 600,
    generated_letter: "generated3",
    modified_letter: "modified3",
    feedback_rating: 3,
    feedback_comment: ["Billing error", "CUSTOM_COMMENT:"],
    response_time: 15,
    created_at: "2028-07-05T09:00:04.832707",
    modified_at: "2028-07-05T09:01:15.029473",
    readability_score: 55
  }
];

const getDateString = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

const LLMJudgeDB = () => {
  const [filters, setFilters] = useState({
    dateStart: getDateString(-7),
    dateEnd: getDateString(0),
    agentId: '',
    complaintId: '',
    requestId: ''
  });

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});

  const handleSearch = () => {
    // simulate fetch
    setData(sampleData);
    setSelected({});
  };

  const toggleSelect = (id) => {
    setSelected((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleEvaluate = () => {
    const selectedRows = data.filter(row => selected[row.request_id]);
    console.log('Evaluating:', selectedRows);
    // send to API here
  };

  return (
    <Box sx={{ p: 3 }}>
      <InfoCard title="LLM Judge Database Search" icon="info">
        <Stack spacing={2} direction="row" sx={{ flexWrap: 'wrap', mb: 2 }}>
          <Input
            type="date"
            value={filters.dateStart}
            onChange={(e) => setFilters({ ...filters, dateStart: e.target.value })}
            sx={{ minWidth: 160 }}
          />
          <Input
            type="date"
            value={filters.dateEnd}
            onChange={(e) => setFilters({ ...filters, dateEnd: e.target.value })}
            sx={{ minWidth: 160 }}
          />
          <Input
            placeholder="Agent ID"
            value={filters.agentId}
            onChange={(e) => setFilters({ ...filters, agentId: e.target.value })}
            sx={{ minWidth: 140 }}
          />
          <Input
            placeholder="Complaint ID"
            value={filters.complaintId}
            onChange={(e) => setFilters({ ...filters, complaintId: e.target.value })}
            sx={{ minWidth: 140 }}
          />
          <Input
            placeholder="Request ID"
            value={filters.requestId}
            onChange={(e) => setFilters({ ...filters, requestId: e.target.value })}
            sx={{ minWidth: 140 }}
          />
          <Button onClick={handleSearch}>Search</Button>
        </Stack>

        {data.length > 0 && (
          <>
            <Sheet variant="outlined" sx={{ mt: 2, borderRadius: 'sm' }}>
              <Table>
                <thead>
                  <tr>
                    <th style={{ width: 40, textAlign: 'center' }}></th>
                    <th>Agent ID</th>
                    <th>Complaint ID</th>
                    <th>Complaint Issue</th>
                    <th>Cost Card</th>
                    <th>Generated Letter</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.request_id}>
                      <td style={{ width: 40, textAlign: 'center' }}>
                        <Checkbox
                          checked={!!selected[row.request_id]}
                          onChange={() => toggleSelect(row.request_id)}
                        />
                      </td>
                      <td>{row.agent_id}</td>
                      <td>{row.complaint_id}</td>
                      <td>{row.complaint_issue.join(', ')}</td>
                      <td>{row.cost_card_details}</td>
                      <td>{row.generated_letter}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button onClick={handleEvaluate}>Evaluate</Button>
            </Box>
          </>
        )}
      </InfoCard>
    </Box>
  );
};

export default LLMJudgeDB;
