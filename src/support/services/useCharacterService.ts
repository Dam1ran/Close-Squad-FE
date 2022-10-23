import { useContext } from 'react';
import { useConnection } from '../../api/signalR/useConnection';
import { CsEntityClass } from '../../models/api.models';
import { CsEntityStatus } from '../../models/enums';
import { CharacterDto } from '../../models/signalR';
import { CharacterContext } from '../contexts/characterContext/characterContextProvider';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const useCharacterService = () => {
  const { characters, activeCharacterId, setActiveCharacterId, updateCharacter } = useContext(CharacterContext);
  const { playerJumpTo, isConnected } = useConnection();

  const canSeeQuadrantInfo = (playerQuadrantIndex: number): CharacterDto | undefined =>
    characters.find(
      (c) =>
        c.quadrantIndex === playerQuadrantIndex &&
        c.characterStatus === CsEntityStatus.Awake &&
        c.characterClass === CsEntityClass.Assassin /* && c.inventory.some(i => i.name === 'Magic Powder') */,
    );

  const getActiveCharacter = (): CharacterDto | undefined => characters.find((c) => c.id === activeCharacterId);

  const isTravelDisabled = () => {
    const activeCharacter = getActiveCharacter();
    return !activeCharacterId || activeCharacter?.characterStatus !== CsEntityStatus.Awake || activeCharacter?.hp === 0;
  };

  const getCharactersInViewPort = () => {
    const activeCharacter = getActiveCharacter();
    return characters.filter(
      (c) =>
        c.quadrantIndex === activeCharacter?.quadrantIndex && activeCharacter && c.characterStatus !== CsEntityStatus.Astray,
    );
  };

  const setActiveCharacter = async (character: CharacterDto): Promise<void> => {
    if (isConnected && character.id !== activeCharacterId && character.characterStatus !== CsEntityStatus.Astray) {
      playerJumpTo({ characterId: character.id });
      setActiveCharacterId(character.id);
    }
  };

  const updateCharacterPosition = async (character: CharacterDto, x: number, y: number): Promise<void> => {
    updateCharacter({ id: character.id, x, y });
  };

  return {
    canSeeQuadrantInfo,
    getActiveCharacter,
    isTravelDisabled,
    getCharactersInViewPort,
    setActiveCharacter,
    updateCharacterPosition,
  };
};
