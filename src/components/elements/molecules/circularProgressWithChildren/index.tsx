import { SxProps } from '@mui/system';
import { CircularProgress } from '../../atoms';
import { Box } from '../../templates';

export interface CircularProgressWithChildrenProps {
  value?: number;
  color?: string;
  size?: number;
  thickness?: number;
  sx?: SxProps;
  children: React.ReactNode;
  variant?: 'determinate' | 'indeterminate';
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export const CircularProgressWithChildren: React.FC<CircularProgressWithChildrenProps> = (props) => {
  return (
    <Box
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      sx={{ position: 'relative', display: 'inline-flex', ...props.sx }}
    >
      <CircularProgress
        variant={props.variant}
        value={props.value}
        size={props.size}
        thickness={props.thickness}
        sx={{ color: props.color }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};
