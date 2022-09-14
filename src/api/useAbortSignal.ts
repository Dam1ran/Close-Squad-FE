import { useEffect, useState } from 'react';

export const useAbortSignal = (): AbortSignal => {
  const [controller] = useState(new AbortController());

  useEffect(() => {
    return () => controller.abort();
  }, [controller]);

  return controller.signal;
};
