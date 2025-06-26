import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import InfoCard from '../components/InfoCard';
import InfoOutlined from '@mui/icons-material/InfoOutlined';



const Dashboard = () => (
  <div>

<InfoCard title="Actionable Card" icon="info">
  <Typography level="body-sm" sx={{ mb: 1 }}>
    You can click the button below for more info.
  </Typography>

</InfoCard>


  </div>




);

export default Dashboard;
