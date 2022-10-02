import { HubConnection } from '@microsoft/signalr';
import { ChatMessage, ChatPlayerDto, PlayerDto } from '../../../models/signalR';

export type SignalRContextAction =
  | { type: SignalRContextActionEnum.SET_CONNECTION; connection: HubConnection }
  | { type: SignalRContextActionEnum.SET_RETRY_CONNECTION }
  | { type: SignalRContextActionEnum.SET_CURRENT_PLAYER; currentPlayer: PlayerDto }
  | { type: SignalRContextActionEnum.SET_NEARBY_PLAYERS; players: ChatPlayerDto[] }
  | { type: SignalRContextActionEnum.SET_PARTY_PLAYERS; players: ChatPlayerDto[] }
  | { type: SignalRContextActionEnum.SET_CLAN_PLAYERS; players: ChatPlayerDto[] }
  | { type: SignalRContextActionEnum.SET_FRIEND_PLAYERS; players: ChatPlayerDto[] }
  | { type: SignalRContextActionEnum.SET_CHAT_MESSAGE; message: ChatMessage };

export enum SignalRContextActionEnum {
  SET_CONNECTION = 0,
  SET_RETRY_CONNECTION = 1,
  SET_CURRENT_PLAYER = 2,
  SET_NEARBY_PLAYERS = 3,
  SET_PARTY_PLAYERS = 4,
  SET_CLAN_PLAYERS = 5,
  SET_FRIEND_PLAYERS = 6,
  SET_CHAT_MESSAGE = 7,
}
