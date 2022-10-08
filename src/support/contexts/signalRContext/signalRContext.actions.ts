import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import { ChatMessage, ChatPlayerDto, PlayerDto } from '../../../models/signalR';
import { GameSettings } from './signalRContext.state';

export type SignalRContextAction =
  | { type: SignalRContextActionEnum.SET_CONNECTION; connection: HubConnection }
  | { type: SignalRContextActionEnum.SET_CONNECTION_STATE; connectionState?: HubConnectionState }
  | { type: SignalRContextActionEnum.SET_GAME_SETTINGS; gameSettings: GameSettings }
  | { type: SignalRContextActionEnum.SET_RETRY_CONNECTION }
  | { type: SignalRContextActionEnum.SET_CURRENT_PLAYER; currentPlayer: PlayerDto }
  | { type: SignalRContextActionEnum.SET_NEARBY_PLAYERS; players: ChatPlayerDto[] }
  | { type: SignalRContextActionEnum.SET_PARTY_PLAYERS; players: ChatPlayerDto[] }
  | { type: SignalRContextActionEnum.SET_CLAN_PLAYERS; players: ChatPlayerDto[] }
  | { type: SignalRContextActionEnum.SET_FRIEND_PLAYERS; players: ChatPlayerDto[] }
  | { type: SignalRContextActionEnum.SET_CHAT_MESSAGE; message: ChatMessage };

export enum SignalRContextActionEnum {
  SET_CONNECTION = 0,
  SET_CONNECTION_STATE = 1,
  SET_GAME_SETTINGS = 2,
  SET_RETRY_CONNECTION = 3,
  SET_CURRENT_PLAYER = 4,
  SET_NEARBY_PLAYERS = 5,
  SET_PARTY_PLAYERS = 6,
  SET_CLAN_PLAYERS = 7,
  SET_FRIEND_PLAYERS = 8,
  SET_CHAT_MESSAGE = 9,
}
