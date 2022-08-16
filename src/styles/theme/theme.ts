import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: grey[200],
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;