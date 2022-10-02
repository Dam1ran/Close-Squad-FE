import { CharacterClass } from '../api.models';

export interface CharacterDto {
  id: number;
  nickname: string;
  level: number;
  characterClass: CharacterClass;
  isAwake: boolean;
  maxHP: number;
  hp: number;
  maxMP: number;
  mp: number;
  xp_percent: number;
}
