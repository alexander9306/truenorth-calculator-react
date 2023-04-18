import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import CustomTextField from '../theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { useRouter } from 'next/router';
import { useFetch } from '../../lib/useFetch';
import { FetcherProps } from '../../lib/fetcher';
import { LoadingButton } from '@mui/lab';

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
    .required('Password confirmation is required'),
});

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const router = useRouter();
  const [fetcherOptions, setFetcherOptions] =
    useState<FetcherProps | null>(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: ({ username, password }) => {
      setFetcherOptions({
        url: '/v1/auth/signup',
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
    },
  });

  const { data, error, isLoading } = useFetch(fetcherOptions);

  if (data) {
    router.push('/authentication/login');
  }

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
              Password confirmation
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
          <Typography
            variant="subtitle1"
            color="red"
            mt="5px"
            component="span"
          >
            {!!error && error.message}
          </Typography>

          <LoadingButton
            loading={isLoading}
            loadingIndicator="Loading..."
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            fullWidth
          >
            Sign Up
          </LoadingButton>
        </form>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
