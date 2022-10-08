import { useEffect, useContext } from 'react';
import { useServerClient } from '../../../../api/useServerClient';
import { SignalRContext } from '../../../../support/contexts/signalRContext/signalRContextProvider';

export const useLoadGameSettings = (): void => {
  const { getGameSettings } = useServerClient();
  const { setGameSettings, gameSettings } = useContext(SignalRContext);
  useEffect(() => {
    if (!gameSettings) {
      getGameSettings().then((ar) => setGameSettings(ar.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
