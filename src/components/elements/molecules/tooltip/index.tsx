import { TooltipProps } from '@mui/material/Tooltip';
import { Tooltip as MuiTooltip } from '@mui/material';

export const Tooltip: React.FC<TooltipProps> = (props) => {
  return <MuiTooltip {...props}>{props.children}</MuiTooltip>;
};
