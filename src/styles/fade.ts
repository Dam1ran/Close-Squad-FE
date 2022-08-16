import { SxProps } from '@mui/system';

export const fadeIn = (duration = 0.6): SxProps => {
  return {
    opacity: 0,
    animation: `fadeIn ${duration}s forwards ease-in-out`,
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      },
    },
  };
};

export const fadeOut = (duration = 0.6): SxProps => {
  return {
    opacity: 1,
    animation: `fadeOut ${duration}s forwards ease-in-out`,
    '@keyframes fadeOut': {
      '0%': {
        opacity: 1,
      },
      '100%': {
        opacity: 0,
      },
    },
  };
};
