import { TravelDirection } from '../enums';
import { CharacterCall } from './characterCall';

export interface CharacterTravelCall extends CharacterCall {
  travelDirection: TravelDirection;
}
