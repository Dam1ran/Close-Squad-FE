import Box, { BoxProps } from "@mui/material/Box";

export const Row: React.FC<Omit<BoxProps, 'direction' | 'display'>> = ({ ...props }) => {
  return (
    <Box display="flex" flexDirection="row" {...props}>
      {props.children}
    </Box>
  );
};