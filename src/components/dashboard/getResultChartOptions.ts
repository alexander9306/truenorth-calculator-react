import { Theme } from '@mui/material';

type GetResultChartOptionsFn = (
  theme: Theme
) => ApexCharts.ApexOptions;

const getResultChartOptions: GetResultChartOptionsFn = (theme) => ({
  chart: {
    type: 'area',
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  fill: {
    colors: ['#f5fcff'],
    type: 'solid',
    opacity: 0.05,
  },
  tooltip: {
    theme: 'light',
    fixed: {
      enabled: true,
      offsetY: -60,
    },
  },
});

export default getResultChartOptions;
