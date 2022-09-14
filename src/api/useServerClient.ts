import { useAbortSignal } from './useAbortSignal';
import { ServerClient } from './serverClient';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useServerClient = () => {
  const signal = useAbortSignal();
  return ServerClient(signal);
};
