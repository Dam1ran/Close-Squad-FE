import { MenuProps } from '@mui/material/Menu';
import { Menu as MuiMenu } from '@mui/material';
import React from 'react';

export const Menu: React.FC<MenuProps> = React.forwardRef((props, ref) => {
  return <MuiMenu {...props} ref={ref} />;
});
