import { InputAdornmentProps } from '@mui/material/InputAdornment';
import { InputAdornment as MuiInputAdornment } from '@mui/material';

export const InputAdornment: React.FC<InputAdornmentProps> = (props) => {
  return <MuiInputAdornment {...props}>{props.children}</MuiInputAdornment>;
};
