import { ScoutQuadrantReport } from '../../../../../models/signalR';
import { overlay } from '../../../../features/overlay/overlay';
import { DialogType } from '../../../../features/overlay/store/overlayStore';
import { ScoutReport } from './component';

export const scoutQuadrantReportDialogOverlay = (scoutQuadrantReport: ScoutQuadrantReport): void => {
  const id = overlay.setComponent(
    <ScoutReport report={scoutQuadrantReport} onClose={(): void => overlay.removeComponent(id)} />,
    {
      canBeClosed: true,
      dialogType: DialogType.Info,
      title: 'Scout report',
      intermittent: true,
    },
  );
};
