import { useContext } from 'react';
import { scoutQuadrantReportDialogOverlay, serverDialogOverlay } from '../../components/elements/organisms/overlay';
import { CharacterDto, ChatMessage, ChatPlayerDto, PlayerDto } from '../../models/signalR';
import { ScoutQuadrantReport } from '../../models/signalR';
import { ServerDialog } from '../../models/signalR/serverDialog';
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
  const { setCharacters, updateCharacter, updateCharacters } = useContext(CharacterContext);
  const { refresh } = useRefreshToken();

  const receivers: Receivers = {
    SetCurrentPlayer: (payload: PlayerDto) => {
      console.log(payload);
      setCurrentPlayer(payload);
    },
    SetNearbyGroup: (payload: ChatPlayerDto[]) => {
      console.log(payload);

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
    ReceiveChatMessage: (payload: ChatMessage) => {
      setChatMessage(payload);
    },
    OnSessionExpired: async () => {
      await refresh();
    },
    SetCharacters: (payload: CharacterDto[]) => {
      setCharacters(payload);
    },
    UpdateCharacter: (payload: Partial<CharacterDto>) => {
      console.log(payload);
      updateCharacter(payload);
    },
    UpdateCharacters: (payload: Partial<CharacterDto>[]) => {
      updateCharacters(payload);
    },
    Reconnect: () => {
      setRetryConnection();
    },
    SendScoutQuadrantReport: (payload: ScoutQuadrantReport) => {
      scoutQuadrantReportDialogOverlay(payload);
    },
    SendServerDialog: (payload: ServerDialog) => {
      serverDialogOverlay(payload);
    },
  };

  return receivers;
};
