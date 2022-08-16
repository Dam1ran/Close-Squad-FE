export interface AppContextAction {
  type: AppContextActionEnum;
  cookiesAccepted: boolean;
}

export enum AppContextActionEnum {
  SET_COOKIES_ACCEPTED = 0,
}
