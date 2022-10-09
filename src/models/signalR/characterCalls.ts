import { TravelDirection } from '../enums';

export interface CharacterCall {
  characterId: number;
}

export interface CharacterTravelCall extends CharacterCall {
  travelDirection: TravelDirection;
}

export interface CharacterScoutCall extends CharacterCall {
  quadrantIndex: number;
}
