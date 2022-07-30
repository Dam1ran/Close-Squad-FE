import { BoxProps } from '@mui/material/Box';
import { Box as MuiBox } from '@mui/material';

export const Box: React.FC<BoxProps> = ({ ...props }) => {
  return <MuiBox {...props}>{props.children}</MuiBox>;
};
