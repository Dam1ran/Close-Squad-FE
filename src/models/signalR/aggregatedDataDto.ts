import { CharacterDto } from './characterDto';
import { CharacterSimpleDto } from './characterSimpleDto';

export interface AggregatedDataDto {
  clientCharacters: CharacterDto[];
  charactersInActiveQuadrant: CharacterSimpleDto[];
}
