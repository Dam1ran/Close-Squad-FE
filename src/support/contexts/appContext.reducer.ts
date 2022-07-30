import { AppContextAction, AppContextActionEnum } from './appContext.actions';
import { AppContextState } from './appContext.state';

export const appContextReducer = (prevState: AppContextState, action: AppContextAction) => {
  switch (action.type) {
    case AppContextActionEnum.SET_COOKIES_ACCEPTED: {
      return {
        ...prevState,
        application: {
          ...prevState.application,
          cookiesAccepted: action.cookiesAccepted,
        },
      } as AppContextState;
    }
    default: {
      return {
        // unrecognized dispatched action
        ...prevState,
      } as AppContextState;
    }
  }
};
