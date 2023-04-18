import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

import DashboardCard from '../shared/DashboardCard';
import getCurrentBalanceChartOptions from '../../lib/getCurrentBalanceChartOptions';
import { useFetch } from '../../lib/useFetch';
import { Balance } from '../../interfaces/balance.interface';
import Loading from '../shared/Loading';

const CurrentBalance = () => {
  const theme = useTheme();

  const { data: balance, isLoading } = useFetch<Balance>(
    '/v1/operations/balance'
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!balance) return null;

  const seriesColumnChart: number[] = [
    balance.startedBalance - balance.currentBalance,
    balance.currentBalance,
  ];

  return (
    <DashboardCard title="Current Balance">
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Typography variant="h3" fontWeight="700">
            {balance.currentBalance}
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
