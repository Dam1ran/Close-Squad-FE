import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ServerClient } from '../../../../api/serverClient';
import { AppContext } from '../../../../support/contexts/appContextProvider';
import { useAbortSignal } from '../../../../support/hooks';
import { useAuthServiceHelper } from '../../../../support/services';
import { addSeconds } from '../../../../support/utils';
import { CircularProgress } from '../../atoms';
import { ModalBackground, Typography } from '../../molecules';
import { Column } from '../column';

export const RequireLoggedIn = (): JSX.Element => {
  const signal = useAbortSignal();
  const { application } = useContext(AppContext);
  const { isLoggedIn, checkAndSet, isExpiredBy } = useAuthServiceHelper();
  const isExpired = isExpiredBy();
  const [isLoading, setIsLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const { refreshToken, getAntiforgeryTokenCookie } = ServerClient();

    const checkToken = async (): Promise<void> => {
      setIsLoading(true);
      await refreshToken(signal)
        .then(async (r) => {
          if (!checkAndSet(r.data)) {
            console.warn('Wrong token.');
            setTimeout(() => {
              navigate('/home');
            }, 2000);
          }
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            navigate('/login', { state: { from: { pathname: location.pathname } }, replace: true });
          }
        })
        .finally(() => {
          isMounted && setIsLoading(false);
        });
    };

    (!isLoggedIn || isExpired) && application.trustThisDevice && checkToken();
    setIsLoading(!isLoggedIn);

    let request = false;
    const timer = setInterval(async () => {
      if (!request && isLoggedIn && isExpiredBy(addSeconds(15))) {
        request = true;
        setRequesting(true);
        document.body.style.cursor = 'wait';
        await checkToken();
        await getAntiforgeryTokenCookie(signal);
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
        <Typography mt={4} ml={3} variant="h4" sx={{ fontWeight: 700, opacity: 0.4 }}>
          LOADING...
        </Typography>
      </Column>
    </ModalBackground>
  ) : (
    <Outlet />
  );
};
