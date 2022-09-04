import { AuthRole } from '../../models/auth';

export interface AppContextState {
  application: ApplicationState;
  auth: AuthState;
}

export interface ApplicationState {
  cookiesAccepted: boolean;
  trustThisDevice: boolean;
}

export interface AuthState {
  token?: string;
  nickname?: string;
  role?: AuthRole;
}
