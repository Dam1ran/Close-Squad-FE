import { BoxProps } from '@mui/material/Box';
import { Box as MuiBox } from '@mui/material';
import React from 'react';

export const Box: React.FC<BoxProps> = React.forwardRef((props, ref) => {
  return (
    <MuiBox {...props} ref={ref}>
      {props.children}
    </MuiBox>
  );
});
