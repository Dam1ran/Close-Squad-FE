import { ServerDialog } from '../../../../../models/signalR/serverDialog';
import { overlay } from '../../../../features/overlay/overlay';
import { ServerDialogComponent } from './component';

export const serverDialogOverlay = (serverDialog: ServerDialog): void => {
  const id = overlay.setComponent(
    <ServerDialogComponent data={serverDialog} onClose={(): void => overlay.removeComponent(id)} />,
    {
      canBeClosed: serverDialog.canBeClosed,
      canBePaused: serverDialog.canBePaused,
      dialogType: serverDialog.dialogType,
      icon: serverDialog.icon,
      iconDescription: serverDialog.iconDescription,
      title: serverDialog.title,
      intermittent: true,
    },
  );
};
