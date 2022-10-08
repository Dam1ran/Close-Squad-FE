import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import { createContext, PropsWithChildren, useMemo, useReducer } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import { ChatMessageType, ChatMessage, ChatPlayerDto, PlayerDto } from '../../../models/signalR';
import { SignalRContextActionEnum } from './signalRContext.actions';
import { signalRContextReducer } from './signalRContext.reducer';
import { ChatMessages, GameSettings, PlayerGroups, SignalRContextState } from './signalRContext.state';

const signalRContextInitialState: SignalRContextState = {
  connection: undefined,
  connectionState: undefined,
  currentPlayer: undefined,
  retryConnectionFlag: false,
  gameSettings: undefined,
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
  setConnectionState: (connectionState?: HubConnectionState): void => {},
  setGameSettings: (gameSettings: GameSettings): void => {},
  setRetryConnection: (): void => {},
  setCurrentPlayer: (currentPlayer: PlayerDto): void => {},
  setNearbyPlayers: (players: ChatPlayerDto[]): void => {},
  setPartyPlayers: (players: ChatPlayerDto[]): void => {},
  setClanPlayers: (players: ChatPlayerDto[]): void => {},
  setFriendPlayers: (players: ChatPlayerDto[]): void => {},
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
      setConnectionState: (connectionState) =>
        dispatch({
          type: SignalRContextActionEnum.SET_CONNECTION_STATE,
          connectionState,
        }),
      setGameSettings: (gameSettings) =>
        dispatch({
          type: SignalRContextActionEnum.SET_GAME_SETTINGS,
          gameSettings,
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
