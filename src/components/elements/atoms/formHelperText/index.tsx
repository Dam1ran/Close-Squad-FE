import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormHelperText as MuiFormHelperText } from '@mui/material';

export const FormHelperText: React.FC<FormHelperTextProps> = ({ ...props }) => {
  return <MuiFormHelperText {...props} />;
};
