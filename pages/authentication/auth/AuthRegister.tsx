import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import CustomTextField from '../../../src/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const validationSchema = yup.object({
  username: yup
    .string()
    .email('Enter a valid email')
    .required('Username is required'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Stack mb={3}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
              mt="25px"
            >
              Email Address
            </Typography>
            <CustomTextField
              id="username"
              name="username"
              variant="outlined"
              fullWidth
              value={formik.values.username}
              onChange={formik.handleChange}
              error={
                formik.touched.username &&
                Boolean(formik.errors.username)
              }
              helperText={
                formik.touched.username && formik.errors.username
              }
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
              mt="25px"
            >
              Password
            </Typography>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              name="password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
                formik.touched.password &&
                Boolean(formik.errors.password)
              }
              helperText={
                formik.touched.password && formik.errors.password
              }
            />
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="passwordConfirmation"
              mb="5px"
              mt="25px"
            >
              Confirm Password
            </Typography>
            <CustomTextField
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              variant="outlined"
              fullWidth
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              error={
                formik.touched.passwordConfirmation &&
                Boolean(formik.errors.passwordConfirmation)
              }
              helperText={
                formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation
              }
            />
          </Stack>
          <Button
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            fullWidth
          >
            Sign Up
          </Button>
        </form>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
