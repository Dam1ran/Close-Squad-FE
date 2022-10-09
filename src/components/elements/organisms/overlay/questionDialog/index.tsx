import { v4 } from 'uuid';
import { overlay } from '../../../../features/overlay/overlay';
import { DialogType } from '../../../../features/overlay/store/overlayStore';
import { QuestionDialogComponent } from './component';

export const questionDialogOverlay = (onAccept: () => void, title: string, question: string): void => {
  const id = v4();
  const onApprove = (): void => {
    overlay.removeComponent(id);
    onAccept();
  };
  overlay.setComponent(
    <QuestionDialogComponent question={question} onClose={(): void => overlay.removeComponent(id)} onAccept={onApprove} />,
    {
      id,
      canBeClosed: true,
      dialogType: DialogType.Question,
      title,
      durationMilliseconds: 5000,
      canBePaused: false,
    },
  );
};
