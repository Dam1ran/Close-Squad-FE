import { CsEntityClass } from '../api.models';
import { AiAction, CsEntityStatus } from '../enums';

export interface CharacterSimpleDto {
  id: number;
  aiAction: AiAction;
  instanceId: string;
  quadrantIndex: number;
  nickname: string;
  characterClass: CsEntityClass;
  characterStatus: CsEntityStatus;
  x: number;
  y: number;
  // equipment
}
