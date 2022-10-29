import { BarShortcutsContextAction, BarShortcutsContextActionEnum } from './barShortcutsContext.actions';
import { BarShortcutsContextState } from './barShortcutsContext.state';

export const barShortcutsContextReducer = (
  prevState: BarShortcutsContextState,
  action: BarShortcutsContextAction,
): BarShortcutsContextState => {
  const actionType = action.type;
  switch (actionType) {
    case BarShortcutsContextActionEnum.SET_BAR_SHORTCUTS: {
      return {
        ...prevState,
        barShortcuts: action.barShortcuts,
      } as BarShortcutsContextState;
    }
    case BarShortcutsContextActionEnum.SET_BAR_SHORTCUT: {
      return {
        ...prevState,
        barShortcuts: [...prevState.barShortcuts.filter((bs) => bs.id !== action.barShortcut.id), action.barShortcut],
      } as BarShortcutsContextState;
    }
    case BarShortcutsContextActionEnum.REMOVE_BY_INDEX: {
      return {
        ...prevState,
        barShortcuts: [...prevState.barShortcuts.filter((bs) => bs.orderNumber !== action.index)],
      } as BarShortcutsContextState;
    }
    default:
      throw new Error(
        `BarShortcuts context state action: ${BarShortcutsContextActionEnum[actionType]} not handled in switch.`,
      );
  }
};
