import { TypographyProps } from '@mui/material/Typography';
import { Typography as MuiTypography } from '@mui/material';

export const Typography: React.FC<TypographyProps> = (props) => {
  return <MuiTypography {...props}>{props.children}</MuiTypography>;
};
