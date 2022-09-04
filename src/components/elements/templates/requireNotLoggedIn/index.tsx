import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../../support/hooks';
import { KeyOffIcon } from '../../atoms';

export const RequireNotLoggedIn = (): JSX.Element => {
  const isLoggedIn = useAuth().isLoggedIn();
  useEffect(() => {
    if (isLoggedIn) {
      toast('This route is accessible when logged out only.', {
        icon: <KeyOffIcon color="secondary" />,
        duration: 5000,
        style: { minWidth: 'fit-content' },
      });
    }
  }, [isLoggedIn]);

  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};
