import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useServerClient } from '../../../../api/useServerClient';
import { AppContext } from '../../../../support/contexts/appContextProvider';
import { useAuthServiceHelper } from '../../../../support/services';
import { addSeconds } from '../../../../support/utils';
import { CircularProgress } from '../../atoms';
import { ModalBackground, Typography } from '../../molecules';
import { Column } from '../column';

export const RequireLoggedIn = (): JSX.Element => {
  const { application } = useContext(AppContext);
  const { isLoggedIn, setToken, setAuthData, isExpiredBy } = useAuthServiceHelper();
  const isExpired = isExpiredBy();
  const [isLoading, setIsLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshToken, getAntiforgeryTokenCookie } = useServerClient();

  useEffect(() => {
    let isMounted = true;

    const checkToken = async (): Promise<void> => {
      setIsLoading(true);
      await refreshToken()
        .then(async (r) => {
          if (setToken(r.data)) {
            await getAntiforgeryTokenCookie();
            setAuthData();
          } else {
            console.warn('Wrong token.');
            setTimeout(() => {
              navigate('/home');
            }, 2000);
          }
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            navigate('/login', { state: { from: { pathname: location.pathname } }, replace: true });
          } else {
            navigate('/home');
          }
        })
        .finally(() => {
          isMounted && setIsLoading(false);
        });
    };

    if ((!isLoggedIn || isExpired) && application.trustThisDevice) {
      setTimeout(() => checkToken());
    }
    setIsLoading(!isLoggedIn);

    let request = false;
    const timer = setInterval(async () => {
      if (!request && isLoggedIn && isExpiredBy(addSeconds(15))) {
        request = true;
        setRequesting(true);
        document.body.style.cursor = 'wait';
        await checkToken();
        setRequesting(false);
        document.body.style.cursor = 'default';
        request = false;
      }
    }, 5000.0);

    return () => {
      clearInterval(timer);
      isMounted = false;
      document.body.style.cursor = 'default';
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return !application.trustThisDevice && (!isLoggedIn || isExpiredBy()) ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : isLoading && !requesting ? (
    <ModalBackground sx={{ userSelect: 'none' }}>
      <Column>
        <CircularProgress color="secondary" size={40} thickness={5} sx={{ margin: 'auto', opacity: 0.7 }} />
        <Typography mt={4} ml={4} variant="h4" sx={{ fontWeight: 700, opacity: 0.4 }}>
          LOADING...
        </Typography>
      </Column>
    </ModalBackground>
  ) : (
    <Outlet />
  );
};
