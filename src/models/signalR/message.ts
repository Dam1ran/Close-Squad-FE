import { Player } from './player';

export interface ChatMessage {
  type: ChatMessageType;
  text: string;
  player: Player;
}

export enum ChatMessageType {
  General = 0,
  Nearby = 1,
  Whisper = 2,
  Party = 3,
  Clan = 4,
  Shout = 5,
}

export const ChatMessageTypeColorMap: { [key in ChatMessageType]: string } = {
  [ChatMessageType.General]: '#444444',
  [ChatMessageType.Nearby]: '#444444',
  [ChatMessageType.Whisper]: '#9c27b0',
  [ChatMessageType.Party]: '#2e7d32',
  [ChatMessageType.Clan]: '#1565c0',
  [ChatMessageType.Shout]: '#e65100',
};

export interface ChatCommand {
  player: Player;
  text: string;
}
