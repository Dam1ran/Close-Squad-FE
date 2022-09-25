import { AuthRole } from '../../../models/auth';

export interface AppContextState {
  application: ApplicationState;
  auth: AuthState;
  lobbySettings: LobbySettings;
}

export interface ApplicationState {
  cookiesAccepted: boolean;
  trustThisDevice: boolean;
}

export interface AuthState {
  nickname?: string;
  role?: AuthRole;
}

export interface LobbySettings {
  soundEnabled: boolean;
}
