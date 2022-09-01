import { overlay } from '../../../../features/overlay/overlay';
import { DialogType } from '../../../../features/overlay/store/overlayStore';
import { SendChangePasswordEmail } from './component';

export const sendChangePasswordEmailDialogOverlay = (onSuccess?: () => void): void => {
  const id = 'send-change-password-email';

  overlay.setComponent(
    <SendChangePasswordEmail
      onSuccess={(): void => {
        setTimeout(() => {
          overlay.removeComponent(id);
        }, 2000);
        onSuccess?.();
      }}
    />,
    {
      id,
      canBeClosed: true,
      dialogType: DialogType.Other,
      title: 'Change password email',
    },
  );
};
