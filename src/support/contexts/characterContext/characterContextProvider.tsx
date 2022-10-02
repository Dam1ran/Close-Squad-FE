import { createContext, PropsWithChildren, useMemo, useReducer } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import { CharacterDto } from '../../../models/signalR';
import { CharacterContextActionEnum } from './characterContext.actions';
import { characterRContextReducer } from './characterContext.reducer';
import { CharacterContextState } from './characterContext.state';

const characterContextInitialState: CharacterContextState = {
  characters: [],
} as CharacterContextState;

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function*/
let dispatcher = {
  setCharacter: (character: CharacterDto): void => {},
  updateCharacter: (character: Partial<CharacterDto>): void => {},
  setCharacters: (characters: CharacterDto[]): void => {},
  setActiveCharacterId: (id?: number): void => {},
};

export const CharacterContext = createContext({
  ...characterContextInitialState,
  ...dispatcher,
});

export const CharacterContextProvider = ({ children }: PropsWithChildren<BrowserRouterProps>): JSX.Element => {
  const [characterContextState, dispatch] = useReducer(characterRContextReducer, characterContextInitialState);

  dispatcher = useMemo(
    () => ({
      setCharacter: (character) =>
        dispatch({
          type: CharacterContextActionEnum.SET_CHARACTER,
          character,
        }),
      updateCharacter: (character) =>
        dispatch({
          type: CharacterContextActionEnum.UPDATE_CHARACTER,
          character,
        }),
      setCharacters: (characters) =>
        dispatch({
          type: CharacterContextActionEnum.SET_CHARACTERS,
          characters,
        }),
      setActiveCharacterId: (id) =>
        dispatch({
          type: CharacterContextActionEnum.SET_ACTIVE_CHAR_ID,
          id,
        }),
    }),
    [],
  );

  const characterContext = {
    ...characterContextState,
    ...dispatcher,
  };

  return <CharacterContext.Provider value={characterContext}>{children}</CharacterContext.Provider>;
};
