import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import CustomTextField from '../theme-elements/CustomTextField';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';

interface AuthLoginProps {
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
});

const AuthLogin = ({ title, subtitle, subtext }: AuthLoginProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async ({ username, password }) => {
      setIsLoading(true);
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (res?.ok) {
        await router.push('/');
      } else {
        setApiError(res?.error);
      }

      setIsLoading(false);
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

      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              Username
            </Typography>
            <CustomTextField
              variant="outlined"
              name="username"
              id="username"
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
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>
            <CustomTextField
              type="password"
              variant="outlined"
              name="password"
              id="password"
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
          </Box>
        </Stack>

        <Typography
          variant="subtitle1"
          color="red"
          mt="5px"
          component="span"
        >
          {apiError}
        </Typography>
        <Box pt={4} textAlign="end">
          <LoadingButton
            loading={isLoading}
            loadingIndicator="Loading…"
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </LoadingButton>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
