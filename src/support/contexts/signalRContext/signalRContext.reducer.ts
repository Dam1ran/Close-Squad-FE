/* eslint-disable react-hooks/rules-of-hooks */
import { ChatMessageType } from '../../../models/signalR';
import { SignalRContextAction, SignalRContextActionEnum } from './signalRContext.actions';
import { ChatMessages, SignalRContextState } from './signalRContext.state';

export const signalRContextReducer = (prevState: SignalRContextState, action: SignalRContextAction): SignalRContextState => {
  const actionType = action.type;
  switch (actionType) {
    case SignalRContextActionEnum.SET_CONNECTION: {
      return {
        ...prevState,
        connection: action.connection,
      } as SignalRContextState;
    }
    case SignalRContextActionEnum.SET_CONNECTION_STATE: {
      return {
        ...prevState,
        connectionState: action.connectionState,
      } as SignalRContextState;
    }
    case SignalRContextActionEnum.SET_GAME_SETTINGS: {
      return {
        ...prevState,
        gameSettings: action.gameSettings,
      } as SignalRContextState;
    }
    case SignalRContextActionEnum.SET_RETRY_CONNECTION: {
      return {
        ...prevState,
        retryConnectionFlag: !prevState.retryConnectionFlag,
      } as SignalRContextState;
    }
    case SignalRContextActionEnum.SET_CURRENT_PLAYER: {
      return {
        ...prevState,
        currentPlayer: action.currentPlayer,
      } as SignalRContextState;
    }
    case SignalRContextActionEnum.SET_NEARBY_PLAYERS: {
      return {
        ...prevState,
        playerGroups: {
          ...prevState.playerGroups,
          nearbyPlayers: action.players,
        },
      } as SignalRContextState;
    }
    case SignalRContextActionEnum.SET_PARTY_PLAYERS: {
      return {
        ...prevState,
        playerGroups: {
          ...prevState.playerGroups,
          partyPlayers: action.players,
        },
      } as SignalRContextState;
    }
    case SignalRContextActionEnum.SET_CLAN_PLAYERS: {
      return {
        ...prevState,
        playerGroups: {
          ...prevState.playerGroups,
          clanPlayers: action.players,
        },
      } as SignalRContextState;
    }
    case SignalRContextActionEnum.SET_FRIEND_PLAYERS: {
      return {
        ...prevState,
        playerGroups: {
          ...prevState.playerGroups,
          friendPlayers: action.players,
        },
      } as SignalRContextState;
    }
    case SignalRContextActionEnum.SET_CHAT_MESSAGE: {
      const keyOfMessageGroup = ChatMessageType[action.message.type].getNormalized() as keyof ChatMessages;
      const messageGroup = prevState.chatMessages[keyOfMessageGroup];
      messageGroup.messages.push(action.message);
      if (messageGroup?.messages?.length > 20) {
        messageGroup?.messages?.shift();
      }

      if (action.message.type !== ChatMessageType.General) {
        prevState.chatMessages['general'].messages.push(action.message);
        if (prevState?.chatMessages['general']?.messages?.length > 100) {
          prevState?.chatMessages['general']?.messages?.shift();
        }
      }
      return {
        ...prevState,
        chatMessages: {
          ...prevState.chatMessages,
        },
      } as SignalRContextState;
    }
    default:
      throw new Error(`SignalR context state action: ${SignalRContextActionEnum[actionType]} not handled in switch.`);
  }
};
