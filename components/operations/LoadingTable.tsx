import {
  Skeleton,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

function LoadingTableCells({ tableSize }: any) {
  const arrayCell = new Array(tableSize).fill(0);

  return (
    <>
      {arrayCell.map((v, i) => (
        <TableCell key={i}>
          <Skeleton variant="rectangular" width="100%" height={23} />
        </TableCell>
      ))}
    </>
  );
}

interface LoadingTableProps {
  pageSize: number;
  tableSize: number;
}
export default function LoadingTable({
  pageSize,
  tableSize,
}: LoadingTableProps) {
  const arrayRow = new Array(pageSize).fill(0);

  return (
    <TableBody>
      {arrayRow.map((v, i) => (
        <TableRow key={i}>
          <LoadingTableCells tableSize={tableSize} />
        </TableRow>
      ))}
    </TableBody>
  );
}
