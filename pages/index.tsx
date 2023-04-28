import { ReactElement } from 'react';
import PageContainer from '@/components/container/PageContainer';

// components
import FullLayout from '@/components/layouts/full/FullLayout';
import OperationDashboard from '@/components/operations/OperationsDashboard';

export default function Home() {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <OperationDashboard />
    </PageContainer>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
