import { PaperProps } from '@mui/material';
import React from 'react';
import { Paper } from '../../../../../elements';

export const SocialContainer: React.FC<PaperProps> = (props) => {
  return (
    <Paper sx={{ minWidth: '320px', border: (theme) => `1px solid ${theme.palette.grey[200]}`, padding: 1, ...props.sx }}>
      {props.children}
    </Paper>
  );
};
