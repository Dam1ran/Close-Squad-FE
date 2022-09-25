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
    case AppContextActionEnum.SET_LOBBY_SETTINGS: {
      localStorage.setItem('lobbySettings', JSON.stringify(action.lobbySettings));
      return {
        ...prevState,
        lobbySettings: { ...action.lobbySettings },
      } as AppContextState;
    }
    case AppContextActionEnum.SET_AUTH: {
      return {
        ...prevState,
        auth: {
          ...prevState.auth,
          ...action.auth,
        },
      } as AppContextState;
    }
    case AppContextActionEnum.CLEAR_AUTH: {
      return {
        ...prevState,
        auth: {
          nickname: undefined,
          role: undefined,
        },
      } as AppContextState;
    }
    default:
      throw new Error(`App context state action: ${AppContextActionEnum[actionType]} not handled in switch.`);
  }
};
