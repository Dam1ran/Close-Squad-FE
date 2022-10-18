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
    default:
      throw new Error(
        `BarShortcuts context state action: ${BarShortcutsContextActionEnum[actionType]} not handled in switch.`,
      );
  }
};
