import { AuthHelper } from '../services';
import { AppContextAction, AppContextActionEnum } from './appContext.actions';
import { AppContextState } from './appContext.state';

export const appContextReducer = (prevState: AppContextState, action: AppContextAction): AppContextState => {
  const actionType = action.type;
  switch (actionType) {
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
    case AppContextActionEnum.SET_TRUST_THIS_DEVICE: {
      localStorage.setItem('trustThisDevice', JSON.stringify(action.trustThisDevice));
      return {
        ...prevState,
        application: {
          ...prevState.application,
          trustThisDevice: action.trustThisDevice,
        },
      } as AppContextState;
    }
    case AppContextActionEnum.SET_TOKEN: {
      return {
        ...prevState,
        auth: {
          token: action.token,
          nickname: AuthHelper.getNickname(action.token),
          role: AuthHelper.getRole(action.token),
        },
      } as AppContextState;
    }
    case AppContextActionEnum.CLEAR_AUTH: {
      return {
        ...prevState,
        auth: {
          token: undefined,
          nickname: undefined,
          role: undefined,
        },
      } as AppContextState;
    }
    default:
      throw new Error(`App context state action: ${AppContextActionEnum[actionType]} not handled in switch.`);
  }
};
