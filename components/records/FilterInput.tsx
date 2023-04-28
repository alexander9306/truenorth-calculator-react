import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import CustomTextField from '../theme-elements/CustomTextField';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import ClearIcon from '@mui/icons-material/Clear';

interface FilterInputProps {
  tableHeaders: { name: string; id: string; filterName?: string }[];
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
  const handleColumnChange = (e: any) => {
    const value = e.target.value;
    setColumn(value);

    if (value === 'date') setFilter('');
  };

  const handleClearClick = () => {
    setFilter('');
    handleFilterChange('', column);
  };

  const handleDateChange = (date: any) =>
    handleFilterChange(date.toString(), column);

  return (
    <Stack
      direction="row"
      my={2}
      spacing={2}
      justifyContent="flex-end"
    >
      <FormControl sx={{ width: '180px' }} fullWidth>
        {column === 'date' && (
          <DatePicker label="Date" onChange={handleDateChange} />
        )}
        {column !== 'date' && (
          <CustomTextField
            variant="outlined"
            label="Filter"
            value={filter}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <IconButton
                  sx={{ visibility: filter ? 'visible' : 'hidden' }}
                  onClick={handleClearClick}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        )}
      </FormControl>

      <FormControl sx={{ width: '180px' }}>
        <InputLabel id="demo-simple-select-label">Column</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Column"
          size="medium"
          value={column}
          onChange={handleColumnChange}
        >
          {tableHeaders.map(({ name, id, filterName }) => (
            <MenuItem
              sx={{ textTransform: 'capitalize' }}
              value={id}
              key={id}
            >
              {filterName ?? name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default FilterInput;
