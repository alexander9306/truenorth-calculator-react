import React from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import DashboardCard from '../../../src/components/shared/DashboardCard';

const SalesOverview = () => {
  // select
  const [month, setMonth] = React.useState('');

  const handleChange = (event: any) => {
    setMonth(event.target.value);
  };

  return (
    <DashboardCard
      title="Type"
      action={
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="type-dd">Type</InputLabel>
          <Select
            labelId="type-dd"
            label="Type"
            name="type"
            id="type-dd"
            value={month}
            size="medium"
            onChange={handleChange}
          >
            <MenuItem value={1}>March 2023</MenuItem>
            <MenuItem value={2}>April 2023</MenuItem>
            <MenuItem value={3}>May 2023</MenuItem>
          </Select>
        </FormControl>
      }
    >
      <div>hello</div>
    </DashboardCard>
  );
};

export default SalesOverview;
