import { Grid2Props } from '@mui/material/Unstable_Grid2';
import Grid2 from '@mui/material/Unstable_Grid2';

export const Grid: React.FC<Grid2Props> = (props) => {
  return <Grid2 {...props}>{props?.children}</Grid2>;
};
