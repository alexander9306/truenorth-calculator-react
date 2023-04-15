import { Theme } from '@mui/material';

type GetCurrentBalanceChartOptionsFn = (
  theme: Theme
) => ApexCharts.ApexOptions;

const getCurrentBalanceChartOptions: GetCurrentBalanceChartOptionsFn =
  (theme) => ({
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: ['#ecf2ff', theme.palette.primary.main],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: ['Used', 'Remaining'],
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  });

export default getCurrentBalanceChartOptions;
