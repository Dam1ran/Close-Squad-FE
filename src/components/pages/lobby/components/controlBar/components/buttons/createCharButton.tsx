import { AddCircleOutlineIcon } from '../../../../../../elements';
import { createCharacterDialogOverlay } from '../../../../../../elements/organisms/overlay/createCharacter';
import { MenuBarButton } from './menuBarButton';

export const CreateCharButton: React.FC = () => {
  return (
    <MenuBarButton
      icon={
        <AddCircleOutlineIcon
          sx={{
            fontSize: '40px',
            color: (theme) => theme.palette.grey[600],
            marginLeft: '-6px',
            marginTop: '-8px',
          }}
        />
      }
      onClick={(): void => createCharacterDialogOverlay()}
      title="Create a character"
    />
  );
};
