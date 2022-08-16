import { useState } from 'react';

export enum OverlayActionType {
  ADD_COMPONENT = 0,
  REMOVE_COMPONENT = 1,
  UPDATE_COMPONENT = 2,
  CLEAR_COMPONENTS = 3,
}

export interface OverlayAction {
  type: OverlayActionType;
  id?: string;
  component?: Partial<OverlayComponent>;
}

export enum DialogType {
  Loading = 0,
  Info = 1,
  Question = 2,
  Success = 3,
  Fail = 4,
  Warning = 5,
  Error = 6,
  Other = 7,
  Custom = 8,
}

export interface OverlayComponent {
  id: string;
  title: string;
  modal: boolean;
  canBeClosed: boolean;
  canBePaused: boolean;
  icon: JSX.Element | string;
  iconData: { description: string; backgroundColor: string };
  element: JSX.Element;
  durationMilliseconds: number;
  close: boolean;
  posYOrder: number;
}

export interface OverlayState {
  components: OverlayComponent[];
}

let order = 0;
export const overlayReducer = (prevState: OverlayState, action: OverlayAction): OverlayState => {
  switch (action.type) {
    case OverlayActionType.ADD_COMPONENT: {
      const component = action.component;
      if (prevState.components.length === 0) {
        order = 0;
      } else {
        if (component?.posYOrder === 0) {
          order = order < 6 ? ++order : 0;
          component.posYOrder = order;
        }
      }

      return {
        ...prevState,
        components: [...prevState.components, component],
      } as OverlayState;
    }
    case OverlayActionType.REMOVE_COMPONENT: {
      return {
        ...prevState,
        components: [...prevState.components.filter((c) => c.id !== action.id)],
      } as OverlayState;
    }
    case OverlayActionType.UPDATE_COMPONENT: {
      let component = prevState.components.find((c) => c.id === action.id);
      if (!component) {
        return prevState;
      }

      component = {
        ...component,
        ...action.component,
      };

      return {
        ...prevState,
        components: [...prevState.components.filter((c) => c.id !== action.id), component],
      } as OverlayState;
    }
    case OverlayActionType.CLEAR_COMPONENTS: {
      return {
        ...prevState,
        components: [],
      } as OverlayState;
    }
    default: {
      throw new Error(`Overlay state action: ${action.type} not handled in switch.`);
    }
  }
};

const handler = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setState: (state: OverlayState): void => {},
};
let memoryState: OverlayState = { components: [] };

export const overlayDispatch = (action: OverlayAction): void => {
  memoryState = overlayReducer(memoryState, action);
  handler.setState(memoryState);
};

export const useOverlayStore = (): OverlayComponent[] => {
  const [state, setState] = useState(memoryState);
  handler.setState = setState;

  return [...state.components] || [];
};
