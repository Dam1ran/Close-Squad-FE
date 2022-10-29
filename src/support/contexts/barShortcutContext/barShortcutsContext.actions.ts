/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { BarShortcut } from '../../../models/signalR';

export type BarShortcutsContextAction =
  | { type: BarShortcutsContextActionEnum.SET_BAR_SHORTCUTS; barShortcuts: BarShortcut[] }
  | { type: BarShortcutsContextActionEnum.SET_BAR_SHORTCUT; barShortcut: BarShortcut }
  | { type: BarShortcutsContextActionEnum.REMOVE_BY_INDEX; index: number };

export enum BarShortcutsContextActionEnum {
  SET_BAR_SHORTCUTS = 0,
  SET_BAR_SHORTCUT = 1,
  REMOVE_BY_INDEX = 2,
}
