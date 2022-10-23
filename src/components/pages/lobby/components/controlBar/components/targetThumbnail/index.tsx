/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { Box, CircularProgressWithChildren, Column, Row, Tooltip } from '../../../../../../elements';
import { alpha } from '@mui/system';
import { CsEntityStatus } from '../../../../../../../models/enums';
import { CsEntityClassIconMap, CharacterStatusIconMap } from '../../../../../../../models/character';
import { useCharacterService } from '../../../../../../../support/services/useCharacterService';
import { useConnection } from '../../../../../../../api/signalR/useConnection';

export const TargetThumbnail: React.FC = () => {
  const { cancelTarget } = useConnection();
  const activeCharacter = useCharacterService().getActiveCharacter();
  const target = activeCharacter?.target;

  const hpPercent =
    target?.hp !== undefined && target?.maxHp !== undefined && target?.hp !== 0 && target?.maxHp !== 0
      ? (target?.hp / target?.maxHp) * 100.0
      : 0;
  const mpPercent =
    target?.mp !== undefined && target?.maxMp !== undefined && target?.mp !== 0 && target?.maxMp !== 0
      ? (target?.mp / target?.maxMp) * 100.0
      : 0;

  const onCancelTarget = (): void => {
    if (!activeCharacter) {
      return;
    }

    cancelTarget({ characterId: activeCharacter.id });
  };

  return (
    <Tooltip
      arrow
      enterDelay={600}
      title={
        target ? (
          <Box>
            <Box sx={{ fontStyle: 'italic', color: (theme) => theme.palette.grey[800] }}>{target?.nickname}</Box>
            <Box sx={{ color: '#CC5050DD' }}>
              HP: {target?.hp?.toFixed(0)}/{target?.maxHp?.toFixed(0)}
            </Box>
            <Box sx={{ color: '#5050CC' }}>
              MP: {target?.mp?.toFixed(0)}/{target?.maxMp?.toFixed(0)}
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
          boxShadow: (theme) => `inset 0 0 8px ${theme.palette.grey[600]}`,
          border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          borderRadius: 1,
          position: 'relative',
          zIndex: 1,
          userSelect: 'none',
        }}
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
            {CharacterStatusIconMap[target?.status as CsEntityStatus]}
          </Box>
          <Box
            sx={{
              height: '20px',
              width: '20px',
              lineHeight: '20px',
              textAlign: 'center',
              borderBottomLeftRadius: '8px',
              borderTopRightRadius: '3px',
              fontSize: '14px',
              transition: 'background-color 0.3s',
              zIndex: 10,
              opacity: 0.6,
              cursor: 'pointer',
              '&:active': {
                backgroundColor: (theme) => alpha(theme.palette.grey[600], 0.6),
              },
            }}
            onClick={onCancelTarget}
          >
            {target && '✖'}
          </Box>
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
              // backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.5),
              textAlign: 'center',
              borderTopRightRadius: '8px',
              borderBottomLeftRadius: '3px',
              fontSize: '14px',
            }}
          >
            {/* BL */}
          </Box>
          <Box
            sx={{
              height: '20px',
              width: '20px',
              lineHeight: '20px',
              // backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.5),
              textAlign: 'center',
              borderTopLeftRadius: '8px',
              borderBottomRightRadius: '3px',
              fontSize: '14px',
            }}
          >
            {/* BR */}
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
                {target?.characterClass && CsEntityClassIconMap[target.characterClass]}
              </Box>
            </CircularProgressWithChildren>
          </Box>
        </CircularProgressWithChildren>
      </Column>
    </Tooltip>
  );
};
