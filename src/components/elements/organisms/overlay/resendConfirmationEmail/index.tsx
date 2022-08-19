import { overlay } from '../../../../features/overlay/overlay';
import { DialogType } from '../../../../features/overlay/store/overlayStore';
import { ResendConfirmationEmail } from './component';

export const resendConfirmationEmailDialogOverlay = (onSuccess?: () => void): void => {
  const id = 'resend-confirmation-email';

  overlay.setComponent(
    <ResendConfirmationEmail
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
      title: 'Resend confirmation email',
    },
  );
};
