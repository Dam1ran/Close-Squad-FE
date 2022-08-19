import { isNullOrEmpty } from '../../../../../support/utils';
import { overlay } from '../../../../features/overlay/overlay';
import { DialogType } from '../../../../features/overlay/store/overlayStore';
import { VisibilityIcon } from '../../../atoms';
import { CaptchaCheck } from './component';
import { v4 } from 'uuid';

export const captchaCheckModalOverlay = (onSuccess?: () => void, id?: string): void => {
  if (isNullOrEmpty(id)) {
    id = v4();
  }

  overlay.setComponent(
    <CaptchaCheck
      onSuccess={(): void => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        overlay.removeComponent(id!);
        onSuccess?.();
      }}
    />,
    {
      id,
      title: 'Eyesight check',
      modal: true,
      icon: <VisibilityIcon />,
      dialogType: DialogType.Other,
    },
  );
};
