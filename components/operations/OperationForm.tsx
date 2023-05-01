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
  FormHelperText,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DashboardCard from '../shared/DashboardCard';
import CustomTextField from '../theme-elements/CustomTextField';
import { Operation } from '../../interfaces/operation.interface';
import { useSWRFetch } from '../../lib/useFetch';
import { CollectionResponse } from '../../interfaces/collections-response.interface';

const validationSchema = yup.object({
  type: yup.string().required('Type is required'),
  num1: yup
    .number()
    .max(Number.MAX_SAFE_INTEGER, 'Number is too big')
    .min(Number.MIN_SAFE_INTEGER, 'Number is too small')
    .required('Num1 is required')
    .when('type', {
      is: (type: string) => type === 'random_string',
      then: () => yup.number().notRequired(),
    }),
  num2: yup
    .number()
    .max(Number.MAX_SAFE_INTEGER, 'Number is too big')
    .min(Number.MIN_SAFE_INTEGER, 'Number is too small')
    .required('Num2 is required')
    .when('type', {
      is: (type: string) =>
        type === 'random_string' || type === 'square_root',
      then: () => yup.number().notRequired(),
    }),
});

interface OperationFormProps {
  handleSubmit: (props: any, cost: number) => void;
}

const OperationForm = ({ handleSubmit }: OperationFormProps) => {
  const { data: operations } = useSWRFetch<
    CollectionResponse<Operation>
  >('/v1/operations?pageSize=100&sortField=id&sortDirection=ASC');

  const formik = useFormik({
    initialValues: {
      type: undefined,
      num1: undefined,
      num2: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: ({ type, ...rest }) =>
      handleSubmit(
        {
          type,
          ...(type !== 'random_string' && { num1: rest.num1 }),
          ...(type !== 'random_string' &&
            type !== 'square_root' && { num2: rest.num2 }),
        },
        operations?.data.find((v) => v.type === type)?.cost ?? 0
      ),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DashboardCard
        title="Operation"
        action={
          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="type-dd">Type</InputLabel>
            <Select
              labelId="type-dd"
              label="Type"
              id="type-dd"
              size="medium"
              {...formik.getFieldProps('type')}
              error={
                formik.touched.type && Boolean(formik.errors.type)
              }
            >
              {operations?.data.map((operation) => (
                <MenuItem key={operation.id} value={operation.type}>
                  {operation.type} - {operation.cost}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formik.touched.type && formik.errors.type}
            </FormHelperText>
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
                htmlFor="num1"
                mb="5px"
              >
                Num1:
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <CustomTextField
                variant="outlined"
                id="num1"
                size="small"
                type="number"
                {...formik.getFieldProps('num1')}
                disabled={formik.values.type === 'random_string'}
                error={
                  formik.touched.num1 && Boolean(formik.errors.num1)
                }
                helperText={formik.touched.num1 && formik.errors.num1}
              />
            </Grid>
          </Grid>
          <Grid container my={2}>
            <Grid item xs={6} md={2}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="num2"
                mb="5px"
              >
                Num2:
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <CustomTextField
                variant="outlined"
                id="num2"
                size="small"
                type="number"
                {...formik.getFieldProps('num2')}
                disabled={
                  formik.values.type === 'random_string' ||
                  formik.values.type === 'square_root'
                }
                error={
                  formik.touched.num2 && Boolean(formik.errors.num2)
                }
                helperText={formik.touched.num2 && formik.errors.num2}
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
                disabled={formik.isSubmitting}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </form>
  );
};

export default OperationForm;
