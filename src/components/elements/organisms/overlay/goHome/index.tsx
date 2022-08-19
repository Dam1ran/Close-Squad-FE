import { NavigateFunction } from 'react-router-dom';
import { overlay } from '../../../../features/overlay/overlay';
import { DialogType } from '../../../../features/overlay/store/overlayStore';
import { GoHome } from './component';

export const goHomeDialogOverlay = (navigate: NavigateFunction): void => {
  const id = 'go-home-dialog';

  const close = (): void => {
    overlay.removeComponent(id);
    navigate('/home');
  };

  overlay.setComponent(<GoHome onClick={close} />, {
    id,
    canBeClosed: true,
    dialogType: DialogType.Other,
    title: 'Navigating to home',
    durationMilliseconds: 4000,
    canBePaused: false,
    onClose: close,
  });
};
