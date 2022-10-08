import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import { ChatMessage, ChatMessageType, ChatPlayerDto, PlayerDto } from '../../../models/signalR';

export interface SignalRContextState {
  connection?: HubConnection;
  connectionState?: HubConnectionState;
  retryConnectionFlag: boolean;
  currentPlayer?: PlayerDto;
  playerGroups: PlayerGroups;
  chatMessages: ChatMessages;
  gameSettings?: GameSettings;
}

export interface GameSettings {
  nrOfCols: number;
  nrOfRows: number;
}

export interface PlayerGroups {
  nearbyPlayers: ChatPlayerDto[];
  partyPlayers: ChatPlayerDto[];
  clanPlayers: ChatPlayerDto[];
  friendPlayers: ChatPlayerDto[];
}

export interface ChatMessages {
  general: { type: ChatMessageType; messages: ChatMessage[] };
  nearby: { type: ChatMessageType; messages: ChatMessage[] };
  whisper: { type: ChatMessageType; messages: ChatMessage[] };
  party: { type: ChatMessageType; messages: ChatMessage[] };
  clan: { type: ChatMessageType; messages: ChatMessage[] };
  shout: { type: ChatMessageType; messages: ChatMessage[] };
}
