import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};
