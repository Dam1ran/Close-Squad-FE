import { ContainerProps } from '@mui/material/Container';
import { Container as MuiContainer } from '@mui/material';

export const Container: React.FC<ContainerProps> = (props) => {
  return <MuiContainer {...props}>{props?.children}</MuiContainer>;
};
