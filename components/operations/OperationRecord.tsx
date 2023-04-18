import React, { useMemo, useState } from 'react';

import DashboardCard from '../shared/DashboardCard';
import RecordsTable from './RecordsTable';
import FilterTable from './FilterTable';
import { debounce } from 'lodash';

const OperationRecord = () => {
  const initialState = {
    pageNumber: 1,
    pageSize: 8,
    sortField: 'date',
    sortDirection: 'DESC',
    filterValue: '',
    filterField: 'id',
  };

  const [query, setQuery] = useState(initialState);

  const handlePageChange = (e: any, page: number) => {
    setQuery((v) => ({ ...v, pageNumber: page }));
  };

  const handleSortPage = (sortField: string) => {
    let direction = query.sortDirection;

    if (query.sortField === sortField) {
      direction = query.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    }

    setQuery((v) => ({
      ...v,
      pageNumber: 1,
      sortField: sortField,
      sortDirection: direction,
    }));
  };

  const handleFilterChange = useMemo(
    () =>
      debounce((filter: string, field: string) => {
        setQuery((v) => ({
          ...v,
          pageNumber: 1,
          filterValue: filter,
          filterField: field,
        }));
      }, 500),
    []
  );

  const tableHeaders = [
    { name: 'Id', id: 'id' },
    { name: 'Cost/Balance', id: 'amount' },
    { name: 'UserId', id: 'user' },
    { name: 'Response', id: 'operation_response' },
    { name: 'Date', id: 'date' },
    { name: 'Status', id: 'status' },
  ];

  return (
    <DashboardCard
      title="Operations record"
      action={
        <FilterTable
          handleFilterChange={handleFilterChange}
          tableHeaders={tableHeaders}
        />
      }
    >
      <>
        <RecordsTable
          {...query}
          tableHeaders={tableHeaders}
          handlePageChange={handlePageChange}
          handleSortPage={handleSortPage}
        />
        {/* Use to preload the next page for better UX */}
        <div style={{ display: 'none' }}>
          <RecordsTable
            {...query}
            pageNumber={query.pageNumber + 1}
            handlePageChange={handlePageChange}
            handleSortPage={handleSortPage}
            tableHeaders={tableHeaders}
          />
        </div>
      </>
    </DashboardCard>
  );
};

export default OperationRecord;
