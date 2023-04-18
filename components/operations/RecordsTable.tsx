import {
  Box,
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
import { useFetch } from '../../lib/useFetch';
import CustomPaginationButtons from '../theme-elements/CustomPagination';
import LoadingTable from './LoadingTable';

interface RecordsTableProps {
  tableHeaders: { name: string; id: string }[];
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
}

const RecordsTable = (props: RecordsTableProps) => {
  const url = `/v1/records?pageNumber=${props.pageNumber}&pageSize=${props.pageSize}&sortField=${props.sortField}&sortDirection=${props.sortDirection}&filterValue=${props.filterValue}&filterField=${props.filterField}`;

  const { data: records, isLoading } =
    useFetch<CollectionResponse<Record>>(url);

  return (
    <Box
      sx={{
        overflow: 'auto',
        width: { xs: '280px', sm: 'auto' },
        height: '600px',
        position: 'relative',
      }}
    >
      <Table
        aria-label="table"
        sx={{
          whiteSpace: 'nowrap',
          mt: 2,
        }}
      >
        <TableHead>
          <TableRow>
            {props.tableHeaders.map((header) => (
              <TableCell key={header.id}>
                <TableSortLabel
                  active={props.sortField === header.id}
                  direction={
                    props.sortDirection.toLowerCase() as
                      | 'desc'
                      | 'asc'
                  }
                  onClick={() => props.handleSortPage(header.id)}
                >
                  <Typography variant="subtitle2" fontWeight={600}>
                    {header.name}
                  </Typography>
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {isLoading ? (
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
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      <Box
        textAlign="right"
        mt={4}
        sx={{
          float: 'right',
          right: '0',
          bottom: '20px',
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
