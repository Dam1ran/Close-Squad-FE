import { alpha } from '@mui/system';
import { useContext } from 'react';
import { useConnection } from '../../../../../../../../../api/signalR/useConnection';
import { AiAction, CharacterAction, CsEntityStatus } from '../../../../../../../../../models/enums';
import { CharacterContext } from '../../../../../../../../../support/contexts/characterContext/characterContextProvider';
import { useCharacterService } from '../../../../../../../../../support/services/useCharacterService';
import { Box, Row } from '../../../../../../../../elements';
import { CharacterActionIconMap } from '../../../buttonMaps/actionButtonMap';

export const SkillsAndActionsTabContent: React.FC = () => {
  const { actionCall } = useConnection();
  const activeCharacter = useCharacterService().getActiveCharacter();
  const { updateCharacter } = useContext(CharacterContext);

  const onActionClick = (characterAction: CharacterAction): void => {
    if (!activeCharacter) {
      return;
    }
    if (characterAction === CharacterAction.Sit || characterAction === CharacterAction.Attack) {
      updateCharacter({ id: activeCharacter.id, xDestination: undefined, yDestination: undefined });
    }
    actionCall({ characterId: activeCharacter.id, action: characterAction });
  };

  return (
    <Box
      sx={{
        height: '465px',
        border: (theme) => `1px solid ${theme.palette.grey[600]}`,

        userSelect: 'none',
      }}
    >
      {/* <Row
        sx={{
          flexWrap: 'wrap',
          padding: 1,
          gap: 1,
          justifyContent: 'space-evenly',
          boxShadow: (theme) => `inset 0 0 100px 50px ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        {Object.values(CharacterAction)
          .filter((v) => !isNaN(Number(v)))
          .map((ca) => (
            <Box
              sx={{
                height: '38px',
                width: '38px',
                border: (theme) => `2px solid ${alpha(theme.palette.secondary.dark, 0.8)}`,
                borderRadius: 1,
                transition: 'box-shadow 0.3s',
                boxShadow: (theme) =>
                  ca === CharacterAction.Sit && activeCharacter?.characterStatus === CharacterStatus.Sitting
                    ? `inset 0 0 5px 2px ${theme.palette.secondary.dark}, 0 0 8px ${theme.palette.grey[500]}`
                    : `inset 0 0 5px transparent, 0 0 8px ${theme.palette.grey[500]}`,
                '&:active': {
                  boxShadow: (theme) => `inset 0 0 5px 2px ${theme.palette.primary.dark}, 0 0 8px transparent`,
                },
                cursor: 'pointer',
              }}
              key={ca}
              onClick={(): void => onActionClick(ca as CharacterAction)}
            >
              {CharacterActionIconMap[ca as CharacterAction]}
            </Box>
          ))}
      </Row> */}
      <Row
        sx={{
          flexWrap: 'wrap',
          padding: 1,
          gap: 1,
          justifyContent: 'space-evenly',
          boxShadow: (theme) => `inset 0 0 100px 50px ${alpha(theme.palette.secondary.main, 0.1)}`,
        }}
      >
        {Object.values(CharacterAction)
          .filter((v) => !isNaN(Number(v)))
          .map((ca) => (
            <Box
              sx={{
                height: '38px',
                width: '38px',
                border: (theme) => `2px solid ${alpha(theme.palette.primary.dark, 0.8)}`,
                borderRadius: 1,
                transition: 'box-shadow 0.15s',
                boxShadow: (theme) =>
                  (ca === CharacterAction.Sit && activeCharacter?.characterStatus === CsEntityStatus.Sitting) ||
                  (ca === CharacterAction.Follow && activeCharacter?.aiAction === AiAction.Following)
                    ? `inset 0 0 5px 2px ${theme.palette.secondary.dark}, 0 0 8px ${theme.palette.grey[500]}`
                    : `inset 0 0 5px transparent, 0 0 8px ${theme.palette.grey[500]}`,
                '&:active': {
                  boxShadow: (theme) => `inset 0 0 5px 2px ${theme.palette.secondary.dark}, 0 0 8px transparent`,
                },
                cursor: 'pointer',
              }}
              key={ca}
              onClick={(): void => onActionClick(ca as CharacterAction)}
            >
              {CharacterActionIconMap[ca as CharacterAction]}
            </Box>
          ))}
      </Row>
    </Box>
  );
};
