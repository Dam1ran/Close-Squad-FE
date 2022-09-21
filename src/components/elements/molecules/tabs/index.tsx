import { TabsProps } from '@mui/material/Tabs';
import { Tabs as MuiTabs } from '@mui/material';
import React from 'react';

export const Tabs: React.FC<TabsProps> = React.forwardRef((props, ref) => {
  return (
    <MuiTabs ref={ref} {...props}>
      {props.children}
    </MuiTabs>
  );
});
