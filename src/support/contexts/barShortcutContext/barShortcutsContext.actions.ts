/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { BarShortcut } from '../../../models/signalR';

export type BarShortcutsContextAction = {
  type: BarShortcutsContextActionEnum.SET_BAR_SHORTCUTS;
  barShortcuts: BarShortcut[];
};

export enum BarShortcutsContextActionEnum {
  SET_BAR_SHORTCUTS = 0,
}
