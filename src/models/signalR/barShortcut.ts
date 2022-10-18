import { BarShortcutType } from '../enums';

export interface BarShortcut {
  id: number;
  orderNumber: number;
  type: BarShortcutType;
  usingId: number;
  characterId: number;
}
