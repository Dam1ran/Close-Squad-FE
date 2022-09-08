import { ButtonProps } from '@mui/material/Button';
import { Button as MuiButton } from '@mui/material';
import React from 'react';

export const Button: React.FC<ButtonProps> = React.forwardRef((props, ref) => {
  return (
    <MuiButton {...props} ref={ref}>
      {props.children}
    </MuiButton>
  );
});
