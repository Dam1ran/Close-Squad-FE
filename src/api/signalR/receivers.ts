import { useContext } from 'react';
import { ChatMessage, ChatPlayer, Player } from '../../models/signalR';
import { SignalRContext } from '../../support/contexts/signalRContext/signalRContextProvider';
import { useRefreshToken } from '../useRefreshToken';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Receivers {
  [key: string]: (payload: any) => any;
}

export const useReceivers = (): Receivers => {
  const { setCurrentPlayer, setNearbyPlayers, setPartyPlayers, setClanPlayers, setFriendPlayers, setChatMessage } =
    useContext(SignalRContext);
  const { refresh } = useRefreshToken();

  const receivers: Receivers = {
    SetCurrentPlayer: (payload: Player) => {
      setCurrentPlayer(payload);
    },
    NearbyGroup: (payload: ChatPlayer[]) => {
      setNearbyPlayers(payload);
    },
    PartyGroup: (payload: ChatPlayer[]) => {
      setPartyPlayers(payload);
    },
    ClanGroup: (payload: ChatPlayer[]) => {
      setClanPlayers(payload);
    },
    FriendGroup: (payload: ChatPlayer[]) => {
      setFriendPlayers(payload);
    },
    ReceiveChatMessage: (message: ChatMessage) => {
      setChatMessage(message);
    },
    OnSessionExpired: async () => {
      await refresh();
    },
  };

  return receivers;
};
