import { Box, ModalBackground } from '../../../elements';
import { OverlayBar } from './overlayBar';
import { OverlayComponent } from '../store/overlayStore';
import { OverlayWrapper } from './overlayWrapper';
import { alpha } from '@mui/system';
import { fadeIn, fadeOut } from '../../../../styles';
import React from 'react';
import _ from 'lodash';

export interface OverlayContainerProps {
  overlayComponent: OverlayComponent;
  isActive: boolean;
  setActiveDialog: (id: string) => void;
  onClose?: () => void;
}

const container: React.FC<OverlayContainerProps> = (props) => {
  const dialogChild = (
    <OverlayWrapper
      sx={
        props.overlayComponent.close
          ? { ...fadeOut(0.2), zIndex: props.isActive ? 10 : 9 }
          : { ...fadeIn(0.2), zIndex: props.isActive ? 11 : 10 }
      }
      modal={props.overlayComponent.modal}
      posYOrder={props.overlayComponent.posYOrder}
      id={props.overlayComponent.id}
      onClick={(): void => {
        props.setActiveDialog(props.overlayComponent.id);
      }}
    >
      <OverlayBar
        durationMilliseconds={props.overlayComponent.durationMilliseconds}
        icon={props.overlayComponent.icon}
        iconDescription={props.overlayComponent.iconData.description}
        backgroundColor={props.overlayComponent.iconData.backgroundColor}
        title={props.overlayComponent?.title ?? ''}
        id={props.overlayComponent.id}
        draggable={!props.overlayComponent.modal}
        canBeClosed={props.overlayComponent.canBeClosed}
        canBePaused={props.overlayComponent.canBePaused}
        onClick={(): void => {
          props.setActiveDialog(props.overlayComponent.id);
        }}
        onClose={props.onClose}
      />
      <Box
        sx={{
          zIndex: 5,
          boxShadow: `inset 0px 0px 15px ${alpha(props.overlayComponent.iconData.backgroundColor, 0.3)}`,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomLeftRadius: 1,
          borderBottomRightRadius: 1,
        }}
      >
        {props.overlayComponent.element}
      </Box>
    </OverlayWrapper>
  );

  return props.overlayComponent.modal ? (
    <ModalBackground
      sx={
        props.overlayComponent.close
          ? { ...fadeOut(0.2), zIndex: props.isActive ? 10 : 9 }
          : { ...fadeIn(0.2), zIndex: props.isActive ? 11 : 10 }
      }
    >
      {dialogChild}
    </ModalBackground>
  ) : (
    dialogChild
  );
};

export const OverlayContainer = React.memo(container, (prevProps, nextProps) =>
  _.isEqual(_.omit(prevProps, _.functions(prevProps)), _.omit(nextProps, _.functions(nextProps))),
);
