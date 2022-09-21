import { createContext, PropsWithChildren, useMemo, useReducer } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import { AppContextActionEnum } from './appContext.actions';
import { appContextReducer } from './appContext.reducer';
import { AppContextState, ApplicationState, AuthState } from './appContext.state';

const appContextInitialState: AppContextState = {
  application: {
    cookiesAccepted: JSON.parse(localStorage.getItem('cookiesAccepted') || 'false'),
    trustThisDevice: JSON.parse(localStorage.getItem('trustThisDevice') || 'false'),
  } as ApplicationState,
  auth: {
    nickname: undefined,
    role: undefined,
  } as AuthState,
};

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function*/
let dispatcher = {
  setCookiesAccepted: (cookiesAccepted: boolean): void => {},
  setTrustThisDevice: (trustThisDevice: boolean): void => {},
  setAuth: (auth: AuthState): void => {},
  clearAuth: (): void => {},
};

export const AppContext = createContext({
  ...appContextInitialState,
  ...dispatcher,
});

export const AppContextProvider = ({ children }: PropsWithChildren<BrowserRouterProps>): JSX.Element => {
  const [appContextState, dispatch] = useReducer(appContextReducer, appContextInitialState);

  dispatcher = useMemo(
    () => ({
      setCookiesAccepted: (cookiesAccepted) =>
        dispatch({
          type: AppContextActionEnum.SET_COOKIES_ACCEPTED,
          cookiesAccepted,
        }),
      setTrustThisDevice: (trustThisDevice) =>
        dispatch({
          type: AppContextActionEnum.SET_TRUST_THIS_DEVICE,
          trustThisDevice,
        }),
      setAuth: (auth) =>
        dispatch({
          type: AppContextActionEnum.SET_AUTH,
          auth,
        }),
      clearAuth: () =>
        dispatch({
          type: AppContextActionEnum.CLEAR_AUTH,
        }),
    }),
    [],
  );

  const appContext = {
    ...appContextState,
    ...dispatcher,
  };

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
