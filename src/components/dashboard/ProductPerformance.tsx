import React, { useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import CustomPaginationButtons from '../forms/theme-elements/CustomPagination';
import { useFetch } from '../../../lib/useFetch';
import { CollectionResponse } from '../../../interfaces/collections-response.interface';
import { Record } from '../../../interfaces/record.interface';

const ProductPerformance = () => {
  const initialState = {
    pageNumber: 1,
    pageSize: 10,
    sortField: 'date',
    sortDirection: 'DESC',
    filterValue: '',
    filterField: '',
  };

  const [query, setQuery] = useState(initialState);

  const {
    pageNumber,
    pageSize,
    sortField,
    sortDirection,
    filterValue,
    filterField,
  } = query;

  const url = `/v1/records?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortDirection=${sortDirection}`;

  const { data: records, isLoading } =
    useFetch<CollectionResponse<Record>>(url);

  return (
    <DashboardCard title="Product Performance">
      <Box
        sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Amount
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  User Balance
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Operation Response
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Date
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records?.data.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {record.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                      >
                        {record.amount}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: '13px',
                        }}
                      >
                        {record.user_balance}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {record.operation_response}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">${record.date}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      px: '4px',
                      backgroundColor:
                        record.status === 'active'
                          ? 'primary.main'
                          : 'error.main',
                      color: '#fff',
                    }}
                    size="small"
                    label={record.status}
                  ></Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box textAlign="right" mt={3}>
          <CustomPaginationButtons
            count={records?.totalPages}
            color="primary"
          />
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default ProductPerformance;
