import { PopoverProps } from '@mui/material/Popover';
import { Popover as MuiPopover } from '@mui/material';
import React from 'react';

export const Popover: React.FC<PopoverProps> = React.forwardRef((props, ref) => {
  return <MuiPopover {...props} ref={ref} />;
});
