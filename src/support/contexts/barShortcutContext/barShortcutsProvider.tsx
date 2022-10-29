import { createContext, PropsWithChildren, useMemo, useReducer } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import { BarShortcut } from '../../../models/signalR';
import { BarShortcutsContextActionEnum } from './barShortcutsContext.actions';
import { barShortcutsContextReducer } from './barShortcutsContext.reducer';
import { BarShortcutsContextState } from './barShortcutsContext.state';

const barShortcutsContextInitialState: BarShortcutsContextState = {
  barShortcuts: [],
} as BarShortcutsContextState;

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function*/
let dispatcher = {
  setBarShortcuts: (barShortcuts: BarShortcut[]): void => {},
  setBarShortcut: (barShortcut: BarShortcut): void => {},
  removeShortcutByIndex: (index: number): void => {},
};

export const BarShortcutsContext = createContext({
  ...barShortcutsContextInitialState,
  ...dispatcher,
});

export const BarShortcutsContextProvider = ({ children }: PropsWithChildren<BrowserRouterProps>): JSX.Element => {
  const [barShortcutsContextState, dispatch] = useReducer(barShortcutsContextReducer, barShortcutsContextInitialState);

  dispatcher = useMemo(
    () => ({
      setBarShortcuts: (barShortcuts) =>
        dispatch({
          type: BarShortcutsContextActionEnum.SET_BAR_SHORTCUTS,
          barShortcuts,
        }),
      setBarShortcut: (barShortcut) =>
        dispatch({
          type: BarShortcutsContextActionEnum.SET_BAR_SHORTCUT,
          barShortcut,
        }),
      removeShortcutByIndex: (index) =>
        dispatch({
          type: BarShortcutsContextActionEnum.REMOVE_BY_INDEX,
          index,
        }),
    }),
    [],
  );

  const barShortcutsContext = {
    ...barShortcutsContextState,
    ...dispatcher,
  };

  return <BarShortcutsContext.Provider value={barShortcutsContext}>{children}</BarShortcutsContext.Provider>;
};
