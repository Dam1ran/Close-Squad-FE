import { CharacterClass } from '../api.models';
import { CharacterStatus } from '../enums';

export interface CharacterSimpleDto {
  id: number;
  quadrantIndex: number;
  nickname: string;
  characterClass: CharacterClass;
  characterStatus: CharacterStatus;
  // equipment
}
