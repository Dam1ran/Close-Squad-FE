/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt_decode from 'jwt-decode';
import { useContext } from 'react';
import { AuthRole } from '../../models/auth';
import { AppContext } from '../contexts/appContext/appContextProvider';
import { isAnyEmpty, isNullOrEmpty } from '../utils';

interface AuthMemory {
  token?: string;
}

const authMemory: AuthMemory = {
  token: undefined,
};

export const AuthService = () => {
  const setToken = (token: string): boolean => {
    if (isNullOrEmpty(token)) {
      return false;
    }

    try {
      const jti = (jwt_decode(token) as any)?.jti;
      if (jti) {
        authMemory.token = token;
        return true;
      }
    } catch {
      return false;
    }

    return false;
  };
  const getToken = (): string | undefined => authMemory?.token;

  const clear = (): void => {
    authMemory.token = undefined;
  };

  const isExpiredBy = (byDateTime: Date) => {
    const token = authMemory?.token;
    if (token) {
      const exp = (jwt_decode(token!) as any)?.exp;
      return new Date(exp * 1000).getTime() <= byDateTime.getTime();
    }
    return true;
  };

  return {
    setToken,
    getToken,
    isExpiredBy,
    clear,
  };
};

export const useAuthServiceHelper = () => {
  const { auth, setAuth, setTrustThisDevice } = useContext(AppContext);

  const setAuthData = (): boolean => {
    const nickname = (jwt_decode(AuthService().getToken()!) as any)?.nickname;
    const role = (jwt_decode(AuthService().getToken()!) as any)?.role;
    setAuth({ nickname, role });

    return true;
  };

  const setToken = (token: string) => AuthService().setToken(token);

  const hasAnyOf = (roles: AuthRole[]): boolean => roles.some((r) => r === auth?.role);

  const clear = (): void => {
    AuthService().clear();
    setAuth({ nickname: undefined, role: undefined });
    setTrustThisDevice(false);
  };

  const isExpiredBy = (dateTime = new Date()) => AuthService().isExpiredBy(dateTime);

  const isManagementRole = () => hasAnyOf([AuthRole.ADM, AuthRole.GMA]);

  return {
    setToken,
    setAuthData,
    hasAnyOf,
    isLoggedIn: !isAnyEmpty(...Object.values(auth)),
    nickname: auth?.nickname,
    clear,
    isExpiredBy,
    isManagementRole,
  };
};
