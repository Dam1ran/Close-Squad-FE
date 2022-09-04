export type AppContextAction =
  | { type: AppContextActionEnum.SET_COOKIES_ACCEPTED; cookiesAccepted: boolean }
  | { type: AppContextActionEnum.SET_TRUST_THIS_DEVICE; trustThisDevice: boolean }
  | { type: AppContextActionEnum.SET_TOKEN; token: string }
  | { type: AppContextActionEnum.CLEAR_AUTH };

export enum AppContextActionEnum {
  SET_COOKIES_ACCEPTED = 0,
  SET_TRUST_THIS_DEVICE = 1,
  SET_TOKEN = 2,
  CLEAR_AUTH = 3,
}
