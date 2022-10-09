import Box, { BoxProps } from "@mui/material/Box";
import React from 'react';

export const Row: React.FC<Omit<BoxProps, 'direction' | 'display'>> = React.forwardRef((props, ref) => {
  return (
    <Box display="flex" flexDirection="row" {...props} ref={ref}>
      {props.children}
    </Box>
  );
});