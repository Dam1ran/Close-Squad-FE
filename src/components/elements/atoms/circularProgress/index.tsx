import { CircularProgressProps } from '@mui/material/CircularProgress';
import { CircularProgress as MuiCircularProgress } from '@mui/material';
import React from 'react';

export const CircularProgress: React.FC<CircularProgressProps> = React.forwardRef((props, ref) => {
  return <MuiCircularProgress {...props} ref={ref} />;
});
