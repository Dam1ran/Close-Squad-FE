import toast from 'react-hot-toast';
import { CaptchaCheck, SecurityIcon, VisibilityIcon } from '../components/elements';
import { overlay } from '../components/features/overlay/overlay';
import { DialogType } from '../components/features/overlay/store/overlayStore';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const serverClientUtils = () => {
  const tooManyRequestToast = (): void => {
    toast.error('Too Many Requests. Try again later.', {
      icon: <SecurityIcon color="secondary" />,
      duration: 10000,
    });
  };

  const initiateAutoCaptcha = (): void => {
    const id = overlay.setComponent(
      <CaptchaCheck
        onSuccess={(): void => {
          overlay.removeComponent(id);
        }}
      />,
      {
        title: 'Eyesight check',
        modal: true,
        icon: <VisibilityIcon />,
        dialogType: DialogType.Other,
      },
    );
  };

  return {
    tooManyRequestToast,
    initiateAutoCaptcha,
  };
};
