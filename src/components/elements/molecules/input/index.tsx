import { InputProps } from '@mui/material/Input';
import { Input as MuiInput } from '@mui/material';
import React from 'react';

export const Input: React.FC<InputProps> = React.forwardRef((props, ref) => {
  return <MuiInput {...props} ref={ref} />;
});
