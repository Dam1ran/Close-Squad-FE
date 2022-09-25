import { HubConnection } from '@microsoft/signalr';
import { createContext, PropsWithChildren, useMemo, useReducer } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import { ChatMessageType, ChatMessage, ChatPlayer, Player } from '../../../models/signalR';
import { SignalRContextActionEnum } from './signalRContext.actions';
import { signalRContextReducer } from './signalRContext.reducer';
import { ChatMessages, PlayerGroups, SignalRContextState } from './signalRContext.state';

const signalRContextInitialState: SignalRContextState = {
  connection: undefined,
  currentPlayer: undefined,
  retryConnectionFlag: false,
  playerGroups: {
    nearbyPlayers: [],
    partyPlayers: [],
    clanPlayers: [],
    friendPlayers: [],
  } as PlayerGroups,
  chatMessages: {
    general: { type: ChatMessageType.General, messages: [] },
    nearby: { type: ChatMessageType.Nearby, messages: [] },
    whisper: { type: ChatMessageType.Whisper, messages: [] },
    party: { type: ChatMessageType.Party, messages: [] },
    clan: { type: ChatMessageType.Clan, messages: [] },
    shout: { type: ChatMessageType.Shout, messages: [] },
  } as ChatMessages,
};

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function*/
let dispatcher = {
  setConnection: (connection: HubConnection): void => {},
  setRetryConnection: (): void => {},
  setCurrentPlayer: (currentPlayer: Player): void => {},
  setNearbyPlayers: (players: ChatPlayer[]): void => {},
  setPartyPlayers: (players: ChatPlayer[]): void => {},
  setClanPlayers: (players: ChatPlayer[]): void => {},
  setFriendPlayers: (players: ChatPlayer[]): void => {},
  setChatMessage: (message: ChatMessage): void => {},
};

export const SignalRContext = createContext({
  ...signalRContextInitialState,
  ...dispatcher,
});

export const SignalRContextProvider = ({ children }: PropsWithChildren<BrowserRouterProps>): JSX.Element => {
  const [signalRContextState, dispatch] = useReducer(signalRContextReducer, signalRContextInitialState);

  dispatcher = useMemo(
    () => ({
      setConnection: (connection) =>
        dispatch({
          type: SignalRContextActionEnum.SET_CONNECTION,
          connection,
        }),
      setRetryConnection: () =>
        dispatch({
          type: SignalRContextActionEnum.SET_RETRY_CONNECTION,
        }),
      setCurrentPlayer: (currentPlayer) =>
        dispatch({
          type: SignalRContextActionEnum.SET_CURRENT_PLAYER,
          currentPlayer,
        }),
      setNearbyPlayers: (players) =>
        dispatch({
          type: SignalRContextActionEnum.SET_NEARBY_PLAYERS,
          players,
        }),
      setPartyPlayers: (players) =>
        dispatch({
          type: SignalRContextActionEnum.SET_PARTY_PLAYERS,
          players,
        }),
      setClanPlayers: (players) =>
        dispatch({
          type: SignalRContextActionEnum.SET_CLAN_PLAYERS,
          players,
        }),
      setFriendPlayers: (players) =>
        dispatch({
          type: SignalRContextActionEnum.SET_FRIEND_PLAYERS,
          players,
        }),
      setChatMessage: (message) =>
        dispatch({
          type: SignalRContextActionEnum.SET_CHAT_MESSAGE,
          message,
        }),
    }),
    [],
  );

  const signalRContext = {
    ...signalRContextState,
    ...dispatcher,
  };

  return <SignalRContext.Provider value={signalRContext}>{children}</SignalRContext.Provider>;
};
