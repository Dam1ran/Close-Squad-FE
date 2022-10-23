import { CsEntityClass } from '../api.models';
import { CsEntityStatus } from '../enums';

export interface TargetDto {
  characterId: number;
  instanceId?: string;
  nickname: string;

  hp: number;
  maxHp: number;

  mp: number;
  maxMp: number;

  status?: CsEntityStatus;
  characterClass?: CsEntityClass;
}
