import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';

interface ResultProps {
  result?: string;
}

const Result = ({ result }: ResultProps) => {
  return (
    <DashboardCard title="Result">
      <Box my="60px" position="relative">
        <Typography
          variant="h3"
          fontWeight="700"
          style={{
            position: 'absolute',
            top: -30,
          }}
        >
          {result}
        </Typography>
      </Box>
    </DashboardCard>
  );
};

export default Result;
