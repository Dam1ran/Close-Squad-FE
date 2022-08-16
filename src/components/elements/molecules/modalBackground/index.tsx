import { alpha, SxProps } from '@mui/system';
import { Box } from '../../templates';

export const ModalBackground: React.FC<{ sx?: SxProps; children?: React.ReactNode }> = (props) => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: CSS.supports('backdrop-filter: blur(5px)')
          ? (theme): string => alpha(theme.palette.secondary.dark, 0.05)
          : (theme): string => alpha(theme.palette.grey[800], 0.8),
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px)',
        zIndex: 100,
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
};
