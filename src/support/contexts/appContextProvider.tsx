import { createContext, PropsWithChildren, useMemo, useReducer } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import { AppContextActionEnum } from './appContext.actions';
import { appContextReducer } from './appContext.reducer';
import { AppContextState, ApplicationsState } from './appContext.state';

const appContextInitialState: AppContextState = {
  application: {
    cookiesAccepted: false,
  } as ApplicationsState,
};

let dispatcher = {
  setCookiesAccepted: (cookiesAccepted: boolean): void => {},
};

export const AppContext = createContext({
  appContextState: appContextInitialState,
  ...dispatcher,
});

export const AppContextProvider = ({ children }: PropsWithChildren<BrowserRouterProps>) => {
  const [appContextState, dispatch] = useReducer(appContextReducer, appContextInitialState);

  dispatcher = useMemo(
    () => ({
      setCookiesAccepted: (cookiesAccepted) =>
        dispatch({
          type: AppContextActionEnum.SET_COOKIES_ACCEPTED,
          cookiesAccepted,
        }),
    }),
    [],
  );

  const appContext = {
    appContextState,
    ...dispatcher,
  };

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
