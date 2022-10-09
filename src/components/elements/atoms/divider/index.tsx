import { DividerProps } from '@mui/material/Divider';
import { Divider as MuiDivider } from '@mui/material';

export const Divider: React.FC<DividerProps> = (props) => {
  return <MuiDivider {...props} />;
};
