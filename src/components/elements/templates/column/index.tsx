import Box, { BoxProps } from '@mui/material/Box';

export const Column: React.FC<Omit<BoxProps, 'direction' | 'display'>> = ({ ...props }) => {
  return (
    <Box display="flex" flexDirection="column" {...props}>
      {props.children}
    </Box>
  );
};
