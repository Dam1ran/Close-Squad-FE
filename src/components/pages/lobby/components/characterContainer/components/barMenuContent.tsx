import { useConnection } from '../../../../../../api/signalR/useConnection';
import { useCharacterService } from '../../../../../../support/services/useCharacterService';
import { LoadingButton, RemoveCircleOutlineIcon, Row, Typography } from '../../../../../elements';

export const BarMenuContent: React.FC<{ shortcutIndex: number; onClose: () => void }> = ({ shortcutIndex, onClose }) => {
  const { clearShortcut } = useConnection();
  const activeCharacter = useCharacterService().getActiveCharacter();
  const unassign = (): void => {
    if (activeCharacter && shortcutIndex > -1 && shortcutIndex < 144) {
      clearShortcut({ characterId: activeCharacter.id, shortcutIndex });
    }
    onClose();
  };

  return (
    <>
      <Typography p={1} pt={0} textAlign="center" variant="body2">
        Clear shortcut
      </Typography>
      <Row px={1} justifyContent="center">
        <LoadingButton
          size="small"
          sx={{ minWidth: '30px', padding: 0, margin: 0 }}
          centered
          icon={<RemoveCircleOutlineIcon />}
          onClick={unassign}
        />
      </Row>
    </>
  );
};
