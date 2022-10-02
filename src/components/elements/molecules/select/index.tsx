import { SelectProps } from '@mui/material/Select';
import { Select as MuiSelect } from '@mui/material';

export const Select: React.FC<SelectProps> = (props) => {
  return <MuiSelect {...props}>{props.children}</MuiSelect>;
};
