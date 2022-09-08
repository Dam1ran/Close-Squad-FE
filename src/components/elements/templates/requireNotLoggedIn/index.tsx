import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthServiceHelper } from '../../../../support/services';
import { addSeconds } from '../../../../support/utils';
import { KeyOffIcon } from '../../atoms';

export const RequireNotLoggedIn = (): JSX.Element => {
  const { isLoggedIn, isExpiredBy } = useAuthServiceHelper();
  const expired = isExpiredBy(addSeconds(10));
  useEffect(() => {
    if (isLoggedIn && !expired) {
      toast('This route is accessible when logged out only.', {
        icon: <KeyOffIcon color="secondary" />,
        duration: 5000,
        style: { minWidth: 'fit-content' },
      });
    }
  }, [isLoggedIn, expired]);

  return isLoggedIn && !expired ? <Navigate to="/" replace /> : <Outlet />;
};
