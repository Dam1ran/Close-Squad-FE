import { AppContextAction, AppContextActionEnum } from './appContext.actions';
import { AppContextState } from './appContext.state';

export const appContextReducer = (prevState: AppContextState, action: AppContextAction): AppContextState => {
  switch (action.type) {
    case AppContextActionEnum.SET_COOKIES_ACCEPTED: {
      localStorage.setItem('cookiesAccepted', JSON.stringify(action.cookiesAccepted));
      return {
        ...prevState,
        application: {
          ...prevState.application,
          cookiesAccepted: action.cookiesAccepted,
        },
      } as AppContextState;
    }
    default:
      throw new Error(`App context state action: ${action.type} not handled in switch.`);
  }
};
