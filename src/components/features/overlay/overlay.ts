import { DialogType, OverlayActionType, OverlayComponent, overlayDispatch } from './store/overlayStore';
import { v4 } from 'uuid';
import { isNullOrEmpty } from '../../../support/utils';
import { overlayUtils } from './utils/overlayUtils';

export interface OverlayOptions {
  id?: string;
  title?: string;
  modal?: boolean;
  canBeClosed?: boolean;
  canBePaused?: boolean;
  dialogType?: DialogType;
  icon?: JSX.Element | string;
  iconDescription?: string;
  durationMilliseconds?: number;
  onClose?: () => void;
}

const overlay = {
  setComponent: (element: JSX.Element, options: OverlayOptions): string => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = isNullOrEmpty(options?.id) ? v4() : options.id!;
    const component = {
      id,
      title: options.title || '',
      modal: options.modal ?? false,
      canBeClosed: options.canBeClosed ?? false,
      canBePaused: options.canBePaused ?? true,
      icon: options.icon || overlayUtils().OverlayIcon({ dialogType: options.dialogType }),
      iconData: overlayUtils().getIconDescriptionAndColor(options.dialogType),
      element,
      durationMilliseconds: options.dialogType === DialogType.Loading ? -1 : options.durationMilliseconds || 0,
      close: false,
      posYOrder: 0,
      onClose: options.onClose,
    } as OverlayComponent;

    overlayDispatch({
      type: OverlayActionType.REMOVE_COMPONENT,
      id,
    });

    overlayDispatch({
      type: OverlayActionType.ADD_COMPONENT,
      component,
    });

    return id;
  },
  removeComponent: (id: string): void => {
    overlayDispatch({ type: OverlayActionType.UPDATE_COMPONENT, id, component: { close: true } });
    setTimeout(() => {
      overlayDispatch({ type: OverlayActionType.REMOVE_COMPONENT, id });
    }, 300);
  },
  clearComponents: (): void => {
    overlayDispatch({ type: OverlayActionType.CLEAR_COMPONENTS });
  },
};

export { overlay };
