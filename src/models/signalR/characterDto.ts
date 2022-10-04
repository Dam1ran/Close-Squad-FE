import { CharacterClass } from '../api.models';
import { CharacterStatus } from '../enums';

export interface CharacterDto {
  id: number;
  nickname: string;
  level: number;
  characterClass: CharacterClass;
  characterStatus: CharacterStatus;
  maxHP: number;
  hp: number;
  maxMP: number;
  mp: number;
  xp_percent: number;
}
