import { MenuItemProps } from '@mui/material/MenuItem';
import { MenuItem as MuiMenuItem } from '@mui/material';
import React from 'react';

export const MenuItem: React.FC<MenuItemProps> = React.forwardRef((props, ref) => {
  return <MuiMenuItem {...props} ref={ref} />;
});
