import { HubConnection } from '@microsoft/signalr';
import { ChatMessage, ChatMessageType, ChatPlayerDto, PlayerDto } from '../../../models/signalR';

export interface SignalRContextState {
  connection?: HubConnection;
  retryConnectionFlag: boolean;
  currentPlayer?: PlayerDto;
  playerGroups: PlayerGroups;
  chatMessages: ChatMessages;
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
