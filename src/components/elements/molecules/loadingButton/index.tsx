import { ButtonProps } from '@mui/material/Button';
import { CircularProgress } from '../../atoms';
import { Button } from '../button';
import _ from 'lodash';
import React from 'react';

export interface LoadingButtonPropsAddons {
  loading?: boolean;
  position: 'start' | 'end';
  icon?: React.ReactNode;
}

export const LoadingButton: React.FC<ButtonProps & LoadingButtonPropsAddons> = React.forwardRef((props, ref) => {
  const sizeValue = props.size === 'large' ? 22 : props.size === 'small' ? 18 : 20;
  return (
    <Button
      ref={ref}
      {..._.omit(props, 'loading', 'icon')}
      disabled={props.disabled}
      startIcon={
        props.position === 'start' ? (
          props.loading ? (
            <CircularProgress size={sizeValue} sx={{ color: (theme) => theme.palette.text.secondary }} />
          ) : (
            props.icon
          )
        ) : undefined
      }
      endIcon={
        props.position === 'end' ? (
          props.loading ? (
            <CircularProgress size={sizeValue} sx={{ color: (theme) => theme.palette.text.secondary }} />
          ) : (
            props.icon
          )
        ) : undefined
      }
    >
      {props.children}
    </Button>
  );
});
