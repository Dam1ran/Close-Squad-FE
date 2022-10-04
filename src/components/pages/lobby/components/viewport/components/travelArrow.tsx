import { ArrowForwardIosIcon, Box } from '../../../../../elements';
import { alpha } from '@mui/system';

export const TravelArrow: React.FC<{
  travelDirection: number;
  onClick: (travelDirection: number) => void;
  disabled: boolean;
}> = ({ travelDirection, onClick, disabled }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        height: '28px',
        width: '28px',
        transition: 'background-color 0.4s',
        backgroundColor: (theme) => (!disabled ? alpha(theme.palette.grey[400], 0.3) : 'unset'),
        top: travelDirection === 1 || travelDirection === 2 || travelDirection === 8 ? 0 : 'unset',
        right: travelDirection === 2 || travelDirection === 3 || travelDirection === 4 ? 0 : 'unset',
        bottom: travelDirection === 4 || travelDirection === 5 || travelDirection === 6 ? 0 : 'unset',
        left: travelDirection === 6 || travelDirection === 7 || travelDirection === 8 ? 0 : 'unset',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: !disabled ? 'pointer' : 'unset',
        '&:hover': {
          backgroundColor: (theme) => (!disabled ? alpha(theme.palette.grey[400], 0.6) : 'unset'),
        },
        '&:active': {
          backgroundColor: (theme) => (!disabled ? alpha(theme.palette.grey[500], 0.8) : 'unset'),
        },
        overflow: 'hidden',
        userSelect: 'none',
        borderTopLeftRadius:
          travelDirection === 3 || travelDirection === 4 || travelDirection === 5
            ? '50%'
            : travelDirection === 7
            ? 1
            : 'unset',
        borderTopRightRadius: travelDirection === 5 || travelDirection === 6 || travelDirection === 7 ? '50%' : 'unset',
        borderBottomRightRadius: travelDirection === 1 || travelDirection === 7 || travelDirection === 8 ? '50%' : 'unset',
        borderBottomLeftRadius:
          travelDirection === 1 || travelDirection === 2 || travelDirection === 3 || travelDirection === 3 ? '50%' : 'unset',
      }}
      onClick={(): void => {
        !disabled && onClick(travelDirection);
      }}
    >
      <ArrowForwardIosIcon
        color="secondary"
        sx={{
          marginBottom: travelDirection === 1 || travelDirection === 2 || travelDirection === 8 ? 1 : 'unset',
          marginLeft: travelDirection === 2 || travelDirection === 3 || travelDirection === 4 ? 1 : 'unset',
          marginTop: travelDirection === 4 || travelDirection === 5 || travelDirection === 6 ? 1 : 'unset',
          marginRight: travelDirection === 6 || travelDirection === 7 || travelDirection === 8 ? 1 : 'unset',
          transform: `rotateZ(${travelDirection * 45 - 135}deg)`,
          opacity: disabled ? 0.1 : 0.8,
        }}
      />
    </Box>
  );
};
