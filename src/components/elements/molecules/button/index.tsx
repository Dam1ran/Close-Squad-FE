import { ButtonProps } from '@mui/material/Button';
import { Button as MuiButton } from '@mui/material';

export const Button: React.FC<ButtonProps> = (props) => {
  return <MuiButton {...props}>{props.children}</MuiButton>;
};
