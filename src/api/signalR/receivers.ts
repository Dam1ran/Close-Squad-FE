import { useContext } from 'react';
import { ChatMessage, Player } from '../../models/signalR';
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
    NearbyGroup: (payload: Player[]) => {
      setNearbyPlayers(payload);
    },
    PartyGroup: (payload: Player[]) => {
      setPartyPlayers(payload);
    },
    ClanGroup: (payload: Player[]) => {
      setClanPlayers(payload);
    },
    FriendGroup: (payload: Player[]) => {
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
