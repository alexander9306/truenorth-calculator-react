import React from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
  Typography,
  Button,
} from '@mui/material';
import DashboardCard from '../shared/DashboardCard';
import CustomTextField from '../forms/theme-elements/CustomTextField';

const OperationForm = () => {
  // select
  const [month, setMonth] = React.useState('');

  const handleChange = (event: any) => {
    setMonth(event.target.value);
  };

  return (
    <DashboardCard
      title="Operation"
      action={
        <FormControl sx={{ m: 1, minWidth: 220 }}>
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="value1"
              mb="5px"
            >
              Value:
            </Typography>
          </Grid>
          <Grid item xs={6} md={10}>
            <CustomTextField
              variant="outlined"
              name="username"
              id="username"
              size="small"
              type="number"
              // value={formik.values.username}
              // onChange={formik.handleChange}
              // error={
              //   formik.touched.username &&
              //   Boolean(formik.errors.username)
              // }
              // helperText={
              //   formik.touched.username && formik.errors.username
              // }
            />
          </Grid>
        </Grid>
        <Grid container my={2}>
          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="value1"
              mb="5px"
            >
              Value2:
            </Typography>
          </Grid>
          <Grid item xs={6} md={10}>
            <CustomTextField
              variant="outlined"
              name="username"
              id="username"
              size="small"
              type="number"
              // value={formik.values.username}
              // onChange={formik.handleChange}
              // error={
              //   formik.touched.username &&
              //   Boolean(formik.errors.username)
              // }
              // helperText={
              //   formik.touched.username && formik.errors.username
              // }
            />
          </Grid>
        </Grid>

        <Grid container mt={5}>
          <Grid item xs={12} md={4}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </DashboardCard>
  );
};

export default OperationForm;
