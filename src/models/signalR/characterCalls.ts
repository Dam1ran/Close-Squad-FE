import { BarShortcutType, CharacterAction, TravelDirection } from '../enums';

export interface CharacterCall {
  characterId: number;
}

export interface CharacterTravelCall extends CharacterCall {
  travelDirection: TravelDirection;
}

export interface CharacterScoutCall extends CharacterCall {
  quadrantIndex: number;
}

export interface CharacterMoveCall extends CharacterCall {
  x: number;
  y: number;
}

export interface CharacterUseActionCall extends CharacterCall {
  action: CharacterAction;
}

export interface CharacterTargetCall extends CharacterCall {
  instanceId: string;
}

export interface CharacterAssignShortcutCall extends CharacterCall {
  barShortcutType: BarShortcutType;
  usingId: number;
  shortcutIndex: number;
}

export interface CharacterClearShortcutCall extends CharacterCall {
  shortcutIndex: number;
}

export interface CharacterUseSkillCall extends CharacterCall {
  skillKeyId: number;
}
