import { ReactElement, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from '../src/components/container/PageContainer';

// components
import OperationForm from '../src/components/dashboard/OperationForm';
import CurrentBalance from '../src/components/dashboard/CurrentBalance';
import Result from '../src/components/dashboard/Result';
import FullLayout from '../src/layouts/full/FullLayout';
import { useSession } from 'next-auth/react';

export default function Home() {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <OperationForm />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Result result="" />
              </Grid>
              <Grid item xs={12}>
                <CurrentBalance />
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
