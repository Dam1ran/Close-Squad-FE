export enum TravelDirection {
  N = 1,
  NE = 2,
  E = 3,
  SE = 4,
  S = 5,
  SW = 6,
  W = 7,
  NW = 8,
}

export const TravelDirectionMap: { [key in TravelDirection]: string } = {
  [TravelDirection.N]: 'North',
  [TravelDirection.NE]: 'North-East',
  [TravelDirection.E]: 'East',
  [TravelDirection.SE]: 'South-East',
  [TravelDirection.S]: 'South',
  [TravelDirection.SW]: 'South-West',
  [TravelDirection.W]: 'West',
  [TravelDirection.NW]: 'North-West',
};

