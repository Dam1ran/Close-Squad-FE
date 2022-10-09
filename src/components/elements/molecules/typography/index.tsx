import { TypographyProps } from '@mui/material/Typography';
import { Typography as MuiTypography } from '@mui/material';
import React from 'react';

export const Typography: React.FC<TypographyProps> = React.forwardRef((props, ref) => {
  return (
    <MuiTypography {...props} ref={ref}>
      {props.children}
    </MuiTypography>
  );
});
