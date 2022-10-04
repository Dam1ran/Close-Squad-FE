import { CharacterDto } from '../../../models/signalR';
import { CharacterContextAction, CharacterContextActionEnum } from './characterContext.actions';
import { CharacterContextState } from './characterContext.state';

export const characterRContextReducer = (
  prevState: CharacterContextState,
  action: CharacterContextAction,
): CharacterContextState => {
  const actionType = action.type;
  switch (actionType) {
    case CharacterContextActionEnum.SET_CHARACTER: {
      let char = prevState.characters.find((c) => c.id === action.character.id);
      if (!char) {
        prevState.characters.push(action.character);
      } else {
        char = { ...char, ...action.character };
      }

      return {
        ...prevState,
      } as CharacterContextState;
    }
    case CharacterContextActionEnum.UPDATE_CHARACTER: {
      const character = prevState.characters.find((c) => c.id === action.character.id);
      if (character) {
        const objKeys = Object.keys(action.character)?.filter((k) => k.getNormalized() !== 'id') as (keyof CharacterDto)[];
        for (const objKey of objKeys) {
          (character[objKey] as unknown) = action.character[objKey];
        }
      }

      return {
        ...prevState,
      } as CharacterContextState;
    }
    case CharacterContextActionEnum.SET_CHARACTERS: {
      return {
        ...prevState,
        characters: action.characters,
      } as CharacterContextState;
    }
    case CharacterContextActionEnum.SET_ACTIVE_CHAR_ID: {
      return {
        ...prevState,
        activeCharacterId: action.id,
      } as CharacterContextState;
    }

    default:
      throw new Error(`App context state action: ${CharacterContextActionEnum[actionType]} not handled in switch.`);
  }
};
