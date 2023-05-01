import React, { useMemo, useState } from 'react';

import DashboardCard from '../shared/DashboardCard';
import RecordsTable from './RecordsTable';
import FilterInput from './FilterInput';
import { debounce } from 'lodash';
import { useFetch } from '@/lib/useFetch';

const RecordsDashboard = () => {
  const initialState = {
    pageNumber: 1,
    pageSize: 7,
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
      }, 300),
    []
  );

  const { fetcher } = useFetch();

  const handleDeleteClick = async (id: number) => {
    await fetcher({
      url: `/v1/records/${id}`,
      method: 'DELETE',
    });
  };

  const tableHeaders = [
    { name: 'Id', id: 'id' },
    { name: 'Cost/Balance', id: 'amount', filterName: 'Cost' },
    { name: 'UserId', id: 'user' },
    { name: 'Response', id: 'operation_response' },
    { name: 'Date', id: 'date' },
    { name: 'Status', id: 'status' },
    { name: 'Delete', id: 'delete', filter: false, sort: false },
  ];

  return (
    <DashboardCard
      title="Operations record"
      action={
        <FilterInput
          handleFilterChange={handleFilterChange}
          tableHeaders={tableHeaders.filter(
            (table) => table.filter !== false
          )}
        />
      }
    >
      <>
        <RecordsTable
          {...query}
          tableHeaders={tableHeaders}
          handlePageChange={handlePageChange}
          handleSortPage={handleSortPage}
          handleDeleteClick={handleDeleteClick}
        />
        {/* Use to preload the next page for better UX */}
        <div style={{ display: 'none' }}>
          <RecordsTable
            {...query}
            pageNumber={query.pageNumber + 1}
            handlePageChange={handlePageChange}
            handleSortPage={handleSortPage}
            tableHeaders={tableHeaders}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      </>
    </DashboardCard>
  );
};

export default RecordsDashboard;
