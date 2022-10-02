import { CharacterDto } from '../../../models/signalR';

export type CharacterContextAction =
  | { type: CharacterContextActionEnum.SET_CHARACTER; character: CharacterDto }
  | { type: CharacterContextActionEnum.UPDATE_CHARACTER; character: Partial<CharacterDto> }
  | { type: CharacterContextActionEnum.SET_CHARACTERS; characters: CharacterDto[] }
  | { type: CharacterContextActionEnum.SET_ACTIVE_CHAR_ID; id?: number };

export enum CharacterContextActionEnum {
  SET_CHARACTER = 0,
  UPDATE_CHARACTER = 1,
  SET_CHARACTERS = 2,
  SET_ACTIVE_CHAR_ID = 3,
}
