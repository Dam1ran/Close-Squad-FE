import jwt_decode from 'jwt-decode';
import { AuthRole } from '../../models/auth';
import { isNullOrEmpty } from '../utils';

export const AuthHelper = {
  getNickname(value: string): string | undefined {
    if (isNullOrEmpty(value)) {
      return undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (jwt_decode(value) as any)?.nickname;
  },
  getRole(value: string): AuthRole | undefined {
    if (isNullOrEmpty(value)) {
      return undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (jwt_decode(value) as any)?.role;
  },
};
