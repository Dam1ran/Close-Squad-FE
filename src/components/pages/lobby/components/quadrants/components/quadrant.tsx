import { Box, Img } from '../../../../../elements';
import defaultQuadrantImage from '../../../../../../assets/images/quadrant_default.png';
import { alpha } from '@mui/system';

export const Quadrant: React.FC<{ quadrantIndex: number; center?: boolean }> = ({ quadrantIndex, center }) => {
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
    <Img
      sx={{
        width: '100px',
        height: '100px',
        border: (theme) =>
          center ? `1px solid ${alpha(theme.palette.grey[300], 0.6)}` : `1px solid ${alpha(theme.palette.grey[500], 0.15)}`,
        backgroundImage: `url(${defaultQuadrantImage})`,
        fontSize: '14px',
      }}
      alt={`Q: ${quadrantIndex}`}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      src={`${process.env.REACT_APP_BASE_URL!}/images/quadrant_${quadrantIndex}.png`}
    />
  );
};
