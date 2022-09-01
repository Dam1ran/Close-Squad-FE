import { createContext, PropsWithChildren, useMemo, useReducer } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import { AppContextActionEnum } from './appContext.actions';
import { appContextReducer } from './appContext.reducer';
import { AppContextState, ApplicationsState } from './appContext.state';

const appContextInitialState: AppContextState = {
  application: {
    cookiesAccepted: JSON.parse(localStorage.getItem('cookiesAccepted') || 'false'),
    trustThisDevice: JSON.parse(localStorage.getItem('trustThisDevice') || 'false'),
  } as ApplicationsState,
};

/* eslint-disable @typescript-eslint/no-unused-vars */
let dispatcher = {
  setCookiesAccepted: (cookiesAccepted: boolean): void => {
    return;
  },
  setTrustThisDevice: (trustThisDevice: boolean): void => {
    return;
  },
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
    }),
    [],
  );

  const appContext = {
    ...appContextState,
    ...dispatcher,
  };

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
