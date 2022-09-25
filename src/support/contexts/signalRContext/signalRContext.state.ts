import { HubConnection } from '@microsoft/signalr';
import { ChatMessage, ChatMessageType, ChatPlayer, Player } from '../../../models/signalR';

export interface SignalRContextState {
  connection?: HubConnection;
  retryConnectionFlag: boolean;
  currentPlayer?: Player;
  playerGroups: PlayerGroups;
  chatMessages: ChatMessages;
}

export interface PlayerGroups {
  nearbyPlayers: ChatPlayer[];
  partyPlayers: ChatPlayer[];
  clanPlayers: ChatPlayer[];
  friendPlayers: ChatPlayer[];
}

export interface ChatMessages {
  general: { type: ChatMessageType; messages: ChatMessage[] };
  nearby: { type: ChatMessageType; messages: ChatMessage[] };
  whisper: { type: ChatMessageType; messages: ChatMessage[] };
  party: { type: ChatMessageType; messages: ChatMessage[] };
  clan: { type: ChatMessageType; messages: ChatMessage[] };
  shout: { type: ChatMessageType; messages: ChatMessage[] };
}
