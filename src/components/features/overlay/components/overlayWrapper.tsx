import { Column } from '../../../elements';
import { alpha, SxProps } from '@mui/system';
import React from 'react';

export interface OverlayWrapperProps {
  sx?: SxProps;
  modal?: boolean;
  children: React.ReactNode;
  posYOrder: number;
  id: string;
  onClick: () => void;
}

export const OverlayWrapper: React.FC<OverlayWrapperProps> = (props) => {
  let noModalBackgroundStyles = { marginTop: `${props.posYOrder * 72}px` } as SxProps;

  if (!props.modal) {
    noModalBackgroundStyles = {
      position: 'fixed',
      top: `calc(20% + ${props.posYOrder * 36}px)`,
      transform: 'translate(-50%)',
      left: '50%',
      ...props.sx,
    } as SxProps;
  }

  return (
    <Column
      id={props.id}
      alignItems="center"
      onClick={props.onClick}
      sx={{
        maxWidth: 'min(640px, max(100vw, 320px))',
        backgroundColor: (theme) => theme.palette.background.default,
        borderRadius: 1,
        outline: (theme) => `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
        boxShadow: (theme) => theme.shadows[4],
        zIndex: 10,
        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
        transition: 'border 0.1s',
        ...noModalBackgroundStyles,
      }}
    >
      {props.children}
    </Column>
  );
};
