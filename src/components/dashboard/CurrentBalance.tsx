import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

import DashboardCard from '../shared/DashboardCard';
import getCurrentBalanceChartOptions from './getCurrentBalanceChartOptions';

const CurrentBalance = () => {
  // chart color
  const theme = useTheme();
  const seriesColumnChart: number[] = [20, 80];

  return (
    <DashboardCard title="Current Balance">
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Typography variant="h3" fontWeight="700">
            36,358
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Chart
            options={getCurrentBalanceChartOptions(theme)}
            series={seriesColumnChart}
            type="donut"
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default CurrentBalance;
