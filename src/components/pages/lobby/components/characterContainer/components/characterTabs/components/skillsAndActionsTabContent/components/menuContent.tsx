import { useState } from 'react';
import { useConnection } from '../../../../../../../../../../api/signalR/useConnection';
import { BarShortcutType } from '../../../../../../../../../../models/enums';
import { useCharacterService } from '../../../../../../../../../../support/services/useCharacterService';
import { AddCircleOutlineIcon, LoadingButton, Row, TextField, Typography } from '../../../../../../../../../elements';

export const MenuContent: React.FC<{ type: BarShortcutType; usingId: number; onClose: () => void }> = ({
  type,
  usingId,
  onClose,
}) => {
  const [shortcutIndex, setShortcutIndex] = useState(1);
  const { assignShortcut } = useConnection();
  const activeCharacter = useCharacterService().getActiveCharacter();
  const assign = (): void => {
    if (activeCharacter && type > 0 && usingId > 0) {
      assignShortcut({ characterId: activeCharacter.id, barShortcutType: type, usingId, shortcutIndex: shortcutIndex - 1 });
    }
    onClose();
  };

  return (
    <>
      <Typography p={1} pt={0} textAlign="center" variant="body2">
        Assign to a shortcut
      </Typography>
      <Row px={1} justifyContent="center">
        <TextField
          size="small"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 144 } }}
          value={shortcutIndex}
          onChange={(e): void => {
            const value = +e.currentTarget.value;
            if (!isNaN(value) && value > 0 && value <= 144) {
              setShortcutIndex(value);
            }
          }}
          sx={{ width: '80px' }}
        />
        <LoadingButton
          size="small"
          sx={{ minWidth: '30px', padding: 0, margin: 0 }}
          centered
          icon={<AddCircleOutlineIcon />}
          onClick={assign}
        />
      </Row>
    </>
  );
};
