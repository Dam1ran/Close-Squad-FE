import { Box, Paper, Typography } from '../../../../elements';

export const TitleSection = (): JSX.Element => {
  return (
    <Paper elevation={0} sx={{ padding: (theme) => theme.spacing(2), minWidth: '320px', width: '80%', maxWidth: '1600px' }}>
      <Typography
        mb={2}
        align="center"
        variant="h2"
        sx={{ textShadow: (theme) => `0px 8px 16px ${theme.palette.secondary.light}` }}
      >
        Close Squad
      </Typography>
      <Typography
        align="center"
        variant="h6"
        sx={{
          padding: (theme) => theme.spacing(2),
          border: (theme) => `1px solid ${theme.palette.secondary.main}`,
          width: 'max(50%, 288px)',
          margin: 'auto',
          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box>&#128162;</Box> <Box mx={1}>Browser MMORPG Game with chill mechanics.</Box> <Box>&#128162;</Box>
      </Typography>
      <Typography
        align="center"
        sx={{ color: (theme) => theme.palette.error.main, margin: (theme) => theme.spacing(2), marginBottom: 0 }}
      >
        &#128679; UNDER DEVELOPMENT &#128679;
      </Typography>
    </Paper>
  );
};
