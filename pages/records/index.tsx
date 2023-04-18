import type { ReactElement } from 'react';
import PageContainer from '../../components/container/PageContainer';
import FullLayout from '../../components/layouts/full/FullLayout';
import OperationRecord from '../../components/operations/OperationRecord';

const Records = () => {
  return (
    <PageContainer
      title="Operations record"
      description="Record of all operations"
    >
      <OperationRecord />
    </PageContainer>
  );
};

export default Records;
Records.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
