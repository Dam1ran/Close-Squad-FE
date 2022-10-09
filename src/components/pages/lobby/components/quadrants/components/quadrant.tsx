import { Box, Img, VisibilityIcon } from '../../../../../elements';
import defaultQuadrantImage from '../../../../../../assets/images/quadrant_default.png';
import { alpha } from '@mui/system';
import { CharacterDto } from '../../../../../../models/signalR';
import { useConnection } from '../../../../../../api/signalR/useConnection';

export const Quadrant: React.FC<{
  quadrantIndex: number;
  center?: boolean;
  canSeeQuadrantInfo: CharacterDto | undefined;
}> = ({ quadrantIndex, center, canSeeQuadrantInfo }) => {
  const { scoutQuadrantCall } = useConnection();
  const scoutQuadrant = (): void => {
    console.log('showing hard for: ' + quadrantIndex);
    // check for consumable
    canSeeQuadrantInfo && scoutQuadrantCall({ characterId: canSeeQuadrantInfo.id, quadrantIndex });
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
      }}
    >
      <Img
        sx={{
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
