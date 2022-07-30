import { Outlet } from 'react-router-dom';
import { Box } from '../box';

export const Layout = (): JSX.Element => {
  return (
    <Box sx={{ height: '100vh' }}>
      <Outlet />
    </Box>
  );
};
