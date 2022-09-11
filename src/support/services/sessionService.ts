/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react';
import { v4 } from 'uuid';
import { isNotEmpty, isNullOrEmpty } from '../utils';

interface SessionMemory {
  sessionId?: string;
}

const sessionMemory: SessionMemory = {
  sessionId: undefined,
};

export const SessionService = () => {
  const set = (value: string): void => {
    if (isNullOrEmpty(value)) {
      return;
    }
    sessionMemory.sessionId = value;
  };

  const get = (): string | undefined => sessionMemory?.sessionId;

  return {
    set,
    get,
  };
};

export const useSession = () => {
  useEffect(() => {
    SessionService().set(window.name || v4());

    window.addEventListener('unload', () => {
      if (isNotEmpty(SessionService().get())) {
        window.name = SessionService().get()!;
      }
    });

    return () => {
      if (isNotEmpty(SessionService().get())) {
        window.name = SessionService().get()!;
      }
    };
  }, []);

  return {};
};
