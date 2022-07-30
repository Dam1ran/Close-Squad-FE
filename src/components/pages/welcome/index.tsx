import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverClient } from '../../../api/serverClient';
import { ServerAnnouncementDto } from '../../../models/api.models';
import { AppContext } from '../../../support/contexts/appContextProvider';
import { Button, CircularProgress, Column, Paper, Row, Typography } from '../../elements';
// import { LocationProps } from '../../../models/types';

axios.defaults.withCredentials = true;

export const WelcomePage = (): JSX.Element => {
  const { getAnnouncements, login } = serverClient();
  const [announcements, setAnnouncements] = useState<ServerAnnouncementDto[] | null>();

  useEffect(() => {
    let isMounted = true;
    const fetchAnnouncements = async (): Promise<void> => {
      isMounted && setAnnouncements(await getAnnouncements());
    };
    fetchAnnouncements();
    return () => {
      isMounted = false;
    };
  }, []);

  const navigate = useNavigate();
  // const location = useLocation() as unknown as LocationProps;
  // const from = location.state?.from?.pathname || '/';

  const [antiforgeryToken, setAntiforgeryToken] = useState('');

  const { setCookiesAccepted, appContextState } = useContext(AppContext);

  // console.log(appContextState);

  const logins = async (): Promise<void> => {
    setCookiesAccepted(true);
    setAntiforgeryToken(await login());
  };

  const antif = () => {
    const ziu = axios.get('https://localhost:7271/antiforgery', {
      // withCredentials: true,
    }); //for GET
    ziu.finally(() => {
      console.log('ggggg');
    });
  };
  const forecast = () => {
    const ziu = axios.get('https://localhost:7271/weather-forecast', {}); //for GET
    ziu.finally(() => {
      console.log('ggggg');
    });
  };;
  const registerHandler = async () => {
    // await register({ nickname: 'JoraKardan', email: 'danunah@gmail.com' });
  };
  return (
    <Column alignItems="center" sx={{ paddingTop: 1, paddingBottom: 1, height: '100%' }}>
      <Paper
        elevation={0}
        sx={{ padding: (theme) => theme.spacing(2), minWidth: '320px', width: '80%', maxWidth: '1600px' }}
      >
        <Typography align="center" variant="h2">
          Close Squad
        </Typography>
        <Typography
          align="center"
          variant="h6"
          sx={{
            padding: (theme) => theme.spacing(2),
            border: (theme) => `1px solid ${theme.palette.secondary.main}`,
            width: '50%',
            margin: 'auto',
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
          }}
        >
          Browser MMORPG Game with chill mechanics.
        </Typography>
        <Typography
          align="center"
          sx={{ color: (theme) => theme.palette.error.main, margin: (theme) => theme.spacing(2), marginBottom: 0 }}
        >
          UNDER DEVELOPMENT
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
            flex: 1,
            padding: 1,
            outline: (theme) => `1px solid ${theme.palette.secondary.main}`,
            outlineOffset: '-5px',
          }}
        >
          <Column alignItems="center" sx={{ minHeight: '100%' }}>
            <Typography align="center" variant="h6" sx={{ fontWeight: 700, color: (theme) => theme.palette.primary.main }}>
              Server Announcements:
            </Typography>
            {announcements ? (
              announcements?.length > 0 ? (
                announcements?.map((a, i) => {
                  return (
                    <Row key={i} sx={{ gap: 1, marginTop: 1, width: '100%' }}>
                      <Typography
                        variant="caption"
                        sx={{ color: (theme) => theme.palette.secondary.main, marginTop: '3px' }}
                      >
                        {new Date(a.createdAt).toDateString()}
                      </Typography>
                      <Typography sx={{ flex: 1 }}>{a.message}</Typography>
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
        <Paper sx={{ padding: (theme) => theme.spacing(2), width: '320px' }}>
          <Column sx={{ '& Button': { margin: (theme) => theme.spacing(1) } }}>
            <Button onClick={() => navigate('/login')}>
              <Typography>Login</Typography>
            </Button>
            <Button onClick={() => navigate('/register')}>
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
};;;;
