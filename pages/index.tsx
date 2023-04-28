import { ReactElement, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '../components/container/PageContainer';

// components
import OperationForm from '../components/operations/OperationForm';
import CurrentBalance from '../components/operations/CurrentBalance';
import Result from '../components/operations/Result';
import FullLayout from '../components/layouts/full/FullLayout';
import { useFetch, useSWRFetch } from '../lib/useFetch';
import { Balance } from '@/interfaces/balance.interface';

export default function Home() {
  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);

  const { fetcher } = useFetch();

  const { data: balance, mutate } = useSWRFetch<Balance>(
    '/v1/operations/balance'
  );

  const handleSubmit = async (props: any, cost: number) => {
    setError(undefined);
    setLoading(true);

    try {
      const res = await fetcher({
        url: '/v1/operations',
        method: 'POST',
        body: JSON.stringify(props),
      });
      setData(res);

      if (balance)
        mutate({
          ...balance,
          currentBalance: balance.currentBalance - cost,
        });
    } catch (error) {
      setError(error);
    }
    setLoading(false);
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
                <Result result={data?.result} />
              </Grid>
              <Grid item xs={12}>
                <CurrentBalance
                  balance={balance}
                  isLoading={loading}
                />
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
