/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useContext } from 'react';
import { BarShortcutsContext } from '../contexts/barShortcutContext/barShortcutsProvider';
import { useCharacterService } from '../services/useCharacterService';

export const useCharacterShortcuts = () => {
  const { barShortcuts } = useContext(BarShortcutsContext);
  const { getActiveCharacter } = useCharacterService();
  const activeCharacter = getActiveCharacter();
  const getActiveCharacterBarShortcuts = () => {
    if (activeCharacter) {
      return barShortcuts.filter((bs) => bs.characterId === activeCharacter.id);
    }
    return [];
  };
  return {
    barShortcuts,
    getActiveCharacterBarShortcuts,
  };
};
