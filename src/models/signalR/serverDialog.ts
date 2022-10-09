import { DialogType } from '../../components/features/overlay/store/overlayStore';

export interface ServerDialog {
  dialogType?: DialogType;
  title?: string;
  message: string;
  modal?: boolean;
  canBeClosed?: boolean;
  canBePaused?: boolean;
  icon?: string;
  iconDescription?: string;
  durationMilliseconds?: string;
}
