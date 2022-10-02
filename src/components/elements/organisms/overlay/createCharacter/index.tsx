import { overlay } from '../../../../features/overlay/overlay';
import { DialogType } from '../../../../features/overlay/store/overlayStore';
import { CharacterCreation } from './component';

export const createCharacterDialogOverlay = (): void => {
  const id = 'create-character-dialog';
  const onClose = (): void => {
    overlay.removeComponent(id);
  };
  overlay.setComponent(<CharacterCreation onCreated={onClose} />, {
    id,
    canBeClosed: true,
    dialogType: DialogType.Question,
    title: 'Character creation',
    iconDescription: 'Phenotype will give slight differences in stats.',
  });
};
