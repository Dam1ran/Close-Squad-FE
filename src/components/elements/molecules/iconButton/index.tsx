import { IconButtonProps } from '@mui/material/IconButton';
import { IconButton as MuiIconButton } from '@mui/material';

export const IconButton: React.FC<IconButtonProps> = (props) => {
  return <MuiIconButton {...props}>{props.children}</MuiIconButton>;
};
