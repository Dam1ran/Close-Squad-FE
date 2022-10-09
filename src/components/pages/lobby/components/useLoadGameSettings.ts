import { useEffect, useContext } from 'react';
import { useServerClient } from '../../../../api/useServerClient';
import { SignalRContext } from '../../../../support/contexts/signalRContext/signalRContextProvider';

export const useLoadGameSettings = (): void => {
  const { getGameSettings } = useServerClient();
  const { setGameSettings, gameSettings } = useContext(SignalRContext);
  useEffect(() => {
    if (!gameSettings) {
      const request = async (): Promise<void> => {
        await new Promise((r) => setTimeout(r, 2500));
        await getGameSettings().then((ar) => setGameSettings(ar.data));
      };
      request();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
