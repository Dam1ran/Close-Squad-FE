import { InputLabelProps } from '@mui/material/InputLabel';
import { InputLabel as MuiInputLabel } from '@mui/material';

export const InputLabel: React.FC<InputLabelProps> = (props) => {
  return <MuiInputLabel {...props}>{props.children}</MuiInputLabel>;
};
