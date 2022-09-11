import { CircularProgress, Column, Paper, Row, Typography } from '../../../../elements';
import { useAnnouncements } from './useAnnouncements';

export const AnnouncementsSection = (): JSX.Element => {
  const announcements = useAnnouncements();

  return (
    <Paper
      sx={{
        minWidth: '320px',
        height: '188px',
        flex: 1,
        padding: 1,
        outline: (theme) => `1px solid ${theme.palette.secondary.main}`,
        outlineOffset: '-5px',
        boxShadow:
          'inset 0 0 40px bisque, 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      }}
    >
      <Typography
        align="center"
        variant="h6"
        sx={{ userSelect: 'none', fontWeight: 700, color: (theme) => theme.palette.primary.main }}
      >
        Server Announcements:
      </Typography>
      <Column alignItems="center" sx={{ height: 'calc(100% - 32px)', overflowX: 'auto' }}>
        {announcements ? (
          announcements?.length > 0 ? (
            announcements?.map((a, i) => {
              return (
                <Row key={i} sx={{ gap: 1, marginTop: 1, width: '100%' }}>
                  <Typography
                    variant="caption"
                    sx={{ color: (theme) => theme.palette.secondary.main, marginTop: '3px', userSelect: 'none' }}
                  >
                    {new Date(a.createdAt).toDateString()}
                  </Typography>
                  <Typography sx={{ flex: 1, userSelect: 'none' }}>{a.message}</Typography>
                </Row>
              );
            })
          ) : (
            <Typography align="center" variant="h6" sx={{ color: (theme) => theme.palette.secondary.main, margin: 'auto' }}>
              No Announcements.
            </Typography>
          )
        ) : (
          <Column sx={{ flex: 1 }}>
            <CircularProgress color="secondary" size={50} thickness={5} sx={{ margin: 'auto' }} />
          </Column>
        )}
      </Column>
    </Paper>
  );
};
