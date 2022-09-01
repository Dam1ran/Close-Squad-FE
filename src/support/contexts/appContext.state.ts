export interface AppContextState {
  application: ApplicationsState;
}

export interface ApplicationsState {
  cookiesAccepted: boolean;
  trustThisDevice: boolean;
}
