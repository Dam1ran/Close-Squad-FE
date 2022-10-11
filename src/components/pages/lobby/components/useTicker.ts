import { useEffect } from 'react';
import { TickService } from './tickService';

export const useTicker = (): void => {
  useEffect(() => {
    const timer = setInterval(() => {
      TickService.tick();
    }, 100.0);
    return () => {
      clearInterval(timer);
    };
  }, []);
};
