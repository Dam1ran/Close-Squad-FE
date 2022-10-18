import { CharacterClass } from '../api.models';
import { CharacterStatus } from '../enums';

export interface CharacterDto {
  id: number;
  quadrantIndex: number;
  nickname: string;
  level: number;
  characterClass: CharacterClass;
  characterStatus: CharacterStatus;
  maxHp: number;
  hp: number;
  maxMp: number;
  mp: number;
  xpPercent: number;
  x: number;
  y: number;
  xDestination: number;
  yDestination: number;
}
