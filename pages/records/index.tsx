import type { ReactElement } from 'react';
import PageContainer from '../../components/container/PageContainer';
import FullLayout from '../../components/layouts/full/FullLayout';
import RecordsDashboard from '../../components/records/RecordsDashboard';

const Records = () => {
  return (
    <PageContainer
      title="Operations record"
      description="Record of all operations"
    >
      <RecordsDashboard />
    </PageContainer>
  );
};

export default Records;
Records.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
