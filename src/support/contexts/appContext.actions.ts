export interface AppContextAction {
  type: AppContextActionEnum.SET_COOKIES_ACCEPTED;
  cookiesAccepted: boolean;
}

export enum AppContextActionEnum {
  SET_COOKIES_ACCEPTED = 0,
}
