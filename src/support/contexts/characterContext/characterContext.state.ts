import { CharacterDto } from '../../../models/signalR';

export interface CharacterContextState {
  characters: CharacterDto[];
  activeCharacterId?: number;
}
