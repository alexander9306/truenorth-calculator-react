import type { ReactElement } from 'react';
import PageContainer from '../../src/components/container/PageContainer';
import FullLayout from '../../src/layouts/full/FullLayout';
import ProductPerformance from '../../src/components/dashboard/ProductPerformance';

const Records = () => {
  return (
    <PageContainer
      title="Records"
      description="Records of operations"
    >
      <ProductPerformance />
    </PageContainer>
  );
};

export default Records;
Records.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
