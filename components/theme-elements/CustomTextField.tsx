import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomTextField = styled<typeof TextField>((props: any) => (
  <TextField {...props} />
))(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder':
    {
      color: theme.palette.text.secondary,
      opacity: '20',
    },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[100],
    backgroundColor: theme.palette.grey[100],
  },
}));

export default CustomTextField;
