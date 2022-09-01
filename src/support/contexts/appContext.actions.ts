export type AppContextAction =
  | { type: AppContextActionEnum.SET_COOKIES_ACCEPTED; cookiesAccepted: boolean }
  | { type: AppContextActionEnum.SET_TRUST_THIS_DEVICE; trustThisDevice: boolean };

export enum AppContextActionEnum {
  SET_COOKIES_ACCEPTED = 0,
  SET_TRUST_THIS_DEVICE = 1,
}
