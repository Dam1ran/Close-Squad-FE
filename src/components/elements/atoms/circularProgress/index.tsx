import { CircularProgressProps } from '@mui/material/CircularProgress';
import { CircularProgress as MuiCircularProgress } from '@mui/material';

export const CircularProgress: React.FC<CircularProgressProps> = ({ ...props }) => {
  return <MuiCircularProgress {...props} />;
};
