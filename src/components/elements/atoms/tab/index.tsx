import { TabProps } from '@mui/material/Tab';
import { Tab as MuiTab } from '@mui/material';
import React from 'react';

export const Tab: React.FC<TabProps> = React.forwardRef((props, ref) => {
  return (
    <MuiTab ref={ref} {...props}>
      {props.children}
    </MuiTab>
  );
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const a11yProps = (index: number) => ({
  id: `player-group-tab-${index}`,
  'aria-controls': `player-group-tabpanel-${index}`,
});
