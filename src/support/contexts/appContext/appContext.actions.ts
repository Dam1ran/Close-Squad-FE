import { AuthState, LobbySettings } from './appContext.state';

export type AppContextAction =
  | { type: AppContextActionEnum.SET_COOKIES_ACCEPTED; cookiesAccepted: boolean }
  | { type: AppContextActionEnum.SET_TRUST_THIS_DEVICE; trustThisDevice: boolean }
  | { type: AppContextActionEnum.SET_LOBBY_SETTINGS; lobbySettings: LobbySettings }
  | { type: AppContextActionEnum.SET_AUTH; auth: AuthState }
  | { type: AppContextActionEnum.CLEAR_AUTH };

export enum AppContextActionEnum {
  SET_COOKIES_ACCEPTED = 0,
  SET_TRUST_THIS_DEVICE = 1,
  SET_LOBBY_SETTINGS = 2,
  SET_AUTH = 3,
  CLEAR_AUTH = 4,
}
