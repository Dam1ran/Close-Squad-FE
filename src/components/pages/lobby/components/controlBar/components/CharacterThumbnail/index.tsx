/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useState } from 'react';
import { CharacterContext } from '../../../../../../../support/contexts/characterContext/characterContextProvider';
import { Box, CircularProgress, CircularProgressWithChildren, Column, Row, Tooltip } from '../../../../../../elements';
import { alpha } from '@mui/system';
import { CharacterClass } from '../../../../../../../models/api.models';
import { CharacterClassIconMap } from '../../../../../../../support/contexts/characterContext/characterContext.state';
import { useServerClient } from '../../../../../../../api/useServerClient';

export const CharacterThumbnail: React.FC<{ id: number; setActiveCharacterId: (characterId?: number) => void }> = ({
  id,
  setActiveCharacterId,
}) => {
  const { characters, activeCharacterId } = useContext(CharacterContext);

  const character = characters.find((c) => c.id === id);

  const hpPercent = character?.hp && character?.maxHP ? (character?.hp / character?.maxHP) * 100.0 : 0;
  const mpPercent = character?.mp && character?.maxMP ? (character?.mp / character?.maxMP) * 100.0 : 0;

  const isActive = activeCharacterId === character?.id && activeCharacterId !== undefined;
  const isDead = character?.hp === 0;
  const isAwake = character?.isAwake === true;

  const { toggleCharacter } = useServerClient();

  const [isAwakeRequestLoading, setIsAwakeRequestLoading] = useState(false);

  const onAwakeButtonClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>): Promise<void> => {
    e.stopPropagation();
    if (character?.nickname) {
      setIsAwakeRequestLoading(true);
      await toggleCharacter({ nickname: character.nickname }).then(() => {
        setIsAwakeRequestLoading(false);
        if (!isAwake || isActive) {
          const aliveAndAwakeCharacter = characters.find((c) => c.hp !== 0 && c.isAwake && character.id !== c.id);
          if (aliveAndAwakeCharacter) {
            setActiveCharacterId(aliveAndAwakeCharacter?.id);
          } else {
            const awakeCharacter = characters.find((c) => c.isAwake && character.id === c.id);
            if (awakeCharacter) {
              setActiveCharacterId(awakeCharacter?.id);
            } else {
              const awakedCharacter = characters.find((c) => c.isAwake);
              if (awakedCharacter) {
                setActiveCharacterId(awakedCharacter.id);
              } else {
                setActiveCharacterId(undefined);
              }
            }
          }
        }
      });
    }
  };

  const onCharacterClick = async (): Promise<void> => {
    if (character?.isAwake) {
      setActiveCharacterId(character?.id);
    }
  };

  return (
    <Tooltip
      arrow
      enterDelay={600}
      title={
        isAwake ? (
          <Box>
            <Box sx={{ fontStyle: 'italic', color: (theme) => theme.palette.grey[800] }}>{character.nickname}</Box>
            <Box sx={{ fontStyle: 'italic', color: (theme) => theme.palette.grey[800] }}>
              {CharacterClass[character.characterClass]}
            </Box>
            <Box sx={{ color: '#CC5050DD' }}>
              HP: {character.hp}/{character.maxHP}
            </Box>
            <Box sx={{ color: '#5050CC' }}>
              MP: {character.mp}/{character.maxMP}
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
          border: (theme) => (isActive ? `1px dashed ${theme.palette.grey[800]}` : `1px solid ${theme.palette.grey[300]}`),
          borderRadius: 1,
          position: 'relative',
          cursor: isActive || !isAwake ? 'unset' : 'pointer',
          transition: 'box-shadow 0.4s, border 0.4s',
          boxShadow: (theme) =>
            isActive && isDead
              ? `inset 0 0 8px ${theme.palette.error.main}, 0 0 5px ${theme.palette.grey[900]}`
              : isActive
              ? `0 0 5px ${theme.palette.grey[900]}`
              : isDead
              ? `inset 0 0 8px ${theme.palette.error.main}`
              : 'unset',
          filter: character?.isAwake ? 'none' : 'unset',
          WebkitFilter: isAwake ? 'unset' : 'grayscale(85%)',
          zIndex: 1,
          opacity: isAwake ? 1 : 0.6,
        }}
        onClick={onCharacterClick}
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
              backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.5),
              textAlign: 'center',
              borderBottomRightRadius: '8px',
              borderTopLeftRadius: '3px',
              fontSize: '14px',
            }}
          >
            TL
          </Box>
          <Tooltip title={isAwake ? 'Send to astray' : 'Wake up'} placement="right" arrow>
            <Box
              sx={{
                height: '20px',
                width: '20px',
                lineHeight: '20px',
                textAlign: 'center',
                borderBottomLeftRadius: '8px',
                borderTopRightRadius: '3px',
                fontSize: '14px',
                cursor: isAwakeRequestLoading ? 'unset' : 'pointer',
                zIndex: 10,
              }}
              onClick={onAwakeButtonClick}
            >
              {isAwakeRequestLoading ? (
                <CircularProgress variant="indeterminate" size={12} />
              ) : character?.isAwake ? (
                '🔅'
              ) : (
                '💤'
              )}
            </Box>
          </Tooltip>
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
                  userSelect: 'none',
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
