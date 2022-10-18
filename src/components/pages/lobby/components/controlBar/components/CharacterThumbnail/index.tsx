/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { CharacterContext } from '../../../../../../../support/contexts/characterContext/characterContextProvider';
import { Box, CircularProgress, CircularProgressWithChildren, Column, Row, Tooltip } from '../../../../../../elements';
import { alpha } from '@mui/system';
import { CharacterClass } from '../../../../../../../models/api.models';
import { CharacterStatus } from '../../../../../../../models/enums';
import { CharacterClassIconMap, CharacterStatusIconMap } from '../../../../../../../models/character';
import { CharacterDto } from '../../../../../../../models/signalR';

export const CharacterThumbnail: React.FC<{
  character: CharacterDto;
  setActiveCharacter: (character: CharacterDto) => void;
  onAwakeClick: (character: CharacterDto) => void;
  isToggleLoading: boolean;
}> = ({ character, setActiveCharacter, onAwakeClick, isToggleLoading }) => {
  const { activeCharacterId } = useContext(CharacterContext);

  const hpPercent = character.hp !== 0 && character.maxHp !== 0 ? (character.hp / character.maxHp) * 100.0 : 0;
  const mpPercent = character.mp !== 0 && character.maxMp !== 0 ? (character.mp / character.maxMp) * 100.0 : 0;

  const isActive = activeCharacterId === character.id && activeCharacterId !== undefined;

  const isDead = character.characterStatus === CharacterStatus.Dead;
  const isOnline = character.characterStatus !== CharacterStatus.Astray;
  const canToggle =
    character.characterStatus === CharacterStatus.Astray ||
    character.characterStatus === CharacterStatus.Awake ||
    character.characterStatus === CharacterStatus.Dead;

  const onAwakeButtonClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>): Promise<void> => {
    if (!canToggle || isToggleLoading) {
      return;
    }
    e.stopPropagation();
    onAwakeClick(character);
  };

  return (
    <Tooltip
      arrow
      enterDelay={600}
      title={
        isOnline ? (
          <Box>
            <Box sx={{ fontStyle: 'italic', color: (theme) => theme.palette.grey[800] }}>{character.nickname}</Box>
            <Box sx={{ fontStyle: 'italic', color: (theme) => theme.palette.grey[800] }}>
              {CharacterClass[character.characterClass]}
            </Box>
            <Box sx={{ color: '#CC5050DD' }}>
              HP: {character.hp.toFixed(0)}/{character.maxHp.toFixed(0)}
            </Box>
            <Box sx={{ color: '#5050CC' }}>
              MP: {character.mp.toFixed(0)}/{character.maxMp.toFixed(0)}
            </Box>
          </Box>
        ) : (
          ''
        )
      }
      PopperProps={{
        sx: {
          '& .MuiTooltip-tooltip': { backgroundColor: (theme) => theme.palette.grey[100] },
          '& .MuiTooltip-arrow::before': { backgroundColor: (theme) => theme.palette.grey[100] },
        },
      }}
    >
      <Column
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        sx={{
          overflow: 'none',
          minHeight: '80px',
          minWidth: '80px',
          border: (theme) =>
            isActive ? `2px solid ${alpha(theme.palette.secondary.main, 0.75)}` : `2px solid ${theme.palette.grey[300]}`,

          borderRadius: 1,
          position: 'relative',
          cursor: isActive || !isOnline ? 'unset' : 'pointer',
          transition: 'box-shadow 0.4s, border 0.4s',
          boxShadow: (theme) =>
            isActive && isDead
              ? `inset 0 0 8px ${theme.palette.error.main}, 0 0 5px ${theme.palette.grey[900]}`
              : isActive
              ? `0 0 5px ${theme.palette.grey[900]}`
              : isDead
              ? `inset 0 0 8px ${theme.palette.error.main}`
              : 'unset',
          filter: isOnline ? 'none' : 'unset',
          WebkitFilter: isOnline ? 'unset' : 'grayscale(85%)',
          zIndex: 1,
          opacity: isOnline ? 1 : 0.6,
          userSelect: 'none',
        }}
        onClick={(): void => setActiveCharacter(character)}
      >
        <Row
          alignItems="center"
          alignContent="center"
          justifyContent="space-between"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              height: '20px',
              width: '20px',
              lineHeight: '20px',
              textAlign: 'center',
              borderBottomRightRadius: '8px',
              borderTopLeftRadius: '3px',
              fontSize: '14px',
            }}
          >
            {CharacterStatusIconMap[character.characterStatus as CharacterStatus]}
          </Box>
          {canToggle && (
            <Box
              sx={{
                height: '20px',
                width: '20px',
                lineHeight: '20px',
                textAlign: 'center',
                borderBottomLeftRadius: '8px',
                borderTopRightRadius: '3px',
                fontSize: '14px',
                cursor: isToggleLoading ? 'unset' : 'pointer',
                transition: 'background-color 0.3s',
                zIndex: 10,
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.5),
                },
              }}
              onClick={onAwakeButtonClick}
            >
              {isToggleLoading ? <CircularProgress variant="indeterminate" size={12} /> : isOnline ? '🔹' : '🔆'}
            </Box>
          )}
        </Row>
        <Row
          alignItems="center"
          alignContent="center"
          justifyContent="space-between"
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              height: '20px',
              width: '20px',
              lineHeight: '20px',
              backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.5),
              textAlign: 'center',
              borderTopRightRadius: '8px',
              borderBottomLeftRadius: '3px',
              fontSize: '14px',
            }}
          >
            BL
          </Box>
          <Box
            sx={{
              height: '20px',
              width: '20px',
              lineHeight: '20px',
              backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.5),
              textAlign: 'center',
              borderTopLeftRadius: '8px',
              borderBottomRightRadius: '3px',
              fontSize: '14px',
            }}
          >
            BR
          </Box>
        </Row>
        <CircularProgressWithChildren
          variant="determinate"
          value={hpPercent}
          size={58}
          color="#CC5050DD"
          thickness={22}
          sx={{
            boxShadow: 'inset 0 0 5px grey',
            borderRadius: '50%',
            border: '1px solid grey',
          }}
        >
          <Box
            sx={{
              borderRadius: '50%',
              height: '48px',
              width: '48px',
              backgroundColor: (theme) => theme.palette.grey[300],
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <CircularProgressWithChildren variant="determinate" value={mpPercent} size={48} color="#5050CC" thickness={22}>
              <Box
                sx={{
                  borderRadius: '50%',
                  height: '36px',
                  width: '36px',
                  backgroundColor: (theme) => theme.palette.grey[300],
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  border: (theme) => `1px solid ${theme.palette.grey[800]}`,
                  boxShadow: (theme) => `0 0 3px ${theme.palette.grey[400]}, inset 0 0 5px ${theme.palette.grey[800]}`,
                  textShadow: (theme) => `0 0 2px ${theme.palette.grey[800]}`,
                }}
              >
                {character?.characterClass && CharacterClassIconMap[character?.characterClass]}
              </Box>
            </CircularProgressWithChildren>
          </Box>
        </CircularProgressWithChildren>
      </Column>
    </Tooltip>
  );
};
