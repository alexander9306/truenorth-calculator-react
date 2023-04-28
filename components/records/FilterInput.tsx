import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import CustomTextField from '../theme-elements/CustomTextField';
import { useState } from 'react';

interface FilterInputProps {
  tableHeaders: { name: string; id: string }[];
  handleFilterChange: (filter: string, field: string) => void;
}
const FilterInput = ({
  tableHeaders,
  handleFilterChange,
}: FilterInputProps) => {
  const [column, setColumn] = useState(tableHeaders[0].id);
  const [filter, setFilter] = useState('');

  const handleChange = (e: any) => {
    const value = e.target.value;
    setFilter(value);
    handleFilterChange(value, column);
  };

  return (
    <Stack
      direction="row"
      my={2}
      spacing={2}
      justifyContent="flex-end"
    >
      <FormControl sx={{ width: '180px' }} fullWidth>
        <CustomTextField
          variant="outlined"
          label="Filter"
          value={filter}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl sx={{ width: '180px' }}>
        <InputLabel id="demo-simple-select-label">Column</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Column"
          size="medium"
          value={column}
          onChange={(e) => setColumn(e.target.value)}
        >
          {tableHeaders.map(({ name, id }) => (
            <MenuItem
              sx={{ textTransform: 'capitalize' }}
              value={id}
              key={id}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default FilterInput;
