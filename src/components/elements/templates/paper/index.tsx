import { PaperProps } from '@mui/material/Paper';
import { Paper as MuiPaper } from '@mui/material';

export const Paper: React.FC<PaperProps> = ({ ...props }) => {
  return <MuiPaper {...props}>{props.children}</MuiPaper>;
};
