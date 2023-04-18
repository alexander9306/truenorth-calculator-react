import React from 'react';
import { styled } from '@mui/material/styles';
import { Pagination, TextField } from '@mui/material';

const CustomPaginationButtons = styled<typeof Pagination>(
  (props: any) => <Pagination {...props} />
)(({ theme }) => ({
  '& .MuiPagination-ul': {
    float: 'right',
  },
}));

export default CustomPaginationButtons;
