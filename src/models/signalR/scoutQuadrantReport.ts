import { ChatPlayerDto } from '.';
import { CharacterSimpleDto } from './characterSimpleDto';

export interface ScoutQuadrantReport {
  quadrantIndex: number;
  area: string;
  name: string;
  characters: CharacterSimpleDto[];
  creatures?: Creature[];
  landlord?: ChatPlayerDto;
}

export interface Creature {
  level: number;
  aggro?: boolean;
  social?: boolean;
  clan: boolean;
  hpMultiplier: number;
}

// export enum QuadrantType {

// }
