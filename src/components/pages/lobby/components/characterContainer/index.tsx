import { useConnection } from '../../../../../api/signalR/useConnection';
import { BarShortcutType } from '../../../../../models/enums';
import { BarShortcut } from '../../../../../models/signalR';
import { useCharacterShortcuts } from '../../../../../support/hooks';
import { useCharacterService } from '../../../../../support/services/useCharacterService';
import { Box, Column, Row } from '../../../../elements';
import { WorldMapButton } from '../controlBar/components/buttons/worldMapButton';

export const CharacterContainer: React.FC = () => {
  const { getActiveCharacterBarShortcuts } = useCharacterShortcuts();
  const { getActiveCharacter } = useCharacterService();
  const activeCharacter = getActiveCharacter();
  const { actionCall } = useConnection();

  const onShortcutClick = (barShortcut: BarShortcut): void => {
    if (!activeCharacter) {
      return;
    }
    switch (barShortcut.type) {
      case BarShortcutType.Action: {
        actionCall({ characterId: activeCharacter.id, action: barShortcut.usingId });
        break;
      }
      case BarShortcutType.Skill: {
        break;
      }
      case BarShortcutType.Item: {
        break;
      }
    }
  };

  return (
    <Column
      sx={{
        border: '1px solid black',
        height: '500px',
        minWidth: '500px',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        marginRight: 'auto',
      }}
    >
      {/* quick actions */}
      {getActiveCharacterBarShortcuts().map((bs) => (
        <Box
          key={bs.id}
          sx={{ width: '20px', height: '20px', backgroundColor: 'aqua' }}
          onClick={(): void => onShortcutClick(bs)}
        >
          {bs.orderNumber}
        </Box>
      ))}
      {/* <Row
        sx={{
          marginTop: 'auto',
          border: '1px solid black',
          width: '100%',
          padding: 0.25,
          gap: 0.25,
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        <WorldMapButton />
        <WorldMapButton />
        <WorldMapButton />
        <WorldMapButton />

        <WorldMapButton />
        <WorldMapButton />
        <WorldMapButton />
        <WorldMapButton />

        <WorldMapButton />
        <WorldMapButton />
        <WorldMapButton />
        <WorldMapButton />
      </Row> */}
    </Column>
  );
};
