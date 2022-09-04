import { useContext } from 'react';
import { AuthRole } from '../../models/auth';
import { AppContext } from '../contexts/appContextProvider';
import { isAnyEmpty } from '../utils';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAuth = () => {
  const { auth } = useContext(AppContext);
  const hasAnyOf = (roles: AuthRole[]): boolean => roles.some((r) => r === auth.role);
  const isLoggedIn = (): boolean => !isAnyEmpty(...Object.values(auth));

  return {
    hasAnyOf,
    isLoggedIn,
  };
};
