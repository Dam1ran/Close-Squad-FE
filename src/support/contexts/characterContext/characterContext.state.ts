import { CharacterDto, CharacterSimpleDto } from '../../../models/signalR';

export interface CharacterContextState {
  characters: CharacterDto[];
  quadrantCharacters: CharacterSimpleDto[];
  activeCharacterId?: number;
}
