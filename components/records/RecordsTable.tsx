import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { CollectionResponse } from '../../interfaces/collections-response.interface';
import { Record } from '../../interfaces/record.interface';
import { useSWRFetch } from '../../lib/useFetch';
import CustomPaginationButtons from '../theme-elements/CustomPagination';
import LoadingTable from '../operations/LoadingTable';
import { useEffect, useState } from 'react';
import { Balance } from '@/interfaces/balance.interface';

interface RecordsTableProps {
  tableHeaders: { name: string; id: string; sort?: boolean }[];
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortDirection: string;
  filterValue: string;
  filterField: string;
  handlePageChange: (
    e: React.ChangeEvent<unknown>,
    page: number
  ) => void;
  handleSortPage: (sortField: string) => void;
  handleDeleteClick:
    | ((id: number) => void)
    | ((id: number) => Promise<void>);
}

const RecordsTable = (props: RecordsTableProps) => {
  const url = `/v1/records?pageNumber=${props.pageNumber}&pageSize=${props.pageSize}&sortField=${props.sortField}&sortDirection=${props.sortDirection}&filterValue=${props.filterValue}&filterField=${props.filterField}`;

  const [loadTable, setLoadTable] = useState(false);

  const {
    data: records,
    isLoading,
    mutate: mutateRecords,
  } = useSWRFetch<CollectionResponse<Record>>(url);

  // Mimic a loading effect
  useEffect(() => {
    setLoadTable(true);
    const id = setTimeout(() => {
      setLoadTable(false);
    }, 1000);

    return () => clearTimeout(id);
  }, [isLoading]);

  const { mutate: mutateBalance } = useSWRFetch<Balance>(
    '/v1/operations/balance'
  );

  const onDeleteClick = async (record: Record) => {
    await props.handleDeleteClick(record.id);

    if (records) {
      mutateRecords({
        ...records,
        data: records?.data.map((v) =>
          v.id === record.id ? { ...v, status: 'inactive' } : v
        ),
      });

      //Update the balance cache on record delete
      mutateBalance(
        (balance) =>
          balance && {
            ...balance,
            currentBalance: balance?.currentBalance + record.amount,
          }
      );
    }
  };

  return (
    <Box
      sx={{
        overflow: 'auto',
        width: { xs: '280px', sm: 'auto' },
        height: '590px',
        position: 'relative',
      }}
    >
      <Table
        aria-label="table"
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        <TableHead>
          <TableRow>
            {props.tableHeaders.map((header) => (
              <TableCell key={header.id}>
                <TableSortLabel
                  active={props.sortField === header.id}
                  hideSortIcon={header.sort === false}
                  direction={
                    props.sortDirection.toLowerCase() as
                      | 'desc'
                      | 'asc'
                  }
                  onClick={() =>
                    header.sort !== false &&
                    props.handleSortPage(header.id)
                  }
                >
                  <Typography variant="subtitle2" fontWeight={600}>
                    {header.name}
                  </Typography>
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {loadTable ? (
          <LoadingTable
            pageSize={props.pageSize}
            tableSize={props.tableHeaders.length}
          />
        ) : (
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
                  <Box sx={{}}>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                      >
                        {record.amount}{' '}
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: '13px',
                          }}
                          component="span"
                        >
                          / {record.user_balance}
                        </Typography>
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
                    {record.user.id}
                  </Typography>
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
                <TableCell>
                  <Typography>
                    {new Date(record.date).toDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      px: '4px',
                      backgroundColor:
                        record.status === 'active'
                          ? 'success.main'
                          : 'error.main',
                      color: '#fff',
                    }}
                    size="small"
                    label={record.status}
                  ></Chip>
                </TableCell>
                <TableCell>
                  <Button
                    disabled={record.status === 'inactive'}
                    color="error"
                    variant="outlined"
                    size="small"
                    onClick={() => onDeleteClick(record)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      <Box
        mt={4}
        sx={{
          position: 'absolute',
          right: '0',
          bottom: '30px',
        }}
      >
        <CustomPaginationButtons
          count={records?.totalPages}
          page={props.pageNumber}
          onChange={props.handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default RecordsTable;
