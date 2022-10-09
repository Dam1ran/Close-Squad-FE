import { useContext } from 'react';
import { CharacterClass } from '../../models/api.models';
import { CharacterStatus } from '../../models/enums';
import { CharacterDto } from '../../models/signalR';
import { CharacterContext } from '../contexts/characterContext/characterContextProvider';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const useCharacterService = () => {
  const { characters, activeCharacterId } = useContext(CharacterContext);
  const canSeeQuadrantInfo = (playerQuadrantIndex: number): CharacterDto | undefined =>
    characters.find(
      (c) =>
        c.quadrantIndex === playerQuadrantIndex &&
        c.characterClass === CharacterClass.Assassin /* && c.inventory.some(i => i.name === 'Magic Powder') */,
    );
  const getActiveCharacter = (): CharacterDto | undefined => characters.find((c) => c.id === activeCharacterId);

  const isTravelDisabled = () => {
    const activeCharacter = getActiveCharacter();
    return !activeCharacterId || activeCharacter?.characterStatus !== CharacterStatus.Awake || activeCharacter?.hp === 0;
  };
  return {
    canSeeQuadrantInfo,
    getActiveCharacter,
    isTravelDisabled,
  };
};
