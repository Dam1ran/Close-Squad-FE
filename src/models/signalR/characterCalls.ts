import { CharacterAction, TravelDirection } from '../enums';

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
