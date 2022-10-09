import { Box, Img, questionDialogOverlay, VisibilityIcon } from '../../../../../elements';
import defaultQuadrantImage from '../../../../../../assets/images/quadrant_default.png';
import { alpha } from '@mui/system';
import { CharacterDto } from '../../../../../../models/signalR';
import { useConnection } from '../../../../../../api/signalR/useConnection';
import { TravelDirection, TravelDirectionMap } from '../../../../../../models/enums';
import { CharacterContext } from '../../../../../../support/contexts/characterContext/characterContextProvider';
import { useContext } from 'react';
import { useCharacterService } from '../../../../../../support/services/useCharacterService';

export const Quadrant: React.FC<{
  quadrantIndex: number;
  center?: boolean;
  canSeeQuadrantInfo: CharacterDto | undefined;
  travelDirection?: TravelDirection;
}> = ({ quadrantIndex, center, canSeeQuadrantInfo, travelDirection }) => {
  const { scoutQuadrantCall } = useConnection();
  const scoutQuadrant = (): void => {
    console.log('showing hard for: ' + quadrantIndex);
    // check for consumable
    canSeeQuadrantInfo && scoutQuadrantCall({ characterId: canSeeQuadrantInfo.id, quadrantIndex });
  };

  const { activeCharacterId } = useContext(CharacterContext);
  const { characterTravelTo } = useConnection();

  const isTravelDisabled = useCharacterService().isTravelDisabled();

  const onQuadrantClick = (): void => {
    if (!activeCharacterId || !travelDirection || isTravelDisabled) {
      return;
    }
    questionDialogOverlay(
      () => characterTravelTo({ characterId: activeCharacterId, travelDirection }),
      'What is your course?',
      `Travel to ${TravelDirectionMap[travelDirection]}?`,
    );
  };

  return quadrantIndex === -1 ? (
    <Box
      sx={{
        width: '100px',
        height: '100px',
        border: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.15)}`,
        fontSize: '14px',
      }}
    ></Box>
  ) : (
    <Box
      sx={{
        position: 'relative',
        width: '100px',
        height: '100px',
        overflow: 'hidden',
        borderRadius: 0,
        transition: 'border-radius 0.3s',
        cursor: travelDirection !== undefined ? 'pointer' : 'unset',
        '&:hover': {
          borderRadius: travelDirection !== undefined ? 5 : 0,
        },
      }}
      onClick={onQuadrantClick}
    >
      <Img
        sx={{
          userSelect: 'none',
          pointerEvents: 'none',
          height: '100px',
          width: '100px',
          border: (theme) => (center ? `1px solid ${alpha(theme.palette.grey[300], 0.6)}` : 'unset'),
          backgroundImage: `url(${defaultQuadrantImage})`,
          fontSize: '14px',
        }}
        alt={`Q: ${quadrantIndex}`}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        src={`${process.env.REACT_APP_BASE_URL!}/images/quadrant_${quadrantIndex}.png`}
      />
      {canSeeQuadrantInfo && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '0px',
            left: '2.5px',
            height: '20px',
            width: '20px',
            zIndex: 5,
            color: (theme) => alpha(theme.palette.grey[300], 0.35),
            transition: 'color 0.3s',
            cursor: 'pointer',
            '&:hover': {
              color: (theme) => alpha(theme.palette.grey[200], 0.8),
            },
          }}
          onClick={scoutQuadrant}
        >
          <VisibilityIcon
            sx={{
              height: '16px',
              width: '16px',
            }}
          />
        </Box>
      )}
    </Box>
  );
};
