import { useContext } from 'react';
import { CharacterDto, ChatMessage, ChatPlayerDto, PlayerDto } from '../../models/signalR';
import { CharacterContext } from '../../support/contexts/characterContext/characterContextProvider';
import { SignalRContext } from '../../support/contexts/signalRContext/signalRContextProvider';
import { useRefreshToken } from '../useRefreshToken';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Receivers {
  [key: string]: (payload: any) => any;
}

export const useReceivers = (): Receivers => {
  const {
    setCurrentPlayer,
    setNearbyPlayers,
    setPartyPlayers,
    setClanPlayers,
    setFriendPlayers,
    setChatMessage,
    setRetryConnection,
  } = useContext(SignalRContext);
  const { setCharacters, updateCharacter } = useContext(CharacterContext);
  const { refresh } = useRefreshToken();

  const receivers: Receivers = {
    SetCurrentPlayer: (payload: PlayerDto) => {
      console.log(payload);
      setCurrentPlayer(payload);
    },
    SetNearbyGroup: (payload: ChatPlayerDto[]) => {
      setNearbyPlayers(payload);
    },
    PartyGroup: (payload: ChatPlayerDto[]) => {
      setPartyPlayers(payload);
    },
    ClanGroup: (payload: ChatPlayerDto[]) => {
      setClanPlayers(payload);
    },
    FriendGroup: (payload: ChatPlayerDto[]) => {
      setFriendPlayers(payload);
    },
    ReceiveChatMessage: (message: ChatMessage) => {
      setChatMessage(message);
    },
    OnSessionExpired: async () => {
      await refresh();
    },
    SetCharacters: (payload: CharacterDto[]) => {
      setCharacters(payload);
    },
    UpdateCharacter: (characterDto: CharacterDto) => {
      updateCharacter(characterDto);
    },
    Reconnect: () => {
      setRetryConnection();
    },
  };

  return receivers;
};
