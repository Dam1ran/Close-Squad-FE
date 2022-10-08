import { BoxProps } from '@mui/system';
import React from 'react';
import { Box } from '../../templates';

export interface ImgProps {
  alt: string;
  src: string;
}

export const Img: React.FC<BoxProps & ImgProps> = React.forwardRef((props, ref) => {
  return (
    <Box component="img" {...props} ref={ref}>
      {props.children}
    </Box>
  );
});
