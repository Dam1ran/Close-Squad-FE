import { useContext } from 'react';
import { CharacterClass } from '../../models/api.models';
import { CharacterDto } from '../../models/signalR';
import { CharacterContext } from '../contexts/characterContext/characterContextProvider';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const useCharacterService = () => {
  const { characters } = useContext(CharacterContext);
  const canSeeQuadrantInfo = (playerQuadrantIndex: number): CharacterDto | undefined =>
    characters.find(
      (c) =>
        c.quadrantIndex === playerQuadrantIndex &&
        c.characterClass === CharacterClass.Assassin /* && c.inventory.some(i => i.name === 'Magic Powder') */,
    );
  return {
    canSeeQuadrantInfo,
  };
};
