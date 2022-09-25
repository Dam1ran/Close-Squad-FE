import { overlay } from '../../../../features/overlay/overlay';
import { DialogType } from '../../../../features/overlay/store/overlayStore';
import { MapComponent } from './component';

export const worldMapDialogOverlay = (): void => {
  const id = 'world-map-dialog';

  overlay.setComponent(<MapComponent />, {
    id,
    canBeClosed: true,
    dialogType: DialogType.Info,
    title: 'Game world map',
  });
};
