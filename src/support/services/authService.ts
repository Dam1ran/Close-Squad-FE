import jwt_decode from 'jwt-decode';
import { isAnyEmpty, isNotEmpty, isNullOrEmpty } from '../utils';

export enum AuthRole {
  USR = 'USR',
  ADM = 'ADM',
  GMA = 'GMA',
}

export interface AuthDto {
  nickname: string;
  token: string;
}

interface AuthMemory {
  nickname?: string;
  token?: string;
}

const authMemory: AuthMemory = {
  nickname: undefined,
  token: undefined,
};

export const AuthService = {
  set: (data: AuthDto): void => {
    if (isNullOrEmpty(data.nickname) || isNullOrEmpty(data.token)) {
      return;
    }
    authMemory.nickname = data.nickname;
    authMemory.token = data.token;
  },
  hasRoles: (values: AuthRole[]): boolean => {
    if (values.length === 0) {
      return true;
    }
    if (isNullOrEmpty(authMemory.token)) {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion
    // const decodedToken = jwt_decode(authMemory.token!) as any;

    const roles: AuthRole[] = []; // = decodedToken.roles as AuthRole[];
    console.log('Auth service: ', roles); // TEMP

    return values.some((r) => roles.includes(r));
  },
  isLoggedIn: (): boolean => !isAnyEmpty(...Object.values(authMemory)),
  clear: (): void => {
    authMemory.nickname = undefined;
    authMemory.token = undefined;
  },
};
