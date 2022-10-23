import { CsEntityClass } from '../api.models';
import { AiAction, CsEntityStatus } from '../enums';
import { TargetDto } from './targetDto';

export interface CharacterDto {
  id: number;
  aiAction: AiAction;
  instanceId: string;
  quadrantIndex: number;
  nickname: string;
  level: number;
  characterClass: CsEntityClass;
  characterStatus: CsEntityStatus;
  maxHp: number;
  hp: number;
  maxMp: number;
  mp: number;
  xpPercent: number;
  x: number;
  y: number;
  xDestination: number;
  yDestination: number;
  target?: TargetDto;
}
