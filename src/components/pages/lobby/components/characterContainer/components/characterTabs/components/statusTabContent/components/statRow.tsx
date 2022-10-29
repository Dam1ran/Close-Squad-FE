import { Row, Typography } from '../../../../../../../../../elements';

export const StatRow: React.FC<{ name: string; value: number }> = ({ name, value }) => {
  return (
    <Row sx={{ alignItems: 'center', justifyContent: 'space-between', width: '44%' }}>
      <Typography
        sx={{
          fontSize: '14px',
          lineHeight: '14px',
          fontStyle: 'italic',
          color: (theme) => theme.palette.grey[900],
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          fontSize: '14px',
          lineHeight: '14px',
          fontStyle: 'italic',
          color: (theme) => theme.palette.grey[900],
        }}
      >
        {value.toFixed(2)}
      </Typography>
    </Row>
  );
};
