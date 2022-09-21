import Box, { BoxProps } from '@mui/material/Box';
import React from 'react';

export const Column: React.FC<Omit<BoxProps, 'direction' | 'display'>> = React.forwardRef((props, ref) => {
  return (
    <Box display="flex" flexDirection="column" {...props} ref={ref}>
      {props.children}
    </Box>
  );
});
