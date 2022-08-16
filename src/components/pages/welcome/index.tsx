import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServerClient } from '../../../api/useServerClient';
import { ServerAnnouncementDto } from '../../../models/api.models';

import { Box, Button, CircularProgress, Column, Paper, Row, Typography } from '../../elements';
// import { LocationProps } from '../../../models/types';

export const WelcomePage = (): JSX.Element => {
  const { login, getAnnouncements } = useServerClient();
  const [announcements, setAnnouncements] = useState<ServerAnnouncementDto[] | null>();

  useEffect(() => {
    const fetchAnnouncements = async (): Promise<void> => {
      //REWORK
      setAnnouncements(await getAnnouncements());
    };
    fetchAnnouncements();
  }, []);

  const navigate = useNavigate();
  // const location = useLocation() as unknown as LocationProps;
  // const from = location.state?.from?.pathname || '/';

  return (
    <Column
      alignItems="center"
      sx={{
        paddingTop: 1,
        paddingBottom: 1,
        height: '100%',
      }}
    >
      <Paper
        elevation={0}
        sx={{ padding: (theme) => theme.spacing(2), minWidth: '320px', width: '80%', maxWidth: '1600px' }}
      >
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
      <Row
        flexWrap="wrap"
        justifyContent="center"
        sx={{ marginTop: (theme) => theme.spacing(2), gap: 1, minWidth: '320px', width: '80%', maxWidth: '1600px' }}
      >
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
                <Typography
                  align="center"
                  variant="h6"
                  sx={{ color: (theme) => theme.palette.secondary.main, margin: 'auto' }}
                >
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
        <Paper elevation={2} sx={{ padding: (theme) => theme.spacing(2), width: '320px', height: '188px' }}>
          <Column sx={{ '& Button': { margin: (theme) => theme.spacing(1) } }}>
            <Button
              onClick={(): void => {
                // navigate('/login')
                login().then(() => {
                  console.log('login in hard');
                });
              }}
            >
              <Typography>Login</Typography>
            </Button>
            <Button onClick={(): void => navigate('/register')}>
              <Typography>Register</Typography>
            </Button>
            <Button>
              <Typography>Guides</Typography>
            </Button>
          </Column>
        </Paper>
      </Row>
    </Column>
  );
};
