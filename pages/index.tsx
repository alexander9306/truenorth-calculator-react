import { ReactElement, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '../src/components/container/PageContainer';

// components
import OperationForm from '../src/components/dashboard/OperationForm';
import CurrentBalance from '../src/components/dashboard/CurrentBalance';
import Result from '../src/components/dashboard/Result';
import FullLayout from '../src/layouts/full/FullLayout';
import { useFetch } from '../lib/useFetch';
import { FetcherProps } from '../lib/fetcher';
import Loading from '../src/components/shared/Loading';

export default function Home() {
  const [fetchResultOpt, setFetchResultOpt] =
    useState<FetcherProps | null>(null);

  const {
    data: result,
    isLoading,
    error,
  } = useFetch<any>(fetchResultOpt);

  const handleSubmit = (props: any) => {
    setFetchResultOpt({
      url: '/v1/operations',
      method: 'POST',
      body: JSON.stringify(props),
    });
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <OperationForm handleSubmit={handleSubmit} />
            <Box mt="20px" textAlign="center">
              <Typography
                variant="h6"
                color="red"
                component="span"
                textAlign="center"
              >
                {!!error && error.message}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Result result={result} />
              </Grid>
              <Grid item xs={12}>
                {isLoading ? <Loading /> : <CurrentBalance />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
