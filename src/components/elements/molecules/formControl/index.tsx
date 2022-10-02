import { FormControlProps } from '@mui/material/FormControl';
import { FormControl as MuiFormControl } from '@mui/material';

export const FormControl: React.FC<FormControlProps> = (props) => {
  return <MuiFormControl {...props}>{props.children}</MuiFormControl>;
};
