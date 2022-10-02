import { MenuItemProps } from '@mui/material/MenuItem';
import { MenuItem as MuiMenuItem } from '@mui/material';

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  return <MuiMenuItem {...props}>{props.children}</MuiMenuItem>;
};
