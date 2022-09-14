import { ButtonProps } from '@mui/material/Button';
import { CircularProgress } from '../../atoms';
import { Button } from '../button';
import _ from 'lodash';
import React from 'react';
import { Typography } from '../typography';
import { Box } from '../../templates';

export interface LoadingButtonPropsAddons {
  loading?: boolean;
  position?: 'start' | 'end';
  centered?: boolean;
  icon?: React.ReactNode;
  caption?: JSX.Element | string;
}

export const LoadingButton: React.FC<ButtonProps & LoadingButtonPropsAddons> = React.forwardRef(
  ({ position = 'start', ...props }, ref) => {
    const sizeValue = props.size === 'large' ? 22 : props.size === 'small' ? 18 : 20;
    return (
      <Button
        ref={ref}
        {..._.omit(props, 'loading', 'icon', 'caption', 'centered')}
        sx={{
          width: 'fit-content',
          overflow: 'hidden',
          border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          ...props.sx,
        }}
        disabled={props.disabled || props.loading}
        startIcon={
          position === 'start' ? (
            <Box component="span" sx={{ marginLeft: 1, width: '24px', height: '24px' }}>
              {props.loading ? (
                <CircularProgress color={props.color} size={sizeValue} sx={{ marginBottom: '2px', marginLeft: '4px' }} />
              ) : (
                props.icon
              )}
            </Box>
          ) : undefined
        }
        endIcon={
          position === 'end' ? (
            <Box component="span" sx={{ marginRight: 1, width: '24px', height: '24px' }}>
              {props.loading ? (
                <CircularProgress color={props.color} size={sizeValue} sx={{ marginBottom: '2px', marginLeft: '4px' }} />
              ) : (
                props.icon
              )}
            </Box>
          ) : undefined
        }
      >
        {!!props.caption && (
          <Typography
            sx={{
              position: 'relative',
              left: position === 'end' ? (props.centered ? '18px' : '8px') : 'unset',
              right: position === 'start' ? (props.centered ? '18px' : '8px') : 'unset',
              marginRight: props.centered || position === 'end' ? 'auto' : 'unset',
              marginLeft: props.centered || position === 'start' ? 'auto' : 'unset',
            }}
          >
            {props?.caption}
          </Typography>
        )}
        {props?.children}
      </Button>
    );
  },
);
