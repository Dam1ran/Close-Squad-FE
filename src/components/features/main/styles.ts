import { SxProps } from "@mui/material";

export const mainStyles = (args: any) => {
  return {
    Wrapper: {
      maxHeight: '750px',
      maxWidth: '750px',
      display: 'flex',
      flexWrap: 'wrap'
    } as SxProps,
    Box: {
      // mb: (theme: Theme) => theme.spacing(args),
      width: '250px',
      height: '250px',
      bgcolor: 'primary.main',
      border: '1px solid rgba(0, 0, 0, 0.2)',
      transition: 'background-color 0.3s',
      '&:hover' : {
        bgcolor: 'primary.dark',
      }
    } as SxProps
  }
};