import { Row, Typography } from '../../../../../elements';

export const TravelingLayer = (): JSX.Element => {
  return (
    <Row
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5,
      }}
    >
      <Typography variant="h5" color="secondary" sx={{ fontWeight: 700, opacity: 0.4 }}>
        Traveling...
      </Typography>
    </Row>
  );
};
