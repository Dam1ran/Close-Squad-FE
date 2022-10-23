import { useContext } from 'react';
import { scoutQuadrantReportDialogOverlay, serverDialogOverlay } from '../../components/elements/organisms/overlay';
import { AggregatedDataDto, BarShortcut, CharacterDto, ChatMessage, ChatPlayerDto, PlayerDto } from '../../models/signalR';
import { ScoutQuadrantReport } from '../../models/signalR';
import { ServerDialog } from '../../models/signalR/serverDialog';
import { BarShortcutsContext } from '../../support/contexts/barShortcutContext/barShortcutsProvider';
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
    connection,
  } = useContext(SignalRContext);
  const { setCharacters, updateCharacter, updateCharacters, setQuadrantCharacters } = useContext(CharacterContext);
  const { setBarShortcuts, updateBarShortcut } = useContext(BarShortcutsContext);
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
    SendAggregatedData: (payload: AggregatedDataDto) => {
      updateCharacters(payload.clientCharacters);
      // setCharacters(payload.clientCharacters);
      setQuadrantCharacters(payload.charactersInActiveQuadrant);
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
    Disconnect: async () => {
      connection?.stop();
      await refresh();
    },
    SetBarShortcuts: (payload: BarShortcut[]) => {
      setBarShortcuts(payload);
    },
    UpdateBarShortcuts: (payload: BarShortcut[]) => {
      payload.forEach((bs) => {
        updateBarShortcut(bs);
      });
    },
  };

  return receivers;
};
