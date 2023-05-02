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

  const clearValues = () => {
    setFilter('');
    handleFilterChange('', tableHeaders[0].id);
  };

  const handleColumnChange = (e: any) => {
    const value = e.target.value;
    setColumn(value);

    // Clear values when selecting or unselecting these columns
    const shouldClearValues = [value, column].some(
      (v) => v === 'date' || v === 'status'
    );

    if (shouldClearValues) return clearValues();

    if (!filter) return;

    handleFilterChange(filter, value);
  };

  const handleStateChange = (e: any) => {
    const value = e.target.value;
    setFilter(value);

    handleFilterChange(value, column);
  };

  const handleClearClick = () => clearValues();

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
        {column !== 'date' && column !== 'status' && (
          <CustomTextField
            variant="outlined"
            label="Filter"
            value={filter}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <IconButton
                  sx={{
                    visibility: filter ? 'visible' : 'hidden',
                  }}
                  onClick={handleClearClick}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        )}
        {column === 'status' && (
          <FormControl sx={{ width: '180px' }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              label="Status"
              size="medium"
              value={filter}
              onChange={handleStateChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        )}
      </FormControl>

      <FormControl sx={{ width: '180px' }}>
        <InputLabel id="column-select-label">Column</InputLabel>
        <Select
          labelId="column-select-label"
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
