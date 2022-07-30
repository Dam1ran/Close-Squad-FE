import { TextFieldProps } from '@mui/material/TextField';
import { TextField as MuiTextField } from '@mui/material';
import React from 'react';

export const TextField: React.FC<TextFieldProps> = React.forwardRef((props, ref) => {
  return (
    <MuiTextField ref={ref} {...props}>
      {props.children}
    </MuiTextField>
  );
});
