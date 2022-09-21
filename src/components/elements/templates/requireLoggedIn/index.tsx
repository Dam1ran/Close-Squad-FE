import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRefreshToken } from '../../../../api/useRefreshToken';
import { AppContext } from '../../../../support/contexts/appContext/appContextProvider';
import { SignalRContextProvider } from '../../../../support/contexts/signalRContext/signalRContextProvider';
import { useAuthServiceHelper } from '../../../../support/services';
import { addSeconds } from '../../../../support/utils';
import { CircularProgress } from '../../atoms';
import { ModalBackground, Typography } from '../../molecules';
import { Column } from '../column';

export const RequireLoggedIn = (): JSX.Element => {
  const { application } = useContext(AppContext);
  const { isLoggedIn, isExpiredBy } = useAuthServiceHelper();
  const isExpired = isExpiredBy();
  const { refresh } = useRefreshToken(true);

  const [isLoading, setIsLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkToken = async (): Promise<void> => {
      setIsLoading(true);
      await refresh().finally(() => {
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
    <SignalRContextProvider>
      <Outlet />
    </SignalRContextProvider>
  );
};
